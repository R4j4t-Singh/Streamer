let ioRef = null;

const setUpSocket = (io) => {
  ioRef = io;

  io.on("connection", (socket) => {
    console.log("connected");
  });
};

const emitComment = (comment) => {
  if (ioRef) {
    ioRef.emit("new-comment", comment);
  }
};

export { setUpSocket, emitComment };
