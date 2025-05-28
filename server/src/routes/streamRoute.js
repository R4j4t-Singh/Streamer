import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createStream,
  getStream,
  updateVideo,
} from "../controllers/streamController.js";
import { getComments, postComment } from "../controllers/commentController.js";

const router = Router();

router.post("/", authMiddleware, createStream);

router.get("/:streamId", authMiddleware, getStream);

router.post("/:streamId/comments", authMiddleware, postComment);

router.get("/:streamId/comments", authMiddleware, getComments);

router.put("/:streamId/videos", authMiddleware, updateVideo);

export default router;
