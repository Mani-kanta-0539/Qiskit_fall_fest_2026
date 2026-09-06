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

const navLinks = [
  { label: 'About',     href: '/#about' },
  { label: 'Schedule',  href: '/#schedule' },
  { label: 'Speakers',  href: '/#speakers' },
  { label: 'Hackathon', href: '/hackathon' },
  { label: 'Learn',     href: '/learn' },
  { label: 'FAQs',      href: '/#faq' },
  { label: 'Venue',     href: '/#venue' },
]

export default function Navbar() {
  const { openContactModal } = useContactModal()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Detect scroll state for background styling
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Scroll spy for in-page anchors on home page
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('')
      return
    }

    const sectionIds = ['about', 'schedule', 'speakers', 'faq', 'venue']

    const checkSections = () => {
      const scrollY = window.scrollY
      const navOffset = 120

      // If at top of hero, no section is active
      if (scrollY < 250) {
        setActiveSection('')
        return
      }

      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= navOffset && rect.bottom > navOffset) {
            current = id
            break
          }
        }
      }

      // If no exact match (e.g. between sections), find closest one above scroll position
      if (!current) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i]
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= navOffset + 150) {
            current = id
            break
          }
        }
      }

      setActiveSection(current)
    }

    checkSections()
    window.addEventListener('scroll', checkSections, { passive: true })
    return () => window.removeEventListener('scroll', checkSections)
  }, [pathname])

  // Close mobile menu on route change & handle body scroll lock & Escape key
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileOpen(false)
      }
      window.addEventListener('keydown', onKeyDown)

      return () => {
        document.body.style.overflow = originalOverflow
        window.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [mobileOpen])

  // Exactly one link can be active at any given moment
  const isActive = (href: string) => {
    if (pathname === '/') {
      if (href.startsWith('/#')) {
        const id = href.replace('/#', '')
        return activeSection === id
      }
      return false
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-2xl border-b border-pink-200/70 shadow-[0_4px_25px_rgba(244,114,182,0.12)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-7 h-7">
              <Image
                src="/assets/logos/qiskit_black.svg"
                alt="Qiskit"
                fill
                className="object-contain group-hover:opacity-75 transition-opacity"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm text-slate-900 tracking-tight">Qiskit Fall Fest</span>
              <span className="font-mono text-[10px] text-[#db2777] font-semibold tracking-[.2em]">2026</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    active ? 'text-pink-800 font-semibold' : 'text-slate-600 hover:text-pink-600'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-box"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-pink-100/90 border border-pink-300/80 rounded-lg shadow-[0_2px_10px_rgba(244,114,182,0.18)]"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => openContactModal('general')}
              className="btn-glass px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-pink-700 hover:text-pink-900 border border-pink-300 hover:border-pink-500 transition-all cursor-pointer"
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

          {/* Mobile Toggle */}
          <button
            type="button"
            className="flex md:hidden min-w-[44px] min-h-[44px] items-center justify-center rounded-xl text-slate-700 hover:text-pink-600 hover:bg-pink-50 transition-all cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer & Overlay (Portaled to document.body to prevent containing-block clipping) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <div className="fixed inset-0 z-[100] md:hidden">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setMobileOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                  aria-hidden="true"
                />

                {/* Slide-out Drawer Panel */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                  className="fixed top-0 right-0 bottom-0 z-[101] w-[85%] max-w-sm bg-white border-l border-pink-200 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile Navigation"
                >
                  <div>
                    {/* Header inside drawer */}
                    <div className="flex items-center justify-between pb-4 border-b border-pink-100">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-6 h-6">
                          <Image
                            src="/assets/logos/qiskit_black.svg"
                            alt="Qiskit"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="font-bold text-sm text-slate-900 tracking-tight">Qiskit Fall Fest</span>
                          <span className="font-mono text-[9px] text-[#db2777] font-semibold tracking-[.2em]">2026</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-pink-50 transition-colors cursor-pointer"
                        aria-label="Close navigation menu"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Nav Links */}
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
                                ? 'bg-pink-100/90 text-pink-800 border border-pink-300/80 font-bold shadow-xs'
                                : 'text-slate-700 hover:text-pink-600 hover:bg-pink-50'
                            }`}
                          >
                            <span>{link.label}</span>
                            {active && <span className="w-2 h-2 rounded-full bg-pink-600" />}
                          </Link>
                        )
                      })}
                    </nav>
                  </div>

                  {/* Quick-action CTA buttons inside drawer */}
                  <div className="pt-5 border-t border-pink-100 flex flex-col gap-2.5 mt-6">
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
                      onClick={() => {
                        setMobileOpen(false)
                        openContactModal('sponsor')
                      }}
                      className="btn-glass min-h-[44px] flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-pink-700 border border-pink-300 hover:border-pink-500 cursor-pointer"
                    >
                      Become a Sponsor
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false)
                        openContactModal('general')
                      }}
                      className="min-h-[44px] flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
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
