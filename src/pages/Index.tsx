import { DashboardSidebar } from "@/components/DashboardSidebar";
import { MetricCard } from "@/components/MetricCard";
import { AdSpendChart } from "@/components/AdSpendChart";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DollarSign, TrendingUp, Target, BarChart2 } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-spotify-darker text-white">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold">Overview</h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Last 14 Days</span>
                <span>•</span>
                <span>Compare</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard
                title="Ad Spend"
                value="$189.57"
                trend={-10.25}
                icon={<DollarSign className="w-4 h-4" />}
              />
              <MetricCard
                title="Impressions"
                value="139.71k"
                trend={14.03}
                icon={<TrendingUp className="w-4 h-4" />}
              />
              <MetricCard
                title="ACoS"
                value="27.15%"
                trend={43.82}
                icon={<Target className="w-4 h-4" />}
              />
              <MetricCard
                title="Ad Revenue"
                value="$698.3"
                trend={59.75}
                icon={<BarChart2 className="w-4 h-4" />}
              />
            </div>

            <div className="grid gap-4 mb-8">
              <div className="rounded-lg bg-spotify-light p-6">
                <h2 className="text-lg font-semibold mb-4">Ad Spend Overview</h2>
                <AdSpendChart />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-lg bg-spotify-light p-6">
                <h2 className="text-lg font-semibold mb-4">Campaign Performance</h2>
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  Campaign metrics chart will be displayed here
                </div>
              </div>
              <div className="rounded-lg bg-spotify-light p-6">
                <h2 className="text-lg font-semibold mb-4">Search Terms Analysis</h2>
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