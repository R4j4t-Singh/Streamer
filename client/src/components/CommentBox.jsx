import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import commentService from "../backend/commentService";
import streamService from "../backend/streamService";
import { useRef } from "react";
import { useSelector } from "react-redux";
import socket from "../socket";

function CommentBox({ streamId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const scrollRef = useRef(null);
  const [lastCommentId, setLastCommentId] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [stream, setStream] = useState(null);
  const authStaus = useSelector((state) => state.authReducer.user)
    ? true
    : false;

  useEffect(() => {
    (async () => {
      const oldComments = await commentService.getComments(streamId);
      oldComments.reverse();
      setComments(oldComments);

      if (oldComments?.length > 0) {
        setLastCommentId(oldComments[0]._id);
      }

      requestAnimationFrame(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      });
    })();

    socket.on("new-comment", (comment) => {
      console.log(comment);
      setComments((comments) => [...comments, comment]);
      requestAnimationFrame(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      });
    });

    (async () => {
      const stream = await streamService.getStream(streamId);
      if (stream) {
        setStream(stream);
      }
    })();

    return () => {
      socket.off("new-comment");
    };
  }, []);

  const postComment = async (event) => {
    event.preventDefault();
    const status = await commentService.postComment(streamId, comment);
    console.log(status);
    setComment("");
  };

  const getTime = (timestamp) => {
    // console.log(timestamp); TODO

    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return hour + ":" + minutes;
  };

  const handleScroll = async () => {
    const container = scrollRef.current;

    if (!container || !hasMore) return;

    if (container.scrollTop < 50) {
      const prevScrollHeight = container.scrollHeight;

      const oldComments = await commentService.getLastComments(
        streamId,
        lastCommentId
      );
      if (oldComments.length == 0) {
        setHasMore(false);
        return;
      }
      oldComments.reverse();
      setComments((comments) => [...oldComments, ...comments]);
      setLastCommentId(oldComments[0]._id);

      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight - prevScrollHeight;
      });
    }
  };

  return (
    <div className="w-full max-w-1/3 p-8">
      {stream && (
        <h2 className="text-center text-gray-200 text-3xl p-2">
          {stream.title}
        </h2>
      )}
      <div className="bg-gray-200 rounded-xl h-4/5 m-2">
        <div
          className="space-y-2 p-4 min-h-7/8 overflow-y-auto h-64"
          ref={scrollRef}
          onScrollEnd={handleScroll}
        >
          {comments.map((new_comment) => (
            <div key={new_comment._id} className="text-black p-2 bg-gray-200">
              <span className="flex">
                <div className="min-w-5/6 max-w-5/6 flex space-x-8">
                  <p className=" font-bold">{new_comment.userName}</p>
                  <p>{new_comment.comment}</p>
                </div>
                <p className="justify-end items-end  italic">
                  {getTime(new_comment.createdAt)}
                </p>
              </span>
            </div>
          ))}
        </div>
        <form className="flex justify-between p-2" onSubmit={postComment}>
          <input
            value={comment}
            className="w-full justify-end border-1 px-4 py-2 rounded-xl"
            placeholder="Write your comment here"
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 mx-2 rounded"
            disabled={!authStaus}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentBox;
