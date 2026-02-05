import express from "express";

const router = express.Router();

router.get("/sign-up", (req, res) => {
  res.send("Sign-up endpoint");
});
router.get("/logout", (req, res) => {
  res.send("Logout endpoint");
});

router.get("/login", (req, res) => {
  res.send("Login endpoint");
});

export default router;
