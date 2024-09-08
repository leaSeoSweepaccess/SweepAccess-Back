import dotenv from 'dotenv';

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  // jwtSecret: process.env.JWT_SECRET || '',
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  DB_ID_LENGTH: Number(process.env.DB_ID_LENGTH) || 12,
  COMMON_RATE_LIMIT_WINDOW_MS:
    Number(process.env.COMMON_RATE_LIMIT_WINDOW_MS) || 1000,
  COMMON_RATE_LIMIT_MAX_REQUESTS:
    Number(process.env.COMMON_RATE_LIMIT_MAX_REQUESTS) || 20,
  GITHUB_AUTHENTICATION_CALLBACK_URL:
    process.env.GITHUB_AUTHENTICATION_CALLBACK_URL,
  GITHUB_ACCESS_TOKEN_CALLBACK_URL:
    process.env.GITHUB_ACCESS_TOKEN_CALLBACK_URL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_ACCESS_SCOPE: process.env.GITHUB_ACCESS_SCOPE,
};

export default env;
