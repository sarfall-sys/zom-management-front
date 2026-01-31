import { useEffect } from "react";

import DashboardCard from "../../components/common/DashboardCard";
import ChartCard from "../../components/common/ChartCard";
import StatsCard from "../../components/common/StatsCard";
import useAdmin from "../../hooks/useAdmin";
function AdminDashboard() {
  const {
    userStats,
    productStats,
    fetchProductStats,
    fetchUserStats,
    fetchProductBrandChartData,
    fetchProductSubfamilyChartData,
    productBrandChartData,
    productSubfamilyChartData,
  } = useAdmin();

  console.log("User Stats:", userStats);
  console.log("Product Stats:", productStats);
  console.log("Product Brand Chart Data:", productBrandChartData);
  console.log("Product Subfamily Chart Data:", productSubfamilyChartData);

  useEffect(() => {
    fetchUserStats();
  }, []);

  useEffect(() => {
    fetchProductStats();
  }, []);

  useEffect(() => {
    fetchProductBrandChartData();
  }, []);

  useEffect(() => {
    fetchProductSubfamilyChartData();
  }, []);

  return (
    <>
      <section className="container p-4 mx-auto ">
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

        <DashboardCard title="Statistics Overview">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatsCard
              title="Total Users"
              value={userStats.total_users || "1,234"}
            />
            <StatsCard title="Managers" value={userStats.managers || "1,234"} />
            <StatsCard title="Staff" value={userStats.staff || "1,234"} />
            <StatsCard
              title="Total Products"
              value={productStats.total_products || "567"}
            />
            <StatsCard
              title="Available Products"
              value={productStats.available || "567"}
            />
            <StatsCard
              title="Unavailable Products"
              value={productStats.unavailable || "0"}
            />
          </div>
        </DashboardCard>

        <DashboardCard title="Product Charts">
          <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-2">
            <ChartCard
              title="Products by Brand"
              data={productBrandChartData}
              chartType="bar"
            />
            <ChartCard
              title="Products by Subfamily"
              data={productSubfamilyChartData}
              chartType="pie"
            />
          </div>
        </DashboardCard>
      </section>
    </>
  );
}

export default AdminDashboard;
