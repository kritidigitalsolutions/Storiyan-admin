const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // In local dev/testing if no token, check if header x-admin-bypass is present or return unauthorized
      return res.status(401).json({ success: false, message: "Unauthorized: Admin authorization token required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_fallback_secret");

    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.status === "suspended") {
      return res.status(403).json({ success: false, message: "Forbidden: Admin access restricted" });
    }

    req.admin = admin;
    req.user = { id: admin._id, role: admin.role, email: admin.email };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired admin token" });
  }
};

module.exports = isAdmin;