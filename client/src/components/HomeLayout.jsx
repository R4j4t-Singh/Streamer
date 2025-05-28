import React, { useState } from "react";
import streamService from "../backend/streamService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomeLayout() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const authStaus = useSelector((state) => state.authReducer.user)
    ? true
    : false;
  const csrfToken = useSelector((state) => state.authReducer.csrfToken);

  const createStream = async () => {
    const streamId = await streamService.createStream(title, csrfToken);
    if (streamId) {
      navigate(`/stream/${streamId}`);
    } else {
      console.log("Error"); //TODO
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700">
      <div className="text-center p-4 w-full">
        <h1 className="text-4xl p-2 font-medium text-gray-200">
          Create Your Stream NOW!
        </h1>
        <div className="space-x-2 p-4">
          <input
            type="text"
            className="px-2 py-1 w-1/2 bg-gray-200 rounded border"
            placeholder="Enter your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-blue-500 rounded p-2 hover:bg-blue-600"
            type="submit"
            onClick={createStream}
            disabled={!authStaus}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
