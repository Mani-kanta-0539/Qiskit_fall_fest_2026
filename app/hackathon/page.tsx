'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, ExternalLink, Trophy, Gift, CheckCircle2,
  FolderDown, Building2, BookOpen, Layers, X, Sparkles,
  HelpCircle, Cpu, Zap, FileText
} from 'lucide-react'
import Timeline from '@/components/Timeline'
import TrackCard from '@/components/TrackCard'
import { eventConfig, tracksData, timelineEvents, Track } from '@/data/eventData'

const hackathonTimeline = timelineEvents

const categories = [
  'All',
  'Error Correction & Games',
  'Optimization & Finance',
  'Quantum Chemistry',
  'Architecture & Routing',
  'Many-Body Simulation',
  'Biophysics & Healthcare',
  'Cybersecurity & Networks',
  'Quantum AI & Healthcare',
]

const howItWorks = [
  { step: '01', title: 'Register via Google Form', desc: 'Click Register for Hackathon to submit your team or solo entry via our official Google Form. 100% free of charge.' },
  { step: '02', title: 'Form Your Team', desc: 'Join our Discord and WhatsApp for team matchmaking. Teams can have 1–4 members. An in-person team mixer is held on Day 1 at Dr. Y.V.S. Murthy Auditorium.' },
  { step: '03', title: 'Read Hackathon Manual & Challenges', desc: 'Download the official Hackathon Manual (PDF) and browse the 8 research problem statements below or via Google Drive.' },
  { step: '04', title: 'Build & Code Solution', desc: 'Code with Qiskit on real IBM quantum hardware and state-of-the-art simulators during the hackathon sprint. IBM mentors and faculty are available throughout.' },
  { step: '05', title: 'Demo and Win', desc: 'Present your project to judges on Day 3 morning. Top teams win IBM Qiskit achievement certificates, exclusive swag, and sponsor prize awards!' },
]

