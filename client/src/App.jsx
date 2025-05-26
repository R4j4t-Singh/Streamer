import React, { useEffect } from "react";
import { VideoPlayer, CommentBox, Header } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser, setUser } from "./store/authSlice";
import authService from "./backend/authService";

function App() {
  const dispatch = useDispatch();

  const getUser = async () => {
    const user = await authService.getUser();
    console.log(user);

    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(resetUser());
    }
  };

  useEffect(() => {
    getUser();

    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:5173") return;

      if (event.data.type === "oauth-success") {
        console.log("User logged in!");
        getUser();
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
