import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./coachList.css";

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
        <Card className="coach-card" key={id}>
          <CardMedia
            className="coach-image"
            image={coach.image}
            title={coach.username}
          />
          <CardContent className="coach-content">
            <Typography variant="h6" component="div">
              <b>Coach:</b>{" "}
              <Link to={`/coachProfile/${coach.user_id}`}>
                {coach.username}
              </Link>
            </Typography>

            <Rating
              name="read-only"
              value={coach.rating || 0}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2">
              <b>Bio:</b> {coach.bio}
            </Typography>

            <Typography variant="body2">
              <b>Language Level:</b> {coach.teachingLevel}
            </Typography>

            <Typography variant="body2">
              <strong>From ${coach.rate}</strong> per class
            </Typography>
          </CardContent>
          <CardActions className="coach-actions">
            <Button
              onClick={() => handleBookASession(coach)}
              size="small"
              variant="contained"
              color="secondary"
            >
              Book a Session
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

CoachList.propTypes = {
  coachList: PropTypes.array.isRequired,
};

export default CoachList;
