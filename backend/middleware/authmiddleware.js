import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer")) {
    return res.status(403).json({
      message: "Invalid header",
    });
  }

  const token = header.split(" ")[1];

  try {
    const decodedId = jwt.verify(token, JWT_SECRET);

    if (decodedId) {
      req.userId = decodedId.userId;
      next();
    }
  } catch (e) {
    console.error("Error while authorizing user", e);
    return res.status(403).json({
      message: "Internal server error",
    });
  }
};

export default authMiddleware;
