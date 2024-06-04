import { useQuery } from "@tanstack/react-query";
import React from "react";
import useArticles from "../../../hooks/useArticles";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TrendingArticleCarousel from "../../../components/Home/TrendingArticleCarousel";
import useAuth from "../../../hooks/useAuth";

function TrendingArticle() {
  const axiosSecure = useAxiosSecure();
  const {user,loading}= useAuth()
  const { data: articleViewCount=[], isLoading } = useQuery({
    queryKey: ["article-viewCount"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/articles-viewCount");
      console.log(data);
      return data;
    },
  });
  return (
    <TrendingArticleCarousel articleViewCount={articleViewCount}/>
  );
}

export default TrendingArticle;
