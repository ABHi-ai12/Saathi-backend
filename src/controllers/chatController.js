import { getAIResponse } from "../services/aiService.js";
import { detectCrisis } from "../utils/crisis.js";
import Chat from "../models/Chat.js";
import mongoose from "mongoose";

export const handleChat = async (req, res) => {
  try {
    const { content, userId, chatHistory: clientHistory } = req.body;

    if (!content || !userId) {
      return res.status(400).json({ error: "content aur userId dono chahiye!" });
    }

    // 1. Crisis check
    if (detectCrisis(content)) {
      return res.json({
        response: "Yaar… main yahan hoon ❤️ Please iCall pe baat kar: 9152987821",
        crisis_detected: true
      });
    }

    const dbConnected = mongoose.connection.readyState === 1;
    let chat = null;
    let history = [];

    // 2. Purani history lo MongoDB se (only if DB is connected)
    if (dbConnected) {
      chat = await Chat.findOne({ userId });
      if (!chat) {
        chat = new Chat({ userId, messages: [] });
      }
      history = chat.messages;
    }

    // Agar DB se history nahi mili, toh client-provided history use karo
    if (history.length === 0 && clientHistory && Array.isArray(clientHistory)) {
      history = clientHistory;
    }

    // 3. AI response lo (history ke saath)
    const reply = await getAIResponse(content, history);

    // 4. Messages save karo (only if DB is connected)
    if (dbConnected && chat) {
      chat.messages.push({ role: "user", content });
      chat.messages.push({ role: "ai", content: reply });
      await chat.save();
    }

    res.json({
      response: reply,
      crisis_detected: false,
      db_connected: dbConnected
    });

  } catch (error) {
    console.error("Chat Controller Error:", error.message);
    res.status(500).json({ error: "Kuch gadbad ho gayi, phir try kar!" });
  }
};
