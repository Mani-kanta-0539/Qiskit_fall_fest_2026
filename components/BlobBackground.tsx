'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */`
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;
  varying vec2  vUv;
  varying float vDistort;

  vec3 mod289(vec3 x){ return x-floor(x*(1./289.))*289.; }
  vec4 mod289(vec4 x){ return x-floor(x*(1./289.))*289.; }
  vec4 permute(vec4 x){ return mod289(((x*34.)+1.)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159-.85373472095314*r; }

  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);
    const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.;
    vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
    m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    vUv=uv;
    float t=uTime*uSpeed;
    float dist=snoise(vec3(position*uNoiseDensity+t));
    vec3 pos=position+(normal*dist*uNoiseStrength);
    vDistort=dist;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
  }
`

const fragmentShader = /* glsl */`
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform float uOpacity;
  varying float vDistort;

  void main(){
    float t=vDistort*.5+.5;
    vec3 col=mix(uColorA,uColorB,t);
    float glow=pow(t,2.)*0.35;
    gl_FragColor=vec4(col+glow,uOpacity);
  }
`

export default function BlobBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 5)

    // Main morphing blob
    const geo = new THREE.SphereGeometry(1.7, 192, 192)
    const uniforms = {
      uTime:          { value: 0 },
      uSpeed:         { value: 0.16 },
      uNoiseDensity:  { value: 1.1 },
      uNoiseStrength: { value: 0.45 },
      uColorA:        { value: new THREE.Color('#f472b6') },
      uColorB:        { value: new THREE.Color('#db2777') },
      uOpacity:       { value: 0.75 },
    }
    const mat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Wireframe shell
    const wGeo = new THREE.SphereGeometry(1.95, 28, 28)
    const wMat = new THREE.MeshBasicMaterial({ color: '#ec4899', wireframe: true, transparent: true, opacity: 0.08 })
    const wire = new THREE.Mesh(wGeo, wMat)
    scene.add(wire)

    // Orbit ring
    const rGeo = new THREE.TorusGeometry(2.3, 0.004, 8, 120)
    const rMat = new THREE.MeshBasicMaterial({ color: '#db2777', transparent: true, opacity: 0.35 })
    const ring = new THREE.Mesh(rGeo, rMat)
    ring.rotation.x = Math.PI / 2.5
    scene.add(ring)

    // Floating particles
    const pCount = 100
    const pos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 2.3 + Math.random() * 1.2
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i*3+2] = r * Math.cos(phi)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pMat = new THREE.PointsMaterial({ color: '#db2777', size: 0.022, transparent: true, opacity: 0.5, sizeAttenuation: true })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    scene.add(new THREE.AmbientLight(0xfff0f5, 0.7))
    const pl = new THREE.PointLight(0xdb2777, 1.8, 12)
    pl.position.set(3, 3, 3)
    scene.add(pl)

    let mx = 0, my = 0
    const onMouse = (e: MouseEvent) => { mx = (e.clientX/window.innerWidth-.5)*.5; my = (e.clientY/window.innerHeight-.5)*.2 }
    window.addEventListener('mousemove', onMouse)

    let raf: number
    const startTime = performance.now()
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = (performance.now() - startTime) / 1000
      uniforms.uTime.value = t
      mesh.rotation.y = t * 0.07 + mx * 0.4
      mesh.rotation.x = my * 0.3
      wire.rotation.y = t * 0.035
      wire.rotation.z = t * 0.018
      ring.rotation.z = t * 0.05
      particles.rotation.y = t * 0.025
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      if (!el) return
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      geo.dispose(); mat.dispose()
      wGeo.dispose(); wMat.dispose()
      rGeo.dispose(); rMat.dispose()
      pGeo.dispose(); pMat.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0, overflow:'hidden', pointerEvents:'none' }}
    />
  )
}
