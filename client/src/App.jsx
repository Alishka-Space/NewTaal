import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import Footer from "../src/components/footer/Footer";
import SignIn from "./pages/SignInPage/SignIn";
import SignUp from "./pages/SignUpPage/SignUp";
import HomeUser from "./components/home-page-user/HomeUser";
import CoachList from "./components/home-page-user/CoachList";
import { coachList } from "./data";
import Pagination from "./components/pagination/Pagination";
import { useState } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const COACH_PER_PAGE = 4;

  const pages = Math.ceil(coachList.length / COACH_PER_PAGE);
  const startIndex = (currentPage - 1) * COACH_PER_PAGE;
  const finishIndex = currentPage * COACH_PER_PAGE;

  const coaches = coachList.slice(startIndex, finishIndex);

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <HomeUser />
      <CoachList coachList={coaches} />
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </>
  );
};

export default App;
