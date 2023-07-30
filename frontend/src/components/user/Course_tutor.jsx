import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { tutorApi } from "../../services/api";
import CourseCard from "./CourseCard";



const CourseTutor = () => {
  const [courseData, setCourseData] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await tutorApi.get(`course?id=${id}`);
        if (res) {
          setCourseData(res.data.courseData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourseData();
  }, []);

  return <CourseCard courseData={courseData} />;
};

export default CourseTutor;
