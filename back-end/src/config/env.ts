require('dotenv').config();




export const env = {
  port: process.env.PORT || '',
  database: {
    host: process.env.DATABASE_HOST || '',
    user: process.env.DATABASE_USER || '',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE_NAME || '',
  },
  jwtSecret: process.env.JWT_SECRET || "fallback_secret",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "access_fallback",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "refresh_fallback",
};