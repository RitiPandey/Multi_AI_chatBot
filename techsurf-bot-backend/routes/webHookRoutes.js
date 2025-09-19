const express = require("express");
const router = express.Router();

router.post("/contentstack", async (req, res) => {
  console.log("Webhook received:", req.body);
  res.json({ ok: true });
});
module.exports = router;
