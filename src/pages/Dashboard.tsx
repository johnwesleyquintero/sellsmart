import { useState } from "react";
import { DataImport } from "@/components/DataImport";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AmazonMetricsDisplay } from "@/components/AmazonMetricsDisplay";
import { calculateMetrics } from "@/utils/amazonMetrics";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { syncCampaignsToSupabase } from "@/integrations/amazon/api";
import { generateOptimizationSuggestion } from "@/integrations/gemini/api";
import BasicChart from "@/components/metrics/BasicChart";
import { Link } from 'react-router-dom';
import { DashboardSidebar } from "@/components/DashboardSidebar";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: "14",
    marketplace: "all",
    category: "all"
  });

  const handleSyncClick = async () => {
    await syncCampaignsToSupabase();
  };

  const handleOptimizeClick = async () => {
    // Placeholder for Gemini API call
    try {
      // const suggestion = await generateOptimizationSuggestion("Suggest keywords for my campaign");
      // console.log("Gemini Suggestion:", suggestion);
      console.log("Gemini optimization triggered");
    } catch (error) {
      console.error("Error generating optimization suggestion:", error);
    }
  };
  
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-y-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <button onClick={handleSyncClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
              Sync Campaigns
            </button>
            <button onClick={handleOptimizeClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 mb-4">
              Optimize
            </button>
            <BasicChart
              labels={["Jan", "Feb", "Mar", "Apr", "May"]}
              data={[10, 20, 15, 25, 30]}
              title="Sample Data"
            />
            <DashboardFilters
              onFilterChange={setFilters}
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