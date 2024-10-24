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

  // Filter States
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  // Toggle state for showing filters
  const [showFilters, setShowFilters] = useState(false);

  // State to store the final filtered list after search
  const [learners, setLearners] = useState([]);
  const [filteredTrainees, setFilteredTrainees] = useState([]);
  const [learningPurposes, setLearningPurposes] = useState([]);
  const [proficiencyLevels, setProficiencyLevels] = useState([]);

  // Fetch Data from Backend
  const { isLoading, error, performFetch } = useFetch(
    "/learner",
    (response) => {
      const learnersData = response.result;
      setLearners(learnersData); // Store all learners
      setFilteredTrainees(learnersData); // Initially display all learners

      // Extract unique learning purposes and proficiency levels
      const uniqueLearningPurposes = [
        ...new Set(learnersData.map((learner) => learner.purpose)),
      ];
      const uniqueProficiencyLevels = [
        ...new Set(learnersData.map((learner) => learner.languageProficiency)),
      ];

      setLearningPurposes(uniqueLearningPurposes);
      setProficiencyLevels(uniqueProficiencyLevels);
    },
  );

  useEffect(() => {
    performFetch();
  }, []);

  // Pagination Logic
  const pages = Math.ceil(filteredTrainees.length / TRAINEE_PER_PAGE);
  const startIndex = (currentPage - 1) * TRAINEE_PER_PAGE;
  const finishIndex = currentPage * TRAINEE_PER_PAGE;
  const trainees = filteredTrainees.slice(startIndex, finishIndex);

  // Apply filter logic when the "Filter & Apply" button is clicked
  const handleFilterApply = () => {
    const filtered = learners.filter((trainee) => {
      const matchPurpose =
        selectedPurpose === "" || trainee.purpose === selectedPurpose;
      const matchProficiency =
        selectedLevel === "" || trainee.languageProficiency === selectedLevel;

      return matchPurpose && matchProficiency;
    });

    if (filtered.length === 0) {
      alert("No trainees matched your filter criteria.");
    }

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
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="search-filter-coach"
              >
                <option value="">Learning Purposes</option>
                {learningPurposes.map((purpose, index) => (
                  <option key={index} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="search-filter-coach"
              >
                <option value="">Select Level</option>
                {proficiencyLevels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
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
