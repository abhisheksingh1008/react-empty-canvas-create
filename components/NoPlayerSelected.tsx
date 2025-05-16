import { Card, CardContent } from "@/components/ui/card";

function NoPlayerSelected() {
  return (
    <Card className="bg-cricket-light border-dashed border-2 border-[#10b981]/30">
      <CardContent className="p-10 flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-[#10b981]/10 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#10b981]"
          >
            <path d="m8.25 2.05 7.5 1.3a2.2 2.2 0 0 1 1.75 2.17v3.35a2 2 0 0 1-1 1.73l-.3.17m-11.2-7.5v12.7a2.29 2.29 0 0 0 2.15 2.28L12 19"></path>
            <path d="M5.5 14.5 12 9l6.5 5.5m-13-13v8l6.5-5.5"></path>
          </svg>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-medium text-[#10b981]">
            No Player Selected
          </h3>
          <p className="text-gray-500 max-w-md">
            Search for a cricket player to view their fantasy performance
            statistics over the last three years.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default NoPlayerSelected;
