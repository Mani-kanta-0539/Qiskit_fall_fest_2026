'use client'

import Image from 'next/image'
import { Sponsor } from '@/data/eventData'

interface SponsorCarouselProps {
  sponsors: Sponsor[]
  speed?: number
}

export default function SponsorCarousel({ sponsors, speed = 30 }: SponsorCarouselProps) {
  const items = [...sponsors, ...sponsors]

  return (
    <div className="relative overflow-hidden w-full py-4">
      <div
        className="flex gap-8 items-center"
        style={{
          animation: `ticker ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {items.map((s, i) => (
          <a
            key={`${s.name}-${i}`}
            href={s.url ?? '#'}
            target={s.url ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center px-6 py-3 rounded-xl border border-pink-100 dark:border-pink-900/40 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-pink-300 dark:hover:border-pink-700 transition-all min-w-[120px] h-16"
          >
            {s.logo ? (
              <Image src={s.logo} alt={s.name} width={100} height={40} className="object-contain max-h-10 max-w-[100px]" />
            ) : (
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 text-center leading-tight">{s.name}</span>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}