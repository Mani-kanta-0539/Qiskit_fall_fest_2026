'use client'

import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  label?: string
}

export default function CodeBlock({ code, language = 'bash', label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = code
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="rounded-xl overflow-hidden border border-pink-200/80 bg-slate-50/80 shadow-xs">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-pink-50/60 border-b border-pink-200/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          {label && (
            <span className="font-mono text-[10px] text-slate-600 ml-2 uppercase tracking-wider font-semibold">{label}</span>
          )}
          {!label && (
            <span className="font-mono text-[10px] text-slate-600 ml-2 flex items-center gap-1 font-semibold">
              <Terminal size={10} />
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded transition-all duration-200 ${
            copied
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-300 font-semibold'
              : 'text-slate-600 hover:text-pink-600 bg-white hover:bg-pink-50 border border-pink-200/80'
          }`}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code content */}
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-800 bg-white">
        <code>{code}</code>
      </pre>
    </div>
  )
}
