import React from 'react'
import { Chart } from "react-google-charts";


function BarChart({data}) {
     const options = {
        chartArea: { width: "50%" },
        colors: ["#292524"],
        hAxis: {
          title: "Total Articles",
          minValue: 0,
        },
        vAxis: {
          title: "Publisher",
        },
      };
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  )
}

export default BarChart