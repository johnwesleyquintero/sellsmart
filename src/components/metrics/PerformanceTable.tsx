import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PeriodMetrics } from "@/types/metrics";

interface PerformanceTableProps {
  data: PeriodMetrics[];
  title: string;
}

export function PerformanceTable({ data, title }: PerformanceTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-400">{title}</TableHead>
            <TableHead className="text-gray-400">Spend</TableHead>
            <TableHead className="text-gray-400">Sales</TableHead>
            <TableHead className="text-gray-400">ROAS</TableHead>
            <TableHead className="text-gray-400">ACoS</TableHead>
            <TableHead className="text-gray-400">CTR</TableHead>
            <TableHead className="text-gray-400">Orders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.period}</TableCell>
              <TableCell>${item.spend.toLocaleString()}</TableCell>
              <TableCell>${item.sales.toLocaleString()}</TableCell>
              <TableCell>{item.roas.toFixed(2)}x</TableCell>
              <TableCell>{item.acos.toFixed(2)}%</TableCell>
              <TableCell>{item.ctr.toFixed(2)}%</TableCell>
              <TableCell>{item.orders}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}