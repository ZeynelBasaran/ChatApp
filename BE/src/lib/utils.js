import jwt from "jsonwebtoken";
import { ENV } from "./env.js";





export const generateToken = (userId, res) => {

  const { JWT_SECRET, NODE_ENV } = ENV;
  if (!JWT_SECRET || !NODE_ENV) {
    throw new Error("JWT_SECRET or NODE_ENV environment variable is not defined");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = NODE_ENV === "production";

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true,                              // XSS koruması
    sameSite: isProduction ? "none" : "strict",  // Cross-origin (Netlify + Render) için "none" şart
    secure: isProduction,                        // sameSite="none" ise secure=true zorunlu
  });

  return token;
};


export const isValidEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return email.length <= 254 && emailRegex.test(email);
};
