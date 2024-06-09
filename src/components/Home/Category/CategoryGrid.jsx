import React from "react";
import RecentNews from "../../../pages/Home/RecentNews/RecentNews";
import NoData from "../../Shared/NoData";

function CategoryGrid({ articles }) {
    if (articles.length<=0) return <NoData title="No Data available"/>
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 p-10">
      {articles.map((article) => (
        <RecentNews tab="yes" key={article._id} article={article} />
      ))}
    </div>
  );
}

export default CategoryGrid;
