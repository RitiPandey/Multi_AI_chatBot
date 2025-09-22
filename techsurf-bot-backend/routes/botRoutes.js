const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const { searchFAQ } = require("../services/contentstackService");
const { getAnswer } = require("../services/aiClient");
// const Chat = require("../models/chatModel");
const Chat = require("../models/chatModel.js");


//POST /bot/ask
router.post("/ask", authMiddleware, async (req, res) => {
  try {
    const { question, provider } = req.body;
    if (!question) return res.status(400).json({ error: "Missing question" });


    
        const faq = await searchFAQ(question);
    if (faq) {
      // Save chat history
      const chat = new Chat({ userId: req.user.id, question, answer: faq, provider: "contentstack", source: "contentstack" });
      await chat.save();
      return res.json({ answer: faq, source: "contentstack" });
    }

    const usedProvider = provider || "groq";
    const aiAnswer = await getAnswer(usedProvider, question, "Answer using content context if available.");
    // Save
    const chat = new Chat({ userId: req.user.id, question, answer: aiAnswer, provider: usedProvider, source: "ai" });
    await chat.save();

    res.json({ answer: aiAnswer, source: usedProvider });
  } catch (err) {
    console.error("Bot error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
