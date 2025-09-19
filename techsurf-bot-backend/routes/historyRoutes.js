const express = require("express");
const router = express.Router();
const auth = require("../utils/authMiddleware");
const Chat = require("../models/chatmodel");


router.get("/", auth, async (req, res) => {
  const chats = await Chat.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(200);
  res.json({ chats });
});

module.exports = router;
