import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquareQuote,
  CheckCircle2,
  Send,
  User,
  Mail,
  Phone
} from 'lucide-react';

export const ContactUsInbox = () => {
  const { contactInquiriesList, replyToInquiry, updateInquiryStatus, globalSearch } = useApp();

  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(contactInquiriesList[0] || null);
  const [replyText, setReplyText] = useState('');

  const quickTemplates = [
    'We verified your PhonePe UTR payment and your ₹5 pass has been unlocked on your account.',
    'Our video CDN engineering team has re-encoded this episode stream. Please restart the app.',
    'Thank you for your partnership pitch! Please share your vertical screener links via Google Drive.'
  ];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedInquiry) return;

    replyToInquiry(selectedInquiry.id, replyText);

    const updatedInquiry = {
      ...selectedInquiry,
      status: 'in_progress',
      replies: [
        ...(selectedInquiry.replies || []),
        {
          id: `rep-${Date.now()}`,
          sender: 'Storiyan Support Agent',
          role: 'Customer Support',
          message: replyText,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
        }
      ]
    };
    setSelectedInquiry(updatedInquiry);
    setReplyText('');
  };

  const filteredInquiries = contactInquiriesList.filter(inq => {
    const matchesSearch = globalSearch
      ? inq.userName.toLowerCase().includes(globalSearch.toLowerCase()) ||
        inq.ticketNumber.toLowerCase().includes(globalSearch.toLowerCase()) ||
        inq.subject.toLowerCase().includes(globalSearch.toLowerCase())
      : true;
    const matchesStatus = statusFilter === 'All' ? true : inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
            <MessageSquareQuote className="w-6 h-6 text-amber-400" />
            Contact Us & Support Helpdesk Inbox
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Resolve viewer payment inquiries, streaming bugs, and content partner collaboration pitches
          </p>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'open', 'in_progress', 'resolved'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl font-semibold capitalize transition-all ${
              statusFilter === status
                ? 'bg-amber-500 text-black shadow-glow-gold'
                : 'bg-[#121622] text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left: Ticket Cards List */}
        <div className="lg:col-span-5 space-y-3 overflow-y-auto max-h-[750px]">
          {filteredInquiries.map((inq) => {
            const isSelected = selectedInquiry?.id === inq.id;
            return (
              <div
                key={inq.id}
                onClick={() => setSelectedInquiry(inq)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                  isSelected
                    ? 'border-amber-400 bg-[#161C2A] shadow-xl'
                    : 'border-[#1E2638] bg-[#0D111A] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {inq.ticketNumber}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                    inq.status === 'open'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse'
                      : inq.status === 'in_progress'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {inq.status.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{inq.subject}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{inq.message}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
                  <span className="text-slate-300 font-semibold">{inq.userName}</span>
                  <span>{inq.submittedAt}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Ticket Conversation & Reply Panel */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0D111A] border border-[#1E2638] shadow-xl flex flex-col justify-between">
          {selectedInquiry ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              {/* Header Info */}
              <div>
                <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {selectedInquiry.ticketNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {selectedInquiry.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">
                      {selectedInquiry.subject}
                    </h3>
                  </div>

                  {/* Status Toggle buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        updateInquiryStatus(selectedInquiry.id, 'resolved');
                        setSelectedInquiry({ ...selectedInquiry, status: 'resolved' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Resolved
                    </button>
                  </div>
                </div>

                {/* User Contact Pill */}
                <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white">{selectedInquiry.userName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1 font-mono">
                      <Mail className="w-3.5 h-3.5 text-slate-500" /> {selectedInquiry.userEmail}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-slate-500" /> {selectedInquiry.userPhone}
                    </span>
                  </div>
                </div>

                {/* Original Inquiry Message */}
                <div className="mt-4 p-4 rounded-2xl bg-[#141A28] border border-slate-700 text-xs leading-relaxed text-slate-200">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Viewer Inquiry Message:
                  </div>
                  {selectedInquiry.message}
                </div>

                {/* Thread of Replies */}
                {selectedInquiry.replies && selectedInquiry.replies.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Response History ({selectedInquiry.replies.length})
                    </div>
                    {selectedInquiry.replies.map((rep) => (
                      <div key={rep.id} className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-emerald-400">{rep.sender} ({rep.role})</span>
                          <span className="text-slate-400 font-mono">{rep.timestamp}</span>
                        </div>
                        <p className="text-slate-200">{rep.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reply Composer & Quick Templates */}
              <div className="pt-4 border-t border-slate-800 space-y-3 mt-4">
                {/* Quick Templates */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Quick Response Templates:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickTemplates.map((tmpl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setReplyText(tmpl)}
                        className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 truncate max-w-xs transition-colors"
                      >
                        {tmpl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="space-y-2 text-xs">
                  <textarea
                    rows={3}
                    placeholder="Type official reply to viewer (will send via email & push notification)..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-[#141A28] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs shadow-glow-gold transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Response</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              Select an inquiry ticket from the left to view details and reply.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
