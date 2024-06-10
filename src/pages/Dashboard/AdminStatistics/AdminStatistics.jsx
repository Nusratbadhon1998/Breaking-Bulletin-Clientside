import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PieChart from "../../../components/Dashboard/Statistics/PieChart";
import BarChart from "../../../components/Dashboard/Statistics/BarChart";
import LineChart from "../../../components/Dashboard/Statistics/LineChart";
import Container from "../../../components/Shared/Container";

function AdminStatistics() {
  const axiosSecure = useAxiosSecure();
  const { data: adminStat = {}, isLoading } = useQuery({
    queryKey: ["admin-stat"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stat");
      return data;
    },
  });
  const chartData = adminStat.chartData;

  return (
    <Container>
      <div className="flex flex-col lg:flex-row gap-5">
        <BarChart data={chartData} />
        <LineChart data={chartData} />
      </div>
      <PieChart chartData={chartData} />
    </Container>
  );
}

export default AdminStatistics;
