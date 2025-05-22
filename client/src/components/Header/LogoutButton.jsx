import React from "react";
import authService from "../../backend/authService";
import { resetUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(resetUser());
  };

  return (
    <button
      className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
