// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };


// const jwt = require("jsonwebtoken");
// module.exports = (req, res, next) => {
//   const auth = req.headers["authorization"];
//   if (!auth) return res.status(401).json({ error: "Unauthorized" });
//   const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };



const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Authorization header se token nikalna
  const auth = req.headers["authorization"];
  if (!auth) {
    // Agar header me token nahi hai to unauthorized response do
    return res.status(401).json({ error: "Unauthorized" });
  }

  // "Bearer <token>" format se token alag karna
  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;

  try {
    // Token ko verify karo using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify hone par request me user info add karo
    req.user = decoded;

    // Agla middleware ya route handler ko call karo
    next();
  } catch (err) {
    // Verification fail hone par unauthorized response do
    res.status(401).json({ error: "Invalid token" });
  }
};
