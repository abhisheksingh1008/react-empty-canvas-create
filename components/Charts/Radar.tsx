"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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

export type RadarChartConfig = {
  title?: string; // optional
  description?: string; // optional
  data: Record<string, string | number>[];
  fill: string[]; // lenght must be atleast equal to dataKeys array
  dataKeys: string[];
  nameKey: string;
};

type RadarChartProps = {
  chartData: RadarChartConfig;
};

function MyRadarChart({ chartData }: RadarChartProps) {
  const { title, description, data, fill, dataKeys, nameKey } = chartData;

  if (dataKeys.length > fill.length) {
    toast.error(
      `Fill array must have lenght greater than or equal to dataKeys array.`
    );
    return <div>Invalid chart data</div>;
  }

  const isNameKeyValid = data.every((d) => nameKey in d);
  const areDataKeysValid = dataKeys
    .map((key) => {
      return data.every((d) => key in d);
    })
    .every((val) => val);

  if (!areDataKeysValid || !isNameKeyValid) {
    if (!areDataKeysValid) {
      toast.error(
        `Invalid data key. Some or all of the provide Y-axis keys does not exist in every object of the provided data array.`
      );
    }
    if (!isNameKeyValid) {
      toast.error(
        `Invalid name key. Property "${nameKey}" does not exist in every object of the provided data array.`
      );
    }
    return <div>Invalid chart data</div>;
  }

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <RadarChart data={data}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey={nameKey} />
            <PolarGrid />
            {dataKeys.map((key, i) => (
              <Radar
                key={key}
                dataKey={key}
                fill={fill[i]}
                fillOpacity={0.7}
                dot={{
                  r: 3,
                  fillOpacity: 0.85,
                }}
              >
                {/* <LabelList position="outside" offset={52} fontSize={12} /> */}
              </Radar>
            ))}
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default MyRadarChart;
