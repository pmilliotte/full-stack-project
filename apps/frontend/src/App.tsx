import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React from 'react';
import { Toaster } from 'sonner';

import { AppRoutes } from '~/navigation/AppRoutes';
import { auth } from '~/utils/auth';
import { trpc, TrpcProvider } from '~/utils/trpc';

const queryClient = new QueryClient();

export const App = (): React.ReactElement => {
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: `${import.meta.env.VITE_API_URL}/trpc`,
        async headers() {
          const bearer = await auth.getBearerToken();
          return {
            Authorization: bearer !== undefined ? `Bearer ${bearer}` : '',
          };
        },
      }),
    ],
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TrpcProvider client={trpcClient} queryClient={queryClient}>
        <AppRoutes />
        <Toaster />
      </TrpcProvider>
    </QueryClientProvider>
  );
};
