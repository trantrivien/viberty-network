// src/config/env.ts
import path from 'path';
import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || 'development';

const envPath = path.resolve(__dirname, `.env.${NODE_ENV}`);
const result = dotenv.config({ path: envPath });

if (result.error) {
  throw new Error(`❌ Failed to load .env.${NODE_ENV}: ${result.error}`);
}

export const env = {
    port: process.env.PORT || '',
    database: {
        host: process.env.DATABASE_HOST || '',
        user: process.env.DATABASE_USER || '',
        password: process.env.DATABASE_PASSWORD || '',
        name: process.env.DATABASE_NAME || '',
    },
    jwtSecret: process.env.JWT_SECRET || '',
};
