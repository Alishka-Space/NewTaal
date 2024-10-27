import React from "react";
import "./traineeList.css";
import PropTypes from "prop-types";

const TraineeList = ({ traineeList }) => {
  if (traineeList.length === 0) {
    return <div>No trainees available.</div>;
  }

  return (
    <div className="trainee-list">
      {traineeList.map((student) => (
        <div className="student-item" key={student.user_id}>
          <img
            src={student.image}
            alt={student.username}
            className="student-item-img"
          />
          <div className="student-item-body">
            <div className="coach-item-name">
              <b>Name:</b> <span>{student.username}</span>
            </div>
            <div className="student-item-bio">
              <b>Bio:</b> <span>{student.bio}</span>
            </div>
            <div className="coach-item-availability">
              <b>Language Level:</b> <span>{student.languageProficiency}</span>
            </div>
            <div className="student-item-languages">
              <b>Purpose:</b> <span>{student.purpose}</span>
            </div>
            <div className="student-item-links">
              <button className="student-item-link">Send a Message</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

TraineeList.propTypes = {
  traineeList: PropTypes.array.isRequired,
};

export default TraineeList;
