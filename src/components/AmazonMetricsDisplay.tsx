import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { BarChart, DollarSign, TrendingUp, ShoppingCart } from "lucide-react";
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
    campaignMetrics: Array<{
      name: string;
      spend: number;
      impressions: number;
      clicks: number;
      orders: number;
      sales: number;
      ctr: string;
      acos: string;
      roas: string;
    }>;
  };
}

export function AmazonMetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Sales"
          value={`$${metrics.sales.totalSales.toLocaleString()}`}
          trend={10}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <MetricCard
          title="ROAS"
          value={`${metrics.performance.roas.toFixed(2)}x`}
          trend={5}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          title="Total Orders"
          value={metrics.sales.totalOrders.toString()}
          trend={15}
          icon={<ShoppingCart className="w-4 h-4" />}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${metrics.performance.conversionRate.toFixed(2)}%`}
          trend={8}
          icon={<BarChart className="w-4 h-4" />}
        />
      </div>

      <Card className="bg-spotify-light text-white">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Campaign</TableHead>
                  <TableHead className="text-gray-400">Spend</TableHead>
                  <TableHead className="text-gray-400">Sales</TableHead>
                  <TableHead className="text-gray-400">ROAS</TableHead>
                  <TableHead className="text-gray-400">ACoS</TableHead>
                  <TableHead className="text-gray-400">CTR</TableHead>
                  <TableHead className="text-gray-400">Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metrics.campaignMetrics.map((campaign, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>${campaign.spend.toLocaleString()}</TableCell>
                    <TableCell>${campaign.sales.toLocaleString()}</TableCell>
                    <TableCell>{campaign.roas}x</TableCell>
                    <TableCell>{campaign.acos}%</TableCell>
                    <TableCell>{campaign.ctr}%</TableCell>
                    <TableCell>{campaign.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}