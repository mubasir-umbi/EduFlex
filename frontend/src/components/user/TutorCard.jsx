import {
  Box,
  Container,
  Divider,

  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { adminApi } from "../../services/api";

const TutorCard = () => {
  const [tutor, setTutor] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminApi.get("tutors");
        if (res) {
          console.log(res, "tutor respooooooooooooo");
          setTutor(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Divider />
      <Container
        component="main"
        sx={{ mt: 8, mb: 8, border: 1, p: 3, textAlign: "center" }}
        maxWidth="lg"
        alignItems={"center"}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          {"Most Popular Tutors "}
        </Typography>
        <Typography variant="body1">Most Popular Tutors for you</Typography>

        <Container sx={{ py: 8 }} maxWidth="lg">
          <Box display={"flex"} justifyContent={"space-around"} width={"md"}>
            {tutor.map((tutor) => {
              return (
                <Link to={`/filter_tutor/${tutor._id}`} style={{textDecoration: 'none'}}>
                  <Typography
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      fontFamily: "monospace",
                    }}
                    variant="h4"
                    height={"auto"}
                    border={2}
                    px={6}
                    py={3}
                  >
                    {tutor.firstName}
                  </Typography>
                </Link>
              );
            })}
          </Box>
        </Container>
      </Container>
      <Divider />
    </>
  );
};

export default TutorCard;
