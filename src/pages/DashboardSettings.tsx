import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface GoogleWorkspaceSettings {
  spreadsheet_id: string;
  sheet_name: string;
  auto_sync: boolean;
  sync_frequency: 'hourly' | 'daily' | 'weekly';
  user_id: string;
}

const DashboardSettings = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const form = useForm<GoogleWorkspaceSettings>();

  // Fetch existing settings
  const { data: settings, isLoading } = useQuery({
    queryKey: ['google-workspace-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('google_workspace_settings')
        .select('*')
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Update settings mutation
  const mutation = useMutation({
    mutationFn: async (values: GoogleWorkspaceSettings) => {
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

  const onSubmit = (values: Omit<GoogleWorkspaceSettings, 'user_id'>) => {
    if (!user?.id) {
      toast.error('You must be logged in to update settings');
      return;
    }

    mutation.mutate({
      ...values,
      user_id: user.id,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Google Workspace Settings</h1>
      
      <div className="max-w-2xl bg-card p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="spreadsheet_id"
              defaultValue={settings?.spreadsheet_id || ''}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spreadsheet ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Google Sheets ID" />
                  </FormControl>
                  <FormDescription>
                    The ID of your Google Sheet from the URL
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sheet_name"
              defaultValue={settings?.sheet_name || ''}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sheet Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Sheet1" />
                  </FormControl>
                  <FormDescription>
                    The name of the specific sheet to sync with
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="auto_sync"
              defaultValue={settings?.auto_sync || false}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Automatic Sync</FormLabel>
                    <FormDescription>
                      Automatically sync data with Google Sheets
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sync_frequency"
              defaultValue={settings?.sync_frequency as 'hourly' | 'daily' | 'weekly' || 'daily'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sync Frequency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    How often should data be synced
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DashboardSettings;