import React, { useContext, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./homeCoach.css";
import TraineeList from "../home-page-coach/TraineeList";
import Pagination from "../pagination/Pagination";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomeCoach = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const TRAINEE_PER_PAGE = 4;
  const [learners, setLearners] = useState([]); // all trainee data

  // Fetch Data from Backend
  const { isLoading, error, performFetch } = useFetch(
    "/learner",
    (response) => {
      setLearners(response.result);
    },
  );

  useEffect(() => {
    performFetch();
  }, []);

  const pages = Math.ceil(learners.length / TRAINEE_PER_PAGE);
  const startIndex = (currentPage - 1) * TRAINEE_PER_PAGE;
  const trainees = learners.slice(startIndex, startIndex + TRAINEE_PER_PAGE);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  const handleVisitProfile = () => {
    navigate(`/coachProfile/${authState.id}`);
  };

  return (
    <div className="coach-home-page">
      <div className="coach-homepage-search">
        {/* Greeting Section */}
        <header className="greeting-coach">
          <h1>Hello, {authState.user}</h1>
        </header>

        {/* Primary Buttons */}
        <section className="button-group-coach">
          <button className="visit-profile-coach" onClick={handleVisitProfile}>
            Visit Profile
          </button>
        </section>
      </div>

      {/* Trainee List */}
      <TraineeList traineeList={trainees} />

      {/* Pagination */}
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default HomeCoach;
