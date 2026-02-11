import express from "express";
import authRoutes from "./src/routes/auth.js";
import messageRoutes from "./src/routes/message.js";
import { connectDB } from "./src/lib/db.js";
import { ENV } from "./src/lib/env.js";
import cookieParser from "cookie-parser";



const app = express();

app.use(express.json())
app.use(cookieParser());


const PORT = ENV.PORT || 5173;


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


connectDB()



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
