import React from "react";
import { Link } from "react-router-dom";
import SubscriptionRow from "../../components/Table/SubscriptionRow";

function Subscription() {
  return (
    <section className="py-20 bg-stone-100 text-gray-800 mt-12">
      <section className="bg-stone-100 text-gray-800">
        <div className="container mx-auto p-6 overflow-x-auto">
          <table className="w-full">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead>
              <tr>
                <th></th>
                <th scope="col">
                  <h2 className="px-2 text-xs lg:text-lg font-medium">Free</h2>
                  <p className="mb-3">
                    <span className=" sm:text-xs md:text-2xl font-bold  dark:text-gray-900">
                      0$
                    </span>
                    <span className="font-medium dark:text-gray-600">/mo</span>
                  </p>
                </th>
                <th scope="col">
                  <h2 className="px-2 text-xs lg:text-lg font-medium">Premium Alpha</h2>
                  <p className="mb-3">
                    <span className="sm:text-xs md:text-2xl font-bold dark:text-gray-900">
                      15$
                    </span>
                    <span className="font-medium dark:text-gray-600">
                      /5-day
                    </span>
                  </p>
                </th>
                <th scope="col">
                  <h2 className="px-2 text-xs lg:text-lg font-medium">Premium Beta</h2>
                  <p className="mb-3">
                    <span className="sm:text-xs md:text-2xl font-bold dark:text-gray-900">
                      25$
                    </span>
                    <span className="font-medium dark:text-gray-600">
                      /10day
                    </span>
                  </p>
                </th>
              </tr>
            </thead>
            <tbody className="space-y-6 text-center divide-y dark:divide-gray-300">
              <SubscriptionRow
                rowTitle="Add Articles"
                free="1"
                premiumAlpha="10"
                premiumBeta="Unlimited"
              />
              <SubscriptionRow
                rowTitle="Explore Premium Articles"
                free="No"
                premiumAlpha="Yes"
                premiumBeta="Yes"
              />
              <SubscriptionRow
                rowTitle="Registration"
                free="Yes"
                premiumAlpha="Yes"
                premiumBeta="Yes"
              />
              <SubscriptionRow
                rowTitle="Can Become Admin"
                free="no"
                premiumAlpha="no"
                premiumBeta="Yes"
              />
            </tbody>
          </table>
        </div>
      </section>
      <div className="flex justify-center items-center">
      <Link className="border mt-6 border-black px-4 py-2 hover:bg-stone-800 hover:text-stone-200 transition-colors duration-150 " to="/payment"> Take Subscription</Link>

      </div>
    </section>
  );
}

export default Subscription;
