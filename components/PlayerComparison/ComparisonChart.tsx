
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MyRadarChart, { RadarChartConfig } from "@/components/Charts/Radar";

interface ComparisonChartProps {
  player1: string;
  player2: string;
  chartData: Array<{ name: string; player1: number; player2: number }>;
}

export default function ComparisonChart({
  player1,
  player2,
  chartData
}: ComparisonChartProps) {
  // Transform data for radar chart
  const transformedData = chartData.map(item => ({
    stat: item.name,
    [player1]: item.player1,
    [player2]: item.player2
  }));
  
  const radarConfig: RadarChartConfig = {
    title: "Player Performance Comparison",
    description: "Average stats comparison between selected players",
    data: transformedData,
    fill: ["#10b981", "#1e40af"], // Green and Blue colors
    dataKeys: [player1, player2],
    nameKey: "stat"
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[400px]">
          <MyRadarChart chartData={radarConfig} />
        </div>
      </CardContent>
    </Card>
  );
}
