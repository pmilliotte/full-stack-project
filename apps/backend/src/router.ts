import { echoInput, helloInput } from '@my-project/shared';
import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from './trpc';

export const appRouter = router({
  hello: publicProcedure.input(helloInput).query(({ input }) => ({
    greeting: `Hello ${input.name ?? 'World'}!`,
  })),

  echo: publicProcedure.input(echoInput).mutation(({ input }) => ({
    message: input.message,
  })),

  users: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const users = await ctx.db.user.findMany();
      return users;
    }),

    create: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const user = await ctx.db.user.create({
          data: input,
        });
        return user;
      }),
  }),
});

export type AppRouter = typeof appRouter;
