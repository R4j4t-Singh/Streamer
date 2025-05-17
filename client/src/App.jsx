import React from "react";
import { VideoPlayer, CommentBox, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
