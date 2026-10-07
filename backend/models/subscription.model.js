const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    userName: {
      type: String,
      default: "User",
    },
    userPhone: {
      type: String,
      default: "",
    },
    userAvatar: {
      type: String,
      default: "",
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "UPI",
    },
    paymentStatus: {
      type: String,
      enum: ["SUCCESS", "REFUNDED", "FAILED"],
      default: "SUCCESS",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "expiring_soon"],
      default: "active",
    },
    autoDebit: {
      type: Boolean,
      default: false,
    },
    refundReason: {
      type: String,
      default: "",
    },
    refundedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
