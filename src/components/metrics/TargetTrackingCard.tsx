import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Target } from "@/components/ui/progress";

interface TargetTrackingCardProps {
  title: string;
  currentValue: number;
  targetValue: number;
  format?: 'currency' | 'percentage' | 'number';
}

export function TargetTrackingCard({ 
  title, 
  currentValue, 
  targetValue, 
  format = 'number' 
}: TargetTrackingCardProps) {
  const progress = Math.min((currentValue / targetValue) * 100, 100);
  
  const formatValue = (value: number) => {
    switch(format) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value.toFixed(2)}%`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <Card className="bg-spotify-light text-white">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span>Current: {formatValue(currentValue)}</span>
            <span>Target: {formatValue(targetValue)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}