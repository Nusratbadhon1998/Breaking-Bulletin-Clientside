import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function TrendingArticle({ trendingArticles }) {
  return (
    <section className="">
      {/* <div className="flex-1 flex flex-col  justify-center text-left space-y-2">
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
      </div> */}
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
        className="mySwiper"
      >
        {trendingArticles.slice(0, 6).map((article) => (
          <SwiperSlide key={article._id}>
            <div className=" border h-full p-5">
              <figure>
                <img
                  className="aspect-[3/2] border  p-2 grayscale transition-all delay-75 hover:cursor-auto duration-150 hover:grayscale-0"
                  src={article.imageURL}
                  alt={article.title}
                />
              </figure>
              <div className="card-body">
                <h2 className=" text-center text-xl font-bold">
                  {article.title}!
                </h2>
                <div className="card-actions justify-end mt-5">
                  <Link to={`/article/${article._id}`}>
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default TrendingArticle;
