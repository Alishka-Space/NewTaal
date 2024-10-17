import React from "react";
import "./homeCoach.css";
import { traineeList } from "../../data";
import TraineeList from "../home-page-coach/TraineeList";
import { useState } from "react";
import Pagination from "../pagination/Pagination";

const HomeCoach = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const TRAINEE_PER_PAGE = 4;

  const pages = Math.ceil(traineeList.length / TRAINEE_PER_PAGE);
  const startIndex = (currentPage - 1) * TRAINEE_PER_PAGE;
  const finishIndex = currentPage * TRAINEE_PER_PAGE;

  const trainees = traineeList.slice(startIndex, finishIndex);

  return (
    <div className="coach-home-page">
      <div className="coach-homepage-search">
        {/* Greeting Section */}
        <header className="greeting-coach">
          <h1>Hello , [coach Name]</h1> {/* Dynamically insert user name */}
        </header>

        {/* Search and Filter Section */}
        <section className="search-section-coach">
          {/* Primary Buttons */}
          <div className="button-group-coach">
            <button className="find-button-coach">Find Coach</button>
            <button className="book-button-coach">Book a Session</button>
            <button className="visit-profile-coach">Visit Profile</button>
          </div>

          {/* Filter and Search Buttons */}
          <div className="filter-search-group-coach">
            <button className="search-filter-coach">Filter </button>
          </div>
        </section>
      </div>
      <TraineeList traineeList={trainees} />
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default HomeCoach;
