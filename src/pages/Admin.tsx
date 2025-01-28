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
import { MetricsTabs } from "@/components/metrics/MetricsTabs";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample KPI data
  const kpiData = [
    {
      title: "Total Users",
      value: "1,234",
      trend: 12.5,
      icon: Users,
    },
    {
      title: "Revenue",
      value: "$45,678",
      trend: 8.2,
      icon: DollarSign,
    },
    {
      title: "Growth Rate",
      value: "23.5%",
      trend: 15.3,
      icon: TrendingUp,
    },
    {
      title: "Active Campaigns",
      value: "45",
      trend: 5.7,
      icon: Activity,
    },
  ];

  return (
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
              <Button className="bg-spotify-green hover:bg-spotify-green/90 text-black font-bold">
                Add User
              </Button>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-spotify-green font-spotify">User</th>
                    <th className="text-left py-3 px-4 text-spotify-green font-spotify">Email</th>
                    <th className="text-left py-3 px-4 text-spotify-green font-spotify">Status</th>
                    <th className="text-left py-3 px-4 text-spotify-green font-spotify">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample user data */}
                  <tr className="border-b border-gray-700 hover:bg-spotify-dark/50 transition-colors">
                    <td className="py-3 px-4 text-white">John Doe</td>
                    <td className="py-3 px-4 text-white">john@example.com</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-spotify-green text-black font-bold">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-spotify-green hover:text-spotify-green/80">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Section */}
        <MetricsTabs
          weeklyMetrics={[]}
          monthlyMetrics={[]}
          detailedMetrics={{
            asinMetrics: [],
            searchTermMetrics: [],
            skuMetrics: [],
          }}
        />
      </div>
    </div>
  );
};

export default Admin;