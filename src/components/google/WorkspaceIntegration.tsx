import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Database, RefreshCw, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function WorkspaceIntegration() {
  const { toast } = useToast();
  const [autoSync, setAutoSync] = React.useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your Google Workspace integration settings have been updated."
    });
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
            <Label htmlFor="spreadsheet">Spreadsheet ID</Label>
            <Input id="spreadsheet" placeholder="Enter your Google Sheets ID" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="folder">Drive Folder ID</Label>
            <Input id="folder" placeholder="Enter your Google Drive folder ID" />
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
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Test Connection
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}