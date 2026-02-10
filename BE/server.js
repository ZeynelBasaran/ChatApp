import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import messageRoutes from "./src/routes/message.js";
import { connectDB } from "./src/lib/db.js";
import { ENV } from "./src/lib/env.js";
import { sender } from "./src/lib/resend.js";


const app = express();

app.use(express.json())

const PORT = ENV.PORT || 5173;


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


connectDB()



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
