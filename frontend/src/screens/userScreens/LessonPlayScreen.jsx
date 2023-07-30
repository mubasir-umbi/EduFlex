import { Box, Divider } from "@mui/material";
import React, { useState } from "react";
import VideoPlayer from "../../components/videoPlayer";
import Lessons from "../../components/user/lessons";
import { useParams } from "react-router-dom";
import Questions from "../../components/user/questions";

const LessonPlayScreen = (props) => {
  const [lesson, setLesson] = useState("");

  const { courseId } = useParams();

  const playHandler = (lesson) => {
    setLesson(lesson);
    console.log(lesson);
  };

  return (
    <>
      <Box display={"flex"}>
        <VideoPlayer url={lesson.videoUrl} />
        <Box style={{ width: "30%" }} ml={2} mt={4} mr={2}>
          <Lessons
            status={false}
            width={"100px"}
            courseId={courseId}
            height={"auto"}
            des={"p"}
            onPlayHandler={playHandler}
          />
        </Box>
      </Box>
      <Divider width={"68%"} sx={{ mb: 3, ml: 1 }} />
      <Questions lesson={lesson} courseId={courseId} />
    </>
  );
};

export default LessonPlayScreen;
