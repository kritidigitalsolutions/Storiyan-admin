// controllers/authController.js
const Otp = require("../../models/otp.model");
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

// STEP 1: Generate and Send OTP (Returns OTP in response)
exports.sendOtp = async (req, res) => {
  try {
    const { phone, language } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    // Generate a random 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save or update OTP in the database
    await Otp.findOneAndUpdate(
      { phone },
      { phone, language: language || "Hindi", otp: generatedOtp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Returning OTP in the response for developer testing & Flutter app
    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      language: language || "Hindi",
      otp: generatedOtp,
      phone,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// STEP 2: Verify OTP & Login/Signup (Deletes OTP on success)
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: "Phone and OTP are required" });
    }

    // Master OTP 123456 bypass for app store review & quick testing
    let isMatch = otp === "123456";

    if (!isMatch) {
      const otpRecord = await Otp.findOne({ phone });
      if (!otpRecord) {
        return res.status(400).json({ success: false, message: "OTP expired or not found. Please request a new one." });
      }

      if (otpRecord.otp !== otp) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }

      await Otp.deleteOne({ phone });
      isMatch = true;
    }

    // Find or create user
    let user = await User.findOne({ phone });
    let isNewUser = false;

    if (!user) {
      user = await User.create({
        phone,
        fullName: "Storiyan User",
        walletCoins: 20,
        tier: "Free User",
        status: "active",
      });
      isNewUser = true;
    }

    if (user.status === "banned") {
      return res.status(403).json({ success: false, message: "Account has been suspended by administration" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, _id: user._id, phone: user.phone },
      process.env.JWT_SECRET || "your_fallback_secret",
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      success: true,
      message: isNewUser ? "Signup successful" : "Login successful",
      token,
      user: {
        id: user._id,
        _id: user._id,
        phone: user.phone,
        fullName: user.fullName,
        profileImage: user.profileImage,
        walletCoins: user.walletCoins,
        tier: user.tier,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
