import express from "express";
import {
  tutorRegister,
  verifyOtp,
  tutorLogin,
  logoutTutor,
  myStudents,
} from "../controllers/tutotController.js";
import {
  addCourse,
  getCourseData,
  updateCourseData,
  deleteCourse,
} from "../controllers/courseController.js";
import {
  addLesson,
  deleteLesson,
  loadLessonData,
  updateLesson,
} from "../controllers/lessonController.js";


const tutorRoutes = express.Router();

tutorRoutes.post("/register", tutorRegister);
tutorRoutes.post("/login", tutorLogin);
tutorRoutes.put("/otp", verifyOtp);
tutorRoutes.post("/logout", logoutTutor);
tutorRoutes.post("/course/add", addCourse);
tutorRoutes.post("/course/add_lesson", addLesson);
tutorRoutes.get("/course", getCourseData);
tutorRoutes.put("/update_course", updateCourseData);
tutorRoutes.get("/delete_course", deleteCourse);
tutorRoutes.get("/course/lesson", loadLessonData);
tutorRoutes.put("/update_lesson", updateLesson);
tutorRoutes.get("/delete_lesson", deleteLesson);
tutorRoutes.get("/my_students", myStudents);

export default tutorRoutes;
