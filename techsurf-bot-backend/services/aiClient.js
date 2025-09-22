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
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(query);
      return result.response.text();
    }

    if (provider === "groq") {
      const completion = await groq.chat.completions.create({
        model: "llama3-8b-8192",
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
