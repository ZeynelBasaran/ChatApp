import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json("All Fields are required");
    }

    if (password.length < 6) {
      return res.status(400).json("Password must be at least 6 characters");
    }

    const validateEmail = (email) => {
      // Regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (email.length > 254) return false; // Very long emails can pose a security risk.

      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      return res.status(400).json("Invalid email format");
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json("Email already exixts");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in sign up controller ", error);
    res.status(500).json("Interval server error ");
  }
};
