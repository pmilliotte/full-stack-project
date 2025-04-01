import type { AppRouter } from '@my-project/backend';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();
export const TrpcProvider = trpc.Provider;
