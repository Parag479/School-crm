import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import apiRouter from './routes/api.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// Security and utility middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: true, // Allow web clients
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Static directory for uploaded images and documents
app.use('/uploads', express.static(env.UPLOAD_DIR));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'EduManage School ERP Backend API',
    version: '1.0.0',
    mode: env.NODE_ENV,
  });
});

// Swagger / OpenAPI schema endpoint
app.get('/api/docs.json', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'EduManage School ERP REST API',
      version: '1.0.0',
      description: 'API documentation for Indian School Website & ERP CRM management system',
    },
    servers: [{ url: '/api/v1' }],
  });
});

// Mount Master API v1 Router
app.use('/api/v1', apiRouter);

// Centralized error handling
app.use(errorHandler);

// Start server
if (env.NODE_ENV !== 'test') {
  const server = app.listen(env.PORT, () => {
    logger.info(`=======================================================`);
    logger.info(`  🎓 EduManage School ERP Backend Server Started`);
    logger.info(`  🌐 Listening on: http://localhost:${env.PORT}`);
    logger.info(`  📡 API Base URL: http://localhost:${env.PORT}/api/v1`);
    logger.info(`  🏥 Health Check: http://localhost:${env.PORT}/health`);
    logger.info(`=======================================================`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(`Port ${env.PORT} is already in use. Please terminate existing process.`);
    } else {
      logger.error('Server failed to start:', err);
    }
  });
}

export default app;

