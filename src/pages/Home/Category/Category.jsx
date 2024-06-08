import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function Category() {
  const tabClass =
    "inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-stone-700 bg-transparent border-b-2 border-stone-200 sm:px-4 -px-1  whitespace-nowrap focus:outline-none cursor-pointer";
  const tags = [
    "Technology",
    "Environment",
    "Healthcare",
    "Cyber-security",
    "Finance",
    "Society",
    "Global-market",
    "Sports",
  ];

  return (
    <Tabs className="my-12">
      <TabList className="flex justify-center items-center">
       
        {tags.map((tag, idx) => (
          <Tab key={idx} className={tabClass}>{tag}</Tab>
        ))}
      </TabList>

      <TabPanel>
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
  );
}

export default Category;
