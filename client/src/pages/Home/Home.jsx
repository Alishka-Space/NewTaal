import React from "react";
import Banner from "../../components/banner/Banner";
import Features from "../../components/features/Features";
import HeroHeader from "../../components/hero-header/HeroHeader";
import Steps from "../../components/features-step/Steps";

import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <HeroHeader />
      <Features />
      <Banner />
      <Steps />
    </div>
  );
};

export default Home;
