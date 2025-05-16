"use client";

import { FormEvent, useRef, useState } from "react";
import { DownloadIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  transformChartData,
  getChartFromType,
} from "@/lib/helpers/chartHelpers";

const ChartGenerator = () => {
  const [input, setInput] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [response, setResponse] = useState<Record<string, any> | null>(null);
  const [downloadingImage, setDownloadingImage] = useState(false);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  const handleChartDownload = () => {
    if (chartContainerRef.current) {
      setDownloadingImage(true);
      toPng(chartContainerRef.current, {
        quality: 1,
        cacheBust: true,
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "image.png";
          link.href = dataUrl;
          link.click();
          toast.success("Image downloaded successfully.");
        })
        .catch((err) => {
          toast.error("Something went wrong, failed to download image.");
          console.error("something went wrong!", err);
        })
        .finally(() => {
          setDownloadingImage(false);
        });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please provide an input.");
      return;
    }

    try {
      setLoadingResponse(true);
      setResponse(null);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/text_to_sql`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_query: input,
            model: "o3-mini",
          }),
        }
      );
      if (response.ok && response.status === 200) {
        const data = await response.json();
        transformChartData(data);
        setResponse(data);
        // console.log(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingResponse(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <h1 className="text-2xl font-bold text-center">Chart Generator</h1>
      <div className="text-left mt-3">
        <label htmlFor="query" className="required text-sm">
          Query
        </label>
        <Textarea
          id="query"
          placeholder="Enter query"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-1 w-full"
          required
        />
      </div>
      <div className="flex justify-end mt-3">
        <Button
          type="submit"
          disabled={loadingResponse}
          className="flex items-center cursor-pointer disabled:cursor-not-allowed"
        >
          {loadingResponse && <Loader2 className="animate-spin" />}
          {loadingResponse ? "Generating..." : "Generate Chart"}
        </Button>
      </div>
      <div>
        {response && (
          <>
            <div className="flex justify-end my-2">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                onClick={handleChartDownload}
                disabled={downloadingImage}
              >
                {downloadingImage ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <DownloadIcon />
                )}
                Download
              </Button>
            </div>
            <div ref={chartContainerRef} className="mx-auto text-center">
              {getChartFromType(response?.diagram?.chart_type, response)}
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default ChartGenerator;
