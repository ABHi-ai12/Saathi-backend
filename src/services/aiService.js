import OpenAI from "openai";
import { getContext } from "./ragService.js";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const SYSTEM_PROMPT = `You are AI Dost, a caring and supportive friend.

Style:
- Speak in Hinglish
- Use "tu", never "aap"
- Keep replies short (2–3 lines)
- Be warm, human, and calm

Rules:
- Always validate feelings first
- Ask only ONE question max
- Do NOT give multiple suggestions
- Do NOT sound formal or robotic.`;

export const getAIResponse = async (message, chatHistory = []) => {
  
  // 1. Get context from RAG service
  const context = await getContext(message);

  const historyMessages = chatHistory.slice(-6).map(m => ({
    role: m.role === "ai" ? "assistant" : "user",
    content: m.content
  }));

  // 2. Build AI prompt using the strict format
  const userContentWithContext = `Context:
${context || "No specific context found."}

User:
${message}`;

  try {
    const response = await client.chat.completions.create({
      model: "stepfun/step-3.5-flash:free",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...historyMessages,
        { role: "user", content: userContentWithContext }
      ],
      max_tokens: 300,
      temperature: 0.8
    });

    return response.choices[0].message.content 
      || "Yaar, thoda network ka masla hai... Bol na?";

  } catch (error) {
    console.error("AI Service Error:", error.message);
    return "Mera connection thoda weak lag raha hai. Par hum saath hain! ❤️";
  }
};