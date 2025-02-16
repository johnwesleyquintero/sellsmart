import { MetricCardBase } from "./MetricCardBase";
import * as React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: number | undefined;
  icon: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, trend, icon, className }: MetricCardProps) {
  return (
    <MetricCardBase
      title={title}
      value={value}
      trend={trend}
      icon={icon}
      className={className}
      variant="div"
    />
  );
}
