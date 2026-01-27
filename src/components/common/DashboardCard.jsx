import React from 'react'

function DashboardCard({title,children}) {
  return (
    <div className="bg-bg-light dark:bg-bg-dark shadow-md rounded-lg p-6">
      <h2 className="text-xl text-text-light dark:text-text-dark font-semibold mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  )
}

export default DashboardCard