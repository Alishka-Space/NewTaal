import React from "react"
import "./traineeList.css"
import PropTypes from "prop-types"


const TraineeList = ({ traineeList }) => {
  return (
    <div className="trainee-list">
      {traineeList.map(student =>
        <div className="student-item" key={student.id}>
          <img src={student.image} alt={student.studentName} className='student-item-img' />
          <div className="student-item-body">
            <div className="coach-item-name">
              {" "}
              <b> Name :</b> <span>{student.studentName}</span>{" "}
            </div>
            <div className="student-item-bio">
              <b>Bio :</b>
              <span>{student.bio}</span>{" "}
            </div>
            <div className="coach-item-availability">
              <b>Availability :</b>
              <span>{student.availability}</span>{" "}
            </div>
            <div className="student-item-languages">
              <b>Languages :</b> <span>{student.language}</span>{" "}
            </div>
            <div className="student-item-links">
              <button className="student-item-link">Send a Message</button>
            </div>
          </div>

        </div>

      )}


    </div >

  )
}

TraineeList.propTypes = {
  traineeList: PropTypes.array.isRequired,
}


export default TraineeList
