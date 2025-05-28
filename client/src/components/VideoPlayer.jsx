import React, { useEffect, useState } from "react";
import streamService from "../backend/streamService";
import socket from "../socket";
import { useSelector } from "react-redux";

function VideoPlayer({ streamId }) {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(
    "https://videos.pexels.com/video-files/6685367/6685367-hd_1920_1080_30fps.mp4"
  );
  const csrfToken = useSelector((state) => state.authReducer.csrfToken);

  const updateVideo = async () => {
    const response = await streamService.updateVideo(streamId, url, csrfToken);
    if (response) {
      setUrl("");
      socket.emit("video-updated", streamId);
    } else {
      console.log("Error updating video");
    }
  };

  const getStream = async () => {
    const stream = await streamService.getStream(streamId);
    if (stream.videoUrl) {
      setVideoUrl(stream.videoUrl);
    }
  };

  useEffect(() => {
    getStream();

    socket.on("video-updated", () => {
      getStream();
    });

    return () => {
      socket.off("video-updated");
    };
  }, []);

  return (
    <div className="p-8 justify-center w-full max-w-2/3">
      <video
        src={videoUrl}
        className="rounded-xl max-h-145 w-full"
        type="video/mp4"
        controls
        autoPlay
        loop
        muted
      />
      <div className="p-4 flex justify-between space-x-4">
        <input
          type="url"
          className="w-full p-1 bg-gray-200 rounded border"
          placeholder="Enter video url here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="bg-blue-500 rounded p-2"
          type="submit"
          onClick={updateVideo}
        >
          Go
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
