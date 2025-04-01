import { Loader2 } from 'lucide-react';
import React from 'react';

import { useBreadcrumb } from '~/lib/hooks/useBreadcrumb';
import { trpc } from '~/utils/trpc';

export const Query = (): React.ReactElement => {
  useBreadcrumb([
    {
      label: 'Query',
    },
  ]);

  const { data: users, isLoading } = trpc.users.list.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Users</h1>
      <div className="grid gap-4">
        {users?.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
          >
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
