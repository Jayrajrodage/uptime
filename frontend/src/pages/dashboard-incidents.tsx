import DashboardLayout from "@/components/dashboard/layout";
import Typography from "@mui/material/Typography";
import { AlertTriangle } from "lucide-react";

const DashboardIncidents = () => {
  return (
    <DashboardLayout>
      <div className="rounded-xl h-screen border border-border bg-background/70 px-3 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-start py-1">
            <div className="">
              <Typography variant="h4">Incidents</Typography>
              <Typography variant="body1">
                Overview of all your incidents.
              </Typography>
            </div>
          </div>
          <div className="rounded-lg border border-border border-dashed bg-background p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col items-center justify-center gap-1">
                <AlertTriangle />
                <p className="text-base text-foreground">No incidents</p>
                <p className="text-center text-muted-foreground">
                  Hopefully you will see this screen for a long time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIncidents;
