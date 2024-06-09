import React from "react";
import {
  FaChevronRight,
  FaNotEqual,
  FaRightFromBracket,
} from "react-icons/fa6";
import PlanList from "./PlanList";
import { RxCross1 } from "react-icons/rx";

function PremiumAlphaPlanList() {
  return (
    <div className="p-6 sm:px-8">
      <p className="text-lg font-medium sm:text-xl">What's included:</p>

      <ul className="mt-2 space-y-2 sm:mt-4">
        <PlanList text="Explore normal articles" icon={FaChevronRight} />
        <PlanList text="Add 10 Articles" icon={FaChevronRight} />
        <PlanList text="Register" icon={FaChevronRight} />
        <PlanList text="Explore premium articles" icon={FaChevronRight} />
        <PlanList text="Add Unlimited Articles" icon={RxCross1} />
      </ul>
    </div>
  );
}

export default PremiumAlphaPlanList;
