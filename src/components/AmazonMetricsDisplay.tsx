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

interface MetricsDisplayProps {
  metrics: {
    performance: {
      impressions: number;
      clicks: number;
      spend: number;
      ctr: number;
      conversionRate: number;
      roas: number;
    };
    sales: {
      totalSales: number;
      totalOrders: number;
    };
    weeklyMetrics: Array<{
      period: string;
      impressions: number;
      clicks: number;
      spend: number;
      sales: number;
      orders: number;
      acos: number;
      roas: number;
      ctr: number;
    }>;
    monthlyMetrics: Array<{
      period: string;
      impressions: number;
      clicks: number;
      spend: number;
      sales: number;
      orders: number;
      acos: number;
      roas: number;
      ctr: number;
    }>;
    detailedMetrics: {
      asinMetrics: Array<{
        asin: string;
        impressions: number;
        clicks: number;
        spend: number;
        sales: number;
        orders: number;
        conversionRate: number;
        title: string;
        category: string;
      }>;
      searchTermMetrics: Array<{
        searchTerm: string;
        impressions: number;
        clicks: number;
        spend: number;
        sales: number;
        orders: number;
        conversionRate: number;
      }>;
      skuMetrics: Array<{
        sku: string;
        impressions: number;
        clicks: number;
        spend: number;
        sales: number;
        orders: number;
        conversionRate: number;
      }>;
    };
  };
}

export function AmazonMetricsDisplay({ metrics }: MetricsDisplayProps) {
  // Add null checks and default values
  const totalSales = metrics?.sales?.totalSales ?? 0;
  const totalOrders = metrics?.sales?.totalOrders ?? 0;
  const roas = metrics?.performance?.roas ?? 0;
  const conversionRate = metrics?.performance?.conversionRate ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Sales"
          value={`$${totalSales.toLocaleString()}`}
          trend={10}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <MetricCard
          title="ROAS"
          value={`${roas.toFixed(2)}x`}
          trend={5}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          title="Total Orders"
          value={totalOrders.toString()}
          trend={15}
          icon={<ShoppingCart className="w-4 h-4" />}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${conversionRate.toFixed(2)}%`}
          trend={8}
          icon={<BarChart className="w-4 h-4" />}
        />
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList>
          <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Analysis</TabsTrigger>
          <TabsTrigger value="asin">ASIN Analysis</TabsTrigger>
          <TabsTrigger value="search">Search Terms</TabsTrigger>
          <TabsTrigger value="sku">SKU Analysis</TabsTrigger>
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
                    {metrics.weeklyMetrics.map((week, index) => (
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
                    {metrics.monthlyMetrics.map((month, index) => (
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

        <TabsContent value="asin">
          <Card className="bg-spotify-light text-white">
            <CardHeader>
              <CardTitle>ASIN Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-400">ASIN</TableHead>
                      <TableHead className="text-gray-400">Title</TableHead>
                      <TableHead className="text-gray-400">Category</TableHead>
                      <TableHead className="text-gray-400">Spend</TableHead>
                      <TableHead className="text-gray-400">Sales</TableHead>
                      <TableHead className="text-gray-400">Conv. Rate</TableHead>
                      <TableHead className="text-gray-400">Orders</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.detailedMetrics.asinMetrics.map((asin, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{asin.asin}</TableCell>
                        <TableCell>{asin.title}</TableCell>
                        <TableCell>{asin.category}</TableCell>
                        <TableCell>${asin.spend.toLocaleString()}</TableCell>
                        <TableCell>${asin.sales.toLocaleString()}</TableCell>
                        <TableCell>{asin.conversionRate.toFixed(2)}%</TableCell>
                        <TableCell>{asin.orders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search">
          <Card className="bg-spotify-light text-white">
            <CardHeader>
              <CardTitle>Search Term Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-400">Search Term</TableHead>
                      <TableHead className="text-gray-400">Impressions</TableHead>
                      <TableHead className="text-gray-400">Clicks</TableHead>
                      <TableHead className="text-gray-400">Spend</TableHead>
                      <TableHead className="text-gray-400">Sales</TableHead>
                      <TableHead className="text-gray-400">Conv. Rate</TableHead>
                      <TableHead className="text-gray-400">Orders</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.detailedMetrics.searchTermMetrics.map((term, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{term.searchTerm}</TableCell>
                        <TableCell>{term.impressions.toLocaleString()}</TableCell>
                        <TableCell>{term.clicks.toLocaleString()}</TableCell>
                        <TableCell>${term.spend.toLocaleString()}</TableCell>
                        <TableCell>${term.sales.toLocaleString()}</TableCell>
                        <TableCell>{term.conversionRate.toFixed(2)}%</TableCell>
                        <TableCell>{term.orders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sku">
          <Card className="bg-spotify-light text-white">
            <CardHeader>
              <CardTitle>SKU Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-400">SKU</TableHead>
                      <TableHead className="text-gray-400">Impressions</TableHead>
                      <TableHead className="text-gray-400">Clicks</TableHead>
                      <TableHead className="text-gray-400">Spend</TableHead>
                      <TableHead className="text-gray-400">Sales</TableHead>
                      <TableHead className="text-gray-400">Conv. Rate</TableHead>
                      <TableHead className="text-gray-400">Orders</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.detailedMetrics.skuMetrics.map((sku, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sku.sku}</TableCell>
                        <TableCell>{sku.impressions.toLocaleString()}</TableCell>
                        <TableCell>{sku.clicks.toLocaleString()}</TableCell>
                        <TableCell>${sku.spend.toLocaleString()}</TableCell>
                        <TableCell>${sku.sales.toLocaleString()}</TableCell>
                        <TableCell>{sku.conversionRate.toFixed(2)}%</TableCell>
                        <TableCell>{sku.orders}</TableCell>
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