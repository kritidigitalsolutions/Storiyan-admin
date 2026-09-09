// controllers/authController.js
const Otp = require("../../models/otp.model");
const User = require("../../models/user.model"); // Create a basic User model with 'phone'
const jwt = require("jsonwebtoken");

// STEP 1: Generate and Send OTP (Returns OTP in response)
exports.sendOtp = async (req, res) => {
    try {
        const { phone, language } = req.body;
        if (!phone) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        // Generate a random 6-digit OTP
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save or update OTP in the database (Upsert handles resending before expiration)
        await Otp.findOneAndUpdate(
            { phone },
            { language },
            { otp: generatedOtp, createdAt: Date.now() },
            { upsert: true, new: true }
        );

        // Returning OTP in the response as requested (No third-party SMS API needed)
        return res.status(200).json({
            message: "OTP generated successfully",
            language: language,
            otp: generatedOtp, // <-- Use this on your frontend for testing
            phone
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// STEP 2: Verify OTP & Login/Signup (Deletes OTP on success)
exports.verifyOtp = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        if (!phone || !otp) {
            return res.status(400).json({ message: "Phone and OTP are required" });
        }

        // 1. Find the OTP record
        const otpRecord = await Otp.findOne({ phone });
        if (!otpRecord) {
            return res.status(400).json({ message: "OTP expired or not found. Please request a new one." });
        }

        // 2. Validate OTP
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // 3. Delete OTP record immediately after successful matching
        await Otp.deleteOne({ phone });

        // 4. Check if user already exists, if not, sign them up (create account)
        let user = await User.findOne({ phone });
        let isNewUser = false;

        if (!user) {
            user = await User.create({ phone });
            isNewUser = true;
        }

        // 5. Generate JWT Session Token
        const token = jwt.sign(
            { id: user._id, phone: user.phone },
            process.env.JWT_SECRET || "your_fallback_secret",
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: isNewUser ? "Signup successful" : "Login successful",
            token,
            user: { id: user._id, phone: user.phone }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
