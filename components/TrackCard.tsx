'use client'

import type { Track, TrackDifficulty } from '@/data/eventData'
import { Layers, ChevronRight, ExternalLink, Sparkles, Building2, CheckCircle, FileText } from 'lucide-react'

interface TrackCardProps {
  track: Track
  onSelect?: (track: Track) => void
}

const difficultyConfig: Record<TrackDifficulty, { color: string; dot: string }> = {
  Beginner: {
    color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 font-medium',
    dot: 'bg-emerald-500',
  },
  Intermediate: {
    color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 font-medium',
    dot: 'bg-amber-500',
  },
  Advanced: {
    color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 font-medium',
    dot: 'bg-rose-500',
  },
  'Multi-Level': {
    color: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800 font-medium',
    dot: 'bg-purple-500',
  },
}

const trackAccents = ['#db2777', '#ec4899', '#be185d', '#9333ea', '#e11d48', '#0284c7', '#059669', '#d97706']

export default function TrackCard({ track, onSelect }: TrackCardProps) {
  const idx = parseInt(track.number) - 1
  const accent = trackAccents[idx % trackAccents.length]
  const diff = difficultyConfig[track.difficulty] || difficultyConfig['Intermediate']

  return (
    <div
      className="glass-card bg-white/95 dark:bg-slate-900/90 border border-pink-200/80 dark:border-pink-900/50 p-6 flex flex-col gap-4 group relative overflow-hidden shadow-sm hover:shadow-xl hover:border-pink-300 dark:hover:border-pink-700 transition-all duration-300 rounded-2xl h-full"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* Header with Number, Category & Difficulty */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className="font-mono text-xl font-black opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ color: accent }}
          >
            {track.number}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-pink-100/70 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800/60">
            {track.category}
          </span>
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1.5 flex-shrink-0 ${diff.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
          {track.difficulty}
        </span>
      </div>

      {/* Provider / Institution Banner */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <Building2 size={13} className="text-pink-500 flex-shrink-0" />
        <span className="truncate">{track.provider}</span>
      </div>

      {/* Title */}
      <div>
        <h3
          onClick={() => onSelect?.(track)}
          className="font-bold text-lg text-slate-900 dark:text-white leading-snug cursor-pointer group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-2"
        >
          {track.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
          {track.description}
        </p>
      </div>

      {/* Challenge Brief / Tiers Preview */}
      <div className="bg-pink-50/50 dark:bg-slate-950/60 rounded-xl p-3.5 border border-pink-200/60 dark:border-pink-900/40 text-xs">
        {track.subtracks && track.subtracks.length > 0 ? (
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-pink-600 dark:text-pink-400 font-bold block">
              Subtracks &amp; Levels
            </span>
            {track.subtracks.slice(0, 3).map((st, i) => (
              <div key={i} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="text-pink-500 font-bold">•</span>
                <span className="truncate font-medium">{st.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">{track.problemBrief}</p>
        )}
      </div>

      {/* Recommended Tools */}
      <div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-semibold block mb-1.5">
          Recommended Toolkit
        </span>
        <div className="flex flex-wrap gap-1.5">
          {track.tools.slice(0, 4).map((tool) => (
            <span
              key={tool}
              className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            >
              {tool}
            </span>
          ))}
          {track.tools.length > 4 && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400">
              +{track.tools.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto pt-3 border-t border-pink-100 dark:border-pink-900/40 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onSelect?.(track)}
          className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-200 transition-colors cursor-pointer"
        >
          View Full Prompt <ChevronRight size={14} />
        </button>

        {track.driveLink && (
          <a
            href={track.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-pink-100/60 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800/70 hover:bg-pink-200/80 dark:hover:bg-pink-900/60 transition-colors"
          >
            <FileText size={12} />
            <span>Drive PDF</span>
            <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  )
}
