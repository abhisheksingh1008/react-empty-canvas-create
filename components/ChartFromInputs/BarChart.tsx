"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { ChartGeneratorState } from ".";
import { brandColors } from "@/lib/constants.ts/chartConstants";

type MyBarChartProps = {
  state: ChartGeneratorState;
};

export type x = {
  title?: string;
  description?: string;
  data: Record<string, string | number>[];
  fill: string[]; // array of colors
  xAxisKey: string;
  yAxisKey: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
};

export function MyBarChart({ state }: MyBarChartProps) {
  console.log(state);
  const {
    team,
    data,
    xAxisKey,
    yAxisKey,
    title,
    description,
    xAxisLabel,
    yAxisLabel,
  } = state;

  console.log(`bg-[${brandColors[team].background}]`);

  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart data={JSON.parse(data.trim()).data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            >
              <Label
                value={xAxisLabel}
                position="bottom"
                offset={-5}
                className="text-sm font-medium"
              />
            </XAxis>
            <YAxis
              dataKey={yAxisKey}
              tickLine={false}
              axisLine={false}
              tick={false}
            >
              <Label
                value={yAxisLabel}
                position="insideLeft"
                angle={-90}
                className="text-sm font-medium"
              />
            </YAxis>
            <Bar dataKey={yAxisKey} fill={brandColors[team].chart} radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground font-bold"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
