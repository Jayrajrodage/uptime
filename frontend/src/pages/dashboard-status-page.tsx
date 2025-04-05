import DashboardLayout from "@/components/dashboard/layout";
import StatusPageDetails from "@/components/dashboard/status-page/status-page-details";
import StatusTable from "@/components/dashboard/status-page/status-table";

const DashboardStatusPage = () => {
  return (
    <DashboardLayout>
      <div className="rounded-xl border border-border bg-background/70 px-3 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-5">
          <div>
            <StatusTable />
          </div>
          <div>
            <StatusPageDetails />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStatusPage;
