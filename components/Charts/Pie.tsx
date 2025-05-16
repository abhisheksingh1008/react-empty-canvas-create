"use client";

import { LabelList, Pie, PieChart } from "recharts";
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

export type PieChartDataItem = {
  fill: string;
} & Record<string, string | number>;

export type PieChartConfig = {
  title?: string; // optional
  description?: string; // optional
  data: PieChartDataItem[];
  dataKey: string;
  nameKey: string;
};

export type PieChartProps = {
  chartData: PieChartConfig;
};

function MyPieChart({ chartData }: PieChartProps) {
  const { data, title, description, dataKey, nameKey } = chartData;

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
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[360px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey={dataKey} label nameKey={nameKey}>
              <LabelList
                dataKey={nameKey}
                fontSize={12}
                fontWeight={100}
                formatter={(value: string) => value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default MyPieChart;
