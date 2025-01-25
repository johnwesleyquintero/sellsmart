import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MetricsOverview } from "./metrics/MetricsOverview";
import { PerformanceTable } from "./metrics/PerformanceTable";
import { PeriodMetrics, PerformanceMetrics, SalesMetrics } from "@/types/metrics";

export function AmazonMetricsDisplay() {
  const { data: metricsData, isLoading } = useQuery({
    queryKey: ['amazonMetrics'],
    queryFn: async () => {
      const { data: salesData, error: salesError } = await supabase
        .from('sales_data')
        .select('*')
        .order('date', { ascending: false });

      if (salesError) throw salesError;

      // Calculate overall metrics
      const totalSales = salesData.reduce((sum, item) => sum + Number(item.sales), 0);
      const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
      const totalSpend = salesData.reduce((sum, item) => sum + Number(item.ad_spend), 0);
      const totalClicks = salesData.reduce((sum, item) => sum + item.ad_clicks, 0);
      const totalImpressions = salesData.reduce((sum, item) => sum + item.ad_impressions, 0);

      const performance: PerformanceMetrics = {
        impressions: totalImpressions,
        clicks: totalClicks,
        spend: totalSpend,
        ctr: (totalClicks / totalImpressions) * 100 || 0,
        conversionRate: (totalOrders / totalClicks) * 100 || 0,
        roas: totalSales / totalSpend || 0
      };

      const sales: SalesMetrics = {
        totalSales,
        totalOrders
      };

      // Group by week
      const weeklyMetrics: PeriodMetrics[] = Object.values(salesData.reduce((acc, item) => {
        const date = new Date(item.date);
        const week = `${date.getFullYear()}-W${Math.ceil((date.getDate() + date.getDay()) / 7)}`;
        
        if (!acc[week]) {
          acc[week] = {
            period: `Week ${Math.ceil((date.getDate() + date.getDay()) / 7)}`,
            impressions: 0,
            clicks: 0,
            spend: 0,
            sales: 0,
            orders: 0,
            acos: 0,
            roas: 0,
            ctr: 0
          };
        }

        acc[week].impressions += item.ad_impressions;
        acc[week].clicks += item.ad_clicks;
        acc[week].spend += Number(item.ad_spend);
        acc[week].sales += Number(item.sales);
        acc[week].orders += item.orders;
        
        acc[week].acos = (acc[week].spend / acc[week].sales) * 100 || 0;
        acc[week].roas = acc[week].sales / acc[week].spend || 0;
        acc[week].ctr = (acc[week].clicks / acc[week].impressions) * 100 || 0;

        return acc;
      }, {} as Record<string, PeriodMetrics>));

      // Group by month
      const monthlyMetrics: PeriodMetrics[] = Object.values(salesData.reduce((acc, item) => {
        const date = new Date(item.date);
        const month = date.toLocaleString('default', { month: 'long' });
        
        if (!acc[month]) {
          acc[month] = {
            period: month,
            impressions: 0,
            clicks: 0,
            spend: 0,
            sales: 0,
            orders: 0,
            acos: 0,
            roas: 0,
            ctr: 0
          };
        }

        acc[month].impressions += item.ad_impressions;
        acc[month].clicks += item.ad_clicks;
        acc[month].spend += Number(item.ad_spend);
        acc[month].sales += Number(item.sales);
        acc[month].orders += item.orders;
        
        acc[month].acos = (acc[month].spend / acc[month].sales) * 100 || 0;
        acc[month].roas = acc[month].sales / acc[month].spend || 0;
        acc[month].ctr = (acc[month].clicks / acc[month].impressions) * 100 || 0;

        return acc;
      }, {} as Record<string, PeriodMetrics>));

      return {
        performance,
        sales,
        weeklyMetrics,
        monthlyMetrics
      };
    }
  });

  if (isLoading) {
    return <div>Loading metrics...</div>;
  }

  if (!metricsData) {
    return <div>No metrics data available</div>;
  }

  return (
    <div className="space-y-6">
      <MetricsOverview 
        sales={metricsData.sales}
        performance={metricsData.performance}
      />

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList>
          <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <Card className="bg-spotify-light text-white">
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceTable 
                data={metricsData.weeklyMetrics}
                title="Week"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="bg-spotify-light text-white">
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceTable 
                data={metricsData.monthlyMetrics}
                title="Month"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}