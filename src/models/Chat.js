import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true  // device ID ya session ID (login nahi hai toh bhi)
  },
  messages: [
    {
      role: { type: String, enum: ["user", "ai"] },
      content: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  mood: {
    type: String,
    default: "neutral"   // sad, anxious, stressed etc.
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Chat", chatSchema);
