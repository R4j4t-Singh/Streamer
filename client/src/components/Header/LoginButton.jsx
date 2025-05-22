import React from "react";

const login = async () => {
  window.location.href = "http://localhost:3000/api/auth/google";
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
