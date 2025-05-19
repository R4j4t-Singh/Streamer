import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import commentService from "../backend/commentService";
import { useSelector } from "react-redux";

const socket = io("http://localhost:3000");

function CommentBox() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    socket.on("new-comment", (comment) => {
      console.log(comment);
      setComments((comments) => [...comments, comment]);
    });

    return () => {
      socket.off("new-comment");
    };
  }, []);

  const postComment = async (event) => {
    event.preventDefault();
    const status = await commentService.postComment(comment);
    console.log(status);
    setComment("");
  };

  const getTime = (timestamp) => {
    console.log(timestamp);

    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return hour + ":" + minutes;
  };

  return (
    <div className="w-full max-w-1/3 p-8">
      <div className="bg-gray-200 rounded-xl h-4/5 m-2">
        <div className="space-y-2 p-4 min-h-7/8">
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
          <button type="submit" className="p-2 bg-blue-500 mx-2 rounded">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentBox;
