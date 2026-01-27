import React from 'react'

function StatsCard({title, value}) {
  return (
    <div className="bg-bg-light dark:bg-bg-dark shadow-md rounded-lg p-6">
      <h2 className="text-xl text-text-light dark:text-text-dark font-semibold mb-4">{title}</h2>
      <p className="text-3xl text-text-light dark:text-text-dark font-bold">{value}</p>
    </div>
  )
}

export default StatsCard