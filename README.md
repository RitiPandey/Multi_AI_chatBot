# 🤖 Multi AI Chatbot – Contentstack Powered

## 📌 Problem Statement
Today’s users expect **intelligent, responsive, and dynamic** chatbots that can answer queries from multiple sources.  
The challenge was to build a **multi-AI powered chatbot** that:
- Integrates with **Contentstack CMS** for dynamic FAQ/data.  
- Supports multiple LLMs (**OpenAI, Groq, Gemini**).  
- Provides a seamless **frontend + backend** experience.  

---

## 💡 Our Solution
We built a **Multi-AI Chatbot** that combines the power of LLMs with Contentstack’s real-time content management.  

✨ Key Highlights:
- Content is stored and managed in **Contentstack CMS**.  
- Chatbot answers are powered by **OpenAI, Groq, and Gemini APIs**.  
- If data is available in Contentstack, chatbot fetches it **first**.  
- Easy UI: dropdown to choose model, logout button, clean UI.  
- Deployed via GitHub (ready for hosting).  

---

## 📝 Abstract
This project demonstrates how **Server-Driven UI** and **Multi-AI architecture** can be combined with **Contentstack Webhooks** to provide real-time, context-aware chatbot solutions.  

It is **scalable**, **flexible**, and can be applied to domains like:  
- Blogs  
- E-Commerce FAQs  
- Travel assistance  
- Educational bots  

---

## 🛠️ Tools & Technologies
- **Frontend**: React (Vite) + TailwindCSS  
- **Backend**: Node.js + Express  
- **Database**: MongoDB (for storing sessions/logs)  
- **CMS**: Contentstack (for FAQs/content entries)  
- **AI Models**: OpenAI GPT, Groq LLaMA, Google Gemini  
- **Version Control**: Git & GitHub  

---

## ⚙️ Implementation Steps
1. **Setup CMS (Contentstack)**  
   - Created `FAQ` content type with `question` and `answer` fields.  
   - Added multiple entries for FAQs.  

2. **Backend Setup**  
   - Integrated **Contentstack SDK** to fetch content dynamically.  
   - Built API routes for chatbot queries.  
   - Connected OpenAI, Groq, and Gemini clients.  

3. **Frontend Setup**  
   - Built chatbot UI with React (Vite).  
   - Added dropdown to select AI model.  
   - Added **logout button** and styling for clean UX.  

4. **Integration**  
   - User enters query → Backend checks Contentstack FAQ → If found, returns answer → Else queries AI.  

5. **Deployment**  
   - Code managed on GitHub.  
   - Environment variables (`.env`) are **secured** (not pushed).  

---

## 👩‍💻 How We Built It (Humanized Explanation)
We started with the **Contentstack 101 course**, understood how content models work, and created an FAQ structure.  
Next, we built a Node.js backend to connect Contentstack + AI models.  
On the frontend, we designed a **simple, attractive chat interface** with dropdown model selection.  

Finally, we tested everything by storing FAQs in Contentstack and asking our chatbot — it correctly answered using stored content first, then AI fallback.  

---

## 🚀 Future Scope
- Voice-enabled chatbot.  
- Analytics dashboard for query tracking.  
- Multi-language support.  
- Deployment on cloud platforms (Vercel/Netlify + Render/Heroku).  

---

## 🙌 Team & Acknowledgements
Built during **TechSurf Hackathon 2025** ✨  
Powered by **Contentstack** and integrated with **multi-AI technologies**.  

---

