import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { db } from '../config/database.js';

export const login = async (req, res, next) => {
  if (!db) {
    return res.status(500).json({ error: 'Banco de dados não está configurado. Verifique as credenciais do Supabase.' });
  }

  try {
    const { email, password } = req.body;

    const { data: users, error } = await db.from('users').select('*').eq('email', email).limit(1);

    if (error) throw error;

    if (!users || users.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas. Usuário não encontrado.' });
    }

    const user = users[0];

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas. Senha incorreta.' });
    }

    const tempToken = crypto.randomBytes(32).toString('hex');

    const { error: insertError } = await db.from('temp_tokens').insert([{
      id: tempToken,
      user_id: user.id,
      email: user.email,
      expires: Date.now() + 10 * 60 * 1000
    }]);

    if (insertError) throw insertError;

    return res.json({
      success: true,
      message: 'Senha correta. Aguardando 2FA.',
      tempToken
    });
  } catch (error) {
    next(error);
  }
};

export const verify2FA = async (req, res, next) => {
  if (!db) {
    return res.status(500).json({ error: 'Banco de dados não está configurado.' });
  }

  try {
    const { code, tempToken } = req.body;

    if (!tempToken) {
      return res.status(401).json({ error: 'Token temporário não fornecido.' });
    }

    const { data: tokens, error } = await db.from('temp_tokens').select('*').eq('id', tempToken).limit(1);

    if (error) throw error;

    if (!tokens || tokens.length === 0) {
      return res.status(401).json({ error: 'Sessão inválida ou expirada. Refaça o login.' });
    }

    const sessionData = tokens[0];

    if (sessionData.expires < Date.now()) {
      await db.from('temp_tokens').delete().eq('id', tempToken);
      return res.status(401).json({ error: 'Sessão expirada. Refaça o login.' });
    }

    if (code && code.length === 6) {
      await db.from('temp_tokens').delete().eq('id', tempToken);

      const authToken = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

      return res.json({
        success: true,
        token: authToken,
        user: { email: sessionData.email, role: 'Administrador' }
      });
    } else {
      return res.status(401).json({ error: 'Código de autenticação inválido. Tente 6 dígitos.' });
    }
  } catch (error) {
    next(error);
  }
};
