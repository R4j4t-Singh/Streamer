import React from "react";
import { VideoPlayer, CommentBox } from "../components";

function Home() {
  return (
    <div className="bg-gray-700 min-h-screen flex justify-between">
      <VideoPlayer />
      <CommentBox />
    </div>
  );
}

export default Home;
