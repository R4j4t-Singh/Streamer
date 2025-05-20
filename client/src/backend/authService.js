const url = "http://localhost:3000/api/auth";

const getUser = async () => {
  const response = await fetch(url + "/user", {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const data = await response.json();
    return data.data.user;
  } else {
    return null;
  }
};

const logout = async () => {
  const response = await fetch(url + "/logout", {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

const authService = { getUser, logout };

export default authService;
