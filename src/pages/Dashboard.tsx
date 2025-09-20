import { Truck, Package, Target, AlertCircle } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import LoadingPointChart from "@/components/dashboard/LoadingPointChart";
import ScheduledDispatchesTable from "@/components/dashboard/ScheduledDispatchesTable";
import AlertsFeed from "@/components/dashboard/AlertsFeed";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Rakes Dispatched (24h)"
          value={12}
          icon={Truck}
          change={{ value: 8.2, isPositive: true }}
        />
        <KPICard
          title="Total Tonnage Moved"
          value="48,500"
          suffix="MT"
          icon={Package}
          change={{ value: 5.1, isPositive: true }}
        />
        <KPICard
          title="Average Rake Utilization"
          value="98.2"
          suffix="%"
          icon={Target}
          change={{ value: 2.3, isPositive: true }}
        />
        <KPICard
          title="High-Priority Orders Pending"
          value={7}
          icon={AlertCircle}
          change={{ value: 12.5, isPositive: false }}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Charts and Tables */}
        <div className="lg:col-span-2 space-y-6">
          <LoadingPointChart />
          <ScheduledDispatchesTable />
        </div>

        {/* Right Sidebar - Alerts */}
        <div className="lg:col-span-1">
          <AlertsFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;