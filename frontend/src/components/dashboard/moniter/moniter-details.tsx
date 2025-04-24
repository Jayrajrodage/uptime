import { Typography } from "@mui/material";
import {
  Bell,
  BellOff,
  ChartLine,
  Globe,
  GlobeLock,
  Settings,
  Table,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MoniterOverview from "./moniter-overview";
import ResponseLogs from "./reponse-logs";
import MoniterSettings from "./moniter-settings";
import DashboardLayout from "../layout";
import { getMonitorInfo } from "@/api/monitor";
import { monitor } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ui/error";

const MoniterDetails = () => {
  const navigate = useNavigate();
  const { section, id } = useParams();
  const { data, isLoading, isError, isSuccess } = useQuery<monitor>({
    queryKey: ["monitorInfo", id],
    queryFn: () => getMonitorInfo(id!),
    enabled: !!id,
  });
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-3">
        <div className="rounded-xl border border-border p-2 bg-background/70 px-3 py-4 backdrop-blur-lg md:col-span-2">
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between ">
              <Typography variant="h5" className="font-semibold">
                Monitors
              </Typography>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <Typography
                variant="body1"
                className={`flex gap-1 rounded-lg border px-4 py-3 font-mono text-sm cursor-pointer ${
                  location.pathname
                    .toLowerCase()
                    .startsWith("/dashboard/moniters/details/overview") &&
                  "dark:bg-gray-900 bg-gray-100"
                }`}
                onClick={() =>
                  navigate(`/dashboard/moniters/details/overview/${id}`)
                }
              >
                <ChartLine />
                Overview
              </Typography>

              <Typography
                variant="body1"
                className={`flex gap-1 rounded-lg border px-4 py-3 font-mono text-sm cursor-pointer ${
                  location.pathname
                    .toLowerCase()
                    .startsWith("/dashboard/moniters/details/logs") &&
                  "dark:bg-gray-900 bg-gray-100"
                }`}
                onClick={() =>
                  navigate(`/dashboard/moniters/details/logs/${id}`)
                }
              >
                <Table />
                Response logs
              </Typography>
              <Typography
                variant="body1"
                className={`flex gap-1 rounded-lg border px-4 py-3 font-mono text-sm cursor-pointer ${
                  location.pathname
                    .toLowerCase()
                    .startsWith("/dashboard/moniters/details/settings") &&
                  "dark:bg-gray-900 bg-gray-100"
                }`}
                onClick={() =>
                  navigate(`/dashboard/moniters/details/settings/${id}`)
                }
              >
                <Settings />
                Settings
              </Typography>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border  bg-background/70 px-3 py-4 backdrop-blur-lg md:col-span-6">
          <div className="flex flex-col gap-3 px-3">
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
                  <>
                    <Typography variant="h4" className="font-semibold">
                      {data.name}
                    </Typography>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                        <Link
                          to={data.url}
                          target="_blank"
                          rel="noreferrer"
                          className="max-w-xs truncate text-base text-muted-foreground md:max-w-md"
                        >
                          {data.url}
                        </Link>
                        <span className="text-xs">•</span>
                        <span className="relative flex h-2 w-2">
                          <span
                            className={`absolute inline-flex opacity-75 duration-1000 h-full w-full animate-ping rounded-full ${
                              data.isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></span>
                          <span
                            className={`relative inline-flex h-2 w-2 rounded-full ${
                              data.isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></span>
                        </span>
                        <span className="text-xs">•</span>
                        <p className="text-base text-muted-foreground">
                          Every {data.frequency === "ThirtyMin" ? "30m" : "1Hr"}
                        </p>
                        <span className="text-xs">•</span>
                        {data.subRegions.length > 0 ? (
                          <Globe className=" h-4 w-4" />
                        ) : (
                          <GlobeLock className=" h-4 w-4" />
                        )}
                        <span className="text-xs">•</span>
                        {data.notificationChannel.length > 0 ? (
                          <Bell className=" h-4 w-4" />
                        ) : (
                          <BellOff className=" h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            <div>
              {section?.toLowerCase() === "overview" ? (
                <MoniterOverview />
              ) : section?.toLowerCase() === "logs" ? (
                <ResponseLogs />
              ) : section?.toLowerCase() === "settings" ? (
                <MoniterSettings />
              ) : (
                <MoniterOverview />
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MoniterDetails;
