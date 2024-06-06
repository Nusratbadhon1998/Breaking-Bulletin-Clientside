import React from "react";
import FreePlanList from "../../../components/Home/Plan/FreePlanList";
import PlanHeader from "../../../components/Home/Plan/PlanHeader";
import PremiumAlphaPlanList from "../../../components/Home/Plan/PremiumAlphaPlanList";
import PremiumBetaPlanList from "../../../components/Home/Plan/PremiumBetaPlanList";

function Plan() {
  return (
    <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="max-w-2xl mx-auto mb-16 text-center">
        <span className="font-bold tracking-wider uppercase dark:text-violet-600">
          Pricing
        </span>
        <h2 className="text-4xl font-bold lg:text-5xl">
          Choose your best plan
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
          <PlanHeader type="Free" para="Explore Free..." cost="Free" />

          <FreePlanList />
        </div>

        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
          <PlanHeader type="Premium Alpha" para="Explore premiumhvxhvh..." cost="$15" />

          <PremiumAlphaPlanList />
        </div>

        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
          <PlanHeader type="Premium Beta" para="Explore premiumhvxhvh..." cost="$25"  />

          <PremiumBetaPlanList />
        </div>
      </div>
    </div>
  );
}

export default Plan;
