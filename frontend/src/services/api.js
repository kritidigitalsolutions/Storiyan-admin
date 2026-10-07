const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';

const getHeaders = () => {
  const token = localStorage.getItem('storiyan_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `HTTP error! Status: ${res.status}`);
  }
  return data;
};

export const adminApi = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(res);
    if (data.token) {
      localStorage.setItem('storiyan_admin_token', data.token);
      localStorage.setItem('storiyan_admin_user', JSON.stringify(data.admin));
    }
    return data;
  },

  // Dashboard stats
  getDashboardStats: async () => {
    const res = await fetch(`${BASE_URL}/admin/stats`, { headers: getHeaders() });
    return handleResponse(res);
  },

  // Database seed
  seedDatabase: async () => {
    const res = await fetch(`${BASE_URL}/admin/seed`, { method: 'POST', headers: getHeaders() });
    return handleResponse(res);
  },

  // Series
  getAllSeries: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/admin/series${query ? `?${query}` : ''}`, { headers: getHeaders() });
    return handleResponse(res);
  },
  createSeries: async (seriesData) => {
    const res = await fetch(`${BASE_URL}/admin/series`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(seriesData),
    });
    return handleResponse(res);
  },
  updateSeries: async (id, updates) => {
    const res = await fetch(`${BASE_URL}/admin/series/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(res);
  },
  deleteSeries: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/series/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Episodes
  createEpisode: async (seriesId, epData) => {
    const res = await fetch(`${BASE_URL}/admin/series/${seriesId}/episodes`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(epData),
    });
    return handleResponse(res);
  },
  updateEpisode: async (episodeId, updates) => {
    const res = await fetch(`${BASE_URL}/admin/episodes/${episodeId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(res);
  },
  deleteEpisode: async (episodeId) => {
    const res = await fetch(`${BASE_URL}/admin/episodes/${episodeId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Partners
  getAllPartners: async () => {
    const res = await fetch(`${BASE_URL}/admin/partners`, { headers: getHeaders() });
    return handleResponse(res);
  },
  createPartner: async (partnerData) => {
    const res = await fetch(`${BASE_URL}/admin/partners`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(partnerData),
    });
    return handleResponse(res);
  },
  updatePartner: async (id, updates) => {
    const res = await fetch(`${BASE_URL}/admin/partners/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(res);
  },
  processPartnerPayout: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/partners/${id}/payout`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
  deletePartner: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/partners/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Subscription Plans
  getAllPlans: async () => {
    const res = await fetch(`${BASE_URL}/admin/plans`, { headers: getHeaders() });
    return handleResponse(res);
  },
  createPlan: async (planData) => {
    const res = await fetch(`${BASE_URL}/admin/plans`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(planData),
    });
    return handleResponse(res);
  },
  updatePlan: async (id, updates) => {
    const res = await fetch(`${BASE_URL}/admin/plans/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(res);
  },
  togglePlanStatus: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/plans/${id}/toggle`, {
      method: 'PATCH',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Subscribers & Refunds & Transactions
  getAllSubscribers: async () => {
    const res = await fetch(`${BASE_URL}/admin/subscribers`, { headers: getHeaders() });
    return handleResponse(res);
  },
  getAllTransactions: async () => {
    const res = await fetch(`${BASE_URL}/admin/transactions`, { headers: getHeaders() });
    return handleResponse(res);
  },
  processRefund: async (id, reason) => {
    const res = await fetch(`${BASE_URL}/admin/subscribers/${id}/refund`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ reason }),
    });
    return handleResponse(res);
  },

  // User Moderation
  getAllUsers: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/admin/users${query ? `?${query}` : ''}`, { headers: getHeaders() });
    return handleResponse(res);
  },
  toggleUserStatus: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/users/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
  adjustUserCoins: async (id, delta) => {
    const res = await fetch(`${BASE_URL}/admin/users/${id}/coins`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ delta }),
    });
    return handleResponse(res);
  },

  // Notifications
  getAllNotifications: async () => {
    const res = await fetch(`${BASE_URL}/admin/notifications`, { headers: getHeaders() });
    return handleResponse(res);
  },
  sendNotificationCampaign: async (campaignData) => {
    const res = await fetch(`${BASE_URL}/admin/notifications`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(campaignData),
    });
    return handleResponse(res);
  },

  // Legal CMS
  getAllLegalDocs: async () => {
    const res = await fetch(`${BASE_URL}/admin/legal`, { headers: getHeaders() });
    return handleResponse(res);
  },
  updateLegalDoc: async (slug, contentMarkdown) => {
    const res = await fetch(`${BASE_URL}/admin/legal/${slug}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ contentMarkdown }),
    });
    return handleResponse(res);
  },

  // FAQs
  getAllFAQs: async () => {
    const res = await fetch(`${BASE_URL}/admin/faqs`, { headers: getHeaders() });
    return handleResponse(res);
  },
  createFAQ: async (faqData) => {
    const res = await fetch(`${BASE_URL}/admin/faqs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(faqData),
    });
    return handleResponse(res);
  },
  updateFAQ: async (id, updates) => {
    const res = await fetch(`${BASE_URL}/admin/faqs/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(res);
  },
  deleteFAQ: async (id) => {
    const res = await fetch(`${BASE_URL}/admin/faqs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Contact Inquiries
  getAllInquiries: async () => {
    const res = await fetch(`${BASE_URL}/admin/contact`, { headers: getHeaders() });
    return handleResponse(res);
  },
  replyToInquiry: async (id, replyText, senderName = 'Storiyan Support Agent') => {
    const res = await fetch(`${BASE_URL}/admin/contact/${id}/reply`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ replyText, senderName }),
    });
    return handleResponse(res);
  },
  updateInquiryStatus: async (id, status, priority) => {
    const res = await fetch(`${BASE_URL}/admin/contact/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status, priority }),
    });
    return handleResponse(res);
  },

  // Roles
  getAdminRoles: async () => {
    const res = await fetch(`${BASE_URL}/admin/roles`, { headers: getHeaders() });
    return handleResponse(res);
  },
  createAdminRole: async (roleData) => {
    const res = await fetch(`${BASE_URL}/admin/roles`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(roleData),
    });
    return handleResponse(res);
  },
};

export default adminApi;
