import React, { useEffect, useState } from "react";
import ProfileHeaderLearner from "../../components/learnerProfileComponents/ProfileHeaderLearner";
import PersonalInfoLearner from "../../components/learnerProfileComponents/PersonalInfoLearner";
import LanguageInfoLearner from "../../components/learnerProfileComponents/LanguageInfoLearner";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PreviousSessions from "../../components/sessionComponents/PreviousSessions";

const LearnerProfilePage = () => {
  const { id } = useParams();
  const [learnerData, setLearnerData] = useState({});

  const { performFetch, cancelFetch } = useFetch(
    `/learner/profile/${id}`,
    (response) => {
      setLearnerData(response.result);
    },
  );

  useEffect(() => {
    performFetch({
      method: "POST",
      params: id,
    });
    return cancelFetch;
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
          <ProfileHeaderLearner data={learnerData} />
          <PersonalInfoLearner data={learnerData} />
          <LanguageInfoLearner data={learnerData} />
          <PreviousSessions data={learnerData} />
        </Box>
      </Container>
    </div>
  );
};

export default LearnerProfilePage;
