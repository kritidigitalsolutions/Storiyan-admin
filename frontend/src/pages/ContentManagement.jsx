import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EpisodeManagerModal } from './EpisodeManagerModal';
import {
  Film,
  Plus,
  Grid,
  List,
  Eye,
  Smartphone,
  Edit2,
  Trash2,
  Layers,
  Flame,
  X,
  Play,
  SlidersHorizontal
} from 'lucide-react';

export const ContentManagement = ({
  isCreateModalOpen = false,
  onCloseCreateModal
}) => {
  const {
    seriesList,
    partnersList,
    addSeries,
    updateSeries,
    deleteSeries,
    setActiveSimulatorSeries,
    setSimulatorScreen,
    setIsSimulatorOpen,
    setPreviewingEpisode,
    globalSearch
  } = useApp();

  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPartner, setSelectedPartner] = useState('All');
  const [sortBy, setSortBy] = useState('trending'); // 'trending', 'revenue', 'views', 'rating'
  const [viewMode, setViewMode] = useState('tabular'); // 'tabular' (horizontal tabular form), 'grid', 'table'
  const [managingSeries, setManagingSeries] = useState(null);
  const [internalCreateModal, setInternalCreateModal] = useState(false);
  const [editingSeries, setEditingSeries] = useState(null);

  // New Series Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverVertical, setCoverVertical] = useState('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80');
  const [bannerHorizontal, setBannerHorizontal] = useState('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80');
  const [genreText, setGenreText] = useState('Romantic, Thriller, Survival');
  const [totalEpisodes, setTotalEpisodes] = useState(20);
  const [partnerId, setPartnerId] = useState(partnersList[0]?.id || 'partner-1');
  const [ageRating, setAgeRating] = useState('16+');
  const [isFeatured, setIsFeatured] = useState(true);
  const [director, setDirector] = useState('Hwang Dong-hyuk');
  const [cast, setCast] = useState('Lee Jung-jae, Wi Ha-jun');

  const showModal = isCreateModalOpen || internalCreateModal;

  const handleCloseModal = () => {
    setInternalCreateModal(false);
    setEditingSeries(null);
    if (onCloseCreateModal) onCloseCreateModal();
    setTitle('');
    setDescription('');
  };

  const handleOpenEdit = (s) => {
    setEditingSeries(s);
    setTitle(s.title);
    setDescription(s.description);
    setCoverVertical(s.coverVertical);
    setBannerHorizontal(s.bannerHorizontal);
    setGenreText(s.genre.join(', '));
    setTotalEpisodes(s.totalEpisodes);
    setPartnerId(s.partnerId);
    setAgeRating(s.ageRating);
    setIsFeatured(s.isFeatured);
    setDirector(s.director || '');
    setCast(Array.isArray(s.cast) ? s.cast.join(', ') : '');
    setInternalCreateModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const partner = partnersList.find(p => p.id === partnerId) || partnersList[0];
    const genres = genreText.split(',').map(g => g.trim()).filter(Boolean);
    const castArray = cast.split(',').map(c => c.trim()).filter(Boolean);

    if (editingSeries) {
      updateSeries(editingSeries.id || editingSeries._id, {
        title,
        description,
        coverVertical,
        bannerHorizontal,
        genre: genres,
        totalEpisodes: Number(totalEpisodes),
        partnerId: partner ? (partner.id || partner._id) : null,
        partnerName: partner ? partner.name : 'Storiyan Originals',
        ageRating,
        isFeatured,
        director,
        cast: castArray
      });
    } else {
      addSeries({
        title,
        description,
        coverVertical,
        bannerHorizontal,
        genre: genres,
        totalEpisodes: Number(totalEpisodes),
        partnerId: partner.id,
        partnerName: partner.name,
        ageRating,
        isFeatured,
        director,
        cast: castArray
      });
    }
    handleCloseModal();
  };

  const allGenres = ['All', 'Romantic', 'Thriller', 'Crime', 'Mystery', 'Detective', 'Action', 'Psychological'];

  const filteredSeries = seriesList
    .filter(s => {
      const matchesSearch = globalSearch
        ? s.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
          s.partnerName.toLowerCase().includes(globalSearch.toLowerCase()) ||
          s.genre.some(g => g.toLowerCase().includes(globalSearch.toLowerCase()))
        : true;
      const matchesGenre = selectedGenre === 'All' ? true : s.genre.includes(selectedGenre);
      const matchesPartner = selectedPartner === 'All' ? true : s.partnerId === selectedPartner;
      return matchesSearch && matchesGenre && matchesPartner;
    })
    .sort((a, b) => {
      if (sortBy === 'revenue') return b.revenueTotal - a.revenueTotal;
      if (sortBy === 'views') return b.viewsCount - a.viewsCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (a.trendingRank || 99) - (b.trendingRank || 99);
    });

  const totalStreams = filteredSeries.reduce((acc, s) => acc + s.viewsCount, 0);
  const totalRevenue = filteredSeries.reduce((acc, s) => acc + s.revenueTotal, 0);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Filter & Toolbar Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
              9:16 Vertical Drama Hub
            </span>
            <span className="text-xs text-slate-400">
              {filteredSeries.length} Series Active
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black font-display text-white flex items-center gap-3 mt-1">
            <Film className="w-7 h-7 text-amber-400" />
            Vertical Series & Episodes Catalog
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Publish, edit, and configure 9:16 mobile episodes and paywall monetization rules in horizontal tabular form
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Metrics */}
          <div className="hidden sm:flex items-center gap-4 px-4 py-2 bg-[#0E131E] border border-[#1E2638] rounded-xl text-xs">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Total Streams</div>
              <div className="font-mono font-bold text-white">{(totalStreams / 100000).toFixed(2)} Lakh</div>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Total Earnings</div>
              <div className="font-mono font-bold text-emerald-400">₹{(totalRevenue / 1000).toFixed(0)}k</div>
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex bg-[#121622] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('tabular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'tabular'
                  ? 'bg-amber-500 text-black shadow-glow-gold font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Horizontal Tabular Form View"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Horizontal Tabular</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-amber-500 text-black shadow-glow-gold' : 'text-slate-400 hover:text-white'
              }`}
              title="Poster Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-amber-500 text-black shadow-glow-gold' : 'text-slate-400 hover:text-white'
              }`}
              title="Detailed Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setInternalCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black font-bold text-xs shadow-glow-gold transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vertical Series</span>
          </button>
        </div>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0D111A] p-4 rounded-2xl border border-[#1E2638]">
        {/* Genre Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1">
          {allGenres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGenre === genre
                  ? 'bg-amber-500 text-black shadow-glow-gold font-bold'
                  : 'bg-[#141926] text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Studio & Sort Dropdowns */}
        <div className="flex items-center gap-3 shrink-0">
          <select
            value={selectedPartner}
            onChange={(e) => setSelectedPartner(e.target.value)}
            className="bg-[#141926] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
          >
            <option value="All">All Studios</option>
            {partnersList.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#141926] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
          >
            <option value="trending">Sort: Trending</option>
            <option value="revenue">Sort: Highest Revenue</option>
            <option value="views">Sort: Most Streams</option>
            <option value="rating">Sort: Top Rated</option>
          </select>
        </div>
      </div>

      {/* VIEW 1: HORIZONTAL TABULAR FORM (Default rich wide row layout) */}
      {viewMode === 'tabular' && (
        <div className="space-y-4">
          {filteredSeries.map((series) => {
            const uploadedCount = series.episodes?.length || 0;
            const uploadPercentage = Math.round((uploadedCount / series.totalEpisodes) * 100);
            const firstEp = series.episodes && series.episodes[0];

            return (
              <div
                key={series.id}
                className="bg-[#0C101A] border border-[#1E2638] hover:border-amber-500/40 rounded-2xl p-4 lg:p-5 shadow-xl transition-all duration-300 group hover:bg-[#0F1420]"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
                  {/* Poster / Horizontal Banner Combined Media View */}
                  <div className="relative w-full lg:w-64 aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800 shadow-md">
                    <img
                      src={series.bannerHorizontal || series.coverVertical}
                      alt={series.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40"></div>

                    {/* Top Overlay Badges */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                      {series.trendingRank ? (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-red-600 text-black flex items-center gap-1 shadow-md">
                          <Flame className="w-3 h-3 fill-black" /> #{series.trendingRank} TRENDING
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                          {series.ageRating}
                        </span>
                      )}

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/10">
                        ★ {series.rating}
                      </span>
                    </div>

                    {/* Bottom Info with Vertical Poster thumbnail inlay */}
                    <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={series.coverVertical}
                          alt="Poster"
                          className="w-6 h-9 rounded object-cover border border-amber-400/40 shadow-sm"
                        />
                        <span className="text-[10px] font-mono font-bold text-amber-300">
                          9:16 Vertical
                        </span>
                      </div>
                      {firstEp && (
                        <button
                          onClick={() => setPreviewingEpisode({ series, episode: firstEp })}
                          className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow-glow-gold transition-all"
                          title="Instant Video Preview"
                        >
                          <Play className="w-3.5 h-3.5 fill-black" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Main Series Information */}
                  <div className="flex-1 space-y-2.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        {series.partnerName}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {series.releaseYear || 2025}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                        {series.status}
                      </span>
                      {series.isFeatured && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                          Featured
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                        {series.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {series.description}
                      </p>
                    </div>

                    {/* Genres & Director Details */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {series.genre.map(g => (
                        <span key={g} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#161C28] text-slate-300 border border-slate-800">
                          {g}
                        </span>
                      ))}
                      {series.director && (
                        <span className="text-[10px] text-slate-400 ml-2 hidden sm:inline">
                          Director: <strong className="text-slate-300">{series.director}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tabular Analytics & Episode Metrics */}
                  <div className="w-full lg:w-72 bg-[#121724] border border-[#1E2638] rounded-xl p-3.5 space-y-3 shrink-0">
                    {/* Episodes Upload Progress */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400 font-medium">Episodes Ready</span>
                        <span className="font-mono font-bold text-white">
                          {uploadedCount} / {series.totalEpisodes} ({uploadPercentage}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all"
                          style={{ width: `${Math.min(uploadPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Metric Row */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80 text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400">Total Streams</div>
                        <div className="font-mono font-bold text-white flex items-center gap-1">
                          <Eye className="w-3 h-3 text-slate-400" />
                          {(series.viewsCount / 1000).toFixed(0)}k
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Revenue Earned</div>
                        <div className="font-mono font-bold text-emerald-400">
                          ₹{(series.revenueTotal / 1000).toFixed(0)}k
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex lg:flex-col items-center justify-end gap-2 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                    <button
                      onClick={() => setManagingSeries(series)}
                      className="flex-1 lg:flex-none lg:w-36 py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Episodes ({uploadedCount})</span>
                    </button>

                    {firstEp && (
                      <button
                        onClick={() => setPreviewingEpisode({ series, episode: firstEp })}
                        className="flex-1 lg:flex-none lg:w-36 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>Watch Preview</span>
                      </button>
                    )}

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(series)}
                        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Edit Series"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteSeries(series.id || series._id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                        title="Delete Series"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: GRID VIEW (9:16 Vertical Cards) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSeries.map((series) => {
            const uploadedCount = series.episodes?.length || 0;
            return (
              <div
                key={series.id}
                className="bg-[#0D111A] border border-[#1E2638] hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* 9:16 Poster Image & Badges */}
                <div className="relative aspect-[9/14] overflow-hidden bg-slate-950">
                  <img
                    src={series.coverVertical}
                    alt={series.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D111A] via-transparent to-black/60"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    {series.trendingRank ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-red-600 text-black flex items-center gap-1 shadow-lg">
                        <Flame className="w-3 h-3 fill-black" /> #{series.trendingRank} TRENDING
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                        {series.ageRating}
                      </span>
                    )}

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white">
                      ★ {series.rating}
                    </span>
                  </div>

                  {/* Bottom Image Overlay: Title & Partner */}
                  <div className="absolute bottom-3 inset-x-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {series.partnerName}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 drop-shadow-md">
                      {series.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {series.genre.slice(0, 3).map(g => (
                        <span key={g} className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                          {g}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {series.description}
                    </p>
                  </div>

                  {/* Episode upload status & stats */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Episodes Uploaded</span>
                      <span className="font-bold text-white font-mono">{uploadedCount} / {series.totalEpisodes}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                        style={{ width: `${(uploadedCount / series.totalEpisodes) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Eye className="w-3 h-3 text-slate-500" /> {(series.viewsCount / 1000).toFixed(0)}k
                      </span>
                      <span className="font-bold text-emerald-400 font-mono">
                        ₹{(series.revenueTotal / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setManagingSeries(series)}
                      className="w-full py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Episodes ({uploadedCount})</span>
                    </button>

                    <button
                      onClick={() => {
                        const ep = series.episodes && series.episodes[0];
                        if (ep) {
                          setPreviewingEpisode({ series, episode: ep });
                        } else {
                          setManagingSeries(series);
                        }
                      }}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Preview</span>
                    </button>
                  </div>

                  {/* Edit / Delete Footer */}
                  <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-800/60">
                    <button
                      onClick={() => handleOpenEdit(series)}
                      className="text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Edit Info
                    </button>
                    <button
                      onClick={() => deleteSeries(series.id || series._id)}
                      className="text-rose-400/80 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: COMPACT DATA TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#121622] text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Series Title</th>
                  <th className="px-6 py-4">Partner Studio</th>
                  <th className="px-6 py-4">Episodes</th>
                  <th className="px-6 py-4">Total Streams</th>
                  <th className="px-6 py-4">Revenue Earned</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredSeries.map(series => (
                  <tr key={series.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={series.coverVertical} alt={series.title} className="w-10 h-14 rounded-lg object-cover" />
                        <div>
                          <span className="font-bold text-white text-sm">{series.title}</span>
                          <div className="text-slate-500 text-[11px]">{series.genre.join(', ')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-amber-400">{series.partnerName}</td>
                    <td className="px-6 py-4 font-mono">{series.episodes?.length || 0} / {series.totalEpisodes}</td>
                    <td className="px-6 py-4 font-mono font-semibold">{(series.viewsCount).toLocaleString()}</td>
                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">₹{series.revenueTotal.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                        {series.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setManagingSeries(series)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-bold"
                      >
                        Episodes
                      </button>
                      <button
                        onClick={() => handleOpenEdit(series)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Episode Management Modal */}
      {managingSeries && (
        <EpisodeManagerModal
          series={managingSeries}
          onClose={() => setManagingSeries(null)}
        />
      )}

      {/* Create / Edit Series Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D111A] border border-[#232C3E] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6 animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold font-display text-white">
                {editingSeries ? 'Edit Series Details' : 'Add New Vertical Drama Series'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Series Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shadows of Enigma Season 2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Synopsis / Story Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Engaging high-stakes plot synopsis for vertical screen viewers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    9:16 Vertical Poster Image URL
                  </label>
                  <input
                    type="url"
                    value={coverVertical}
                    onChange={(e) => setCoverVertical(e.target.value)}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Horizontal Banner Image URL
                  </label>
                  <input
                    type="url"
                    value={bannerHorizontal}
                    onChange={(e) => setBannerHorizontal(e.target.value)}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Content Partner Studio
                  </label>
                  <select
                    value={partnerId}
                    onChange={(e) => setPartnerId(e.target.value)}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    {partnersList.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Total Episodes
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={totalEpisodes}
                    onChange={(e) => setTotalEpisodes(Number(e.target.value))}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Age Rating
                  </label>
                  <select
                    value={ageRating}
                    onChange={(e) => setAgeRating(e.target.value)}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="U">U (All Ages)</option>
                    <option value="13+">13+ (Teens)</option>
                    <option value="16+">16+ (Mature)</option>
                    <option value="18+">18+ (Adults)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Director
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hwang Dong-hyuk"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Cast (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lee Jung-jae, Wi Ha-jun"
                    value={cast}
                    onChange={(e) => setCast(e.target.value)}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Genres (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Romantic, Thriller, Survival"
                  value={genreText}
                  onChange={(e) => setGenreText(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
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
                  {editingSeries ? 'Update Series' : 'Publish Series to App'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ContentManagement;
