import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DataImport } from "@/components/DataImport";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AmazonMetricsDisplay } from "@/components/AmazonMetricsDisplay";
import { calculateMetrics } from "@/utils/amazonMetrics";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("14");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch metrics data from Supabase
  const { data: metricsData, isLoading } = useQuery({
    queryKey: ['metrics', dateRange],
    queryFn: async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(dateRange));
      
      const { data, error } = await supabase
        .from('amazon_ads_metrics')
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date', { ascending: true });
        
      if (error) throw error;
      return calculateMetrics(data || []);
    }
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-y-8">
            <DashboardHeader
              searchQuery={searchQuery}
              dateRange={dateRange}
              onSearchChange={setSearchQuery}
              onDateRangeChange={setDateRange}
            />

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : metricsData ? (
              <div className="space-y-8">
                <AmazonMetricsDisplay metrics={metricsData} />
                <DashboardTabs />
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No data available. Import your Amazon Ads data to get started.</p>
                <div className="mt-4">
                  <DataImport />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;