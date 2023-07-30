import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Rating, TextField } from "@mui/material";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddReview({ submitHandler, courseId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = React.useState(null);
  const [review, setReview] = React.useState("");

  return (
    <Box>
      <Button
        size="small"
        sx={{ mb: 2, ml: 2 }}
        variant="outlined"
        onClick={handleOpen}
      >
        Add your Review
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a review about this course
          </Typography>
          <TextField
            onChange={(e) => {
              setReview(e.target.value);
            }}
            sx={{ width: "100%", mt: 2 }}
          />

          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            We will be appriciated your valueble rating
          </Typography>
          <Rating
            value={rating}
            precision={0.5}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          ></Rating>
          <Box mt={2}>
            <Button
              onClick={() => {
                if (!rating || !review) {
                  return toast.error("Invalid input");
                }
                setOpen(false);
                submitHandler(rating, review, courseId);
              }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
