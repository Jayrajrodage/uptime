import DashboardLayout from "@/components/dashboard/layout";
import CreateChannel from "@/components/dashboard/notification/create-channel";
import NotificationTable from "@/components/dashboard/notification/notification-table";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ui/error";
import { useChannels } from "@/hooks/useChannels";

const DashboardNotifications = () => {
  const {
    data: existingChannels,
    isLoading,
    isError,
    isSuccess,
  } = useChannels();

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
            <div>
              {isSuccess && (
                <NotificationTable channelData={existingChannels} />
              )}
            </div>
            <CreateChannel />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardNotifications;
