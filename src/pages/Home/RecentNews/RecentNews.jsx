import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { GiArrowCursor } from "react-icons/gi";
import { Link } from "react-router-dom";

function RecentNews({ article }) {
  return (
    <div className="w-full border px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-800 dark:text-gray-400">
          {article.title}
        </span>
        <span className="px-3 py-1 text-xs text-stone-200  bg-stone-800 ">
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
