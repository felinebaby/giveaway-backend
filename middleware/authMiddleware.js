const admin = require("../config/firebaseAdmin");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.code);
    res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
