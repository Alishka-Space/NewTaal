import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/profileComponents/ProfileHeader";
import PersonalInfo from "../../components/profileComponents/PersonalInfo";
import LanguageInfo from "../../components/profileComponents/LanguageInfo";
import Availability from "../../components/profileComponents/Availability";
import MatchedLearners from "../../components/profileComponents/MatchedLearners";
import Reviews from "../../components/profileComponents/Reviews";
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
      setCoachData(coachList.find((c) => c.id === parseInt(id)));
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
          <ProfileHeader data={coachData} />
          <PersonalInfo data={coachData} />
          <LanguageInfo data={coachData} />
          <Availability data={coachData} />
          <MatchedLearners data={coachData} />
          <Reviews data={coachData} />
        </Box>
      </Container>
    </div>
  );
};

export default CoachProfilePage;
