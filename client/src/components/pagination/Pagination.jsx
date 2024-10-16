import React from "react";
import "./pagination.css";
import PropTypes from "prop-types";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatePages = [];
  for (let i = 1; i <= pages; i++) {
    generatePages.push(i);
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="page previous"
      >
        Previous
      </button>
      {generatePages.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          key={page}
          className={currentPage === page ? "page active" : "page"}
        >
          {page}
        </div>
      ))}
      <button
        disabled={currentPage === pages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="page next"
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
