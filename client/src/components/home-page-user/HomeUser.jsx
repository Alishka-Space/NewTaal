import React, { useState } from "react";
import "./homeUser.css";
import CoachList from "./CoachList";
import Pagination from "../pagination/Pagination";
import { coachList } from "../../data";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SortInput from "../sort-input/SortInput";

const HomeUser = () => {
  const { authState } = React.useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const COACH_PER_PAGE = 4;

  const pages = Math.ceil(coachList.length / COACH_PER_PAGE);
  const startIndex = (currentPage - 1) * COACH_PER_PAGE;
  const finishIndex = currentPage * COACH_PER_PAGE;

  const navigate = useNavigate();

  const coaches = coachList.slice(startIndex, finishIndex);

  const handleVisitProfile = () => {
    navigate(`/learnerProfile/${authState.id}`);
  };
  return (
    <div>
      <div className="user-homepage-search">
        {/* Greeting Section */}
        <header className="greeting">
          <h1>Hello, {authState.user}</h1> {/* Dynamically insert user name */}
        </header>

        {/* Search and Filter Section */}
        <section className="search-section">
          {/* Primary Buttons */}
          <div className="button-group">
            <button className="visit-profile" onClick={handleVisitProfile}>
              Visit Profile
            </button>
          </div>
        </section>
      </div>
      <SortInput coachesLength={coaches.length} />
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
