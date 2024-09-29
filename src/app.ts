import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';

import db from '@/config/dbClient';
import env from '@/config/env';
import logger from '@/logger';
import rateLimiter from '@/middlewares/rateLimiter';
import loadRoutes from '@/config/loadRoutes';
import { errorHandler } from '@/middlewares/errorHandler';
import { requestLogger } from '@/middlewares/requestLogger';
import { notSupportedHandler } from '@/middlewares/notSupportedHandler';

// To create DB singleton
logger.silent(db);

logger.info('server started');
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

// Secure the app by setting various HTTP headers
app.use(helmet());

// Rate limiting to prevent abuse
app.use(rateLimiter);

// Log incoming requests
app.use(requestLogger);

// Routes
loadRoutes(app);

// Handle errors
app.use(errorHandler);

// Handle unsupported routes
app.use(notSupportedHandler);

export default app;
