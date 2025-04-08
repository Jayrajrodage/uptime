import DashboardNavbar from "@/components/dashboard/navbar";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { useTheme } from "@/provider/theme-provider";
import { Toaster } from "sonner";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <HeroHighlight>
      <div className="p-3">
        <Toaster theme={theme.theme === "light" ? "light" : "dark"} />
        <DashboardNavbar />
        <div className="py-3">{children}</div>
      </div>
    </HeroHighlight>
  );
};

export default DashboardLayout;
