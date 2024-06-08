import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import PublicArticleCard from "../../components/Card/PublicArticleCard";
import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";
import { IoNewspaperOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";

import Header from "../../components/Shared/Header";
import NoData from "../../components/Shared/NoData";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

function PublicArticles() {
  const { user: loggedUser = {}, loading } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [publisherFilter, setPublisherFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const tags = [
    "Technology",
    "Environment",
    "Healthcare",
    "Cyber-security",
    "Finance",
    "Society",
    "Global-market",
    "Sports",
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

  return (
    <Container>
      <div className="my-20">
        <Header title="Explore Articles" />
        <div className="flex min-h-screen gap-6">
          {/* FIlter */}
          <div className="w-2/6">
            {/* Publisher */}
            <div>
              <h1 className="text-xl font-bold flex items-center gap-3">
                {" "}
                <IoNewspaperOutline />
                Publisher
              </h1>
              <div className="divider"></div>
              <ol className="space-y-3  text-stone-600">
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
            <div className="divider"></div>
            {/* Tags */}
            <div className="my-5">
              <h1 className="text-xl font-bold">Tags</h1>
              <div className="divider"></div>
              <ul className="space-y-3 text-stone-600">
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
              <div className="divider"></div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="flex justify-between h-20 items-center">
              <button
                onClick={() => setSort(true)}
                className="border px-4 py-2 border-b-stone-700 hover:bg-stone-900 hover:text-stone-200 transition-colors ease-in duration-150"
              >
                Sort By Popularity
              </button>
              <form className="my-12" onSubmit={handleSearch}>
                <input
                  className="px-4 border border-b-stone-800 py-2 text-stone-700 placeholder-stone-500 bg-white outline-none focus:placeholder-transparent"
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  name="search"
                  placeholder="Enter Title"
                />
                <button className="px-1 md:px-4 lg:px-4 py-2 text-sm font-medium  text-gray-100 uppercase transition-colors duration-300 transform bg-stone-800  hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                  Search
                </button>
              </form>
              <button
                className="bg-stone-800 px-4 py-2 flex gap-2 items-center text-stone-200 *:text-stone-200"
                onClick={handleReset}
              >
                <GrPowerReset /> Reset
              </button>
            </div>
            {isLoading && <LoadingSpinner />}
            {articles.length <= 0 ? (
              <div className="mx-auto">
                <NoData title="Data is not available" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'">
                {articles.map((article) => (
                  <PublicArticleCard
                    user={user}
                    key={article._id}
                    article={article}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
      </div>
    </Container>
  );
}

export default PublicArticles;
