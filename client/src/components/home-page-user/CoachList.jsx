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

const CoachList = ({ coachList }) => {
  const navigate = useNavigate();

  const handleBookASession = (coach) => {
    navigate("/bookasession", { state: { coach } });
  };

  if (!coachList.length) {
    return <div>No coaches found</div>;
  }

  return (
    <div
      className="coaches-list"
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {coachList.map((coach, id) => (
        <Card sx={{ width: 345 }} key={id}>
          <CardMedia
            sx={{ height: 300 }}
            image={coach.image}
            title={coach.username}
          />
          <CardContent
            sx={{
              color: "text.secondary",
              height: "250px",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" component="div">
              <b>Coach:</b>{" "}
              <Link to={`/coachProfile/${coach._id}`}>{coach.username}</Link>
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
          <CardActions sx={{ justifyContent: "center", margin: 1 }}>
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
