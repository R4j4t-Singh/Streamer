const url = "http://localhost:3000/api/stream";

const createStream = async (title) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const streamId = data.data.streamId;
    return streamId;
  } else {
    console.log("Error while creating stream");
    return null;
  }
};

const streamService = { createStream };

export default streamService;
