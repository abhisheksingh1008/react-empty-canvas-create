import { AreaChartConfig } from "@/components/Charts/Area";
import { BarChartConfig } from "@/components/Charts/Bar";
import { DonutChartConfig } from "@/components/Charts/Donut";
import { LineChartConfig } from "@/components/Charts/Line";
import { PieChartConfig } from "@/components/Charts/Pie";
import { RadarChartConfig } from "@/components/Charts/Radar";
import { RadialChartConfig } from "@/components/Charts/Radial";

export const barChartData: BarChartConfig = {
  title: "Title",
  description: "Test description",
  fill: ["#E63329", "#E60693", "#F7E00E"],
  nonIndexAxisKey: "month",
  indexAxisKeys: ["desktop", "mobile"],
  indexAxisLabel: "Sales",
  nonIndexAxisLabel: "Month",
  data: [
    { month: "January", desktop: 186, mobile: 80, tablets: 71 },
    { month: "February", desktop: 305, mobile: 200, tablets: 31 },
    { month: "March", desktop: 237, mobile: 120, tablets: 82 },
    { month: "April", desktop: 73, mobile: 190, tablets: 229 },
    { month: "May", desktop: 209, mobile: 130, tablets: 44 },
    { month: "June", desktop: 214, mobile: 140, tablets: 111 },
  ],
  // isHorizontal: false,
};

export const pieChartData: PieChartConfig = {
  title: "Title",
  description: "Test description",
  data: [
    { month: "January", desktop: 186, fill: "#E63329" },
    { month: "February", desktop: 305, fill: "#E60693" },
    { month: "March", desktop: 237, fill: "#F7E00E" },
    { month: "April", desktop: 73, fill: "#3A225D" },
    { month: "May", desktop: 209, fill: "#004BA8" },
    { month: "June", desktop: 214, fill: "#EE7429" },
  ],
  dataKey: "desktop",
  nameKey: "month",
};

export const donutChartData: DonutChartConfig = {
  title: "Title",
  description: "Test description",
  data: [
    { month: "January", desktop: 186, fill: "#E63329" },
    { month: "February", desktop: 305, fill: "#E60693" },
    { month: "March", desktop: 237, fill: "#F7E00E" },
    { month: "April", desktop: 73, fill: "#3A225D" },
    { month: "May", desktop: 209, fill: "#004BA8" },
    { month: "June", desktop: 214, fill: "#EE7429" },
  ],
  dataKey: "desktop",
  nameKey: "month",
  total: 1305,
  totalText: "Runs",
};

export const lineChartData: LineChartConfig = {
  title: "Title",
  description: "Test description",
  fill: ["#E63329", "#E60693", "#F7E00E"],
  xAxisKey: "month",
  yAxisKeys: ["desktop", "mobile", "tablets"],
  xAxisLabel: "Sales",
  yAxisLabel: "Month",
  data: [
    { month: "January", desktop: 186, mobile: 80, tablets: 71 },
    { month: "February", desktop: 305, mobile: 200, tablets: 31 },
    { month: "March", desktop: 237, mobile: 120, tablets: 82 },
    { month: "April", desktop: 73, mobile: 190, tablets: 229 },
    { month: "May", desktop: 209, mobile: 130, tablets: 44 },
    { month: "June", desktop: 214, mobile: 140, tablets: 111 },
  ],
};

export const radialChartData: RadialChartConfig = {
  title: "Title",
  description: "Test description",
  data: [
    { month: "January", desktop: 186, fill: "#E63329" },
    { month: "February", desktop: 305, fill: "#E60693" },
    { month: "March", desktop: 237, fill: "#F7E00E" },
    { month: "April", desktop: 73, fill: "#3A225D" },
    { month: "May", desktop: 209, fill: "#004BA8" },
    { month: "June", desktop: 214, fill: "#EE7429" },
  ],
  dataKey: "desktop",
  nameKey: "month",
};

export const radarChartData: RadarChartConfig = {
  title: "Title",
  description: "Test description",
  fill: ["#E63329", "#E60693", "#F7E00E"],
  nameKey: "month",
  dataKeys: ["desktop", "mobile"],
  data: [
    { month: "January", desktop: 186, mobile: 80, tablets: 71 },
    { month: "February", desktop: 305, mobile: 200, tablets: 31 },
    { month: "March", desktop: 237, mobile: 120, tablets: 82 },
    { month: "April", desktop: 73, mobile: 190, tablets: 229 },
    { month: "May", desktop: 209, mobile: 130, tablets: 44 },
    { month: "June", desktop: 214, mobile: 140, tablets: 111 },
  ],
};

export const areaChartData: AreaChartConfig = {
  title: "Title",
  description: "Test description",
  fill: ["#E63329", "#E60693", "#F7E00E"],
  nameKey: "month",
  dataKeys: ["desktop", "mobile", "tablets"],
  xAxisLabel: "Sales",
  yAxisLabel: "Month",
  data: [
    { month: "April", desktop: 73, mobile: 190, tablets: 229 },
    { month: "January", desktop: 186, mobile: 80, tablets: 71 },
    { month: "February", desktop: 305, mobile: 200, tablets: 31 },
    { month: "March", desktop: 237, mobile: 120, tablets: 82 },
    { month: "May", desktop: 209, mobile: 130, tablets: 44 },
    { month: "June", desktop: 214, mobile: 140, tablets: 111 },
    { month: "March", desktop: 237, mobile: 120, tablets: 82 },
    { month: "April", desktop: 73, mobile: 190, tablets: 229 },
    { month: "May", desktop: 209, mobile: 130, tablets: 44 },
    { month: "February", desktop: 305, mobile: 200, tablets: 31 },
  ],
  stacked: false,
};
