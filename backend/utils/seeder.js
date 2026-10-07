const Series = require("../models/series.model");
const Episode = require("../models/episode.model");
const Partner = require("../models/partner.model");
const Plan = require("../models/plan.model");
const User = require("../models/user.model");
const Subscription = require("../models/subscription.model");
const Transaction = require("../models/transaction.model");
const Notification = require("../models/notification.model");
const LegalDoc = require("../models/legalDoc.model");
const FAQ = require("../models/faq.model");
const ContactInquiry = require("../models/contactInquiry.model");
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");

const seedDatabase = async () => {
  try {
    // 1. Check or Seed Admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const existingAdmin = await Admin.findOne({ email: "admin@storiyan.tv" });
    if (!existingAdmin) {
      await Admin.create([
        {
          name: "Vikram Sharma (Super Admin)",
          email: "admin@storiyan.tv",
          password: hashedPassword,
          role: "superadmin",
          permissions: ["all_access", "content_manage", "partners", "finance", "cms", "users"],
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
          status: "active",
        },
        {
          name: "Kriti Sharma (Content Lead)",
          email: "kriti.s@storiyan.tv",
          password: hashedPassword,
          role: "editor",
          permissions: ["content_manage", "faqs", "cms"],
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
          status: "active",
        },
      ]);
      console.log("✅ Admin accounts seeded.");
    }

    // 2. Check or Seed Partners
    const partnerCount = await Partner.countDocuments();
    let partners = [];
    if (partnerCount === 0) {
      partners = await Partner.insertMany([
        {
          name: "Lego Content Partner",
          logo: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=120&auto=format&fit=crop&q=80",
          contractType: "Revenue Share",
          revSharePercentage: 70,
          totalSeries: 4,
          activeEpisodes: 84,
          totalEarnings: 845200,
          pendingPayout: 124500,
          payoutStatus: "Pending",
          contactEmail: "partner@legomedia.in",
          contactPhone: "+91 98200 11223",
          joinedDate: "2024-01-15",
          status: "active",
        },
        {
          name: "Red Chillies OTT Labs",
          logo: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=120&auto=format&fit=crop&q=80",
          contractType: "Revenue Share",
          revSharePercentage: 65,
          totalSeries: 6,
          activeEpisodes: 140,
          totalEarnings: 1420900,
          pendingPayout: 310000,
          payoutStatus: "Pending",
          contactEmail: "business@redchillies.com",
          contactPhone: "+91 98110 99887",
          joinedDate: "2023-11-20",
          status: "active",
        },
        {
          name: "Pocket Cinema Originals",
          logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
          contractType: "Co-Production",
          revSharePercentage: 60,
          totalSeries: 8,
          activeEpisodes: 220,
          totalEarnings: 980400,
          pendingPayout: 85000,
          payoutStatus: "Paid",
          contactEmail: "creators@pocketcinema.tv",
          contactPhone: "+91 97665 44332",
          joinedDate: "2024-02-01",
          status: "active",
        },
        {
          name: "Starlight Vertical Studios",
          logo: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=120&auto=format&fit=crop&q=80",
          contractType: "Fixed License",
          revSharePercentage: 50,
          totalSeries: 3,
          activeEpisodes: 60,
          totalEarnings: 450000,
          pendingPayout: 0,
          payoutStatus: "Paid",
          contactEmail: "accounts@starlight.co",
          contactPhone: "+91 98234 56789",
          joinedDate: "2024-03-10",
          status: "active",
        },
      ]);
      console.log("✅ Partners seeded.");
    } else {
      partners = await Partner.find();
    }

    // 3. Check or Seed Series & Episodes
    const seriesCount = await Series.countDocuments();
    if (seriesCount === 0) {
      const partner1Id = partners[0]?._id;
      const partner2Id = partners[1]?._id;

      const series1 = await Series.create({
        title: "Squid Game 3",
        slug: "squid-game-3",
        coverVertical: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80",
        bannerHorizontal: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80",
        genre: ["Romantic", "Thriller", "Survival", "High Stakes"],
        description: "456 desperate people deep in debt are taken to a secret island to compete in lethal playground games for a multi-billion won prize.",
        totalEpisodes: 10,
        publishedEpisodesCount: 6,
        releaseYear: 2025,
        rating: 4.9,
        ageRating: "18+",
        trendingRank: 1,
        isFeatured: true,
        isNewRelease: true,
        isPopular: true,
        partnerId: partner1Id,
        partnerName: "Lego Content Partner",
        status: "published",
        viewsCount: 954000,
        revenueTotal: 684000,
        director: "Hwang Dong-hyuk (Vertical Cut)",
        cast: ["Lee Jung-jae", "Lee Byung-hun", "Wi Ha-jun"],
      });

      const series2 = await Series.create({
        title: "Billionaire's Secret Heir",
        slug: "billionaires-secret-heir",
        coverVertical: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
        bannerHorizontal: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
        genre: ["Romantic", "Drama", "Billionaire", "Revenge"],
        description: "Disowned and living as a poor valet driver, Ayaan discovers his biological father was India's biggest real estate tycoon.",
        totalEpisodes: 24,
        publishedEpisodesCount: 12,
        releaseYear: 2025,
        rating: 4.8,
        ageRating: "13+",
        trendingRank: 2,
        isFeatured: true,
        isNewRelease: true,
        isPopular: true,
        partnerId: partner2Id,
        partnerName: "Red Chillies OTT Labs",
        status: "published",
        viewsCount: 1420000,
        revenueTotal: 920000,
        director: "Karan Johar Labs",
        cast: ["Vedang Raina", "Pratibha Ranta"],
      });

      const series3 = await Series.create({
        title: "CEO's Contract Wife",
        slug: "ceos-contract-wife",
        coverVertical: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        bannerHorizontal: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop&q=80",
        genre: ["Romantic", "Drama", "Family", "Marriage"],
        description: "To save her family from bankruptcy, Natasha agrees to a 100-day fake marriage with the cold-blooded tech titan Reyansh.",
        totalEpisodes: 30,
        publishedEpisodesCount: 15,
        releaseYear: 2025,
        rating: 4.7,
        ageRating: "16+",
        trendingRank: 3,
        isFeatured: false,
        isNewRelease: false,
        isPopular: true,
        partnerId: partner1Id,
        partnerName: "Lego Content Partner",
        status: "published",
        viewsCount: 880000,
        revenueTotal: 540000,
        director: "Anurag Kashyap Shorts",
        cast: ["Tripti Dimri", "Avinash Tiwary"],
      });

      // Seed Episodes for Series 1
      await Episode.insertMany([
        {
          seriesId: series1._id,
          epNumber: 1,
          title: "Red Light, Green Light 2.0",
          synopsis: "456 desperate contestants wake up in the infamous dormitory. The stakes are instantly fatal.",
          durationSeconds: 138,
          durationFormatted: "02:18",
          thumbnail: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&auto=format&fit=crop&q=80",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          isFree: true,
          costInCoins: 0,
          views: 450000,
          likes: 38200,
          shares: 12400,
          status: "published",
        },
        {
          seriesId: series1._id,
          epNumber: 2,
          title: "The Golden Umbrella Choice",
          synopsis: "Contestants face the sugar honeycomb carving challenge with unexpected time penalties.",
          durationSeconds: 184,
          durationFormatted: "03:04",
          thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          isFree: true,
          costInCoins: 0,
          views: 310000,
          likes: 29000,
          shares: 8900,
          status: "published",
        },
        {
          seriesId: series1._id,
          epNumber: 3,
          title: "Midnight Dormitory Riot",
          synopsis: "Lights go out and alliances form under the ruthless night curfew.",
          durationSeconds: 195,
          durationFormatted: "03:15",
          thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          isFree: false,
          costInCoins: 5,
          views: 220000,
          likes: 21500,
          shares: 5400,
          status: "published",
        },
        {
          seriesId: series1._id,
          epNumber: 4,
          title: "Tug of War on the Skybridge",
          synopsis: "Strategy beats brute force when team veterans reveal an ancient tugging technique.",
          durationSeconds: 210,
          durationFormatted: "03:30",
          thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
          isFree: false,
          costInCoins: 5,
          views: 180000,
          likes: 18200,
          shares: 4100,
          status: "published",
        },
      ]);

      // Seed Episodes for Series 2
      await Episode.insertMany([
        {
          seriesId: series2._id,
          epNumber: 1,
          title: "The Humiliation at the Gala",
          synopsis: "Ayaan is mocked while parking luxury supercars outside his ex-fiance's engagement party.",
          durationSeconds: 145,
          durationFormatted: "02:25",
          thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          isFree: true,
          costInCoins: 0,
          views: 520000,
          likes: 42000,
          shares: 18000,
          status: "published",
        },
        {
          seriesId: series2._id,
          epNumber: 2,
          title: "The Will Reading",
          synopsis: "A fleet of black Maybachs arrives at Ayaan's slum dwelling with the family lawyer.",
          durationSeconds: 160,
          durationFormatted: "02:40",
          thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          isFree: false,
          costInCoins: 5,
          views: 410000,
          likes: 36000,
          shares: 11000,
          status: "published",
        },
      ]);

      console.log("✅ Series & Episodes seeded.");
    }

    // 4. Check or Seed Subscription Plans
    const planCount = await Plan.countDocuments();
    let plans = [];
    if (planCount === 0) {
      plans = await Plan.insertMany([
        {
          name: "Watch Ad Free",
          badge: "Most Popular",
          price: 5,
          originalPrice: 15,
          durationDays: 1,
          description: "Go Ad-Free for just ₹5 - Enjoy Series for next 7 Days without interruptions",
          features: [
            "100% Zero Video Ads",
            "Full 1080p Full HD Vertical Stream",
            "Instant Next-Episode Autoplay",
            "No Auto-Debit / No recurring fees",
            "Valid for 7 Days on this Series",
          ],
          isAdFree: true,
          hasLimitedAds: false,
          isMostPopular: true,
          isBestExperience: true,
          isActive: true,
          autoDebitSupported: false,
          subscribersCount: 48920,
        },
        {
          name: "Watch with Limited Ads",
          badge: "Saver Pass",
          price: 3,
          originalPrice: 10,
          durationDays: 1,
          description: "Continue Watching with Minimal Short Ads for just ₹3",
          features: [
            "Limited 5-second bumper ads only",
            "720p HD Quality",
            "Unlock Next 5 Locked Episodes",
            "No auto-debit requirement",
          ],
          isAdFree: false,
          hasLimitedAds: true,
          isMostPopular: false,
          isBestExperience: false,
          isActive: true,
          autoDebitSupported: false,
          subscribersCount: 31200,
        },
        {
          name: "7-Day All-Series Pass",
          badge: "Binge Special",
          price: 29,
          originalPrice: 79,
          durationDays: 7,
          description: "Unlock ALL series on Storiyan for a whole week ad-free",
          features: [
            "Unlimited access to all 50+ series",
            "Ad-Free Ultra HD stream",
            "Early access to new weekly releases",
            "VIP badge in comments & reactions",
          ],
          isAdFree: true,
          hasLimitedAds: false,
          isMostPopular: false,
          isBestExperience: false,
          isActive: true,
          autoDebitSupported: true,
          subscribersCount: 14500,
        },
        {
          name: "Monthly VIP Master Pass",
          badge: "Ultimate Value",
          price: 99,
          originalPrice: 199,
          durationDays: 30,
          description: "30 Days of limitless vertical drama streaming + 100 bonus creator coins",
          features: [
            "Unlimited viewing across all series",
            "Download episodes for offline watch",
            "100 Bonus Coins for creator gifts",
            "Priority customer support",
          ],
          isAdFree: true,
          hasLimitedAds: false,
          isMostPopular: false,
          isBestExperience: false,
          isActive: true,
          autoDebitSupported: true,
          subscribersCount: 22100,
        },
      ]);
      console.log("✅ Subscription Plans seeded.");
    } else {
      plans = await Plan.find();
    }

    // 5. Check or Seed Users & Subscriptions
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const u1 = await User.create({
        phone: "+919876543210",
        fullName: "Aarav Sharma",
        email: "aarav.sharma@gmail.com",
        profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
        tier: "₹5 Ad-Free VIP",
        walletCoins: 45,
        totalSpent: 125,
        watchTimeMinutes: 480,
        status: "active",
      });

      const u2 = await User.create({
        phone: "+919822154321",
        fullName: "Priya Patel",
        email: "priya.patel@outlook.com",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
        tier: "₹5 Ad-Free VIP",
        walletCoins: 20,
        totalSpent: 85,
        watchTimeMinutes: 340,
        status: "active",
      });

      const u3 = await User.create({
        phone: "+919766511223",
        fullName: "Rohan Deshmukh",
        email: "rohan.desh@gmail.com",
        profileImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
        tier: "7-Day Pass",
        walletCoins: 110,
        totalSpent: 320,
        watchTimeMinutes: 940,
        status: "active",
      });

      // Subscriptions
      if (plans.length > 0) {
        const expDate1 = new Date();
        expDate1.setDate(expDate1.getDate() + 7);

        const expDate2 = new Date();
        expDate2.setDate(expDate2.getDate() + 30);

        await Subscription.insertMany([
          {
            userId: u1._id,
            userName: u1.fullName,
            userPhone: u1.phone,
            userAvatar: u1.profileImage,
            planId: plans[0]._id,
            planName: plans[0].name,
            amountPaid: plans[0].price,
            paymentMethod: "UPI (PhonePe)",
            paymentStatus: "SUCCESS",
            expiryDate: expDate1,
            status: "active",
          },
          {
            userId: u3._id,
            userName: u3.fullName,
            userPhone: u3.phone,
            userAvatar: u3.profileImage,
            planId: plans[2]._id,
            planName: plans[2].name,
            amountPaid: plans[2].price,
            paymentMethod: "GooglePay",
            paymentStatus: "SUCCESS",
            expiryDate: expDate2,
            status: "active",
          },
        ]);

        await Transaction.insertMany([
          {
            userId: u1._id,
            userName: u1.fullName,
            userPhone: u1.phone,
            type: "SUBSCRIPTION_PASS",
            amount: 5,
            description: "Watch Ad Free (₹5) 7-day access",
            paymentMethod: "UPI (PhonePe)",
            status: "SUCCESS",
          },
          {
            userId: u3._id,
            userName: u3.fullName,
            userPhone: u3.phone,
            type: "SUBSCRIPTION_PASS",
            amount: 29,
            description: "7-Day All-Series Pass (₹29)",
            paymentMethod: "GooglePay",
            status: "SUCCESS",
          },
        ]);
      }
      console.log("✅ Users & Subscriptions seeded.");
    }

    // 6. Check or Seed Notifications
    const notifCount = await Notification.countDocuments();
    if (notifCount === 0) {
      await Notification.insertMany([
        {
          title: "🔥 Squid Game Season 3: Episode 4 is OUT!",
          body: "Tug of War on the Skybridge is now live! Watch ad-free for just ₹5 on Storiyan.",
          audience: "All Users",
          targetRoute: "/series/squid-game-3/ep-4",
          mediaUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80",
          status: "sent",
          totalDelivered: 142000,
          openRate: 28.4,
          clickRate: 14.8,
        },
        {
          title: "⏳ Your ₹5 Ad-Free Pass expires tonight!",
          body: "Binge the finale of Billionaire's Secret Heir before your pass ends. Tap to extend.",
          audience: "Active Subscribers",
          targetRoute: "/subscription-plans",
          status: "sent",
          totalDelivered: 38400,
          openRate: 41.2,
          clickRate: 22.6,
        },
      ]);
      console.log("✅ Notifications seeded.");
    }

    // 7. Check or Seed FAQs
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      await FAQ.insertMany([
        {
          category: "Subscriptions & Passes",
          question: "How does the ₹5 Ad-Free Pass work?",
          answer: "When you purchase the ₹5 Ad-Free pass, you get 7 consecutive days of 100% ad-free playback in full 1080p for the selected series. It does not auto-renew or charge any recurring fee.",
          order: 1,
          isActive: true,
        },
        {
          category: "Subscriptions & Passes",
          question: "Will my card or UPI be charged automatically?",
          answer: "No. Micro-passes like ₹3 and ₹5 are one-time payments. Only monthly VIP passes with explicit auto-debit consent will renew automatically, and you can cancel anytime.",
          order: 2,
          isActive: true,
        },
        {
          category: "Coins & Wallet",
          question: "How do I earn or spend Creator Coins?",
          answer: "You can use coins to unlock locked episodes individually (5 coins per episode) or send virtual gifts to your favorite creators. Coins can be recharged from the Wallet tab.",
          order: 3,
          isActive: true,
        },
        {
          category: "Playback & Streaming",
          question: "Can I download episodes to watch offline?",
          answer: "Yes, offline downloads are supported for all active Monthly VIP Master Pass holders inside the Storiyan Flutter mobile app.",
          order: 4,
          isActive: true,
        },
      ]);
      console.log("✅ FAQs seeded.");
    }

    // 8. Check or Seed Legal CMS
    const legalCount = await LegalDoc.countDocuments();
    if (legalCount === 0) {
      await LegalDoc.insertMany([
        {
          slug: "privacy-policy",
          title: "Privacy Policy",
          version: "v2.4",
          lastUpdated: "March 1, 2025",
          contentMarkdown: `# Privacy Policy for Storiyan Vertical OTT\n\n**Effective Date:** March 1, 2025\n\nWelcome to **Storiyan** ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy.\n\n### 1. Information We Collect\n- **Account Information:** Mobile phone number for OTP verification, profile name, preferred avatar.\n- **Payment Details:** Orders processed securely via RBI-compliant gateways (PhonePe, UPI, Paytm). We do not store raw card CVV or banking credentials.\n- **Streaming Data:** Episodes watched, video completion timestamps, and favorite genres.\n\n### 2. Contact Us\nFor questions or data deletion requests, email us at **privacy@storiyan.tv**.`,
        },
        {
          slug: "terms-and-conditions",
          title: "Terms & Conditions",
          version: "v3.1",
          lastUpdated: "February 20, 2025",
          contentMarkdown: `# Terms & Conditions of Service\n\n**Last Updated:** February 20, 2025\n\nPlease read these Terms carefully before using the Storiyan application.\n\n### 1. Micro-Passes & Subscription Licensing\n- **Ad-Free Pass (₹5):** Grants ad-free access to the selected series for 7 consecutive days.\n- **Limited Ads Pass (₹3):** Grants unlocked access with short 5-second bumper ads.\n\n### 2. Fair Use & Anti-Piracy\nRe-uploading, ripping, or screen-recording copyrighted vertical dramas is strictly prohibited.`,
        },
        {
          slug: "refund-policy",
          title: "Refund & Cancellation Policy",
          version: "v1.8",
          lastUpdated: "January 15, 2025",
          contentMarkdown: `# Refund & Cancellation Policy\n\n**Effective Date:** January 15, 2025\n\n### 1. Micro-Pass Refund Eligibility\nIf payment was debited but the series was not unlocked within 15 minutes due to network error, a full auto-refund is credited back to your original source within 3-5 business days.\n\n### 2. Support Ticket\nSubmit an in-app support request or email **refunds@storiyan.tv** with your Order ID.`,
        },
      ]);
      console.log("✅ Legal Docs seeded.");
    }

    // 9. Check or Seed Contact Inquiries
    const contactCount = await ContactInquiry.countDocuments();
    if (contactCount === 0) {
      await ContactInquiry.insertMany([
        {
          name: "Deepak Chopra",
          email: "deepak.chopra@gmail.com",
          phone: "+91 98330 11990",
          subject: "UPI Payment deducted but ₹5 pass not activated",
          category: "Billing & Subscriptions",
          message: "I paid ₹5 via PhonePe for Squid Game Season 3 pass. Money got deducted but episode 3 is still asking for coins. Order ID: ORD_ST_889206.",
          status: "in_progress",
          priority: "high",
          replies: [
            {
              sender: "Storiyan Support Agent",
              role: "Customer Support",
              message: "Hello Deepak, we checked your transaction and confirmed the sync delay. We have manually activated your 7-Day Ad-Free pass and credited 10 bonus coins as apology.",
              timestamp: "2025-03-03 14:30",
            },
          ],
        },
        {
          name: "Meera Sen",
          email: "meera.sen@pocketfilms.com",
          phone: "+91 98110 44556",
          subject: "Creator content partnership proposal for 9:16 vertical series",
          category: "Creator Licensing",
          message: "We have produced 30 episodes of a high-octane suspense thriller 'Dial 100 Mumbai' formatted strictly for vertical phones. We would like to onboard as a content partner.",
          status: "new",
          priority: "medium",
          replies: [],
        },
      ]);
      console.log("✅ Contact Inquiries seeded.");
    }

    return { success: true, message: "Database check and seeding complete." };
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = seedDatabase;
