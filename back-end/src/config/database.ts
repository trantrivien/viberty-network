import { createPool, Pool } from 'mysql2/promise';
import { env } from './env';

export const initDatabase = async (): Promise<Pool> => {
  const pool = createPool({
    host: env.database.host,
    user: env.database.user,
    password: env.database.password,
    database: env.database.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });


  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};