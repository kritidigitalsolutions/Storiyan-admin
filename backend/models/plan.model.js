const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    badge: {
      type: String,
      default: "Popular",
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    durationDays: {
      type: Number,
      required: true,
      default: 1,
    },
    description: {
      type: String,
      default: "Access vertical series ad-free",
    },
    features: [
      {
        type: String,
      },
    ],
    isAdFree: {
      type: Boolean,
      default: true,
    },
    hasLimitedAds: {
      type: Boolean,
      default: false,
    },
    isMostPopular: {
      type: Boolean,
      default: false,
    },
    isBestExperience: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    autoDebitSupported: {
      type: Boolean,
      default: false,
    },
    subscribersCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
