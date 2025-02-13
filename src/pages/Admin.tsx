import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { APIKeyManagement } from "@/components/admin/APIKeyManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Users } from "lucide-react";

const Admin = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gray-50 dark:bg-background">
        <header className="bg-gradient-to-r from-primary to-secondary text-foreground p-4">
          <h1 className="text-xl font-bold">My Glorious Admin Panel</h1>
        </header>

        <aside className="w-sidebar bg-white dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-700">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 p-6">
        
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Manage API keys and users</p>
          </div>

          <Tabs defaultValue="api-keys" className="space-y-6">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="api-keys" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                API Keys
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api-keys">
              <APIKeyManagement />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;