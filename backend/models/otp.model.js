const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    language: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
})

module.exports = mongoose.model("Otp", otpSchema)