import React, { useState } from 'react';
import { 
  PieChart as PieIcon,
  Smartphone
} from 'lucide-react';

export const AnalyticsCharts = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [activeSegment, setActiveSegment] = useState('revenue');

  // Chart data
  const weeklyData = [
    { day: 'Mon', rev: 142000, viewers: 38000, height: 65 },
    { day: 'Tue', rev: 168000, viewers: 42000, height: 75 },
    { day: 'Wed', rev: 154000, viewers: 39500, height: 70 },
    { day: 'Thu', rev: 195000, viewers: 49000, height: 85 },
    { day: 'Fri', rev: 235000, viewers: 61000, height: 95 },
    { day: 'Sat', rev: 280000, viewers: 74000, height: 100 },
    { day: 'Sun', rev: 258000, viewers: 68500, height: 92 },
  ];

  const planBreakdown = [
    { name: '₹5 Ad-Free Pass', share: 52, amount: '₹7.45L', color: '#F59E0B' },
    { name: '₹3 Limited Ads', share: 24, amount: '₹3.42L', color: '#F97316' },
    { name: '7-Day All-Series', share: 15, amount: '₹2.18L', color: '#10B981' },
    { name: 'Monthly VIP & Coins', share: 9, amount: '₹1.35L', color: '#8B5CF6' },
  ];

  const geoData = [
    { city: 'Mumbai & MMR', percentage: 28, count: '124.5k streams' },
    { city: 'Delhi-NCR', percentage: 22, count: '98.2k streams' },
    { city: 'Bengaluru', percentage: 16, count: '71.4k streams' },
    { city: 'Hyderabad & Pune', percentage: 18, count: '80.1k streams' },
    { city: 'Tier 2/3 Towns', percentage: 16, count: '72.0k streams' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Revenue & Traffic Curve */}
      <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0D111A] border border-[#1E2638] shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Streaming Analytics</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                  +24.6% growth
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                {activeSegment === 'revenue' ? 'Revenue & Micro-Pass Earnings' : 'Active Viewers & Episode Streams'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-[#141A26] p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveSegment('revenue')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    activeSegment === 'revenue' ? 'bg-amber-500 text-black shadow-glow-gold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Revenue (₹)
                </button>
                <button
                  onClick={() => setActiveSegment('viewers')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    activeSegment === 'viewers' ? 'bg-amber-500 text-black shadow-glow-gold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Viewers
                </button>
              </div>

              <div className="flex bg-[#141A26] p-1 rounded-xl border border-slate-800 text-xs">
                {['daily', 'weekly', 'monthly'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition-all ${
                      timeRange === t ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bar & Metric Viz */}
          <div className="mt-6">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black font-display text-white">
                {activeSegment === 'revenue' ? '₹14,32,000' : '371,500 Streams'}
              </span>
              <span className="text-xs text-slate-400">Total generated this week</span>
            </div>

            {/* Interactive bar chart */}
            <div className="h-48 flex items-end gap-3 pt-4 border-b border-slate-800">
              {weeklyData.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold text-amber-300 bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded shadow-lg">
                    {activeSegment === 'revenue' ? `₹${(item.rev / 1000).toFixed(0)}k` : `${(item.viewers / 1000).toFixed(0)}k`}
                  </div>
                  <div className="w-full relative rounded-t-xl overflow-hidden bg-slate-800/40">
                    <div
                      className={`w-full transition-all duration-500 rounded-t-xl ${
                        activeSegment === 'revenue'
                          ? 'bg-gradient-to-t from-amber-600 via-amber-400 to-amber-300 group-hover:from-amber-500 group-hover:to-amber-200'
                          : 'bg-gradient-to-t from-red-600 via-rose-500 to-rose-300 group-hover:from-rose-500 group-hover:to-rose-200'
                      }`}
                      style={{ height: `${item.height}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-amber-300 transition-colors">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Chart Footer info */}
        <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <span>Peak Viewing: 8:00 PM - 11:30 PM IST</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              <span>Payment Success Rate: 98.4%</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Updated 1 min ago</span>
        </div>
      </div>

      {/* Right Column: Pass Breakdown & Audience Geo */}
      <div className="space-y-6">
        {/* Pass Breakdown */}
        <div className="p-6 rounded-2xl bg-[#0D111A] border border-[#1E2638] shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-amber-400" />
              Monetization Mix
            </h4>
            <span className="text-xs text-amber-400 font-semibold font-mono">₹14.8L MTD</span>
          </div>

          <div className="mt-4 space-y-3">
            {planBreakdown.map(plan => (
              <div key={plan.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{plan.name}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-white">{plan.amount}</span>
                    <span className="text-slate-500">({plan.share}%)</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${plan.share}%`, backgroundColor: plan.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="p-6 rounded-2xl bg-[#0D111A] border border-[#1E2638] shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-rose-400" />
              Audience Geographies
            </h4>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Pan-India
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {geoData.map(geo => (
              <div key={geo.city} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="font-semibold text-slate-200">{geo.city}</span>
                <div className="flex items-center gap-3 text-right">
                  <span className="text-slate-400 text-[11px]">{geo.count}</span>
                  <span className="font-bold text-amber-400 font-mono">{geo.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
