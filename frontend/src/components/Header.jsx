import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Bell,
  Smartphone,
  PlusCircle,
  TrendingUp,
  Shield,
  LogOut,
  ChevronDown,
  Radio
} from 'lucide-react';

export const Header = ({ onOpenNewSeriesModal }) => {
  const {
    activeTab,
    globalSearch,
    setGlobalSearch,
    isSimulatorOpen,
    setIsSimulatorOpen,
    setActiveTab,
    transactionsList
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const titles = {
    dashboard: { title: 'Executive Streaming Dashboard', subtitle: 'Real-time OTT analytics, revenue trends, and vertical viewership' },
    content: { title: 'Content & 9:16 Episodes Manager', subtitle: 'Manage vertical drama series, episodic paywalls, and video encoding' },
    partners: { title: 'Content Partners & Production Studios', subtitle: 'Creator revenue shares, catalog allocations, and royalty settlements' },
    plans: { title: 'Subscription Passes & Pricing Engine', subtitle: 'Configure ₹5 Ad-Free, ₹3 Saver Passes, coin packages, and coupons' },
    subscribers: { title: 'Subscribed Users & Transactions Ledger', subtitle: 'Active passes, PhonePe/UPI billing history, and dispute refunds' },
    users: { title: 'User Directory & Community Management', subtitle: 'Manage viewer accounts, watch history, coin balances, and access status' },
    notifications: { title: 'Push Notification Campaign Hub', subtitle: 'Broadcast targeted rich notifications and deep links to mobile viewers' },
    legal: { title: 'Legal & Compliance CMS', subtitle: 'Publish & maintain Privacy Policy, Terms & Conditions, and About Us pages' },
    faqs: { title: 'Frequently Asked Questions (FAQ)', subtitle: 'Customer self-help questions, category ordering, and playback guides' },
    contact: { title: 'Customer Support & Contact Us Inbox', subtitle: 'Manage viewer inquiries, playback bug tickets, and creator pitches' },
    settings: { title: 'Admin Roles & Platform Configuration', subtitle: 'Role-Based Access Control (RBAC), CDN settings, and system logs' },
  };

  const currentInfo = titles[activeTab] || { title: 'Storiyan Admin', subtitle: 'Vertical OTT Operations' };

  return (
    <header className="h-20 bg-[#0C1018]/90 backdrop-blur-xl border-b border-[#1E2638] px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl font-bold font-display text-white flex items-center gap-2.5">
          {currentInfo.title}
          {activeTab === 'dashboard' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <Radio className="w-3 h-3 animate-pulse" /> LIVE
            </span>
          )}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 font-medium">{currentInfo.subtitle}</p>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Global Search Bar */}
        <div className="relative w-64 hidden xl:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search series, user, order..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full bg-[#141A26] border border-[#232C3E] rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
          />
        </div>

        {/* Live Viewers Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <TrendingUp className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>42,850 Live Viewers</span>
        </div>

        {/* Quick Action: New Series */}
        {onOpenNewSeriesModal && (
          <button
            onClick={onOpenNewSeriesModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs transition-all shadow-glow-gold"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Series</span>
          </button>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="p-2.5 rounded-xl bg-[#141A26] border border-[#232C3E] text-slate-300 hover:text-white hover:border-amber-500/30 transition-all relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-3 w-80 bg-[#121722] border border-[#232C3E] rounded-2xl shadow-2xl p-4 z-50 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Live System Feed</span>
                <span className="text-[10px] text-amber-400 font-medium">Auto-refreshed</span>
              </div>
              <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto mt-2">
                {transactionsList.slice(0, 4).map(txn => (
                  <div key={txn.id} className="py-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{txn.userName}</span>
                      <span className="text-emerald-400 font-bold font-mono">₹{txn.amount}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between mt-0.5">
                      <span>{txn.planOrItem}</span>
                      <span className="text-slate-500">{txn.gateway}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setShowNotifMenu(false); setActiveTab('subscribers'); }}
                className="w-full mt-3 py-2 text-center text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 rounded-xl transition-all"
              >
                View All Transactions &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl bg-[#141A26] border border-[#232C3E] hover:border-amber-500/30 transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="Admin Avatar"
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-amber-500/40"
            />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-white flex items-center gap-1">
                Vikram S.
                <Shield className="w-3 h-3 text-amber-400" />
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Super Admin</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-[#121722] border border-[#232C3E] rounded-2xl shadow-2xl p-3 z-50 animate-scale-in">
              <div className="px-3 py-2 border-b border-slate-800">
                <div className="text-xs font-bold text-white">Vikram Sengupta</div>
                <div className="text-[10px] text-slate-400">vikram.admin@storiyan.tv</div>
                <div className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Super Admin
                </div>
              </div>
              <div className="py-2 space-y-1">
                <button
                  onClick={() => { setShowProfileMenu(false); setActiveTab('settings'); }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  Admin Settings & Roles
                </button>
                <button
                  onClick={() => { setShowProfileMenu(false); setActiveTab('dashboard'); }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  Analytics Dashboard
                </button>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
