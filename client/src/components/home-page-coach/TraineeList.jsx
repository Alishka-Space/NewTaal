import React, { useState, useEffect } from "react";
import "./traineeList.css";
import useFetch from "../../hooks/useFetch";

const TraineeList = () => {
  const [users, setUsers] = useState(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/coach",
    (response) => {
      setUsers(response.result);
    },
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="trainee-list">
      {users &&
        users.map((student) => (
          <div className="student-item" key={student.id}>
            <img
              src={student.image}
              alt={student.username}
              className="student-item-img"
            />
            <div className="student-item-body">
              <div className="coach-item-name">
                {" "}
                <b> Name :</b> <span>{student.username}</span>{" "}
              </div>
              <div className="student-item-bio">
                <b>Bio :</b>
                <span>{student.bio}</span>{" "}
              </div>
              <div className="coach-item-availability">
                <b>Language Level :</b>
                <span>{student.languageProficiency}</span>{" "}
              </div>
              <div className="student-item-languages">
                <b>Purpose :</b> <span>{student.purpose}</span>{" "}
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

export default TraineeList;
