import sqlite3 from 'sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFile = process.env.VERCEL ? '/tmp/database.sqlite' : path.join(__dirname, '..', '..', 'database.sqlite');

export const db = new sqlite3.Database(dbFile, (err) => {
  if (err) logger.error('Erro ao conectar no banco de dados', err);
  else logger.info(`Conectado ao SQLite em ${dbFile}`);
});

export const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

export const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const initDB = async () => {
  try {
    await dbRun(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      two_factor_secret TEXT
    )`);

    const admin = await dbGet('SELECT * FROM users WHERE email = ?', ['admin@admin.com']);
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin', salt);
      await dbRun('INSERT INTO users (email, password, two_factor_secret) VALUES (?, ?, ?)',
        ['admin@admin.com', hashedPassword, process.env.TWO_FACTOR_MOCK_SECRET || 'DEFAULT_MOCK_SECRET']
      );
      logger.info('Usuário padrão (admin@admin.com) criado com senha criptografada (bcrypt)');
    }
  } catch (error) {
    logger.error('Erro ao inicializar o banco de dados', error);
  }
};
