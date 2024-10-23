import React, { useContext, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./homeCoach.css";
import { traineeList } from "../../data";
import TraineeList from "../home-page-coach/TraineeList";
import Pagination from "../pagination/Pagination";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomeCoach = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const TRAINEE_PER_PAGE = 4;

  // Filter States
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  // Toggle state for showing filters
  const [showFilters, setShowFilters] = useState(false);

  // State to store the final filtered list after search
  const [filteredTrainees, setFilteredTrainees] = useState([]);

  // Fetch Data from Backend
  const { isLoading, error, performFetch } = useFetch(
    "/learner",
    (response) => {
      setFilteredTrainees(response.result);
    },
  );

  useEffect(() => {
    performFetch();
  }, []);

  // Pagination Logic
  const pages = Math.ceil(traineeList.length / TRAINEE_PER_PAGE);
  const startIndex = (currentPage - 1) * TRAINEE_PER_PAGE;
  const finishIndex = currentPage * TRAINEE_PER_PAGE;

  const trainees = filteredTrainees.slice(startIndex, finishIndex);

  // Apply filter logic when the "Filter & Apply" button is clicked
  const handleFilterApply = () => {
    const filtered = filteredTrainees.filter((trainee) => {
      const matchLearningPurposes =
        selectedPurpose === "" || trainee.learningPurposes === selectedPurpose;
      const matchProficiency =
        selectedLevel === "" || trainee.proficiency === selectedLevel;

      return matchLearningPurposes && matchProficiency;
    });
    setFilteredTrainees(filtered);
    setShowFilters(false); // Hide filters after applying
  };

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
          <h1>Hello, {authState.user}</h1> {/* Dynamically insert user name */}
        </header>

        {/* Search and Filter Section */}
        <section className="search-section-coach">
          {/* Primary Buttons */}
          <div className="button-group-coach">
            <button
              className="visit-profile-coach"
              onClick={handleVisitProfile}
            >
              Visit Profile
            </button>
          </div>

          {/* Filter Button */}
          <div className="filter-search-group-coach">
            <button
              className="search-filter-coach"
              onClick={() => setShowFilters(true)}
            >
              Search for Trainee
            </button>
          </div>

          {/* Conditionally Render Filters */}
          {showFilters && (
            <div className="filters-container">
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.learningPurposes)}
                className="search-filter-coach"
              >
                <option value="">learning Purposes</option>
                <option value="Fun">Fun</option>
                <option value="Culture">Culture</option>
                <option value="Work">Work</option>
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.proficiency)}
                className="search-filter-coach"
              >
                <option value="">Select Level</option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                className="hide-filter-button"
                onClick={handleFilterApply}
              >
                Filter & Apply
              </button>
            </div>
          )}
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
