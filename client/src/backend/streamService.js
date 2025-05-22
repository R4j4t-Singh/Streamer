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

const getStream = async (streamId) => {
  const response = await fetch(url + "/" + streamId, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const data = await response.json();
    return data.data.stream;
  } else {
    console.log("Error while fetching stream");
    return null;
  }
};

const streamService = { createStream, getStream };

export default streamService;
