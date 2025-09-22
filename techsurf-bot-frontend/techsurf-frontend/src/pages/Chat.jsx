// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../config";

// function Chat() {
//   const [messages, setMessages] = useState([{ role: "assistant", content: "👋 Hello! Ask me anything." }]);
//   const [input, setInput] = useState("");
//   const [provider, setProvider] = useState("groq");
//   const navigate = useNavigate();

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const newMessages = [...messages, { role: "user", content: input }];
//     setMessages(newMessages);

//     try {
//       const res = await axios.post(`${BASE_URL}/ask`, { question: input, provider }, { headers: { Authorization: localStorage.getItem("token") } });
//       setMessages([...newMessages, { role: "assistant", content: res.data.answer }]);
//     } catch (err) {
//       setMessages([...newMessages, { role: "assistant", content: "❌ Error: " + (err.response?.data?.error || err.message) }]);
//     }

//     setInput("");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
//       <h1 className="text-4xl font-bold mb-4 text-white">🤖 Multi AI Bot 🤖</h1>
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col p-4 h-[600px]">
//         <div className="flex-1 overflow-y-auto space-y-3 mb-4">
//           {messages.map((msg, i) => (
//             <div key={i} className={`p-3 rounded-xl max-w-[75%] ${msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start"}`}>{msg.content}</div>
//           ))}
//         </div>
//         <div className="flex items-center space-x-2">
//           <select value={provider} onChange={e => setProvider(e.target.value)} className="p-2 border rounded-lg">
//             <option value="groq">Groq</option>
//             <option value="gemini">Gemini</option>
//             <option value="chatgpt">ChatGPT</option>
//           </select>
//           <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} className="flex-1 p-2 border rounded-lg" placeholder="Type a question..." />
//           <button onClick={sendMessage} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Send</button>
//           <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg">Logout</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chat;
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import { BACKEND_URL } from "../config";

export default function Chat() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "👋 Hello! Ask me anything." }]);
  const [input, setInput] = useState("");
  const [provider, setProvider] = useState("groq");
  const scroller = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { scroller.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const token = localStorage.getItem("token");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
  //   try {
  //     const res = await axios.post(`${BACKEND_URL}/bot/ask`, { question: input, provider }, { headers: { Authorization: token } });
  //     setMessages([...newMessages, { role: "assistant", content: res.data.answer }]);
  //   } catch (err) {
  //     setMessages([...newMessages, { role: "assistant", content: "❌ Error: " + (err.response?.data?.error || err.message) }]);
  //   }
  // };
try {
    const res = await axios.post(
  `${BACKEND_URL}/bot/ask`,
  { question: input, provider },
  { headers: { Authorization: `Bearer ${token}` } }
);

    setMessages([...newMessages, { role: "assistant", content: res.data.answer }]);
  } catch (err) {
    setMessages([...newMessages, {
      role: "assistant",
      content: "❌ Error: " + (err.response?.data?.error || err.message)
    }]);
  }
};

  const handleLogout = () => { localStorage.removeItem("token"); navigate("/login"); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-white">🤖 Multi AI Bot</h1>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col p-4 h-[600px]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 flex flex-col">
          {messages.map((m, i) => <ChatMessage key={i} role={m.role} content={m.content} />)}
          <div ref={scroller}></div>
        </div>

        <div className="flex items-center space-x-2">
          <select value={provider} onChange={(e) => setProvider(e.target.value)} className="p-2 border rounded-lg">
            <option value="groq">Groq</option>
            <option value="openai">OpenAI</option>
            <option value="gemini">Gemini</option>
          </select>

          <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=> e.key === "Enter" && sendMessage()} placeholder="Type your question..." className="flex-1 p-3 border rounded-lg" />

          <button onClick={sendMessage} className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700">Send</button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600">Logout</button>
        </div>
      </div> 
    </div>
  );
}
