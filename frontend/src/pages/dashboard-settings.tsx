import DashboardLayout from "@/components/dashboard/layout";
import BillingPage from "@/components/dashboard/settings/billing";
import UserProfile from "@/components/dashboard/settings/user-profile";
import Typography from "@mui/material/Typography";
import { CreditCard, User } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const DashboardSettings = () => {
  const { section } = useParams(); // Get the dynamic param from the URL
  const navigate = useNavigate();
  const path = useLocation();
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-3">
        <div className="rounded-xl border border-border p-2 bg-background/70 px-3 py-4 backdrop-blur-lg md:col-span-2">
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between ">
              <Typography variant="h5" className="font-semibold">
                Settings
              </Typography>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <Typography
                variant="body1"
                className={`flex gap-1 rounded-lg border px-4 py-3 font-mono text-sm cursor-pointer ${
                  path.pathname.toLowerCase() ===
                    "/dashboard/settings/profile" &&
                  "dark:bg-gray-900 bg-gray-100"
                }`}
                onClick={() => navigate("/dashboard/settings/profile")}
              >
                <User />
                User profile
              </Typography>

              <Typography
                variant="body1"
                className={`flex gap-1 rounded-lg border px-4 py-3 font-mono text-sm cursor-pointer ${
                  path.pathname.toLowerCase() ===
                    "/dashboard/settings/billing" &&
                  "dark:bg-gray-900 bg-gray-100"
                }`}
                onClick={() => navigate("/dashboard/settings/billing")}
              >
                <CreditCard />
                Billing
              </Typography>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border  bg-background/70 px-3 py-4 backdrop-blur-lg md:col-span-6">
          {section === "profile" ? (
            <UserProfile />
          ) : section === "billing" ? (
            <BillingPage />
          ) : (
            <UserProfile />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
