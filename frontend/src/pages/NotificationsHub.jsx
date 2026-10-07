import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BellRing,
  Send,
  Film,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const NotificationsHub = () => {
  const {
    notificationsList,
    sendNotificationCampaign,
    seriesList,
    setPreviewNotificationText,
    setSimulatorScreen,
    setIsSimulatorOpen,
    addToast
  } = useApp();

  const [title, setTitle] = useState('🔥 Squid Game Season 3: Episode 4 is OUT!');
  const [body, setBody] = useState('Tug of War on the Skybridge is now live! Watch ad-free for just ₹5 on Storiyan.');
  const [audience, setAudience] = useState('All Users');
  const [targetSeriesId, setTargetSeriesId] = useState(seriesList[0]?.id || 'series-1');

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    sendNotificationCampaign({
      title,
      body,
      audience,
      seriesId: targetSeriesId,
      targetRoute: `/series/${targetSeriesId}`
    });
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
            <BellRing className="w-6 h-6 text-amber-400" />
            Push Notification Broadcast Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Send rich engagement notifications with deep links to drive immediate episode watch time and micro-pass sales
          </p>
        </div>
      </div>

      {/* 2-Column Composer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Broadcast Campaign Builder */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0D111A] border border-[#1E2638] shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Compose Push Campaign
            </h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
              FCM / APNs Ready
            </span>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Notification Headline / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#141A26] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Message Body *
              </label>
              <textarea
                rows={3}
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-[#141A26] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Audience Segment
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-[#141A26] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="All Users">All Registered Users (154k)</option>
                  <option value="Active Subscribers">Active ₹5 / VIP Subscribers (48k)</option>
                  <option value="Free Drop-Off Users">Free Ep 2 Drop-Off Users (32k)</option>
                  <option value="Lapsed Users">Lapsed Pass Holders (18k)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Deep-Link Target Series
                </label>
                <select
                  value={targetSeriesId}
                  onChange={(e) => setTargetSeriesId(e.target.value)}
                  className="w-full bg-[#141A26] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                >
                  {seriesList.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Estimated reach: <span className="font-bold text-white">~154,200 active devices</span>
              </span>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black font-bold shadow-glow-gold transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast Campaign Now</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Lockscreen Mockup Preview */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0D111A] border border-[#1E2638] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Mobile Lockscreen Live Render
              </h4>
              <span className="text-[10px] text-amber-400 font-mono font-semibold">iOS / Android Auto</span>
            </div>

            {/* Lockscreen Card */}
            <div className="mt-6 p-4 rounded-2xl bg-[#141926] border border-slate-700 shadow-2xl space-y-3 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-red-600 flex items-center justify-center shrink-0 shadow-md">
                  <Film className="w-4 h-4 text-black stroke-[2.5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-amber-400">STORIYAN</span>
                    <span className="text-[10px] text-slate-400 font-mono">now</span>
                  </div>
                  <h5 className="text-xs font-bold text-white mt-0.5 line-clamp-1">{title || 'Notification Title'}</h5>
                  <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2 leading-tight">
                    {body || 'Notification message description...'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>Target: {audience}</span>
                <span className="text-amber-300 font-mono">Tap to Open Video</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
            💡 <span className="text-slate-200 font-medium">Pro-tip:</span> Notifications sent between 8 PM and 10 PM IST generate 3.4x higher conversion into ₹5 pass purchases.
          </div>
        </div>
      </div>

      {/* Broadcast History Table */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#121622] border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Past Broadcast Campaigns & Engagement
          </h3>
          <span className="text-xs text-slate-400">{notificationsList.length} Campaigns</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#121622] text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Campaign Title</th>
                <th className="px-6 py-4">Audience</th>
                <th className="px-6 py-4">Delivered</th>
                <th className="px-6 py-4">Open Rate</th>
                <th className="px-6 py-4">CTR (Clicks)</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {notificationsList.map(notif => (
                <tr key={notif.id || notif._id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white max-w-sm">{notif.title}</div>
                    <div className="text-slate-400 text-[11px] line-clamp-1">{notif.body}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-amber-300">{notif.audience}</td>
                  <td className="px-6 py-4 font-mono font-bold text-white">
                    {notif.totalDelivered ? notif.totalDelivered.toLocaleString() : '—'}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                    {notif.openRate ? `${notif.openRate}%` : '—'}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-sky-400">
                    {notif.clickRate ? `${notif.clickRate}%` : '—'}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{notif.sentAt || notif.scheduledAt}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                      notif.status === 'sent'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {notif.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
