import StatusWidget from "../ui/status-widget";
import { dummyStatusWidget } from "@/lib/utils";

const Status = () => {
  return (
    <div className="mt-5 grid sm:gap-1 gap-2 grid-rows-none md:grid-rows-2 rounded-lg border border-border px-3 py-4 backdrop-blur-[2px] bg-gradient-to-br from-0% from-[hsl(var(--muted))] to-20% to-transparent">
      <div className="flex flex-col gap-3 mt-10">
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full border border-border p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-panel-top h-5 w-5"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M3 9h18"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold">Status Page</h1>
        </div>
        <div className="flex items-center justify-center w-full px-2 md:px-2 sm:px-1">
          <div className="max-w-5xl mx-auto w-full">
            <StatusWidget
              TotalFailed={dummyStatusWidget.TotalFailed}
              TotalRequest={dummyStatusWidget.TotalRequest}
              DayWiseRequests={dummyStatusWidget.DayWiseRequests}
              TotalSuccess={dummyStatusWidget.TotalSuccess}
              Name="Ping"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <ul className="gap-4 md:gap-6 grid md:grid-cols-3  sm:max-w-5xl w-full px-2 md:px-2 sm:px-1">
          <li>
            <div className="grid gap-1">
              <p className="flex items-center gap-2">
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
                  className="lucide lucide-puzzle h-4 w-4 text-foreground/80"
                >
                  <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"></path>
                </svg>
                <span className="font-semibold">Build trust</span>{" "}
              </p>
              <span className="text-muted-foreground">
                Showcase your reliability to your users, and reduce the number
                of customer service tickets.
              </span>
            </div>
          </li>
          <li>
            <div className="grid gap-1">
              <p className="flex items-center gap-2">
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
                  className="lucide lucide-globe h-4 w-4 text-foreground/80"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                <span className="font-semibold">Custom domain</span>{" "}
              </p>
              <span className="text-muted-foreground">
                Bring your own domain, give the status page a personal touch.
              </span>
            </div>
          </li>
          <li>
            <div className="grid gap-1">
              <p className="flex items-center gap-2">
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
                  className="lucide lucide-image h-4 w-4 text-foreground/80"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                <span className="font-semibold">Subscription</span>{" "}
              </p>
              <span className="text-muted-foreground">
                Users subscribe to your status page, to automatically receive
                updates about the status of your services.
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Status;
