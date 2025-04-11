import DashboardLayout from "@/components/dashboard/layout";
import CreateChannel from "@/components/dashboard/notification/create-channel";
import NotificationTable from "@/components/dashboard/notification/notification-table";
import { useQuery } from "@tanstack/react-query";
import { getChannels } from "@/api/channel";
import { Channel } from "@/lib/utils";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ui/error";

const DashboardNotifications = () => {
  const {
    data: existingChannels,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<Channel[]>({
    queryKey: ["channels"],
    queryFn: getChannels,
  });

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
