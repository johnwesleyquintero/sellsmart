
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { GoogleIntegrationSettings } from "@/components/settings/GoogleIntegrationSettings";
import { useGoogleWorkspaceSettings } from "@/hooks/useGoogleWorkspaceSettings";
import { DataImport } from "@/components/DataImport";
import { DataSourceList } from "@/components/DataSourceList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const DashboardImport = () => {
  const { settings, saveMutation } = useGoogleWorkspaceSettings();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Connections</h1>
        <p className="text-gray-500">Configure your data sources and import options.</p>

        <DataSourceList />

        <Tabs defaultValue="googlesheets" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="googlesheets">Google Sheets</TabsTrigger>
            <TabsTrigger value="csv">CSV Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="googlesheets">
            <Card className="p-6">
              <GoogleIntegrationSettings
                initialSettings={settings}
                onSave={saveMutation.mutate}
                isLoading={saveMutation.isPending}
              />
            </Card>
          </TabsContent>

          <TabsContent value="csv">
            <DataImport />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardImport;
