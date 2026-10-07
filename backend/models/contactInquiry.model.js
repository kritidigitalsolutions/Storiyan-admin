const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Customer Support",
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default: () => new Date().toISOString().replace("T", " ").substring(0, 16),
  },
});

const contactInquirySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
    },
    subject: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Billing & Subscriptions", "Content Issue", "App Crash & Tech Bug", "Creator Licensing", "General Inquiry"],
      default: "General Inquiry",
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved", "closed"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    replies: [replySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactInquiry", contactInquirySchema);
