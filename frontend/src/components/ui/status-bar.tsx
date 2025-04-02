import { statusWidgetArray } from "@/lib/types";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
type props = {
  DayWiseRequests: statusWidgetArray[];
};

const StatusBar = ({ DayWiseRequests }: props) => {
  return (
    <div className="flex flex-row-reverse gap-[3px] sm:gap-0.5">
      {DayWiseRequests.map((day) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`h-10 cursor-pointer rounded-full flex-1 ${
                  day.TotalFailed > 0 ? "bg-orange-400" : "bg-green-500"
                }`}
              ></div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex gap-2 justify-between border rounded-lg border-border bg-secondary p-3">
                <div className="flex flex-col justify-between px-1">
                  <h1 className="font-bold">Operational</h1>
                  <p>
                    <span className="text-green-500">{day.TotalRequest}</span>{" "}
                    Request
                  </p>
                </div>
                <div className="flex flex-col justify-between px-1">
                  <span>{day.Date}</span>
                  <p className="text-end">
                    <span className="text-red-500">{day.TotalFailed}</span>{" "}
                    Failed
                  </p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default StatusBar;
