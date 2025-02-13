interface Metric {
  date: string;
  acos: number;
  amount_spent: number;
  total_ad_sales: number;
}

export const calculateTacosData = (metrics: Metric[] | undefined) => {
  return metrics?.map(metric => ({
    date: metric.date,
    acos: metric.acos || 0,
    tacos: ((metric.amount_spent || 0) / (metric.total_ad_sales || 1)) * 100
  })) || [];
};