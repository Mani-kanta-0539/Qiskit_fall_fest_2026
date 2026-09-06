'use client'

import { Pin, Info, AlertTriangle, CheckCircle } from 'lucide-react'
import type { Announcement } from '@/data/eventData'

interface AnnouncementTickerProps {
  items: Announcement[]
}

const typeIcons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
}

const typeColors = {
  info: 'text-[#db2777]',
  warning: 'text-amber-600',
  success: 'text-emerald-600',
}

export function AnnouncementTicker({ items }: AnnouncementTickerProps) {
  const pinned = items.filter((a) => a.pinned)

  return (
    <div className="relative overflow-hidden bg-pink-50/90 backdrop-blur-md border-y border-pink-200/80 py-2.5 shadow-sm">
      {/* Live indicator */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ec4899] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ec4899]" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#db2777] font-bold">Live</span>
      </div>

      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-pink-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-pink-50 to-transparent z-10" />

      {/* Ticker */}
      <div className="ticker-wrapper pl-28">
        <div className="ticker-content">
          {[...pinned, ...pinned].map((a, i) => (
            <span key={`${a.id}-${i}`} className="inline-flex items-center gap-3 mx-8 text-xs text-slate-700 font-medium">
              <Pin size={11} className="text-[#db2777] flex-shrink-0" />
              <span>{a.message}</span>
              <span className="font-mono text-[10px] text-slate-400">{a.timestamp}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AnnouncementCard({ item }: { item: Announcement }) {
  const Icon = typeIcons[item.type]
  const color = typeColors[item.type]

  return (
    <div className={`glass-card bg-white/90 p-4 flex gap-4 ${item.pinned ? 'border-pink-300/80 shadow-md shadow-pink-100/50' : 'border-pink-200/60'}`}>
      <div className={`mt-0.5 flex-shrink-0 ${color}`}>
        {item.pinned ? <Pin size={16} className="text-[#db2777]" /> : <Icon size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-800 leading-relaxed font-medium">{item.message}</p>
        <span className="font-mono text-[10px] text-slate-400 mt-1.5 block">{item.timestamp}</span>
      </div>
      {item.pinned && (
        <span className="flex-shrink-0 font-mono text-[10px] text-[#be185d] bg-pink-100 border border-pink-300 px-2 py-0.5 rounded font-semibold self-start shadow-xs">
          PINNED
        </span>
      )}
    </div>
  )
}
