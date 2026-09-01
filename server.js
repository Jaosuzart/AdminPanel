import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config();

const logger = {
  info: (msg) => process.stdout.write(`[INFO] ${new Date().toISOString()} — ${msg}\n`),
  error: (msg, err) => process.stderr.write(`[ERROR] ${new Date().toISOString()} — ${msg}${err ? `: ${err.message}` : ''}\n`),
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3333;
const distDir = path.join(__dirname, 'dist');

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
  if (err) logger.error('Erro ao conectar no banco de dados', err);
  else logger.info('Conectado ao SQLite local');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    two_factor_secret TEXT
  )`);

  db.get('SELECT * FROM users WHERE email = ?', ['admin@admin.com'], async (err, row) => {
    if (!row) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin', salt);
      db.run('INSERT INTO users (email, password, two_factor_secret) VALUES (?, ?, ?)', 
        ['admin@admin.com', hashedPassword, process.env.TWO_FACTOR_MOCK_SECRET || 'DEFAULT_MOCK_SECRET']
      );
      logger.info('Usuário padrão (admin@admin.com) criado com senha criptografada (bcrypt)');
    }
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor de banco de dados.' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas. Usuário não encontrado.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas. Senha incorreta.' });
    }

    return res.json({ 
      success: true, 
      message: 'Senha correta. Aguardando 2FA.',
      tempToken: process.env.JWT_SECRET ? 'temp_token_123' : 'temp_token_123'
    });
  });
});

app.post('/api/verify-2fa', (req, res) => {
  const { code, tempToken } = req.body;

  if (tempToken !== 'temp_token_123') {
    return res.status(401).json({ error: 'Sessão inválida. Refaça o login.' });
  }

  if (code && code.length === 6) {
    return res.json({
      success: true,
      token: process.env.JWT_SECRET || 'real_auth_token_xyz987',
      user: { email: 'admin@admin.com', role: 'Administrador' }
    });
  } else {
    return res.status(401).json({ error: 'Código de autenticação inválido. Tente 6 dígitos.' });
  }
});

app.use(express.static(distDir));

app.use((req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, () => {
  logger.info(`Servidor disponível em http://localhost:${PORT}`);
});
