const { GoogleGenerativeAI } = require("@google/generative-ai");
const OpenAI = require("openai");
const Groq = require("groq-sdk");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getAnswer(question, provider = "groq") {
  try {
    if (provider === "gemini") {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent([question]);
      return result.response.text();
    } else if (provider === "chatgpt") {
      const result = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: question }],
      });
      return result.choices[0].message.content;
    } else if (provider === "groq") {
      const result = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: question }],
      });
      return result.choices[0].message.content;
    }
    return "❌ Unknown provider selected.";
  } catch (err) {
    console.error("AI client error:", err);
    return "⚠️ AI provider error.";
  }
}

module.exports = { getAnswer };
