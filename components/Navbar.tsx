'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { eventConfig } from '@/data/eventData'
import { useContactModal } from '@/context/ContactModalContext'
import ThemeToggle from '@/components/ThemeToggle'

const navLinks = [
  { label: 'Home',      href: '/' },
  { label: 'About',     href: '/about' },
  { label: 'Hackathon', href: '/hackathon' },
  { label: 'Schedule',  href: '/schedule' },
  { label: 'Learn',     href: '/learn' },
]

export default function Navbar() {
  const { openContactModal } = useContactModal()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
      window.addEventListener('keydown', onKey)
      return () => { document.body.style.overflow = original; window.removeEventListener('keydown', onKey) }
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || pathname !== '/'
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-b border-pink-200/70 dark:border-pink-900/40 shadow-[0_4px_25px_rgba(244,114,182,0.12)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-7 h-7">
              <Image src="/assets/logos/qiskit_black.svg" alt="Qiskit" fill className="object-contain group-hover:opacity-75 transition-opacity dark:invert" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">Qiskit Fall Fest</span>
              <span className="font-mono text-[10px] text-[#db2777] font-semibold tracking-[.2em]">2026</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    active ? 'text-pink-800 dark:text-pink-300 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-box"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-pink-100/90 dark:bg-pink-900/40 border border-pink-300/80 dark:border-pink-700/60 rounded-lg"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => openContactModal('general')}
              className="btn-glass px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-pink-700 dark:text-pink-300 hover:text-pink-900 dark:hover:text-pink-200 border border-pink-300 dark:border-pink-800 hover:border-pink-500 transition-all cursor-pointer"
            >
              Get in Touch
            </button>
            <a
              href={eventConfig.registration}
              data-luma-action="checkout"
              data-luma-event-id={eventConfig.lumaEventId}
              className="luma-checkout--button btn-glow flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-white shadow-md shadow-pink-200 cursor-pointer"
            >
              <span>Register Free</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-300 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-all cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <div className="fixed inset-0 z-[100] md:hidden">
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setMobileOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  aria-hidden="true"
                />
                <motion.div
                  initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                  className="fixed top-0 right-0 bottom-0 z-[101] w-[85%] max-w-sm bg-white dark:bg-slate-950 border-l border-pink-200 dark:border-pink-900/50 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
                  role="dialog" aria-modal="true" aria-label="Mobile Navigation"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-pink-100 dark:border-pink-900/40">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-6 h-6">
                          <Image src="/assets/logos/qiskit_black.svg" alt="Qiskit" fill className="object-contain dark:invert" />
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">Qiskit Fall Fest</span>
                          <span className="font-mono text-[9px] text-[#db2777] font-semibold tracking-[.2em]">2026</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-colors cursor-pointer"
                        aria-label="Close navigation menu"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <nav className="mt-5 flex flex-col gap-1.5">
                      {navLinks.map((link) => {
                        const active = isActive(link.href)
                        return (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`min-h-[44px] px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-all ${
                              active
                                ? 'bg-pink-100/90 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 border border-pink-300/80 dark:border-pink-700/60 font-bold'
                                : 'text-slate-700 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/30'
                            }`}
                          >
                            <span>{link.label}</span>
                            {active && <span className="w-2 h-2 rounded-full bg-pink-600 dark:bg-pink-400" />}
                          </Link>
                        )
                      })}
                    </nav>
                  </div>

                  <div className="pt-5 border-t border-pink-100 dark:border-pink-900/40 flex flex-col gap-2.5 mt-6">
                    <a
                      href={eventConfig.registration}
                      data-luma-action="checkout"
                      data-luma-event-id={eventConfig.lumaEventId}
                      onClick={() => setMobileOpen(false)}
                      className="luma-checkout--button btn-glow min-h-[44px] flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-md shadow-pink-200 cursor-pointer"
                    >
                      <span>Register Free (Luma)</span>
                      <ExternalLink size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => { setMobileOpen(false); openContactModal('sponsor') }}
                      className="btn-glass min-h-[44px] flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-pink-700 dark:text-pink-300 border border-pink-300 dark:border-pink-800 cursor-pointer"
                    >
                      Become a Sponsor
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMobileOpen(false); openContactModal('general') }}
                      className="min-h-[44px] flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Contact Us
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  )
}