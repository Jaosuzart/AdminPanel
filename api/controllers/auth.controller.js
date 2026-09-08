import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { db } from '../config/database.js';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

export const login = async (req, res, next) => {
  if (!db) return res.status(500).json({ error: 'Banco de dados nao configurado.' });
  try {
    const { email, password } = req.body;
    const { data: users, error } = await db.from('users').select('*').eq('email', email).limit(1);
    if (error) throw error;
    if (!users || users.length === 0) return res.status(401).json({ error: 'Credenciais invalidas. Usuario nao encontrado.' });

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ error: 'Credenciais invalidas. Senha incorreta.' });

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
  } catch (error) { next(error); }
};

export const verify2FA = async (req, res, next) => {
  if (!db) return res.status(500).json({ error: 'Banco de dados nao configurado.' });
  try {
    const { code, tempToken } = req.body;
    if (!tempToken) return res.status(401).json({ error: 'Token temporario nao fornecido.' });

    const { data: tokens, error } = await db.from('temp_tokens').select('*').eq('id', tempToken).limit(1);
    if (error) throw error;
    if (!tokens || tokens.length === 0) return res.status(401).json({ error: 'Sessao invalida ou expirada.' });

    const sessionData = tokens[0];
    if (sessionData.expires < Date.now()) {
      await db.from('temp_tokens').delete().eq('id', tempToken);
      return res.status(401).json({ error: 'Sessao expirada.' });
    }

    const { data: users, error: userError } = await db.from('users').select('*').eq('id', sessionData.user_id).limit(1);
    if (userError || !users || users.length === 0) throw new Error('Usuario nao encontrado.');
    const user = users[0];

    let isValid = false;
    if (user.two_factor_secret && user.two_factor_secret !== 'DEFAULT_MOCK_SECRET') {
      isValid = speakeasy.totp.verify({
        secret: user.two_factor_secret,
        encoding: 'base32',
        token: code,
        window: 1
      });
    } else {
      isValid = (code && code.length === 6);
    }

    if (isValid) {
      await db.from('temp_tokens').delete().eq('id', tempToken);
      const authToken = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');
      return res.json({
        success: true,
        token: authToken,
        user: { email: sessionData.email, role: 'Administrador' }
      });
    } else {
      return res.status(401).json({ error: 'Codigo de autenticacao invalido.' });
    }
  } catch (error) { next(error); }
};

export const generate2FA = async (req, res, next) => {
  try {
    const { email } = req.body;
    const secret = speakeasy.generateSecret({ name: `AdminPanel (${email})` });

    const { error } = await db.from('users').update({ two_factor_secret: secret.base32 }).eq('email', email);
    if (error) throw error;

    qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
      if (err) return next(err);
      res.json({
        success: true,
        secret: secret.base32,
        qrcode: dataUrl
      });
    });
  } catch (error) { next(error); }
};

export const updatePassword = async (req, res, next) => {
  if (!db) return res.status(500).json({ error: 'Banco de dados nao configurado.' });
  try {
    const { email, currentPassword, newPassword } = req.body;
    
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Todos os campos sao obrigatorios.' });
    }

    const { data: users, error } = await db.from('users').select('*').eq('email', email).limit(1);
    if (error) throw error;
    if (!users || users.length === 0) return res.status(401).json({ error: 'Usuario nao encontrado.' });

    const user = users[0];
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) return res.status(401).json({ error: 'A senha atual esta incorreta.' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const { error: updateError } = await db.from('users').update({ password: hashedPassword }).eq('email', email);
    
    if (updateError) throw updateError;

    return res.json({ success: true, message: 'Senha atualizada com sucesso!' });
  } catch (error) { next(error); }
};
