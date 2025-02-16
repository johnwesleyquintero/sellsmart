import { cn } from "@/lib/utils";
import { BaseMetricCard } from "./BaseMetricCard";
import * as React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardBaseProps {
  title: string;
  value: string | number;
  trend?: number | undefined;
  icon?: React.ReactNode | LucideIcon;
  className?: string | undefined;
  variant: 'card' | 'div';
}

export function MetricCardBase({ title, value, trend, icon, className, variant }: MetricCardBaseProps) {
  return (
    <BaseMetricCard
      title={title}
      value={value}
      trend={trend}
      icon={icon as React.ReactNode}
      className={className}
      variant={variant}
    />
  );
}