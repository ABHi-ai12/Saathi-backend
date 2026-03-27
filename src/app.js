import dotenv from "dotenv";
dotenv.config(); // Load env vars FIRST, before anything else

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import chatRoutes from "./routes/chat.js";
import moodRoutes from "./routes/moodRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/chat", chatRoutes);
app.use("/mood", moodRoutes);

app.get("/", (req, res) => {
  res.send("AI Dost Backend Running 🚀");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ error: "Server mein kuch gadbad ho gayi!" });
});

// Connect DB (non-blocking) then start server
connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
});

export default app;
