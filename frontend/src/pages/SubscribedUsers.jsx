import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Receipt,
  Download,
  RotateCcw
} from 'lucide-react';

export const SubscribedUsers = () => {
  const { subscribedUsersList, transactionsList, processRefund, addToast, globalSearch } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('subscribers');
  const [selectedGateway, setSelectedGateway] = useState('All');
  const [refundModalTxn, setRefundModalTxn] = useState(null);
  const [refundReason, setRefundReason] = useState('Duplicate Charge / User Request');

  const filteredSubscribers = subscribedUsersList.filter(sub => {
    return globalSearch
      ? sub.userName.toLowerCase().includes(globalSearch.toLowerCase()) ||
        sub.userPhone.includes(globalSearch) ||
        sub.planName.toLowerCase().includes(globalSearch.toLowerCase())
      : true;
  });

  const filteredTransactions = transactionsList.filter(txn => {
    const matchesSearch = globalSearch
      ? txn.userName.toLowerCase().includes(globalSearch.toLowerCase()) ||
        txn.orderId.toLowerCase().includes(globalSearch.toLowerCase()) ||
        txn.userPhone.includes(globalSearch)
      : true;
    const matchesGateway = selectedGateway === 'All' ? true : txn.gateway === selectedGateway;
    return matchesSearch && matchesGateway;
  });

  const handleExportCSV = () => {
    addToast({
      title: 'Ledger Exported',
      message: 'Settlement CSV downloaded successfully.',
      type: 'success'
    });
  };

  const handleRefundSubmit = (e) => {
    e.preventDefault();
    if (!refundModalTxn) return;
    processRefund(refundModalTxn, refundReason);
    setRefundModalTxn(null);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Receipt className="w-6 h-6 text-amber-400" />
            Subscribed Users & Payment Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time PhonePe, Paytm, GooglePay, and UPI transaction settlement logs and active pass holders
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Export CSV Ledger</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex bg-[#121622] p-1 rounded-2xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveSubTab('subscribers')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'subscribers'
              ? 'bg-amber-500 text-black shadow-glow-gold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Active Subscribed Users ({subscribedUsersList.length})
        </button>
        <button
          onClick={() => setActiveSubTab('transactions')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'transactions'
              ? 'bg-amber-500 text-black shadow-glow-gold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Live Transactions Stream ({transactionsList.length})
        </button>
      </div>

      {/* VIEW 1: SUBSCRIBED USERS TABLE */}
      {activeSubTab === 'subscribers' && (
        <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#121622] text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">User Account</th>
                  <th className="px-6 py-4">Active Plan / Pass</th>
                  <th className="px-6 py-4">Amount Paid</th>
                  <th className="px-6 py-4">Gateway</th>
                  <th className="px-6 py-4">Pass Validity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Auto-Debit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredSubscribers.map(sub => (
                  <tr key={sub.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={sub.userAvatar} alt={sub.userName} className="w-9 h-9 rounded-xl object-cover ring-1 ring-amber-400/40" />
                        <div>
                          <span className="font-bold text-white text-sm">{sub.userName}</span>
                          <div className="text-slate-400 text-[11px] font-mono">{sub.userPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-amber-300">{sub.planName}</td>
                    <td className="px-6 py-4 font-black text-white font-mono text-sm">₹{sub.amountPaid}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                        {sub.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[11px] text-slate-400">
                      <div>From {sub.startDate}</div>
                      <div className="text-slate-500 font-mono">Until {sub.expiryDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        sub.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {sub.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {sub.autoDebit ? (
                        <span className="text-emerald-400 text-xs">Enabled</span>
                      ) : (
                        <span className="text-slate-500 text-xs">No Auto-Debit</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: TRANSACTIONS STREAM */}
      {activeSubTab === 'transactions' && (
        <div className="space-y-4">
          {/* Gateway Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {['All', 'PhonePe', 'Paytm', 'GooglePay', 'UPI'].map(gw => (
              <button
                key={gw}
                onClick={() => setSelectedGateway(gw)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  selectedGateway === gw
                    ? 'bg-amber-500 text-black shadow-glow-gold'
                    : 'bg-[#121622] text-slate-300 border border-slate-800 hover:text-white'
                }`}
              >
                {gw}
              </button>
            ))}
          </div>

          <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#121622] text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Item / Pass</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Gateway</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredTransactions.map(txn => (
                    <tr key={txn.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-amber-400">{txn.orderId}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{txn.userName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{txn.userPhone}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-200">{txn.planOrItem}</td>
                      <td className="px-6 py-4 font-black text-white font-mono text-sm">₹{txn.amount}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 text-[10px] font-bold font-mono">
                          {txn.gateway}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          txn.paymentStatus === 'SUCCESS'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : txn.paymentStatus === 'REFUNDED'
                            ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {txn.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-400 text-[11px]">{txn.timestamp}</td>
                      <td className="px-6 py-4 text-right">
                        {txn.paymentStatus === 'SUCCESS' && (
                          <button
                            onClick={() => setRefundModalTxn(txn.id)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 text-xs font-semibold transition-colors"
                          >
                            Refund
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {refundModalTxn && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D111A] border border-[#232C3E] rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4 animate-scale-in">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-rose-400" />
              Process Immediate Refund
            </h3>
            <p className="text-xs text-slate-300">
              The full micro-pass amount will be refunded directly back to the user's UPI / PhonePe handle.
            </p>

            <form onSubmit={handleRefundSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Reason for Refund
                </label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Duplicate Charge / User Request">Duplicate Charge / User Request</option>
                  <option value="Stream Playback Failure">Stream Playback Failure</option>
                  <option value="Accidental Tap">Accidental Tap</option>
                  <option value="Content Removed">Content Removed</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRefundModalTxn(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-glow-red"
                >
                  Confirm Refund
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
