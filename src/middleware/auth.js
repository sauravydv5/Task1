const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Header से token
  const header = req.headers.authorization || "";
  let token = header.startsWith("Bearer ") ? header.slice(7) : null;

  // Cookie से token (fallback)
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // payload => { id: user._id }
    next();
  } catch (err) {
    console.log("JWT error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { auth };
