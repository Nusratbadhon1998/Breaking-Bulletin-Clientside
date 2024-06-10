import React from 'react'
import Chart from 'react-google-charts'

function PieChart({chartData}) {
    const options = {
        title: "Percentage of Publisher",
      };
  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}

export default PieChart