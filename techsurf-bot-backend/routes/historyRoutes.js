const express = require("express");
const router = express.Router();
const auth = require("../utils/authMiddleware");
const Chat = require("../models/chatModel");

router.get("/", auth, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(200);
    res.json({ chats });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
