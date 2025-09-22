// const OpenAI = require("openai");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const Groq = require("groq-sdk");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// // ✅ Answer fetcher
// async function getAnswer(provider, query) {
//   try {
//     if (provider === "openai") {
//       const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: query }],
//       });
//       return completion.choices[0].message.content;
//     }

//     if (provider === "gemini") {
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//       const result = await model.generateContent(query);
//       return result.response.text();
//     }

//     if (provider === "groq") {
//       const completion = await groq.chat.completions.create({
//         model: "llama3-8b-8192",
//         messages: [{ role: "user", content: query }],
//       });
//       return completion.choices[0].message.content;
//     }

//     return "❌ Invalid provider selected.";
//   } catch (error) {
//     console.error("AI client error:", error);
//     return "⚠️ Error while fetching response from AI.";
//   }
// }

// module.exports = { getAnswer };
const OpenAI = require("openai");
const Groq = require("groq-sdk");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY, baseURL: "https://api.groq.com" }) : null;
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// provider param: "groq" | "openai" | "gemini"
async function getAnswer(provider, question, context = "") {
  try {
    if (provider === "groq" && groq) {
      // Use a conservative model name; your account may have different models; update if needed
      const model = "llama-3.1-8b-instant";
      const messages = [
        { role: "system", content: "You are a helpful assistant that answers based on the content provided." },
        { role: "user", content: `${context}\n\nQuestion: ${question}` }
      ];
      const completion = await groq.chat.completions.create({ model, messages });
      return completion.choices?.[0]?.message?.content ?? "⚠️ Groq returned no content.";
    }

    if (provider === "openai" && openai) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant that answers based on the content provided." },
          { role: "user", content: `${context}\n\nQuestion: ${question}` }
        ],
      });
      return completion.choices?.[0]?.message?.content ?? "⚠️ OpenAI returned no content.";
    }

    if (provider === "gemini" && genAI) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5" }); // check available model names in your Google console
      const result = await model.generateContent({ prompt: `${context}\n\nQuestion: ${question}` });
      return result?.candidates?.[0]?.content ?? result?.response?.text?.() ?? "⚠️ Gemini returned no content.";
    }

    return "⚠️ No AI provider available - please configure API keys or choose Groq.";
  } catch (err) {
    console.error("AI client error:", err);
    // If provider gave rate-limit or decommissioned-model errors, return a friendly message
    if (err.status === 429 || err.code === "insufficient_quota") {
      return "⚠️ Provider quota exceeded (429). Try another provider or check billing.";
    }
    if (err.code === "model_decommissioned" || (err.error && err.error.code === "model_decommissioned")) {
      return "⚠️ The requested model is decommissioned. Please update the model name in backend.";
    }
    return "⚠️ Error while fetching response from AI provider.";
  }
}

module.exports = { getAnswer };
