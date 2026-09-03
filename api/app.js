import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import { initDB } from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());

initDB();

app.use('/api', authRoutes);

app.use(errorHandler);

export default app;
