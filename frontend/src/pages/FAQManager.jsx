import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

export const FAQManager = () => {
  const { faqsList, addFAQ, updateFAQ, deleteFAQ, globalSearch } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(faqsList[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);

  // Form State
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('Subscriptions & Passes');

  const categories = [
    'All',
    'Subscriptions & Passes',
    'Playback & Streaming',
    'Wallet & Coins',
    'Account & Security'
  ];

  const handleOpenEdit = (faq) => {
    setEditingFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFAQ(null);
    setQuestion('');
    setAnswer('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    if (editingFAQ) {
      updateFAQ(editingFAQ.id, {
        question,
        answer,
        category
      });
    } else {
      addFAQ({
        question,
        answer,
        category
      });
    }
    handleCloseModal();
  };

  const filteredFaqs = faqsList.filter(f => {
    const matchesSearch = globalSearch
      ? f.question.toLowerCase().includes(globalSearch.toLowerCase()) ||
        f.answer.toLowerCase().includes(globalSearch.toLowerCase())
      : true;
    const matchesCat = selectedCategory === 'All' ? true : f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-amber-400" />
            Frequently Asked Questions (FAQ) Manager
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure in-app customer self-service answers for passes, payment gateways, video quality, and coin wallets
          </p>
        </div>

        <button
          onClick={() => {
            setEditingFAQ(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black font-bold text-xs shadow-glow-gold transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-black shadow-glow-gold'
                : 'bg-[#121622] text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isExpanded = expandedId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-[#111624] border-amber-500/40 shadow-xl'
                  : 'bg-[#0D111A] border-[#1E2638] hover:border-slate-700'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                className="p-5 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    Q{faq.order || 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{faq.question}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleOpenEdit(faq)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Edit Question"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteFAQ(faq.id)}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-900/50 transition-colors"
                      title="Delete Question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-900/40">
                  <p className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-200">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add / Edit FAQ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D111A] border border-[#232C3E] rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold font-display text-white">
                {editingFAQ ? 'Edit FAQ Item' : 'Add New FAQ Item'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Subscriptions & Passes">Subscriptions & Passes</option>
                  <option value="Playback & Streaming">Playback & Streaming</option>
                  <option value="Wallet & Coins">Wallet & Coins</option>
                  <option value="Account & Security">Account & Security</option>
                  <option value="Content">Content & Creators</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How do I activate the ₹5 Watch Ad Free pass?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Answer Explanation *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Clear step-by-step guidance for viewers..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold shadow-glow-gold"
                >
                  {editingFAQ ? 'Save Changes' : 'Publish Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
