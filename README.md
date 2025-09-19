# 🚀 Multi-AI Chatbot (Contentstack Powered)

## 📌 Problem Statement
Building a **multi-AI chatbot** that integrates **Contentstack CMS** and multiple LLMs (OpenAI, Gemini, Groq).  
The chatbot should fetch FAQs and content dynamically from Contentstack and answer user queries in real time.  

Key Features:  
- Fetch FAQs from **Contentstack CMS**  
- Support multiple AI providers (**OpenAI, Gemini, Groq**)  
- SDK for easy integration into client websites  
- Attractive UI with dropdown for provider selection  
- Logout functionality  

---

## 💡 Abstract
In businesses and customer support, FAQs are mostly static.  
We aimed to create a **dynamic chatbot** that:  
1. Fetches FAQs from Contentstack.  
2. Enhances responses using AI models (OpenAI, Gemini, Groq).  
3. Provides a plug-and-play SDK for client integration.  

This makes customer interaction more **efficient, real-time, and scalable**.

---

## ⚙️ Tools & Technologies
- **Frontend:** React (Vite) + TailwindCSS  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB  
- **CMS:** Contentstack (for FAQ & content management)  
- **AI Providers:** OpenAI, Gemini, Groq  
- **Version Control:** Git + GitHub  

---

## 🛠️ Implementation Steps
1. **Setup Backend**
   - Initialized Node.js + Express server.
   - Configured MongoDB for storing chat history.
   - Integrated Contentstack SDK to fetch FAQ entries.
   - Created routes for chatbot queries.

2. **Setup AI Clients**
   - Integrated **OpenAI, Gemini, Groq** with API keys.
   - Backend decides AI provider (based on dropdown).
   - AI first checks Contentstack FAQs, then responds.

3. **Frontend (React)**
   - Built chatbot UI with message bubbles.
   - Added dropdown to choose AI provider.
   - Added **Logout button** below send button.
   - Styled with TailwindCSS for a modern look.

4. **Deployment**
   - Code pushed to GitHub.
   - Backend hosted on Render / Railway.
   - Frontend hosted on Vercel / Netlify.

---

## 📋 How to Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/YourUserName/Multi_AI_chatBot.git
   cd Multi_AI_chatBot
