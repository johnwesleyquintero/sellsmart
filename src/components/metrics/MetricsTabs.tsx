import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsTable } from "./MetricsTable";

interface MetricsTabsProps {
  weeklyMetrics: Array<any>;
  monthlyMetrics: Array<any>;
  detailedMetrics: {
    asinMetrics: Array<any>;
    searchTermMetrics: Array<any>;
    skuMetrics: Array<any>;
  };
}

export function MetricsTabs({ weeklyMetrics, monthlyMetrics, detailedMetrics }: MetricsTabsProps) {
  return (
    <Tabs defaultValue="weekly" className="w-full">
      <TabsList>
        <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
        <TabsTrigger value="monthly">Monthly Analysis</TabsTrigger>
        <TabsTrigger value="asin">ASIN Analysis</TabsTrigger>
        <TabsTrigger value="search">Search Terms</TabsTrigger>
        <TabsTrigger value="sku">SKU Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="weekly">
        <Card className="bg-spotify-light text-white">
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <MetricsTable 
              headers={["Week", "Spend", "Sales", "ROAS", "ACoS", "CTR", "Orders"]}
              rows={weeklyMetrics.map(week => ({
                period: week.period,
                spend: `$${week.spend.toLocaleString()}`,
                sales: `$${week.sales.toLocaleString()}`,
                roas: `${week.roas.toFixed(2)}x`,
                acos: `${week.acos.toFixed(2)}%`,
                ctr: `${week.ctr.toFixed(2)}%`,
                orders: week.orders
              }))}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="monthly">
        <Card className="bg-spotify-light text-white">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <MetricsTable 
              headers={["Month", "Spend", "Sales", "ROAS", "ACoS", "CTR", "Orders"]}
              rows={monthlyMetrics.map(month => ({
                period: month.period,
                spend: `$${month.spend.toLocaleString()}`,
                sales: `$${month.sales.toLocaleString()}`,
                roas: `${month.roas.toFixed(2)}x`,
                acos: `${month.acos.toFixed(2)}%`,
                ctr: `${month.ctr.toFixed(2)}%`,
                orders: month.orders
              }))}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="asin">
        <Card className="bg-spotify-light text-white">
          <CardHeader>
            <CardTitle>ASIN Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <MetricsTable 
              headers={["ASIN", "Title", "Category", "Spend", "Sales", "Conv. Rate", "Orders"]}
              rows={detailedMetrics.asinMetrics.map(asin => ({
                asin: asin.asin,
                title: asin.title,
                category: asin.category,
                spend: `$${asin.spend.toLocaleString()}`,
                sales: `$${asin.sales.toLocaleString()}`,
                convRate: `${asin.conversionRate.toFixed(2)}%`,
                orders: asin.orders
              }))}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="search">
        <Card className="bg-spotify-light text-white">
          <CardHeader>
            <CardTitle>Search Term Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <MetricsTable 
              headers={["Search Term", "Impressions", "Clicks", "Spend", "Sales", "Conv. Rate", "Orders"]}
              rows={detailedMetrics.searchTermMetrics.map(term => ({
                term: term.searchTerm,
                impressions: term.impressions.toLocaleString(),
                clicks: term.clicks.toLocaleString(),
                spend: `$${term.spend.toLocaleString()}`,
                sales: `$${term.sales.toLocaleString()}`,
                convRate: `${term.conversionRate.toFixed(2)}%`,
                orders: term.orders
              }))}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sku">
        <Card className="bg-spotify-light text-white">
          <CardHeader>
            <CardTitle>SKU Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <MetricsTable 
              headers={["SKU", "Impressions", "Clicks", "Spend", "Sales", "Conv. Rate", "Orders"]}
              rows={detailedMetrics.skuMetrics.map(sku => ({
                sku: sku.sku,
                impressions: sku.impressions.toLocaleString(),
                clicks: sku.clicks.toLocaleString(),
                spend: `$${sku.spend.toLocaleString()}`,
                sales: `$${sku.sales.toLocaleString()}`,
                convRate: `${sku.conversionRate.toFixed(2)}%`,
                orders: sku.orders
              }))}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}