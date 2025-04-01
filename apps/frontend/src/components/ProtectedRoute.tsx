import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router';

import { auth } from '~/utils/auth';

export const ProtectedRoute = (): ReactElement => {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['authSession'],
    queryFn: () => auth.getUser(),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError || user === undefined) {
    void auth.signOut();

    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
};
