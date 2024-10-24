import React, { useEffect, useState } from "react";
import "./coachList.css";
import Rating from "../home-page-user/Rating";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const CoachList = () => {
  const [users, setUsers] = useState(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/coach",
    (response) => {
      setUsers(response.result);
    },
  );

  const navigate = useNavigate();

  const handleBookASession = (coach) => {
    navigate("/bookasession", { state: { coach } });
  };

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
    <div className="coaches-list">
      {users &&
        users.map((coach, id) => (
          <div className="coach-item" key={id}>
            <img
              src={coach.image}
              alt={coach.username}
              className="coach-item-img"
            />
            <span className="coach-item-label">Coach</span>
            <div className="coach-item-body">
              <div className="coach-item-name">
                {" "}
                <b> Name :</b> <span>{coach.username}</span>{" "}
              </div>
              <div className="coach-item-bio">
                <b>Bio :</b>
                <span>{coach.bio}</span>{" "}
              </div>
              <Rating rating={coach.rating} />
              {/* <div className="coach-item-availability">
              <b>Availability :</b>
              <span>{coach.availability}</span>{" "}
            </div> */}
              <div className="coach-item-languages">
                <b>Languages :</b> <span>{coach.teachLevel}</span>{" "}
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

export default CoachList;
