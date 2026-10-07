import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Plus,
  Play,
  Trash2,
  Edit2,
  Lock,
  Unlock,
  Eye,
  Film,
  Smartphone
} from 'lucide-react';

export const EpisodeManagerModal = ({ series, onClose }) => {
  const { addEpisode, updateEpisode, deleteEpisode, setPreviewingEpisode, setActiveSimulatorSeries, setActiveSimulatorEpisode, setSimulatorScreen, setIsSimulatorOpen } = useApp();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingEpId, setEditingEpId] = useState(null);

  // Form states for adding/editing
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [durationFormatted, setDurationFormatted] = useState('02:30');
  const [durationSeconds, setDurationSeconds] = useState(150);
  const [isFree, setIsFree] = useState(false);
  const [costInCoins, setCostInCoins] = useState(5);
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [thumbnail, setThumbnail] = useState(series.coverVertical);

  const resetForm = () => {
    setTitle('');
    setSynopsis('');
    setDurationFormatted('02:30');
    setDurationSeconds(150);
    setIsFree(false);
    setCostInCoins(5);
    setIsAddingNew(false);
    setEditingEpId(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const targetSeriesId = series.id || series._id;
    if (editingEpId) {
      updateEpisode(targetSeriesId, editingEpId, {
        title,
        synopsis,
        durationFormatted,
        durationSeconds,
        isFree,
        costInCoins: isFree ? 0 : costInCoins,
        videoUrl,
        thumbnail
      });
    } else {
      addEpisode(targetSeriesId, {
        title,
        synopsis,
        durationFormatted,
        durationSeconds,
        isFree,
        costInCoins: isFree ? 0 : costInCoins,
        videoUrl,
        thumbnail
      });
    }
    resetForm();
  };

  const handleEditClick = (ep) => {
    setEditingEpId(ep.id);
    setTitle(ep.title);
    setSynopsis(ep.synopsis || '');
    setDurationFormatted(ep.durationFormatted || '02:30');
    setDurationSeconds(ep.durationSeconds || 150);
    setIsFree(ep.isFree);
    setCostInCoins(ep.costInCoins || 5);
    setVideoUrl(ep.videoUrl);
    setThumbnail(ep.thumbnail || series.coverVertical);
    setIsAddingNew(true);
  };

  const episodes = series.episodes || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0D111A] border border-[#232C3E] rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-[#111624]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-16 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shrink-0">
              <img src={series.coverVertical} alt={series.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Vertical Episodes Manager
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {episodes.length} of {series.totalEpisodes} Uploaded
                </span>
              </div>
              <h2 className="text-xl font-black font-display text-white mt-0.5">{series.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isAddingNew && (
              <button
                onClick={() => {
                  resetForm();
                  setIsAddingNew(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black font-bold text-xs shadow-glow-gold transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Episode</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {isAddingNew ? (
            /* Add / Edit Form */
            <form onSubmit={handleSave} className="max-w-2xl mx-auto space-y-5 bg-[#121824] p-6 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">
                  {editingEpId ? 'Edit Vertical Episode' : 'Upload / Add New 9:16 Episode'}
                </h3>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Episode Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Red Light, Green Light 2.0"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#1A2232] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Synopsis / Plot Teaser
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Short engaging description for mobile viewer lockscreen..."
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    className="w-full bg-[#1A2232] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Duration (MM:SS)
                    </label>
                    <input
                      type="text"
                      placeholder="02:18"
                      value={durationFormatted}
                      onChange={(e) => setDurationFormatted(e.target.value)}
                      className="w-full bg-[#1A2232] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Paywall & Access Rule
                    </label>
                    <div className="flex items-center gap-3 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isFree}
                          onChange={(e) => setIsFree(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-0"
                        />
                        <span className="text-xs text-slate-200 font-semibold">Free Teaser Ep</span>
                      </label>

                      {!isFree && (
                        <div className="flex items-center gap-1.5 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20 text-xs">
                          <span className="text-amber-400 font-mono font-bold">₹{costInCoins} Pass</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Video Stream URL (MP4 / HLS .m3u8)
                  </label>
                  <input
                    type="url"
                    placeholder="https://cdn.storiyan.tv/streams/squid-game-ep1.m3u8"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-[#1A2232] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs shadow-glow-gold"
                >
                  {editingEpId ? 'Save Changes' : 'Publish Episode'}
                </button>
              </div>
            </form>
          ) : (
            /* Episode Table / Cards */
            <div className="space-y-3">
              {episodes.length === 0 ? (
                <div className="py-16 text-center text-slate-500 space-y-3">
                  <Film className="w-12 h-12 mx-auto text-slate-600 stroke-[1.5]" />
                  <p className="text-sm">No episodes uploaded yet for this vertical series.</p>
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs"
                  >
                    Add Episode 1 Now
                  </button>
                </div>
              ) : (
                episodes.map((ep) => (
                  <div
                    key={ep.id}
                    className="p-4 rounded-2xl bg-[#121622] border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Thumbnail & Play icon */}
                      <div
                        onClick={() => setPreviewingEpisode({ series, episode: ep })}
                        className="relative w-20 h-28 rounded-xl overflow-hidden border border-slate-700 bg-black shrink-0 cursor-pointer group-hover:border-amber-400 transition-colors"
                      >
                        <img
                          src={ep.thumbnail || series.coverVertical}
                          alt={ep.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-6 h-6 text-amber-400 fill-amber-400" />
                        </div>
                        <div className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[8px] font-mono text-white">
                          {ep.durationFormatted}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            Episode {ep.epNumber}
                          </span>
                          {ep.isFree ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                              <Unlock className="w-2.5 h-2.5" /> FREE PREVIEW
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> ₹{ep.costInCoins || 5} PAYWALL
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          {ep.title}
                        </h4>

                        <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                          {ep.synopsis || series.description}
                        </p>

                        <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {(ep.views || 450000).toLocaleString()} views
                          </span>
                          <span>•</span>
                          <span>Published {ep.publishedAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => setPreviewingEpisode({ series, episode: ep })}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                        title="Play in Admin"
                      >
                        <Play className="w-3.5 h-3.5 fill-amber-300" />
                        <span>Play Video</span>
                      </button>

                      <button
                        onClick={() => handleEditClick(ep)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Edit Episode"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteEpisode(series.id || series._id, ep.id || ep._id)}
                        className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-900/50 transition-colors"
                        title="Delete Episode"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
