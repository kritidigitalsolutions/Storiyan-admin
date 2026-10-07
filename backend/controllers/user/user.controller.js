const User = require("../../models/user.model");
const Series = require("../../models/series.model");
const Episode = require("../../models/episode.model");
const Plan = require("../../models/plan.model");
const Subscription = require("../../models/subscription.model");
const Transaction = require("../../models/transaction.model");
const Notification = require("../../models/notification.model");
const LegalDoc = require("../../models/legalDoc.model");
const FAQ = require("../../models/faq.model");
const ContactInquiry = require("../../models/contactInquiry.model");
const WatchHistory = require("../../models/watchHistory.model");
const Watchlist = require("../../models/watchlist.model");

// ==================== USER PROFILE ====================
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check active subscription
    const activeSub = await Subscription.findOne({
      userId: user._id,
      status: "active",
      expiryDate: { $gt: new Date() },
    }).sort({ expiryDate: -1 });

    const data = user.toObject();
    data.activeSubscription = activeSub || null;
    data.hasActivePass = Boolean(activeSub);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { fullName, email, profileImage, preferredLanguage } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (email !== undefined) user.email = email;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (preferredLanguage !== undefined) user.preferredLanguage = preferredLanguage;

    await user.save();
    res.status(200).json({ success: true, message: "Profile updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== HOME & CATALOG APIS ====================
exports.getSeriesList = async (req, res) => {
  try {
    const { search, genre, limit = 20, page = 1 } = req.query;
    let query = { status: "published" };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (genre && genre !== "All") {
      query.genre = genre;
    }

    const total = await Series.countDocuments(query);
    const seriesList = await Series.find(query)
      .sort({ trendingRank: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      data: seriesList,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFeaturedSeries = async (req, res) => {
  try {
    const featured = await Series.find({ status: "published", isFeatured: true }).limit(5);
    res.status(200).json({ success: true, count: featured.length, data: featured });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTrendingSeries = async (req, res) => {
  try {
    const trending = await Series.find({ status: "published" })
      .sort({ trendingRank: 1, viewsCount: -1 })
      .limit(10);
    res.status(200).json({ success: true, count: trending.length, data: trending });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getNewReleases = async (req, res) => {
  try {
    const newReleases = await Series.find({ status: "published", isNewRelease: true })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json({ success: true, count: newReleases.length, data: newReleases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSeriesDetails = async (req, res) => {
  try {
    const { id } = req.params;
    let series;

    // Check by ID or Slug
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      series = await Series.findById(id);
    } else {
      series = await Series.findOne({ slug: id });
    }

    if (!series) {
      return res.status(404).json({ success: false, message: "Series not found" });
    }

    const episodes = await Episode.find({ seriesId: series._id, status: "published" }).sort({ epNumber: 1 });

    // Determine user unlock status if authenticated
    let user = req.user ? await User.findById(req.user._id) : null;
    let hasActiveSubscription = false;

    if (user) {
      const activeSub = await Subscription.findOne({
        userId: user._id,
        status: "active",
        expiryDate: { $gt: new Date() },
      });
      hasActiveSubscription = Boolean(activeSub);
    }

    const unlockedSet = new Set((user?.unlockedEpisodes || []).map((e) => e.toString()));

    const mappedEpisodes = episodes.map((ep) => {
      const isUnlocked = ep.isFree || hasActiveSubscription || unlockedSet.has(ep._id.toString());
      const epObj = ep.toObject();
      return {
        ...epObj,
        isUnlocked,
        // Hide full videoUrl if locked and not free
        videoUrl: isUnlocked ? ep.videoUrl : "",
      };
    });

    // Check if in user watchlist
    let isSavedInWatchlist = false;
    if (user) {
      const watchItem = await Watchlist.findOne({ userId: user._id, seriesId: series._id });
      isSavedInWatchlist = Boolean(watchItem);
    }

    const seriesData = series.toObject();
    seriesData.episodes = mappedEpisodes;
    seriesData.isSavedInWatchlist = isSavedInWatchlist;

    res.status(200).json({ success: true, data: seriesData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== EPISODE PLAYBACK & UNLOCK ====================
exports.getEpisodeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findById(id);
    if (!episode) {
      return res.status(404).json({ success: false, message: "Episode not found" });
    }

    let isUnlocked = episode.isFree;
    let user = req.user ? await User.findById(req.user._id) : null;

    if (user) {
      const activeSub = await Subscription.findOne({
        userId: user._id,
        status: "active",
        expiryDate: { $gt: new Date() },
      });
      if (activeSub) isUnlocked = true;
      if (user.unlockedEpisodes && user.unlockedEpisodes.some((e) => e.toString() === episode._id.toString())) {
        isUnlocked = true;
      }
    }

    const epData = episode.toObject();
    epData.isUnlocked = isUnlocked;
    if (!isUnlocked) {
      epData.videoUrl = "";
    }

    res.status(200).json({ success: true, data: epData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.unlockEpisode = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const episode = await Episode.findById(id);
    if (!episode) {
      return res.status(404).json({ success: false, message: "Episode not found" });
    }

    if (episode.isFree) {
      return res.status(200).json({
        success: true,
        message: "Episode is already free to watch.",
        data: episode,
      });
    }

    // Check if already unlocked
    if (user.unlockedEpisodes && user.unlockedEpisodes.some((e) => e.toString() === episode._id.toString())) {
      return res.status(200).json({
        success: true,
        message: "Episode already unlocked.",
        data: episode,
      });
    }

    const coinCost = episode.costInCoins || 5;
    if ((user.walletCoins || 0) < coinCost) {
      return res.status(400).json({
        success: false,
        message: `Insufficient coins. You have ${user.walletCoins || 0} coins, but this episode requires ${coinCost} coins. Please recharge your wallet.`,
        requiredCoins: coinCost,
        currentCoins: user.walletCoins || 0,
      });
    }

    // Deduct coins & unlock episode
    user.walletCoins -= coinCost;
    user.unlockedEpisodes.push(episode._id);
    await user.save();

    // Log transaction
    await Transaction.create({
      userId: user._id,
      userName: user.fullName,
      userPhone: user.phone,
      type: "EPISODE_UNLOCK",
      coins: coinCost,
      description: `Unlocked Episode ${episode.epNumber}: ${episode.title}`,
      status: "SUCCESS",
      metadata: {
        seriesId: episode.seriesId,
        episodeId: episode._id,
      },
    });

    res.status(200).json({
      success: true,
      message: `Episode unlocked successfully for ${coinCost} coins!`,
      remainingCoins: user.walletCoins,
      data: episode,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.likeEpisode = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id);
    if (!episode) {
      return res.status(404).json({ success: false, message: "Episode not found" });
    }

    episode.likes = (episode.likes || 0) + 1;
    await episode.save();

    res.status(200).json({ success: true, message: "Liked episode", likes: episode.likes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.recordEpisodeView = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id);
    if (!episode) {
      return res.status(404).json({ success: false, message: "Episode not found" });
    }

    episode.views = (episode.views || 0) + 1;
    await episode.save();

    // Also increment Series view count
    await Series.findByIdAndUpdate(episode.seriesId, { $inc: { viewsCount: 1 } });

    res.status(200).json({ success: true, message: "View recorded" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== WATCH HISTORY & WATCHLIST ====================
exports.getWatchHistory = async (req, res) => {
  try {
    const history = await WatchHistory.find({ userId: req.user._id })
      .populate("seriesId")
      .populate("episodeId")
      .sort({ lastWatchedAt: -1 })
      .limit(30);

    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveWatchProgress = async (req, res) => {
  try {
    const { seriesId, episodeId, progressSeconds, durationSeconds, completed } = req.body;

    const record = await WatchHistory.findOneAndUpdate(
      { userId: req.user._id, seriesId, episodeId },
      {
        progressSeconds: Number(progressSeconds) || 0,
        durationSeconds: Number(durationSeconds) || 180,
        completed: Boolean(completed),
        lastWatchedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    // Update user watch time minutes
    if (progressSeconds > 10) {
      const minutes = Math.round(progressSeconds / 60);
      await User.findByIdAndUpdate(req.user._id, { $inc: { watchTimeMinutes: Math.max(1, minutes) } });
    }

    res.status(200).json({ success: true, message: "Playback progress saved", data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.user._id }).populate("seriesId").sort({ addedAt: -1 });
    const series = watchlist.map((w) => w.seriesId).filter(Boolean);
    res.status(200).json({ success: true, count: series.length, data: series });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleWatchlist = async (req, res) => {
  try {
    const { seriesId } = req.body;
    const existing = await Watchlist.findOne({ userId: req.user._id, seriesId });

    if (existing) {
      await Watchlist.deleteOne({ _id: existing._id });
      return res.status(200).json({ success: true, message: "Removed from watchlist", isSaved: false });
    } else {
      await Watchlist.create({ userId: req.user._id, seriesId });
      return res.status(200).json({ success: true, message: "Added to watchlist", isSaved: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== SUBSCRIPTIONS & PASS PURCHASES ====================
exports.getActivePlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ price: 1 });
    res.status(200).json({ success: true, count: plans.length, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.purchaseSubscriptionPass = async (req, res) => {
  try {
    const { planId, paymentMethod = "UPI" } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const plan = await Plan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(404).json({ success: false, message: "Subscription plan not found or inactive" });
    }

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (plan.durationDays || 1));

    const subscription = await Subscription.create({
      userId: user._id,
      userName: user.fullName,
      userPhone: user.phone,
      userAvatar: user.profileImage,
      planId: plan._id,
      planName: plan.name,
      amountPaid: plan.price,
      paymentMethod,
      paymentStatus: "SUCCESS",
      startDate,
      expiryDate,
      status: "active",
      autoDebit: Boolean(plan.autoDebitSupported),
    });

    // Update User Tier & Total Spent
    user.tier = plan.name;
    user.totalSpent = (user.totalSpent || 0) + plan.price;
    // Add bonus coins if monthly pass
    if (plan.price >= 99) {
      user.walletCoins = (user.walletCoins || 0) + 100;
    }
    await user.save();

    // Increment plan subscriber counter
    plan.subscribersCount = (plan.subscribersCount || 0) + 1;
    await plan.save();

    // Create financial transaction
    await Transaction.create({
      userId: user._id,
      userName: user.fullName,
      userPhone: user.phone,
      type: "SUBSCRIPTION_PASS",
      amount: plan.price,
      description: `Purchased ${plan.name} (${plan.durationDays} Days Pass)`,
      paymentMethod,
      status: "SUCCESS",
      metadata: { planId: plan._id },
    });

    res.status(200).json({
      success: true,
      message: `Pass activated! You now have full access until ${expiryDate.toLocaleDateString()}.`,
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMySubscription = async (req, res) => {
  try {
    const activeSub = await Subscription.findOne({
      userId: req.user._id,
      status: "active",
      expiryDate: { $gt: new Date() },
    }).sort({ expiryDate: -1 });

    res.status(200).json({
      success: true,
      hasActiveSubscription: Boolean(activeSub),
      data: activeSub || null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== COIN WALLET ====================
exports.getWalletInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const transactions = await Transaction.find({ userId: user._id }).sort({ createdAt: -1 }).limit(20);

    res.status(200).json({
      success: true,
      data: {
        walletCoins: user.walletCoins || 0,
        totalSpent: user.totalSpent || 0,
        transactions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addCoins = async (req, res) => {
  try {
    const { coins, amount, paymentMethod = "UPI" } = req.body;
    const coinCount = Number(coins);
    const amountVal = Number(amount);

    if (!coinCount || coinCount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid coin amount" });
    }

    const user = await User.findById(req.user._id);
    user.walletCoins = (user.walletCoins || 0) + coinCount;
    user.totalSpent = (user.totalSpent || 0) + (amountVal || 0);
    await user.save();

    await Transaction.create({
      userId: user._id,
      userName: user.fullName,
      userPhone: user.phone,
      type: "COIN_PURCHASE",
      amount: amountVal || 0,
      coins: coinCount,
      description: `Recharged ${coinCount} Creator Coins`,
      paymentMethod,
      status: "SUCCESS",
    });

    res.status(200).json({
      success: true,
      message: `Successfully credited ${coinCount} coins to your wallet!`,
      walletCoins: user.walletCoins,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== NOTIFICATIONS FEED ====================
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ status: "sent" }).sort({ sentAt: -1 }).limit(20);
    res.status(200).json({ success: true, count: notifications.length, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== FAQS & LEGAL DOCS ====================
exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLegalDoc = async (req, res) => {
  try {
    const doc = await LegalDoc.findOne({ slug: req.params.slug });
    if (!doc) {
      return res.status(404).json({ success: false, message: "Policy document not found" });
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== CONTACT SUPPORT ====================
exports.createContactInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, category, message } = req.body;
    const inquiry = await ContactInquiry.create({
      userId: req.user ? req.user._id : null,
      name: name || (req.user ? req.user.fullName : "Mobile User"),
      email: email || (req.user ? req.user.email : "user@storiyan.tv"),
      phone: phone || (req.user ? req.user.phone : ""),
      subject: subject || "Support Request",
      category: category || "General Inquiry",
      message,
      status: "new",
      priority: "medium",
    });

    res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted. Our support team will get back to you shortly.",
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyInquiries = async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
