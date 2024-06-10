import React from "react";
import FreePlanList from "../../../components/Home/Plan/FreePlanList";
import PlanHeader from "../../../components/Home/Plan/PlanHeader";
import PremiumAlphaPlanList from "../../../components/Home/Plan/PremiumAlphaPlanList";
import PremiumBetaPlanList from "../../../components/Home/Plan/PremiumBetaPlanList";

function Plan() {
  return (
    <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="max-w-2xl mx-auto mb-16 text-center space-y-4">
        <h2 className="text-2xl font-bold lg:text-3xl uppercase">
          Choose a right{" "}
          <span className="bg-gradient-to-r from-black via-stone-700 to-stone-400 inline-block text-transparent  bg-clip-text">
            Plan
          </span>{" "}
          for you
        </h2>
        <p className="font-light text-sm">
          Select the perfect plan that suits your needs. Whether you're just
          starting out, seeking more features, or looking for the ultimate
          experience.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8 ">
        <div
          className="divide-y divide-gray-2=300  border border-black shadow-sm"
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        >
          <PlanHeader
            type="Free"
            para="Get started with  Free Plan and explore the basics without  cost. "
            cost="Free"
          />
          <FreePlanList />
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="60"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          className="divide-y relative lg:top-12 divide-gray-300  border bg-stone-800 text-stone-200  shadow-sm"
        >
          <PlanHeader
            type="Premium Alpha"
            para="Upgrade to the Alpha Plan and enhance your experience. "
            cost="$15"
          />
          <PremiumAlphaPlanList />
        </div>

        <div
          data-aos="fade-left"
          data-aos-delay="70"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          className="divide-y divide-gray-300  border border-black shadow-sm"
        >
          <PlanHeader
            type="Premium Beta"
            para="For those who want it all, the Beta Plan offers complete access."
            cost="$25"
          />

          <PremiumBetaPlanList />
        </div>
      </div>
    </div>
  );
}

export default Plan;
