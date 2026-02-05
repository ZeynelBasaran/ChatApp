import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js"
import messageRoutes from "./src/routes/message.js"

const app = express()
dotenv.config({ quiet: true })//Terminal silent mode

const PORT = process.env.PORT || 5173; 



app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})