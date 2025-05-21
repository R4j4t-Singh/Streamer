import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createStream } from "../controllers/streamController.js";
import { getComments, postComment } from "../controllers/commentController.js";

const router = Router();

router.post("/", authMiddleware, createStream);

router.post("/:streamId/comments", authMiddleware, postComment);

router.get("/:streamId/comments", authMiddleware, getComments);

export default router;
