import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/chat");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <button onClick={handleLogin} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          Login
        </button>
        <p className="text-center mt-4">
          Don’t have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
}
