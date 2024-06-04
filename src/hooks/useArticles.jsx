import React from 'react'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

function useArticles() {
    const {user,loading}= useAuth()
    const axiosSecure= useAxiosSecure()
    const {
        data: articles = [],
        isLoading:articlesLoading,
        refetch,
      } = useQuery({
        queryKey: ["articles"],
        enabled: !loading && !!user.email,
        queryFn: async () => {
          const { data } = await axiosSecure.get("/articles");
          return data;
        },
      });
  return [articles,articlesLoading]
}

export default useArticles