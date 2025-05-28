let ioRef = null;

const setUpSocket = (io) => {
  ioRef = io;

  io.on("connection", (socket) => {
    console.log("connected");

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined ${roomId}`);
    });

    socket.on("video-updated", (roomId) => {
      io.to(roomId).emit("video-updated");
    });
  });
};

const emitComment = (streamId, comment) => {
  if (ioRef) {
    ioRef.to(streamId).emit("new-comment", comment);
  }
};

export { setUpSocket, emitComment };
