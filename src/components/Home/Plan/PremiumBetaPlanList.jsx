import React from 'react'
import { FaChevronRight, FaNotEqual, FaRightFromBracket } from "react-icons/fa6";
import PlanList from './PlanList';
import { RxCross1 } from 'react-icons/rx';

function PremiumBetaPlanList() {
    return (
        <div className="p-6 sm:px-8">
          <p className="text-lg font-medium text-gray-900 sm:text-xl">
            What's included:
          </p>
    
          <ul className="mt-2 space-y-2 sm:mt-4">
            <PlanList text="Access to normal articles" icon={FaChevronRight} />
            <PlanList text="Add Unlimited Articles" icon={FaChevronRight} />
            <PlanList text="Register" icon={FaChevronRight} />
            <PlanList text="Explore premium articles" icon={FaChevronRight} />
           
          </ul>
        </div>
      );
}

export default PremiumBetaPlanList