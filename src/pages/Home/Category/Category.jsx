import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import RecentNews from "../RecentNews/RecentNews";
import CategoryGrid from "../../../components/Home/Category/CategoryGrid";

function Category({ trendingArticles }) {
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
  const technologies = trendingArticles.filter(
    (article) => article.tag === "Technology"
  );
  const environments = trendingArticles.filter(
    (article) => article.tag === "Environment"
  );
  const hcares = trendingArticles.filter(
    (article) => article.tag === "Healthcare"
  );
  const cyber = trendingArticles.filter(
    (article) => article.tag === "Cyber-security"
  );
  const finances = trendingArticles.filter(
    (article) => article.tag === "Finance"
  );
  const societies = trendingArticles.filter(
    (article) => article.tag === "Society"
  );
  const gmarkets = trendingArticles.filter(
    (article) => article.tag === "Global-market"
  );
  const sports = trendingArticles.filter((article) => article.tag === "Sports");

  return (
    <Tabs className="my-12 ">
      <TabList className="flex justify-center items-center">
        {tags.map((tag, idx) => (
          <Tab key={idx} className={tabClass}>
            {tag}
          </Tab>
        ))}
      </TabList>
      <TabPanel>
        <CategoryGrid articles={technologies} />
      </TabPanel>
      <TabPanel>
        <CategoryGrid articles={environments} />
      </TabPanel>
      <TabPanel>
        <CategoryGrid articles={hcares} />
      </TabPanel>
      <TabPanel>
        <CategoryGrid articles={cyber} />
      </TabPanel>
      <TabPanel>
        <CategoryGrid articles={finances} />
      </TabPanel>
      <TabPanel>
        <CategoryGrid articles={societies} />
      </TabPanel>
      <TabPanel>
        <CategoryGrid articles={gmarkets} />
      </TabPanel>
      <TabPanel>
        <CategoryGrid articles={sports} />
      </TabPanel>
    </Tabs>
  );
}

export default Category;
