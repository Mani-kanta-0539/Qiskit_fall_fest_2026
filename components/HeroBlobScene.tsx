'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Authentic 3D Qiskit Bloch Sphere
 * - Clean wireframe sphere with equator & meridian circles
 * - Coordinate axes inside
 * - Glowing Bloch vector (arrow) anchored at (0,0,0) that rotates inside
 *   the sphere tracking the user's cursor across the entire screen
 * - No orbiting ball or distracting floating dots
 */
export default function HeroBlobScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth || 340
    const H = el.clientHeight || 340

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // ── Scene / Camera ────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 3.8)

    // Radius of the Bloch sphere
    const R = 1.18

    // Sphere container (for subtle idle rotation)
    const sphereGroup = new THREE.Group()
    scene.add(sphereGroup)

    // ── Wireframe sphere (Bloch surface) ───────────────────────
    const wGeo = new THREE.SphereGeometry(R, 28, 20)
    const wMat = new THREE.MeshBasicMaterial({
      color: '#db2777',
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    })
    const wire = new THREE.Mesh(wGeo, wMat)
    sphereGroup.add(wire)

    // ── Equatorial Ring (pink) ────────────────────────────────
    const eqGeo = new THREE.TorusGeometry(R, 0.006, 8, 120)
    const eqMat = new THREE.MeshBasicMaterial({
      color: '#ec4899',
      transparent: true,
      opacity: 0.85,
    })
    const equator = new THREE.Mesh(eqGeo, eqMat)
    equator.rotation.x = Math.PI / 2
    sphereGroup.add(equator)

    // ── Prime Meridian Ring (neon pink) ───────────────────────
    const merGeo = new THREE.TorusGeometry(R, 0.005, 8, 120)
    const merMat = new THREE.MeshBasicMaterial({
      color: '#be185d',
      transparent: true,
      opacity: 0.65,
    })
    const meridian = new THREE.Mesh(merGeo, merMat)
    meridian.rotation.y = Math.PI / 2
    sphereGroup.add(meridian)

    // ── Internal Coordinate Axes ──────────────────────────────
    // Z axis (vertical: |0> to |1>)
    const zLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -R, 0),
      new THREE.Vector3(0, R, 0),
    ])
    const axisMat = new THREE.LineBasicMaterial({
      color: '#db2777',
      transparent: true,
      opacity: 0.35,
    })
    const zAxis = new THREE.Line(zLineGeo, axisMat)
    sphereGroup.add(zAxis)

    // X axis (horizontal equator)
    const xLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-R, 0, 0),
      new THREE.Vector3(R, 0, 0),
    ])
    const xAxis = new THREE.Line(xLineGeo, axisMat)
    sphereGroup.add(xAxis)

    // Y axis (depth equator)
    const yLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -R),
      new THREE.Vector3(0, 0, R),
    ])
    const yAxis = new THREE.Line(yLineGeo, axisMat)
    sphereGroup.add(yAxis)

    // ── Pole markers (|0> North, |1> South) ───────────────────
    const poleGeo = new THREE.SphereGeometry(0.045, 12, 12)
    const poleMat = new THREE.MeshBasicMaterial({
      color: '#be185d',
      transparent: true,
      opacity: 0.9,
    })
    const poleN = new THREE.Mesh(poleGeo, poleMat)
    poleN.position.set(0, R, 0)
    sphereGroup.add(poleN)

    const poleS = new THREE.Mesh(poleGeo, poleMat)
    poleS.position.set(0, -R, 0)
    sphereGroup.add(poleS)

    // ── Central Pivot Dot ─────────────────────────────────────
    const pivotGeo = new THREE.SphereGeometry(0.05, 16, 16)
    const pivotMat = new THREE.MeshBasicMaterial({ color: '#db2777' })
    const pivot = new THREE.Mesh(pivotGeo, pivotMat)
    scene.add(pivot)

    // ── Cursor-Tracking Bloch Vector (Arrow) ──────────────────
    // Anchored at (0, 0, 0), arrow total length = 1.0 (inside sphere radius 1.18)
    const arrowGroup = new THREE.Group()

    const shaftLength = 0.76
    const headLength = 0.22

    // Shaft (slate rod for sharp contrast against light background)
    const shaftGeo = new THREE.CylinderGeometry(0.018, 0.018, shaftLength, 12)
    const shaftMat = new THREE.MeshBasicMaterial({ color: '#334155' })
    const shaft = new THREE.Mesh(shaftGeo, shaftMat)
    shaft.position.y = shaftLength / 2
    arrowGroup.add(shaft)

    // Arrowhead (vibrant berry pink cone)
    const headGeo = new THREE.ConeGeometry(0.08, headLength, 16)
    const headMat = new THREE.MeshBasicMaterial({ color: '#db2777' })
    const head = new THREE.Mesh(headGeo, headMat)
    head.position.y = shaftLength + headLength / 2
    arrowGroup.add(head)

    scene.add(arrowGroup)

    // Subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    // ── Cursor Tracking Math ──────────────────────────────────
    // Default state: pointing in superposition (up-right towards viewer)
    const targetDir = new THREE.Vector3(0.5, 0.6, 0.62).normalize()
    const upVector = new THREE.Vector3(0, 1, 0)
    const targetQuat = new THREE.Quaternion()

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const dx = clientX - cx
      const dy = clientY - cy

      const dist = Math.hypot(dx, dy)
      const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 0.45
      const normR = Math.min(dist / maxRadius, 1.0)
      const angle = Math.atan2(-dy, dx) // screen Y is inverted relative to 3D Y

      // Spherical coordinates:
      // When cursor is close to sphere center, points forward towards viewer (+Z)
      // When cursor moves away, tilts towards cursor direction in XY plane
      const theta = normR * (Math.PI * 0.58)

      targetDir.set(
        Math.sin(theta) * Math.cos(angle),
        Math.sin(theta) * Math.sin(angle),
        Math.cos(theta)
      ).normalize()
    }

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    // ── Animation Loop ────────────────────────────────────────
    let raf: number
    const startTime = performance.now()

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = (performance.now() - startTime) / 1000

      // Very gentle idle rotation of the sphere coordinate frame
      sphereGroup.rotation.y = Math.sin(t * 0.3) * 0.12
      sphereGroup.rotation.x = Math.cos(t * 0.25) * 0.08

      // Smoothly orient arrow towards cursor direction
      targetQuat.setFromUnitVectors(upVector, targetDir)
      arrowGroup.quaternion.slerp(targetQuat, 0.075)

      renderer.render(scene, camera)
    }
    tick()

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      if (!el) return
      const w = el.clientWidth || 340
      const h = el.clientHeight || 340
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
      ;[
        wGeo, wMat, eqGeo, eqMat, merGeo, merMat,
        zLineGeo, xLineGeo, yLineGeo, axisMat,
        poleGeo, poleMat, pivotGeo, pivotMat,
        shaftGeo, shaftMat, headGeo, headMat,
      ].forEach((x) => x.dispose())
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  )
}
