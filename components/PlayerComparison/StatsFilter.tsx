
"use client";

import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface StatsFilterProps {
  selectedFilter: "all" | "first" | "second";
  onFilterChange: (filter: "all" | "first" | "second") => void;
}

export default function StatsFilter({ selectedFilter, onFilterChange }: StatsFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="stats-filter">Filter Stats by Innings:</Label>
      <Select value={selectedFilter} onValueChange={(value) => onFilterChange(value as "all" | "first" | "second")}>
        <SelectTrigger id="stats-filter" className="w-[180px]">
          <SelectValue placeholder="Select filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Innings</SelectItem>
          <SelectItem value="first">First Innings</SelectItem>
          <SelectItem value="second">Second Innings</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
