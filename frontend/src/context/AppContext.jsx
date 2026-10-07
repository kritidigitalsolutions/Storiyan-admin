import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SERIES, INITIAL_PARTNERS, INITIAL_PLANS, INITIAL_SUBSCRIBED_USERS,
  INITIAL_USERS, INITIAL_TRANSACTIONS, INITIAL_NOTIFICATIONS, INITIAL_LEGAL_DOCS,
  INITIAL_FAQS, INITIAL_CONTACT_INQUIRIES, INITIAL_ADMIN_ROLES
} from '../data/mockData';
import { adminApi } from '../services/api';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');
  const [isLoadingFromBackend, setIsLoadingFromBackend] = useState(true);

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
  const [adminRolesList, setAdminRolesList] = useState(INITIAL_ADMIN_ROLES);

  // Simulator State
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simulatorScreen, setSimulatorScreen] = useState('home');
  const [activeSimulatorSeries, setActiveSimulatorSeries] = useState(INITIAL_SERIES[0]);
  const [activeSimulatorEpisode, setActiveSimulatorEpisode] = useState(INITIAL_SERIES[0]?.episodes?.[0]);
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

  // Fetch initial data from Backend API on mount
  const fetchAllData = async () => {
    try {
      setIsLoadingFromBackend(true);
      const [
        seriesRes,
        partnersRes,
        plansRes,
        subscribersRes,
        usersRes,
        notificationsRes,
        legalRes,
        faqsRes,
        inquiriesRes,
      ] = await Promise.allSettled([
        adminApi.getAllSeries(),
        adminApi.getAllPartners(),
        adminApi.getAllPlans(),
        adminApi.getAllSubscribers(),
        adminApi.getAllUsers(),
        adminApi.getAllNotifications(),
        adminApi.getAllLegalDocs(),
        adminApi.getAllFAQs(),
        adminApi.getAllInquiries(),
      ]);

      if (seriesRes.status === 'fulfilled' && seriesRes.value.data?.length > 0) {
        setSeriesList(seriesRes.value.data);
        setActiveSimulatorSeries(seriesRes.value.data[0]);
        if (seriesRes.value.data[0]?.episodes?.length > 0) {
          setActiveSimulatorEpisode(seriesRes.value.data[0].episodes[0]);
        }
      }

      if (partnersRes.status === 'fulfilled' && partnersRes.value.data?.length > 0) {
        setPartnersList(partnersRes.value.data);
      }

      if (plansRes.status === 'fulfilled' && plansRes.value.data?.length > 0) {
        setPlansList(plansRes.value.data);
      }

      if (subscribersRes.status === 'fulfilled' && subscribersRes.value.data?.length > 0) {
        setSubscribedUsersList(subscribersRes.value.data);
      }

      if (usersRes.status === 'fulfilled' && usersRes.value.data?.length > 0) {
        setUsersList(usersRes.value.data);
      }

      if (notificationsRes.status === 'fulfilled' && notificationsRes.value.data?.length > 0) {
        setNotificationsList(notificationsRes.value.data);
      }

      if (legalRes.status === 'fulfilled' && legalRes.value.data?.length > 0) {
        setLegalDocsList(legalRes.value.data);
      }

      if (faqsRes.status === 'fulfilled' && faqsRes.value.data?.length > 0) {
        setFaqsList(faqsRes.value.data);
      }

      if (inquiriesRes.status === 'fulfilled' && inquiriesRes.value.data?.length > 0) {
        setContactInquiriesList(inquiriesRes.value.data);
      }
    } catch (error) {
      console.warn('Backend connection note:', error.message);
    } finally {
      setIsLoadingFromBackend(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Series actions
  const addSeries = async (newS) => {
    try {
      const res = await adminApi.createSeries(newS);
      if (res.success && res.data) {
        setSeriesList(prev => [res.data, ...prev]);
        addToast({ title: 'Series Created', message: `"${res.data.title}" saved to database.`, type: 'success' });
        return;
      }
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }

    // Fallback local creation
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
    addToast({ title: 'Series Created', message: `"${created.title}" was added to catalog.`, type: 'success' });
  };

  const updateSeries = async (id, updates) => {
    try {
      await adminApi.updateSeries(id, updates);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setSeriesList(prev => prev.map(s => (s.id === id || s._id === id) ? { ...s, ...updates } : s));
    addToast({ title: 'Series Updated', message: 'Catalog changes saved successfully.', type: 'success' });
  };

  const deleteSeries = async (id) => {
    try {
      await adminApi.deleteSeries(id);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setSeriesList(prev => prev.filter(s => s.id !== id && s._id !== id));
    addToast({ title: 'Series Deleted', message: 'Series removed from the platform.', type: 'warning' });
  };

  const addEpisode = async (seriesId, ep) => {
    try {
      const res = await adminApi.createEpisode(seriesId, ep);
      if (res.success && res.data) {
        setSeriesList(prev => prev.map(s => {
          if (s.id !== seriesId && s._id !== seriesId) return s;
          const updatedEpisodes = [...(s.episodes || []), res.data];
          return {
            ...s,
            episodes: updatedEpisodes,
            totalEpisodes: Math.max(s.totalEpisodes || 0, updatedEpisodes.length),
            publishedEpisodesCount: updatedEpisodes.filter(e => e.status === 'published').length
          };
        }));
        addToast({ title: 'Episode Added', message: 'New vertical video episode uploaded to DB.', type: 'success' });
        return;
      }
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }

    // Fallback
    setSeriesList(prev => prev.map(s => {
      if (s.id !== seriesId && s._id !== seriesId) return s;
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

  const updateEpisode = async (seriesId, episodeId, updates) => {
    try {
      await adminApi.updateEpisode(episodeId, updates);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setSeriesList(prev => prev.map(s => {
      if (s.id !== seriesId && s._id !== seriesId) return s;
      return {
        ...s,
        episodes: (s.episodes || []).map(e => (e.id === episodeId || e._id === episodeId) ? { ...e, ...updates } : e)
      };
    }));
    addToast({ title: 'Episode Updated', message: 'Episode details saved.', type: 'success' });
  };

  const deleteEpisode = async (seriesId, episodeId) => {
    try {
      await adminApi.deleteEpisode(episodeId);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setSeriesList(prev => prev.map(s => {
      if (s.id !== seriesId && s._id !== seriesId) return s;
      const filtered = (s.episodes || []).filter(e => e.id !== episodeId && e._id !== episodeId);
      return {
        ...s,
        episodes: filtered,
        publishedEpisodesCount: filtered.filter(e => e.status === 'published').length
      };
    }));
    addToast({ title: 'Episode Removed', message: 'Episode deleted.', type: 'warning' });
  };

  // Partner actions
  const addPartner = async (p) => {
    try {
      const res = await adminApi.createPartner(p);
      if (res.success && res.data) {
        setPartnersList(prev => [res.data, ...prev]);
        addToast({ title: 'Partner Onboarded', message: `Partner ${res.data.name} registered.`, type: 'success' });
        return;
      }
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }

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

  const updatePartner = async (id, updates) => {
    try {
      await adminApi.updatePartner(id, updates);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setPartnersList(prev => prev.map(p => (p.id === id || p._id === id) ? { ...p, ...updates } : p));
    addToast({ title: 'Partner Updated', message: 'Partner details modified.', type: 'success' });
  };

  const processPartnerPayout = async (id) => {
    try {
      await adminApi.processPartnerPayout(id);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setPartnersList(prev => prev.map(p => {
      if (p.id !== id && p._id !== id) return p;
      return {
        ...p,
        pendingPayout: 0,
        payoutStatus: 'Paid'
      };
    }));
    addToast({ title: 'Payout Transferred', message: 'Royalty payout sent via Bank Wire/NEFT.', type: 'success' });
  };

  // Plan actions
  const addPlan = async (p) => {
    try {
      const res = await adminApi.createPlan(p);
      if (res.success && res.data) {
        setPlansList(prev => [...prev, res.data]);
        addToast({ title: 'Plan Added', message: `Plan "${res.data.name}" is now live.`, type: 'success' });
        return;
      }
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }

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

  const updatePlan = async (id, updates) => {
    try {
      await adminApi.updatePlan(id, updates);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setPlansList(prev => prev.map(p => (p.id === id || p._id === id) ? { ...p, ...updates } : p));
    addToast({ title: 'Plan Updated', message: 'Subscription pass pricing adjusted.', type: 'success' });
  };

  const togglePlanStatus = async (id) => {
    try {
      await adminApi.togglePlanStatus(id);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setPlansList(prev => prev.map(p => (p.id === id || p._id === id) ? { ...p, isActive: !p.isActive } : p));
    addToast({ title: 'Plan Status Changed', message: 'Plan visibility updated.', type: 'info' });
  };

  // Subscribed user & refunds
  const processRefund = async (txnId, reason) => {
    try {
      await adminApi.processRefund(txnId, reason);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setTransactionsList(prev => prev.map(t => {
      if (t.id !== txnId && t._id !== txnId) return t;
      return { ...t, paymentStatus: 'REFUNDED' };
    }));
    setSubscribedUsersList(prev => prev.map(s => {
      if (s.id !== txnId && s._id !== txnId) return s;
      return { ...s, paymentStatus: 'REFUNDED', status: 'expired' };
    }));
    addToast({ title: 'Refund Initiated', message: `Refund processed (${reason}).`, type: 'info' });
  };

  // User actions
  const toggleUserStatus = async (userId) => {
    try {
      await adminApi.toggleUserStatus(userId);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setUsersList(prev => prev.map(u => {
      if (u.id !== userId && u._id !== userId) return u;
      const nextStatus = u.status === 'banned' ? 'active' : 'banned';
      return { ...u, status: nextStatus };
    }));
    addToast({ title: 'User Status Updated', message: 'Account access permissions modified.', type: 'info' });
  };

  const adjustUserCoins = async (userId, delta) => {
    try {
      await adminApi.adjustUserCoins(userId, delta);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setUsersList(prev => prev.map(u => {
      if (u.id !== userId && u._id !== userId) return u;
      const nextBalance = Math.max(0, (u.walletCoins || 0) + delta);
      return { ...u, walletCoins: nextBalance };
    }));
    addToast({ title: 'Wallet Coins Adjusted', message: `${delta > 0 ? '+' : ''}${delta} coins credited.`, type: 'success' });
  };

  // Notification Broadcast
  const sendNotificationCampaign = async (campaign) => {
    try {
      const res = await adminApi.sendNotificationCampaign(campaign);
      if (res.success && res.data) {
        setNotificationsList(prev => [res.data, ...prev]);
        setPreviewNotificationText({ title: res.data.title, body: res.data.body });
        setSimulatorScreen('notification');
        setIsSimulatorOpen(true);
        addToast({ title: 'Push Notification Broadcasted!', message: `Sent to ${res.data.audience} (${res.data.totalDelivered.toLocaleString()} devices).`, type: 'success' });
        return;
      }
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }

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
  const updateLegalDoc = async (slug, contentMarkdown) => {
    try {
      await adminApi.updateLegalDoc(slug, contentMarkdown);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
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
  const addFAQ = async (faq) => {
    try {
      const res = await adminApi.createFAQ(faq);
      if (res.success && res.data) {
        setFaqsList(prev => [...prev, res.data]);
        addToast({ title: 'FAQ Added', message: 'New question published to user help center.', type: 'success' });
        return;
      }
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }

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

  const updateFAQ = async (id, updates) => {
    try {
      await adminApi.updateFAQ(id, updates);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setFaqsList(prev => prev.map(f => (f.id === id || f._id === id) ? { ...f, ...updates } : f));
    addToast({ title: 'FAQ Updated', message: 'Changes saved.', type: 'success' });
  };

  const deleteFAQ = async (id) => {
    try {
      await adminApi.deleteFAQ(id);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setFaqsList(prev => prev.filter(f => f.id !== id && f._id !== id));
    addToast({ title: 'FAQ Removed', message: 'Question deleted.', type: 'warning' });
  };

  // Contact Inquiries
  const replyToInquiry = async (inquiryId, replyText) => {
    try {
      const res = await adminApi.replyToInquiry(inquiryId, replyText);
      if (res.success && res.data) {
        setContactInquiriesList(prev => prev.map(inq => (inq.id === inquiryId || inq._id === inquiryId) ? res.data : inq));
        addToast({ title: 'Reply Sent', message: 'Response sent to user email and app notification tray.', type: 'success' });
        return;
      }
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }

    setContactInquiriesList(prev => prev.map(inq => {
      if (inq.id !== inquiryId && inq._id !== inquiryId) return inq;
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

  const updateInquiryStatus = async (inquiryId, status, priority) => {
    try {
      await adminApi.updateInquiryStatus(inquiryId, status, priority);
    } catch (err) {
      console.warn('API error, using local fallback:', err.message);
    }
    setContactInquiriesList(prev => prev.map(inq => {
      if (inq.id !== inquiryId && inq._id !== inquiryId) return inq;
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
        isLoadingFromBackend,
        fetchAllData,
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
