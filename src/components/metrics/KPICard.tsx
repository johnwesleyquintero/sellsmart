import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { MetricCardBase } from "./MetricCardBase";
import * as React from "react";

interface KPICardProps {
  title: string;
  value: string;
  trend?: number | undefined;
  icon?: LucideIcon;
  className?: string;
}

export function KPICard({ title, value, trend, icon, className }: KPICardProps) {
  // Render the BaseMetricCard component, passing in the props.
  return (
    <MetricCardBase
      title={title}
      value={value}
      trend={trend}
      icon={icon}
      className={className}
      variant="card"
    />
  );
}
