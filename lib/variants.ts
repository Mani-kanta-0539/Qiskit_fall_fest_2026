import type { Variants } from 'framer-motion'

// Shared animation variants compatible with Framer Motion v13+
// Cubic bezier easing is passed as a tuple with 'as const' to satisfy the Easing type

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const stagger: Variants = {
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

export const staggerFast: Variants = {
  show: {
    transition: { staggerChildren: 0.08 },
  },
}
