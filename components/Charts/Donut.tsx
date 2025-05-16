"use client";

import { Label, LabelList, Pie, PieChart } from "recharts";
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

export type DonutChartDataItem = {
  fill: string;
} & Record<string, string | number>;

export type DonutChartConfig = {
  title?: string; // optional
  description?: string; // optional
  data: DonutChartDataItem[];
  dataKey: string;
  nameKey: string;
  total?: number; // optional
  totalText?: string; // optional
};

export type DonutChartProps = {
  chartData: DonutChartConfig;
};

function MyDonutChart({ chartData }: DonutChartProps) {
  const { data, title, description, dataKey, nameKey, total, totalText } =
    chartData;

  const isDataKeyValid = data.every((d) => dataKey in d);
  const isNameKeyValid = data.every((d) => nameKey in d);

  if (!isDataKeyValid || !isNameKeyValid) {
    if (!isDataKeyValid) {
      toast.error(
        `Invalid data key. Property "${dataKey}" does not exist in every object of the provided data array.`
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
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[360px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={70}
              label
            >
              <LabelList
                dataKey={nameKey}
                fontSize={12}
                fontWeight={100}
                formatter={(value: string) => value}
              />
              {total && totalText && (
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {totalText}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              )}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default MyDonutChart;
