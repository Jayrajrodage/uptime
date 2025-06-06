import DashboardLayout from "@/components/dashboard/layout";
import StatusTable from "@/components/dashboard/status-page/status-table";
import ErrorComponent from "@/components/ui/error";
import Loader from "@/components/ui/loader";
import { useStatusPages } from "@/hooks/useStatusPages";

const DashboardStatusPage = () => {
  const { data, isLoading, isError, isSuccess } = useStatusPages();
  return (
    <DashboardLayout>
      <div className="h-screen rounded-xl border border-border bg-background/70 px-3 py-4 backdrop-blur-lg">
        {isLoading ? (
          <div className="flex h-screen justify-center items-center">
            <Loader />
          </div>
        ) : isError ? (
          <ErrorComponent />
        ) : (
          <div className="flex flex-col gap-5">
            <div>{isSuccess && <StatusTable Pages={data} />}</div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardStatusPage;
