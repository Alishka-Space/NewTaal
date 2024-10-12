import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import HeroHeader from "./components/hero-header/HeroHeader";
import Features from "./components/features/Features";
import Steps from "./components/features-step/Steps";

const App = () => {
  return (
    <>
      <Nav />
      <HeroHeader />
      <Features />
      <Steps />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
      </Routes>
    </>
  );
};

export default App;
