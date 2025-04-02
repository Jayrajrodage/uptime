import MoniterStatsTable from "./moniter-stats-table";

const MoniterOverview = () => {
  return (
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
                  100
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
                  100
                </code>
                <span className="self-center text-muted-foreground text-xs">
                  %
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center px-3 py-2 border rounded-lg border-border/80 bg-muted/30 ">
          <p className="font-light text-muted-foreground text-base uppercase">
            last ping
          </p>
          <div>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <p className="flex">
                <code className="mr-1 font-mono font-semibold text-xl">
                  100
                </code>
                <span className="self-center text-muted-foreground text-xs">
                  %
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  px-3 py-2 border rounded-lg border-transparent">
          <p className="font-light text-muted-foreground text-base uppercase">
            total pings
          </p>
          <div>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <p className="flex">
                <code className="mr-1 font-mono font-semibold text-xl empty:mr-0">
                  864
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
                  66
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
                  100
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
                  139
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
                  161
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
                  271
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
        Metrics calculated from the
        <span className="font-medium lowercase underline ">Last day.</span>
      </p>
      <div
        data-orientation="horizontal"
        role="none"
        className="bg-border shrink-0 h-[1px] w-full my-8"
      ></div>
      <div>
        <MoniterStatsTable />
      </div>
    </div>
  );
};

export default MoniterOverview;
