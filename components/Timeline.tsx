'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { TimelineEvent } from '@/data/eventData'

const typeColors: Record<TimelineEvent['type'], string> = {
  registration: '#ec4899',
  hackathon: '#f43f5e',
  event: '#8b5cf6',
  deadline: '#f97316',
  certificate: '#10b981',
}

const typeLabels: Record<TimelineEvent['type'], string> = {
  registration: 'Registration',
  hackathon: 'Hackathon',
  event: 'Event',
  deadline: 'Deadline',
  certificate: 'Certificate',
}

interface TimelineProps {
  events: TimelineEvent[]
}

export default function Timeline({ events }: TimelineProps) {
  const now = new Date()

  return (
    <div className="w-full">
      {/* Desktop horizontal timeline */}
      <div className="hidden md:block relative py-8">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200 dark:from-pink-900/60 dark:via-pink-700/60 dark:to-pink-900/60" />

        <div className="relative flex justify-between items-center gap-2">
          {events.map((event, i) => {
            const isPast = event.date < now
            const color = typeColors[event.type]
            const glowStyle = isPast ? { boxShadow: `0 0 12px 4px ${color}60` } : {}
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center group flex-1 min-w-0"
              >
                {i % 2 === 0 && (
                  <div className="mb-3 text-center min-h-[3.5rem] flex flex-col justify-end">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{event.label}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{event.sublabel}</p>
                  </div>
                )}
                {i % 2 !== 0 && <div className="mb-3 min-h-[3.5rem]" />}

                <div
                  className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 shadow-sm bg-white dark:bg-slate-900"
                  style={{ background: isPast ? color : undefined, borderColor: color, ...glowStyle }}
                >
                  {isPast ? (
                    <Check size={14} strokeWidth={3} className="text-white" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  )}
                </div>

                {i % 2 !== 0 && (
                  <div className="mt-3 text-center min-h-[3.5rem] flex flex-col justify-start">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{event.label}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{event.sublabel}</p>
                  </div>
                )}
                {i % 2 === 0 && <div className="mt-3 min-h-[3.5rem]" />}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden flex flex-col gap-0 relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-200 via-pink-300 to-pink-200 dark:from-pink-900/60 dark:via-pink-700/60 dark:to-pink-900/60" />
        {events.map((event, i) => {
          const isPast = event.date < now
          const color = typeColors[event.type]
          const glowStyle = isPast ? { boxShadow: `0 0 10px 3px ${color}50` } : {}
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-4 pb-6 relative"
            >
              <div
                className="relative z-10 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border-2 shadow-sm mt-1 bg-white dark:bg-slate-900"
                style={{ background: isPast ? color : undefined, borderColor: color, ...glowStyle }}
              >
                {isPast ? (
                  <Check size={13} strokeWidth={3} className="text-white" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{event.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{event.sublabel}</p>
                <span className="inline-block mt-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full" style={{ background: color + '22', color }}>{typeLabels[event.type]}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">{typeLabels[type as TimelineEvent['type']]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}