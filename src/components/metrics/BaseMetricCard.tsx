import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import * as React from "react";

interface BaseMetricCardProps {
  title: string;
  value: string | number;
  trend?: number | undefined;
  icon?: React.ReactNode;
  className?: string | undefined;
  variant?: 'card' | 'div';
}

export function BaseMetricCard({
  title,
  value,
  trend,
  icon,
  className,
  variant = 'card',
}: BaseMetricCardProps) {
  const isPositive = trend !== undefined && trend !== null && trend > 0;

  const cardContent = (
    <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      {trend !== undefined && trend !== null && (
        <div className={cn(
          "text-sm",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {isPositive ? "+" : ""}{trend}%
        </div>
      )}
    </>
  );

  if (variant === 'card') {
    return (
      <Card className={cn(
        "bg-spotify-light text-white hover:bg-opacity-80 transition-all p-4",
        className
      )}>
        {cardContent}
      </Card>
    );
  }

  return (
    <div className={cn(
      "rounded-lg bg-spotify-light p-4 text-white hover:bg-opacity-80 transition-all",
      className
    )}>
      {cardContent}
    </div>
  );
}