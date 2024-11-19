import React, { useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Card, Typography, useMediaQuery } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const MatchedLearners = () => {
  const [matchedLearners, setMatchedLearners] = useState([]);
  const { authState } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { performFetch, cancelFetch } = useFetch(
    `/session/user/${authState.id}`,
    (response) => {
      const learners = response.result.map((item) => ({
        learner_name: item.learner_name,
        learner_id: item.learner_id,
      }));
      const uniqueLearners = [
        ...new Map(
          learners.map((learner) => [learner.learner_id, learner]),
        ).values(),
      ];
      setMatchedLearners(uniqueLearners);
    },
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      params: authState.id,
    });
    return cancelFetch;
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container justifyContent="center">
      <Paper
        sx={{
          userSelect: "none",
          borderRadius: 6,
          p: 2,
          mt: 3,
          mb: 1,
          width: isSmallScreen ? "100%" : 750,
          height: isSmallScreen ? "auto" : 360,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0" }}>
          <Typography fontWeight="bold">Matched Learners</Typography>
        </Card>

        <div>
          <Grid container p={isSmallScreen ? 2 : 4} spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Stack spacing={2}>
                  {matchedLearners.map((learner, index) => (
                    <Item
                      sx={{
                        width: { xs: "100%", sm: "80%", md: 150 },
                        height: 45,
                        textAlign: "center",
                        bgcolor: "#333333",
                        color: "#ffffff",
                      }}
                      key={index}
                    >
                      <Typography width="100%" fontSize={15} fontWeight="bold">
                        Learner {index + 1}
                      </Typography>
                    </Item>
                  ))}
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Box
                sx={{
                  width: { xs: "100%", sm: "80%", md: 450 },
                }}
              >
                <Stack spacing={2}>
                  {matchedLearners.map((learner) => (
                    <Item
                      sx={{ height: 45, bgcolor: "#f0f0f0" }}
                      key={learner.learner_id}
                    >
                      <Typography width="100%" fontSize={15} fontWeight="bold">
                        <Link to={`/learnerprofile/${learner.learner_id}`}>
                          {learner.learner_name}
                        </Link>
                      </Typography>
                    </Item>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={matchedLearners.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </Grid>
  );
};

export default MatchedLearners;
