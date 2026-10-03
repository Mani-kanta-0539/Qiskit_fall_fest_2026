'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Users, Award, Shield, ExternalLink, UserCheck, BookOpen } from 'lucide-react'
import { eventConfig, speakersData, Speaker } from '@/data/eventData'
import SpeakerCard from '@/components/SpeakerCard'

export default function SpeakersPage() {
  const [tab, setTab] = useState<'all' | 'offline' | 'online'>('all')

  const filteredSpeakers = tab === 'all'
    ? speakersData
    : speakersData.filter(s => s.sessionType === tab)

  return (
    <div className="relative overflow-x-hidden w-full bg-white dark:bg-[#09090f] transition-colors duration-250 min-h-screen">
      <div className="quantum-bg" aria-hidden="true" />

      {/* HEADER */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 dark:bg-pink-950/70 border border-pink-300 dark:border-pink-800 text-pink-700 dark:text-pink-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles size={14} className="text-pink-500 animate-pulse" />
            <span>Official Workshop Speakers &amp; Industry Facilitators</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Speakers, Mentors &amp;{' '}
            <span className="gradient-text-neon">Facilitators</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            Meet the academic leaders, IBM Quantum engineers, and Bloq Quantum experts guiding sessions at Qiskit Fall Fest 2026.
          </p>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {(['all', 'offline', 'online'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer capitalize ${
                  tab === t
                    ? 'bg-pink-600 text-white shadow-md shadow-pink-300/40 dark:shadow-pink-950/60'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-pink-200/80 dark:border-pink-900/50 hover:border-pink-400 dark:hover:border-pink-700'
                }`}
              >
                {t === 'all' ? 'All Facilitators' : t === 'offline' ? '📍 Offline Speakers (In-Person)' : '🌐 Online Speakers (Virtual)'}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SPEAKERS GRID */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
