import React, { useEffect, useState } from "react";
import UserStatistics from "./UsersStatistics/UserStatistics";
import TrendingArticle from "./TrendingArticle/TrendingArticle";
import Container from "../../components/Shared/Container";
import HomePageModal from "../../components/Modal/HomePageModal";
import { useQuery } from "@tanstack/react-query";

import useAxiosCommon from "../../hooks/useAxiosCommon";
import Publisher from "./Publisher/Publisher";
import Plan from "./Plan/Plan";
import ScrollToTopButton from "../../components/Shared/ScrollToTopButton";
import RecentNews from "./RecentNews/RecentNews";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Category from "./Category/Category";
import International from "./International/International";
import Newsletter from "./Newsletter/Newsletter";

function Home() {
  const axiosCommon = useAxiosCommon();
  const { data: trendingArticles = [], isLoading } = useQuery({
    queryKey: ["trending-articles"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/trending-articles");
      return data;
    },
  });
  const { data: recentArticles = [], isLoading: recentLoading } = useQuery({
    queryKey: ["recent-articles"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/recent-articles");
      return data;
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) return <LoadingSpinner />;
  return (
    <Container>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="grid grid-cols-1 space-y-5">
          <h1 className="font-bold text-xl">Recent News</h1>
          {recentArticles.slice(0, 3).map((article) => (
            <RecentNews key={article._id} article={article} />
          ))}
        </div>
        <div className="flex-1 h-full">
          <TrendingArticle trendingArticles={trendingArticles} />
        </div>
        <div className="space-y-6">
          {recentArticles.slice(4, 7).map((article) => (
            <RecentNews key={article._id} article={article} />
          ))}
        </div>
      </div>
      <div className="divider  divider-neutral"></div>
      <div>
        <Category trendingArticles={trendingArticles} />
      </div>

      <International/>

      <div className="text-2xl font-bold my-12">
        Your Source for Reliable Insights
      </div>

      <Publisher />

      <div className="text-2xl font-bold my-12">
        Our Community at a Glance
      </div>
      <UserStatistics />
      <Plan />
      <Newsletter/>

      <HomePageModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <ScrollToTopButton />
    </Container>
  );
}

export default Home;
