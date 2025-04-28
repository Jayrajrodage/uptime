import { useParams } from "react-router-dom";
import MoniterStatsTable from "./moniter-stats-table";
import { getLast24Stats, getLast24StatsByRegion } from "@/api/monitor";
import { useQuery } from "@tanstack/react-query";
import { last24HrStats, MoniterTableStats } from "@/lib/types";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ui/error";

const MoniterOverview = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useQuery<last24HrStats>({
    queryKey: ["last24Stats", id],
    queryFn: () => getLast24Stats(id!),
    enabled: !!id,
  });

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    isSuccess: isSuccess2,
  } = useQuery<MoniterTableStats[]>({
    queryKey: ["last24StatsByRegion", id],
    queryFn: () => getLast24StatsByRegion(id!),
    enabled: !!id,
  });

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center items-center">
          <Loader />
        </div>
      ) : isError ? (
        <div className="flex w-full  justify-center items-center">
          <ErrorComponent />
        </div>
      ) : (
        <>
          {isSuccess && (
            <div>
              <div className="grid sm:grid-cols-4 grid-cols-2 gap-5">
                <div className="flex flex-col justify-center items-center px-3 py-2 border rounded-lg border-green-500/20 bg-green-500/10">
                  <p className="font-light text-green-600 dark:text-green-400  text-base uppercase">
                    uptime
                  </p>
                  <div>
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                      <p className="flex">
                        <code className="mr-1 font-mono font-semibold text-xl">
                          {(
                            (data.success / (data.failed + data.success)) *
                            100
                          )?.toFixed() ?? 0}
                        </code>
                        <span className="self-center text-muted-foreground text-xs">
                          %
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center px-3 py-2 border rounded-lg border-red-500/20 bg-red-500/10 ">
                  <p className="font-light text-red-600 dark:text-red-400  text-base uppercase">
                    fails
                  </p>
                  <div>
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                      <p className="flex">
                        <code className="mr-1 font-mono font-semibold text-xl">
                          {(
                            (data.failed / (data.failed + data.success)) *
                            100
                          )?.toFixed() ?? 0}
                        </code>
                        <span className="self-center text-muted-foreground text-xs">
                          #
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center px-3 py-2 border rounded-lg border-border/80 bg-muted/30 ">
                  <p className="font-light text-muted-foreground text-base uppercase">
                    total pings
                  </p>
                  <div>
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                      <p className="flex">
                        <code className="mr-1 font-mono font-semibold text-xl">
                          {(data.failed ?? 0) + (data.success ?? 0)}
                        </code>
                        <span className="self-center text-muted-foreground text-xs">
                          #
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2  gap-4">
                <div className="flex flex-col px-3 py-2 border rounded-lg border-transparent">
                  <p className="font-light text-muted-foreground text-sm uppercase">
                    p50
                  </p>
                  <div>
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                      <p className="flex">
                        <code className="mr-1 font-mono font-semibold text-xl empty:mr-0">
                          {(data.p50 ?? 0).toFixed()}
                        </code>
                        <span className="self-center text-muted-foreground text-xs">
                          ms
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col px-3 py-2 border rounded-lg border-transparent">
                  <p className="font-light text-muted-foreground text-sm uppercase">
                    p75
                  </p>
                  <div>
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                      <p className="flex">
                        <code className="mr-1 font-mono font-semibold text-xl empty:mr-0">
                          {(data.p75 ?? 0).toFixed()}
                        </code>
                        <span className="self-center text-muted-foreground text-xs">
                          ms
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col px-3 py-2 border rounded-lg border-transparent">
                  <p className="font-light text-muted-foreground text-sm uppercase">
                    p90
                  </p>
                  <div>
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                      <p className="flex">
                        <code className="mr-1 font-mono font-semibold text-xl empty:mr-0">
                          {(data.p90 ?? 0).toFixed()}
                        </code>
                        <span className="self-center text-muted-foreground text-xs">
                          ms
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col px-3 py-2 border rounded-lg border-transparent">
                  <p className="font-light text-muted-foreground text-sm uppercase">
                    p95
                  </p>
                  <div>
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                      <p className="flex">
                        <code className="mr-1 font-mono font-semibold text-xl empty:mr-0">
                          {(data.p95 ?? 0).toFixed()}
                        </code>
                        <span className="self-center text-muted-foreground text-xs">
                          ms
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col px-3 py-2 border rounded-lg border-transparent">
                  <p className="font-light text-muted-foreground text-sm uppercase">
                    p99
                  </p>
                  <div>
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                      <p className="flex">
                        <code className="mr-1 font-mono font-semibold text-xl empty:mr-0">
                          {(data.p99 ?? 0).toFixed()}
                        </code>
                        <span className="self-center text-muted-foreground text-xs">
                          ms
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="flex gap-1 text-muted-foreground text-xs">
                Metrics calculated from
                <span className="font-medium lowercase underline ">
                  24 Hr's.
                </span>
              </p>
              <div
                data-orientation="horizontal"
                role="none"
                className="bg-border shrink-0 h-[1px] w-full my-8"
              />
            </div>
          )}
        </>
      )}
      {isLoading2 ? (
        <div className="flex w-full justify-center items-center">
          <Loader />
        </div>
      ) : isError2 ? (
        <div className="flex w-full  justify-center items-center">
          <ErrorComponent />
        </div>
      ) : (
        <>
          {isSuccess2 && (
            <div>
              <MoniterStatsTable data={data2} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MoniterOverview;
