import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { Link } from "react-router-dom";

function International() {
  const axiosCommon = useAxiosCommon();
  const { data: recentArticles = [], isLoading } = useQuery({
    queryKey: ["recent-articles"],
    queryFn: async () => {
      const { data } = axiosCommon.get("/recent-articles");
      return data;
    },
  });
  const international =
    recentArticles.filter((article) => article.tag === "International") || [];
  return (
    <div>
      <h1 className="text-2xl font-bold">International</h1>
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
         {international.length>0 &&  <Link
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            to={`/article/${international[0]._id}`}
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50"
          >
            <img
              src={international[0].imageURL}
              alt=""
              className="object-cover w-full h-60 aspect-[3/2] grayscale transition-all delay-75 hover:cursor-auto duration-150 hover:grayscale-0 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 space-y-2 lg:col-span-5 flex flex-col justify-center">
              <h3 className="text-xl lg:text-2xl font-semibold group-hover:underline group-focus:underline">
                {international[0].title}
              </h3>
              <span className="text-xs dark:text-gray-600">
                {new Date(international[0].postedDate).toLocaleDateString()}
              </span>
              <p>{international[0].tag}</p>
            </div>
          </Link>}
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {international.slice(1, 4).map((article) => (
              <Link
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="70"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                to={`/article/${article._id}`}
                key={article._id}
                className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50"
              >
                <img
                  role="presentation"
                  className="object-cover w-full aspect-[3/2] grayscale transition-all delay-75 hover:cursor-auto duration-150 hover:grayscale-0 rounded h-44 dark:bg-gray-500"
                  src={article.imageURL}
                />
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                    {article.title}
                  </h3>
                  <span className="text-xs dark:text-gray-600">
                    {new Date(article.postedDate).toLocaleDateString()}
                  </span>
                  <p>{article.tag}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              to="/all-articles"
              type="button"
              className="px-6 py-3 border border-black text-sm  hover:bg-stone-800 hover:text-stone-200 transition-colors duration-200 "
            >
              Explore More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default International;
