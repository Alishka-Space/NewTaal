import React from "react";
import "./coachList.css";
import Rating from "../home-page-user/Rating";
import PropTypes from "prop-types";

const CoachList = ({ coachList }) => {
  return (
    <div className="coaches-list">
      {coachList.map((coach) => (
        <div className="coach-item" key={coach.id}>
          <img
            src={coach.image}
            alt={coach.coachName}
            className="coach-item-img"
          />
          <span className="coach-item-label">Coach</span>
          <div className="coach-item-body">
            <div className="coach-item-name">
              {" "}
              <b> Name :</b> <span>{coach.coachName}</span>{" "}
            </div>
            <div className="coach-item-bio">
              <b>Bio :</b>
              <span>{coach.bio}</span>{" "}
            </div>
            <Rating rating={coach.rating} />
            <div className="coach-item-availability">
              <b>Availability :</b>
              <span>{coach.availability}</span>{" "}
            </div>
            <div className="coach-item-languages">
              <b>Languages :</b> <span>{coach.language}</span>{" "}
            </div>
            <div className="coach-item-price">
              <strong>From ${coach.rate}</strong> per class
            </div>
            <div className="coach-item-links">
              <button className="coach-item-link">Book a Session</button>
              <button className="coach-item-link">Send a Message</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

CoachList.propTypes = {
  coachList: PropTypes.array.isRequired,
};

export default CoachList;
