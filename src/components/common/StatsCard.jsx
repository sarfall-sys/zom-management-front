import React from 'react'

function StatsCard({title, value,color}) {
  return (
    <div className={`p-4 rounded-lg shadow-md ${color} text-white`}>
      <h2 className="mb-4 text-xl font-semibold text-text-light dark:text-text-dark">{title}</h2>
      <p className="text-3xl font-bold text-text-light dark:text-text-dark">{value}</p>
    </div>
  )
}

export default StatsCard