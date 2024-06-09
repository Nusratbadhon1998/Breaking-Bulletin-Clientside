import React from "react";
import StatisticsCard from "../../../components/Home/StatisticsCard";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { MdPeopleAlt } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { MdWorkspacePremium } from "react-icons/md";




function UserStatistics() {
  const axiosCommon = useAxiosCommon();
  const { data: users = {}, isLoading } = useQuery({
    queryKey: ["users-count"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/users-count");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="flex grayscale  justify-around mt-20 backdrop-blur-sm bg-[url(https://cdn.britannica.com/25/93825-050-D1300547/collection-newspapers.jpg)] backdrop-blur-lg">
      <StatisticsCard count={users.totalUsers} title="Total User" icon={MdPeopleAlt} />
      <StatisticsCard count={users.normalUserCount} title="Normal User" icon={FaUserLarge} />
      <StatisticsCard count={users.premiumUsersCount} title="Premium User" icon={MdWorkspacePremium} />
    </section>
  );
}

export default UserStatistics;
