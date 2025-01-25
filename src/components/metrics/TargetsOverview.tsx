import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TargetTrackingCard } from "./TargetTrackingCard";

export function TargetsOverview() {
  const { data: targets, isLoading } = useQuery({
    queryKey: ['campaign-targets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaign_targets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading targets...</div>;
  }

  if (!targets?.length) {
    return <div className="text-gray-400">No targets set</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {targets.map((target) => (
        <TargetTrackingCard
          key={target.id}
          title={target.name}
          currentValue={target.current_value}
          targetValue={target.target_value}
          format={target.target_type === 'sales' ? 'currency' : 
                 target.target_type === 'roas' || target.target_type === 'acos' || target.target_type === 'ctr' ? 'percentage' : 
                 'number'}
        />
      ))}
    </div>
  );
}