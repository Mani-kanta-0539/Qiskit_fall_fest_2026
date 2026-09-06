'use client'

import { useEffect, useState } from 'react'
import { eventConfig } from '@/data/eventData'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const tick = () => {
      const now = new Date().getTime()
      const distance = eventConfig.startDate.getTime() - now

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  const units = [
    { label: 'Days', value: mounted ? timeLeft.days : 0 },
    { label: 'Hours', value: mounted ? timeLeft.hours : 0 },
    { label: 'Minutes', value: mounted ? timeLeft.minutes : 0 },
    { label: 'Seconds', value: mounted ? timeLeft.seconds : 0 },
  ]

  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex flex-col items-center">
            <div className="glass-card bg-white/90 border-pink-200/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2 min-w-[48px] sm:min-w-[60px] text-center shadow-sm rounded-xl">
              <div
                className="font-mono text-lg sm:text-2xl font-bold text-slate-900 tabular-nums"
                style={{ textShadow: '0 0 12px rgba(244,114,182,0.2)' }}
              >
                {pad(value)}
              </div>
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mt-1 font-medium">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-mono text-base sm:text-xl text-[#db2777] font-bold mb-4 select-none">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
