import React from "react";

function VideoPlayer() {
  return (
    <div className="p-8 justify-center flex w-full max-w-2/3">
      <video
        src="https://videos.pexels.com/video-files/6685367/6685367-hd_1920_1080_30fps.mp4"
        className="rounded-xl max-h-6/7 w-full"
        type="video/mp4"
        controls
        autoPlay
        loop
        muted
      />
    </div>
  );
}

export default VideoPlayer;
