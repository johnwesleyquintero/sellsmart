interface Metric {
  keyword: string;
  impressions: number;
}

export const calculateKeywordRankings = (metrics: Metric[] | undefined) => {
  return metrics?.reduce((acc: any[], metric) => {
    if (metric.keyword && metric.impressions) {
      const existing = acc.find(k => k.keyword === metric.keyword);
      if (!existing) {
        acc.push({
          keyword: metric.keyword,
          rank: acc.length + 1,
          previousRank: acc.length + 2,
          searchVolume: metric.impressions,
          change: 1
        });
      }
    }
    return acc;
  }, []).slice(0, 10) || [];
};