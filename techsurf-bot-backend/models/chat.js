


const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: String,
  answer: String,
  provider: String,
  source: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

