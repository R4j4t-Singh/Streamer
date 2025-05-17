import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token =
    req.cookies?.sessionToken || req.headers.authorization?.slice(0, 8);

  if (!token) {
    // throw error
    return res.status(401).json();
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken) {
    // invalid token
    return res.satus(401).json();
  }

  req.userId = decodedToken.id;
  req.userName = decodedToken.name;
  req.userEmail = decodedToken.email;

  next();
};

export default authMiddleware;
