import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

function TrendingArticleCarousel({ articleViewCount }) {
  return (
    <section>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper h-[450px]"
      >
        {articleViewCount.map((article) => (
          <SwiperSlide key={article._id}> <img className="w-full h-full" src={article.imageURL} alt="" /></SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default TrendingArticleCarousel;
