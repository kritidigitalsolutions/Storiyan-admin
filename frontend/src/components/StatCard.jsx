import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle,
  badge,
  glowColor = 'gold'
}) => {
  const glowStyles = {
    gold: 'border-amber-500/30 hover:border-amber-500/60 bg-gradient-to-br from-[#121724] to-[#0A0D14]',
    red: 'border-red-500/30 hover:border-red-500/60 bg-gradient-to-br from-[#171016] to-[#0A0D14]',
    emerald: 'border-emerald-500/30 hover:border-emerald-500/60 bg-gradient-to-br from-[#101918] to-[#0A0D14]',
    blue: 'border-sky-500/30 hover:border-sky-500/60 bg-gradient-to-br from-[#101524] to-[#0A0D14]',
  };

  const iconColors = {
    gold: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    red: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  };

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 relative group overflow-hidden shadow-lg ${glowStyles[glowColor]}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>

      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
            {badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {badge}
              </span>
            )}
          </div>
          <div className="text-2xl font-black font-display text-white mt-1.5 tracking-tight">
            {value}
          </div>
        </div>

        <div className={`p-3 rounded-xl border ${iconColors[glowColor]} transition-transform group-hover:scale-110 duration-300`}>
          {icon}
        </div>
      </div>

      {(change || subtitle) && (
        <div className="mt-3.5 flex items-center justify-between text-xs pt-3 border-t border-slate-800/80 relative z-10">
          {change && (
            <div className={`flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              <span>{change}</span>
              <span className="text-slate-500 font-normal text-[11px] ml-0.5">vs last week</span>
            </div>
          )}
          {subtitle && (
            <span className="text-[11px] text-slate-400 font-medium">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
};
