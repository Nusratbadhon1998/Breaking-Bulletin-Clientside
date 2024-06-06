import React from "react";

function PlanList({ icon: Icon, text }) {
  return (
    <li className="flex items-center gap-1">
      <Icon />
      <span className="text-gray-700"> {text} </span>
    </li>
  );
}

export default PlanList;
