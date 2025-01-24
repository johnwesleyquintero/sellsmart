import { DashboardSidebar } from "@/components/DashboardSidebar";
import { MetricCard } from "@/components/MetricCard";
import { AdSpendChart } from "@/components/AdSpendChart";
import { DataImport } from "@/components/DataImport";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DollarSign, TrendingUp, Target, BarChart2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Sample data - in a real app this would come from an API
  const metrics = {
    adSpend: { value: 189.57, trend: -10.25 },
    impressions: { value: 139710, trend: 14.03 },
    acos: { value: 27.15, trend: 43.82 },
    revenue: { value: 698.3, trend: 59.75 }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add search functionality here
    console.log("Search submitted");
  };

  const handleDateRangeChange = (range: string) => {
    console.log("Date range changed:", range);
    // Update metrics and charts based on new date range
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

            {/* Data Import Section */}
            <div className="mb-8">
              <DataImport />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard
                title="Ad Spend"
                value={`$${metrics.adSpend.value}`}
                trend={metrics.adSpend.trend}
                icon={<DollarSign className="w-4 h-4" />}
              />
              <MetricCard
                title="Impressions"
                value={`${(metrics.impressions.value / 1000).toFixed(2)}k`}
                trend={metrics.impressions.trend}
                icon={<TrendingUp className="w-4 h-4" />}
              />
              <MetricCard
                title="ACoS"
                value={`${metrics.acos.value}%`}
                trend={metrics.acos.trend}
                icon={<Target className="w-4 h-4" />}
              />
              <MetricCard
                title="Ad Revenue"
                value={`$${metrics.revenue.value}`}
                trend={metrics.revenue.trend}
                icon={<BarChart2 className="w-4 h-4" />}
              />
            </div>

            <div className="grid gap-4 mb-8">
              <div className="rounded-lg bg-spotify-light p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Ad Spend Overview</h2>
                  <select 
                    className="bg-spotify-darker border border-gray-700 rounded-md px-3 py-2 text-sm"
                    defaultValue="daily"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <AdSpendChart />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-lg bg-spotify-light p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Campaign Performance</h2>
                  <Button variant="outline" size="sm">
                    Export Data
                  </Button>
                </div>
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  Campaign metrics chart will be displayed here
                </div>
              </div>
              <div className="rounded-lg bg-spotify-light p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Search Terms Analysis</h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  Search terms chart will be displayed here
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;