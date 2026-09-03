import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

export const VideoPlayerModal = () => {
  const { previewingEpisode, setPreviewingEpisode } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress] = useState(28);

  if (!previewingEpisode) return null;

  const { series, episode } = previewingEpisode;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0D111A] border border-[#232C3E] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-in">
        {/* Left 9:16 Video Player Screen */}
        <div className="md:w-1/2 bg-black relative flex items-center justify-center p-4 min-h-[420px]">
          <div className="relative w-[270px] h-[480px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
            <video
              src={episode.videoUrl}
              poster={episode.thumbnail || series.coverVertical}
              autoPlay
              loop
              muted={isMuted}
              className="w-full h-full object-cover"
            />

            {/* Top Overlay */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md">
                Ep {episode.epNumber}
              </span>
              {episode.isFree ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/80 text-black flex items-center gap-1">
                  <Unlock className="w-2.5 h-2.5" /> FREE PREVIEW
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-black flex items-center gap-1 font-mono">
                  <Lock className="w-2.5 h-2.5" /> ₹{episode.costInCoins || 5} PAYWALL
                </span>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-3 inset-x-3 z-10 space-y-2 bg-gradient-to-t from-black via-black/70 to-transparent p-2 rounded-xl">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:text-amber-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:text-amber-400 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-[10px] font-mono text-slate-300">
                    {episode.durationFormatted || '02:18'}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-emerald-400">1080p HLS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Episode Metadata */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {series.title}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Episode {episode.epNumber}: {episode.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewingEpisode(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Synopsis */}
            <div className="mt-4 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Episode Synopsis</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {episode.synopsis || series.description}
              </p>
            </div>

            {/* Tech Encoding Details */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Stream & Video Metadata</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Aspect Ratio</div>
                  <div className="font-bold text-slate-200 mt-0.5">9:16 Vertical (1080x1920)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Duration</div>
                  <div className="font-bold text-slate-200 mt-0.5">{episode.durationFormatted} ({episode.durationSeconds || 180}s)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Audio Codec</div>
                  <div className="font-bold text-slate-200 mt-0.5">AAC 48kHz Stereo</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Partner Studio</div>
                  <div className="font-bold text-slate-200 mt-0.5">{series.partnerName}</div>
                </div>
              </div>
            </div>

            {/* Viewership Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px]">
                  <Eye className="w-3 h-3" /> Views
                </div>
                <div className="font-bold text-white mt-0.5">{(episode.views || 450000).toLocaleString()}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800">
                <div className="flex items-center justify-center gap-1 text-rose-400 text-[10px]">
                  <Heart className="w-3 h-3" /> Likes
                </div>
                <div className="font-bold text-white mt-0.5">{(episode.likes || 38200).toLocaleString()}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800">
                <div className="flex items-center justify-center gap-1 text-sky-400 text-[10px]">
                  <Share2 className="w-3 h-3" /> Shares
                </div>
                <div className="font-bold text-white mt-0.5">{(episode.shares || 12400).toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              onClick={() => setPreviewingEpisode(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
