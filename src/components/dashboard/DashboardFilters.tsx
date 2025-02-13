import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface DashboardFiltersProps {
  onFilterChange: (filters: {
    dateRange: string;
    marketplace: string;
    category: string;
  }) => void;
}

export function DashboardFilters({ onFilterChange }: DashboardFiltersProps) {
  const [filters, setFilters] = useState({
    dateRange: "all",
    marketplace: "all",
    category: "all",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filters.dateRange === "all" ? "Pick a date" : format(new Date(filters.dateRange), "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={filters.dateRange === "all" ? undefined : new Date(filters.dateRange)}
            onSelect={(newDate) => {
              if (newDate) {
                handleFilterChange("dateRange", format(newDate, "yyyy-MM-dd"));
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select
        value={filters.marketplace}
        onValueChange={(value) => {
          handleFilterChange("marketplace", value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select marketplace" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Marketplaces</SelectItem>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="fr">France</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.category}
        onValueChange={(value) => {
          handleFilterChange("category", value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="home">Home & Kitchen</SelectItem>
          <SelectItem value="fashion">Fashion</SelectItem>
          <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}