import React from 'react'

import DashboardCard from '../../components/common/DashboardCard'
import ChartCard from '../../components/common/ChartCard'
import StatsCard from '../../components/common/StatsCard'
function AdminDashboard() {
  return (
    <>
    <section className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <DashboardCard title="Statistics Overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Users" value="1,234" />
        <StatsCard title="Total Orders" value="567" />
        <StatsCard title="Total Revenue" value="$89,012" />
      </div>
      <div>
        <ChartCard title="User Growth Over Time" chartType="line" />
      </div>
      <div>
        <ChartCard title="Revenue Breakdown" chartType="pie" />
      </div>
    </DashboardCard>



      


    </section>
    </>

  )
}

export default AdminDashboard