export default function HackathonPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  const filteredTracks = selectedCategory === 'All'
    ? tracksData
    : tracksData.filter(t => t.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(t.category.toLowerCase()))

  return (
    <div className="relative overflow-x-hidden w-full bg-white dark:bg-[#09090f] transition-colors duration-250">
      <div className="quantum-bg" aria-hidden="true" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(244,114,182,0.14) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 text-xs sm:text-sm font-semibold mb-6">
            <Sparkles size={14} className="text-pink-500 animate-pulse" />
            <span>Official Problem Statements Live · 8 Global Challenges</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-5 tracking-tight">
            Quantum
            <br />
            <span className="gradient-text-neon">Hackathon Sprint</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            Eight research-grade challenges curated by world-leading institutions including McGill, Basque Quantum, Cleveland Clinic, RPI, quanTA, and Global Healthcare. Build on IBM Quantum hardware and push the boundaries of quantum computing.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center flex-wrap">
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
              <span>Hackathon Manual (PDF)</span>
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
      </section>

      {/* ── GOOGLE DRIVE OFFICIAL REPOSITORY CALLOUT BANNER ──── */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-rose-500/10 border-2 border-pink-300/80 dark:border-pink-800/80 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-pink-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-pink-500/30">
                <FolderDown size={28} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                  Starter Kit &amp; Documents
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  Official Hackathon Problem Statements &amp; PDFs
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl leading-relaxed">
                  Access the complete PDF problem prompts, theoretical mathematical formulations, starter code notebooks, and reference benchmarks on Google Drive.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
              <a
                href={eventConfig.hackathonManualDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md shadow-pink-400/40"
              >
                <BookOpen size={16} />
                <span>Hackathon Manual (PDF)</span>
                <ExternalLink size={13} />
              </a>
              <a
                href={eventConfig.hackathonRegistrationForm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-pink-700 dark:text-pink-300 bg-white dark:bg-slate-900 border border-pink-300 dark:border-pink-700 hover:bg-pink-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ExternalLink size={15} />
                <span>Register Form</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-pink-50/60 dark:bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="section-eyebrow mb-3">Key Milestones</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Hackathon Timeline</h2>
          </motion.div>
          <Timeline events={hackathonTimeline} />
        </div>
      </section>

      {/* ── TRACKS / 8 PROBLEM STATEMENTS ────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="problem-statements">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="section-eyebrow mb-3">Choose Your Challenge</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Official Problem Statements (8 Tracks)
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Explore 8 distinct problem statements contributed by leading global quantum institutions. Pick a track with your team and submit your solution during the event hackathon sprint.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-pink-600 text-white shadow-md shadow-pink-300/40 dark:shadow-pink-900/60'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-pink-200/80 dark:border-pink-900/50 hover:border-pink-400 dark:hover:border-pink-700'
                }`}
              >
                {cat} {cat === 'All' ? `(${tracksData.length})` : ''}
              </button>
            ))}
          </div>

          {/* Tracks Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => (
              <motion.div
                key={track.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TrackCard track={track} onSelect={(t) => setSelectedTrack(t)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE PROBLEM STATEMENT MODAL ───────────────── */}
      <AnimatePresence>
        {selectedTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrack(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-950 rounded-3xl border border-pink-200 dark:border-pink-900 shadow-2xl overflow-y-auto p-6 sm:p-8 flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-pink-100 dark:border-pink-900/50">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm font-black text-pink-600 dark:text-pink-400 px-2.5 py-0.5 rounded-md bg-pink-100 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800">
                      Track {selectedTrack.number}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                      {selectedTrack.category}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border border-pink-300 dark:border-pink-700 text-pink-600 dark:text-pink-300">
                      {selectedTrack.difficulty}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {selectedTrack.title}
                  </h2>
                  <p className="text-xs font-semibold text-pink-600 dark:text-pink-400 mt-1 flex items-center gap-1.5">
                    <Building2 size={13} /> {selectedTrack.provider}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTrack(null)}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-pink-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Background & Motivation */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-pink-600 dark:text-pink-400 font-bold mb-1.5">
                  Background &amp; Motivation
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedTrack.description}
                </p>
              </div>

              {/* The Challenge */}
              <div className="bg-pink-50/70 dark:bg-slate-900/80 rounded-2xl p-4 border border-pink-200/80 dark:border-pink-900/60">
                <h4 className="text-xs font-mono uppercase tracking-wider text-pink-700 dark:text-pink-300 font-bold mb-2 flex items-center gap-1.5">
                  <Zap size={14} /> The Challenge
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {selectedTrack.fullChallenge || selectedTrack.problemBrief}
                </p>
              </div>

              {/* Subtracks / Experience Tiers */}
              {selectedTrack.subtracks && selectedTrack.subtracks.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2.5">
                    Getting Started &amp; Technical Objectives
                  </h4>
                  <div className="space-y-3">
                    {selectedTrack.subtracks.map((st, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                          {st.name}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {st.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantitative Metrics */}
              {selectedTrack.metrics && selectedTrack.metrics.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2">
                    Key Quantitative Metrics
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {selectedTrack.metrics.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-pink-500 font-bold">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Evaluation Criteria */}
              {selectedTrack.evaluation && (
                <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs">
                  <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                    Evaluation Criteria
                  </span>
                  <p className="text-amber-700 dark:text-amber-200/80 leading-relaxed">
                    {selectedTrack.evaluation}
                  </p>
                </div>
              )}

              {/* Recommended Tools */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2">
                  Recommended Toolkit
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrack.tools.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-slate-900 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-pink-100 dark:border-pink-900/50 flex flex-col sm:flex-row gap-3 justify-end items-center">
                <a
                  href="https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white w-full sm:w-auto"
                >
                  <FileText size={16} /> Open in Google Drive (PDF &amp; Code) <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedTrack(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-full sm:w-auto cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pink-50/60 dark:bg-slate-950/60">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="section-eyebrow mb-3">Step by Step</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">How It Works</h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-pink-200 via-pink-400 to-pink-200 dark:from-pink-900 dark:via-pink-700 dark:to-pink-900" />
            <div className="flex flex-col gap-5">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex gap-5 items-start"
                >
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-pink-200 dark:border-pink-800 flex-shrink-0 flex items-center justify-center shadow-sm">
                    <span className="font-black text-sm text-pink-600 dark:text-pink-400 font-mono">{step.step}</span>
                  </div>
                  <div className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 flex-1 p-5">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRIZES & SWAG ────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="section-eyebrow mb-3">Worth Fighting For</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Prizes &amp; Swag</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card bg-white/90 dark:bg-slate-900/80 p-6 flex flex-col items-center text-center gap-4 border-2 border-pink-200 dark:border-pink-800/80">
              <Trophy size={40} className="text-yellow-500" />
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Prizes &amp; Awards</h3>
                <p className="text-pink-600 dark:text-pink-400 font-bold mt-1">Official IBM Quantum Recognition</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Top performing teams receive official IBM Quantum Achievement Certificates, monetary rewards, and sponsor prize pools.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {['1st Place', '2nd Place', '3rd Place', 'Track Winners', 'Best Presentation'].map(p => (
                  <span key={p} className="tag-pink text-xs">{p}</span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card bg-white/90 dark:bg-slate-900/80 p-6 flex flex-col items-center text-center gap-4 border border-pink-200/80 dark:border-pink-900/50">
              <Gift size={40} className="text-pink-500" />
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">IBM Qiskit Swag</h3>
                <p className="text-pink-600 dark:text-pink-400 font-bold mt-1">Exclusive Gear for Hackers</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Top performers receive exclusive IBM Qiskit merchandise: official t-shirts, die-cut stickers, hardware lanyards, and certificates.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {['T-Shirts', 'Stickers', 'IBM Gear', 'Certificates'].map(s => (
                  <span key={s} className="tag-cyan text-xs">{s}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-5 flex items-start gap-4">
            <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">IBM-Backed Certificates for All Participants</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Every registered participant who attends workshops earns an official <strong className="text-pink-600 dark:text-pink-400">Certificate of Participation</strong>. Hackathon winners also receive a prestigious <strong className="text-pink-600 dark:text-pink-400">Certificate of Achievement</strong> from IBM Quantum.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pink-50/60 dark:bg-slate-950/60">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Ready to Hack Quantum?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Registration is 100% free. Access the problem statements on Google Drive, prepare your Qiskit environment, and join us at Dr. Y.V.S. Murthy Auditorium!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            <a
              href={eventConfig.hackathonRegistrationForm}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-xl shadow-pink-300/40 dark:shadow-pink-950/60 cursor-pointer w-full sm:w-auto"
            >
              <ExternalLink size={18} /> Register for Hackathon (Google Form)
            </a>
            <a
              href={eventConfig.hackathonManualDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-bold text-pink-700 dark:text-pink-300 bg-white dark:bg-slate-900 border-2 border-pink-300 dark:border-pink-700 hover:bg-pink-50 dark:hover:bg-slate-800 transition-all w-full sm:w-auto"
            >
              <BookOpen size={18} className="text-pink-500" />
              <span>Hackathon Manual (PDF)</span>
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Venue: Dr. Y.V.S. Murthy Auditorium, AUCE North Campus, Visakhapatnam. Free entry.
          </p>
        </div>
      </section>
    </div>
  )
}
