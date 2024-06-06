import React from "react";

function Button({ label, type, stripe }) {
  if (type && stripe) {
    return (
      <button
        disabled={!stripe}
        type={type}
        className="bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-stone-50 w-24  px-4 py-2 "
      >
        {label}
      </button>
    );
  }
  return (
    <button className="bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-stone-50 w-24  px-4 py-2 ">
      {label}
    </button>
  );
}

export default Button;
