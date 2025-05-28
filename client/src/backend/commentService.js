const url = "http://localhost:3000/api/stream/";

const postComment = async (streamId, comment, csrfToken) => {
  const response = await fetch(url + streamId + "/comments", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "CSRF-Token": csrfToken,
    },
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

const getComments = async (streamId) => {
  const response = await fetch(url + streamId + "/comments", {
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

const getLastComments = async (streamId, id) => {
  const response = await fetch(
    url + streamId + "/comments" + `?beforeId=${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

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
