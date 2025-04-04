import DashboardNavbar from "@/components/dashboard/navbar";
import { HeroHighlight } from "@/components/ui/hero-highlight";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroHighlight>
      <div className="p-3">
        <DashboardNavbar />
        <div className="py-3">{children}</div>
      </div>
    </HeroHighlight>
  );
};

export default DashboardLayout;
