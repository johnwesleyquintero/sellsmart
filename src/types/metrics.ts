export interface SalesMetrics {
  totalSales: number;
  totalOrders: number;
}

export interface PerformanceMetrics {
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  conversionRate: number;
  roas: number;
}

export interface PeriodMetrics {
  period: string;
  impressions: number;
  clicks: number;
  spend: number;
  sales: number;
  orders: number;
  acos: number;
  roas: number;
  ctr: number;
}