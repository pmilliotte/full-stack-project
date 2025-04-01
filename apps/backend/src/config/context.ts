import { databaseService } from '@my-project/storage';
import { User } from '@supabase/auth-js';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

import { supabase } from '~/config/supabase';

export const createContext = async ({
  req,
}: CreateExpressContextOptions): Promise<{
  db: ReturnType<typeof databaseService.getClient>;
  user?: User;
}> => {
  const authHeader = req.headers.authorization;

  if (authHeader === undefined || !authHeader.startsWith('Bearer ')) {
    return {
      db: databaseService.getClient(),
    };
  }

  const token = authHeader.split(' ')[1];
  try {
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser(token);

    if (!error && authUser) {
      return {
        db: databaseService.getClient(),
        user: authUser,
      };
    }

    return {
      db: databaseService.getClient(),
    };
  } catch {
    return {
      db: databaseService.getClient(),
    };
  }
};

export type Context = Awaited<ReturnType<typeof createContext>>;
