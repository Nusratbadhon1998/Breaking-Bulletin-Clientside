import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa6";

function ArticleDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const handleViewCount = async (id) => {
    const { data } = await axiosSecure.patch(`/article/${id}`);
  };
  useEffect(() => {
    handleViewCount(id);
  }, []);

  const { data: articleData = {}, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/article/${id}`);
      return data;
    },
  });

  const {
    imageURL,
    title,
    publisher,
    authorImage,
    authorName,
    authorEmail,
    tag,
    postedDate,
    description,
    viewCount,
  } = articleData;
  return (
    <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-100 dark:text-gray-800">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
        <img
          src={imageURL}
          alt=""
          className="w-full h-60 sm:h-96 dark:bg-gray-500"
        />
        <div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
          <article className="space-y-8 dark:bg-gray-100 dark:text-gray-900">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
                {title}
              </h1>
              <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-600">
                <div className="flex items-center md:space-x-2">
                  <img
                    src={authorImage}
                    alt=""
                    className="size-12 border rounded-full dark:bg-gray-500 dark:border-gray-300"
                  />
                  <p className="text-sm">
                    {authorName} • {new Date(postedDate).toLocaleDateString()}
                  </p>
                </div>
                <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                  {viewCount && <p className="flex items-center gap-2"> <FaUser/>{`Viewed By ${viewCount} people`}</p>}
                </p>
              </div>
            </div>
            <div className="dark:text-gray-800">
              <p>{description}</p>
            </div>
          </article>
          <div>
            <div className="flex flex-wrap py-6 gap-2 border-t border-dashed dark:border-gray-600">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-3 py-1 bg-yellow-100 text-yellow-500"
              >
                #{publisher}
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-3 py-1  bg-stone-800 text-stone-200"
              >
                #{tag}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;
