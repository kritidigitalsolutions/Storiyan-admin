// controllers/adminController.js
const Admin = require("../../models/admin.model"); // Adjust path as needed
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if admin exists
        const admin = await Admin.findOne({ email: email.toLowerCase() });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 2. Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 3. Generate JWT Token
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || "your_fallback_secret",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            admin: { id: admin._id, email: admin.email, role: admin.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
