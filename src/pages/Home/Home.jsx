import React, { useEffect, useState } from "react";
import UserStatistics from "./UsersStatistics/UserStatistics";
import TrendingArticle from "./TrendingArticle/TrendingArticle";
import Container from "../../components/Shared/Container";
import HomePageModal from "../../components/Modal/HomePageModal";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Publisher from "./Publisher/Publisher";
import Plan from "./Plan/Plan";
import ScrollToTopButton from "../../components/Shared/ScrollToTopButton";

function Home() {
  const axiosCommon = useAxiosCommon();
  const { user, loading } = useAuth();
  const { data: trendingArticles = [], isLoading } = useQuery({
    queryKey: ["article-viewCount"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosCommon.get("/trending-articles");
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
  return (
    <Container>
      <TrendingArticle trendingArticles={trendingArticles} />
      <h1 className="mt-20 font-bold">Your Source for Reliable Insights</h1>

      <Publisher />
      <UserStatistics />
      <Plan/>

      <HomePageModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <ScrollToTopButton/>
    </Container>
  );
}

export default Home;
