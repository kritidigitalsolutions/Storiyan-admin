import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Users,
  Server,
  Save,
  History
} from 'lucide-react';

export const AdminSettings = () => {
  const { adminRolesList, addToast } = useApp();

  const [cdnProvider, setCdnProvider] = useState('AWS CloudFront (Mumbai Edge)');
  const [drmEnabled, setDrmEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [currency, setCurrency] = useState('INR (₹)');

  const auditLogs = [
    { action: 'Updated ₹5 Ad-Free Pass pricing', admin: 'Vikram S. (Super Admin)', ip: '49.36.120.88', time: '10 mins ago' },
    { action: 'Published Episode 5 for Squid Game 3', admin: 'Shalini S. (Content Dir)', ip: '103.21.144.12', time: '1 hour ago' },
    { action: 'Processed Royalty Wire to Lego Media (₹1.24L)', admin: 'Rajat B. (Finance)', ip: '157.34.89.201', time: '3 hours ago' },
    { action: 'Resolved Ticket TKT-8918 Audio Sync', admin: 'Tanvi M. (Support)', ip: '122.161.50.4', time: '5 hours ago' },
  ];

  const handleSavePlatformConfig = () => {
    addToast({
      title: 'Platform Settings Saved',
      message: 'CDN and security configurations synced across clusters.',
      type: 'success'
    });
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            Admin Roles (RBAC) & Platform Configuration
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Role-based permissions, CDN streaming endpoints, payment gateways, and system audit logs
          </p>
        </div>

        <button
          onClick={handleSavePlatformConfig}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black font-bold text-xs shadow-glow-gold transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save System Config</span>
        </button>
      </div>

      {/* 2-Column Section: RBAC Admins List & Global Platform Switches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Admin Users & Roles */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0D111A] border border-[#1E2638] shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              Authorized Admin Personnel
            </h3>
            <span className="text-xs text-amber-400 font-mono font-semibold">{adminRolesList.length} Active Staff</span>
          </div>

          <div className="divide-y divide-slate-800">
            {adminRolesList.map(admin => (
              <div key={admin.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={admin.avatar} alt={admin.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-amber-400/40" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{admin.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {admin.role}
                      </span>
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5">{admin.email}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {admin.status.toUpperCase()}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">{admin.lastLogin}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Global OTT Switches */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0D111A] border border-[#1E2638] shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              Streaming Infrastructure
            </h3>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
              HEALTHY
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Video CDN Edge Cluster
              </label>
              <select
                value={cdnProvider}
                onChange={(e) => setCdnProvider(e.target.value)}
                className="w-full bg-[#141A26] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
              >
                <option value="AWS CloudFront (Mumbai Edge)">AWS CloudFront (Mumbai / Pune Edge)</option>
                <option value="Cloudflare Stream OTT">Cloudflare Stream Global Anycast</option>
                <option value="Fastly Media Shield">Fastly Media Shield India</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Default Currency Model
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#141A26] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
              >
                <option value="INR (₹)">Indian Rupee (INR ₹)</option>
                <option value="USD ($)">US Dollar (USD $)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Widevine / FairPlay DRM Encryption</div>
                  <div className="text-[11px] text-slate-400">Prevent screen-recording and stream interception</div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrmEnabled(!drmEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${drmEnabled ? 'bg-amber-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-transform ${drmEnabled ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Maintenance Mode</div>
                  <div className="text-[11px] text-slate-400">Show maintenance banner to mobile app viewers</div>
                </div>
                <button
                  type="button"
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${maintenanceMode ? 'bg-rose-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-transform ${maintenanceMode ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Audit Logs */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#121622] border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            System Audit Trail & Security Logs
          </h3>
          <span className="text-xs text-slate-400">Immutable Ledger</span>
        </div>

        <div className="divide-y divide-slate-800 text-xs">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors">
              <div>
                <span className="font-bold text-white">{log.action}</span>
                <div className="text-[11px] text-slate-400 mt-0.5">{log.admin}</div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[11px] text-slate-400">{log.ip}</span>
                <div className="text-[10px] text-slate-500 font-mono">{log.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
