import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer ,Pie, PieChart, TooltipIndex } from "recharts";

function ChartCard({title, data,chartType}) {

  if(chartType==="pie"){
    return ( 
      <>
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </>
    )
  }

  if(chartType==="bar"){
    return (
      <>
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </>
    )
  }
  return null;
}

export default ChartCard