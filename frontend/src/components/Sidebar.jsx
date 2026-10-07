import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Film,
  Tv,
  Users,
  Building2,
  CreditCard,
  Receipt,
  BellRing,
  FileText,
  HelpCircle,
  MessageSquareQuote,
  ShieldCheck,
  Radio,
  LogOut
} from 'lucide-react';

export const Sidebar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    contactInquiriesList,
    partnersList,
    logoutAdmin
  } = useApp();

  const pendingTickets = contactInquiriesList.filter(t => t.status === 'open').length;
  const pendingPayouts = partnersList.filter(p => p.payoutStatus === 'Pending').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, group: 'OVERVIEW' },
    
    { id: 'content', label: 'Content & Episodes', icon: <Film className="w-5 h-5" />, group: 'OTT STUDIO' },
    { id: 'partners', label: 'Content Partners', icon: <Building2 className="w-5 h-5" />, badge: pendingPayouts ? `${pendingPayouts} due` : undefined, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30', group: 'OTT STUDIO' },
    
    { id: 'plans', label: 'Subscription Plans', icon: <CreditCard className="w-5 h-5" />, group: 'MONETIZATION' },
    { id: 'subscribers', label: 'Subscribed Users', icon: <Receipt className="w-5 h-5" />, group: 'MONETIZATION' },
    { id: 'users', label: 'User Management', icon: <Users className="w-5 h-5" />, group: 'COMMUNITY' },
    { id: 'notifications', label: 'Push Notifications', icon: <BellRing className="w-5 h-5" />, group: 'COMMUNITY' },
    
    { id: 'legal', label: 'Legal Pages CMS', icon: <FileText className="w-5 h-5" />, group: 'SUPPORT & CMS' },
    { id: 'faqs', label: 'FAQ Manager', icon: <HelpCircle className="w-5 h-5" />, group: 'SUPPORT & CMS' },
    { id: 'contact', label: 'Contact Us & Tickets', icon: <MessageSquareQuote className="w-5 h-5" />, badge: pendingTickets ? `${pendingTickets} open` : undefined, badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30', group: 'SUPPORT & CMS' },
    { id: 'settings', label: 'Admin & Roles RBAC', icon: <ShieldCheck className="w-5 h-5" />, group: 'SYSTEM' },
  ];

  // Group items by category
  const groups = ['OVERVIEW', 'OTT STUDIO', 'MONETIZATION', 'COMMUNITY', 'SUPPORT & CMS', 'SYSTEM'];

  return (
    <aside className="w-72 bg-[#0C1018] border-r border-[#1E2638] flex flex-col h-screen select-none shrink-0 z-20">
      {/* Brand Logo & Header */}
      <div className="p-5 border-b border-[#1E2638] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-red-600 flex items-center justify-center shadow-glow-gold">
              <Film className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0C1018] animate-pulse"></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black tracking-widest text-lg bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                STORIYAN
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Vertical OTT Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {groups.map(group => {
          const items = navItems.filter(item => item.group === group);
          return (
            <div key={group} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group}
              </div>
              {items.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300 border border-amber-500/30 shadow-lg shadow-amber-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'} transition-colors`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-slate-700 text-slate-200'}`}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-glow-gold"></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Live Streaming Health Indicator & Sign Out */}
      <div className="p-3 border-t border-[#1E2638] space-y-2 bg-[#090C14]">
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>CDN Stream Health</span>
          </div>
          <span className="text-emerald-400 font-semibold font-mono">99.98%</span>
        </div>

        <button
          onClick={logoutAdmin}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
