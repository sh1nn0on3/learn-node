import jwt from "jsonwebtoken";
import { notAuth } from "./handle_errors";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("🚀 ~ file: verify_token.js:6 ~ verifyToken ~ token:", token)
  if (!token) return notAuth(`Require authorization`, res);
  const accessToken = token.split(" ")[1];
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return notAuth("Access token may be expired or invalid", res);
    req.user = user;
    next();
  });
};

export default verifyToken;
