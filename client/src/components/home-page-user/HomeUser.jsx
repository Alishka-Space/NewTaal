import React, { useState, useEffect } from "react";
import "./homeUser.css";
import CoachList from "./CoachList";
import Pagination from "../pagination/Pagination";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SortInput from "../sort-input/SortInput";
import useFetch from "../../hooks/useFetch";

const HomeUser = () => {
  const { authState } = React.useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortItem, setSortItem] = useState("recommended");
  const [coaches, setCoaches] = useState([]);

  const COACHES_PER_PAGE = 6;

  const { performFetch } = useFetch("/coach", (response) => {
    setCoaches(response.result);
  });

  useEffect(() => {
    performFetch();
  }, []);

  const sortedCoaches = [...coaches].sort((a, b) => {
    if (sortItem === "low") return a.rate - b.rate;
    if (sortItem === "high") return b.rate - a.rate;
    return b.rating - a.rating;
  });

  const pages = Math.ceil(sortedCoaches.length / COACHES_PER_PAGE);
  const startIndex = (currentPage - 1) * COACHES_PER_PAGE;
  const orderedCoachList = sortedCoaches.slice(
    startIndex,
    startIndex + COACHES_PER_PAGE,
  );

  const navigate = useNavigate();

  const handleVisitProfile = () => {
    navigate(`/learnerProfile/${authState.id}`);
  };

  return (
    <div
      className="coach-home-page"
      style={{
        backgroundColor: "#e6e6fa",
        position: "relative",
        paddingBottom: "100px",
      }}
    >
      <div>
        <div className="user-homepage-search">
          <header className="greeting">
            <h1>Hello, {authState.user}</h1>
          </header>
          <section className="search-section">
            <div className="button-group">
              <button className="visit-profile" onClick={handleVisitProfile}>
                Visit Profile
              </button>
            </div>
          </section>
        </div>
        <SortInput
          setSortItem={setSortItem}
          sortItem={sortItem}
          coachesLength={coaches.length}
        />
        <CoachList coachList={orderedCoachList} />
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default HomeUser;
