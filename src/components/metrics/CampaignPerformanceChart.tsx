import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CampaignPerformanceProps {
  data: Array<{
    period: string;
    spend: number;
    sales: number;
    roas: number;
  }>;
}

export function CampaignPerformanceChart({ data }: CampaignPerformanceProps) {
  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Campaign Performance</CardTitle>
        <Button variant="outline" size="sm">
          Export Data
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <LineChart
            width={800}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--event-horizon)" />
            <XAxis dataKey="period" stroke="var(--text-color)" />
            <YAxis stroke="var(--text-color)" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--void-core)', border: '1px solid var(--event-horizon)' }}
              labelStyle={{ color: 'var(--text-color)' }}
            />
            <Legend />
            <Line type="monotone" dataKey="spend" stroke="var(--singularity-purple)" name="Spend" />
            <Line type="monotone" dataKey="sales" stroke="var(--quantum-teal)" name="Sales" />
            <Line type="monotone" dataKey="roas" stroke="#e2e8f0" name="ROAS" />
          </LineChart>
        </div>
      </CardContent>
    </Card>
  );
}