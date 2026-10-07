const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    audience: {
      type: String,
      default: "All Users",
    },
    targetRoute: {
      type: String,
      default: "/home",
    },
    seriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      default: null,
    },
    mediaUrl: {
      type: String,
      default: "",
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["sent", "draft", "scheduled"],
      default: "sent",
    },
    totalDelivered: {
      type: Number,
      default: 0,
    },
    openRate: {
      type: Number,
      default: 0,
    },
    clickRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
