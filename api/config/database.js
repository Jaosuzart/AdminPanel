import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  logger.warn('Faltam variáveis de ambiente do Supabase no .env');
}

export const db = supabase;

export const initDB = async () => {
  if (!db) {
    logger.warn('Database (Supabase) não inicializado. initDB cancelado.');
    return;
  }
  
  try {
    const { data: users, error } = await db
      .from('users')
      .select('*')
      .eq('email', 'admin@admin.com');
      
    if (error) throw error;
    
    if (!users || users.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('SenhaSegura123!', salt);
      
      const { error: insertError } = await db.from('users').insert([{
        email: 'admin@admin.com',
        password: hashedPassword,
        two_factor_secret: process.env.TWO_FACTOR_MOCK_SECRET || 'DEFAULT_MOCK_SECRET',
      }]);
      
      if (insertError) throw insertError;
      logger.info('Usuário padrão (admin@admin.com) criado com nova senha segura no Supabase');
    } else {
      const adminUser = users[0];
      const isWeakPassword = await bcrypt.compare('admin', adminUser.password);
      
      if (isWeakPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('SenhaSegura123!', salt);
        await db.from('users').update({ password: hashedPassword }).eq('id', adminUser.id);
        logger.info('Senha antiga e fraca do admin foi atualizada para SenhaSegura123!');
      }
    }
  } catch (error) {
    logger.error('Erro ao inicializar o banco de dados (Supabase)', error);
  }
};
