
import { useState } from "react";
import { DataImport } from "@/components/DataImport";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AmazonMetricsDisplay } from "@/components/AmazonMetricsDisplay";
import { calculateMetrics } from "@/utils/amazonMetrics";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { KPISection } from "@/components/metrics/KPISection";
import { TACOSChart } from "@/components/metrics/TACOSChart";
import { KeywordRankingTable } from "@/components/metrics/KeywordRankingTable";
import { WorkspaceIntegration } from "@/components/google/WorkspaceIntegration";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: "14",
    marketplace: "all",
    category: "all"
  });

  // Fetch metrics data from Supabase with filters
  const { data: metricsData, isLoading } = useQuery({
    queryKey: ['metrics', filters],
    queryFn: async () => {
      let query = supabase
        .from('amazon_ads_metrics')
        .select('*');
        
      // Apply filters
      if (filters.dateRange !== 'all') {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(filters.dateRange));
        query = query.gte('date', startDate.toISOString().split('T')[0]);
      }
      
      if (filters.marketplace !== 'all') {
        query = query.eq('marketplace_string_id', filters.marketplace);
      }
      
      if (filters.category !== 'all') {
        query = query.eq('advertised_product_category', filters.category);
      }
      
      const { data, error } = await query.order('date', { ascending: true });
      
      if (error) throw error;
      return calculateMetrics(data || []);
    }
  });

  // Sample data for components
  const sampleTacosData = [
    { date: '2024-01', acos: 15, tacos: 20 },
    { date: '2024-02', acos: 12, tacos: 18 },
    { date: '2024-03', acos: 18, tacos: 22 },
    // Add more sample data as needed
  ];

  const sampleKeywordRankings = [
    { keyword: 'amazon seller', rank: 1, previousRank: 2, searchVolume: 10000, change: 1 },
    { keyword: 'fba tools', rank: 3, previousRank: 5, searchVolume: 5000, change: 2 },
    // Add more sample data as needed
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 p-8 space-y-6">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            
            <DashboardFilters onFilterChange={setFilters} />

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : metricsData ? (
              <div className="space-y-6">
                {/* KPI Section */}
                <KPISection
                  totalSales={metricsData.totalSales || 0}
                  totalOrders={metricsData.totalOrders || 0}
                  roas={metricsData.roas || 0}
                  conversionRate={metricsData.conversionRate || 0}
                />

                {/* TACOS Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TACOSChart data={sampleTacosData} />
                  <KeywordRankingTable rankings={sampleKeywordRankings} />
                </div>

                {/* Google Workspace Integration */}
                <WorkspaceIntegration />

                {/* Extended Metrics Display */}
                <AmazonMetricsDisplay metrics={metricsData} />
                
                {/* Dashboard Tabs for Additional Analysis */}
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
