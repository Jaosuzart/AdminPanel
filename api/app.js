import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import { initDB } from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());

// Inicializa a conexão com o banco de dados (promisified)
initDB();

// Registra as rotas da API
app.use('/api', authRoutes);

// Middleware global de tratamento de erros, sempre o último a ser registrado
app.use(errorHandler);

export default app;
