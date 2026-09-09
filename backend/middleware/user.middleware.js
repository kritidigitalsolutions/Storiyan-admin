const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("isAuth middleware - Authorization header:", authHeader ? "Present" : "Missing");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("isAuth failed: No bearer token");
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("isAuth passed - User:", decoded.id);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("isAuth failed:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = isAuth;
