"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import CustomLegend from "./CustomLegend";

export type AreaChartConfig = {
  title?: string; // optional
  description?: string; // optional
  data: Record<string, string | number>[]; // array of objects/dictionary
  fill: string[]; // array of colors
  nameKey?: string; // optional
  dataKeys: string[];
  xAxisLabel?: string; // optional
  yAxisLabel?: string; // optional
  stacked?: boolean; // optional
};

type AreaChartProps = {
  chartData: AreaChartConfig;
};

function MyAreaChart({ chartData }: AreaChartProps) {
  const {
    title,
    description,
    data,
    fill,
    nameKey,
    dataKeys,
    xAxisLabel,
    yAxisLabel,
    stacked,
  } = chartData;

  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={nameKey}
              tickLine={false}
              axisLine={false}
              tickMargin={2}
            >
              <Label
                value={xAxisLabel}
                position="bottom"
                offset={-10}
                className="text-sm font-medium"
              />
            </XAxis>
            <YAxis dataKey={dataKeys[0]} tickLine={false} axisLine={false}>
              <Label
                value={yAxisLabel}
                position="insideLeft"
                angle={-90}
                className="text-sm font-medium"
              />
            </YAxis>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {dataKeys.map((key, i) => (
                <linearGradient
                  key={`gradient-${key}-${i}`}
                  id={`fill-${key}-${i}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={fill[i]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={fill[i]} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            {dataKeys.map((key, i) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill-${key}-${i})`}
                fillOpacity={0.9}
                stroke={fill[i]}
                stackId={stacked ? "stacked" : undefined}
              />
            ))}
            <Legend
              verticalAlign="bottom"
              height={40}
              content={<CustomLegend />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default MyAreaChart;
