import React from "react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { useSelector } from "react-redux";
import Logo from "../Logo";

function Header() {
  const authStaus = useSelector((state) => state.authReducer.user)
    ? true
    : false;

  return (
    <div className="w-full flex justify-between px-10 py-2 bg-gray-500 shadow-md fixed">
      <Logo />
      {authStaus ? (
        <div className="p-2">
          <LogoutButton />
        </div>
      ) : (
        <div className="p-2">
          <LoginButton />
        </div>
      )}
    </div>
  );
}

export default Header;
