import DashboardLayout from "@/components/dashboard/layout";
import Typography from "@mui/material/Typography";

const DashboardStatusPage = () => {
  return (
    <DashboardLayout>
      <div className="rounded-xl border border-border bg-background/70 px-3 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between py-1">
            <div>
              <Typography variant="h4">Status Page</Typography>
              <Typography variant="body1">
                Overview of all your pages.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStatusPage;
