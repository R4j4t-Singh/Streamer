import { Router } from "express";
import passport from "passport";
import {
  getUser,
  loginWithGoogle,
  logout,
} from "../controllers/authController.js";
import "../passport.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  loginWithGoogle
);

router.get("/user", authMiddleware, getUser);

router.get("/logout", authMiddleware, logout);

export default router;
