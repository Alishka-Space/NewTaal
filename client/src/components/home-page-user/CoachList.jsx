import React from "react";
import "./coachList.css";
import Rating from "../home-page-user/Rating";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CoachList = ({ coachList }) => {
  const navigate = useNavigate();

  const handleBookASession = (coach) => {
    navigate("/bookasession", { state: { coach } });
  };

  if (!coachList.length) {
    return <div>No coaches found</div>;
  }

  return (
    <div className="coaches-list">
      {coachList.map((coach, id) => (
        <div className="coach-item" key={id}>
          <img
            src={coach.image}
            alt={coach.username}
            className="coach-item-img"
          />
          <span className="coach-item-label">Coach</span>
          <div className="coach-item-body">
            <div className="coach-item-name">
              <b> Name :</b> <span>{coach.username}</span>
            </div>
            <div className="coach-item-bio">
              <b>Bio :</b>
              <span>{coach.bio}</span>
            </div>
            <Rating rating={coach.rating} />
            <div className="coach-item-languages">
              <b>Language Level:</b> <span>{coach.teachingLevel}</span>
            </div>
            <div className="coach-item-price">
              <strong>From ${coach.rate}</strong> per class
            </div>
            <div className="coach-item-links">
              <button
                className="coach-item-link"
                onClick={() => handleBookASession(coach)}
              >
                Book a Session
              </button>
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
