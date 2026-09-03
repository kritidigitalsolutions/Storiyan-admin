import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_SERIES, INITIAL_PARTNERS, INITIAL_PLANS, INITIAL_SUBSCRIBED_USERS,
  INITIAL_USERS, INITIAL_TRANSACTIONS, INITIAL_NOTIFICATIONS, INITIAL_LEGAL_DOCS,
  INITIAL_FAQS, INITIAL_CONTACT_INQUIRIES, INITIAL_ADMIN_ROLES
} from '../data/mockData';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');

  // Collections
  const [seriesList, setSeriesList] = useState(INITIAL_SERIES);
  const [partnersList, setPartnersList] = useState(INITIAL_PARTNERS);
  const [plansList, setPlansList] = useState(INITIAL_PLANS);
  const [subscribedUsersList, setSubscribedUsersList] = useState(INITIAL_SUBSCRIBED_USERS);
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [transactionsList, setTransactionsList] = useState(INITIAL_TRANSACTIONS);
  const [notificationsList, setNotificationsList] = useState(INITIAL_NOTIFICATIONS);
  const [legalDocsList, setLegalDocsList] = useState(INITIAL_LEGAL_DOCS);
  const [faqsList, setFaqsList] = useState(INITIAL_FAQS);
  const [contactInquiriesList, setContactInquiriesList] = useState(INITIAL_CONTACT_INQUIRIES);
  const [adminRolesList] = useState(INITIAL_ADMIN_ROLES);

  // Simulator State
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simulatorScreen, setSimulatorScreen] = useState('home');
  const [activeSimulatorSeries, setActiveSimulatorSeries] = useState(INITIAL_SERIES[0]);
  const [activeSimulatorEpisode, setActiveSimulatorEpisode] = useState(INITIAL_SERIES[0].episodes[0]);
  const [previewNotificationText, setPreviewNotificationText] = useState(null);

  // Video player modal
  const [previewingEpisode, setPreviewingEpisode] = useState(null);

  // Toast state
  const [toasts, setToasts] = useState([]);

  const addToast = (t) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...t, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Series actions
  const addSeries = (newS) => {
    const created = {
      id: `series-${Date.now()}`,
      title: newS.title || 'Untitled Vertical Series',
      slug: (newS.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
      coverVertical: newS.coverVertical || 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80',
      bannerHorizontal: newS.bannerHorizontal || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80',
      genre: newS.genre || ['Drama', 'Thriller'],
      description: newS.description || 'Fast-paced vertical drama streaming exclusively on Storiyan.',
      totalEpisodes: newS.totalEpisodes || 10,
      publishedEpisodesCount: 0,
      releaseYear: newS.releaseYear || 2025,
      rating: 5.0,
      ageRating: newS.ageRating || '16+',
      isFeatured: Boolean(newS.isFeatured),
      isNewRelease: true,
      isPopular: false,
      partnerId: newS.partnerId || 'partner-1',
      partnerName: newS.partnerName || 'Lego Content Partner',
      status: newS.status || 'published',
      viewsCount: 0,
      revenueTotal: 0,
      director: newS.director || 'Storiyan Studio Director',
      cast: newS.cast || ['Lead Actor', 'Co-Star'],
      episodes: []
    };
    setSeriesList(prev => [created, ...prev]);
    addToast({ title: 'Series Created', message: `"${created.title}" was added to the catalog.`, type: 'success' });
  };

  const updateSeries = (id, updates) => {
    setSeriesList(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    addToast({ title: 'Series Updated', message: 'Catalog changes saved successfully.', type: 'success' });
  };

  const deleteSeries = (id) => {
    setSeriesList(prev => prev.filter(s => s.id !== id));
    addToast({ title: 'Series Deleted', message: 'Series removed from the platform.', type: 'warning' });
  };

  const addEpisode = (seriesId, ep) => {
    setSeriesList(prev => prev.map(s => {
      if (s.id !== seriesId) return s;
      const nextNum = (s.episodes?.length || 0) + 1;
      const newEp = {
        id: `ep-${seriesId}-${Date.now()}`,
        seriesId,
        epNumber: ep.epNumber || nextNum,
        title: ep.title || `Episode ${nextNum}`,
        synopsis: ep.synopsis || `Episode ${nextNum} synopsis...`,
        durationSeconds: ep.durationSeconds || 180,
        durationFormatted: ep.durationFormatted || '02:30',
        thumbnail: ep.thumbnail || s.coverVertical,
        videoUrl: ep.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        isFree: ep.isFree !== undefined ? ep.isFree : nextNum <= 2,
        costInCoins: ep.costInCoins || (nextNum <= 2 ? 0 : 5),
        views: 0,
        likes: 0,
        shares: 0,
        status: 'published',
        publishedAt: new Date().toISOString().split('T')[0]
      };
      const updatedEpisodes = [...(s.episodes || []), newEp];
      return {
        ...s,
        episodes: updatedEpisodes,
        totalEpisodes: Math.max(s.totalEpisodes, updatedEpisodes.length),
        publishedEpisodesCount: updatedEpisodes.filter(e => e.status === 'published').length
      };
    }));
    addToast({ title: 'Episode Added', message: 'New vertical video episode uploaded.', type: 'success' });
  };

  const updateEpisode = (seriesId, episodeId, updates) => {
    setSeriesList(prev => prev.map(s => {
      if (s.id !== seriesId) return s;
      return {
        ...s,
        episodes: (s.episodes || []).map(e => e.id === episodeId ? { ...e, ...updates } : e)
      };
    }));
    addToast({ title: 'Episode Updated', message: 'Episode details saved.', type: 'success' });
  };

  const deleteEpisode = (seriesId, episodeId) => {
    setSeriesList(prev => prev.map(s => {
      if (s.id !== seriesId) return s;
      const filtered = (s.episodes || []).filter(e => e.id !== episodeId);
      return {
        ...s,
        episodes: filtered,
        publishedEpisodesCount: filtered.filter(e => e.status === 'published').length
      };
    }));
    addToast({ title: 'Episode Removed', message: 'Episode deleted.', type: 'warning' });
  };

  // Partner actions
  const addPartner = (p) => {
    const partner = {
      id: `partner-${Date.now()}`,
      name: p.name || 'New Studio Partner',
      logo: p.logo || 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=120&auto=format&fit=crop&q=80',
      contractType: p.contractType || 'Revenue Share',
      revSharePercentage: p.revSharePercentage || 60,
      totalSeries: 0,
      activeEpisodes: 0,
      totalEarnings: 0,
      pendingPayout: 0,
      payoutStatus: 'Paid',
      contactEmail: p.contactEmail || 'partner@studio.com',
      contactPhone: p.contactPhone || '+91 90000 00000',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setPartnersList(prev => [partner, ...prev]);
    addToast({ title: 'Partner Onboarded', message: `Partner ${partner.name} registered.`, type: 'success' });
  };

  const updatePartner = (id, updates) => {
    setPartnersList(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addToast({ title: 'Partner Updated', message: 'Partner details modified.', type: 'success' });
  };

  const processPartnerPayout = (id) => {
    setPartnersList(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        pendingPayout: 0,
        payoutStatus: 'Paid'
      };
    }));
    addToast({ title: 'Payout Transferred', message: 'Royalty payout sent via Bank Wire/NEFT.', type: 'success' });
  };

  // Plan actions
  const addPlan = (p) => {
    const plan = {
      id: `plan-${Date.now()}`,
      name: p.name || 'Micro Pass',
      badge: p.badge || 'Popular',
      price: p.price || 5,
      originalPrice: p.originalPrice || 15,
      durationDays: p.durationDays || 1,
      description: p.description || 'Access vertical series ad-free',
      features: p.features || ['Zero Video Ads', 'Full HD Quality'],
      isAdFree: Boolean(p.isAdFree),
      hasLimitedAds: Boolean(p.hasLimitedAds),
      isMostPopular: Boolean(p.isMostPopular),
      isBestExperience: Boolean(p.isBestExperience),
      isActive: true,
      autoDebitSupported: Boolean(p.autoDebitSupported),
      subscribersCount: 0
    };
    setPlansList(prev => [...prev, plan]);
    addToast({ title: 'Plan Added', message: `Plan "${plan.name}" is now live in store.`, type: 'success' });
  };

  const updatePlan = (id, updates) => {
    setPlansList(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addToast({ title: 'Plan Updated', message: 'Subscription pass pricing adjusted.', type: 'success' });
  };

  const togglePlanStatus = (id) => {
    setPlansList(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
    addToast({ title: 'Plan Status Changed', message: 'Plan visibility updated.', type: 'info' });
  };

  // Subscribed user & refunds
  const processRefund = (txnId, reason) => {
    setTransactionsList(prev => prev.map(t => {
      if (t.id !== txnId) return t;
      return { ...t, paymentStatus: 'REFUNDED' };
    }));
    addToast({ title: 'Refund Initiated', message: `Refund processed (${reason}).`, type: 'info' });
  };

  // User actions
  const toggleUserStatus = (userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id !== userId) return u;
      const nextStatus = u.status === 'banned' ? 'active' : 'banned';
      return { ...u, status: nextStatus };
    }));
    addToast({ title: 'User Status Updated', message: 'Account access permissions modified.', type: 'info' });
  };

  const adjustUserCoins = (userId, delta) => {
    setUsersList(prev => prev.map(u => {
      if (u.id !== userId) return u;
      const nextBalance = Math.max(0, u.walletCoins + delta);
      return { ...u, walletCoins: nextBalance };
    }));
    addToast({ title: 'Wallet Coins Adjusted', message: `${delta > 0 ? '+' : ''}${delta} coins credited.`, type: 'success' });
  };

  // Notification Broadcast
  const sendNotificationCampaign = (campaign) => {
    const notif = {
      id: `notif-${Date.now()}`,
      title: campaign.title || '🔥 New Episode Alert',
      body: campaign.body || 'Catch the hottest series now on Storiyan!',
      audience: campaign.audience || 'All Users',
      targetRoute: campaign.targetRoute || '/home',
      seriesId: campaign.seriesId,
      mediaUrl: campaign.mediaUrl,
      sentAt: 'Just Now',
      status: 'sent',
      totalDelivered: 154200,
      openRate: 32.5,
      clickRate: 18.2
    };
    setNotificationsList(prev => [notif, ...prev]);
    setPreviewNotificationText({ title: notif.title, body: notif.body });
    setSimulatorScreen('notification');
    setIsSimulatorOpen(true);
    addToast({ title: 'Push Notification Broadcasted!', message: `Sent to ${notif.audience} (${notif.totalDelivered.toLocaleString()} devices).`, type: 'success' });
  };

  // Legal CMS
  const updateLegalDoc = (slug, contentMarkdown) => {
    setLegalDocsList(prev => prev.map(d => {
      if (d.slug !== slug) return d;
      return {
        ...d,
        contentMarkdown,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      };
    }));
    addToast({ title: 'Legal Policy Updated', message: 'Content published live to mobile and web apps.', type: 'success' });
  };

  // FAQ actions
  const addFAQ = (faq) => {
    const item = {
      id: `faq-${Date.now()}`,
      category: faq.category || 'Subscriptions & Passes',
      question: faq.question || 'New Frequently Asked Question',
      answer: faq.answer || 'Detailed answer explanation for mobile users.',
      order: (faqsList.length + 1),
      isActive: true
    };
    setFaqsList(prev => [...prev, item]);
    addToast({ title: 'FAQ Added', message: 'New question published to user help center.', type: 'success' });
  };

  const updateFAQ = (id, updates) => {
    setFaqsList(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    addToast({ title: 'FAQ Updated', message: 'Changes saved.', type: 'success' });
  };

  const deleteFAQ = (id) => {
    setFaqsList(prev => prev.filter(f => f.id !== id));
    addToast({ title: 'FAQ Removed', message: 'Question deleted.', type: 'warning' });
  };

  // Contact Inquiries
  const replyToInquiry = (inquiryId, replyText) => {
    setContactInquiriesList(prev => prev.map(inq => {
      if (inq.id !== inquiryId) return inq;
      const newReply = {
        id: `rep-${Date.now()}`,
        sender: 'Storiyan Support Agent',
        role: 'Customer Support',
        message: replyText,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      return {
        ...inq,
        status: 'in_progress',
        replies: [...(inq.replies || []), newReply]
      };
    }));
    addToast({ title: 'Reply Sent', message: 'Response sent to user email and app notification tray.', type: 'success' });
  };

  const updateInquiryStatus = (inquiryId, status, priority) => {
    setContactInquiriesList(prev => prev.map(inq => {
      if (inq.id !== inquiryId) return inq;
      return {
        ...inq,
        status,
        ...(priority ? { priority } : {})
      };
    }));
    addToast({ title: 'Ticket Updated', message: `Status marked as ${status.toUpperCase()}.`, type: 'info' });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        seriesList,
        partnersList,
        plansList,
        subscribedUsersList,
        usersList,
        transactionsList,
        notificationsList,
        legalDocsList,
        faqsList,
        contactInquiriesList,
        adminRolesList,
        addSeries,
        updateSeries,
        deleteSeries,
        addEpisode,
        updateEpisode,
        deleteEpisode,
        addPartner,
        updatePartner,
        processPartnerPayout,
        addPlan,
        updatePlan,
        togglePlanStatus,
        processRefund,
        toggleUserStatus,
        adjustUserCoins,
        sendNotificationCampaign,
        updateLegalDoc,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        replyToInquiry,
        updateInquiryStatus,
        isSimulatorOpen,
        setIsSimulatorOpen,
        simulatorScreen,
        setSimulatorScreen,
        activeSimulatorSeries,
        setActiveSimulatorSeries,
        activeSimulatorEpisode,
        setActiveSimulatorEpisode,
        previewNotificationText,
        setPreviewNotificationText,
        previewingEpisode,
        setPreviewingEpisode,
        toasts,
        addToast,
        removeToast,
        globalSearch,
        setGlobalSearch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
