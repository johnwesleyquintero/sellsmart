export interface AmazonMetric {
  fieldGroup: string;
  field: string;
  type: 'METRIC' | 'DIMENSION';
  dataType: string;
  value: number | string;
}

export const calculateMetrics = (data: any[]) => {
  return {
    performance: {
      impressions: data.reduce((sum, row) => sum + parseInt(row.Impressions || 0), 0),
      clicks: data.reduce((sum, row) => sum + parseInt(row.Clicks || 0), 0),
      spend: data.reduce((sum, row) => sum + parseFloat((row.Spend || "0").replace("$", "").replace(",", "")), 0),
      ctr: data.reduce((sum, row) => sum + parseFloat((row["Click-Thru Rate (CTR)"] || "0").replace("%", "")), 0) / data.length,
      conversionRate: data.reduce((sum, row) => sum + parseFloat((row["7 Day Conversion Rate"] || "0").replace("%", "")), 0) / data.length,
      roas: data.reduce((sum, row) => {
        const roas = parseFloat((row["Total Return on Advertising Spend (ROAS)"] || "0").toString());
        return sum + (isNaN(roas) ? 0 : roas);
      }, 0) / data.length,
    },
    sales: {
      totalSales: data.reduce((sum, row) => {
        const sales = parseFloat((row["7 Day Total Sales"] || "0").replace("$", "").replace(",", ""));
        return sum + (isNaN(sales) ? 0 : sales);
      }, 0),
      totalOrders: data.reduce((sum, row) => sum + parseInt(row["7 Day Total Orders (#)"] || 0), 0),
    },
    campaignMetrics: processCampaignMetrics(data)
  };
};

const processCampaignMetrics = (data: any[]) => {
  const campaigns = new Map();
  
  data.forEach(row => {
    const campaignName = row["Campaign Name"];
    if (!campaignName) return;
    
    if (!campaigns.has(campaignName)) {
      campaigns.set(campaignName, {
        spend: 0,
        impressions: 0,
        clicks: 0,
        orders: 0,
        sales: 0
      });
    }
    
    const campaign = campaigns.get(campaignName);
    campaign.spend += parseFloat((row.Spend || "0").replace("$", "").replace(",", ""));
    campaign.impressions += parseInt(row.Impressions || 0);
    campaign.clicks += parseInt(row.Clicks || 0);
    campaign.orders += parseInt(row["7 Day Total Orders (#)"] || 0);
    campaign.sales += parseFloat((row["7 Day Total Sales"] || "0").replace("$", "").replace(",", ""));
  });
  
  return Array.from(campaigns.entries()).map(([name, metrics]) => ({
    name,
    ...metrics,
    ctr: (metrics.clicks / metrics.impressions * 100).toFixed(2),
    acos: ((metrics.spend / metrics.sales) * 100).toFixed(2),
    roas: (metrics.sales / metrics.spend).toFixed(2)
  }));
};