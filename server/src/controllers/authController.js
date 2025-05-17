import jwt from "jsonwebtoken";

const loginWithGoogle = async (req, res) => {
  const { user } = req;
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
    .redirect("http://localhost:5173")
    .json(sessionToken);
};

export { loginWithGoogle };
