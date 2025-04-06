import DashboardLayout from "@/components/dashboard/layout";
import CreateChannel from "@/components/dashboard/notification/create-channel";
import NotificationTable from "@/components/dashboard/notification/notification-table";

const DashboardNotifications = () => {
  return (
    <DashboardLayout>
      <div className="rounded-xl border border-border bg-background/70 px-3 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-5">
          <div>
            <NotificationTable />
          </div>
          <div className="w-full border-t border-gray-300 my-4"></div>
          <CreateChannel />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardNotifications;
