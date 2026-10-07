const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
  {
    seriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      required: true,
      index: true,
    },
    epNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    synopsis: {
      type: String,
      default: "",
    },
    durationSeconds: {
      type: Number,
      default: 180,
    },
    durationFormatted: {
      type: String,
      default: "03:00",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      required: true,
      default: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    costInCoins: {
      type: Number,
      default: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Episode", episodeSchema);
