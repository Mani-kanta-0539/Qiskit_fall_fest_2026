'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { motion } from 'framer-motion'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 border-pink-200 dark:border-pink-800/60 bg-pink-50 dark:bg-slate-800 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-slate-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${className}`}
    >
      <motion.div key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
        {theme === 'dark' ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
      </motion.div>
    </motion.button>
  )
}