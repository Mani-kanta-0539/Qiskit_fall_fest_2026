'use client'


import { fadeUp, stagger } from '@/lib/variants'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Mail, Star, Award, ChevronRight } from 'lucide-react'


type Step = 1 | 2 | 3

interface FeedbackRating {
  label: string
  value: number
}

const sessions = [
  'Opening Keynote & Ceremony',
  'Qiskit Workshops',
  'Guest Speaker Sessions',
  'Hackathon Experience',
  'Mentors & Support Quality',
  'Event Organization',
]

const eligibilityConditions = [
  { label: 'Attended ≥ 70% of sessions', icon: '📅' },
  { label: 'Submitted a hackathon project on Devpost', icon: '🚀' },
  { label: 'Registered with a valid email/ticket ID', icon: '📧' },
  { label: 'Did not violate Code of Conduct', icon: '✅' },
]

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className="transition-all duration-100"
        >
          <Star
            size={20}
            className={`transition-colors ${s <= (hover || value) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
          />
        </button>
      ))}
    </div>
  )
}

export default function ClaimPage() {
  const [step, setStep] = useState<Step>(1)
  const [verified, setVerified] = useState(false)
  const [email, setEmail] = useState('')
  const [ticketId, setTicketId] = useState('')
  const [ratings, setRatings] = useState<FeedbackRating[]>(sessions.map((l) => ({ label: l, value: 0 })))
  const [feedback, setFeedback] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const updateRating = (i: number, v: number) => {
    setRatings((r) => r.map((item, idx) => idx === i ? { ...item, value: v } : item))
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && ticketId) {
      setVerified(true)
      setTimeout(() => setStep(2), 600)
    }
  }

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const handleCertificate = () => {
    setEmailSent(true)
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-x-hidden w-full">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="text-center mb-12">
          <motion.span variants={fadeUp} className="section-eyebrow justify-center">Certificate Portal</motion.span>
          <motion.h1 variants={fadeUp} className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
            Claim Your <span className="gradient-text">Certificate</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-3 text-slate-600 text-sm leading-relaxed">
            Complete the verification and feedback form to receive your Qiskit Fall Fest 2026 participation certificate.
          </motion.p>
        </motion.div>

        {/* Eligibility Info */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="glass-card bg-white/90 border border-pink-200/80 p-6 mb-8 shadow-xs"
        >
          <motion.h3 variants={fadeUp} className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Award size={18} className="text-[#db2777]" />
            Certificate Eligibility Conditions
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {eligibilityConditions.map((c, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 text-sm text-slate-700 bg-pink-50/50 rounded-xl p-3 border border-pink-200/80">
                <span className="text-base flex-shrink-0">{c.icon}</span>
                {c.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {([1, 2, 3] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                step > s
                  ? 'bg-emerald-500 text-white'
                  : step === s
                    ? 'bg-[#ec4899] text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                    : 'bg-pink-50 text-slate-500 border border-pink-200'
              }`}>
                {step > s ? <CheckCircle size={14} /> : s}
              </div>
              <span className={`text-xs ${step === s ? 'text-slate-900 font-semibold' : 'text-slate-500'} hidden sm:block`}>
                {['Verify Identity', 'Submit Feedback', 'Get Certificate'][i]}
              </span>
              {i < 2 && <div className={`flex-1 h-px transition-colors ${step > s ? 'bg-emerald-500/50' : 'bg-pink-200'}`} />}
            </div>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {/* Step 1 — Verification */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="glass-card bg-white/90 border border-pink-200/80 p-8 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-2">Step 1: Verify Your Registration</h2>
              <p className="text-sm text-slate-600 mb-6">Enter your registered email and event ticket ID to confirm attendance.</p>

              <form onSubmit={handleVerify} className="flex flex-col gap-5">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold block mb-2">Registered Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold block mb-2">Ticket / Registration ID</label>
                  <input
                    type="text"
                    required
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    placeholder="QFF2026-XXXX"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className={`btn-glow flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all ${verified ? 'bg-emerald-500' : ''}`}
                >
                  {verified ? (
                    <><CheckCircle size={16} /> Verified! Proceeding…</>
                  ) : (
                    <>Verify & Continue <ChevronRight size={16} /></>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 2 — Feedback */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="glass-card bg-white/90 border border-pink-200/80 p-8 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-2">Step 2: Event Feedback</h2>
              <p className="text-sm text-slate-600 mb-6">Rate your experience for each session. Your feedback helps us improve!</p>

              <form onSubmit={handleFeedback} className="flex flex-col gap-5">
                {/* Session ratings */}
                <div className="flex flex-col gap-4">
                  {ratings.map((r, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-pink-50/50 rounded-xl border border-pink-200/80">
                      <span className="text-sm text-slate-800 font-medium">{r.label}</span>
                      <StarRating value={r.value} onChange={(v) => updateRating(i, v)} />
                    </div>
                  ))}
                </div>

                {/* Open text */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold block mb-2">
                    Additional Comments (optional)
                  </label>
                  <textarea
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What did you enjoy? What can be improved?"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="btn-glass px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 flex-1">
                    ← Back
                  </button>
                  <button type="submit" className="btn-glow flex items-center justify-center gap-2 flex-2 px-7 py-3 rounded-xl font-semibold text-white text-sm flex-1">
                    Submit Feedback <ChevronRight size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3 — Certificate */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="glass-card bg-white/90 border border-pink-200/80 p-8 text-center shadow-sm"
            >
              <div className="text-5xl mb-4">🎓</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Certificate Ready!</h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Thank you for participating in Qiskit Fall Fest 2026! Your participation certificate has been generated.
              </p>

              {!emailSent ? (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCertificate}
                    className="btn-glow flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white text-sm"
                  >
                    <Mail size={16} />
                    Send Certificate to {email}
                  </button>
                  <button className="btn-glass flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-slate-700 text-sm">
                    <Award size={16} />
                    Download Certificate (PDF)
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center"
                >
                  <CheckCircle size={32} className="text-emerald-600 mx-auto mb-3" />
                  <p className="font-semibold text-emerald-700">Certificate sent successfully!</p>
                  <p className="text-xs text-slate-600 mt-1">Check your inbox at <strong className="text-slate-900">{email}</strong></p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
