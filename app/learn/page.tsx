'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/variants'
import Link from 'next/link'
import {
  BookOpen, PlayCircle, ExternalLink,
  Cpu, FlaskConical, GraduationCap, Code2,
  Brain, Database, ArrowRight, Copy, Check, Terminal
} from 'lucide-react'

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-pink-200/80 bg-slate-950 text-slate-100 overflow-hidden shadow-md my-3 flex flex-col">
      {/* Header bar with sticky/top copy button */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {title && (
            <span className="font-mono text-xs text-slate-400 font-medium ml-2">{title}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Code container with overflow-x-auto and no-scrollbar */}
      <div className="overflow-x-auto no-scrollbar p-4 text-xs sm:text-sm font-mono leading-relaxed">
        <pre className="m-0 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

/* ─── Curated resource library ───────────────────────────── */
const resourceCategories = [
  {
    id: 'start',
    label: '01 — Start Here',
    eyebrow: 'For Absolute Beginners',
    color: '#ec4899',
    resources: [
      {
        title: 'IBM Quantum Learning',
        desc: 'Official structured learning platform from IBM — courses from zero to advanced, completely free. The single best starting point.',
        url: 'https://learning.quantum.ibm.com/',
        icon: GraduationCap,
        tag: 'Official',
        tagColor: 'purple' as const,
      },
      {
        title: 'Qiskit Documentation',
        desc: 'Complete API reference, conceptual explainers, and tutorials for every Qiskit module — always up-to-date with latest releases.',
        url: 'https://docs.quantum.ibm.com/',
        icon: BookOpen,
        tag: 'Docs',
        tagColor: 'purple' as const,
      },
      {
        title: 'Qiskit YouTube Channel',
        desc: 'Video lectures, live coding sessions, Qiskit seminar series, and event recordings from the IBM Quantum team and community.',
        url: 'https://youtube.com/@qiskit',
        icon: PlayCircle,
        tag: 'Video',
        tagColor: 'cyan' as const,
      },
      {
        title: 'IBM Quantum Composer',
        desc: 'Drag-and-drop quantum circuit builder with real hardware access — no coding needed to run your first circuit on an actual quantum computer.',
        url: 'https://quantum.ibm.com/composer',
        icon: Cpu,
        tag: 'Interactive',
        tagColor: 'cyan' as const,
      },
    ],
  },
  {
    id: 'textbooks',
    label: '02 — Textbooks & Courses',
    eyebrow: 'Structured Learning',
    color: '#f472b6',
    resources: [
      {
        title: 'Qiskit Textbook (Learn Qiskit)',
        desc: 'The open-source, interactive quantum computing textbook built on Jupyter notebooks. Covers all major QC topics with runnable code.',
        url: 'https://qiskit.org/learn',
        icon: BookOpen,
        tag: 'Textbook',
        tagColor: 'purple' as const,
      },
      {
        title: 'Nielsen & Chuang: QCQI',
        desc: '"Quantum Computation and Quantum Information" — the definitive graduate-level textbook. Essential reading for deep theory understanding.',
        url: 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE',
        icon: BookOpen,
        tag: 'Book',
        tagColor: 'purple' as const,
      },
      {
        title: 'Stanford CS269Q Lecture Notes',
        desc: "William Zeng's Stanford quantum computing course notes — rigorous treatment of quantum algorithms, error correction, and hardware.",
        url: 'https://cs269q.stanford.edu/',
        icon: GraduationCap,
        tag: 'University',
        tagColor: 'cyan' as const,
      },
      {
        title: 'MIT OpenCourseWare — Quantum Physics',
        desc: 'MIT 8.04 & 8.05 quantum mechanics lectures and problem sets — ideal for physics foundation before diving into QC.',
        url: 'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/',
        icon: GraduationCap,
        tag: 'University',
        tagColor: 'cyan' as const,
      },
      {
        title: 'Brilliant.org Quantum Computing',
        desc: 'Interactive problem-based quantum computing course — visual, intuitive, and great for cementing intuition without heavy math first.',
        url: 'https://brilliant.org/courses/quantum-computing/',
        icon: Brain,
        tag: 'Interactive',
        tagColor: 'cyan' as const,
      },
    ],
  },
  {
    id: 'qml',
    label: '03 — Quantum Machine Learning',
    eyebrow: 'QML & Advanced Topics',
    color: '#ff2a85',
    resources: [
      {
        title: 'Qiskit Machine Learning Course',
        desc: 'Official Qiskit course covering variational quantum algorithms, QSVM, QNN, and hybrid quantum-classical ML workflows.',
        url: 'https://learn.qiskit.org/course/machine-learning',
        icon: Brain,
        tag: 'QML',
        tagColor: 'purple' as const,
      },
      {
        title: 'PennyLane QML',
        desc: 'Xanadu\'s framework for differentiable quantum programming — excellent tutorials, demos, and a vibrant community. Works with Qiskit backend.',
        url: 'https://pennylane.ai/qml/',
        icon: FlaskConical,
        tag: 'Framework',
        tagColor: 'cyan' as const,
      },
      {
        title: 'Quantum Katas (Microsoft)',
        desc: 'Self-paced coding katas for quantum computing using Q# — great for algorithm practice and deepening understanding through exercises.',
        url: 'https://quantum.microsoft.com/tools/quantum-katas',
        icon: Code2,
        tag: 'Practice',
        tagColor: 'cyan' as const,
      },
    ],
  },
  {
    id: 'tools',
    label: '04 — Tools & Sandboxes',
    eyebrow: 'Hands-On Practice',
    color: '#f43f5e',
    resources: [
      {
        title: 'IBM Quantum Experience',
        desc: 'Free access to real IBM quantum processors — run experiments on actual superconducting qubits from your browser. Up to 127 qubits.',
        url: 'https://quantum.ibm.com/',
        icon: Cpu,
        tag: 'Hardware',
        tagColor: 'purple' as const,
      },
      {
        title: 'Qiskit GitHub Repository',
        desc: 'Open-source Qiskit codebase — browse examples, contribute, read source code, and explore the latest SDK features and extensions.',
        url: 'https://github.com/Qiskit/qiskit',
        icon: Code2,
        tag: 'Open Source',
        tagColor: 'cyan' as const,
      },
      {
        title: 'arXiv Quantum Physics (quant-ph)',
        desc: 'Latest quantum computing research preprints — the primary repository for cutting-edge QC papers before formal publication.',
        url: 'https://arxiv.org/list/quant-ph/recent',
        icon: Database,
        tag: 'Research',
        tagColor: 'purple' as const,
      },
    ],
  },
]

export default function LearnPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden w-full">
      <div className="quantum-bg" aria-hidden="true" />

      {/* Page hero */}
      <section className="relative z-10 pt-28 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span variants={fadeUp} className="section-eyebrow">Learning Hub</motion.span>
            <motion.h1 variants={fadeUp} className="mt-3 text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Quantum Computing
              <br />
              <span className="gradient-text-neon">From Zero to Hero.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Everything you need to go from &ldquo;What is a qubit?&rdquo; to developing quantum algorithms. Hand-picked resources from IBM Quantum, MIT, Stanford, and the global quantum open-source community.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── PREREQUISITES & CODE SETUP ───────────────────────── */}
      <section className="relative z-10 py-10 md:py-14 px-4 sm:px-6 lg:px-8 border-y border-pink-100/80 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-eyebrow">Prerequisites & Setup</motion.span>
            <motion.h2 variants={fadeUp} className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Environment Setup & Starter Circuit
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-sm max-w-2xl mb-6">
              Install the official IBM Qiskit SDK on your machine. Test your environment in under two minutes with the Bell state quantum circuit below.
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <motion.div variants={fadeUp} className="flex flex-col">
                <span className="text-xs font-mono font-semibold text-[#db2777] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Terminal size={14} />
                  <span>1. Command Line Installation</span>
                </span>
                <CodeBlock
                  title="Terminal (bash / zsh / cmd)"
                  code={`# Recommended Python 3.10+\npip install qiskit qiskit-ibm-runtime matplotlib pylatexenc`}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Works on Windows, macOS, and Linux laptops. Free access to IBM cloud simulators is included.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col">
                <span className="text-xs font-mono font-semibold text-pink-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Code2 size={14} />
                  <span>2. 2-Qubit Bell State Verification</span>
                </span>
                <CodeBlock
                  title="bell_state.py"
                  code={`from qiskit import QuantumCircuit\nfrom qiskit.primitives import StatevectorSampler\n\n# Create a 2-qubit entangled Bell State\nqc = QuantumCircuit(2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure_all()\n\n# Run on local statevector simulator\nsampler = StatevectorSampler()\njob = sampler.run([qc], shots=1024)\nresult = job.result()[0].data.meas.get_counts()\nprint("Bell State Counts:", result)`}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Expected output will show roughly equal distribution between <code className="text-pink-600 font-mono">00</code> and <code className="text-pink-600 font-mono">11</code> states.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RESOURCE LIBRARY ─────────────────────────────────── */}
      <section className="relative z-10 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-eyebrow">Resource Library</motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              15 Curated Quantum Resources
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-sm mb-10 max-w-xl">
              From interactive sandboxes to full textbooks and cutting-edge papers — explore by your level and interest.
            </motion.p>

            {resourceCategories.map((cat) => (
              <div key={cat.id} className="mb-14">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={stagger}
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                    <h3
                      className="font-mono text-xs uppercase tracking-widest font-bold"
                      style={{ color: cat.color }}
                    >
                      {cat.label}
                    </h3>
                    <div className="h-px flex-1 bg-pink-200/60" />
                    <span className="text-xs text-slate-500 font-mono font-medium">{cat.eyebrow}</span>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {cat.resources.map((r) => (
                      <motion.a
                        key={r.title}
                        variants={fadeUp}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card bg-white/90 border border-pink-200/80 group p-5 flex flex-col gap-3 cursor-pointer shadow-xs hover:shadow-md hover:border-pink-300 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div
                            className="p-2.5 rounded-xl flex-shrink-0"
                            style={{
                              background: `${cat.color}14`,
                              border: `1px solid ${cat.color}30`,
                            }}
                          >
                            <r.icon size={16} style={{ color: cat.color }} />
                          </div>
                          <span className={r.tagColor === 'purple' ? 'tag-purple' : 'tag-cyan'}>
                            {r.tag}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-pink-600 transition-colors">
                            {r.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                            {r.desc}
                          </p>
                        </div>

                        <div
                          className="flex items-center gap-1 text-xs font-mono mt-auto pt-2 font-semibold"
                          style={{ color: cat.color }}
                        >
                          Open Resource
                          <ExternalLink size={11} />
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="relative z-10 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card bg-white/90 border border-pink-200/80 p-10 text-center shadow-lg shadow-pink-100/40"
            style={{ background: 'radial-gradient(ellipse at top, rgba(253, 242, 248, 0.9), rgba(255, 255, 255, 0.95))' }}
          >
            <div className="text-4xl mb-4">⚛️</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Ready to Build?</h3>
            <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto">
              Explore the official tracks, get your team together, and prepare for the 24-hour hackathon.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/hackathon"
                className="btn-glow flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white"
              >
                <span>View Hackathon Tracks</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href="https://learning.quantum.ibm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-slate-700"
              >
                IBM Quantum Learning <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
