import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  validateOtp,
  resetPassword,
  updatePassword,
} from "../controllers/userController.js";

import {
  getPopularCourseData,
  getSingleCourseData,
  getCourseByCategory,
} from "../controllers/courseController.js";

import {
  saveEnrolledCourseData,
  myEnrolledCourseData,
} from "../controllers/enrolledCourseController.js";

import {
  submitReview,
  getReviews,
  getCourseReviews,
} from "../controllers/reviewController.js";
import {
  addQuestion,
  loadQuestions,
} from "../controllers/questionController.js";
import { addReply } from "../controllers/replyController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/forget_password", resetPassword);
router.post("/reset_password", updatePassword);
router.get("/course/popular", getPopularCourseData);
router.get("/course/view", getSingleCourseData);
router.get("/course/category", getCourseByCategory);
router.post("/payment", saveEnrolledCourseData);
router.get("/my_courses", myEnrolledCourseData);
router.post("/review", submitReview);
router.get("/review", getReviews);
router.get("/course_review", getCourseReviews);
router.post("/question", addQuestion);
router.get("/questions", loadQuestions);
router.post("/reply", addReply);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/otp").get(getUserProfile).put(validateOtp);

export default router;
