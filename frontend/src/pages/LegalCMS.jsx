import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Save,
  Eye,
  Edit3,
  Clock
} from 'lucide-react';

export const LegalCMS = () => {
  const { legalDocsList, updateLegalDoc } = useApp();

  const [selectedSlug, setSelectedSlug] = useState('privacy-policy');
  const [activeTab, setActiveTab] = useState('editor');

  const currentDoc = legalDocsList.find(d => d.slug === selectedSlug) || legalDocsList[0];
  const [contentMarkdown, setContentMarkdown] = useState(currentDoc?.contentMarkdown || '');

  useEffect(() => {
    if (currentDoc) {
      setContentMarkdown(currentDoc.contentMarkdown || '');
    }
  }, [selectedSlug, legalDocsList]);

  // Switch doc handler
  const handleSelectDoc = (slug) => {
    setSelectedSlug(slug);
    const doc = legalDocsList.find(d => d.slug === slug);
    if (doc) setContentMarkdown(doc.contentMarkdown || '');
  };

  const handleSave = () => {
    updateLegalDoc(selectedSlug, contentMarkdown);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-amber-400" />
            Legal Pages CMS & Policy Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Maintain regulatory compliance documents: Privacy Policy, Terms & Conditions, and About Us for mobile app store compliance
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black font-bold text-xs shadow-glow-gold transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Publish Changes Live</span>
        </button>
      </div>

      {/* 3 Main Docs Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {legalDocsList.map(doc => (
          <button
            key={doc.slug}
            onClick={() => handleSelectDoc(doc.slug)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedSlug === doc.slug
                ? 'border-amber-400 bg-amber-500/10 shadow-glow-gold'
                : 'border-[#1E2638] bg-[#0D111A] hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-bold ${selectedSlug === doc.slug ? 'text-amber-300' : 'text-white'}`}>
                {doc.title}
              </h3>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Published
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Updated {doc.lastUpdated}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Editor & Preview Workspace */}
      <div className="p-6 rounded-3xl bg-[#0D111A] border border-[#1E2638] shadow-xl space-y-4">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Document:</span>
            <span className="text-xs font-bold text-white">{currentDoc.title}</span>
          </div>

          <div className="flex bg-[#141A26] p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'editor' ? 'bg-amber-500 text-black shadow-glow-gold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Markdown Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'preview' ? 'bg-amber-500 text-black shadow-glow-gold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Mobile App Live Preview</span>
            </button>
          </div>
        </div>

        {/* Workspace Body */}
        {activeTab === 'editor' ? (
          <div className="space-y-3">
            <textarea
              rows={18}
              value={contentMarkdown}
              onChange={(e) => setContentMarkdown(e.target.value)}
              className="w-full bg-[#121724] border border-slate-700 rounded-2xl p-5 text-slate-200 font-mono text-xs focus:outline-none focus:border-amber-400 leading-relaxed resize-none shadow-inner"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Supports Markdown headings (#, ##), bold, bullet lists, and links</span>
              <span>Author: {currentDoc.author}</span>
            </div>
          </div>
        ) : (
          <div className="bg-[#121724] border border-slate-700 rounded-2xl p-8 text-slate-200 prose prose-invert max-w-none space-y-4 text-xs leading-relaxed">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-xl font-black text-white font-display">{currentDoc.title}</h2>
              <span className="text-[11px] text-slate-400">Effective / Last Updated: {currentDoc.lastUpdated}</span>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300 leading-relaxed">
              {contentMarkdown}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
