import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import CountUp from "react-countup";

function StatisticsCard() {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  const premiumUser = users.filter((user) => user?.premiumTaken);
  const normalUser=users.filter((user) => user.role === 'user')
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      StatisticsCard: {users.length}
      <CountUp start={0} end={users.length} delay={0}>
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
      <CountUp start={0} end={premiumUser.length} delay={0}>
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
      <CountUp start={0} end={normalUser.length} delay={0}>
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </div>
  );
}

export default StatisticsCard;
