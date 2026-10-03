'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Award, BookOpen, ExternalLink } from 'lucide-react'
import { useContactModal } from '@/context/ContactModalContext'
import FAQAccordion from '@/components/FAQAccordion'
import SpeakerCard from '@/components/SpeakerCard'
import Timeline from '@/components/Timeline'
import {
  eventConfig, speakersData, patronsData, faqData, sponsorsData, partnersData,
  timelineEvents
} from '@/data/eventData'

export default function AboutPage() {
  const { openContactModal } = useContactModal()

  return (
    <div className="relative overflow-x-hidden w-full bg-white dark:bg-[#09090f] transition-colors duration-250">
      <div className="quantum-bg" aria-hidden="true" />

      {/* PAGE HEADER */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-eyebrow mb-3">About the Event</p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
            A Decade of Quantum
            <br />
            <span className="gradient-text-neon">on the Cloud</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Celebrating 10 years since IBM first put quantum computing on the cloud — and what comes next.
          </p>
        </motion.div>
      </section>

      {/* ABOUT + IMAGE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-5">
                The Story Behind Qiskit Fall Fest 2026
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  In 2016, IBM made history by launching the first quantum computer on the cloud — making quantum hardware accessible to anyone on the planet for the first time. Qiskit Fall Fest 2026 marks ten years of that revolution.
                </p>
                <p>
                  Over three transformative days at Dr. Y.V.S. Murthy Auditorium, Andhra University College of Engineering (AUCE) North Campus, students and researchers gather to celebrate this milestone by building real-world quantum solutions. From foundational gate operations to cutting-edge variational algorithms, you will code with Qiskit, learn from IBM Quantum Ambassadors, and compete for exclusive swag and prizes.
                </p>
                <p>
                  This year, attendees get hands-on access to IBM&apos;s latest <strong className="text-pink-600 dark:text-pink-400">Heron r2 (Nighthawk R2)</strong> processor — a 156-qubit system launched in late 2025 featuring a new heavy-hex connectivity map that significantly reduces gate error rates. It&apos;s the most powerful publicly accessible quantum processor in history.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border border-pink-200/80 dark:border-pink-900/50 bg-pink-50/30 dark:bg-slate-900/40">
                <Image
                  src="/assets/illustrations/Hero 2 with tile.png"
                  alt="Qiskit Fall Fest 2026 illustration"
                  fill className="object-cover" priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY ATTEND */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pink-50/60 dark:bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="section-eyebrow mb-3">Why Attend?</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">What You&apos;ll Gain</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Award size={28} className="text-pink-500" />,
                title: 'Participation Certificate',
                desc: 'Every registered attendee who completes the workshops earns an official IBM-backed digital Certificate of Participation — a valuable credential for your academic and professional portfolio.',
                badge: 'All Attendees',
              },
              {
                icon: <Award size={28} className="text-amber-500" />,
                title: 'Achievement Certificate',
                desc: 'Top hackathon teams and outstanding contributors receive an Achievement Certificate endorsed by IBM Quantum, recognising exceptional quantum programming work.',
                badge: 'Top Teams',
              },
              {
                icon: <BookOpen size={28} className="text-purple-500" />,
                title: 'IBM Qiskit Gear & Prizes',
                desc: 'Winners and top performers receive exclusive IBM Qiskit swag, merchandise, and prize pool rewards. Sponsors are actively being onboarded — watch this space!',
                badge: 'Winners',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-6 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/40 flex items-center justify-center">{item.icon}</div>
                <div>
                  <span className="text-xs font-semibold text-pink-600 dark:text-pink-400 tracking-widest uppercase">{item.badge}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="section-eyebrow mb-3">Key Dates</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Event Timeline</h2>
          </motion.div>
          <Timeline events={timelineEvents} />
          <div className="text-center mt-8">
            <Link href="/schedule" className="inline-flex items-center gap-2 btn-glow px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md shadow-pink-300/30 dark:shadow-pink-950/50">
              View Full Schedule <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>


      {/* SPEAKERS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="section-eyebrow mb-3">Inspiring Minds</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Speakers, Mentors &amp; Jury</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakersData.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </div>
      </section>

      {/* PATRONS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pink-50/60 dark:bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="section-eyebrow mb-3">Leadership &amp; Visionaries</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Patrons</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {patronsData.map((patron) => (
              <div key={patron.id} className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-slate-800 shadow-md bg-white dark:bg-slate-800">
                  {patron.avatar ? (
                    <Image src={patron.avatar} alt={patron.name} fill className="object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-pink-100 flex items-center justify-center font-bold text-pink-600">AU</div>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{patron.name}</h3>
                <p className="text-xs font-semibold text-pink-600 dark:text-pink-400 mt-1">{patron.role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex-1">{patron.affiliation}</p>
                {patron.profileUrl && (
                  <a
                    href={patron.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900 transition-all"
                  >
                    <ExternalLink size={13} />
                    <span>View Profile</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS & PARTNERS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Sponsors */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <p className="section-eyebrow mb-2">Generous Support</p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Sponsors</h2>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-6">
              {sponsorsData.map((s) => (
                <div
                  key={s.name}
                  className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 px-8 py-6 rounded-2xl flex flex-col items-center justify-center min-w-[220px] shadow-sm hover:shadow-md transition-all"
                >
                  {s.logo ? (
                    <div className="relative w-44 h-20">
                      <Image src={s.logo} alt={s.name} fill className="object-contain" />
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{s.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <p className="section-eyebrow mb-2">Collaboration &amp; Platform</p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Event Partners</h2>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-8">
              {partnersData.map((p) => (
                <a
                  key={p.name}
                  href={p.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 px-8 py-6 rounded-2xl flex flex-col items-center justify-center min-w-[220px] shadow-sm hover:shadow-md transition-all group"
                >
                  {p.logo ? (
                    <div className="relative w-44 h-20 mb-2">
                      <Image src={p.logo} alt={p.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-2">{p.name}</span>
                  )}
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1 group-hover:text-pink-600 transition-colors">
                    {p.name} <ExternalLink size={12} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="section-eyebrow mb-3">Got Questions?</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked</h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <FAQAccordion items={faqData} />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-6 text-center">
                <div className="text-5xl mb-3">⚛️</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Still have questions?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Join our Discord or WhatsApp for real-time answers from the organizing team.</p>
                <div className="flex flex-col gap-2">
                  <a href={eventConfig.discord} target="_blank" rel="noopener noreferrer" className="btn-glow px-4 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center justify-center gap-2">
                    Join Discord <ExternalLink size={13} />
                  </a>
                  <a href={eventConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-glass px-4 py-2.5 rounded-xl text-sm font-semibold text-pink-700 dark:text-pink-300 border border-pink-300 dark:border-pink-800 inline-flex items-center justify-center gap-2">
                    WhatsApp Group <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              <div className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/50 p-6 text-center">
                <p className="text-4xl font-black text-pink-600 dark:text-pink-400 mb-1">100%</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Free to Attend</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Workshops, hackathon, mentorship and IBM hardware access — all at no cost</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pink-50/60 dark:bg-slate-950/60">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Get In Touch</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Interested in sponsoring, partnering with us, or just want to know more? Reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button" onClick={() => openContactModal('sponsor')}
              className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white cursor-pointer w-full sm:w-auto shadow-lg shadow-pink-300/30 dark:shadow-pink-950/50"
            >
              Become a Sponsor
            </button>
            <button
              type="button" onClick={() => openContactModal('general')}
              className="btn-glass inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all cursor-pointer w-full sm:w-auto"
            >
              General Contact
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}