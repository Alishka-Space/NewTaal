import React from "react";
import "./homeUser.css";

const HomeUser = () => {
  return (
    <div>
      <div className="user-homepage-search">
        {/* Greeting Section */}
        <header className="greeting">
          <h1>Hello , [User Name]</h1> {/* Dynamically insert user name */}
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
    </div>
  );
};

export default HomeUser;
