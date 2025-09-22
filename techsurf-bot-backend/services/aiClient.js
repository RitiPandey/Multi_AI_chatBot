const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ✅ Answer fetcher
async function getAnswer(provider, query) {
  try {
    if (provider === "openai") {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: query }],
      });
      return completion.choices[0].message.content;
    }



      if (provider === "gemini") {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
      const result = await model.generateContent({ prompt: query });
      return result?.candidates?.[0]?.content ?? result?.response?.text?.() ?? "No content returned.";
    }

    if (provider === "groq") {
      const completion = await groq.chat.completions.create({
        model: "	llama-3.1-8b-instant",
        messages: [{ role: "user", content: query }],
      });
      return completion.choices[0].message.content;
    }

    return "❌ Invalid provider selected.";
  } catch (error) {
    console.error("AI client error:", error);
    return "⚠️ Error while fetching response from AI.";
  }
}

module.exports = { getAnswer };
