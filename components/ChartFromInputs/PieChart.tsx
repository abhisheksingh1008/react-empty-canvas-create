"use client";

import { LabelList, Pie, PieChart } from "recharts";
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
import { ChartGeneratorState } from ".";
import { brandColors } from "@/lib/constants.ts/chartConstants";

export type MyPieChartProps = {
  state: ChartGeneratorState;
};

export function MyPieChart({ state }: MyPieChartProps) {
  const { data, title, description } = state;

  const chartData = JSON.parse(data.trim()).data;
  chartData.forEach(
    (item: { visitors: number; team: string; fill: string }) => {
      item.fill = brandColors[item.team as keyof typeof brandColors].chart;
    }
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="team">
              <LabelList dataKey="team" fontSize={12} />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
