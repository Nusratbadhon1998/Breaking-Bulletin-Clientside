import React from "react";
import PlanList from "./PlanList";
import { RxCross1 } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa";

function FreePlanList() {
  return (
    <div className="p-6 sm:px-8">
      <p className="text-lg font-medium text-gray-900 sm:text-xl">
        What's included:
      </p>

      <ul className="mt-2 space-y-2 sm:mt-4">
        <PlanList text="Access to normal articles" icon={FaChevronRight} />
        <PlanList text="Add One Article" icon={FaChevronRight} />
        <PlanList text="Register" icon={FaChevronRight} />
        <PlanList text="Explore premium articles" icon={RxCross1} />
        <PlanList text="Add Unlimited Articles" icon={RxCross1} />
      </ul>
    </div>
  );
}

export default FreePlanList;
