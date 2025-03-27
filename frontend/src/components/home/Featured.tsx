import React from "react";
import { Globe } from "../magicui/globe";
import { NumberTicker } from "../magicui/number-ticker";
const Featured = () => {
  return (
    <div className="mt-10">
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full border border-border p-2">
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
              className="lucide lucide-activity h-5 w-5"
            >
              <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold">Monitoring</h1>
        </div>
        <div className="grid gap-10 grid-cols-none md:grid-cols-2">
          <div>
            <Globe />
          </div>
          <div className="sm:mt-6 sm:px-5 px-2">
            <ul className="gap-3 md:gap-6 flex flex-col mt-5">
              <li>
                <div className="flex gap-3 sm:justify-start sm:items-center">
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
                  <div className="grid gap-1 font-semibold">
                    Latency Monitoring
                  </div>
                </div>
                <p className="text-start text-muted-foreground">
                  Monitor the latency of your endpoints from all over the world.
                  We support all the continents.
                </p>
              </li>
              <li>
                <div className="flex gap-3 justify-start items-center">
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
                    className="lucide lucide-play h-4 w-4 text-foreground/80"
                  >
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                  <div className="grid gap-1 font-semibold">
                    Monitor anything
                  </div>
                </div>
                <p className="text-start text-muted-foreground">
                  API, DNS, domain, SSL, SMTP, ping, webpage... We can monitor
                  it all.
                </p>
              </li>
              <li>
                <div className="flex gap-3 justify-start items-center">
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
                    className="lucide lucide-bot h-4 w-4 text-foreground/80"
                  >
                    <path d="M12 8V4H8"></path>
                    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                    <path d="M2 14h2"></path>
                    <path d="M20 14h2"></path>
                    <path d="M15 13v2"></path>
                    <path d="M9 13v2"></path>
                  </svg>
                  <div className="grid gap-1 font-semibold">OpenTelemetry</div>
                </div>
                <p className="text-start text-muted-foreground">
                  Export your synthetic monitoring metrics to your observability
                  stack.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16 mt-10">
        <div className="text-center">
          <h3 className="font-cal text-3xl">
            <NumberTicker value={26} />M
          </h3>
          <p className="font-medium ">Weekly pings</p>
        </div>
        <div className="text-center">
          <h3 className="font-cal text-3xl">
            <NumberTicker value={155} />K
          </h3>
          <p className="font-medium ">Pings in the last hour</p>
        </div>
        <div className="text-center sm:col-span-1 col-span-2">
          <h3 className="font-cal text-3xl">
            <NumberTicker value={3400} />+
          </h3>
          <p className="font-medium ">Active monitors</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
