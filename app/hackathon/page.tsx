'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, ExternalLink, GitBranch,
  Trophy, Target, Clock, Users, Cpu,
  Sparkles, BookOpen, ShieldCheck
} from 'lucide-react'
import { fadeUp, stagger } from '@/lib/variants'
import { AnnouncementTicker } from '@/components/AnnouncementTicker'
import TrackCard from '@/components/TrackCard'
import { tracksData, announcements, eventConfig } from '@/data/eventData'

const scoringCriteria = [
  { label: 'Technical Complexity using Qiskit', percentage: 35, color: '#ec4899' },
  { label: 'Innovation & Originality', percentage: 25, color: '#f472b6' },
  { label: 'Practical Feasibility', percentage: 20, color: '#ff2a85' },
  { label: 'Pitch & Presentation', percentage: 20, color: '#f43f5e' },
]

const prizes = [
  { place: '1st', icon: '🥇', title: 'Grand Champion', reward: 'IBM Qiskit Merch Kit + Cash Prize + Cloud Credits + Trophy + Certificate', color: '#FFD700' },
  { place: '2nd', icon: '🥈', title: 'Quantum Runner-Up', reward: 'IBM Qiskit Merch + Cash Prize + Cloud Credits + Certificate', color: '#C0C0C0' },
  { place: '3rd', icon: '🥉', title: 'Quantum Innovator', reward: 'IBM Qiskit Sticker Pack + Cash Prize + Certificate', color: '#CD7F32' },
]

const deliverables = [
  { label: 'GitHub Repository', detail: 'Public repo with README, setup instructions, and all circuit code' },
  { label: '3-Minute Demo Video', detail: 'Uploaded to YouTube/Drive — show the working quantum solution' },
  { label: 'Slide Deck', detail: 'Max 8 slides: problem → approach → solution → demo → future work' },
  { label: 'Devpost Submission', detail: 'Complete project profile with all links and team members filled in' },
]

