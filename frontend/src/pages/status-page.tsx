import { getPageStats } from "@/api/status-pages";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import Loader from "@/components/ui/loader";
import { ModeToggle } from "@/components/ui/mode-toggle";
import NotFound from "@/components/ui/not-found";
import StatusWidget from "@/components/ui/status-widget";
import { StatusPageWStats } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Activity, CircleCheck } from "lucide-react";

const StatusPage = () => {
  const host = window.location.hostname.split(".")[0];
  const { data, isLoading, isError, isSuccess } = useQuery<StatusPageWStats>({
    queryKey: ["pageStats", host],
    queryFn: () => getPageStats(host!),
    enabled: !!host,
  });
  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <Loader />
        </div>
      ) : (
        isSuccess && (
          <HeroHighlight>
            <div className="flex flex-col gap-5 p-5 py-5 min-h-screen max-w-5xl mx-auto">
              {/* Header */}
              <div className="rounded-full font-semibold text-xl text-center py-2 bg-background/70 border-2 w-full">
                Status Page
              </div>
              {/* Bars */}
              <div className="rounded-xl font-semibold text-xl border-2 p-5 bg-background/70 w-full">
                <div className="flex flex-col text-start gap-10">
                  <h1 className="font-bold text-2xl">{data.page.title}</h1>
                  {data.page.monitors && data.dayWiseStats ? (
                    <>
                      <div
                        className={`p-2 w-full border-2 rounded-lg ${
                          parseInt(data.dayWiseStats[0].totalFailed) === 0
                            ? "bg-green-500"
                            : parseInt(data.dayWiseStats[0].totalSuccess) === 0
                            ? "bg-red-500"
                            : "bg-orange-500"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className={`flex gap-2 items-center `}>
                            <CircleCheck />
                            <h6 className="text-sm md:text-xl sm:text-lg">
                              {data.dayWiseStats[0].totalFailed === "0"
                                ? "All Systems Operational"
                                : data.dayWiseStats[0].totalSuccess === "0"
                                ? "Major System Outage"
                                : "Partial System Outage"}
                            </h6>
                          </div>
                          <div className="text-sm md:text-xl sm:text-lg">
                            {new Date().toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <StatusWidget
                        TotalFailed={data.totalFailed}
                        TotalRequest={data.totalFailed + data.totalSuccess}
                        DayWiseRequests={data.dayWiseStats}
                        TotalSuccess={data.totalSuccess}
                        Name={data.page.title}
                      />
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-1 p-2 rounded-2xl bg-background/70 border-2 py-5">
                      <Activity />
                      <h1 className="text-xl font-semibold">No monitors</h1>
                      <p className="text-lg text-muted-foreground">
                        The status page has no connected monitors.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Footer */}
              <div className="flex justify-between items-center text-sm sm:text-base">
                <h1>{Intl.DateTimeFormat().resolvedOptions().timeZone}</h1>
                <h1>
                  Build with 💌 by{" "}
                  <a
                    href="https://portfolio-jayrajrodage.vercel.app/"
                    className="underline"
                  >
                    Jayraj
                  </a>
                </h1>
                <ModeToggle />
              </div>
            </div>
          </HeroHighlight>
        )
      )}
    </>
  );
};

export default StatusPage;
