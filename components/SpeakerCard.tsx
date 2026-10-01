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
  const cat = categoryConfig[speaker.category]

  return (
    <div className="glass-card bg-white/90 dark:bg-slate-900/85 border border-pink-200/80 dark:border-pink-900/40 overflow-hidden group flex flex-col shadow-sm hover:shadow-md hover:border-pink-300 dark:hover:border-pink-700 transition-all">
      {/* Avatar */}
      <div className="relative w-full aspect-square overflow-hidden bg-pink-50/50 dark:bg-slate-950/50">
        {speaker.avatar ? (
          <Image
            src={speaker.avatar}
            alt={speaker.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <AvatarPlaceholder name={speaker.name} />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-60" />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border inline-block mb-2 font-semibold ${cat.color}`}>
            {cat.label}
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{speaker.name}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{speaker.role}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{speaker.affiliation}</p>
        </div>

        {/* Topics */}
        {speaker.topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {speaker.topics.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-pink-50 dark:bg-slate-800/80 border border-pink-200/70 dark:border-pink-800/60 text-slate-600 dark:text-slate-300">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Social links */}
        {(speaker.linkedIn || speaker.github) && (
          <div className="flex items-center gap-1 mt-auto pt-2 border-t border-pink-100 dark:border-pink-900/40">
            {speaker.linkedIn && (
              <a
                href={speaker.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.name} LinkedIn`}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-all"
              >
                <Link2 size={16} />
              </a>
            )}
            {speaker.github && (
              <a
                href={speaker.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.name} GitHub`}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
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