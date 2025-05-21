import React from "react";
import { VideoPlayer, CommentBox } from "../components";
import { useParams } from "react-router-dom";

function Stream() {
  const { streamId } = useParams();
  return (
    <div className="bg-gray-700 min-h-screen flex justify-between">
      <VideoPlayer streamId={streamId} />
      <CommentBox streamId={streamId} />
    </div>
  );
}

export default Stream;
