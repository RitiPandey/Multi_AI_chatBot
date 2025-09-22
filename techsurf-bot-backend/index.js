// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/authRoutes");
// const botRoutes = require("./routes/botRoutes");
// const historyRoutes = require("./routes/historyRoutes");
// const webhookRoutes = require("./routes/webhookRoutes");

// const app = express();
// app.use(express.json());

// // ✅ CORS for frontend
// const corsOptions = {
//   origin: ["http://localhost:5173", "https://multi-ai-chatbot-0.onrender.com"], 
//   credentials: true,
// };
// app.use(cors(corsOptions));


// // Routes
// app.use("/auth", authRoutes);
// app.use("/ask", botRoutes);
// app.use("/history", historyRoutes);
// app.use("/webhook", webhookRoutes);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.error("MongoDB Error:", err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const botRoutes = require("./routes/botRoutes");
const historyRoutes = require("./routes/historyRoutes");
const webhookRoutes = require("./routes/webHookRoutes");

const app = express();
app.use(express.json());
app.use(cors());



// Route prefixes
app.use("/auth", authRoutes);       // /auth/register , /auth/login
app.use("/bot", botRoutes);         // /bot/ask
app.use("/history", historyRoutes); // /history
app.use("/webhook", webhookRoutes); // /webhook/contentstack

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
