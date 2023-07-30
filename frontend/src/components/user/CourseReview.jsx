import { Avatar, Box, Divider, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { userApi } from "../../services/api";

const CourseReview = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await userApi.get(`course_review?id=${id}`);
        if (res) {
          console.log(res, "review resssss");
          setReviews(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getReviews();
  }, [id]);

  return (
    <>
      {reviews.length === 0 ? (
        <Typography mt={2} variant="h5" component={"h2"}>
          No reviews yet.
        </Typography>
      ) : (
        <>
          <Typography ml={3} mt={2}>
            Total {reviews.length} People reviewed this course
          </Typography>

          {reviews.map((review) => (
            <Box p={2} key={review._id}>
              <Box display={"flex"} m={1}>
                <Avatar sx={{ width: "28px", height: "28px" }}>
                  <Typography sx={{ fontSize: "16px" }}>
                    {review.user.fName[0]}
                  </Typography>
                </Avatar>
                <Typography
                  sx={{ textDecoration: "underline" }}
                  variant="subtitle1"
                  component={"h1"}
                  ml={1}
                >
                  {review.user.fName}
                </Typography>
              </Box>
              <Box ml={5}>
                <Box  mt={2}>
                  <Rating readOnly size="small" value={review.rating}></Rating>
                </Box>
                <Box mb={2}>
                  <Typography variant="subtitle">{review.review}</Typography>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default CourseReview;
