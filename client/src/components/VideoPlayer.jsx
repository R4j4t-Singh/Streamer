import React, { useState } from "react";

function VideoPlayer() {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(
    "https://videos.pexels.com/video-files/6685367/6685367-hd_1920_1080_30fps.mp4"
  );

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
          onClick={() => setVideoUrl(url)}
        >
          Go
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
