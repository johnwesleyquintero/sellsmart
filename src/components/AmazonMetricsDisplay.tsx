import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { BarChart, DollarSign, TrendingUp, ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function AmazonMetricsDisplay() {
  const { data: metricsData, isLoading } = useQuery({
    queryKey: ['amazonMetrics'],
    queryFn: async () => {
      // Fetch overall metrics
      const { data: salesData, error: salesError } = await supabase
        .from('sales_data')
        .select('*')
        .order('date', { ascending: false });

      if (salesError) throw salesError;

      // Calculate performance metrics
      const totalSales = salesData.reduce((sum, item) => sum + Number(item.sales), 0);
      const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
      const totalSpend = salesData.reduce((sum, item) => sum + Number(item.ad_spend), 0);
      const totalClicks = salesData.reduce((sum, item) => sum + item.ad_clicks, 0);
      const totalImpressions = salesData.reduce((sum, item) => sum + item.ad_impressions, 0);

      const performance = {
        impressions: totalImpressions,
        clicks: totalClicks,
        spend: totalSpend,
        ctr: (totalClicks / totalImpressions) * 100 || 0,
        conversionRate: (totalOrders / totalClicks) * 100 || 0,
        roas: totalSales / totalSpend || 0
      };

      const sales = {
        totalSales,
        totalOrders
      };

      // Group by week
      const weeklyMetrics = salesData.reduce((acc, item) => {
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
        
        // Calculate metrics
        acc[week].acos = (acc[week].spend / acc[week].sales) * 100 || 0;
        acc[week].roas = acc[week].sales / acc[week].spend || 0;
        acc[week].ctr = (acc[week].clicks / acc[week].impressions) * 100 || 0;

        return acc;
      }, {});

      // Group by month
      const monthlyMetrics = salesData.reduce((acc, item) => {
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
        
        // Calculate metrics
        acc[month].acos = (acc[month].spend / acc[month].sales) * 100 || 0;
        acc[month].roas = acc[month].sales / acc[month].spend || 0;
        acc[month].ctr = (acc[month].clicks / acc[month].impressions) * 100 || 0;

        return acc;
      }, {});

      return {
        performance,
        sales,
        weeklyMetrics: Object.values(weeklyMetrics),
        monthlyMetrics: Object.values(monthlyMetrics)
      };
    }
  });

  if (isLoading) {
    return <div>Loading metrics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Sales"
          value={`$${metricsData.sales.totalSales.toLocaleString()}`}
          trend={10}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <MetricCard
          title="ROAS"
          value={`${metricsData.performance.roas.toFixed(2)}x`}
          trend={5}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          title="Total Orders"
          value={metricsData.sales.totalOrders.toString()}
          trend={15}
          icon={<ShoppingCart className="w-4 h-4" />}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${metricsData.performance.conversionRate.toFixed(2)}%`}
          trend={8}
          icon={<BarChart className="w-4 h-4" />}
        />
      </div>

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
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-400">Week</TableHead>
                      <TableHead className="text-gray-400">Spend</TableHead>
                      <TableHead className="text-gray-400">Sales</TableHead>
                      <TableHead className="text-gray-400">ROAS</TableHead>
                      <TableHead className="text-gray-400">ACoS</TableHead>
                      <TableHead className="text-gray-400">CTR</TableHead>
                      <TableHead className="text-gray-400">Orders</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metricsData.weeklyMetrics.map((week, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{week.period}</TableCell>
                        <TableCell>${week.spend.toLocaleString()}</TableCell>
                        <TableCell>${week.sales.toLocaleString()}</TableCell>
                        <TableCell>{week.roas.toFixed(2)}x</TableCell>
                        <TableCell>{week.acos.toFixed(2)}%</TableCell>
                        <TableCell>{week.ctr.toFixed(2)}%</TableCell>
                        <TableCell>{week.orders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="bg-spotify-light text-white">
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-400">Month</TableHead>
                      <TableHead className="text-gray-400">Spend</TableHead>
                      <TableHead className="text-gray-400">Sales</TableHead>
                      <TableHead className="text-gray-400">ROAS</TableHead>
                      <TableHead className="text-gray-400">ACoS</TableHead>
                      <TableHead className="text-gray-400">CTR</TableHead>
                      <TableHead className="text-gray-400">Orders</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metricsData.monthlyMetrics.map((month, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{month.period}</TableCell>
                        <TableCell>${month.spend.toLocaleString()}</TableCell>
                        <TableCell>${month.sales.toLocaleString()}</TableCell>
                        <TableCell>{month.roas.toFixed(2)}x</TableCell>
                        <TableCell>{month.acos.toFixed(2)}%</TableCell>
                        <TableCell>{month.ctr.toFixed(2)}%</TableCell>
                        <TableCell>{month.orders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}