import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { corsConfig, rateLimiter, securityHeaders } from '~/config/security';

export const applySecurityMiddleware = (app: express.Application): void => {
  // CORS must be applied before helmet to prevent conflicts
  app.use(cors(corsConfig));

  // Basic security headers
  app.use(helmet(securityHeaders));

  // Rate limiting
  app.use(rateLimiter);

  // Cookie parsing
  app.use(cookieParser());

  // Compression
  app.use(compression());

  // Logging
  app.use(morgan('combined'));

  // // Error handling middleware
  // app.use((err: Error, req: express.Request, res: express.Response) => {
  //   console.error(err.stack);
  //   res.status(500).json({
  //     error: 'Internal Server Error',
  //     message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  //   });
  // });
};
