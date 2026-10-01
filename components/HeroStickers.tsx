'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'

interface StickerConfig {
  id: string
  src: string
  alt: string
  label: string
  width: number
  height: number
  className: string
  initialRotate: number
  duration: number
  delay: number
  depthX: number
  depthY: number
}

// All LEFT stickers face INWARD (toward the right / center title)
const leftStickers: StickerConfig[] = [
  {
    id: 'kingfisher',
    // Sticker 06: Kingfisher on branch — beak and eyes naturally face RIGHT toward "Qiskit"
    src: '/assets/stickers/Sticker 06.png',
    alt: 'IBM Quantum Heron Sticker',
    label: 'IBM Heron · 156Q',
    width: 240,
    height: 152,
    className:
      'top-[15%] md:top-[16%] lg:top-[17%] left-2 md:left-4 lg:left-[max(1rem,calc(50%-390px))] xl:left-[max(2rem,calc(50%-430px))] 2xl:left-[max(3rem,calc(50%-460px))] w-24 sm:w-28 md:w-30 lg:w-34 xl:w-38',
    initialRotate: -4,
    duration: 4.2,
    delay: 0.1,
    depthX: -18,
    depthY: 15,
  },
  {
    id: 'flamingo',
    // Sticker 01: Flamingo circle — standing flamingo naturally faces RIGHT toward "Fall Fest"
    src: '/assets/stickers/Sticker 01.png',
    alt: 'IBM Quantum Flamingo Badge',
    label: 'Flamingo · 133Q',
    width: 180,
    height: 180,
    className:
      'top-[39%] md:top-[40%] lg:top-[42%] left-3 md:left-6 lg:left-[max(1.5rem,calc(50%-370px))] xl:left-[max(2.5rem,calc(50%-410px))] 2xl:left-[max(3.5rem,calc(50%-430px))] w-18 sm:w-20 md:w-22 lg:w-26 xl:w-28',
    initialRotate: 6,
    duration: 5.8,
    delay: 0.4,
    depthX: 14,
    depthY: -18,
  },
  {
    id: 'entanglement',
    // Sticker 08: IBM Quantum Entanglement Infinity Badge — authentic quantum badge flanking countdown
    src: '/assets/stickers/Sticker 08.png',
    alt: 'Quantum Entanglement Badge',
    label: 'Entangled Qubits',
    width: 200,
    height: 110,
    className:
      'top-[63%] md:top-[65%] lg:top-[66%] left-2 md:left-4 lg:left-[max(1rem,calc(50%-380px))] xl:left-[max(2rem,calc(50%-420px))] 2xl:left-[max(3rem,calc(50%-450px))] w-20 sm:w-24 md:w-26 lg:w-30 xl:w-34',
    initialRotate: -4,
    duration: 4.8,
    delay: 0.7,
    depthX: -15,
    depthY: 12,
  },
]

