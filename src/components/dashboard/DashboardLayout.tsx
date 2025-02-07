import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from '../DashboardSidebar';
import { useAuth } from '@/components/AuthProvider';
import { Loader2 } from 'lucide-react';

export function DashboardLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}