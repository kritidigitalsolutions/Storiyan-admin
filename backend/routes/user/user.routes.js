const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/user.controller");
const authController = require("../../controllers/user/auth.controller");
const { isAuth, optionalAuth } = require("../../middleware/user.middleware");

// ==================== AUTH & PROFILE ====================
router.post("/auth/send-otp", authController.sendOtp);
router.post("/auth/verify-otp", authController.verifyOtp);
router.get("/profile", isAuth, userController.getUserProfile);
router.put("/profile", isAuth, userController.updateUserProfile);

// ==================== HOME & CATALOG ====================
router.get("/series", userController.getSeriesList);
router.get("/series/featured", userController.getFeaturedSeries);
router.get("/series/trending", userController.getTrendingSeries);
router.get("/series/new-releases", userController.getNewReleases);
router.get("/series/:id", optionalAuth, userController.getSeriesDetails);

// ==================== EPISODES & PLAYBACK ====================
router.get("/episodes/:id", optionalAuth, userController.getEpisodeDetails);
router.post("/episodes/:id/unlock", isAuth, userController.unlockEpisode);
router.post("/episodes/:id/like", userController.likeEpisode);
router.post("/episodes/:id/view", userController.recordEpisodeView);

// ==================== WATCH HISTORY & WATCHLIST ====================
router.get("/history", isAuth, userController.getWatchHistory);
router.post("/history", isAuth, userController.saveWatchProgress);
router.get("/watchlist", isAuth, userController.getWatchlist);
router.post("/watchlist/toggle", isAuth, userController.toggleWatchlist);

// ==================== PLANS & SUBSCRIPTIONS ====================
router.get("/plans", userController.getActivePlans);
router.post("/subscriptions/purchase", isAuth, userController.purchaseSubscriptionPass);
router.get("/subscriptions/my-subscription", isAuth, userController.getMySubscription);

// ==================== WALLET & COINS ====================
router.get("/wallet", isAuth, userController.getWalletInfo);
router.post("/wallet/add-coins", isAuth, userController.addCoins);

// ==================== NOTIFICATIONS FEED ====================
router.get("/notifications", userController.getUserNotifications);

// ==================== FAQS & LEGAL CMS ====================
router.get("/faqs", userController.getFAQs);
router.get("/legal/:slug", userController.getLegalDoc);

// ==================== SUPPORT TICKETS ====================
router.post("/contact", optionalAuth, userController.createContactInquiry);
router.get("/contact/my-tickets", isAuth, userController.getMyInquiries);

module.exports = router;
