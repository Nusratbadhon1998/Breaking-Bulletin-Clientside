import React from "react";

function Header({title}) {
  return (
    <div className="bg-stone-800 h-24 text-stone-200 flex justify-center items-center my-12">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center"> {title}</h1>
    </div>
  );
}

export default Header;
