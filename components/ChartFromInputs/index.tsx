"use client";

import { useCallback, useState } from "react";
import { useGenerateImage } from "recharts-to-png";
import { DownloadIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { brandColors, chartTypes } from "@/lib/constants.ts/chartConstants";
import { getChartFromType } from "@/lib/helpers/chartHelpers";

export interface ChartFromInputsState {
  team: keyof typeof brandColors;
  chartType: string;
  data: string;
  xAxisKey: string;
  yAxisKey: string;
  isDataValid: boolean;
  title: string;
  description: string;
  xAxisLabel: string;
  yAxisLabel: string;
}

const ChartFromInputs = () => {
  const [state, setState] = useState<ChartFromInputsState>({
    team: "MI",
    chartType: chartTypes.bar,
    data: "",
    xAxisKey: "",
    yAxisKey: "",
    isDataValid: false,
    title: "",
    description: "",
    xAxisLabel: "",
    yAxisLabel: "",
  });

  //   const [getPng, { ref1, isLoading }] = useCurrentPng();
  const [getDivJpeg, { ref }] = useGenerateImage<HTMLDivElement>({
    quality: 0.8,
    type: "image/jpeg",
  });

  const handleDivDownload = useCallback(async () => {
    const jpeg = await getDivJpeg();
    console.log(jpeg);
    if (jpeg) {
      //   FileSaver.saveAs(jpeg, 'div-element.jpeg');
    }
  }, [getDivJpeg]);

  //   const handleDownload = useCallback(async () => {
  //     console.log("clicked");
  //     const png = await getPng();
  //     console.log(png);

  //     // Verify that png is not undefined
  //     if (png) {
  //       console.log(png);
  //       // Download with FileSaver
  //       //   FileSaver.saveAs(png, 'myChart.png');
  //     }
  //   }, [getPng]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = state;
      if (data.length === 0) {
        toast.error("Please provide chart data");
        setState((prev) => ({ ...prev, isDataValid: false }));
        return;
      }
      const parsedData = JSON.parse(data.trim()).data;
      if (!Array.isArray(parsedData)) {
        toast.error("Provided chart data is not an array");
        setState((prev) => ({ ...prev, isDataValid: false }));
        return;
      } else {
        setState((prev) => ({ ...prev, isDataValid: true }));
      }
      if (state.chartType === chartTypes.bar) {
        if (state.xAxisKey === "" || state.yAxisKey === "") {
          toast.error("Please provide X-Axis and Y-Axis keys");
          setState((prev) => ({ ...prev, isDataValid: false }));
          return;
        }

        const hasValidXAxisKey = parsedData.every(
          (item: Record<string, string | number>) => {
            return state.xAxisKey in item;
          }
        );
        if (!hasValidXAxisKey) {
          toast.error("Provided X-Axis key does not exist in the data");
          setState((prev) => ({ ...prev, isDataValid: false }));
          return;
        }

        const hasValidYAxisKey = parsedData.every(
          (item: Record<string, string | number>) => {
            return state.yAxisKey in item;
          }
        );
        if (!hasValidYAxisKey) {
          toast.error("Provided Y-Axis key does not exist in the data");
          setState((prev) => ({ ...prev, isDataValid: false }));
          return;
        }
        setState((prev) => ({ ...prev, isDataValid: true }));
      }
    } catch (error) {
      toast.error("Error parsing chart data");
      setState((prev) => ({ ...prev, isDataValid: false }));
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-4">
      <h1 className="text-2xl font-bold text-center">Chart Generator</h1>
      <div className="flex items-center justify-between gap-4 mt-3">
        <div className="text-left w-[49%]">
          <label htmlFor="chartType" className="required text-sm">
            Select Chart Type
          </label>
          <Select
            onValueChange={(value) =>
              setState((prev) => ({
                ...prev,
                chartType: value,
                isDataValid: false,
              }))
            }
            value={state.chartType}
            required
          >
            <SelectTrigger id="chartType" className="mt-1">
              <SelectValue placeholder="Select Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(chartTypes).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {state.chartType !== chartTypes.pie &&
          state.chartType !== chartTypes.doughnut && (
            <div className="text-left w-[49%]">
              <label htmlFor="team" className="required text-sm">
                Select IPL Team
              </label>
              <Select
                onValueChange={(value) =>
                  setState((prev) => ({
                    ...prev,
                    team: value as keyof typeof brandColors,
                    isDataValid: false,
                  }))
                }
                value={state.team}
                required
              >
                <SelectTrigger id="team" className="mt-1">
                  <SelectValue placeholder="Select IPL Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.keys(brandColors).map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
      </div>
      <div className="flex items-center justify-between gap-4 mt-3">
        <div className="text-left w-[49%]">
          <label htmlFor="title" className="text-sm">
            Title
          </label>
          <Input
            id="title"
            placeholder="Enter Chart Title"
            value={state.title}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                title: e.target.value,
                isDataValid: false,
              }))
            }
            className="mt-1"
          />
        </div>
        <div className="text-left w-[49%]">
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <Input
            id="description"
            placeholder="Enter Chart Description"
            value={state.description}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                description: e.target.value,
                isDataValid: false,
              }))
            }
            className="mt-1"
          />
        </div>
      </div>
      <div className="text-left mt-3">
        <label htmlFor="chartData" className="required text-sm">
          Chart Data
        </label>
        <Textarea
          id="chartData"
          placeholder="Enter chart data"
          className="mt-1 w-full"
          value={state.data}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              data: e.target.value,
              isDataValid: false,
            }))
          }
          disabled={!state.chartType}
          required
        />
      </div>
      {state.chartType === chartTypes.bar && (
        <div>
          <div className="flex items-center justify-between gap-4 mt-3">
            <div className="text-left w-[49%]">
              <label htmlFor="xAxisKey" className="required text-sm">
                X-Axis Key
              </label>
              <Input
                id="xAxisKey"
                placeholder="Enter X-Axis key"
                value={state.xAxisKey}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    xAxisKey: e.target.value,
                    isDataValid: false,
                  }))
                }
                className="mt-1"
                required
              />
            </div>
            <div className="text-left w-[49%]">
              <label htmlFor="yAxisKey" className="required text-sm">
                Y-Axis Key
              </label>
              <Input
                id="yAxisKey"
                placeholder="Enter Y-Axis key"
                value={state.yAxisKey}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    yAxisKey: e.target.value,
                    isDataValid: false,
                  }))
                }
                className="mt-1"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 mt-3">
            <div className="text-left w-[49%]">
              <label htmlFor="xAxisLabel" className="text-sm">
                X-Axis Label
              </label>
              <Input
                id="xAxisLabel"
                placeholder="Enter X-Axis Label"
                value={state.xAxisLabel}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    xAxisLabel: e.target.value,
                    isDataValid: false,
                  }))
                }
                className="mt-1"
              />
            </div>
            <div className="text-left w-[49%]">
              <label htmlFor="yAxisLabel" className="text-sm">
                Y-Axis Label
              </label>
              <Input
                id="yAxisLabel"
                placeholder="Enter Y-Axis Label"
                value={state.yAxisLabel}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    yAxisLabel: e.target.value,
                    isDataValid: false,
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-3">
        <Button>Generate Chart</Button>
      </div>
      {state.isDataValid && (
        <>
          <div className="mt-5 mb-3 flex items-center justify-between flex-wrap gap-3">
            <p className="font-bold text-lg text-center mb-2">
              {state.chartType} Chart
            </p>
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleDivDownload}
              //   disabled={isLoading}
            >
              {/* {isLoading ? <Loader2 className="animate-spin" /> : <DownloadIcon />} */}
              <DownloadIcon />
              Download
            </Button>
          </div>
          <div ref={ref}>{getChartFromType(state)}</div>
        </>
      )}
    </form>
  );
};

export default ChartFromInputs;
