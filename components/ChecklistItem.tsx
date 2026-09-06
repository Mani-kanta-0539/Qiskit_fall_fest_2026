'use client'

import { useState, useEffect } from 'react'
import { Check, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ChecklistItemData } from '@/data/eventData'

interface ChecklistItemProps {
  item: ChecklistItemData
}

export default function ChecklistItem({ item }: ChecklistItemProps) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(`qff-check-${item.id}`)
    if (stored === 'true') setChecked(true)
  }, [item.id])

  const toggle = () => {
    const next = !checked
    setChecked(next)
    localStorage.setItem(`qff-check-${item.id}`, String(next))
  }

  return (
    <button
      onClick={toggle}
      className={`w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 group
        ${checked
          ? 'bg-emerald-50/80 border border-emerald-200 shadow-xs'
          : 'glass-card bg-white/90 border border-pink-200/80 hover:border-pink-300 shadow-xs'
        }`}
    >
      <div className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all duration-300 ${
        checked ? 'bg-emerald-500 border border-emerald-500 text-white' : 'border border-pink-300 bg-pink-50/60 group-hover:border-pink-400'
      }`}>
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Check size={12} className="text-white" strokeWidth={3} />
          </motion.div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-medium text-sm transition-colors ${checked ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
            {item.label}
          </span>
          {item.required && (
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-600 font-semibold flex-shrink-0">
              Required
            </span>
          )}
        </div>
        {item.detail && (
          <p className={`text-xs mt-0.5 transition-colors ${checked ? 'text-slate-400' : 'text-slate-600'}`}>
            {item.detail}
          </p>
        )}
      </div>
    </button>
  )
}
