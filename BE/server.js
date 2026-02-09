import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import messageRoutes from "./src/routes/message.js";
import { connectDB } from "./src/lib/db.js";


const app = express();
dotenv.config({ quiet: true }); //Terminal silent mode
app.use(express.json())

const PORT = process.env.PORT || 5173;


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


connectDB()



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  
});
