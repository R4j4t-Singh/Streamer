import { Router } from "express";
import { getComments, postComment } from "../controllers/commentController.js";
import authMidddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMidddleware, postComment);

router.get("/", authMidddleware, getComments);

export default router;
