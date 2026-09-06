'use client'

import { useEffect, useRef } from 'react'

interface Sparkle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
  rotation: number
  rotSpeed: number
  shape: 'star' | 'circle'
}

// Quantum pink, rose, gold & white sparkles palette
const SPARKLE_COLORS = [
  '#ec4899', // Quantum pink
  '#f472b6', // Light pink
  '#db2777', // Deep pink
  '#fb7185', // Rose
  '#ffffff', // Crisp white sparkle
  '#fbcfe8', // Pale pink
  '#fde047', // Warm gold twinkle
]

export default function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Sparkle[]>([])
  const animFrameIdRef = useRef<number | null>(null)
  const isRunningRef = useRef(false)
  const lastSpawnRef = useRef({ x: 0, y: 0, time: 0 })

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad) and no reduced motion
    if (typeof window === 'undefined') return
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const draw4PointStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      rotation: number
    ) => {
      context.save()
      context.translate(cx, cy)
      context.rotate(rotation)
      context.beginPath()
      const innerSize = size * 0.22
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2
        const innerAngle = angle + Math.PI / 4
        if (i === 0) {
          context.moveTo(Math.cos(angle) * size, Math.sin(angle) * size)
        } else {
          context.lineTo(Math.cos(angle) * size, Math.sin(angle) * size)
        }
        context.lineTo(Math.cos(innerAngle) * innerSize, Math.sin(innerAngle) * innerSize)
      }
      context.closePath()
      context.fill()
      context.restore()
    }

    const loop = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed
        p.life--

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const progress = p.life / p.maxLife // 1 -> 0
        const alpha = Math.sin(progress * Math.PI) // fade in and smoothly fade out
        const currentSize = p.size * (0.4 + 0.6 * progress)

        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha * 0.85))
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8

        if (p.shape === 'star') {
          draw4PointStar(ctx, p.x, p.y, currentSize, p.rotation)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, currentSize * 0.55, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      if (particles.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(loop)
      } else {
        isRunningRef.current = false
      }
    }

    const addSparkles = (x: number, y: number) => {
      const count = Math.floor(Math.random() * 2) + 2 // 2-3 sparkles per move
      for (let i = 0; i < count; i++) {
        const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 1.6 + 0.3
        const maxLife = Math.floor(Math.random() * 20) + 25 // 25-45 frames (~500-750ms)

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.35, // slight upward float
          size: Math.random() * 5 + 3.5, // 3.5px to 8.5px
          color,
          life: maxLife,
          maxLife,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.15,
          shape: Math.random() > 0.35 ? 'star' : 'circle',
        })
      }

      // Limit particle pool to prevent runaway allocations
      if (particlesRef.current.length > 90) {
        particlesRef.current.splice(0, particlesRef.current.length - 90)
      }

      if (!isRunningRef.current) {
        isRunningRef.current = true
        animFrameIdRef.current = requestAnimationFrame(loop)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      // Throttle slightly (every 22ms) to maintain lightweight 60fps performance
      const dx = e.clientX - lastSpawnRef.current.x
      const dy = e.clientY - lastSpawnRef.current.y
      const dist = Math.hypot(dx, dy)

      if (dist > 6 || now - lastSpawnRef.current.time > 35) {
        lastSpawnRef.current = { x: e.clientX, y: e.clientY, time: now }
        addSparkles(e.clientX, e.clientY)
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 select-none"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  )
}
