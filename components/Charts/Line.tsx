"use client";

import {
  CartesianGrid,
  Label,
  LabelList,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
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

// Note: The length of the 'fill' array must match the length of 'yAxisKeys'.
export type LineChartConfig = {
  title?: string; // optional
  description?: string; // optional
  data: Record<string, string | number>[]; // array of objects/dictionary
  fill: string[]; // array of colors
  xAxisKey: string;
  yAxisKeys: string[];
  xAxisLabel?: string; // optional
  yAxisLabel?: string; // optional
};

type LineChartProps = {
  chartData: LineChartConfig;
};

function MyLineChart({ chartData }: LineChartProps) {
  const {
    title,
    description,
    data,
    fill,
    xAxisKey,
    yAxisKeys,
    xAxisLabel,
    yAxisLabel,
  } = chartData;

  if (yAxisKeys.length > fill.length) {
    toast.error(
      `Fill array must have lenght greater than or equal to dataKeys array.`
    );
    return <div>Invalid chart data</div>;
  }

  const isXAxisKeyValid = data.every((d) => xAxisKey in d);
  if (!isXAxisKeyValid) {
    toast.error(
      `Invalid X-axis key. Property "${xAxisKey}" does not exist in every object of the provided data array.`
    );
    return <div>Invalid chart data</div>;
  }

  const areYAxisKeysValid = yAxisKeys
    .map((key) => {
      return data.every((d) => key in d);
    })
    .every((val) => val);
  if (!areYAxisKeysValid) {
    toast.error(
      `Invalid Y-axis keys. Some or all of the provide Y-axis keys does not exist in every object of the provided data array.`
    );
    return <div>Invalid chart data</div>;
  }

  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={0}
            >
              <Label
                value={xAxisLabel}
                position="bottom"
                offset={-10}
                className="text-sm font-medium"
              />
            </XAxis>
            <YAxis
              dataKey={yAxisKeys[0]}
              tick={false}
              tickLine={false}
              axisLine={false}
            >
              <Label
                value={yAxisLabel}
                position="insideLeft"
                angle={-90}
                className="text-sm font-medium"
              />
            </YAxis>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {yAxisKeys.map((key, i) => {
              return (
                <Line
                  key={`${key}-${i}`}
                  dataKey={key}
                  type="natural"
                  strokeWidth={2}
                  stroke={fill[i]}
                  dot={{
                    fill: fill[i],
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList position="top" offset={12} fontSize={12} />
                </Line>
              );
            })}
            <Legend
              verticalAlign="bottom"
              height={40}
              content={<CustomLegend />}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default MyLineChart;
