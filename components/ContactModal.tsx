'use client'

import { useState, useEffect, useRef } from 'react'
import {
  X,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  Briefcase,
  Mail,
  Sparkles,
  MessageSquare
} from 'lucide-react'

export type ModalTab = 'sponsor' | 'general'

interface ContactModalProps {
  isOpen: boolean
  initialTab?: ModalTab
  onClose: () => void
}

export default function ContactModal({
  isOpen,
  initialTab = 'general',
  onClose
}: ContactModalProps) {
  const [tab, setTab] = useState<ModalTab>(initialTab)
  const [nameOrOrg, setNameOrOrg] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Sync tab whenever modal opens or initialTab changes
  useEffect(() => {
    if (isOpen) {
      setTab(initialTab)
      setStatus('idle')
      setErrorMessage('')
    }
  }, [isOpen, initialTab])

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) {
      setErrorMessage('Please fill in your email and message.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      'b31fff51-351c-400a-b3a3-0d5ba284e492'

    const subject =
      tab === 'sponsor'
        ? `[Qiskit Fall Fest 2026] New Sponsorship Proposal from ${nameOrOrg || 'Organization'}`
        : `[Qiskit Fall Fest 2026] Inquiry from ${nameOrOrg || 'Attendee'}`

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          from_name: nameOrOrg || (tab === 'sponsor' ? 'Prospective Sponsor' : 'Community Member'),
          name: nameOrOrg,
          role,
          email,
          message,
          inquiry_type: tab === 'sponsor' ? 'Sponsorship Proposal' : 'General Inquiry'
        })
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setNameOrOrg('')
        setRole('')
        setEmail('')
        setMessage('')

        // Auto close after 2.5 seconds
        closeTimerRef.current = setTimeout(() => {
          onClose()
        }, 2500)
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Submission failed. Please try again or email us directly.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Network connection error. Please check your internet connection and try again.')
    }
  }

  if (!isOpen) return null

  const isSponsor = tab === 'sponsor'

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-xl rounded-b-none rounded-t-3xl sm:rounded-2xl border border-pink-500/20 shadow-[0_0_50px_rgba(236,72,153,0.2)] overflow-y-auto max-h-[90vh] text-white p-6 sm:p-8 my-0 sm:my-8"
        style={{ backgroundColor: '#0b070d' }}
      >
        {/* Mobile drag handle indicator */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-pink-300/70 hover:text-white hover:bg-pink-950/40 border border-transparent hover:border-pink-500/20 transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Tab Switcher */}
        <div className="flex rounded-full p-1 bg-white/5 border border-pink-500/20 max-w-xs mx-auto mb-6">
          <button
            type="button"
            onClick={() => {
              setTab('sponsor')
              setStatus('idle')
              setErrorMessage('')
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
              isSponsor
                ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                : 'text-pink-300/70 hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            <span>Sponsor</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('general')
              setStatus('idle')
              setErrorMessage('')
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
              !isSponsor
                ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                : 'text-pink-300/70 hover:text-white'
            }`}
          >
            <MessageSquare size={14} />
            <span>General Inquiry</span>
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mb-6">
          <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            {isSponsor ? 'Partner with Qiskit Fall Fest 2026' : 'Drop Us a Message'}
          </h3>
          <p className="text-xs sm:text-sm text-pink-200/70 max-w-md mx-auto">
            {isSponsor
              ? 'Discuss sponsorship tiers, track bounties, and student perks'
              : 'Questions about registration, the hackathon, or workshops'}
          </p>
        </div>

        {/* Success Confirmation Card */}
        {status === 'success' ? (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Message Received!</h4>
            <p className="text-sm text-pink-200/80 max-w-sm">
              Thank you for reaching out. Our team will review your inquiry and reply to <span className="text-pink-400 font-medium">{email}</span> shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Alert */}
            {status === 'error' && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5"
              >
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Row 1: Organization / Full Name */}
            <div>
              <label className="text-xs font-mono font-medium text-pink-300/90 tracking-wide uppercase mb-1.5 flex items-center gap-1.5">
                {isSponsor ? (
                  <>
                    <Building2 size={13} className="text-pink-400" />
                    <span>Organization / Company Name</span>
                  </>
                ) : (
                  <>
                    <User size={13} className="text-pink-400" />
                    <span>Full Name</span>
                  </>
                )}
              </label>
              <input
                type="text"
                required
                value={nameOrOrg}
                onChange={(e) => setNameOrOrg(e.target.value)}
                placeholder={isSponsor ? 'e.g. IBM / QuantumCorp' : 'e.g. Alex Johnson'}
                className="w-full bg-pink-950/20 border border-pink-500/20 text-white placeholder-white/20 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 rounded-xl px-4 py-3 outline-none transition-all text-sm"
              />
            </div>

            {/* Row 2: Role & Email (Two Column on Desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-medium text-pink-300/90 tracking-wide uppercase mb-1.5 flex items-center gap-1.5">
                  <Briefcase size={13} className="text-pink-400" />
                  <span>Your Position / Role</span>
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Campus Recruiter / Student"
                  className="w-full bg-pink-950/20 border border-pink-500/20 text-white placeholder-white/20 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 rounded-xl px-4 py-3 outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-medium text-pink-300/90 tracking-wide uppercase mb-1.5 flex items-center gap-1.5">
                  <Mail size={13} className="text-pink-400" />
                  <span>Work / Personal Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-pink-950/20 border border-pink-500/20 text-white placeholder-white/20 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 rounded-xl px-4 py-3 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Row 3: Message Textarea */}
            <div>
              <label className="text-xs font-mono font-medium text-pink-300/90 tracking-wide uppercase mb-1.5 flex items-center gap-1.5">
                <MessageSquare size={13} className="text-pink-400" />
                <span>Message</span>
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  isSponsor
                    ? 'Tell us how you would like to partner (tier, hackathon track, hardware credits, or swag)...'
                    : 'How can our team help you with the upcoming event?'
                }
                className="w-full bg-pink-950/20 border border-pink-500/20 text-white placeholder-white/20 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 rounded-xl px-4 py-3 outline-none transition-all text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-semibold py-3.5 px-6 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>{isSponsor ? 'Submit Sponsorship Inquiry' : 'Send Message'}</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
