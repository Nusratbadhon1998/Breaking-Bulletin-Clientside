import React from "react";
import Button from "../../../components/Shared/Button/Button";

function Newsletter() {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="0"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      className="relative my-20 "
    >
      <img
        className="absolute opacity-50 z-0 inset-0 h-full w-full bg-right-bottom bg-cover"
        src="https://static6.depositphotos.com/1000978/557/i/450/depositphotos_5579067-stock-photo-ancient-newspapers.jpg"
        alt=""
      />
      <div
        className="max-w-6xl relative z-10 mx-auto flex flex-col justify-center items-center bg-[#2b2739] bg-opacity-70 p-3 lg:p-40  rounded-2xl space-y-5"
       
      >
        <h1 className="text-4xl font-bold text-stone-100 text-center">
          Trusted By People Around the world
        </h1>
        <p className="text-center text-stone-300 mb-20">
          We take pride in being trusted by people from every corner of the
          globe. With a commitment to excellence and unwavering dedication to
          customer satisfaction, we have earned the trust and loyalty of
          travelers, adventurers, and explorers worldwide.
        </p>
        <div className="flex flex-col lg:flex-row gap-4">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow border-none"
              placeholder="Email"
            />
          </label>
          <Button label={"Subscribe"} />
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
