import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';

import db from '@/config/dbClient';
import env from '@/config/env';
import logger from '@/logger';
import rateLimiter from '@/middlewares/rateLimiter';
import loadRoutes from '@/config/loadRoutes';

// import { errorHandler } from './middlewares/errorHandler';

// To create DB singleton
logger.silent(db);

logger.info('server started');
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
// app.use(requestLogger);

// Routes
loadRoutes(app);

// Error Handler
// app.use(errorHandler);

// Not Supported Handler
// TODO: Add NotSupportedHandler

export default app;
