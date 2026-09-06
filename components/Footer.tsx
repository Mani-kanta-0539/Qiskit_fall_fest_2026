'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail, ExternalLink, MessageSquare } from 'lucide-react'
import { eventConfig } from '@/data/eventData'
import { useContactModal } from '@/context/ContactModalContext'

// Authentic Brand SVG Icons
function DiscordIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}

const socialLinks = [
  { icon: DiscordIcon,   label: 'Discord',          href: eventConfig.discord,   brandColor: 'hover:text-[#5865F2] hover:border-[#5865F2]/40 hover:bg-[#5865F2]/10' },
  { icon: WhatsAppIcon,  label: 'WhatsApp',         href: eventConfig.whatsapp,  brandColor: 'hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10' },
  { icon: InstagramIcon, label: 'Instagram',        href: eventConfig.instagram, brandColor: 'hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10' },
  { icon: LinkedInIcon,  label: 'LinkedIn',         href: eventConfig.linkedin,  brandColor: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10' },
]

const footerLinks = [
  { label: 'About',         href: '/#about' },
  { label: 'Schedule',      href: '/#schedule' },
  { label: 'Hackathon',     href: '/hackathon' },
  { label: 'Learn',         href: '/learn' },
  { label: 'Claim Badge',   href: '/claim' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'FAQs',          href: '/#faq' },
  { label: 'Venue',         href: '/#venue' },
]

export default function Footer() {
  const { openContactModal } = useContactModal()
  return (
    <footer className="relative border-t border-pink-200/80 bg-white/90 backdrop-blur-xl mt-8 shadow-sm">
      {/* Top pink glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#ec4899]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="relative w-8 h-8">
                <Image src="/assets/logos/qiskit_black.svg" alt="Qiskit" fill className="object-contain" />
              </div>
              <div>
                <span className="block font-bold text-sm text-slate-900">Qiskit Fall Fest</span>
                <span className="block font-mono text-[10px] text-[#db2777] font-semibold tracking-[.2em]">2026</span>
              </div>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed max-w-[280px]">
              An official IBM Quantum extension event hosted at Andhra University — free quantum computing workshops, a 24-hour hackathon, and hands-on access to real quantum hardware.
            </p>
            {/* IBM badge + AU badge */}
            <div className="flex items-center gap-4 pt-1">
              <div className="relative w-28 h-7 opacity-90 hover:opacity-100 transition-opacity">
                <Image src="/assets/ibm/IBM_Quantum_logotype_pos_RGB.png" alt="IBM Quantum" fill className="object-contain object-left" />
              </div>
              <div className="h-5 w-px bg-pink-200" />
              <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                  <Image src="/assets/logos/andhra-university.jpeg" alt="Andhra University" fill className="object-cover" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 leading-tight">Andhra Univ.</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-5">Navigation</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-pink-600 transition-colors flex items-center gap-1.5 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => openContactModal('general')}
                className="text-sm text-pink-600 hover:text-pink-700 transition-colors flex items-center gap-1.5 font-semibold text-left cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-5">Community</h4>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {socialLinks.map(({ icon: Icon, label, href, brandColor }) => (
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-pink-200/80 bg-pink-50/50 text-slate-600 transition-all duration-200 group shadow-xs ${brandColor}`}
                  >
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </a>
                ) : null
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => openContactModal('general')}
                className="flex items-center gap-2 text-sm text-slate-700 hover:text-pink-600 transition-colors font-medium text-left cursor-pointer"
              >
                <MessageSquare size={14} className="text-pink-600 shrink-0" />
                <span>Get in Touch / Drop a Message</span>
              </button>
              <a
                href={`mailto:${eventConfig.contactEmail}`}
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-pink-600 transition-colors font-mono"
              >
                <Mail size={12} className="shrink-0" />
                {eventConfig.contactEmail}
              </a>
            </div>
            <a
              href={eventConfig.registration}
              data-luma-action="checkout"
              data-luma-event-id={eventConfig.lumaEventId}
              className="luma-checkout--button mt-4 btn-glow flex items-center gap-2 w-fit px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md shadow-pink-200 cursor-pointer"
            >
              Register Free <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

