import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { calculateMetrics } from "@/utils/amazonMetrics";

interface Filters {
  dateRange: string;
  marketplace: string;
  category: string;
}

export const useDashboardFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    dateRange: "14",
    marketplace: "all",
    category: "all",
  });

  const { data: metricsData, isLoading } = useQuery({
    queryKey: ['metrics', filters],
    queryFn: async () => {
      let query = supabase
        .from('amazon_ads_metrics')
        .select('*');

      // Apply date range filter
      if (filters.dateRange !== 'all') {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(filters.dateRange));
        query = query.gte('date', startDate.toISOString().split('T')[0]);
      }

      // Apply marketplace filter
      if (filters.marketplace !== 'all') {
        query = query.eq('marketplace_string_id', filters.marketplace);
      }

      // Apply category filter
      if (filters.category !== 'all') {
        query = query.eq('advertised_product_category', filters.category);
      }

      const { data: metrics, error } = await query.order('date', { ascending: true });

      if (error) throw error;

      // Calculate TACoS data
      const tacosData = metrics?.map(metric => ({
        date: metric.date,
        acos: metric.acos || 0,
        tacos: ((metric.amount_spent || 0) / (metric.total_ad_sales || 1)) * 100
      })) || [];

      // Calculate keyword rankings
      const keywordData = metrics?.reduce((acc: any[], metric) => {
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

      return {
        metrics: calculateMetrics(metrics || []),
        tacosData,
        keywordRankings: keywordData
      };
    }
  });

  return {
    filters,
    setFilters,
    metricsData,
    isLoading,
  };
};