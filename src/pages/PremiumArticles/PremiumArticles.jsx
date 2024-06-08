import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import PublicArticleCard from "../../components/Card/PublicArticleCard";
import Container from "../../components/Shared/Container";

function PremiumArticles() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: premiumArticles = [], isLoading } = useQuery({
    queryKey: ["premium-articles"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/premium-articles");
      return data;
    },
  });
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 space-y-10">
        {premiumArticles.map((article) => (
          <PublicArticleCard
            key={article._id}
            article={article}
          ></PublicArticleCard>
        ))}
      </div>
    </Container>
  );
}

export default PremiumArticles;
