import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Plus,
  CheckCircle,
  Send,
  Mail,
  Phone,
  X
} from 'lucide-react';

export const ContentPartners = () => {
  const { partnersList, addPartner, processPartnerPayout, seriesList } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [logo] = useState('https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=120&auto=format&fit=crop&q=80');
  const [contractType, setContractType] = useState('Revenue Share');
  const [revSharePercentage, setRevSharePercentage] = useState(70);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const totalPartnersEarnings = partnersList.reduce((acc, p) => acc + p.totalEarnings, 0);
  const totalPendingPayouts = partnersList.reduce((acc, p) => acc + p.pendingPayout, 0);

  const handleAddPartner = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addPartner({
      name,
      logo,
      contractType,
      revSharePercentage: Number(revSharePercentage),
      contactEmail,
      contactPhone
    });

    setName('');
    setContactEmail('');
    setContactPhone('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-amber-400" />
            Content Partners & Production Studios
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage creator studios, revenue-share contracts (70/30, 60/40), and royalty wire disbursements
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black font-bold text-xs shadow-glow-gold transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard New Partner</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#0D111A] border border-amber-500/30 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Partner Royalties</span>
          <div className="text-2xl font-black font-display text-amber-400 mt-1 font-mono">
            ₹{(totalPartnersEarnings / 100000).toFixed(2)} Lakh
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Cumulative creator payout value</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D111A] border border-red-500/30 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Wire Transfers</span>
          <div className="text-2xl font-black font-display text-rose-400 mt-1 font-mono">
            ₹{(totalPendingPayouts / 100000).toFixed(2)} Lakh
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Due for monthly cycle settlement</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D111A] border border-emerald-500/30 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Content Partners</span>
          <div className="text-2xl font-black font-display text-emerald-400 mt-1">
            {partnersList.length} Studios
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Producing 9:16 vertical series</p>
        </div>
      </div>

      {/* Partners List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partnersList.map((partner) => {
          const partnerSeries = seriesList.filter(s => s.partnerId === partner.id || s.partnerName === partner.name);
          return (
            <div
              key={partner.id}
              className="p-6 rounded-2xl bg-[#0D111A] border border-[#1E2638] hover:border-amber-500/40 shadow-xl transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shrink-0">
                    <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {partner.name}
                      {partner.name.includes('Lego') && (
                        <span className="text-[9px] bg-red-600 text-yellow-300 px-1.5 py-0.5 rounded font-black tracking-tighter">
                          OFFICIAL
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="text-amber-400 font-semibold">{partner.contractType}</span>
                      <span>•</span>
                      <span className="font-bold text-slate-200">{partner.revSharePercentage}% Share</span>
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                  partner.payoutStatus === 'Paid'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                }`}>
                  {partner.payoutStatus}
                </span>
              </div>

              {/* Financial & Series Stats */}
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">Total Series</div>
                  <div className="font-bold text-white mt-0.5 font-mono">{partnerSeries.length || partner.totalSeries}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Total Royalties</div>
                  <div className="font-bold text-emerald-400 mt-0.5 font-mono">₹{partner.totalEarnings.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Pending Due</div>
                  <div className="font-bold text-rose-400 mt-0.5 font-mono">₹{partner.pendingPayout.toLocaleString()}</div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {partner.contactEmail}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  {partner.contactPhone}
                </span>
              </div>

              {/* Payout Action */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Partner since {partner.joinedDate}</span>
                {partner.pendingPayout > 0 ? (
                  <button
                    onClick={() => processPartnerPayout(partner.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Disburse ₹{partner.pendingPayout.toLocaleString()}</span>
                  </button>
                ) : (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> All Settled
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Onboard Partner Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D111A] border border-[#232C3E] rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold font-display text-white">
                Onboard Content Partner Studio
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPartner} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Studio / Creator Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yash Raj Films Digital Labs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Contract Model
                  </label>
                  <select
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value)}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Revenue Share">Revenue Share (%)</option>
                    <option value="Fixed License">Fixed License Fee</option>
                    <option value="Co-Production">Co-Production Split</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Partner Rev Share (%)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={90}
                    value={revSharePercentage}
                    onChange={(e) => setRevSharePercentage(Number(e.target.value))}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Official Contact Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="licensing@studio.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Phone / WhatsApp Contact
                </label>
                <input
                  type="tel"
                  placeholder="+91 98000 12345"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold shadow-glow-gold"
                >
                  Register Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
