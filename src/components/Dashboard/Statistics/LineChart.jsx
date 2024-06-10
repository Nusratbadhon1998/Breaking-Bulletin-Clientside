import React from 'react'
import Chart from 'react-google-charts';

function LineChart({data}) {
    const options = {
        series: [{ color: "#292524" }],
        curveType: "function",
        legend: { position: "bottom" },
      };
  return (
    <Chart
    chartType="LineChart"
    width="100%"
    height="400px"
    data={data}
    options={options}
  />
  )
}

export default LineChart