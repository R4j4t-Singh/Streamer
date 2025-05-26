import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const loginWithGoogle = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    throw new ApiError("Something went wrong while login");
  }
  const sessionToken = jwt.sign(
    {
      id: user.id,
      name: user.displayName,
      email: user.emails[0].value,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TOKEN_EXPIRY }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("sessionToken", sessionToken, cookieOptions)
    .redirect("http://localhost:5173/oauth-success");
});

const getUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: req.userId,
          name: req.userName,
          email: req.userEmail,
        },
      },
      "User details fetched successfully"
    )
  );
});

const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("sessionToken")
    .json(new ApiResponse(200, {}, "User logged out"));
});

export { loginWithGoogle, getUser, logout };
