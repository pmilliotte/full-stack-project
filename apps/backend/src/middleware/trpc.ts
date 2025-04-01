import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';

import { createContext } from '~/config/context';
import { appRouter } from '~/router';

export const applyTrpcMiddleware = (app: express.Application): void => {
  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
};
