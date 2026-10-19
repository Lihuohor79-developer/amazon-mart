import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, resizeBy, next) => {
  try {
    console.log("Authorization Header: ", req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return resizeBy
        .status(401)
        .json({ success: false, message: "Token Missing" });

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const user = await User.findById(decoded.id).select("-password");
    console.log("User:", user);
    if (!user)
      return resizeBy
        .status(404)
        .json({ success: false, message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    console.log("Auth error", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or Expired token" });
  }
};
