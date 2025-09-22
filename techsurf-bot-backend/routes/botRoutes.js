// // const express = require("express");
// // const router = express.Router();
// // const authMiddleware = require("../utils/authMiddleware");
// // const { getAnswer } = require("../services/aiClient");
// // const { searchFAQ } = require("../services/contentstackService");

// // router.post("/ask", authMiddleware, async (req, res) => {
// //   try {
// //     const { question, provider } = req.body;
// //     const faqAnswer = await searchFAQ(question);
// //     if (faqAnswer) return res.json({ answer: faqAnswer, source: "contentstack" });

// //     const aiAnswer = await getAnswer(provider, question);
// //     res.json({ answer: aiAnswer, source: provider });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const { getAnswer } = require("../services/aiClient");
// const { searchFAQ } = require("../services/contentstackService");
// const authMiddleware = require("../utils/authMiddleware");

// // POST /ask
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { question, provider } = req.body;
//     if (!question) return res.status(400).json({ error: "Question required" });

//     // Check FAQ
//     const faqAnswer = await searchFAQ(question);
//     if (faqAnswer) return res.json({ answer: faqAnswer, source: "contentstack" });

//     // AI Provider
//     const aiAnswer = await getAnswer(provider, question);
//     res.json({ answer: aiAnswer, source: provider });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const { searchFAQ } = require("../services/contentstackService");
const { getAnswer } = require("../services/aiClient");
// const Chat = require("../models/chatModel");
const Chat = require("../models/chatModel");


//POST /bot/ask
router.post("/ask", authMiddleware, async (req, res) => {
  try {
    const { question, provider } = req.body;
    if (!question) return res.status(400).json({ error: "Missing question" });


    
    
    // 1) Try Contentstack FAQ first
    const faq = await searchFAQ(question);
    if (faq) {
      // Save chat history
      const chat = new Chat({ userId: req.user.id, question, answer: faq, provider: "contentstack", source: "contentstack" });
      await chat.save();
      return res.json({ answer: faq, source: "contentstack" });
    }



    // 2) Not found in Contentstack -> call AI provider
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
