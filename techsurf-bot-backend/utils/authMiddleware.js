
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
