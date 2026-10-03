'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Calendar, Clock, MapPin, ExternalLink, BookOpen, FolderDown,
  Sparkles, CheckCircle2, User, Award, Layers, Cpu, ShieldCheck
} from 'lucide-react'
import { scheduleData, eventConfig, ScheduleItem } from '@/data/eventData'
import ScheduleCard from '@/components/ScheduleCard'

const dayLabels: Record<number, { label: string; date: string; icon: string; location: string; desc: string }> = {
  1: {
    label: 'Day 1',
    date: 'Oct 5, 2026',
    icon: '🧪',
    location: 'Dr. Y.V.S. Murthy Auditorium (In-Person)',
    desc: 'Technical Workshops & Industry Sessions — Foundations, Qiskit Primitives, Algorithms, and Quantum Optimization.',
  },
  2: {
    label: 'Day 2',
    date: 'Oct 6, 2026',
    icon: '⚡',
    location: 'Online Sessions & Shortlist Announcement',
    desc: 'Two Online Sessions (IBM & Bloq Quantum — topics TBD) and Shortlisted Teams Results Announcement at 09:00 PM IST.',
  },
  3: {
    label: 'Day 3',
    date: 'Oct 7, 2026',
    icon: '🏆',
    location: 'Online Pitching Room & Grand Finale',
    desc: '09:00 AM – 12:00 PM Shortlisted Teams Pitching & Live Demo (Jury Round), followed by Awards Ceremony.',
  },
}

const typeBadges: Record<ScheduleItem['type'], { bg: string; text: string; label: string }> = {
  keynote: { bg: 'bg-purple-100 dark:bg-purple-950/60', text: 'text-purple-700 dark:text-purple-300', label: 'Keynote' },
  workshop: { bg: 'bg-pink-100 dark:bg-pink-950/60', text: 'text-pink-700 dark:text-pink-300', label: 'Workshop' },
  hackathon: { bg: 'bg-rose-100 dark:bg-rose-950/60', text: 'text-rose-700 dark:text-rose-300', label: 'Hackathon Sprint' },
  ceremony: { bg: 'bg-amber-100 dark:bg-amber-950/60', text: 'text-amber-700 dark:text-amber-300', label: 'Ceremony' },
  break: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400', label: 'Break' },
  panel: { bg: 'bg-blue-100 dark:bg-blue-950/60', text: 'text-blue-700 dark:text-blue-300', label: 'Panel' },
}

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1)
  const filteredSchedule = scheduleData.filter(s => s.day === activeDay)

  return (
    <div className="relative overflow-x-hidden w-full bg-white dark:bg-[#09090f] transition-colors duration-250 min-h-screen">
      <div className="quantum-bg" aria-hidden="true" />

      {/* HEADER / HERO */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 dark:bg-pink-950/70 border border-pink-300 dark:border-pink-800 text-pink-700 dark:text-pink-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles size={14} className="text-pink-500 animate-pulse" />
            <span>Official Event Schedule · October 5 – 7, 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Technical Workshop &amp; Event{' '}
            <span className="gradient-text-neon">Schedule</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            Three days of intensive hands-on Qiskit workshops, industry optimization sessions with Bloq Quantum, virtual mentorship, and grand finale project defenses.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center flex-wrap mb-10">
            <a
              href={eventConfig.hackathonRegistrationForm}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl text-sm font-bold text-white shadow-lg shadow-pink-300/40 dark:shadow-pink-950/60 cursor-pointer w-full sm:w-auto"
            >
              <ExternalLink size={16} /> Register for Hackathon (Google Form)
            </a>

            <a
              href={eventConfig.hackathonManualDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-pink-700 dark:text-pink-300 bg-pink-50/90 dark:bg-slate-900/90 border border-pink-300 dark:border-pink-700/80 hover:bg-pink-100 dark:hover:bg-slate-800 transition-all w-full sm:w-auto shadow-xs"
            >
              <BookOpen size={16} className="text-pink-500" />
              <span>Official Handbook (PDF)</span>
            </a>

            <a
              href={eventConfig.problemStatementsDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all w-full sm:w-auto shadow-xs"
            >
              <FolderDown size={16} className="text-pink-500" />
              <span>Problem Statements Drive</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* DAY TABS & SCHEDULE */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Day Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {([1, 2, 3] as const).map((day) => {
              const active = activeDay === day
              const info = dayLabels[day]
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setActiveDay(day)}
                  className={`flex flex-col items-center sm:items-start p-5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                    active
                      ? 'bg-gradient-to-br from-pink-600 to-pink-700 border-pink-600 text-white shadow-xl shadow-pink-300/40 dark:shadow-pink-950/60 scale-[1.02]'
                      : 'bg-white/90 dark:bg-slate-900/80 border-pink-100 dark:border-pink-900/40 text-slate-800 dark:text-slate-200 hover:border-pink-300 dark:hover:border-pink-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{info.icon}</span>
                    <span className="font-black text-lg">{info.label}</span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ml-auto font-bold ${
                      active ? 'bg-white/20 text-white' : 'bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300'
                    }`}>
                      {info.date}
                    </span>
                  </div>
                  <p className={`text-xs font-medium mt-1 leading-snug ${ active ? 'text-pink-100' : 'text-slate-500 dark:text-slate-400' }`}>
                    {info.location}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Selected Day Info Banner */}
          <motion.div
            key={`banner-${activeDay}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card bg-pink-50/80 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/60 p-4 sm:p-5 rounded-2xl mb-8 flex items-start sm:items-center gap-3.5 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-sm">
              {dayLabels[activeDay].icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                {dayLabels[activeDay].label} — {dayLabels[activeDay].date}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                {dayLabels[activeDay].desc}
              </p>
            </div>
          </motion.div>

          {/* Schedule Timeline Grid */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredSchedule.map((item, index) => {
                const badge = typeBadges[item.type] || typeBadges.workshop
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.04 }}
                    className="glass-card bg-white/95 dark:bg-slate-900/90 border border-pink-200/80 dark:border-pink-900/50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Left: Time & Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-[210px]">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/50 px-3 py-1.5 rounded-xl border border-pink-200 dark:border-pink-900/50">
                        <Clock size={13} className="text-pink-500" />
                        <span>{item.time}</span>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full w-fit ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                    </div>

                    {/* Middle: Title, Speaker & Details */}
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </h4>

                      {item.track && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-start gap-1 font-medium">
                          <span className="text-pink-500 font-bold">• Focus:</span> {item.track}
                        </p>
                      )}

                      {item.speaker && (
                        <p className="text-xs font-semibold text-pink-600 dark:text-pink-400 mt-1 flex items-center gap-1">
                          <User size={12} className="text-pink-500" />
                          <span>Facilitator: {item.speaker}</span>
                        </p>
                      )}
                    </div>

                    {/* Right: Tag / Action */}
                    {item.day === 1 && (
                      <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 pt-2 md:pt-0 border-t md:border-t-0 border-pink-100 dark:border-pink-900/40">
                        <MapPin size={13} className="text-pink-500" />
                        <span>Murthy Auditorium</span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  )
}