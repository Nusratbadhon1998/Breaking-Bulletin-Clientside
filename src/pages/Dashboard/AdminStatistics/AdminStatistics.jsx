import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Chart } from "react-google-charts";

function AdminStatistics() {
  const axiosSecure = useAxiosSecure();
  const { data: adminStat = {}, isLoading } = useQuery({
    queryKey: ["admin-stat"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stat");
      console.log(data);
      return data;
    },
  });
  const chartData = adminStat.chartData;

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
  );
}

export default AdminStatistics;
