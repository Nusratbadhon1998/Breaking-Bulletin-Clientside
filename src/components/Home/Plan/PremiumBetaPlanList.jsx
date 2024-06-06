import React from 'react'
import { FaNotEqual, FaRightFromBracket } from "react-icons/fa6";
import PlanList from './PlanList';

function PremiumBetaPlanList() {
    return (
        <div className="p-6 sm:px-8">
          <p className="text-lg font-medium text-gray-900 sm:text-xl">
            What's included:
          </p>
    
          <ul className="mt-2 space-y-2 sm:mt-4">
            <PlanList text="Explore normal articles" icon={FaRightFromBracket} />
            <PlanList text="Add One Article" icon={FaRightFromBracket} />
            <PlanList text="Add Unlimited Articles" icon={FaRightFromBracket} />
            <PlanList text="Register" icon={FaRightFromBracket} />
            <PlanList text="Explore premium articles" icon={FaRightFromBracket} />
            <PlanList text="Add Unlimited Articles" icon={FaRightFromBracket} />
          </ul>
        </div>
      );
}

export default PremiumBetaPlanList