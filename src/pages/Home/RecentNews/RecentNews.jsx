import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { GiArrowCursor } from "react-icons/gi";
import { Link } from "react-router-dom";

function RecentNews({ article, tab }) {
  return (
    <div
    
      className={` ${
        tab === "yes" ? "w-2/3" : "w-full"
      } border px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800`}
    >
      <div
        className={`flex ${
          tab ? "flex-col" : "flex-row"
        } items-center justify-between space-y-5`}
      >
        {tab && <img className="aspect-[3/2] grayscale transition-all delay-75 hover:cursor-auto duration-150 hover:grayscale-0" src={article.imageURL} alt="" />}
        <span className={`text-sm ${tab? "font-medium":"font-light"} flex-grow flex-1 text-stone-800 dark:text-gray-400`}>
          {article.title}
        </span>
        <span className="flex-1 px-3 py-1 text-xs text-stone-200  bg-stone-800 ">
          {article.tag}
        </span>
      </div>

      <div className="flex justify-between items-center mt-3">
        {" "}
        <p>{new Date(article.postedDate).toLocaleDateString()}</p>
        <Link to={`/article/${article._id}`}>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default RecentNews;
