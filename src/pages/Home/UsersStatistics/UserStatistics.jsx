import React from "react";
import StatisticsCard from "../../../components/Home/StatisticsCard";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

function UserStatistics() {
  const axiosCommon = useAxiosCommon();
  const { data: users = {}, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/users-count");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="flex justify-around mt-20 bg-[url(https://cdn.britannica.com/25/93825-050-D1300547/collection-newspapers.jpg)] backdrop-blur-lg">
      <StatisticsCard count={users.totalUsers} />
      <StatisticsCard count={users.normalUserCount} />
      <StatisticsCard count={users.premiumUsersCount} />
    </section>
  );
}

export default UserStatistics;
