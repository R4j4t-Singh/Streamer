import React, { useState } from "react";
import streamService from "../backend/streamService";
import { useNavigate } from "react-router-dom";

function HomeLayout() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const createStream = async () => {
    const streamId = await streamService.createStream(title);
    if (streamId) {
      navigate(`/stream/${streamId}`);
    } else {
      console.log("Error"); //TODO
    }
  };

  return (
    <div>
      <h1 className="text-4xl">Create Your Stream NOW!</h1>
      <div className="space-x-2">
        <input
          type="text"
          className="p-1 w-1/2 bg-gray-200 rounded border"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 rounded p-2"
          type="submit"
          onClick={createStream}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default HomeLayout;
