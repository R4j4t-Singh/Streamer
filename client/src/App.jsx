import React, { useEffect } from "react";
import { VideoPlayer, CommentBox, Header } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser, setUser } from "./store/authSlice";
import authService from "./backend/authService";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const user = await authService.getUser();
      console.log(user);

      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(resetUser());
        navigate("/login");
      }
    })();
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
