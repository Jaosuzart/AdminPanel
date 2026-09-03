import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { dbGet } from '../config/database.js';

const tempTokens = new Map();

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas. Usuário não encontrado.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas. Senha incorreta.' });
    }

    const tempToken = crypto.randomBytes(32).toString('hex');
    tempTokens.set(tempToken, {
      userId: user.id,
      email: user.email,
      expires: Date.now() + 10 * 60 * 1000
    });

    return res.json({
      success: true,
      message: 'Senha correta. Aguardando 2FA.',
      tempToken
    });
  } catch (error) {
    next(error)
  }
};

export const verify2FA = async (req, res, next) => {
  try {
    const { code, tempToken } = req.body;

    const sessionData = tempTokens.get(tempToken);

    if (!sessionData || sessionData.expires < Date.now()) {
      tempTokens.delete(tempToken);
      return res.status(401).json({ error: 'Sessão inválida ou expirada. Refaça o login.' });
    }

    if (code && code.length === 6) {
      tempTokens.delete(tempToken);

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
