import React from "react";

const login = async () => {
  const width = 400;
  const height = 500;
  const left = window.screen.width - width / 2;
  const top = window.screen.height / 2 - height / 2;

  const popup = window.open(
    "http://localhost:3000/api/auth/google",
    "OAuth Login",
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

function Login() {
  return (
    <button
      className="bg-blue-600 px-3 py-2 rounded text-white hover:bg-blue-700"
      onClick={login}
    >
      Login with Google
    </button>
  );
}

export default Login;
