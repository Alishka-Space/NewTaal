import React, { useEffect, useState } from "react";
import ProfileHeaderCoach from "../../components/coachProfileComponents/ProfileHeaderCoach";
import PersonalInfoCoach from "../../components/coachProfileComponents/PersonalInfoCoach";
import LanguageInfoCoach from "../../components/coachProfileComponents/LanguageInfoCoach";
import Availability from "../../components/coachProfileComponents/Availability";
import MatchedLearners from "../../components/coachProfileComponents/MatchedLearners";
import Reviews from "../../components/coachProfileComponents/Reviews";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { coachList } from "../../data";

const CoachProfilePage = () => {
  const { id } = useParams();
  const [coachData, setCoachData] = useState({});

  useEffect(() => {
    if (id) {
      //Get data later from backend
      setCoachData(coachList.find((c) => c.id == id));
    }
  }, []);
  return (
    <div style={{ backgroundColor: "#e6e6fa", position: "relative" }}>
      <Container maxWidth="md" style={{ position: "relative" }}>
        <Box
          sx={{
            minHeight: "100vh",
            paddingBottom: "100px",
          }}
        >
          <ProfileHeaderCoach data={coachData} />
          <PersonalInfoCoach data={coachData} />
          <LanguageInfoCoach data={coachData} />
          <Availability data={coachData} />
          <MatchedLearners data={coachData} />
          <Reviews data={coachData} />
        </Box>
      </Container>
    </div>
  );
};

export default CoachProfilePage;
