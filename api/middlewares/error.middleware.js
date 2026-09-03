import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(`[Global Error] ${req.method} ${req.url}`, err);
  
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: status === 500 ? 'Erro interno no servidor' : err.message,
  });
};
