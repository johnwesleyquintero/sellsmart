import { DollarSign, TrendingUp, ShoppingCart, BarChart } from "lucide-react";
import { KPICard } from "./metrics/KPICard";
import { MetricsTabs } from "./metrics/MetricsTabs";

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
  const totalSales = metrics?.sales?.totalSales ?? 0;
  const totalOrders = metrics?.sales?.totalOrders ?? 0;
  const roas = metrics?.performance?.roas ?? 0;
  const conversionRate = metrics?.performance?.conversionRate ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Sales"
          value={`$${totalSales.toLocaleString()}`}
          trend={10}
          icon={DollarSign}
        />
        <KPICard
          title="ROAS"
          value={`${roas.toFixed(2)}x`}
          trend={5}
          icon={TrendingUp}
        />
        <KPICard
          title="Total Orders"
          value={totalOrders.toString()}
          trend={15}
          icon={ShoppingCart}
        />
        <KPICard
          title="Conversion Rate"
          value={`${conversionRate.toFixed(2)}%`}
          trend={8}
          icon={BarChart}
        />
      </div>

      <MetricsTabs
        weeklyMetrics={metrics.weeklyMetrics}
        monthlyMetrics={metrics.monthlyMetrics}
        detailedMetrics={metrics.detailedMetrics}
      />
    </div>
  );
}