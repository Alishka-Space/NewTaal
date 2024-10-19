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
import HomeCoach from "./components/home-page-coach/HomeCoach";
import PrivateRoute from "./components/PrivateRoute";
import CoachProfile from "./pages/profilePages/CoachProfilePage";
import LearnerProfile from "./pages/profilePages/LearnerProfilePage";
import About from "./pages/About/About";

const App = () => {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/userhome" element={<HomeUser />} />
          <Route path="/coachhome" element={<HomeCoach />} />
          <Route path="/coachProfile/:id" element={<CoachProfile />} />
          <Route path="/learnerProfile/:id" element={<LearnerProfile />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
};

export default App;
