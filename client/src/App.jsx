import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import Footer from "../src/components/footer/Footer";
import SignIn from "./pages/SignInPage/SignIn";
import SignUp from "./pages/SignUpPage/SignUp";
import HomeUser from "./components/home-page-user/HomeUser";
import HomeCoach from "./components/home-page-coach/HomeCoach";
import PrivateRoute from "./components/PrivateRoute";
import CoachProfile from "./pages/profilePages/CoachProfilePage";
import LearnerProfile from "./pages/profilePages/LearnerProfilePage";
import About from "./pages/About/About";
import SessionPage from "./pages/Session/SessionPage";
import BookASession from "./pages/BookaSession/BookASession";
import EditASession from "./pages/BookaSession/EditASession";

const App = () => {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/userhome" element={<HomeUser />} />
          <Route path="/coachhome" element={<HomeCoach />} />
          <Route path="/coachProfile/:id" element={<CoachProfile />} />
          <Route path="/learnerProfile/:id" element={<LearnerProfile />} />
          <Route path="/session/:id" element={<SessionPage />} />
          <Route path="/bookasession" element={<BookASession />} />
          <Route path="/editasession" element={<EditASession />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
};

export default App;
