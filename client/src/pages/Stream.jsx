import React from "react";
import { VideoPlayer, CommentBox } from "../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import socket from "../socket";

function Stream() {
  const { streamId } = useParams();

  useEffect(() => {
    socket.emit("join-room", streamId);
  }, []);

  return (
    <div className="bg-gray-700 min-h-screen flex justify-between pt-15">
      <VideoPlayer streamId={streamId} />
      <CommentBox streamId={streamId} />
    </div>
  );
}

export default Stream;
