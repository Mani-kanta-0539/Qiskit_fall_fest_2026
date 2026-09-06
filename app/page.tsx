'use client'

import { useState, Suspense, lazy } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, MapPin,
  Wifi, Bus, Mail, ExternalLink, Shield,
  ChevronDown, Zap, BookOpen, Sparkles, MessageSquare
} from 'lucide-react'

import { useContactModal } from '@/context/ContactModalContext'

import { fadeUp, stagger } from '@/lib/variants'
import CountdownTimer from '@/components/CountdownTimer'
import FAQAccordion from '@/components/FAQAccordion'
import ScheduleCard from '@/components/ScheduleCard'
import SpeakerCard from '@/components/SpeakerCard'
import { AnnouncementTicker } from '@/components/AnnouncementTicker'

import {
  eventConfig, scheduleData, speakersData,
  faqData, sponsorsData, announcements
} from '@/data/eventData'

// Lazy-load the heavy Three.js hero scene
const HeroBlobScene = lazy(() => import('@/components/HeroBlobScene'))


const dayLabels: Record<number, string> = {
  1: 'Day 1 (Oct 5) — Workshops',
  2: 'Day 2 (Oct 6) — Hackathon Kickoff',
  3: 'Day 3 (Oct 7) — Demos & Awards',
}

const codeOfConduct = [
  'Be respectful and inclusive — harassment of any kind will not be tolerated.',
  'Collaborate openly — share knowledge, help teammates, and lift each other up.',
  'Build responsibly — ensure your solutions are ethical and constructive.',
  'Follow IBM Qiskit community guidelines and event organiser instructions.',
  'Report any violations to the on-site team or via the emergency contact.',
]