export default function HackathonPage() {
  return (
    <div className="relative min-h-screen pt-16 overflow-x-hidden w-full">
      {/* Announcement Ticker */}
      <div className="sticky top-16 z-40">
        <AnnouncementTicker items={announcements} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="py-10 sm:py-14 text-center"
        >
          <motion.span variants={fadeUp} className="section-eyebrow justify-center">
            24-Hour Quantum Hackathon • Andhra University
          </motion.span>
          <motion.h1 variants={fadeUp} className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
            Build the <span className="shimmer-text">Quantum Future</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            A 24-hour sprint powered by IBM Qiskit. Assemble your team, explore quantum algorithms, and execute your circuits on real quantum hardware.
          </motion.p>
        </motion.div>

        {/* ── CONDITIONAL RENDER: COMING SOON vs ACTIVE ────────── */}
        {!eventConfig.hackathonAnnounced ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="pb-24 flex flex-col gap-10 sm:gap-12"
          >
            {/* Main Coming Soon Banner Card */}
            <motion.div
              variants={fadeUp}
              className="glass-card bg-white/90 border border-pink-200/80 p-6 sm:p-10 md:p-14 text-center max-w-4xl mx-auto relative overflow-hidden w-full shadow-xl shadow-pink-100/50"
              style={{
                background: 'radial-gradient(ellipse at center top, rgba(253, 242, 248, 0.9), rgba(255, 255, 255, 0.95))',
              }}
            >
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#ec4899] to-transparent" />

              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] border border-pink-300 bg-pink-50 text-pink-700 rounded-full px-4 py-1.5 mb-6 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] animate-pulse" />
                Problem Statements Under Embargo
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Challenge Tracks & Details Coming Soon
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
                Official problem statements, challenge tracks, submission rules, and the prize pool are being finalized with IBM Quantum. The hackathon will kick off on <span className="text-[#db2777] font-semibold">Day 2 (October 6, 2026)</span> at Andhra University North Campus.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left mb-8 sm:mb-10">
                {[
                  {
                    icon: Users,
                    color: 'text-[#db2777]',
                    title: 'Team Size',
                    desc: '2 to 4 members. Interdisciplinary squads encouraged.',
                  },
                  {
                    icon: Clock,
                    color: 'text-[#ec4899]',
                    title: '24-Hour Sprint',
                    desc: 'Coding begins Oct 6, 09:30 AM through Oct 7, 09:00 AM.',
                  },
                  {
                    icon: Cpu,
                    color: 'text-[#be185d]',
                    title: 'Real Quantum HW',
                    desc: 'Free access to IBM superconducting quantum processors.',
                  },
                  {
                    icon: Trophy,
                    color: 'text-amber-600',
                    title: 'Prizes & Swag',
                    desc: 'Cash prizes, IBM Qiskit kits, certificates & trophies.',
                  },
                ].map(({ icon: Icon, color, title, desc }) => (
                  <div key={title} className="p-4 rounded-xl bg-pink-50/50 border border-pink-200/80 flex flex-col gap-2">
                    <Icon size={20} className={color} />
                    <p className="font-semibold text-slate-900 text-sm">{title}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <Link
                  href="/learn"
                  className="btn-glow min-h-[44px] flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white w-full sm:w-auto cursor-pointer"
                >
                  <BookOpen size={15} />
                  <span>Prepare with Qiskit Resources</span>
                </Link>
                <a
                  href={eventConfig.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass min-h-[44px] flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-slate-700 w-full sm:w-auto cursor-pointer"
                >
                  <Users size={15} className="text-[#db2777]" />
                  <span>Find Teammates on Discord</span>
                </a>
              </div>
            </motion.div>



            {/* Rules & Eligibility Box */}
            <motion.div variants={fadeUp} className="max-w-4xl mx-auto w-full glass-card bg-white/90 border border-pink-200/80 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={20} className="text-[#db2777]" />
                <h3 className="text-lg font-bold text-slate-900">Eligibility & General Rules</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span><strong className="text-slate-900">100% Free Entry:</strong> No registration or participation fees of any kind.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span><strong className="text-slate-900">Open to All Students:</strong> College students, polytechnic, and university students across all years.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span><strong className="text-slate-900">Must Use Qiskit:</strong> All project submissions must utilize IBM Qiskit in their quantum workflow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">✓</span>
                  <span><strong className="text-slate-900">Original Work:</strong> Code written before the official start time is strictly prohibited.</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        ) : (
          /* ── ACTIVE HACKATHON CONTENT (When Announced) ────────── */
          <>
            {/* Challenge Tracks */}
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="mb-16"
            >
              <motion.span variants={fadeUp} className="section-eyebrow">Challenge Tracks</motion.span>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-bold text-slate-900 mb-8">
                Problem Statements
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tracksData.map((track, i) => (
                  <motion.div key={track.id} variants={fadeUp} custom={i}>
                    <TrackCard track={track} />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Judging Rubric */}
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="mb-16"
            >
              <motion.span variants={fadeUp} className="section-eyebrow">Evaluation</motion.span>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-bold text-slate-900 mb-8">
                Judging Criteria & Scoring Rubric
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scoringCriteria.map((c, i) => (
                  <motion.div
                    key={c.label}
                    variants={fadeUp}
                    custom={i}
                    className="glass-card bg-white/90 border border-pink-200/80 p-6 flex flex-col gap-4 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Target size={20} style={{ color: c.color }} />
                        <h3 className="font-semibold text-slate-900 text-sm leading-snug">{c.label}</h3>
                      </div>
                      <span
                        className="font-mono text-2xl font-bold flex-shrink-0"
                        style={{ color: c.color }}
                      >
                        {c.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-pink-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${c.color}, ${c.color}cc)` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Prizes */}
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="mb-16"
            >
              <motion.span variants={fadeUp} className="section-eyebrow">Prizes & Swag</motion.span>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-bold text-slate-900 mb-8">
                What You Can Win
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {prizes.map((p, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i}
                    className="glass-card bg-white/90 border border-pink-200/80 p-6 flex flex-col gap-4 text-center relative overflow-hidden shadow-xs"
                  >
                    <div className="text-5xl">{p.icon}</div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest font-semibold" style={{ color: p.color }}>
                        {p.place} Place
                      </span>
                      <h3 className="font-bold text-slate-900 text-lg mt-1">{p.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.reward}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Submission Portal */}
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="mb-16"
            >
              <motion.span variants={fadeUp} className="section-eyebrow">Submission Portal</motion.span>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-bold text-slate-900 mb-8">
                Submit Your Project
              </motion.h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div variants={fadeUp} className="glass-card bg-white/90 border border-pink-200/80 p-6 flex flex-col gap-4 shadow-xs">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <GitBranch size={18} className="text-[#db2777]" />
                    Required Deliverables
                  </h3>
                  <div className="flex flex-col gap-3">
                    {deliverables.map((d, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-pink-50/50 rounded-xl border border-pink-200/80">
                        <span className="font-mono text-[10px] text-[#db2777] bg-pink-100 border border-pink-300 px-2 py-0.5 rounded font-semibold flex-shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{d.label}</p>
                          <p className="text-xs text-slate-600 mt-0.5">{d.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="glass-card bg-white/90 border border-pink-200/80 p-8 flex flex-col items-center justify-center text-center gap-6 shadow-sm"
                >
                  <div className="text-5xl">🚀</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xl">Ready to Submit?</h3>
                    <p className="text-slate-600 text-sm mt-2">
                      Deadline: Day 3 — 09:00 AM sharp. Late submissions will NOT be accepted.
                    </p>
                  </div>
                  <a
                    href={eventConfig.devpost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl font-semibold text-white text-sm"
                  >
                    <Trophy size={16} />
                    Submit on Devpost
                  </a>
                </motion.div>
              </div>
            </motion.section>
          </>
        )}
      </div>
    </div>
  )
}
