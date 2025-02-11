
export const processAmazonData = (data: any[]) => {
  // Remove rows with missing critical data
  const cleanData = data.filter(row => 
    row.Date && 
    row.Impressions && 
    row.Clicks && 
    row.Spend
  );

  // Format and validate data
  return cleanData.map(row => ({
    date: new Date(row.Date),
    impressions: parseInt(row.Impressions) || 0,
    clicks: parseInt(row.Clicks) || 0,
    spend: parseFloat(row.Spend?.replace('$', '').replace(',', '')) || 0,
    orders: parseInt(row.Orders) || 0,
    sales: parseFloat(row.Sales?.replace('$', '').replace(',', '')) || 0,
    campaign_name: row['Campaign Name'] || '',
    ad_group_name: row['Ad Group Name'] || '',
    keyword: row.Keyword || '',
    match_type: row['Match Type'] || '',
    search_term: row['Search Term'] || '',
  }));
};

export const calculateMetrics = (data: any[]) => {
  return {
    impressions: data.reduce((sum, row) => sum + row.impressions, 0),
    clicks: data.reduce((sum, row) => sum + row.clicks, 0),
    spend: data.reduce((sum, row) => sum + row.spend, 0),
    orders: data.reduce((sum, row) => sum + row.orders, 0),
    sales: data.reduce((sum, row) => sum + row.sales, 0),
    acos: (data.reduce((sum, row) => sum + row.spend, 0) / 
           data.reduce((sum, row) => sum + row.sales, 0) * 100) || 0,
    roas: (data.reduce((sum, row) => sum + row.sales, 0) / 
           data.reduce((sum, row) => sum + row.spend, 0)) || 0,
    ctr: (data.reduce((sum, row) => sum + row.clicks, 0) / 
          data.reduce((sum, row) => sum + row.impressions, 0) * 100) || 0,
  };
};

export const aggregateByDate = (data: any[], level: 'daily' | 'weekly' | 'monthly') => {
  const groupedData = new Map();

  data.forEach(row => {
    const date = new Date(row.date);
    let key;

    switch (level) {
      case 'weekly':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      case 'monthly':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      default:
        key = date.toISOString().split('T')[0];
    }

    if (!groupedData.has(key)) {
      groupedData.set(key, {
        date: key,
        impressions: 0,
        clicks: 0,
        spend: 0,
        orders: 0,
        sales: 0,
      });
    }

    const current = groupedData.get(key);
    groupedData.set(key, {
      ...current,
      impressions: current.impressions + row.impressions,
      clicks: current.clicks + row.clicks,
      spend: current.spend + row.spend,
      orders: current.orders + row.orders,
      sales: current.sales + row.sales,
    });
  });

  return Array.from(groupedData.values());
};
