const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    userName: {
      type: String,
      default: "",
    },
    userPhone: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["COIN_PURCHASE", "EPISODE_UNLOCK", "SUBSCRIPTION_PASS", "REFUND", "PARTNER_PAYOUT", "BONUS_CREDIT"],
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    coins: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    paymentMethod: {
      type: String,
      default: "UPI",
    },
    referenceNo: {
      type: String,
      default: () => `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
    },
    status: {
      type: String,
      enum: ["SUCCESS", "PENDING", "REFUNDED", "FAILED"],
      default: "SUCCESS",
    },
    metadata: {
      seriesId: { type: mongoose.Schema.Types.ObjectId, ref: "Series" },
      episodeId: { type: mongoose.Schema.Types.ObjectId, ref: "Episode" },
      planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
      partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
