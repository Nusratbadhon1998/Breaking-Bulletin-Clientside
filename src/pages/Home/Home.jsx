import React, { useEffect, useState } from "react";
import UserStatistics from "./UsersStatistics/UserStatistics";
import TrendingArticle from "./TrendingArticle/TrendingArticle";
import Container from "../../components/Shared/Container";
import HomePageModal from "../../components/Modal/HomePageModal";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <Container>
      <TrendingArticle />
      <UserStatistics />
      <HomePageModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
}

export default Home;
