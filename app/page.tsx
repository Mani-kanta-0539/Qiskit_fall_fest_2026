'use client'

import { Suspense, lazy } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Bus, Train, Car, ExternalLink, ChevronDown } from 'lucide-react'
import { useContactModal } from '@/context/ContactModalContext'
import CountdownTimer from '@/components/CountdownTimer'
import { AnnouncementTicker } from '@/components/AnnouncementTicker'
import HeroStickers from '@/components/HeroStickers'
import { eventConfig, announcements } from '@/data/eventData'

const HeroBlobScene = lazy(() => import('@/components/HeroBlobScene'))

export default function HomePage() {
  const { openContactModal } = useContactModal()

  return (
    <div className="relative overflow-x-hidden w-full bg-white dark:bg-[#09090f] transition-colors duration-250">
      <div className="quantum-bg" aria-hidden="true" />

      {/* ── ANNOUNCEMENT TICKER (Under fixed navbar, natural scroll) ── */}
      <div className="pt-16 relative z-30">
        <AnnouncementTicker items={announcements} />
      </div>

      {/* ── HERO: Full-screen poster ─────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-6.5rem)] flex items-center justify-center overflow-hidden">
        {/* Bloch sphere fills full hero background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <HeroBlobScene />
          </Suspense>
        </div>

        {/* Soft radial overlay letting the Bloch sphere glow through */}
        <div className="absolute inset-0 z-10 hero-poster-overlay pointer-events-none" aria-hidden="true" />

        {/* Floating IBM Quantum & Qiskit Stickers flanking the hero title */}
        <HeroStickers />

        {/* Hero content */}
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="text-xs sm:text-sm font-semibold text-pink-700 dark:text-pink-300 bg-pink-50/90 dark:bg-pink-950/70 border border-pink-200 dark:border-pink-800/80 px-4 py-1.5 rounded-full tracking-wide shadow-xs">
              🔬 Official IBM Qiskit Fall Fest Extension · 2026 Edition
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-none tracking-tight mb-2 drop-shadow-sm"
          >
            Qiskit
            <br />
            <span className="gradient-text-neon">Fall Fest</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6"
          >
            2026
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium mb-2 max-w-xl mx-auto"
          >
            October 5–7, 2026 · Dr. Y.V.S. Murthy Auditorium, AUCE North Campus, Visakhapatnam
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-sm text-slate-600 dark:text-slate-400 mb-8"
          >
            3 Days · Workshops · Hackathon · IBM Certificates · 100% Free
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mb-10 flex justify-center"
          >
            <CountdownTimer />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href={eventConfig.registration}
              data-luma-action="checkout"
              data-luma-event-id={eventConfig.lumaEventId}
              className="luma-checkout--button btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-xl shadow-pink-300/40 dark:shadow-pink-950/60 cursor-pointer w-full sm:w-auto"
            >
              <ExternalLink size={18} />
              Register Free Now
            </a>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-pink-700 dark:text-pink-300 bg-white/90 dark:bg-slate-900/90 border-2 border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600 backdrop-blur-sm transition-all w-full sm:w-auto shadow-xs"
            >
              Learn More
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-pink-500 dark:text-pink-400 pointer-events-none"
          aria-hidden="true"
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* ── WHAT'S HAPPENING ─────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="section-eyebrow mb-3">3 Days · Oct 5–7</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">What&apos;s Happening</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A full three-day quantum journey — from zero to building on real IBM quantum hardware.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-6 flex flex-col"
            >
              <div className="text-4xl mb-3">🧪</div>
              <p className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 mb-1 tracking-widest uppercase">Day 1 · Oct 5</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Offline Hands-on Workshops</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">
                In-person lab sessions at Dr. Y.V.S. Murthy Auditorium covering Qiskit primitives, circuits, and hands-on algorithms on real IBM quantum hardware.
              </p>
              <Link href="/hackathon" className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:gap-3 transition-all">
                View Hackathon Details <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="glass-card bg-white/95 dark:bg-slate-900/90 p-6 flex flex-col border-2 border-pink-400 dark:border-pink-600 shadow-[0_0_30px_rgba(244,114,182,0.18)] dark:shadow-[0_0_30px_rgba(244,114,182,0.12)]"
            >
              <div className="text-4xl mb-3">⚡</div>
              <p className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 mb-1 tracking-widest uppercase">Day 2 · Oct 6</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Mentorship &amp; Submission</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">
                Virtual office hours &amp; architecture guidance. Hard submission deadline at <strong>6:00 PM IST sharp</strong> (4–8 slide deck, GitHub repo &amp; video demo).
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={eventConfig.hackathonRegistrationForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer"
                >
                  Register for Hackathon <ExternalLink size={12} />
                </a>
                <Link href="/hackathon" className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:gap-3 transition-all">
                  Problem Statements <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-6 flex flex-col"
            >
              <div className="text-4xl mb-3">🏆</div>
              <p className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 mb-1 tracking-widest uppercase">Day 3 · Oct 7</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Grand Finale &amp; Jury Pitch</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">
                Shortlisted teams pitch live before the <strong>Bloq Quantum jury</strong>. Top teams win IBM Digital Certificates, exclusive swag kits, and cash prizes.
              </p>
              <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:gap-3 transition-all">
                About Event &amp; Perks <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VENUE ─────────────────────────────────────────────────── */}
      <section id="venue" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-pink-50/60 dark:bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="section-eyebrow mb-3">Where We Meet</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Venue</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              <div className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="text-pink-600 dark:text-pink-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{eventConfig.venue.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{eventConfig.venue.institution}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{eventConfig.venue.address}</p>
                  </div>
                </div>
                <a
                  href={eventConfig.venue.mapsUrl}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-200 transition-colors"
                >
                  Open in Google Maps <ExternalLink size={13} />
                </a>
              </div>

              {[
                { Icon: Bus, title: 'By Bus (RTC)', desc: 'Take RTC buses from RTC Complex or Maddilapalem. Alight at AU Main Gate / North Campus. ~20 min ride, frequent service.' },
                { Icon: Train, title: 'By Train', desc: 'Visakhapatnam Junction (VSKP) is ~5 km away. Autos (~₹80) & cabs (~₹150) available directly to Dr. Y.V.S. Murthy Auditorium.' },
                { Icon: Car, title: 'By Road / Auto', desc: 'Free visitor parking adjacent to Dr. Y.V.S. Murthy Auditorium (AU North Campus Gate 2). Rapido, Ola & Uber operate throughout Visakhapatnam.' },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-4 flex items-start gap-3">
                  <Icon className="text-pink-600 dark:text-pink-400 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-pink-200 dark:border-pink-900/50 shadow-lg h-80 lg:h-[480px]"
            >
              <iframe
                src={eventConfig.venue.mapsEmbed}
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dr. Y.V.S. Murthy Auditorium Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4">
            Ready to Start Your Quantum Journey?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Join 100+ students and researchers. Free workshops, IBM mentorship, real quantum hardware, and career-boosting certificates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={eventConfig.registration}
              data-luma-action="checkout"
              data-luma-event-id={eventConfig.lumaEventId}
              className="luma-checkout--button btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-xl shadow-pink-300/40 dark:shadow-pink-950/60 cursor-pointer w-full sm:w-auto"
            >
              Register Free — It&apos;s Open! <ExternalLink size={16} />
            </a>
            <button
              type="button"
              onClick={() => openContactModal('sponsor')}
              className="btn-glass inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all cursor-pointer w-full sm:w-auto"
            >
              Become a Sponsor
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}