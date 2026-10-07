const Series = require("../../models/series.model");
const Episode = require("../../models/episode.model");
const Partner = require("../../models/partner.model");
const Plan = require("../../models/plan.model");
const User = require("../../models/user.model");
const Subscription = require("../../models/subscription.model");
const Transaction = require("../../models/transaction.model");
const Notification = require("../../models/notification.model");
const LegalDoc = require("../../models/legalDoc.model");
const FAQ = require("../../models/faq.model");
const ContactInquiry = require("../../models/contactInquiry.model");
const Admin = require("../../models/admin.model");
const seedDatabase = require("../../utils/seeder");
const bcrypt = require("bcrypt");

// ==================== DASHBOARD & STATS ====================
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSubscribers = await Subscription.countDocuments({ status: "active" });
    const totalSeries = await Series.countDocuments();
    const totalEpisodes = await Episode.countDocuments();
    const totalPartners = await Partner.countDocuments();

    // Financial aggregates
    const transactions = await Transaction.find({ status: "SUCCESS" });
    const totalRevenue = transactions.reduce((acc, t) => acc + (t.amount || 0), 0);

    const partners = await Partner.find();
    const totalPartnerRoyalties = partners.reduce((acc, p) => acc + (p.totalEarnings || 0), 0);
    const pendingPartnerPayouts = partners.reduce((acc, p) => acc + (p.pendingPayout || 0), 0);

    const openTickets = await ContactInquiry.countDocuments({ status: { $in: ["new", "in_progress"] } });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        activeSubscribers,
        totalSeries,
        totalEpisodes,
        totalPartners,
        totalRevenue,
        totalPartnerRoyalties,
        pendingPartnerPayouts,
        openTickets,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== SERIES CONTROLLERS ====================
