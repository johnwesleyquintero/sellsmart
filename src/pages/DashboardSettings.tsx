import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { GoogleIntegrationSettings } from '@/components/settings/GoogleIntegrationSettings';

const DashboardSettings = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['google-workspace-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('google_workspace_settings')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const settingsWithUserId = {
        ...values,
        user_id: user.id,
      };

      const { error } = await supabase
        .from('google_workspace_settings')
        .upsert(settingsWithUserId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['google-workspace-settings'] });
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update settings');
      console.error('Settings update error:', error);
    },
  });

  const handleSaveSettings = (values: any) => {
    if (!user?.id) {
      toast.error('You must be logged in to update settings');
      return;
    }

    mutation.mutate(values);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <GoogleIntegrationSettings
          initialSettings={settings}
          onSave={handleSaveSettings}
          isLoading={mutation.isPending}
        />
      </div>
    </div>
  );
};

export default DashboardSettings;