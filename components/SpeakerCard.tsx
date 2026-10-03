'use client'

import Image from 'next/image'
import { Link2, GitBranch } from 'lucide-react'
import type { Speaker } from '@/data/eventData'

interface SpeakerCardProps {
  speaker: Speaker
}

const categoryConfig = {
  keynote: { label: 'Keynote Speaker', color: 'text-[#be185d] dark:text-pink-300 border-pink-300 dark:border-pink-800 bg-pink-100/70 dark:bg-pink-950/60' },
  mentor: { label: 'Technical Mentor', color: 'text-[#db2777] dark:text-pink-400 border-pink-300 dark:border-pink-800 bg-pink-50 dark:bg-pink-950/40' },
  judge: { label: 'Hackathon Judge', color: 'text-[#9d174d] dark:text-pink-300 border-pink-300 dark:border-pink-800 bg-pink-100/90 dark:bg-pink-950/70' },
}

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  const hue = (name.charCodeAt(0) * 37 + name.charCodeAt(1) * 13) % 360
  return (
    <div
      className="w-full h-full flex items-center justify-center text-2xl font-bold text-white select-none"
      style={{ background: `radial-gradient(ellipse at 40% 30%, hsl(${hue},70%,55%), hsl(${hue + 30},65%,40%))` }}
    >
      {initials}
    </div>
  )
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  const isOffline = speaker.sessionType === 'offline'

  return (
    <div className="glass-card bg-white/95 dark:bg-slate-900/90 border border-pink-200/80 dark:border-pink-900/40 overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-md hover:border-pink-300 dark:hover:border-pink-700 transition-all rounded-2xl">
      {/* Header & Circular Avatar */}
      <div className="relative pt-5 pb-3 px-4 bg-gradient-to-b from-pink-100/70 via-pink-50/40 to-transparent dark:from-pink-950/50 dark:via-slate-900/30 dark:to-transparent flex flex-col items-center">
        {/* Top Session Tag */}
        <div className="flex items-center justify-between w-full mb-3">
          <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold border ${
            isOffline
              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
              : 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800'
          }`}>
            {isOffline ? '📍 Offline (In-Person)' : '🌐 Online (Virtual)'}
          </span>
          <span className="text-[10px] font-bold font-mono text-slate-500 dark:text-slate-400">
            {speaker.category === 'judge' ? 'Bloq Jury' : 'Speaker'}
          </span>
        </div>

        {/* Circular Avatar Container with Ring */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-md bg-pink-50 dark:bg-slate-800 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
          {speaker.avatar ? (
            <Image
              src={speaker.avatar}
              alt={speaker.name}
              fill
              className="object-cover object-top"
            />
          ) : (
            <AvatarPlaceholder name={speaker.name} />
          )}
        </div>
      </div>

      {/* Info Content */}
      <div className="p-4 pt-1 flex flex-col gap-2.5 flex-1 text-center">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">{speaker.name}</h3>
          <p className="text-xs font-semibold text-pink-600 dark:text-pink-400 mt-0.5">{speaker.role}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{speaker.affiliation}</p>
        </div>

        {/* Topics */}
        {speaker.topics.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mt-1">
            {speaker.topics.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-pink-50 dark:bg-slate-800/80 border border-pink-200/70 dark:border-pink-800/60 text-slate-600 dark:text-slate-300">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Social / Profile links */}
        {(speaker.linkedIn || speaker.profileUrl || speaker.github) && (
          <div className="flex items-center justify-center gap-2 mt-auto pt-3 border-t border-pink-100 dark:border-pink-900/40">
            {(speaker.linkedIn || speaker.profileUrl) && (
              <a
                href={speaker.linkedIn || speaker.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.name} Profile`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900 transition-all"
              >
                <Link2 size={13} />
                <span>View Profile</span>
              </a>
            )}
            {speaker.github && (
              <a
                href={speaker.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.name} GitHub`}
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <GitBranch size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}