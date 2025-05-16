"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";
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

export type RadialChartDataItem = {
  fill: string;
} & Record<string, string | number>;

export type RadialChartConfig = {
  title?: string; // optional
  description?: string; // optional
  data: RadialChartDataItem[];
  dataKey: string;
  nameKey: string;
};

type RadialChartProps = {
  chartData: RadialChartConfig;
};

const RADIAN = Math.PI / 180;
const renderCustomLabelsAndLines = (props: {
  fill: string;
  cx: number;
  cy: number;
  value: number;
  viewBox: {
    cx: number;
    cy: number;
    startAngle: number;
    endAngle: number;
    innerRadius: number;
    outerRadius: number;
  };
}) => {
  const {
    cx,
    cy,
    viewBox: { outerRadius, startAngle, endAngle },
    value,
    fill,
  } = props;

  const midAngle = (startAngle + endAngle) / 2;

  // Dynamic stretch: the smaller the radius, the longer the extension
  const maxRadius = 165; // Change this to match your max outerRadius
  const dynamicOffset = (maxRadius - outerRadius) * 0.8 + 20; // tune factor (0.8) + base line
  const lineEndRadius = outerRadius + dynamicOffset;
  const textRadius = outerRadius + dynamicOffset + 5;

  const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  const x2 = cx + lineEndRadius * Math.cos(-midAngle * RADIAN);
  const y2 = cy + lineEndRadius * Math.sin(-midAngle * RADIAN);
  const xText = cx + textRadius * Math.cos(-midAngle * RADIAN);
  const yText = cy + textRadius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      {/* Connector Line */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={fill} strokeWidth={1} />
      {/* Value Label */}
      <text
        x={xText}
        y={yText}
        fill="#000"
        textAnchor={xText > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {value}
      </text>
    </>
  );
};

function MyRadialChart({ chartData }: RadialChartProps) {
  const { title, description, data, dataKey, nameKey } = chartData;

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
          className="mx-auto aspect-square max-h-[400px]"
        >
          <RadialBarChart
            data={data}
            startAngle={-90}
            endAngle={380}
            innerRadius={50}
            outerRadius={170}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey={nameKey} />}
            />
            <RadialBar
              dataKey={dataKey}
              background
              label={renderCustomLabelsAndLines}
            >
              <LabelList
                position="insideStart"
                dataKey={nameKey}
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default MyRadialChart;
