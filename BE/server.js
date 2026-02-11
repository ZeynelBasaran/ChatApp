import express from "express";
import authRoutes from "./src/routes/auth.js";
import messageRoutes from "./src/routes/message.js";
import { connectDB } from "./src/lib/db.js";
import { ENV } from "./src/lib/env.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit"; 

// Initialize express application
const app = express();

// General API rate limiter (Max 100 requests per 1 minutes for each IP)
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: "Too many requests, please take a break." }
});

// Stricter rate limiter for Authentication (Max 5 attempts per 15 minutes)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20, 
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again after 15 minutes." }
});

// Trust the first proxy (Required for deployments like Heroku, Render, Nginx)
app.set('trust proxy', 1);

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies from headers
app.use(cookieParser());

// Define server port from environment variables or default to 5173
const PORT = ENV.PORT || 5173;

// Apply specific rate limiter to authentication routes
app.use("/api/auth", authLimiter, authRoutes);

// Apply general rate limiter to messaging routes
app.use("/api/message", generalLimiter, messageRoutes);

// Establish database connection
connectDB();

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});