import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { KPICard } from "@/components/metrics/KPICard";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
}

interface ProfileData {
  id: string;
  company_name: string | null;
}

const Admin = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch users data
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      return users;
    },
  });

  // Fetch profiles data
  const { data: profiles } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      if (error) throw error;
      return data as ProfileData[];
    },
  });

  // Fetch metrics data
  const { data: metrics } = useQuery({
    queryKey: ['admin-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('amazon_ads_metrics')
        .select('total_ad_sales, amount_spent')
        .order('date', { ascending: false })
        .limit(30);
      if (error) throw error;
      return data;
    },
  });

  // Calculate KPI data
  const totalUsers = users?.length || 0;
  const totalRevenue = metrics?.reduce((sum, m) => sum + (m.total_ad_sales || 0), 0) || 0;
  const totalSpend = metrics?.reduce((sum, m) => sum + (m.amount_spent || 0), 0) || 0;
  const activeUsers = users?.filter(u => u.last_sign_in_at)?.length || 0;

  const kpiData = [
    {
      title: "Total Users",
      value: totalUsers.toString(),
      trend: 12.5,
      icon: Users,
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      trend: 8.2,
      icon: DollarSign,
    },
    {
      title: "Total Ad Spend",
      value: `$${totalSpend.toLocaleString()}`,
      trend: 15.3,
      icon: TrendingUp,
    },
    {
      title: "Active Users",
      value: activeUsers.toString(),
      trend: 5.7,
      icon: Activity,
    },
  ];

  // Filter users based on search and status
  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && user.last_sign_in_at) ||
      (statusFilter === "inactive" && !user.last_sign_in_at);
    return matchesSearch && matchesStatus;
  });

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      
      toast({
        title: "User deleted successfully",
        description: "The user has been removed from the system.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-spotify-darker">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 font-spotify">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your platform and monitor performance</p>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                trend={kpi.trend}
                icon={kpi.icon}
                className="bg-gradient-to-b from-spotify-light to-spotify-dark border-none"
              />
            ))}
          </div>

          {/* User Management Section */}
          <Card className="bg-spotify-light border-none mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl font-spotify">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-spotify-dark border-none text-white placeholder:text-gray-400"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-spotify-dark border-none text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-spotify-dark border-none">
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* User Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-spotify-green font-spotify">User</th>
                      <th className="text-left py-3 px-4 text-spotify-green font-spotify">Company</th>
                      <th className="text-left py-3 px-4 text-spotify-green font-spotify">Status</th>
                      <th className="text-left py-3 px-4 text-spotify-green font-spotify">Joined</th>
                      <th className="text-left py-3 px-4 text-spotify-green font-spotify">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingUsers ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-white">Loading users...</td>
                      </tr>
                    ) : filteredUsers?.map((user) => {
                      const profile = profiles?.find(p => p.id === user.id);
                      return (
                        <tr key={user.id} className="border-b border-gray-700 hover:bg-spotify-dark/50 transition-colors">
                          <td className="py-3 px-4 text-white">{user.email}</td>
                          <td className="py-3 px-4 text-white">{profile?.company_name || '-'}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.last_sign_in_at ? 'bg-spotify-green text-black' : 'bg-gray-600 text-white'
                            } font-bold`}>
                              {user.last_sign_in_at ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-white">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:text-red-400"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;