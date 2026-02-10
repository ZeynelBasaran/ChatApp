import jwt from "jsonwebtoken";
import { ENV } from "./env.js";





export const generateToken = (userId, res) => {

  const { JWT_SECRET,NODE_ENV } = ENV;
  if (!JWT_SECRET || !NODE_ENV) {
    throw new Error("JWT_SECRET or NODE_ENV environment variable is not defined");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // CSRF attacks
    secure: NODE_ENV === "development" ? false : true,
  });

  return token;
};


export const isValidEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return email.length <= 254 && emailRegex.test(email);
};
