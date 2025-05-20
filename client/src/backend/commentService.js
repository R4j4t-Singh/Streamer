const url = "http://localhost:3000/api/comment";

const postComment = async (comment) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      comment: comment,
    }),
    credentials: "include",
  });

  if (response.ok) {
    return "success";
  } else {
    return "failure";
  }
};

const getComments = async () => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const data = await response.json();
    return data.data.comments;
  } else {
    console.log("failure");
    return [];
  }
};

const getLastComments = async (id) => {
  const response = await fetch(url + `?beforeId=${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const data = await response.json();
    return data.data.comments;
  } else {
    console.log("failure");
    return [];
  }
};

const commentService = { postComment, getComments, getLastComments };

export default commentService;
