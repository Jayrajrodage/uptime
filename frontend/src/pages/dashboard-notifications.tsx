import DashboardLayout from "@/components/dashboard/layout";
import Typography from "@mui/material/Typography";
import React from "react";

const DashboardNotifications = () => {
  return (
    <DashboardLayout>
      <div className="rounded-xl border border-border bg-background/70 px-3 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-start py-1">
            <div className="">
              <Typography variant="h4">Notifications</Typography>
              <Typography variant="body1">
                Overview of all your notification channels.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardNotifications;
