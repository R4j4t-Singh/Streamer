import React from "react";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";

function Header() {
  const authStaus = useSelector((state) => state.authReducer.user)
    ? true
    : false;

  return (
    <div className="w-full flex justify-between px-10 py-2 bg-gray-500 shadow-md">
      <h2 className="text-2xl p-2 font-bold">Streamer</h2>
      {authStaus && (
        <div className="space-x-2 p-2">
          <LogoutButton />
        </div>
      )}
    </div>
  );
}

export default Header;
