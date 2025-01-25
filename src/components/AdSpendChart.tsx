import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function AdSpendChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['adSpendData'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_data')
        .select('date, ad_spend')
        .order('date', { ascending: true });

      if (error) throw error;

      return data.map(item => ({
        name: new Date(item.date).toLocaleDateString('en-US', { month: 'short' }),
        value: Number(item.ad_spend)
      }));
    }
  });

  if (isLoading) {
    return <div className="h-[300px] w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1ED760" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1ED760" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#1ED760"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}