exports.getAllSeries = async (req, res) => {
  try {
    const { search, genre, status, partnerId } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (genre && genre !== "All") {
      query.genre = genre;
    }
    if (status && status !== "All") {
      query.status = status;
    }
    if (partnerId) {
      query.partnerId = partnerId;
    }

    const series = await Series.find(query).sort({ createdAt: -1 });

    // Attach episode count and episodes array for full compatibility
    const seriesWithEpisodes = await Promise.all(
      series.map(async (s) => {
        const episodes = await Episode.find({ seriesId: s._id }).sort({ epNumber: 1 });
        const obj = s.toObject();
        obj.id = s._id;
        obj.episodes = episodes.map((ep) => ({ ...ep.toObject(), id: ep._id }));
        obj.totalEpisodes = Math.max(s.totalEpisodes || 0, episodes.length);
        obj.publishedEpisodesCount = episodes.filter((e) => e.status === "published").length;
        return obj;
      })
    );

    res.status(200).json({ success: true, count: seriesWithEpisodes.length, data: seriesWithEpisodes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSeriesById = async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) {
      return res.status(404).json({ success: false, message: "Series not found" });
    }

    const episodes = await Episode.find({ seriesId: series._id }).sort({ epNumber: 1 });
    const data = series.toObject();
    data.id = series._id;
    data.episodes = episodes.map((ep) => ({ ...ep.toObject(), id: ep._id }));

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSeries = async (req, res) => {
  try {
    const {
      title,
      coverVertical,
      bannerHorizontal,
      genre,
      description,
      totalEpisodes,
      releaseYear,
      ageRating,
      isFeatured,
      isNewRelease,
      isPopular,
      partnerId,
      partnerName,
      status,
      director,
      cast,
    } = req.body;

    const slug = (title || "series").toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");

    const newSeries = await Series.create({
      title,
      slug,
      coverVertical: coverVertical || "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80",
      bannerHorizontal: bannerHorizontal || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80",
      genre: Array.isArray(genre) ? genre : (genre ? genre.split(",").map((g) => g.trim()) : ["Drama"]),
      description: description || "Fast-paced vertical drama streaming exclusively on Storiyan.",
      totalEpisodes: Number(totalEpisodes) || 10,
      releaseYear: Number(releaseYear) || new Date().getFullYear(),
      ageRating: ageRating || "16+",
      isFeatured: Boolean(isFeatured),
      isNewRelease: Boolean(isNewRelease),
      isPopular: Boolean(isPopular),
      partnerId: partnerId || null,
      partnerName: partnerName || "Storiyan Originals",
      status: status || "published",
      director: director || "Storiyan Studio Director",
      cast: Array.isArray(cast) ? cast : (cast ? cast.split(",").map((c) => c.trim()) : ["Lead Actor"]),
    });

    const data = newSeries.toObject();
    data.id = newSeries._id;
    data.episodes = [];

    res.status(201).json({ success: true, message: "Series created successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSeries = async (req, res) => {
  try {
    const updated = await Series.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Series not found" });
    }

    const episodes = await Episode.find({ seriesId: updated._id }).sort({ epNumber: 1 });
    const data = updated.toObject();
    data.id = updated._id;
    data.episodes = episodes.map((ep) => ({ ...ep.toObject(), id: ep._id }));

    res.status(200).json({ success: true, message: "Series updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSeries = async (req, res) => {
  try {
    const deleted = await Series.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Series not found" });
    }
    // Delete all episodes of this series
    await Episode.deleteMany({ seriesId: req.params.id });

    res.status(200).json({ success: true, message: "Series and all associated episodes removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== EPISODE CONTROLLERS ====================
exports.getEpisodesBySeries = async (req, res) => {
  try {
    const episodes = await Episode.find({ seriesId: req.params.seriesId }).sort({ epNumber: 1 });
    const mapped = episodes.map((e) => ({ ...e.toObject(), id: e._id }));
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createEpisode = async (req, res) => {
  try {
    const { seriesId } = req.params;
    const series = await Series.findById(seriesId);
    if (!series) {
      return res.status(404).json({ success: false, message: "Series not found" });
    }

    const existingCount = await Episode.countDocuments({ seriesId });
    const nextNum = req.body.epNumber || existingCount + 1;

    const newEp = await Episode.create({
      seriesId,
      epNumber: nextNum,
      title: req.body.title || `Episode ${nextNum}`,
      synopsis: req.body.synopsis || `Episode ${nextNum} synopsis...`,
      durationSeconds: Number(req.body.durationSeconds) || 180,
      durationFormatted: req.body.durationFormatted || "03:00",
      thumbnail: req.body.thumbnail || series.coverVertical,
      videoUrl: req.body.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      isFree: req.body.isFree !== undefined ? Boolean(req.body.isFree) : nextNum <= 2,
      costInCoins: Number(req.body.costInCoins) || (nextNum <= 2 ? 0 : 5),
      status: req.body.status || "published",
    });

    // Update published episodes count in series
    const allPublished = await Episode.countDocuments({ seriesId, status: "published" });
    series.publishedEpisodesCount = allPublished;
    series.totalEpisodes = Math.max(series.totalEpisodes || 0, existingCount + 1);
    await series.save();

    const data = newEp.toObject();
    data.id = newEp._id;

    res.status(201).json({ success: true, message: "Episode added successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEpisode = async (req, res) => {
  try {
    const updated = await Episode.findByIdAndUpdate(req.params.episodeId, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Episode not found" });
    }

    const data = updated.toObject();
    data.id = updated._id;

    res.status(200).json({ success: true, message: "Episode updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    const deleted = await Episode.findByIdAndDelete(req.params.episodeId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Episode not found" });
    }

    // Refresh series published count
    const series = await Series.findById(deleted.seriesId);
    if (series) {
      const pubCount = await Episode.countDocuments({ seriesId: series._id, status: "published" });
      series.publishedEpisodesCount = pubCount;
      await series.save();
    }

    res.status(200).json({ success: true, message: "Episode deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== CONTENT PARTNER CONTROLLERS ====================
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    const mapped = partners.map((p) => ({ ...p.toObject(), id: p._id }));
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }
    const data = partner.toObject();
    data.id = partner._id;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPartner = async (req, res) => {
  try {
    const { name, logo, contractType, revSharePercentage, contactEmail, contactPhone } = req.body;
    const newPartner = await Partner.create({
      name,
      logo: logo || "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=120&auto=format&fit=crop&q=80",
      contractType: contractType || "Revenue Share",
      revSharePercentage: Number(revSharePercentage) || 60,
      contactEmail: contactEmail || "",
      contactPhone: contactPhone || "",
      status: "active",
      totalEarnings: 0,
      pendingPayout: 0,
      payoutStatus: "Paid",
      joinedDate: new Date().toISOString().split("T")[0],
    });

    const data = newPartner.toObject();
    data.id = newPartner._id;

    res.status(201).json({ success: true, message: "Partner registered successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const updated = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }
    const data = updated.toObject();
    data.id = updated._id;
    res.status(200).json({ success: true, message: "Partner updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.processPartnerPayout = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }

    const disbursedAmount = partner.pendingPayout || 0;
    partner.pendingPayout = 0;
    partner.payoutStatus = "Paid";
    await partner.save();

    const data = partner.toObject();
    data.id = partner._id;

    res.status(200).json({
      success: true,
      message: `Royalty payout of ₹${disbursedAmount.toLocaleString()} disbursed successfully via Bank Wire.`,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const deleted = await Partner.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }
    res.status(200).json({ success: true, message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== SUBSCRIPTION PLANS CONTROLLERS ====================
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ price: 1 });
    const mapped = plans.map((p) => ({ ...p.toObject(), id: p._id }));
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const newPlan = await Plan.create(req.body);
    const data = newPlan.toObject();
    data.id = newPlan._id;
    res.status(201).json({ success: true, message: "Plan created successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const updated = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }
    const data = updated.toObject();
    data.id = updated._id;
    res.status(200).json({ success: true, message: "Plan updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.togglePlanStatus = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }
    plan.isActive = !plan.isActive;
    await plan.save();

    const data = plan.toObject();
    data.id = plan._id;
    res.status(200).json({ success: true, message: `Plan is now ${plan.isActive ? "active" : "inactive"}`, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const deleted = await Plan.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }
    res.status(200).json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== SUBSCRIBERS & REFUNDS ====================
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscription.find().sort({ createdAt: -1 });
    const mapped = subscribers.map((s) => ({
      ...s.toObject(),
      id: s._id,
      startDate: s.startDate ? s.startDate.toISOString().split("T")[0] : "",
      expiryDate: s.expiryDate ? s.expiryDate.toISOString().split("T")[0] : "",
    }));
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.processRefund = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    // Check if subscription id or transaction id
    let sub = await Subscription.findById(id);
    if (sub) {
      sub.paymentStatus = "REFUNDED";
      sub.status = "expired";
      sub.refundReason = reason || "Customer request";
      sub.refundedAt = new Date();
      await sub.save();
    }

    let txn = await Transaction.findById(id);
    if (txn) {
      txn.status = "REFUNDED";
      await txn.save();
    }

    res.status(200).json({ success: true, message: `Refund processed successfully (${reason || "Approved by Admin"})` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    const mapped = transactions.map((t) => {
      const obj = t.toObject();
      return {
        ...obj,
        id: t._id,
        orderId: t.referenceNo || `ORD-${t._id}`,
        userName: t.userName || "Storiyan Viewer",
        userPhone: t.userPhone || "+91 98765 00000",
        planOrItem: t.description || t.type || "Subscription Pass",
        amount: t.amount || 0,
        gateway: t.paymentMethod || "UPI",
        paymentStatus: t.status || "SUCCESS",
        timestamp: t.createdAt ? t.createdAt.toISOString().replace("T", " ").substring(0, 19) : "2025-01-01 00:00:00",
      };
    });
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== USER MANAGEMENT ====================
exports.getAllUsers = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (status && status !== "All") {
      query.status = status;
    }

    const users = await User.find(query).sort({ createdAt: -1 });
    const mapped = users.map((u) => {
      const obj = u.toObject();
      obj.id = u._id;
      obj.name = u.fullName;
      obj.avatar = u.profileImage;
      obj.joinedDate = u.createdAt ? u.createdAt.toISOString().split("T")[0] : "2025-01-01";
      obj.lastActive = "Active Recently";
      return obj;
    });

    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const data = user.toObject();
    data.id = user._id;
    data.name = user.fullName;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.status = user.status === "banned" ? "active" : "banned";
    await user.save();

    const data = user.toObject();
    data.id = user._id;
    data.name = user.fullName;

    res.status(200).json({ success: true, message: `User status changed to ${user.status}`, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.adjustUserCoins = async (req, res) => {
  try {
    const { delta } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const change = Number(delta) || 0;
    user.walletCoins = Math.max(0, (user.walletCoins || 0) + change);
    await user.save();

    // Log transaction
    await Transaction.create({
      userId: user._id,
      userName: user.fullName,
      userPhone: user.phone,
      type: change >= 0 ? "BONUS_CREDIT" : "EPISODE_UNLOCK",
      coins: Math.abs(change),
      description: `Admin manual coin adjustment: ${change >= 0 ? "+" : ""}${change} coins`,
      status: "SUCCESS",
    });

    const data = user.toObject();
    data.id = user._id;
    data.name = user.fullName;

    res.status(200).json({ success: true, message: `Wallet coins updated to ${user.walletCoins}`, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== NOTIFICATIONS CONTROLLERS ====================
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    const mapped = notifications.map((n) => {
      const obj = n.toObject();
      obj.id = n._id;
      obj.sentAt = n.sentAt ? n.sentAt.toISOString().replace("T", " ").substring(0, 16) : "Just Now";
      return obj;
    });
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sendNotificationCampaign = async (req, res) => {
  try {
    const { title, body, audience, targetRoute, seriesId, mediaUrl } = req.body;

    const notif = await Notification.create({
      title: title || "🔥 New Episode Alert",
      body: body || "Catch the hottest vertical drama on Storiyan!",
      audience: audience || "All Users",
      targetRoute: targetRoute || "/home",
      seriesId: seriesId || null,
      mediaUrl: mediaUrl || "",
      status: "sent",
      totalDelivered: 154200,
      openRate: 32.5,
      clickRate: 18.2,
      sentAt: new Date(),
    });

    const data = notif.toObject();
    data.id = notif._id;
    data.sentAt = "Just Now";

    res.status(201).json({
      success: true,
      message: `Push broadcast sent to ${notif.audience} (${notif.totalDelivered.toLocaleString()} devices).`,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }
    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== LEGAL CMS CONTROLLERS ====================
exports.getAllLegalDocs = async (req, res) => {
  try {
    const docs = await LegalDoc.find();
    const mapped = docs.map((d) => ({ ...d.toObject(), id: d._id }));
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLegalDocBySlug = async (req, res) => {
  try {
    const doc = await LegalDoc.findOne({ slug: req.params.slug });
    if (!doc) {
      return res.status(404).json({ success: false, message: "Legal document not found" });
    }
    const data = doc.toObject();
    data.id = doc._id;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLegalDoc = async (req, res) => {
  try {
    const { slug } = req.params;
    const { contentMarkdown, title, version } = req.body;

    const updated = await LegalDoc.findOneAndUpdate(
      { slug },
      {
        contentMarkdown,
        ...(title ? { title } : {}),
        ...(version ? { version } : {}),
        lastUpdated: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      },
      { new: true, upsert: true }
    );

    const data = updated.toObject();
    data.id = updated._id;

    res.status(200).json({ success: true, message: "Legal policy updated and published live.", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== FAQ CONTROLLERS ====================
exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 });
    const mapped = faqs.map((f) => ({ ...f.toObject(), id: f._id }));
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createFAQ = async (req, res) => {
  try {
    const count = await FAQ.countDocuments();
    const newFaq = await FAQ.create({
      category: req.body.category || "Subscriptions & Passes",
      question: req.body.question || "New Frequently Asked Question",
      answer: req.body.answer || "Detailed answer explanation for mobile users.",
      order: req.body.order || count + 1,
      isActive: req.body.isActive !== undefined ? Boolean(req.body.isActive) : true,
    });

    const data = newFaq.toObject();
    data.id = newFaq._id;

    res.status(201).json({ success: true, message: "FAQ published successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateFAQ = async (req, res) => {
  try {
    const updated = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }
    const data = updated.toObject();
    data.id = updated._id;
    res.status(200).json({ success: true, message: "FAQ updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    const deleted = await FAQ.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }
    res.status(200).json({ success: true, message: "FAQ removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== CONTACT INQUIRIES & SUPPORT ====================
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
    const mapped = inquiries.map((inq) => {
      const obj = inq.toObject();
      obj.id = inq._id;
      obj.timestamp = inq.createdAt ? inq.createdAt.toISOString().replace("T", " ").substring(0, 16) : "Recent";
      return obj;
    });
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await ContactInquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    const data = inquiry.toObject();
    data.id = inquiry._id;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.replyToInquiry = async (req, res) => {
  try {
    const { replyText, senderName, senderRole } = req.body;
    const inquiry = await ContactInquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    const newReply = {
      sender: senderName || "Storiyan Support Agent",
      role: senderRole || "Customer Support",
      message: replyText,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    inquiry.replies.push(newReply);
    inquiry.status = "in_progress";
    await inquiry.save();

    const data = inquiry.toObject();
    data.id = inquiry._id;

    res.status(200).json({ success: true, message: "Reply sent to user.", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status, priority } = req.body;
    const inquiry = await ContactInquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    if (status) inquiry.status = status;
    if (priority) inquiry.priority = priority;
    await inquiry.save();

    const data = inquiry.toObject();
    data.id = inquiry._id;

    res.status(200).json({ success: true, message: "Support ticket updated.", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== ADMIN ROLES & SYSTEM ====================
exports.getAdminRoles = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password").sort({ createdAt: -1 });
    const mapped = admins.map((a) => ({ ...a.toObject(), id: a._id }));
    res.status(200).json({ success: true, count: mapped.length, data: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createAdminRole = async (req, res) => {
  try {
    const { name, email, password, role, permissions, avatar } = req.body;
    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: "Admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password || "admin123", 10);
    const newAdmin = await Admin.create({
      name: name || "Staff Admin",
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "editor",
      permissions: permissions || ["content_manage"],
      avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    });

    const data = newAdmin.toObject();
    delete data.password;
    data.id = newAdmin._id;

    res.status(201).json({ success: true, message: "Admin account created", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== DATABASE SEEDER TRIGGER ====================
exports.seedDatabaseHandler = async (req, res) => {
  try {
    const result = await seedDatabase();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
