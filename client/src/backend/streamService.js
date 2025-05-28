const url = "http://localhost:3000/api/stream";

const createStream = async (title, csrfToken) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "CSRF-Token": csrfToken,
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

const updateVideo = async (streamId, videoUrl, csrfToken) => {
  const response = await fetch(url + "/" + streamId + "/videos", {
    method: "PUT",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "CSRF-Token": csrfToken,
    },
    body: JSON.stringify({
      videoUrl: videoUrl,
    }),
  });
  
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

const streamService = { createStream, getStream, updateVideo };

export default streamService;
