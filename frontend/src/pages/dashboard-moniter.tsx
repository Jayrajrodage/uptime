import DashboardLayout from "@/components/dashboard/layout";
import MoniterTable from "@/components/dashboard/moniter/moniter-tabel";
import ErrorComponent from "@/components/ui/error";
import Loader from "@/components/ui/loader";
import { useMonitors } from "@/hooks/useMonitors";
import { useState } from "react";
const DashboardMoniter = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { data, isLoading, isError, isSuccess } = useMonitors(
    pagination.pageIndex + 1,
    pagination.pageSize
  );
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
          <>
            {isSuccess && (
              <MoniterTable
                data={data}
                pagination={pagination}
                setPagination={setPagination}
              />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardMoniter;