export default function HomePage() {
  const { openContactModal } = useContactModal()
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1)
  const [cocOpen, setCocOpen] = useState(false)

  const keynoteSpeakers = speakersData.filter(s => s.category === 'keynote')
  const mentors = speakersData.filter(s => s.category === 'mentor')
  const judges  = speakersData.filter(s => s.category === 'judge')
  const filteredSchedule = scheduleData.filter(s => s.day === activeDay)

  const patronSponsors    = sponsorsData.filter(s => s.tier === 'patron')
  const communitySponsors = sponsorsData.filter(s => s.tier === 'community')

  return (
    <div className="relative overflow-x-hidden w-full">
      {/* Fixed grid background */}
      <div className="quantum-bg" aria-hidden="true" />

      {/* ── ANNOUNCEMENT TICKER ──────────────────────────────── */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <AnnouncementTicker items={announcements} />
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-36 sm:pt-40 lg:pt-36 pb-12 sm:pb-14 px-4 sm:px-6 lg:px-8">

        {/* Giant pink radial bg glow */}
        <div
          aria-hidden="true"
          className="hero-glow"
          style={{
            width: 900, height: 900,
            top: '50%', left: '50%',
            transform: 'translate(-50%,-60%)',
            background: 'radial-gradient(ellipse, rgba(236,72,153,.15) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center">

            {/* ── LEFT: Copy ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="relative z-10 flex flex-col gap-5"
            >
              {/* Event Metadata */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-300 text-pink-700 font-mono text-xs sm:text-sm font-bold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-pink-600 animate-pulse" />
                  October 5–7, 2026
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-pink-200 text-slate-800 font-mono text-xs sm:text-sm font-semibold shadow-xs">
                  <MapPin size={15} className="text-pink-600" />
                  Andhra University, Visakhapatnam
                </span>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-[1.08] tracking-tight">
                  <span className="text-slate-900">Qiskit </span>
                  <span className="shimmer-text">Fall Fest</span>{' '}
                  <span className="gradient-text-neon">2026</span>
                </h1>
              </motion.div>

              <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Join students, researchers, and quantum innovators for a 3-day deep dive into quantum programming. Featuring hands-on workshops by IBM Quantum Ambassadors, 24-hour hackathon challenges, and hardware access via Qiskit
              </motion.p>

              {/* Countdown */}
              <motion.div variants={fadeUp} className="flex flex-col gap-1.5 pt-1">
                <span className="section-eyebrow text-[10px]">Event starts in</span>
                <CountdownTimer />
              </motion.div>

              {/* CTA Row */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-stretch sm:items-center pt-2">
                <a
                  href={eventConfig.registration}
                  data-luma-action="checkout"
                  data-luma-event-id={eventConfig.lumaEventId}
                  className="luma-checkout--button btn-glow min-h-[44px] flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm cursor-pointer w-full sm:w-auto"
                >
                  <span>Register Free</span>
                  <ArrowRight size={15} />
                </a>
                <Link
                  href="/hackathon"
                  className="btn-glass min-h-[44px] flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-slate-700 text-sm w-full sm:w-auto"
                >
                  <Zap size={15} className="text-[#db2777]" />
                  <span>Hackathon Info</span>
                </Link>
                <Link
                  href="/learn"
                  className="min-h-[44px] flex items-center justify-center gap-1.5 text-sm text-pink-600 hover:text-pink-700 transition-colors font-semibold w-full sm:w-auto"
                >
                  <BookOpen size={14} />
                  Start Learning
                </Link>
              </motion.div>
            </motion.div>


            {/* ── RIGHT: 3D scene + stickers ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut', delay: 0.15 }}
              className="relative flex items-center justify-center overflow-hidden sm:overflow-visible w-full"
              style={{ minHeight: 440 }}
            >
              {/* ── Bloch sphere canvas — seamless & unclipped ── */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: 360, height: 360,
                  flexShrink: 0,
                }}
              >
                {/* Pink halo */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: -40,
                    background: 'radial-gradient(ellipse, rgba(236,72,153,.25) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                    zIndex: 0,
                  }}
                />
                <Suspense fallback={
                  <div style={{ width:340, height:340, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ width:120, height:120, borderRadius:'50%', background:'rgba(236,72,153,.15)', animation:'pulse 2s infinite' }} />
                  </div>
                }>
                  <HeroBlobScene />
                </Suspense>
              </div>

              {/* ── Qiskit logo top-centre ── */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute"
                style={{ top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
              >
                <div className="glass-card bg-white/90 border border-pink-200/80 px-4 py-2 flex items-center gap-2 shadow-sm" style={{ borderRadius: 32 }}>
                  <div className="relative w-5 h-5">
                    <Image src="/assets/logos/qiskit_black.svg" alt="Qiskit" fill className="object-contain" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[.15em] text-[#db2777] font-semibold">Qiskit 2026</span>
                </div>
              </motion.div>

              {/* ── Bloch sphere logo sticker — bottom right ── */}
              <motion.div
                className="absolute animate-float"
                style={{ bottom: 30, right: -10, zIndex: 10, animationDelay: '0s' }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Image
                  src="/assets/stickers/Qiskit_01.png"
                  alt="Qiskit Bloch Sphere"
                  width={90} height={90}
                  className="drop-shadow-[0_0_18px_rgba(236,72,153,.7)]"
                  style={{ filter: 'brightness(1.3) saturate(1.4)' }}
                />
              </motion.div>

              {/* ── Purple/Pink Qiskit sticker — bottom left ── */}
              <motion.div
                className="absolute animate-float"
                style={{ bottom: 20, left: -14, zIndex: 10, animationDelay: '1.8s' }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
              >
                <Image
                  src="/assets/stickers/Qiskit_03.png"
                  alt="Qiskit Logo Sticker"
                  width={76} height={76}
                  className="drop-shadow-[0_0_14px_rgba(236,72,153,.6)]"
                />
              </motion.div>

              {/* ── Sticker bird — top right ── */}
              <motion.div
                className="absolute animate-float"
                style={{ top: 40, right: -18, zIndex: 10, animationDelay: '0.9s' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Image
                  src="/assets/stickers/Sticker 04.png"
                  alt="Qiskit sticker"
                  width={82} height={82}
                  className="drop-shadow-[0_0_16px_rgba(244,114,182,.4)]"
                />
              </motion.div>

              {/* ── Sticker — top left ── */}
              <motion.div
                className="absolute animate-float"
                style={{ top: 55, left: -20, zIndex: 10, animationDelay: '2.4s' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
              >
                <Image
                  src="/assets/stickers/Sticker 02.png"
                  alt="Qiskit sticker"
                  width={74} height={74}
                  className="drop-shadow-[0_0_12px_rgba(255,42,133,.4)]"
                />
              </motion.div>

              {/* ── Quantum tags ── */}
              <div
                className="hidden sm:block absolute tag-rose animate-float"
                style={{ top: '38%', right: -48, animationDelay: '3s', zIndex: 10 }}
              >
                ψ Superposition
              </div>
              <div
                className="hidden sm:block absolute tag-pink animate-float"
                style={{ bottom: '32%', left: -52, animationDelay: '1.5s', zIndex: 10 }}
              >
                ⊕ Entanglement
              </div>
            </motion.div>

          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center mt-10"
          >
            <ChevronDown size={20} className="text-slate-400 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="scroll-mt-28 section relative z-10 py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: Mission & Festival Experience */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="flex flex-col">
              <motion.span variants={fadeUp} className="section-eyebrow">About the Fest</motion.span>
              <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                A Decade of Quantum<br />
                <span className="gradient-text-neon">on the Cloud</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-slate-600 leading-relaxed text-[15px]">
                Qiskit Fall Fest 2026 marks ten years of that cloud revolution. Over three days, students and researchers gather on campus to celebrate this milestone by building real-world solutions. From foundational gate operations to cutting-edge variational algorithms, you&apos;ll code with Qiskit, learn from IBM Quantum Ambassadors, and compete for exclusive swag and prizes.
              </motion.p>

              {/* Three Experience Cards: Learn, Build, Connect (Moved to Left Side) */}
              <motion.div variants={fadeUp} className="mt-8">
                <span className="section-eyebrow mb-2">Festival Experience</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">What You&apos;ll Gain</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: '🔬', title: 'Learn', desc: 'Workshops from quantum fundamentals to QML algorithms' },
                    { icon: '⚡', title: 'Build', desc: '24h hackathon with real IBM Quantum hardware execution' },
                    { icon: '🌐', title: 'Connect', desc: 'Collaborate with researchers, mentors & peers' },
                  ].map(p => (
                    <div key={p.title} className="glass-card bg-white/95 border border-pink-200/90 p-4 flex flex-col gap-1.5 shadow-xs rounded-xl">
                      <span className="text-2xl">{p.icon}</span>
                      <p className="font-semibold text-slate-900 text-sm">{p.title}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Visual Banner & Code of Conduct */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="flex flex-col gap-5 sticky top-24">
              {/* Fall Fest Banner Image (Kept on Right) */}
              <motion.div
                variants={fadeUp}
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden glass-card bg-white/90 border border-pink-200/80 shadow-lg shadow-pink-100/50 group"
              >
                <Image
                  src="/assets/blog/fall-fest.png"
                  alt="Qiskit Fall Fest 2026 Celebration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white drop-shadow-sm">
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    Qiskit Fall Fest • AU
                  </span>
                  <span className="text-xs font-mono font-medium opacity-95 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    Oct 5–7, 2026
                  </span>
                </div>
              </motion.div>

              {/* Code of Conduct */}
              <motion.div variants={fadeUp}>
                <button
                  onClick={() => setCocOpen(o => !o)}
                  className="btn-glass flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 w-fit cursor-pointer"
                >
                  <Shield size={15} className="text-[#db2777]" />
                  {cocOpen ? 'Hide' : 'View'} Code of Conduct & Guidelines
                </button>
                {cocOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 glass-card bg-white/95 border border-pink-200/80 p-5 flex flex-col gap-3 list-none overflow-hidden shadow-sm"
                  >
                    {codeOfConduct.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="font-mono text-pink-600 text-xs mt-0.5 flex-shrink-0 font-bold">{String(i + 1).padStart(2, '0')}</span>
                        {rule}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SCHEDULE ──────────────────────────────────────────── */}
      <section id="schedule" className="scroll-mt-28 section relative z-10 py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(253, 242, 248, 0.6)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-eyebrow">Program Schedule</motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
              3 Days of Quantum Excellence
            </motion.h2>

            {/* When schedule is not yet finalized, show Coming Soon box */}
            {!eventConfig.scheduleAnnounced ? (
              <motion.div
                variants={fadeUp}
                className="glass-card bg-white/90 border border-pink-200/80 p-8 sm:p-12 text-center max-w-3xl mx-auto relative overflow-hidden shadow-xl shadow-pink-100/50"
                style={{
                  background: 'radial-gradient(ellipse at center top, rgba(253, 242, 248, 0.9), rgba(255, 255, 255, 0.95))',
                }}
              >
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#ec4899] to-transparent" />

                <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] border border-pink-300 bg-pink-50 text-pink-700 rounded-full px-4 py-1.5 mb-5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] animate-pulse" />
                  Agenda In Preparation
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Full Schedule Coming Soon
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
                  Session times and agenda details are still being finalized. The dates above (<span className="text-[#db2777] font-semibold">October 5–7, 2026</span>) are locked in — the complete hourly workshop agenda, hands-on labs, and hackathon milestones will be posted here.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={eventConfig.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white shadow-md shadow-pink-200 hover:scale-105 transition-transform"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span>Get Announced on Discord</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Day tabs */}
                <motion.div variants={fadeUp} className="flex overflow-x-auto no-scrollbar gap-2 mb-8 p-1.5 bg-pink-100/60 rounded-2xl max-w-full">
                  {([1, 2, 3] as const).map(day => (
                    <button
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 cursor-pointer ${
                        activeDay === day
                          ? 'bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white shadow-[0_0_20px_rgba(236,72,153,.3)] font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {dayLabels[day]}
                    </button>
                  ))}
                </motion.div>

                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-3"
                >
                  {filteredSchedule.map(item => <ScheduleCard key={item.id} item={item} />)}
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── SPEAKERS ──────────────────────────────────── */}
      <section id="speakers" className="scroll-mt-28 section relative z-10 py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(255, 245, 247, 0.6)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-eyebrow">Keynotes & Mentors</motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 mb-10">
              Speakers, Mentors & Judges
            </motion.h2>

            {/* When speakers are not yet finalized, show Coming Soon box */}
            {!eventConfig.speakersAnnounced ? (
              <motion.div
                variants={fadeUp}
                className="glass-card bg-white/90 border border-pink-200/80 p-8 sm:p-12 text-center max-w-3xl mx-auto relative overflow-hidden shadow-xl shadow-pink-100/50"
                style={{
                  background: 'radial-gradient(ellipse at center top, rgba(253, 242, 248, 0.9), rgba(255, 255, 255, 0.95))',
                }}
              >
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#f472b6] to-transparent" />

                <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] border border-pink-300 bg-pink-50 text-pink-700 rounded-full px-4 py-1.5 mb-5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] animate-pulse" />
                  Confirmations In Progress
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Lineup Coming Soon
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
                  We&apos;re confirming this year&apos;s speakers, technical mentors, and keynote guests from IBM Quantum and academic research institutes. The full roster will be revealed here soon.
                </p>

                <div className="inline-flex flex-col sm:flex-row items-center gap-2 p-3.5 rounded-xl bg-pink-50/60 border border-pink-200 text-xs text-slate-600">
                  <span>Want to speak or mentor at Qiskit Fall Fest 2026?</span>
                  <button
                    type="button"
                    onClick={() => openContactModal('general')}
                    className="text-pink-600 hover:underline font-semibold cursor-pointer"
                  >
                    Reach out to our team ↗
                  </button>
                </div>
              </motion.div>
            ) : (
              [
                { label: 'Keynote Speakers', color: 'text-[#ec4899]', data: keynoteSpeakers },
                { label: 'Technical Mentors', color: 'text-[#f472b6]', data: mentors },
                { label: 'Hackathon Judges', color: 'text-[#ff2a85]', data: judges },
              ].map(({ label, color, data }) => data.length > 0 && (
                <div key={label} className="mb-10">
                  <motion.h3 variants={fadeUp} className={`text-xs font-mono uppercase tracking-widest ${color} mb-5`}>
                    — {label}
                  </motion.h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.map((s, i) => (
                      <motion.div key={s.id} variants={fadeUp} custom={i}>
                        <SpeakerCard speaker={s} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ── SPONSORS ──────────────────────────────────────────── */}
      <section id="sponsors" className="scroll-mt-28 section relative z-10 py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(253, 242, 248, 0.6)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-eyebrow">Partners & Sponsors</motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-bold text-slate-900 mb-10">Powered By</motion.h2>

            {/* Patron Partners Grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {patronSponsors.map(s => (
                s.name.includes('Soon') ? (
                  <div
                    key={s.name}
                    className="glass-card bg-white/70 border-2 border-dashed border-pink-300 p-6 flex flex-col items-center justify-between text-center rounded-2xl min-h-[190px] shadow-xs"
                  >
                    <span className="text-[11px] font-mono font-bold tracking-wider text-pink-500 uppercase">
                      Upcoming Partner
                    </span>

                    <div className="flex flex-col items-center justify-center my-3">
                      <div className="w-12 h-12 rounded-full bg-pink-100/80 border border-pink-200 flex items-center justify-center text-[#ec4899] mb-2 shadow-inner">
                        <Zap size={22} className="animate-pulse" />
                      </div>
                      <span className="text-base font-bold text-slate-800">More Soon</span>
                    </div>

                    <div className="border-t border-pink-100 w-full pt-3 text-center">
                      <span className="text-xs text-slate-500 font-medium">To Be Announced</span>
                    </div>
                  </div>
                ) : (
                  <a
                    key={s.name}
                    href={s.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card bg-white/95 border border-pink-200/80 p-6 flex flex-col items-center justify-between text-center rounded-2xl hover:border-pink-400 hover:shadow-lg hover:shadow-pink-100/60 transition-all group min-h-[190px]"
                  >
                    <span className="text-[11px] font-mono font-bold tracking-wider text-pink-600 uppercase">
                      {s.name === 'IBM Quantum'
                        ? 'Official Event Partner'
                        : 'Host Institution'}
                    </span>

                    <div className="relative h-20 w-full flex items-center justify-center my-3">
                      {s.logo ? (
                        <div className="relative flex items-center justify-center w-full h-full">
                          <Image
                            src={s.logo}
                            alt={s.name}
                            width={s.name === 'Andhra University' ? 80 : 180}
                            height={80}
                            className={`object-contain transition-transform group-hover:scale-105 ${
                              s.name === 'Andhra University' ? 'max-h-16 w-auto rounded-full' : 'max-h-12 w-auto'
                            }`}
                          />
                        </div>
                      ) : (
                        <span className="text-base font-bold text-slate-800">{s.name}</span>
                      )}
                    </div>

                    <div className="border-t border-pink-100 w-full pt-3 flex items-center justify-center gap-1.5 text-slate-800 group-hover:text-pink-600 transition-colors">
                      <span className="text-sm font-semibold">{s.name}</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                )
              ))}
            </motion.div>

            {/* Community Partners */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {communitySponsors.map(s => (
                <div key={s.name} className="glass-card bg-white/90 border border-pink-200/80 px-4 py-2 text-xs font-medium text-slate-700 shadow-xs rounded-full">
                  {s.name}
                </div>
              ))}
            </motion.div>

            {/* Sponsor & Contact Dual CTA Box */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Left Side: Become a Sponsor */}
              <div
                className="glass-card bg-white/95 border border-pink-200/90 p-7 sm:p-8 text-left flex flex-col justify-between shadow-lg shadow-pink-100/40 rounded-2xl relative overflow-hidden"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(253, 242, 248, 0.95), rgba(255, 255, 255, 0.95))' }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="tag-pink">Become a Partner</span>
                    <span className="text-[11px] font-mono text-pink-600 font-semibold uppercase tracking-wider">Patron & Sponsor</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Support Quantum Education</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Connect your brand to 100+ quantum enthusiasts, researchers, and future engineers. Discuss custom tiers, hackathon track bounties, cloud credits, and recruitment perks.
                  </p>
                </div>
                <div className="relative z-10 pt-2">
                  <button
                    type="button"
                    onClick={() => openContactModal('sponsor')}
                    className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white cursor-pointer shadow-md shadow-pink-200/60"
                  >
                    <span>Become a Sponsor</span>
                    <Sparkles size={15} />
                  </button>
                </div>
              </div>

              {/* Right Side: Get in Touch / General Inquiry */}
              <div
                className="glass-card bg-white/95 border border-pink-200/90 p-7 sm:p-8 text-left flex flex-col justify-between shadow-lg shadow-pink-100/40 rounded-2xl relative overflow-hidden"
                style={{ background: 'radial-gradient(ellipse at top right, rgba(253, 242, 248, 0.95), rgba(255, 255, 255, 0.95))' }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="tag-cyan">General Inquiries</span>
                    <span className="text-[11px] font-mono text-pink-600 font-semibold uppercase tracking-wider">Direct Assistance</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Have Questions? Get in Touch</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Have questions regarding student registration, workshop prerequisites, team formation, or venue logistics at Andhra University? Drop our organizing team a direct message.
                  </p>
                </div>
                <div className="relative z-10 pt-2">
                  <button
                    type="button"
                    onClick={() => openContactModal('general')}
                    className="btn-glass inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-pink-700 bg-white/90 border border-pink-300 hover:border-pink-500 hover:text-pink-800 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Drop Us a Message</span>
                    <MessageSquare size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-28 section relative z-20 px-4 sm:px-6 lg:px-8 py-12 md:py-16" style={{ background: 'rgba(255, 245, 247, 0.6)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center">
            <motion.span variants={fadeUp} className="section-eyebrow justify-center">Got Questions?</motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-sm max-w-lg mx-auto mb-10">
              Everything you need to know about registration, eligibility, hardware access, and event logistics at Andhra University.
            </motion.p>
            <motion.div variants={fadeUp} className="text-left">
              <FAQAccordion items={faqData} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VENUE ─────────────────────────────────────────────── */}
      <section id="venue" className="scroll-mt-28 section relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-14" style={{ background: 'rgba(253, 242, 248, 0.6)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <motion.span variants={fadeUp} className="section-eyebrow">Venue & Location</motion.span>
                <motion.h2 variants={fadeUp} className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
                  Andhra University (North Campus)
                </motion.h2>
              </div>
              <motion.p variants={fadeUp} className="text-xs text-pink-600 font-mono font-semibold">
                Visakhapatnam, Andhra Pradesh
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Compact Map */}
              <motion.div variants={fadeUp} className="lg:col-span-6 glass-card bg-white/90 border border-pink-200/80 overflow-hidden h-64 lg:h-auto min-h-[250px] shadow-sm">
                <iframe
                  src={eventConfig.venue.mapsEmbed}
                  title="Andhra University North Campus Map"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 min-h-[250px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>

              {/* Venue details in clean 2x2 grid */}
              <motion.div variants={fadeUp} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: MapPin,
                    color: 'text-[#ec4899]',
                    title: 'Auditorium Complex',
                    body: `${eventConfig.venue.name}\n${eventConfig.venue.institution}\n${eventConfig.venue.address}`,
                  },
                  {
                    icon: Wifi,
                    color: 'text-[#f472b6]',
                    title: 'Campus Wi-Fi',
                    body: eventConfig.venue.wifi,
                  },
                  {
                    icon: Bus,
                    color: 'text-[#ff2a85]',
                    title: 'How to Reach',
                    body: `${eventConfig.venue.transit}\n${eventConfig.venue.parking}`,
                  },
                  {
                    icon: Mail,
                    color: 'text-rose-500',
                    title: 'Support & Help Desk',
                    body: `Foyer Desk: ${eventConfig.helpDeskLocation}\nEmail: ${eventConfig.contactEmail}`,
                  },
                ].map(({ icon: Icon, color, title, body }) => (
                  <div key={title} className="glass-card bg-white/90 border border-pink-200/80 p-4 flex flex-col justify-start shadow-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={16} className={`${color} flex-shrink-0`} />
                      <p className="font-semibold text-slate-900 text-xs uppercase tracking-wider">{title}</p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {body.split('\n').map((line, i) => (
                        <p key={i} className="text-xs text-slate-600 leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
