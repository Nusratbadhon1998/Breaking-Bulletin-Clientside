import React from "react";
import { Link } from "react-router-dom";

function PlanHeader({ type, para, cost }) {
  return (
    <div className="p-6 sm:px-8">
      <h2 className="text-lg font-bold ">
        {type}
        <span className="sr-only">Plan</span>
      </h2>

      <p className="mt-2  font-light">{para} </p>

      <p className="mt-2 sm:mt-4">
        <strong className="text-3xl font-bold sm:text-4xl">
          {cost}
        </strong>
      </p>

      <Link to="/subscription">Get Started</Link>
    </div>
  );
}

export default PlanHeader;
