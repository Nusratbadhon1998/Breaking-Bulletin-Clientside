import React from "react";
import noData from "../../assets/noData.gif";

function NoData({title}) {
  return (
    <div class="grid h-screen place-content-center bg-white px-4">
      <div class="text-center flex flex-col justify-center items-center">
        <img className="size-40" src={noData} alt="" />

        <h1 class="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Oh-oh!
        </h1>

        <p class="mt-4 text-gray-500">{title}</p>
      </div>
    </div>
  );
}

export default NoData;
