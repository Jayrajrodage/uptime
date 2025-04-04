import { UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ModeToggle } from "../ui/mode-toggle";

const DashboardNavbar = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border  bg-background/70 px-3 pt-3 pb-1 backdrop-blur-lg ">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <img src="/uptime.png" alt="uptime" width={40} height={40} />
          {/* Brand Name */}
          <Link
            to="/dashboard/moniters"
            className="text-2xl font-bold text-black dark:text-white"
          >
            Uptime
          </Link>
        </div>
        <div className="flex gap-7 justify-center items-center">
          <h1 className="text-lg font-medium hover:underline hidden sm:block">
            Changelog
          </h1>
          <h1 className="text-lg font-medium hover:underline hidden sm:block">
            Docs
          </h1>
          <UserButton />
          <>
            <ModeToggle />
          </>
        </div>
      </div>
      <div>
        <ScrollArea type="auto">
          <div className="flex gap-5 mb-1.5 sm:mb-0  ">
            <Link
              to="/dashboard/moniters"
              className={`border-b-2 ${
                location.pathname === "/dashboard/moniters"
                  ? "border-black dark:border-white"
                  : "border-transparent"
              } hover:text-white font-medium sm:text-base md:text-sm text-xs `}
            >
              Moniters
            </Link>

            <Link
              to="/dashboard/incidents"
              className={`border-b-2 ${
                location.pathname === "/dashboard/incidents"
                  ? "border-black dark:border-white"
                  : "border-transparent"
              } hover:text-white font-medium sm:text-base md:text-sm text-xs `}
            >
              Incidents
            </Link>
            <Link
              to="/dashboard/status-pages"
              className={`border-b-2 ${
                location.pathname === "/dashboard/status-pages"
                  ? "border-black dark:border-white"
                  : "border-transparent"
              } hover:text-white font-medium sm:text-base md:text-sm text-xs `}
            >
              Status Pages
            </Link>
            <Link
              to="/dashboard/notifications"
              className={`border-b-2 ${
                location.pathname === "/dashboard/notifications"
                  ? "border-black dark:border-white"
                  : "border-transparent"
              } hover:text-white font-medium sm:text-base md:text-sm text-xs `}
            >
              Notifications
            </Link>
            <Link
              to="/dashboard/settings"
              className={`border-b-2 ${
                location.pathname === "/dashboard/settings"
                  ? "border-black dark:border-white"
                  : "border-transparent"
              } hover:text-white font-medium sm:text-base md:text-sm text-xs `}
            >
              Settings
            </Link>
          </div>
          <ScrollBar />
        </ScrollArea>
      </div>
    </div>
  );
};

export default DashboardNavbar;
