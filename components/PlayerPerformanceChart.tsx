"use client";

import { useMemo, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import CustomLegend from "./Charts/CustomLegend";

export interface Match {
  id: string;
  date: string;
  fantasyPoints: number;
  Avg_fp_last_5: number;
}

interface PlayerPerformanceChartProps {
  matchData: Match[];
  playerName: string;
}

function getSeasonFromDate(dateStr: string) {
  return new Date(dateStr).getFullYear().toString();
}

export default function PlayerPerformanceChart({
  matchData,
  playerName,
}: PlayerPerformanceChartProps) {
  const [filterOption, setFilterOption] = useState("all");

  const filterOptions = useMemo(() => {
    const seasonOptions = Array.from(
      new Set(matchData.map((m) => getSeasonFromDate(m.date)))
    ).sort((a, b) => parseInt(b) - parseInt(a));

    return [
      { label: "All Time", value: "all" },
      { label: "Last 20 Matches", value: "last-20" },
      { label: "Last 10 Matches", value: "last-10" },
      { label: "Last 5 Matches", value: "last-5" },
      ...seasonOptions.map((season) => ({
        label: ` ${season} Season`,
        value: season,
      })),
    ];
  }, [matchData]);

  const filteredData = useMemo(() => {
    const data = [...matchData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    if (filterOption === "all") {
      return data;
    }

    if (filterOption.startsWith("last-")) {
      const count = parseInt(filterOption.split("-")[1]);
      return data.slice(-count);
    }

    // Season filter
    return data.filter((m) => getSeasonFromDate(m.date) === filterOption);
  }, [filterOption, matchData]);

  const avgFantasyPoints = useMemo(() => {
    if (filteredData.length === 0) return 0;
    const total = filteredData.reduce(
      (acc, match) => acc + match.fantasyPoints,
      0
    );
    return parseFloat((total / filteredData.length).toFixed(2));
  }, [filteredData]);

  return (
    <Card className="w-full p-3 gap-1">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-0">
        <CardTitle>{playerName}&apos;s Fantasy Points Over Time</CardTitle>
        <Select value={filterOption} onValueChange={setFilterOption}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-12 pt-0">
        <div className="min-w-[600px] overflow-x-auto">
          <div className="w-full">
            <ChartContainer config={{}}>
              <ComposedChart data={filteredData}>
                <CartesianGrid vertical={false} horizontal={true} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={2}
                  axisLine={false}
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  minTickGap={20}
                >
                  <Label
                    value="Date"
                    position="bottom"
                    offset={-5}
                    className="text-sm font-medium"
                  />
                </XAxis>
                <YAxis
                  dataKey="fantasyPoints"
                  tickLine={false}
                  axisLine={false}
                  //   tick={false}
                >
                  <Label
                    value="Fantasy Points"
                    position="insideLeft"
                    angle={-90}
                    className="text-sm font-medium"
                    name="Fantasy points"
                  />
                </YAxis>
                <Bar
                  dataKey={"fantasyPoints"}
                  fill="#10b981"
                  radius={8}
                  barSize={filterOption === "all" ? 5 : undefined}
                  name="Fantasy Points"
                ></Bar>
                <ReferenceLine
                  y={avgFantasyPoints}
                  stroke="#1A76D2"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                  label={{
                    value: `Avg Points: ${avgFantasyPoints}`,
                    position: "top",
                    fill: "#000",
                    fontSize: 12,
                    fontWeight: "bold"
                  }}
                />
                {/* <Line
                  type="linear"
                  dataKey="Avg_fp_last_5"
                  stroke="#1A76D2"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  name="Avg Fantasy Points (Last 5)"
                /> */}
                <Legend
                  verticalAlign="bottom"
                  height={40}
                  content={<CustomLegend />}
                />
              </ComposedChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
