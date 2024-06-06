import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";

function TrendingArticle({ trendingArticles }) {
  return (
    <section className="flex">
      <div className="flex-1 flex flex-col  justify-center text-left space-y-2">
        <h1 className="text-stone-800 font-bold text-left my-8 text-4xl">
          <Typewriter
            cursor
            cursorBlinking
            delaySpeed={1000}
            deleteSpeed={25}
            loop={1}
            typeSpeed={70}
            words={["Stay Updated with the Latest Trends!!"]}
          />
        </h1>
        <p className="w-10/12">
          Explore our collection of trending articles and stay ahead with the
          most recent developments in technology, science, and economics.
          Discover insights that matter, from groundbreaking research to
          innovative breakthroughs
        </p>
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper w-2/5"
      >
        {trendingArticles.map((article) => (
          <SwiperSlide key={article._id}>
            <img className="w-full h-full" src={article.imageURL} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default TrendingArticle;
