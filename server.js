import * as dotenv from 'dotenv';
dotenv.config();

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import app from './api/app.js';
import { logger } from './api/utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

const PORT = process.env.PORT || 3333;

if (!process.env.VERCEL) {
  app.use(express.static(distDir));

  app.use('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });

  app.listen(PORT, () => {
    logger.info(`🚀 Servidor inicializado em http://localhost:${PORT}`);
  });
}

export default app;
