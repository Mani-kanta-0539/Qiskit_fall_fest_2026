'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { FAQ } from '@/data/eventData'

interface FAQAccordionProps {
  items: FAQ[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  // All questions start closed by default on initial page load
  const [openIndices, setOpenIndices] = useState<number[]>([])

  const toggle = (index: number) => {
    setOpenIndices(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {items.map((item, i) => {
        const isOpen = openIndices.includes(i)
        return (
          <div
            key={i}
            className={`glass-card rounded-2xl overflow-hidden transition-all duration-200 ${
              isOpen
                ? '!border-pink-400 bg-white shadow-md shadow-pink-200/40 ring-1 ring-pink-300/60'
                : 'bg-white/95 border border-pink-200/80 hover:border-pink-300'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 py-[18px] text-left cursor-pointer select-none transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-2xl"
            >
              <span
                className={`font-semibold text-sm sm:text-base pr-2 pointer-events-none transition-colors duration-150 ${
                  isOpen ? 'text-pink-600' : 'text-slate-800'
                }`}
              >
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 rounded-full p-2 pointer-events-none transition-all duration-200 ${
                  isOpen
                    ? 'bg-pink-600 text-white scale-105 shadow-sm'
                    : 'bg-pink-100/90 text-pink-600'
                }`}
              >
                {isOpen ? (
                  <Minus size={18} strokeWidth={2.5} />
                ) : (
                  <Plus size={18} strokeWidth={2.5} />
                )}
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-5 pt-3.5 border-t border-pink-100/90 bg-pink-50/25">
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

