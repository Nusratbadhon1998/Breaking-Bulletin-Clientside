import React from "react";
import RecentNews from "../../../pages/Home/RecentNews/RecentNews";
import NoData from "../../Shared/NoData";

function CategoryGrid({ articles }) {
    if (articles.length<=0) return <NoData title="No Data available"/>
  return (
    <div 
     data-aos="flip-left"
    data-aos-delay="0"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 p-10 space-y-5">
      {articles.map((article) => (
        <RecentNews tab="yes" key={article._id} article={article} />
      ))}
    </div>
  );
}

export default CategoryGrid;
