const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/admin.controller");
const adminAuthController = require("../../controllers/admin/adminAuth.controller");

// Public Admin Auth
router.post("/login", adminAuthController.adminLogin);

// Database Seeder
router.get("/seed", adminController.seedDatabaseHandler);
router.post("/seed", adminController.seedDatabaseHandler);

// Dashboard & Stats
router.get("/stats", adminController.getDashboardStats);

// Series Management
router.get("/series", adminController.getAllSeries);
router.get("/series/:id", adminController.getSeriesById);
router.post("/series", adminController.createSeries);
router.put("/series/:id", adminController.updateSeries);
router.delete("/series/:id", adminController.deleteSeries);

// Episode Management
router.get("/series/:seriesId/episodes", adminController.getEpisodesBySeries);
router.post("/series/:seriesId/episodes", adminController.createEpisode);
router.put("/episodes/:episodeId", adminController.updateEpisode);
router.delete("/episodes/:episodeId", adminController.deleteEpisode);

// Content Partners
router.get("/partners", adminController.getAllPartners);
router.get("/partners/:id", adminController.getPartnerById);
router.post("/partners", adminController.createPartner);
router.put("/partners/:id", adminController.updatePartner);
router.post("/partners/:id/payout", adminController.processPartnerPayout);
router.delete("/partners/:id", adminController.deletePartner);

// Subscription Plans
router.get("/plans", adminController.getAllPlans);
router.post("/plans", adminController.createPlan);
router.put("/plans/:id", adminController.updatePlan);
router.patch("/plans/:id/toggle", adminController.togglePlanStatus);
router.delete("/plans/:id", adminController.deletePlan);

// Subscribers & Refunds
router.get("/subscribers", adminController.getAllSubscribers);
router.post("/subscribers/:id/refund", adminController.processRefund);
router.get("/transactions", adminController.getAllTransactions);

// User Moderation
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.patch("/users/:id/status", adminController.toggleUserStatus);
router.patch("/users/:id/coins", adminController.adjustUserCoins);

// Notifications Hub
router.get("/notifications", adminController.getAllNotifications);
router.post("/notifications", adminController.sendNotificationCampaign);
router.delete("/notifications/:id", adminController.deleteNotification);

// Legal CMS
router.get("/legal", adminController.getAllLegalDocs);
router.get("/legal/:slug", adminController.getLegalDocBySlug);
router.put("/legal/:slug", adminController.updateLegalDoc);

// FAQs
router.get("/faqs", adminController.getAllFAQs);
router.post("/faqs", adminController.createFAQ);
router.put("/faqs/:id", adminController.updateFAQ);
router.delete("/faqs/:id", adminController.deleteFAQ);

// Contact Support Inbox
router.get("/contact", adminController.getAllInquiries);
router.get("/contact/:id", adminController.getInquiryById);
router.post("/contact/:id/reply", adminController.replyToInquiry);
router.patch("/contact/:id/status", adminController.updateInquiryStatus);

// Admin Roles
router.get("/roles", adminController.getAdminRoles);
router.post("/roles", adminController.createAdminRole);

module.exports = router;
