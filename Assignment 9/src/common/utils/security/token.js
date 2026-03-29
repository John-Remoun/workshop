import jwt from "jsonwebtoken";

export const generateToken = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });

export const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);