// All RIGHT stickers face INWARD (toward the left / center title)
const rightStickers: StickerConfig[] = [
  {
    id: 'eagle',
    // Sticker 05: Eagle soaring — head and beak naturally face LEFT toward "Qiskit"
    src: '/assets/stickers/Sticker 05.png',
    alt: 'IBM Quantum Eagle Sticker',
    label: 'IBM Eagle · 127Q',
    width: 200,
    height: 208,
    className:
      'top-[15%] md:top-[16%] lg:top-[17%] right-2 md:right-4 lg:right-[max(1rem,calc(50%-390px))] xl:right-[max(2rem,calc(50%-430px))] 2xl:right-[max(3rem,calc(50%-460px))] w-20 sm:w-24 md:w-26 lg:w-30 xl:w-34',
    initialRotate: 6,
    duration: 5.2,
    delay: 0.2,
    depthX: 20,
    depthY: -16,
  },
  {
    id: 'bluebird',
    // Sticker 03: Bluebird on branch circle — naturally faces LEFT toward "2026"
    src: '/assets/stickers/Sticker 03.png',
    alt: 'IBM Quantum Bluebird Badge',
    label: 'Quantum Processor',
    width: 180,
    height: 180,
    className:
      'top-[39%] md:top-[40%] lg:top-[42%] right-3 md:right-6 lg:right-[max(1.5rem,calc(50%-360px))] xl:right-[max(2.5rem,calc(50%-400px))] 2xl:right-[max(3.5rem,calc(50%-420px))] w-18 sm:w-20 md:w-22 lg:w-26 xl:w-28',
    initialRotate: -6,
    duration: 4.5,
    delay: 0.5,
    depthX: -14,
    depthY: 18,
  },
  {
    id: 'waveform',
    // Sticker 09: IBM Quantum Pulse & Waveform Badge — authentic quantum control badge
    src: '/assets/stickers/Sticker 09.png',
    alt: 'Quantum Pulse & Control Badge',
    label: 'Pulse & Control',
    width: 200,
    height: 142,
    className:
      'top-[63%] md:top-[65%] lg:top-[66%] right-2 md:right-4 lg:right-[max(1rem,calc(50%-380px))] xl:right-[max(2rem,calc(50%-420px))] 2xl:right-[max(3rem,calc(50%-450px))] w-20 sm:w-24 md:w-26 lg:w-30 xl:w-34',
    initialRotate: 4,
    duration: 6.0,
    delay: 0.8,
    depthX: 18,
    depthY: -12,
  },
]

function FloatingSticker({
  s,
  smoothX,
  smoothY,
}: {
  s: StickerConfig
  smoothX: MotionValue<number>
  smoothY: MotionValue<number>
}) {
  const parallaxX = useTransform(smoothX, (v) => v * s.depthX)
  const parallaxY = useTransform(smoothY, (v) => v * s.depthY)

  return (
    <motion.div
      style={{ x: parallaxX, y: parallaxY }}
      className={`absolute ${s.className} z-20 select-none group pointer-events-auto`}
      title={s.label}
    >
      <motion.div
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        dragElastic={0.25}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
        initial={{ opacity: 0, scale: 0.7, rotate: s.initialRotate * 1.3 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -15, 0],
          rotate: [s.initialRotate - 2, s.initialRotate + 2, s.initialRotate - 2],
        }}
        transition={{
          opacity: { duration: 0.6, delay: s.delay },
          scale: { duration: 0.6, delay: s.delay, type: 'spring' },
          y: { repeat: Infinity, duration: s.duration, ease: 'easeInOut', delay: s.delay },
          rotate: { repeat: Infinity, duration: s.duration * 1.25, ease: 'easeInOut', delay: s.delay },
        }}
        whileHover={{
          scale: 1.14,
          rotate: 0,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
        className="cursor-grab active:cursor-grabbing relative transition-transform duration-200"
      >
        <Image
          src={s.src}
          alt={s.alt}
          width={s.width}
          height={s.height}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_10px_15px_rgba(236,72,153,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_16px_28px_rgba(236,72,153,0.55)]"
        />

        {/* Interactive micro badge on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-30">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900/90 dark:bg-pink-950/90 text-pink-300 border border-pink-400/40 shadow-sm backdrop-blur-xs">
            {s.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HeroStickers() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 65, damping: 22 })
  const smoothY = useSpring(mouseY, { stiffness: 65, damping: 22 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2 // -1 to 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2 // -1 to 1
      mouseX.set(nx)
      mouseY.set(ny)
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Left flank: Kingfisher, Flamingo, Entanglement (all facing right/inward with mouse parallax) */}
      <div className="hidden md:block">
        {leftStickers.map((s) => (
          <FloatingSticker key={s.id} s={s} smoothX={smoothX} smoothY={smoothY} />
        ))}
      </div>

      {/* Right flank: Eagle, Bluebird, Waveform (all facing left/inward with mouse parallax) */}
      <div className="hidden md:block">
        {rightStickers.map((s) => (
          <FloatingSticker key={s.id} s={s} smoothX={smoothX} smoothY={smoothY} />
        ))}
      </div>
    </div>
  )
}