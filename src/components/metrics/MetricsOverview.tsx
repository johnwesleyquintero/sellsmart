import { MetricCard } from "@/components/MetricCard";
import { DollarSign, TrendingUp, ShoppingCart, BarChart } from "lucide-react";
import { SalesMetrics, PerformanceMetrics } from "@/types/metrics";

interface MetricsOverviewProps {
  sales: SalesMetrics;
  performance: PerformanceMetrics;
}

export function MetricsOverview({ sales, performance }: MetricsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Sales"
        value={`$${sales.totalSales.toLocaleString()}`}
        trend={10}
        icon={<DollarSign className="w-4 h-4" />}
      />
      <MetricCard
        title="ROAS"
        value={`${performance.roas.toFixed(2)}x`}
        trend={5}
        icon={<TrendingUp className="w-4 h-4" />}
      />
      <MetricCard
        title="Total Orders"
        value={sales.totalOrders.toString()}
        trend={15}
        icon={<ShoppingCart className="w-4 h-4" />}
      />
      <MetricCard
        title="Conversion Rate"
        value={`${performance.conversionRate.toFixed(2)}%`}
        trend={8}
        icon={<BarChart className="w-4 h-4" />}
      />
    </div>
  );
}