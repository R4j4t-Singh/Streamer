import express from "express";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { setUpSocket } from "./socketHandler.js";
import ratelimit from "express-rate-limit";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  ratelimit({
    windowMs: 2 * 60 * 1000,
    limit: 100,
    message: "Too many requests, please try again later.",
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

setUpSocket(io);

//Routes
import authRouter from "./routes/authRoute.js";
import commentRouter from "./routes/commentRoute.js";

app.use("/api/auth", authRouter);
app.use("/api/comment", commentRouter);

export default server;
