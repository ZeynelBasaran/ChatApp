import express from "express";
import { signUp } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/sign-up",signUp);

router.get("/logout", (req, res) => {
  res.send("Logout endpoint");
});

router.get("/login", (req, res) => {
  res.send("Login endpoint");
});

export default router;
