


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Root route redirects based on token */}
        <Route path="/" element={token ? <Navigate to="/chat" /> : <Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        {/* Protected route */}
        <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
