import { Typography } from "@mui/material";
import { BellOff, ChartLine, Globe, Settings, Table } from "lucide-react";
import { Link } from "react-router-dom";
import MoniterOverview from "./moniter-overview";
import ResponseLogs from "./reponse-logs";
import MoniterSettings from "./moniter-settings";

const MoniterDetails = () => {
  return (
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
              className="flex gap-1 rounded-lg border px-4 py-3 font-mono text-sm cursor-pointer dark:bg-gray-900 bg-gray-100"
            >
              <ChartLine />
              Overview
            </Typography>

            <Typography
              variant="body1"
              className="flex gap-1 rounded-lg border px-4 py-3 font-mono text-sm cursor-pointer"
            >
              <Table />
              Response logs
            </Typography>
            <Typography
              variant="body1"
              className="flex gap-1 rounded-lg border px-4 py-3 font-mono text-sm cursor-pointer"
            >
              <Settings />
              Settings
            </Typography>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border  bg-background/70 px-3 py-4 backdrop-blur-lg md:col-span-6">
        <div className="flex flex-col gap-3 px-3">
          <Typography variant="h4" className="font-semibold">
            Lingo
          </Typography>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <Link
                to="https://admin-voice-chat.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="max-w-xs truncate text-base text-muted-foreground md:max-w-md"
              >
                https://admin-voice-chat.vercel.app/
              </Link>
              <span className="text-xs">•</span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 duration-1000"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span className="text-xs">•</span>
              <p className="text-base text-muted-foreground">Every 10m</p>
              <span className="text-xs">•</span>
              <Globe className=" h-4 w-4" />
              <span className="text-xs">•</span>
              <BellOff className=" h-4 w-4" />
            </div>
          </div>
          {/* <div>
            <MoniterOverview />
          </div> */}
          {/* <div>
            <ResponseLogs />
          </div> */}
          <div>
            <MoniterSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoniterDetails;
