import BarChart, { BarChartConfig } from "@/components/Charts/Bar";
import PieChart, { PieChartConfig } from "@/components/Charts/Pie";
import DonutChart, { DonutChartConfig } from "@/components/Charts/Donut";
import LineChart, { LineChartConfig } from "@/components/Charts/Line";
import { teamPrimaryColors } from "../constants.ts/chartConstants";

export const getChartFromType = (type: string, data: Record<string, any>) => {
  switch (type) {
    case "bar chart":
      return <BarChart chartData={data as BarChartConfig} />;

    case "line chart":
      return <LineChart chartData={data as LineChartConfig} />;

    case "pie chart":
      return <PieChart chartData={data as PieChartConfig} />;

    case "Donut chart":
      return <DonutChart chartData={data as DonutChartConfig} />;

    default:
      return <div>Unsupported chart type: {type}</div>;
  }
};

export const transformChartData = (chartData: Record<string, any>) => {
  const type = chartData?.diagram?.chart_type;
  const randomNum = Math.floor(Math.random() * 9) + 1;

  switch (type) {
    case "bar chart":
      chartData.fill = chartData?.yAxisKeys.map((_: string, i: number) => {
        return teamPrimaryColors[(randomNum + i) % 9];
      });
      chartData.nonIndexAxisKey = chartData.xAxisKey;
      chartData.indexAxisKeys = chartData.yAxisKeys;
      chartData.indexAxisLabel = chartData.yAxisLabel;
      chartData.nonIndexAxisLabel = chartData.xAxisLabel;
      break;

    case "line chart":
      chartData.fill = chartData?.yAxisKeys.map((_: string, i: number) => {
        return teamPrimaryColors[(randomNum + i) % 9];
      });
      break;

    case "pie chart":
      chartData?.data?.forEach(
        (data: Record<string, string | number>, i: number) => {
          data.fill = teamPrimaryColors[(randomNum + i) % 9];
        }
      );
      break;

    case "donut chart":
      chartData?.data?.forEach(
        (data: Record<string, string | number>, i: number) => {
          data.fill = teamPrimaryColors[(randomNum + i) % 9];
        }
      );
      break;

    default:
      break;
  }
};
