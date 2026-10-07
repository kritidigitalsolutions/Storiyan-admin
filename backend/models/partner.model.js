const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=120&auto=format&fit=crop&q=80",
    },
    contractType: {
      type: String,
      enum: ["Revenue Share", "Fixed License", "Co-Production"],
      default: "Revenue Share",
    },
    revSharePercentage: {
      type: Number,
      default: 70,
    },
    totalSeries: {
      type: Number,
      default: 0,
    },
    activeEpisodes: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    pendingPayout: {
      type: Number,
      default: 0,
    },
    payoutStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Paid",
    },
    contactEmail: {
      type: String,
      trim: true,
      default: "",
    },
    contactPhone: {
      type: String,
      trim: true,
      default: "",
    },
    joinedDate: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", partnerSchema);
