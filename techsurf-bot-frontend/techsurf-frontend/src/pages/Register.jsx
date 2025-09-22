// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { BASE_URL } from "../config";

// // function Register() {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleRegister = async () => {
// //     try {
// //       await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
// //       alert("✅ Registered successfully! Please login.");
// //       navigate("/login");
// //     } catch (err) {
// //       alert("Registration failed: " + (err.response?.data?.error || err.message));
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
// //       <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
// //         <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Register</h2>
// //         <input type="text" placeholder="Name" className="w-full mb-3 p-3 border rounded-lg" value={name} onChange={e => setName(e.target.value)} />
// //         <input type="email" placeholder="Email" className="w-full mb-3 p-3 border rounded-lg" value={email} onChange={e => setEmail(e.target.value)} />
// //         <input type="password" placeholder="Password" className="w-full mb-3 p-3 border rounded-lg" value={password} onChange={e => setPassword(e.target.value)} />
// //         <button onClick={handleRegister} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Register</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Register;
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BACKEND_URL } from "../config";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       await axios.post(`${BACKEND_URL}/auth/register`, { name, email, password });
//       alert("✅ Registered! Please login.");
//       navigate("/login");
//     } catch (err) {
//       alert("Registration failed: " + (err.response?.data?.error || err.message));
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Register</h2>
//         <input type="text" placeholder="Name" className="w-full mb-3 p-3 border rounded-lg" value={name} onChange={(e)=>setName(e.target.value)} />
//         <input type="email" placeholder="Email" className="w-full mb-3 p-3 border rounded-lg" value={email} onChange={(e)=>setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" className="w-full mb-3 p-3 border rounded-lg" value={password} onChange={(e)=>setPassword(e.target.value)} />
//         <button onClick={handleRegister} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Register</button>
//         <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-purple-600">Login</Link></p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post(`${BACKEND_URL}/auth/register`, { name, email, password });
      alert("✅ Registered! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-3 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
        />
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
        <button onClick={handleRegister} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-purple-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

