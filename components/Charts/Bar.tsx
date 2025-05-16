"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
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
import { FC } from "react";
import CustomLegend from "./CustomLegend";
import { toast } from "sonner";

// Definitions:
// 1. Index Axis: The axis that represents numerical values in a bar chart.
//    For vertical bar charts, this is the Y-axis; for horizontal bar charts, it is the X-axis.
// 2. Non-Index Axis: The axis that represents categories in a bar chart.
//    For vertical bar charts, this is the X-axis; for horizontal bar charts, it is the Y-axis.
// Tip: Vertical bar charts are generally more visually effective in most scenarios.
// Avoid using horizontal bar charts when dealing with a large number of data points
// (e.g., when the number of categories exceeds 5), as they can become cluttered.
// Note: The length of the 'fill' array must match the length of 'indexAxisKeys'.

export type BarChartConfig = {
  title?: string; // optional
  description?: string; // optional
  data: Record<string, string | number>[]; // array of objects/dictionary
  fill: string[]; // array of colors
  nonIndexAxisKey: string;
  indexAxisKeys: string[];
  nonIndexAxisLabel?: string; // optional
  indexAxisLabel?: string; // optional
  isHorizontal?: boolean;
};

export type BarChartProps = {
  chartData: BarChartConfig;
};

const CustomBarChart: FC<BarChartProps> = ({ chartData }) => {
  const {
    title,
    description,
    data,
    fill,
    nonIndexAxisKey,
    indexAxisKeys,
    indexAxisLabel,
    nonIndexAxisLabel,
    isHorizontal,
  } = chartData;

  console.log(isHorizontal);

  if (indexAxisKeys.length > fill.length) {
    toast.error(
      `Fill array must have lenght greater than or equal to dataKeys array.`
    );
    return <div>Invalid chart data</div>;
  }

  const isNonIndexAxisKeyValid = data.every((d) => nonIndexAxisKey in d);
  if (!isNonIndexAxisKeyValid) {
    toast.error(
      `Invalid X-axis key. Property "${nonIndexAxisKey}" does not exist in every object of the provided data array.`
    );
    return <div>Invalid chart data</div>;
  }

  const areIndexAxisKeysValid = indexAxisKeys
    .map((key) => {
      return data.every((d) => key in d);
    })
    .every((val) => val);
  if (!areIndexAxisKeysValid) {
    toast.error(
      `Invalid Y-axis keys. Some or all of the provide Y-axis keys does not exist in every object of the provided data array.`
    );
    return <div>Invalid chart data</div>;
  }

  const xAxisKey = isHorizontal ? indexAxisKeys[0] : nonIndexAxisKey;
  const yAxisKey = isHorizontal ? nonIndexAxisKey : indexAxisKeys[0];
  const xAxisLabel = isHorizontal ? indexAxisLabel : nonIndexAxisLabel;
  const yAxisLabel = isHorizontal ? nonIndexAxisLabel : indexAxisLabel;

  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart
            data={data}
            layout={isHorizontal ? "vertical" : "horizontal"}
          >
            <CartesianGrid
              vertical={false}
              // horizontal={!isHorizontal}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              type={isHorizontal ? "number" : "category"}
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
              tick={isHorizontal}
              type={isHorizontal ? "category" : "number"}
            >
              <Label
                value={yAxisLabel}
                position="insideLeft"
                angle={-90}
                className="text-sm font-medium"
              />
            </YAxis>
            {indexAxisKeys.map((key, i) => (
              <Bar key={`${key}-${i}`} dataKey={key} fill={fill[i]} radius={8}>
                <LabelList
                  position={isHorizontal ? "insideLeft" : "top"}
                  offset={12}
                  className="fill-foreground font-bold"
                  fontSize={12}
                />
              </Bar>
            ))}
            <Legend
              verticalAlign="bottom"
              height={40}
              content={<CustomLegend />}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CustomBarChart;
