import React from "react";
import "./homeUser.css";
import CoachList from "./CoachList";
import Pagination from "../pagination/Pagination";
import { useState } from "react";
import { coachList } from "../../data";
import { AuthContext } from "../../context/AuthContext";

const HomeUser = () => {
  const { authState } = React.useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const COACH_PER_PAGE = 4;

  const pages = Math.ceil(coachList.length / COACH_PER_PAGE);
  const startIndex = (currentPage - 1) * COACH_PER_PAGE;
  const finishIndex = currentPage * COACH_PER_PAGE;

  const coaches = coachList.slice(startIndex, finishIndex);
  return (
    <div>
      <div className="user-homepage-search">
        {/* Greeting Section */}
        <header className="greeting">
          <h1>Hello , {authState.user}</h1> {/* Dynamically insert user name */}
        </header>

        {/* Search and Filter Section */}
        <section className="search-section">
          {/* Primary Buttons */}
          <div className="button-group">
            <button className="find-button">Find Coach</button>
            <button className="book-button">Book a Session</button>
            <button className="visit-profile">Visit Profile</button>
          </div>

          {/* Filter and Search Buttons */}
          <div className="filter-search-group">
            <button className="search-filter">Filter </button>
            <button className="search-coaches">Search for a Coach</button>
          </div>
        </section>
      </div>

      <CoachList coachList={coaches} />
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default HomeUser;
