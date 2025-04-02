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
            <a
              href="/dashboard/moniters"
              className={`border-b-2 ${
                location.pathname === "/dashboard/moniters"
                  ? "border-black dark:border-white"
                  : "border-transparent"
              } hover:text-white font-medium sm:text-base md:text-sm text-xs `}
            >
              Moniters
            </a>

            <a
              href="/dashboard/incidents"
              className="rounded-md hover:text-white font-medium sm:text-base md:text-sm text-xs"
            >
              Incidents
            </a>
            <a
              href="/dashboard/status-pages"
              className="rounded-md hover:text-white font-medium sm:text-base md:text-sm text-xs"
            >
              Status Pages
            </a>
            <a
              href="/dashboard/notifications"
              className="rounded-md hover:text-white font-medium sm:text-base md:text-sm text-xs"
            >
              Notifications
            </a>
            <a
              href="/dashboard/settings"
              className="rounded-md hover:text-white font-medium sm:text-base md:text-sm text-xs"
            >
              Settings
            </a>
          </div>
          <ScrollBar />
        </ScrollArea>
      </div>
    </div>
  );
};

export default DashboardNavbar;
