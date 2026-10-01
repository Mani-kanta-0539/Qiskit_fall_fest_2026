'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Users, Award, BookOpen, ExternalLink, Shield } from 'lucide-react'
import { eventConfig } from '@/data/eventData'

export default function SpeakersPage() {
  return (
    <div className="relative overflow-x-hidden w-full bg-white dark:bg-[#09090f] transition-colors duration-250 min-h-screen flex flex-col justify-between">
      <div className="quantum-bg" aria-hidden="true" />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Quantum Superposition Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-pink-100/90 dark:bg-pink-950/70 border border-pink-300 dark:border-pink-800 text-pink-700 dark:text-pink-300 text-xs sm:text-sm font-mono font-bold mb-8 shadow-sm">
            <Sparkles size={16} className="text-pink-500 animate-pulse" />
            <span>|Speakers⟩ = 1/√2 (|Revealed⟩ + |Unrevealed⟩)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Speakers &amp; Mentors in{' '}
            <span className="gradient-text-neon">Superposition</span>
          </h1>

          {/* Dialogue Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card bg-white/90 dark:bg-slate-900/80 border-2 border-pink-300/80 dark:border-pink-800/80 p-6 sm:p-8 rounded-3xl max-w-2xl mx-auto shadow-xl mb-10 text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/0 rounded-bl-full pointer-events-none" />
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-2 flex items-center gap-2">
              <Users size={14} /> Line-Up Announcement Pending
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
              &ldquo;Our panel of IBM Quantum Ambassadors, workshop leaders, and expert judges from <strong>Bloq Quantum</strong> are currently entangled in superposition! The exact speaker roster will collapse into observation as we approach opening day.&rdquo;
            </p>
            <div className="mt-4 pt-4 border-t border-pink-100 dark:border-pink-900/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Evaluation Partner: <strong>Bloq Quantum</strong></span>
              <span>Platform: IBM Quantum &amp; Qiskit</span>
            </div>
          </motion.div>

          {/* Category Cards */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left mb-12">
            <div className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-3">
                <Users size={20} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">IBM Quantum Keynotes</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Keynote addresses on quantum hardware evolution, 156-qubit Heron processors, and error mitigation algorithms.
              </p>
              <span className="inline-block mt-3 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-pink-50 dark:bg-slate-800 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-800">
                Superposition State
              </span>
            </div>

            <div className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Bloq Quantum Jury</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Industry jury from Bloq Quantum evaluating scientific innovation, Qiskit integration, quantum edge, and live project pitches.
              </p>
              <span className="inline-block mt-3 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-slate-800 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                Evaluation Partner
              </span>
            </div>

            <div className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-3">
                <Award size={20} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Technical Mentors</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Virtual office hours &amp; hands-on debugging mentors assisting teams with Qiskit SDK, VQE, QAOA, and QML architectures.
              </p>
              <span className="inline-block mt-3 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                Revealing Soon
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
            <a
              href={eventConfig.hackathonRegistrationForm}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white shadow-md shadow-pink-300/40"
            >
              <ExternalLink size={16} /> Register via Google Form
            </a>
            <Link
              href="/hackathon"
              className="btn-glass inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
            >
              <span>Explore Problem Statements</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
