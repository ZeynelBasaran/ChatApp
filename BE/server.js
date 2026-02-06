import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import messageRoutes from "./src/routes/message.js";
import path from "path";

const app = express();
dotenv.config({ quiet: true }); //Terminal silent mode

const PORT = process.env.PORT || 5173;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Next.js'in build dosyaları .next/static içindedir
  app.use("/.next", express.static(path.join(__dirname, "../frontend/.next")));

  // Diğer tüm istekleri Next.js'in ana sayfasına yönlendir
  app.get("/.*/", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/.next/server/app/index.html"),
    );
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
