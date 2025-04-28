import { statusWidget } from "@/lib/types";
import StatusBar from "@/components/ui/status-bar";
const StatusWidget = ({
  TotalFailed,
  Name,
  DayWiseRequests,
  TotalSuccess,
}: statusWidget) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-2">
          <p className="line-clamp-1 font-semibold text-foreground">{Name}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-info h-4 w-4"
            data-state="closed"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </div>
        <p className="shrink-0 font-semibold">
          {(
            (parseInt(TotalSuccess) /
              (parseInt(TotalSuccess) + parseInt(TotalFailed))) *
            100
          ).toFixed(2)}
          %
        </p>
      </div>
      <div>
        <StatusBar DayWiseRequests={DayWiseRequests} />
      </div>
      <div className="flex items-center justify-between font-semibold text-sm">
        <p>45 days ago</p>
        <p>Today</p>
      </div>
    </div>
  );
};

export default StatusWidget;
