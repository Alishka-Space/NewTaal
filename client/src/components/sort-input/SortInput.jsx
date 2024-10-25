import React from "react";
import "./sort-input.css";
import PropTypes from "prop-types";

const SortInput = ({ coachesLength }) => {
  return (
    <div className="sort-input-container">
      <div className="available-profiles">
        {coachesLength} Profiles Available <i className="bi bi-info-circle"></i>
      </div>
      <select>
        <option value="recommended">Recommended</option>
        <option value="low">Price - Low to High</option>
        <option value="high">Price - High to Low</option>
      </select>
    </div>
  );
};

SortInput.propTypes = {
  coachesLength: PropTypes.number.isRequired,
};

export default SortInput;
