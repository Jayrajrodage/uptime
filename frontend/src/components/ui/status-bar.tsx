import { statusWidgetArray } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type props = {
  DayWiseRequests: statusWidgetArray[];
};

const StatusBar = ({ DayWiseRequests }: props) => {
  console.log("🚀 ~ StatusBar ~ DayWiseRequests:", DayWiseRequests);
  return (
    <div className="flex flex-row-reverse gap-[3px] sm:gap-0.5">
      {DayWiseRequests.map((day, id) => (
        <TooltipProvider key={id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`h-10 cursor-pointer rounded-full border-2  flex-1 ${
                  parseInt(day.totalFailed) + parseInt(day.totalSuccess) === 0
                    ? "bg-gray-300"
                    : parseInt(day.totalSuccess) === 0
                    ? "bg-red-500"
                    : parseInt(day.totalFailed) > 0
                    ? "bg-orange-400"
                    : "bg-green-500"
                }`}
              ></div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex">
                <div
                  className={`h-12 ${
                    parseInt(day.totalFailed) + parseInt(day.totalSuccess) === 0
                      ? "bg-gray-300"
                      : parseInt(day.totalSuccess) === 0
                      ? "bg-red-500"
                      : parseInt(day.totalFailed) > 0
                      ? "bg-orange-400"
                      : "bg-green-500"
                  } w-2 rounded-2xl`}
                ></div>
                <div className="flex gap-2 justify-between rounded-lg">
                  <div className="flex flex-col justify-between px-1">
                    <h1 className="font-bold">Operational</h1>
                    <p>
                      <span className="text-green-500 font-semibold text-lg">
                        {day.totalSuccess}
                      </span>{" "}
                      Request
                    </p>
                  </div>
                  <div className="flex flex-col justify-between px-1">
                    <span>{day.date}</span>
                    <p className="text-end">
                      <span className="text-red-500 font-semibold text-lg">
                        {day.totalFailed}
                      </span>{" "}
                      Failed
                    </p>
                  </div>
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
