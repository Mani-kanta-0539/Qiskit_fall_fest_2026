'use client'

import type { Track } from '@/data/eventData'
import { Zap, Layers, ChevronRight } from 'lucide-react'

interface TrackCardProps {
  track: Track
}

const difficultyConfig = {
  Beginner: { color: 'text-emerald-700 bg-emerald-50 border-emerald-300 font-medium', dot: 'bg-emerald-500' },
  Intermediate: { color: 'text-amber-700 bg-amber-50 border-amber-300 font-medium', dot: 'bg-amber-500' },
  Advanced: { color: 'text-rose-700 bg-rose-50 border-rose-300 font-medium', dot: 'bg-rose-500' },
}

const trackAccents = ['#db2777', '#ec4899', '#be185d']

export default function TrackCard({ track }: TrackCardProps) {
  const idx = parseInt(track.number) - 1
  const accent = trackAccents[idx % trackAccents.length]
  const diff = difficultyConfig[track.difficulty]

  return (
    <div
      className="glass-card bg-white/90 border border-pink-200/80 p-6 flex flex-col gap-4 group relative overflow-hidden shadow-sm hover:shadow-md hover:border-pink-300 transition-all"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-2xl font-bold opacity-40 group-hover:opacity-80 transition-opacity"
            style={{ color: accent }}
          >
            {track.number}
          </span>
          <Layers size={20} style={{ color: accent }} className="opacity-80" />
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1.5 flex-shrink-0 ${diff.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
          {track.difficulty}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-bold text-lg text-slate-900 leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors">
          {track.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">{track.description}</p>
      </div>

      {/* Problem Brief */}
      <div className="bg-pink-50/60 rounded-xl p-4 border border-pink-200/70">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={12} style={{ color: accent }} />
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Challenge Brief</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{track.problemBrief}</p>
      </div>

      {/* Tools */}
      <div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-2">Recommended Tools</span>
        <div className="flex flex-wrap gap-1.5">
          {track.tools.map((tool) => (
            <span
              key={tool}
              className="font-mono text-[10px] px-2 py-1 rounded bg-pink-50 border border-pink-200/80 text-slate-600 hover:text-pink-600 hover:border-pink-300 transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <a
        href="/hackathon"
        className="flex items-center gap-1 text-xs font-semibold mt-auto pt-2"
        style={{ color: accent }}
      >
        View full problem statement
        <ChevronRight size={12} />
      </a>
    </div>
  )
}
