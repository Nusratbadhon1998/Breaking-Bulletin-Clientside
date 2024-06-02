import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import PublicArticleCard from "../../components/Card/PublicArticleCard";
import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";

function PublicArticles() {
  const { user: loggedUser = {}, loading } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [publisherFilter, setPublisherFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const tags = [
    "technology",
    "environment",
    "healthcare",
    "cyber-security",
    "finance",
    ,
    "society",
    "global-market",
  ];

  //   Get all the articles
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles", publisherFilter, tagFilter, search, sort],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/articles?publisher=${publisherFilter}&tag=${tagFilter}&sort=${sort}&search=${search}`
      );
      return data;
    },
  });
  //   Get all publisher
  const { data: publishers = [], isLoading: publisherLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/publishers");
      return data;
    },
  });

  //   Get a user
  const { data: user = {}, isLoading: userLoading } = useQuery({
    queryKey: ["user", loggedUser?.email],
    enabled: !loading && !!loggedUser?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${loggedUser?.email}`);
      return data;
    },
  });

  const handleReset = () => {
    setPublisherFilter("");
    setTagFilter("");
    setSort("");
    setSearch("");
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
    console.log(searchText);
  };

  const handleViewCount = async (id) => {
    const { data } = await axiosSecure.put(`/article/${id}`);
    console.log(data);
  };


  const filterArticles = articles.filter((article) => {
    return article.status == "Approved";
  });

  return (
    <Container>
      <div className="my-20">
        <div className="flex min-h-screen gap-6">
          {/* FIlter */}
          <div className="w-2/6">
            {/* Publisher */}
            <div>
              <h1>Publisher</h1>
              <div className="divider"></div>
              <ol>
                {publishers.map((publisher) => (
                  <li key={publisher._id}>
                    <button
                      onClick={() => {
                        setPublisherFilter(publisher.publisherName);
                      }}
                    >
                      {publisher.publisherName}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            {/* Tags */}
            <div className="my-5">
              <h1>Tags</h1>
              <div className="divider"></div>
              <ul>
                {tags.map((tag, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => {
                        setTagFilter(tag);
                      }}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <form className="my-12" onSubmit={handleSearch}>
              <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                <input
                  className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  name="search"
                  placeholder="Enter Title"
                />

                <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                  Search
                </button>
              </div>
            </form>
            <button onClick={handleReset}>Reset</button>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'">
              {filterArticles.map((article) => (
                <PublicArticleCard
                  user={user}
                  key={article._id}
                  article={article}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
      </div>
    </Container>
  );
}

export default PublicArticles;
