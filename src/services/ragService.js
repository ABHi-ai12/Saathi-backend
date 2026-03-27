import axios from "axios";

export const getContext = async (message) => {
  try {
    const response = await axios.post("http://localhost:8000/search", {
      query: message,
      top_k: 2
    });

    const results = response.data.results;

    // Score filter — sirf relevant results lo (score < 1.5)
    const relevant = results.filter(r => r.score < 1.5);

    if (relevant.length === 0) return null;

    return relevant.map(r => r.content).join("\n");

  } catch (err) {
    console.error("RAG error:", err.message);
    return null;  // RAG fail ho toh bhi AI kaam karta rahe
  }
};