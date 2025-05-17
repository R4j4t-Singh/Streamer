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

const commentService = { postComment };

export default commentService;
