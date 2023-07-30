import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return (
    <>
      <ReactPlayer
        style={{border: 3 , marginTop: "30px", backgroundColor: 'black', maxHeight: '560px' }}
        url={url}
        controls
        width="70%"
        height="auto"
      />
    </>
  );
};

export default VideoPlayer;
