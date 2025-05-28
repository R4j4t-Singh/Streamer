const url = "http://localhost:3000/api/";

const getCSRFToken = async () => {
  const res = await fetch(url + "csrf-token", {
    credentials: "include",
  });

  const data = await res.json();
  return data.csrfToken;
};

export { getCSRFToken };
