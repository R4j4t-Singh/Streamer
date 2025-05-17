import { Router } from "express";
import passport from "passport";
import { loginWithGoogle } from "../controllers/authController.js";
import "../passport.js";

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

export default router;
