import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Header({title}) {
  return (
    <div className="bg-stone-800 h-24 text-stone-200 flex justify-center items-center my-12">
      <h1 className=" text-sm lg:text-xl md:text-2xl lg:text-3xl font-bold text-center"> 
        <Typewriter
          cursor
          cursorBlinking
          delaySpeed={1000}
          deleteSpeed={25}
          loop={1}
          typeSpeed={70}
          words={[
            `${title}`,
          ]}
        />
      </h1>
    </div>
  );
}

export default Header;
