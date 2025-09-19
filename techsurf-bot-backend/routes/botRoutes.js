const express = require("express");
const router = express.Router();
const { getAnswer } = require("../services/aiClient");
const { searchFAQ } = require("../services/contentstackService");
const authMiddleware = require("../utils/authMiddleware");

router.post("/ask-bot", authMiddleware, async (req, res) => {
  const { question, provider } = req.body;

  try {

    const faqAnswer = await searchFAQ(question);

    if (faqAnswer) {
      return res.json({ answer: faqAnswer + " (📦 from Contentstack)" });
    }

 
    const aiAnswer = await getAnswer(question, provider || "groq");
    res.json({ answer: aiAnswer });
  } catch (err) {
    console.error("Bot error:", err);
    res.status(500).json({ answer: "⚠️ Error while fetching response." });
  }
});

module.exports = router;
