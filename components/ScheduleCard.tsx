'use client'

import { useState } from 'react'
import { Check, Calendar, Play } from 'lucide-react'
import type { ScheduleItem } from '@/data/eventData'

interface ScheduleCardProps {
  item: ScheduleItem
}

const typeColors: Record<ScheduleItem['type'], string> = {
  keynote: 'text-pink-800 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/60 border-pink-200 dark:border-pink-800/60 font-semibold',
  workshop: 'text-pink-800 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/60 border-pink-200 dark:border-pink-800/60 font-semibold',
  hackathon: 'text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800/60 font-semibold',
  ceremony: 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/60 font-semibold',
  break: 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700',
  panel: 'text-pink-800 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/60 border-pink-200 dark:border-pink-800/60 font-semibold',
}

function generateICS(item: ScheduleItem): string {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//QFF2026//EN',
    'BEGIN:VEVENT',
    `UID:${item.id}@qff2026`,
    `DTSTAMP:${now}`,
    `DTSTART:20261005T090000`,
    `DTEND:20261005T100000`,
    `SUMMARY:${item.title}`,
    `DESCRIPTION:Qiskit Fall Fest 2026 — ${item.speaker ?? 'Session'}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export default function ScheduleCard({ item }: ScheduleCardProps) {
  const [copied, setCopied] = useState(false)

  const downloadICS = () => {
    const blob = new Blob([generateICS(item)], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `qff2026-${item.id}.ics`
    a.click()
    URL.revokeObjectURL(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (item.type === 'break') {
    return (
      <div className="flex items-center gap-4 px-4 py-2 opacity-60">
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 w-32 flex-shrink-0">{item.time}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">— {item.title} —</span>
      </div>
    )
  }

  return (
    <div className="glass-card bg-white/90 dark:bg-slate-900/85 border-pink-200/80 dark:border-pink-900/40 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md">
      {/* Time */}
      <div className="flex-shrink-0 w-full sm:w-32">
        <span className="font-mono text-xs text-pink-800 dark:text-pink-300 bg-pink-100/90 dark:bg-pink-950/80 border border-pink-300 dark:border-pink-800 rounded-md px-2.5 py-1 inline-block font-semibold">
          {item.time}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${typeColors[item.type]}`}>
            {item.type}
          </span>
          {item.track && item.track.toLowerCase() !== item.type.toLowerCase() && (
            <span className="font-mono text-[10px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded uppercase tracking-wider font-medium">
              {item.track}
            </span>
          )}
        </div>
        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug mb-1">{item.title}</h4>
        {item.speaker && (
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">by {item.speaker}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0 mt-2 sm:mt-0 w-full sm:w-auto">
        <button
          onClick={downloadICS}
          title="Add to Calendar"
          className="min-h-[44px] flex items-center justify-center gap-2 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-pink-50 dark:hover:bg-slate-700 border border-pink-200 dark:border-pink-800/80 transition-all duration-200 shadow-2xs cursor-pointer w-full sm:w-auto"
        >
          {copied ? <Check size={14} className="text-emerald-600 dark:text-emerald-400" /> : <Calendar size={14} />}
          <span className="sm:hidden">{copied ? 'Added to Calendar!' : 'Add to Calendar'}</span>
          <span className="hidden sm:inline">{copied ? 'Added!' : '.ics'}</span>
        </button>
        {item.streamUrl && (
          <a
            href={item.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] flex items-center justify-center gap-2 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-medium text-pink-700 dark:text-pink-300 hover:text-pink-900 dark:hover:text-pink-100 bg-pink-50 dark:bg-pink-950/60 hover:bg-pink-100 dark:hover:bg-pink-900/60 border border-pink-300 dark:border-pink-800 transition-all duration-200 shadow-2xs cursor-pointer w-full sm:w-auto"
          >
            <Play size={14} />
            <span className="sm:hidden">Watch Stream</span>
            <span className="hidden sm:inline">Stream</span>
          </a>
        )}
      </div>
    </div>
  )
}