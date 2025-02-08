
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Database, RefreshCw, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation } from '@tanstack/react-query';

export function WorkspaceIntegration() {
  const { toast } = useToast();
  const [autoSync, setAutoSync] = React.useState(false);
  const [spreadsheetId, setSpreadsheetId] = React.useState('');
  const [sheetName, setSheetName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // Fetch existing settings
  const { data: settings } = useQuery({
    queryKey: ['googleWorkspaceSettings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('google_workspace_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  // Update effect when settings are loaded
  useEffect(() => {
    if (settings) {
      setSpreadsheetId(settings.spreadsheet_id || '');
      setSheetName(settings.sheet_name || '');
      setAutoSync(settings.auto_sync || false);
    }
  }, [settings]);

  // Save settings mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('google_workspace_settings')
        .upsert({
          user_id: user.id,
          spreadsheet_id: spreadsheetId,
          sheet_name: sheetName,
          auto_sync: autoSync,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Settings saved",
        description: "Your Google Workspace integration settings have been updated."
      });
    },
    onError: (error) => {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSheetUrlChange = (url: string) => {
    try {
      const sheetId = url.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (sheetId) {
        setSpreadsheetId(sheetId);
      }
    } catch (error) {
      console.error('Error parsing sheet URL:', error);
    }
  };

  const handleTestConnection = async () => {
    if (!spreadsheetId) {
      toast({
        title: "Missing spreadsheet ID",
        description: "Please enter a valid Google Sheets URL or ID",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;
      const response = await fetch(csvUrl);
      
      if (!response.ok) {
        throw new Error('Failed to access spreadsheet. Make sure it\'s publicly accessible.');
      }

      toast({
        title: "Connection successful",
        description: "Successfully connected to Google Sheets"
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Failed to connect to Google Sheets",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = () => {
    saveMutation.mutate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Google Workspace Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="spreadsheet">Google Sheets URL</Label>
            <Input
              id="spreadsheet"
              placeholder="Paste your Google Sheets URL"
              value={spreadsheetId ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}` : ''}
              onChange={(e) => handleSheetUrlChange(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sheetName">Sheet Name (Optional)</Label>
            <Input
              id="sheetName"
              placeholder="e.g., Sheet1"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Sync</Label>
              <div className="text-sm text-muted-foreground">
                Automatically sync data every hour
              </div>
            </div>
            <Switch
              checked={autoSync}
              onCheckedChange={setAutoSync}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTestConnection}
            disabled={isLoading || !spreadsheetId}
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Test Connection
          </Button>
          <Button
            onClick={handleSaveSettings}
            disabled={saveMutation.isPending || !spreadsheetId}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
