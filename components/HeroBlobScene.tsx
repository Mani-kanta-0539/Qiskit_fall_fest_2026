'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroBlobScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth || window.innerWidth || 340
    const H = el.clientHeight || window.innerHeight || 340

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const isMobile = W < 640
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, isMobile ? 4.8 : 3.8)

    const R = 1.18
    const sphereGroup = new THREE.Group()
    scene.add(sphereGroup)

    // Wireframe Sphere (vibrant pink)
    const wGeo = new THREE.SphereGeometry(R, 32, 24)
    const wMat = new THREE.MeshBasicMaterial({ color: '#ec4899', wireframe: true, transparent: true, opacity: 0.35 })
    const wire = new THREE.Mesh(wGeo, wMat)
    sphereGroup.add(wire)

    // Equatorial Ring
    const eqGeo = new THREE.TorusGeometry(R, 0.008, 8, 128)
    const eqMat = new THREE.MeshBasicMaterial({ color: '#f43f5e', transparent: true, opacity: 0.95 })
    const equator = new THREE.Mesh(eqGeo, eqMat)
    equator.rotation.x = Math.PI / 2
    sphereGroup.add(equator)

    // Prime Meridian
    const merGeo = new THREE.TorusGeometry(R, 0.007, 8, 128)
    const merMat = new THREE.MeshBasicMaterial({ color: '#db2777', transparent: true, opacity: 0.85 })
    const meridian1 = new THREE.Mesh(merGeo, merMat)
    meridian1.rotation.y = Math.PI / 2
    sphereGroup.add(meridian1)

    // Extra Meridians at 45° and 135°
    const m2 = new THREE.Mesh(new THREE.TorusGeometry(R, 0.005, 8, 128), new THREE.MeshBasicMaterial({ color: '#ec4899', transparent: true, opacity: 0.55 }))
    m2.rotation.y = Math.PI / 4
    sphereGroup.add(m2)

    const m3 = new THREE.Mesh(new THREE.TorusGeometry(R, 0.005, 8, 128), new THREE.MeshBasicMaterial({ color: '#ec4899', transparent: true, opacity: 0.55 }))
    m3.rotation.y = -Math.PI / 4
    sphereGroup.add(m3)

    // Latitude Rings at ±45°
    const latR = R * Math.cos(Math.PI / 4)
    const latY = R * Math.sin(Math.PI / 4)
    const lat1 = new THREE.Mesh(new THREE.TorusGeometry(latR, 0.004, 8, 100), new THREE.MeshBasicMaterial({ color: '#f472b6', transparent: true, opacity: 0.4 }))
    lat1.rotation.x = Math.PI / 2
    lat1.position.y = latY
    sphereGroup.add(lat1)

    const lat2 = new THREE.Mesh(new THREE.TorusGeometry(latR, 0.004, 8, 100), new THREE.MeshBasicMaterial({ color: '#f472b6', transparent: true, opacity: 0.4 }))
    lat2.rotation.x = Math.PI / 2
    lat2.position.y = -latY
    sphereGroup.add(lat2)

    // Coordinate Axes
    const axisMat = new THREE.LineBasicMaterial({ color: '#db2777', transparent: true, opacity: 0.5 })
    const zAxis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -R, 0), new THREE.Vector3(0, R, 0)]), axisMat)
    const xAxis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-R, 0, 0), new THREE.Vector3(R, 0, 0)]), axisMat)
    const yAxis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -R), new THREE.Vector3(0, 0, R)]), axisMat)
    sphereGroup.add(zAxis, xAxis, yAxis)

    // North and South Poles
    const poleGeo = new THREE.SphereGeometry(0.05, 16, 16)
    const poleMat = new THREE.MeshBasicMaterial({ color: '#f43f5e', transparent: true, opacity: 0.95 })
    const poleN = new THREE.Mesh(poleGeo, poleMat)
    poleN.position.set(0, R, 0)
    const poleS = new THREE.Mesh(poleGeo, poleMat)
    poleS.position.set(0, -R, 0)
    sphereGroup.add(poleN, poleS)

    // Center Pivot Sphere
    const pivot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), new THREE.MeshBasicMaterial({ color: '#ec4899' }))
    scene.add(pivot)

    // Bloch Vector Arrow (High contrast in both light and dark mode)
    const arrowGroup = new THREE.Group()
    const shaftLength = 0.78
    const headLength = 0.24

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, shaftLength, 12), new THREE.MeshBasicMaterial({ color: '#e2e8f0' }))
    shaft.position.y = shaftLength / 2
    arrowGroup.add(shaft)

    const head = new THREE.Mesh(new THREE.ConeGeometry(0.09, headLength, 16), new THREE.MeshBasicMaterial({ color: '#ec4899' }))
    head.position.y = shaftLength + headLength / 2
    arrowGroup.add(head)

    // Glowing tip dot
    const tipGlow = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), new THREE.MeshBasicMaterial({ color: '#fbcfe8', transparent: true, opacity: 0.9 }))
    tipGlow.position.y = shaftLength + headLength
    arrowGroup.add(tipGlow)

    scene.add(arrowGroup)
    scene.add(new THREE.AmbientLight(0xffffff, 0.9))

    const targetDir = new THREE.Vector3(0.5, 0.6, 0.62).normalize()
    const upVector = new THREE.Vector3(0, 1, 0)
    const targetQuat = new THREE.Quaternion()

    let mouseX = 0
    let mouseY = 0

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = clientX - cx
      const dy = clientY - cy

      mouseX = (clientX / window.innerWidth) * 2 - 1
      mouseY = -(clientY / window.innerHeight) * 2 + 1

      const dist = Math.hypot(dx, dy)
      const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 0.45
      const normR = Math.min(dist / maxRadius, 1.0)
      const angle = Math.atan2(-dy, dx)
      const theta = normR * (Math.PI * 0.9)
      targetDir.set(
        Math.sin(theta) * Math.cos(angle),
        Math.sin(theta) * Math.sin(angle),
        Math.cos(theta)
      ).normalize()
    }

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    let raf: number
    const startTime = performance.now()
    let tipPulse = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = (performance.now() - startTime) / 1000

      // Active sphere rotation with interactive cursor bias
      sphereGroup.rotation.y = Math.sin(t * 0.65) * 0.35 + mouseX * 0.3
      sphereGroup.rotation.x = Math.cos(t * 0.5) * 0.22 - mouseY * 0.25

      // Pulsing tip glow
      tipPulse += 0.06
      tipGlow.material.opacity = 0.6 + Math.sin(tipPulse) * 0.35
      ;(tipGlow.material as THREE.MeshBasicMaterial).needsUpdate = true

      // Snappy arrow tracking
      targetQuat.setFromUnitVectors(upVector, targetDir)
      arrowGroup.quaternion.slerp(targetQuat, 0.14)

      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      if (!el) return
      const w = el.clientWidth || window.innerWidth || 340
      const h = el.clientHeight || window.innerHeight || 340
      camera.aspect = w / h
      camera.position.z = w < 640 ? 4.8 : 3.8
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full pointer-events-none select-none flex items-center justify-center"
      aria-hidden="true"
    />
  )
}