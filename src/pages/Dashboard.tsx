import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DataImport } from "@/components/DataImport";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AmazonMetricsDisplay } from "@/components/AmazonMetricsDisplay";
import { calculateMetrics } from "@/utils/amazonMetrics";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Insights Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Track and analyze your Amazon advertising performance</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
                <form className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search campaigns..."
                    className="max-w-[300px] border-gray-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" size="icon" variant="secondary">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                
                <Select
                  value={dateRange}
                  onValueChange={handleDateRangeChange}
                >
                  <SelectTrigger className="w-[180px] border-gray-300">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="14">Last 14 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : metricsData ? (
              <div className="space-y-8">
                <AmazonMetricsDisplay metrics={metricsData} />
                
                <Tabs defaultValue="insights" className="w-full">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="keywords">Keywords</TabsTrigger>
                    <TabsTrigger value="competitors">Competitors</TabsTrigger>
                  </TabsList>

                  <TabsContent value="insights">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Revenue Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            {/* Revenue chart will go here */}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Top Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Top products list will go here */}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="products">
                    <Card>
                      <CardHeader>
                        <CardTitle>Product Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* Product performance table will go here */}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="keywords">
                    <Card>
                      <CardHeader>
                        <CardTitle>Keyword Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* Keyword analysis table will go here */}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="competitors">
                    <Card>
                      <CardHeader>
                        <CardTitle>Competitor Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* Competitor analysis content will go here */}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
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