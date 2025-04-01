import { Eye, Pen } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router';

import { Button } from '~/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';
import { auth } from '~/utils/auth';

export const AppSidebar = (): React.ReactElement => {
  const navigate = useNavigate();
  const signout = async (): Promise<void> => {
    await auth.signOut();
    void navigate('/login');
  };

  return (
    <Sidebar className="w-64 border-r">
      <SidebarHeader className="px-4 py-2">
        <h2 className="text-lg font-semibold">Mon projet</h2>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden p-0">
          <SidebarGroupLabel>Queries</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/query">
                    <Eye />
                    Query
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden p-0">
          <SidebarGroupLabel>Mutations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/mutation">
                    <Pen />
                    Mutation
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-2">
        <Button className="w-full" onClick={() => void signout()}>
          Se déconnecter
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
