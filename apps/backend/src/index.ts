import 'dotenv/config';
import express from 'express';

import { applySecurityMiddleware } from '~/middleware/security';
import { applyTrpcMiddleware } from '~/middleware/trpc';

const app = express();
const port = process.env.PORT ?? 3001;

applySecurityMiddleware(app);

applyTrpcMiddleware(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});

export type { AppRouter } from './router';
