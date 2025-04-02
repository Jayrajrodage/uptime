import MoniterDetails from "@/components/dashboard/moniter/moniter-details";
import MoniterTable from "@/components/dashboard/moniter/moniter-tabel";
import DashboardNavbar from "@/components/dashboard/navbar";
import { HeroHighlight } from "@/components/ui/hero-highlight";
const Dashboard = () => {
  return (
    <HeroHighlight>
      <div className="p-3">
        <DashboardNavbar />
      </div>
      <div className="p-3">
        <div className="rounded-xl border border-border  bg-background/70 px-3 py-4 backdrop-blur-lg">
          <MoniterTable />
        </div>
      </div>
      <div className="p-3">
        <MoniterDetails />
      </div>
    </HeroHighlight>
  );
};

export default Dashboard;
