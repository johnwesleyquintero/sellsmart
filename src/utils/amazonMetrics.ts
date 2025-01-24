import { groupBy, sumBy } from 'lodash';

interface AmazonMetric {
  fieldGroup: string;
  field: string;
  type: 'METRIC' | 'DIMENSION';
  dataType: string;
  value: number | string;
}

// Key metrics we want to track
const ESSENTIAL_METRICS = [
  'Impressions',
  'Clicks',
  'Spend',
  'Sales',
  'Orders',
  'ACOS',
  'ROAS',
  'CTR',
  'Conversion Rate',
  'ASIN',
  'SKU',
  'Search Term',
  'Campaign Name',
  'Ad Group Name',
  'Date'
];

const aggregateMetricsByPeriod = (data: any[], period: 'week' | 'month') => {
  const groupedData = groupBy(data, (item) => {
    const date = new Date(item.Date);
    if (period === 'week') {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      return startOfWeek.toISOString().split('T')[0];
    }
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  });

  return Object.entries(groupedData).map(([periodKey, items]) => ({
    period: periodKey,
    impressions: sumBy(items, 'Impressions'),
    clicks: sumBy(items, 'Clicks'),
    spend: sumBy(items, (item) => parseFloat((item.Spend || "0").replace("$", "").replace(",", ""))),
    sales: sumBy(items, (item) => parseFloat((item["Total Sales"] || "0").replace("$", "").replace(",", ""))),
    orders: sumBy(items, "Orders"),
    acos: (sumBy(items, (item) => parseFloat((item.Spend || "0").replace("$", "").replace(",", ""))) / 
          sumBy(items, (item) => parseFloat((item["Total Sales"] || "0").replace("$", "").replace(",", "")))) * 100,
    roas: sumBy(items, (item) => parseFloat((item["Total Sales"] || "0").replace("$", "").replace(",", ""))) / 
          sumBy(items, (item) => parseFloat((item.Spend || "0").replace("$", "").replace(",", ""))),
    ctr: (sumBy(items, 'Clicks') / sumBy(items, 'Impressions')) * 100,
  }));
};

const processDetailedMetrics = (data: any[]) => {
  return {
    asinMetrics: processAsinMetrics(data),
    searchTermMetrics: processSearchTermMetrics(data),
    skuMetrics: processSkuMetrics(data)
  };
};

const processAsinMetrics = (data: any[]) => {
  const groupedByAsin = groupBy(data, 'Advertised ASIN');
  return Object.entries(groupedByAsin).map(([asin, items]) => ({
    asin,
    impressions: sumBy(items, 'Impressions'),
    clicks: sumBy(items, 'Clicks'),
    spend: sumBy(items, (item) => parseFloat((item.Spend || "0").replace("$", "").replace(",", ""))),
    sales: sumBy(items, (item) => parseFloat((item["Total Sales"] || "0").replace("$", "").replace(",", ""))),
    orders: sumBy(items, "Orders"),
    conversionRate: (sumBy(items, "Orders") / sumBy(items, 'Clicks')) * 100,
    title: items[0]["Advertised product title"] || "N/A",
    category: items[0]["Advertised product category"] || "N/A"
  }));
};

const processSearchTermMetrics = (data: any[]) => {
  const groupedBySearchTerm = groupBy(data, 'Search term');
  return Object.entries(groupedBySearchTerm).map(([searchTerm, items]) => ({
    searchTerm,
    impressions: sumBy(items, 'Impressions'),
    clicks: sumBy(items, 'Clicks'),
    spend: sumBy(items, (item) => parseFloat((item.Spend || "0").replace("$", "").replace(",", ""))),
    sales: sumBy(items, (item) => parseFloat((item["Total Sales"] || "0").replace("$", "").replace(",", ""))),
    orders: sumBy(items, "Orders"),
    conversionRate: (sumBy(items, "Orders") / sumBy(items, 'Clicks')) * 100
  }));
};

const processSkuMetrics = (data: any[]) => {
  const groupedBySku = groupBy(data, 'Advertised SKU');
  return Object.entries(groupedBySku).map(([sku, items]) => ({
    sku,
    impressions: sumBy(items, 'Impressions'),
    clicks: sumBy(items, 'Clicks'),
    spend: sumBy(items, (item) => parseFloat((item.Spend || "0").replace("$", "").replace(",", ""))),
    sales: sumBy(items, (item) => parseFloat((item["Total Sales"] || "0").replace("$", "").replace(",", ""))),
    orders: sumBy(items, "Orders"),
    conversionRate: (sumBy(items, "Orders") / sumBy(items, 'Clicks')) * 100
  }));
};

export const calculateMetrics = (data: any[]) => {
  // Filter out irrelevant columns
  const filteredData = data.map(row => {
    const filteredRow: any = {};
    ESSENTIAL_METRICS.forEach(metric => {
      if (row[metric] !== undefined) {
        filteredRow[metric] = row[metric];
      }
    });
    return filteredRow;
  });

  // Calculate aggregated metrics
  const weeklyMetrics = aggregateMetricsByPeriod(filteredData, 'week');
  const monthlyMetrics = aggregateMetricsByPeriod(filteredData, 'month');
  const detailedMetrics = processDetailedMetrics(filteredData);

  // Calculate overall performance metrics
  const performance = {
    impressions: sumBy(filteredData, 'Impressions'),
    clicks: sumBy(filteredData, 'Clicks'),
    spend: sumBy(filteredData, (item) => parseFloat((item.Spend || "0").replace("$", "").replace(",", ""))),
    ctr: (sumBy(filteredData, 'Clicks') / sumBy(filteredData, 'Impressions')) * 100,
    conversionRate: (sumBy(filteredData, "Orders") / sumBy(filteredData, 'Clicks')) * 100,
    roas: sumBy(filteredData, (item) => parseFloat((item["Total Sales"] || "0").replace("$", "").replace(",", ""))) / 
          sumBy(filteredData, (item) => parseFloat((item.Spend || "0").replace("$", "").replace(",", "")))
  };

  const sales = {
    totalSales: sumBy(filteredData, (item) => parseFloat((item["Total Sales"] || "0").replace("$", "").replace(",", ""))),
    totalOrders: sumBy(filteredData, "Orders")
  };

  return {
    performance,
    sales,
    weeklyMetrics,
    monthlyMetrics,
    detailedMetrics
  };
};