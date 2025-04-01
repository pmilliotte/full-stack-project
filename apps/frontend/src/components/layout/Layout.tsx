import React, { useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { Separator } from '~/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { BreadcrumbContext, Breadcrumb as BreadcrumbType } from '~/lib/context/useBreadcrumb';

import { AppSidebar } from './AppSidebar';

export const Layout = (): React.ReactElement => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbType>([]);
  const breadcrumbContextValue = useMemo(() => ({ breadcrumb, setBreadcrumb }), [breadcrumb]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <BreadcrumbContext.Provider value={breadcrumbContextValue}>
          <SidebarInset className="min-w-0">
            <header className="flex shrink-0 items-center gap-2 border-b py-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                decorative
                // @ts-ignore
                className="data-[orientation=vertical]:h-4"
                orientation="vertical"
              />
              <Breadcrumb className="ml-2">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    {breadcrumb.length > 0 ? (
                      <BreadcrumbLink href="/">Acceuil</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>Acceuil</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {breadcrumb.map(({ label, linkTo }) => (
                    <React.Fragment key={label}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {linkTo === undefined ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={linkTo}>{label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <main className="flex-1 overflow-auto p-4">
              <Outlet />
            </main>
          </SidebarInset>
        </BreadcrumbContext.Provider>
      </div>
    </SidebarProvider>
  );
};
