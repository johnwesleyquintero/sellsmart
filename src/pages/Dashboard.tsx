import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DataImport } from "@/components/DataImport";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CampaignPerformanceChart } from "@/components/metrics/CampaignPerformanceChart";
import { SearchTermAnalysis } from "@/components/metrics/SearchTermAnalysis";
import { AmazonMetricsDisplay } from "@/components/AmazonMetricsDisplay";
import { TargetsOverview } from "@/components/metrics/TargetsOverview";
import { useState } from "react";

const Dashboard = () => {
  const [metrics, setMetrics] = useState<any>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search submitted");
  };

  const handleDateRangeChange = (range: string) => {
    console.log("Date range changed:", range);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-spotify-darker via-[#1a2c1a] to-spotify-darker text-white">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold">Overview</h1>
                <p className="text-gray-400 text-sm mt-1">Track your advertising performance</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search campaigns..."
                    className="max-w-[300px] bg-spotify-light border-gray-700"
                  />
                  <Button type="submit" size="icon" variant="secondary">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                
                <select 
                  className="bg-spotify-light border border-gray-700 rounded-md px-3 py-2 text-sm"
                  onChange={(e) => handleDateRangeChange(e.target.value)}
                >
                  <option value="7">Last 7 days</option>
                  <option value="14" selected>Last 14 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
              </div>
            </div>

            <div className="space-y-8">
              <AmazonMetricsDisplay />
              
              <div className="bg-spotify-light rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Performance Targets</h2>
                <TargetsOverview />
              </div>

              {metrics && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <CampaignPerformanceChart data={metrics.weeklyMetrics} />
                  </div>
                  <div>
                    <SearchTermAnalysis data={metrics.detailedMetrics.searchTermMetrics} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;