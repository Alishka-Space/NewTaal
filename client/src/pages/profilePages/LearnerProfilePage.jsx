import React, { useEffect, useState, useContext } from "react";
import ProfileHeaderLearner from "../../components/learnerProfileComponents/ProfileHeaderLearner";
import PersonalInfoLearner from "../../components/learnerProfileComponents/PersonalInfoLearner";
import LanguageInfoLearner from "../../components/learnerProfileComponents/LanguageInfoLearner";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const LearnerProfilePage = () => {
  const { id } = useParams();
  const [learnerData, setLearnerData] = useState({});
  const { authState } = useContext(AuthContext);

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
          {(authState.role === "learner" && (
            <>
              <PersonalInfoLearner data={learnerData} />
              <LanguageInfoLearner data={learnerData} />
            </>
          )) || (
            <>
              <LanguageInfoLearner data={learnerData} />
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default LearnerProfilePage;
