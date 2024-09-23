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

  // Auth
  JWT_SECRET: process.env.JWT_SECRET as string,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string,

  // Github
  GITHUB_AUTHENTICATION_CALLBACK_URL:
    process.env.GITHUB_AUTHENTICATION_CALLBACK_URL,
  GITHUB_ACCESS_TOKEN_CALLBACK_URL:
    process.env.GITHUB_ACCESS_TOKEN_CALLBACK_URL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_ACCESS_SCOPE: process.env.GITHUB_ACCESS_SCOPE,

  // Slack
  SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
  SLACK_ACCESS_TOKEN_CALLBACK_URL: process.env.SLACK_ACCESS_TOKEN_CALLBACK_URL,
  SLACK_SCOPES: process.env.SLACK_SCOPES,
  SLACK_USERS_SCOPES: process.env.SLACK_USERS_SCOPES,
  ZOOM_SECRET_TOKEN: process.env.ZOOM_SECRET_TOKEN,
  ZOOM_CLIENT_ID: process.env.ZOOM_CLIENT_ID,
  ZOOM_ACCESS_TOKEN_CALLBACK_URL: process.env.ZOOM_ACCESS_TOKEN_CALLBACK_URL,
  ZOOM_CLIENT_SECRET: process.env.ZOOM_CLIENT_SECRET
};

export default env;
