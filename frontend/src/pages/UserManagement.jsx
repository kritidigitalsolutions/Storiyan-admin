import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Crown,
  Coins,
  Smartphone,
  MapPin,
  Plus,
  Minus,
  X,
  Send
} from 'lucide-react';

export const UserManagement = () => {
  const { usersList, toggleUserStatus, adjustUserCoins, seriesList, addToast, globalSearch } = useApp();

  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [directMsg, setDirectMsg] = useState('');

  const tiers = ['All', 'Free User', '₹3 Pass', '₹5 Ad-Free VIP', '7-Day Pass', 'Monthly VIP'];

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = globalSearch
      ? u.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        u.phone.includes(globalSearch) ||
        u.email.toLowerCase().includes(globalSearch.toLowerCase())
      : true;
    const matchesTier = selectedTier === 'All' ? true : u.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const handleSendDirectMsg = (e) => {
    e.preventDefault();
    if (!directMsg.trim() || !selectedUser) return;
    addToast({
      title: 'Direct Push Dispatched',
      message: `Message sent to ${selectedUser.name}'s device.`,
      type: 'success'
    });
    setDirectMsg('');
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-amber-400" />
            User Management & Viewer Profiles
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Viewer engagement, micro-pass subscriptions, coin wallets, and account security controls
          </p>
        </div>
      </div>

      {/* Tier Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {tiers.map(tier => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedTier === tier
                ? 'bg-amber-500 text-black shadow-glow-gold'
                : 'bg-[#121622] text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#121622] text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Viewer</th>
                <th className="px-6 py-4">Membership Tier</th>
                <th className="px-6 py-4">Coins Balance</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Watch Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700" />
                      <div>
                        <span className="font-bold text-white text-sm">{user.name}</span>
                        <div className="text-slate-400 text-[11px] font-mono">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                      user.tier.includes('VIP')
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : user.tier.includes('Pass')
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {user.tier.includes('VIP') && <Crown className="w-3 h-3 text-amber-400" />}
                      {user.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-amber-400">
                    <div className="flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5" />
                      <span>{user.walletCoins}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-400 text-sm">
                    ₹{user.totalSpent}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-300">
                    {Math.floor(user.watchTimeMinutes / 60)}h {user.watchTimeMinutes % 60}m
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                      user.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{user.lastActive}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => toggleUserStatus(user.id || user._id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border ${
                        user.status === 'banned'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {user.status === 'banned' ? 'Unban' : 'Ban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile & Wallet Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D111A] border border-[#232C3E] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6 animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400/40" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedUser.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {selectedUser.tier}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{selectedUser.phone} • {selectedUser.email}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Device & Security Info */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" /> Device & OS
                </div>
                <div className="font-bold text-white mt-1">{selectedUser.deviceInfo}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Last Known IP & Geo
                </div>
                <div className="font-bold text-white mt-1">{selectedUser.ipAddress}</div>
              </div>
            </div>

            {/* Wallet & Coins Management */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Coin Wallet Credit / Debit
                  </span>
                </div>
                <span className="text-base font-black text-amber-400 font-mono">
                  {selectedUser.walletCoins} Coins Available
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={() => {
                    const uid = selectedUser.id || selectedUser._id;
                    adjustUserCoins(uid, 50);
                    setSelectedUser({ ...selectedUser, walletCoins: (selectedUser.walletCoins || 0) + 50 });
                  }}
                  className="flex-1 py-2 rounded-xl bg-amber-500 text-black font-bold flex items-center justify-center gap-1 shadow-glow-gold"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" /> Credit 50 Coins
                </button>
                <button
                  onClick={() => {
                    const uid = selectedUser.id || selectedUser._id;
                    adjustUserCoins(uid, -20);
                    setSelectedUser({ ...selectedUser, walletCoins: Math.max(0, (selectedUser.walletCoins || 0) - 20) });
                  }}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold flex items-center justify-center gap-1"
                >
                  <Minus className="w-3.5 h-3.5" /> Debit 20 Coins
                </button>
              </div>
            </div>

            {/* Send Direct Push Notification to this User */}
            <form onSubmit={handleSendDirectMsg} className="space-y-2 text-xs">
              <label className="block font-bold text-slate-300 uppercase tracking-wider">
                Send Direct Message to User's App
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. You have a special 50% discount on Squid Game 3!"
                  value={directMsg}
                  onChange={(e) => setDirectMsg(e.target.value)}
                  className="flex-1 bg-[#161C28] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" /> Send
                </button>
              </div>
            </form>

            {/* Saved Series Thumbnails */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Viewer's Bookmarked Series ({selectedUser.savedSeriesIds.length})
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {selectedUser.savedSeriesIds.map(id => {
                  const s = seriesList.find(item => item.id === id);
                  if (!s) return null;
                  return (
                    <div key={id} className="w-16 h-24 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                      <img src={s.coverVertical} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleUserStatus(selectedUser.id);
                  setSelectedUser({
                    ...selectedUser,
                    status: selectedUser.status === 'banned' ? 'active' : 'banned'
                  });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  selectedUser.status === 'banned'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                }`}
              >
                {selectedUser.status === 'banned' ? 'Restore User Access' : 'Ban & Block Device'}
              </button>

              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
