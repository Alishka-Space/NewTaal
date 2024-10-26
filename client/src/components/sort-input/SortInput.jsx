import React from "react";
import "./sort-input.css";
import PropTypes from "prop-types";

const SortInput = ({ coachesLength, setSortItem, sortItem }) => {
  return (
    <div className="sort-input-container">
      <div className="available-profiles">
        {coachesLength} Profiles Available <i className="bi bi-info-circle"></i>
      </div>
      <select onChange={(e) => setSortItem(e.target.value)} value={sortItem}>
        <option value="recommended">Recommended</option>
        <option value="low">Price - Low to High</option>
        <option value="high">Price - High to Low</option>
      </select>
    </div>
  );
};

SortInput.propTypes = {
  coachesLength: PropTypes.number.isRequired,
  setSortItem: PropTypes.func.isRequired,
  sortItem: PropTypes.string.isRequired,
};

export default SortInput;
