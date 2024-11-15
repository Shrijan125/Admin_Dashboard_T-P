import { AppSidebar } from '@/components/custom/AppSideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function pagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="overflow-auto w-full">
        <SidebarTrigger></SidebarTrigger>
        {children}
      </main>
    </SidebarProvider>
  );
}
