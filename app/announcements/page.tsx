'use client'


import { fadeUp, stagger } from '@/lib/variants'
import { motion } from 'framer-motion'
import { AnnouncementCard } from '@/components/AnnouncementTicker'
import { announcements } from '@/data/eventData'


export default function AnnouncementsPage() {
  const pinned = announcements.filter((a) => a.pinned)
  const rest = announcements.filter((a) => !a.pinned)

  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-x-hidden w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="mb-10">
          <motion.span variants={fadeUp} className="section-eyebrow">Live Updates</motion.span>
          <motion.h1 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Announcements
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-3 text-slate-600 text-sm">
            Official updates, room changes, deadline extensions and key event notices — in real time.
          </motion.p>
        </motion.div>

        {/* Pinned */}
        {pinned.length > 0 && (
          <motion.section
            initial="hidden"
            animate="show"
            variants={stagger}
            className="mb-8"
          >
            <motion.h2 variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-[#db2777] font-bold mb-3">
              📌 Pinned Notices
            </motion.h2>
            <div className="flex flex-col gap-3">
              {pinned.map((a) => (
                <motion.div key={a.id} variants={fadeUp}>
                  <AnnouncementCard item={a} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Divider */}
        {pinned.length > 0 && rest.length > 0 && (
          <div className="glow-divider mb-8" />
        )}

        {/* All other announcements */}
        {rest.length > 0 && (
          <motion.section initial="hidden" animate="show" variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-3">
              All Updates
            </motion.h2>
            <div className="flex flex-col gap-3">
              {rest.map((a) => (
                <motion.div key={a.id} variants={fadeUp}>
                  <AnnouncementCard item={a} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Empty state */}
        {announcements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card bg-white/90 border border-pink-200/80 p-16 text-center shadow-xs"
          >
            <div className="text-5xl mb-4">📭</div>
            <p className="text-slate-900 font-semibold">No announcements yet.</p>
            <p className="text-slate-600 text-sm mt-2">Check back closer to the event date.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
