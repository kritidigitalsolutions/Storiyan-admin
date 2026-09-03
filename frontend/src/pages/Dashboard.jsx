import React from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { AnalyticsCharts } from '../components/AnalyticsCharts';
import {
  IndianRupee,
  Users,
  PlaySquare,
  Crown,
  Sparkles,
  Flame,
  ChevronRight,
  ExternalLink,
  CreditCard,
  Smartphone
} from 'lucide-react';

export const Dashboard = ({ onOpenNewSeriesModal }) => {
  const {
    seriesList,
    transactionsList,
    subscribedUsersList,
    setActiveTab,
    setActiveSimulatorSeries,
    setSimulatorScreen,
    setIsSimulatorOpen,
    setPreviewingEpisode
  } = useApp();

  const totalRevenue = seriesList.reduce((acc, s) => acc + s.revenueTotal, 0);
  const totalStreams = seriesList.reduce((acc, s) => acc + s.viewsCount, 0);
  const activeSubscribers = subscribedUsersList.filter(s => s.status === 'active').length;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner & Quick Shortcuts */}
      <div className="relative p-6 rounded-3xl bg-gradient-to-r from-[#181F30] via-[#121622] to-[#1E1218] border border-[#232C3E] shadow-2xl overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Storiyan Studio 9:16 OTT Command Center
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                v2.4 Production
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black font-display text-white tracking-tight">
              Vertical Drama & Series Operations
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Monetizing short-form 9:16 vertical storytelling through ₹3 & ₹5 micro-passes, creator revenue-shares, and real-time PhonePe/UPI processing.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {onOpenNewSeriesModal && (
              <button
                onClick={onOpenNewSeriesModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs shadow-glow-gold transition-all"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>Publish New Series</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Gross Revenue"
          value={`₹${(totalRevenue / 100000).toFixed(2)} Lakh`}
          change="+18.4%"
          isPositive={true}
          icon={<IndianRupee className="w-5 h-5" />}
          subtitle="₹48,200 today"
          glowColor="gold"
          badge="Live"
        />

        <StatCard
          title="Active Live Viewers"
          value="42,850"
          change="+12.6%"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          subtitle="Across 28 Indian cities"
          glowColor="blue"
        />

        <StatCard
          title="Total Episodes Streamed"
          value={`${(totalStreams / 1000000).toFixed(2)}M`}
          change="+29.1%"
          isPositive={true}
          icon={<PlaySquare className="w-5 h-5" />}
          subtitle="Avg 3.4 ep / session"
          glowColor="red"
        />

        <StatCard
          title="Paying Subscribers"
          value={activeSubscribers.toLocaleString()}
          change="+15.2%"
          isPositive={true}
          icon={<Crown className="w-5 h-5" />}
          subtitle="₹5 Pass is #1 choice"
          glowColor="emerald"
        />
      </div>

      {/* Analytics Charts & Graphs */}
      <AnalyticsCharts />

      {/* 2-Column Section: Top Trending Vertical Series & Realtime Transaction Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Trending Series */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0D111A] border border-[#1E2638] shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                Top Trending Vertical Series
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Rankings calculated by active 9:16 streams and ₹5 pass purchases</p>
            </div>
            <button
              onClick={() => setActiveTab('content')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View All Series</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 divide-y divide-slate-800/60">
            {seriesList.slice(0, 5).map((series, idx) => (
              <div
                key={series.id}
                className="py-3.5 flex items-center justify-between gap-4 group hover:bg-slate-900/40 px-2 rounded-xl transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-display font-black text-lg text-amber-400/80 w-5 text-center">
                    #{idx + 1}
                  </span>

                  <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-900 group-hover:border-amber-400 transition-colors">
                    <img
                      src={series.coverVertical}
                      alt={series.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 right-1">
                      <span className="text-[7px] font-bold px-1 rounded bg-black/80 text-white font-mono">
                        9:16
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {series.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <span className="text-amber-400 font-semibold">{series.partnerName}</span>
                      <span>•</span>
                      <span>{series.totalEpisodes} Episodes</span>
                      <span>•</span>
                      <span>{series.genre.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-white font-mono">
                      {(series.viewsCount / 1000).toFixed(0)}k streams
                    </div>
                    <div className="text-[11px] text-emerald-400 font-bold font-mono">
                      ₹{(series.revenueTotal / 1000).toFixed(0)}k revenue
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {series.episodes && series.episodes.length > 0 && (
                      <button
                        onClick={() => setPreviewingEpisode({ series, episode: series.episodes[0] })}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                        title="Quick Preview"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Transactions Stream */}
        <div className="p-6 rounded-2xl bg-[#0D111A] border border-[#1E2638] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  Live Billing Ledger
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">PhonePe & UPI settlements</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
                REALTIME
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {transactionsList.slice(0, 5).map(txn => (
                <div
                  key={txn.id}
                  className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{txn.userName}</span>
                    <span className="font-black text-amber-400 font-mono text-sm">
                      ₹{txn.amount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                    <span className="truncate">{txn.planOrItem}</span>
                    <span className="font-semibold text-purple-400 font-mono">{txn.gateway}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-500">
                    <span className="font-mono">{txn.orderId}</span>
                    <span className="text-emerald-400 font-bold">{txn.paymentStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('subscribers')}
            className="w-full mt-4 py-2.5 text-center text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-xl transition-all"
          >
            Open Full Billing Ledger &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
