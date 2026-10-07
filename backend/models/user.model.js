const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      default: "Storiyan User",
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    profileImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    },
    tier: {
      type: String,
      default: "Free User",
    },
    walletCoins: {
      type: Number,
      default: 20,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    watchTimeMinutes: {
      type: Number,
      default: 0,
    },
    unlockedEpisodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episode",
      },
    ],
    savedSeriesIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Series",
      },
    ],
    status: {
      type: String,
      enum: ["active", "banned", "inactive"],
      default: "active",
    },
    preferredLanguage: {
      type: String,
      default: "Hindi",
    },
    deviceInfo: {
      type: String,
      default: "Flutter Mobile App",
    },
    ipAddress: {
      type: String,
      default: "127.0.0.1",
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);