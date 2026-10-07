const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    coverVertical: {
      type: String,
      default: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80",
    },
    bannerHorizontal: {
      type: String,
      default: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80",
    },
    genre: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      default: "Fast-paced vertical drama streaming exclusively on Storiyan.",
    },
    totalEpisodes: {
      type: Number,
      default: 10,
    },
    publishedEpisodesCount: {
      type: Number,
      default: 0,
    },
    releaseYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    ageRating: {
      type: String,
      default: "16+",
    },
    trendingRank: {
      type: Number,
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewRelease: {
      type: Boolean,
      default: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner",
      default: null,
    },
    partnerName: {
      type: String,
      default: "Storiyan Originals",
    },
    partnerLogo: {
      type: String,
      default: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=120&auto=format&fit=crop&q=80",
    },
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "published",
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    revenueTotal: {
      type: Number,
      default: 0,
    },
    director: {
      type: String,
      default: "Storiyan Studio Director",
    },
    cast: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

seriesSchema.pre("save", function () {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
  }
});

module.exports = mongoose.model("Series", seriesSchema);
