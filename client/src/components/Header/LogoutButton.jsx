import React from "react";
import authService from "../../backend/authService";
import { resetUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(resetUser());
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-center">
      <button
        className="px-3 py-2 txt-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
