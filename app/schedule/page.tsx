'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, BookOpen, FolderDown, ExternalLink, Calendar, Clock, MapPin, Award } from 'lucide-react'
import { eventConfig, timelineEvents } from '@/data/eventData'

export default function SchedulePage() {
  return (
    <div className="relative overflow-x-hidden w-full bg-white dark:bg-[#09090f] transition-colors duration-250 min-h-screen flex flex-col justify-between">
      <div className="quantum-bg" aria-hidden="true" />

      {/* HEADER / HERO */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Quantum Superposition Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-pink-100/90 dark:bg-pink-950/70 border border-pink-300 dark:border-pink-800 text-pink-700 dark:text-pink-300 text-xs sm:text-sm font-mono font-bold mb-8 shadow-sm">
            <Sparkles size={16} className="text-pink-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>|Ψ⟩ = 1/√2 (|Schedule Announced⟩ + |Unannounced⟩)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Schedule Entangled in{' '}
            <span className="gradient-text-neon">Superposition</span>
          </h1>

          {/* Dialogue card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card bg-white/90 dark:bg-slate-900/80 border-2 border-pink-300/80 dark:border-pink-800/80 p-6 sm:p-8 rounded-3xl max-w-2xl mx-auto shadow-xl mb-10 text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/0 rounded-bl-full pointer-events-none" />
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-2 flex items-center gap-2">
              <Clock size={14} /> Quantum State Measurement Pending
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
              &ldquo;Our detailed hour-by-hour timetable is currently in quantum superposition! The exact wavefunction will collapse and reveal all keynote slots, hands-on lab timings, and speaker announcements during opening ceremony preparation.&rdquo;
            </p>
            <div className="mt-4 pt-4 border-t border-pink-100 dark:border-pink-900/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Event Milestone Dates: <strong>October 5 – 7, 2026</strong></span>
              <span>Bloq Quantum Evaluation Partner</span>
            </div>
          </motion.div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center flex-wrap mb-14">
            <a
              href={eventConfig.hackathonRegistrationForm}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-base font-bold text-white shadow-xl shadow-pink-300/40 dark:shadow-pink-950/60 cursor-pointer w-full sm:w-auto"
            >
              <ExternalLink size={18} /> Register for Hackathon (Google Form)
            </a>

            <a
              href={eventConfig.hackathonManualDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-base font-bold text-pink-700 dark:text-pink-300 bg-pink-50/90 dark:bg-slate-900/90 border-2 border-pink-300 dark:border-pink-700/80 hover:bg-pink-100 dark:hover:bg-slate-800 transition-all w-full sm:w-auto shadow-sm"
            >
              <BookOpen size={18} className="text-pink-500" />
              <span>Official Handbook (PDF)</span>
            </a>

            <a
              href={eventConfig.problemStatementsDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-bold transition-all w-full sm:w-auto shadow-xs"
            >
              <FolderDown size={18} className="text-pink-500" />
              <span>Problem Statements Drive</span>
            </a>
          </div>
        </motion.div>

        {/* THREE CORE EVENT MILESTONES (From Participant Handbook) */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300">Day 1 · In-Person</span>
                <Calendar size={18} className="text-pink-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Oct 5, 2026</h3>
              <p className="text-xs font-bold text-pink-600 dark:text-pink-400 mb-2">Hands-on Quantum Workshops</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Offline lab sessions at Dr. Y.V.S. Murthy Auditorium covering Qiskit primitives, circuits, and hands-on algorithms on real IBM Quantum backends.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100 dark:border-pink-900/40 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin size={12} className="text-pink-500" /> AUCE North Campus, Visakhapatnam
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card bg-white/95 dark:bg-slate-900/90 border-2 border-pink-400 dark:border-pink-600 p-6 rounded-2xl flex flex-col justify-between shadow-lg shadow-pink-200/30 dark:shadow-pink-950/40"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">Day 2 · Online</span>
                <Clock size={18} className="text-rose-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Oct 6, 2026</h3>
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-2">Technical Mentorship &amp; Submission</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Virtual office hours &amp; architecture guidance. Hard submission deadline strictly at <strong>6:00 PM IST sharp</strong> (Deck, GitHub repo &amp; Video demo).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-rose-100 dark:border-rose-900/40 text-[11px] font-bold text-rose-600 dark:text-rose-400">
              🚨 Submission Portal Closes @ 6:00 PM IST
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">Day 3 · Online</span>
                <Award size={18} className="text-purple-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Oct 7, 2026</h3>
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-2">Grand Finale &amp; Bloq Jury Pitch</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Shortlisted teams present live project demos before the Bloq Quantum jury, followed by winner declarations, certificates &amp; swag kits.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100 dark:border-pink-900/40 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Evaluation: Bloq Quantum</span>
              <span className="font-semibold text-pink-600 dark:text-pink-400">IBM Certificates</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}