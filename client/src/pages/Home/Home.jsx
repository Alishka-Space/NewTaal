import React from "react";

import TEST_ID from "./Home.testid";

const Home = () => {
  const headerStyle = {
    background: "aqua",
  };
  return (
    <div data-testid={TEST_ID.container}>
      <h1 style={headerStyle}>This is the homepage</h1>
      <p>Good luck with the project!</p>
    </div>
  );
};

export default Home;
