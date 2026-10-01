'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/variants'
import Link from 'next/link'
import {
  BookOpen, PlayCircle, ExternalLink,
  Cpu, FlaskConical, GraduationCap, Code2,
  Brain, ArrowRight, ShieldCheck, FolderDown
} from 'lucide-react'

/* ─── Curated IBM & Qiskit resource library ───────────────────────────── */
const resourceCategories = [
  {
    id: 'start',
    label: '01 — Start Here',
    eyebrow: 'For Absolute Beginners',
    color: '#ec4899',
    resources: [
      {
        title: 'Official Hackathon Problem Statements & Starter Kit',
        desc: 'Official prompt PDFs and starter resources for all 8 hackathon tracks hosted on Google Drive.',
        url: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
        icon: FolderDown,
        tag: 'Official Drive',
        tagColor: 'purple' as const,
      },
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
        desc: 'Complete API reference, conceptual explainers, and migration guides for Qiskit v1.0+ and IBM Quantum primitives.',
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
    label: '02 — Courses & Textbooks',
    eyebrow: 'Official Curriculum',
    color: '#f472b6',
    resources: [
      {
        title: 'Qiskit Textbook (Learn Qiskit)',
        desc: 'The official interactive quantum computing textbook built on Qiskit notebooks. Covers foundational quantum computation with runnable code.',
        url: 'https://learning.quantum.ibm.com/tutorial/explore-gates-and-circuits-with-the-quantum-composer',
        icon: BookOpen,
        tag: 'Textbook',
        tagColor: 'purple' as const,
      },
      {
        title: 'Fundamentals of Quantum Info',
        desc: 'Comprehensive course series by Dr. John Watrous on IBM Quantum Learning, covering quantum states, operators, and teleportation.',
        url: 'https://learning.quantum.ibm.com/course/fundamentals-of-quantum-information',
        icon: GraduationCap,
        tag: 'IBM Course',
        tagColor: 'purple' as const,
      },
      {
        title: 'Variational Algorithm Design',
        desc: 'Official IBM course exploring VQE, QAOA, ansatz circuits, and gradient estimation on quantum processors using Qiskit Runtime.',
        url: 'https://learning.quantum.ibm.com/course/variational-algorithm-design',
        icon: Brain,
        tag: 'Algorithms',
        tagColor: 'cyan' as const,
      },
      {
        title: 'Quantum-Safe Cryptography',
        desc: 'IBM Quantum official course introducing lattice-based cryptography, ML-KEM, ML-DSA, and post-quantum cybersecurity migration.',
        url: 'https://learning.quantum.ibm.com/course/practical-introduction-to-quantum-safe-cryptography',
        icon: ShieldCheck,
        tag: 'Security',
        tagColor: 'cyan' as const,
      },
    ],
  },
  {
    id: 'qml',
    label: '03 — Quantum Applications & ML',
    eyebrow: 'Qiskit Application Modules',
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
        title: 'Qiskit Machine Learning Library',
        desc: 'Official Qiskit application package for quantum neural networks, variational classifiers, and quantum kernel methods.',
        url: 'https://github.com/qiskit-community/qiskit-machine-learning',
        icon: Code2,
        tag: 'Open Source',
        tagColor: 'purple' as const,
      },
      {
        title: 'Qiskit Optimization & QAOA',
        desc: 'Solve Quadratic Programs, QUBO, and combinatorial optimization problems using QAOA, VQE, and Grover optimizer on IBM Quantum.',
        url: 'https://qiskit-community.github.io/qiskit-optimization/',
        icon: FlaskConical,
        tag: 'Optimization',
        tagColor: 'cyan' as const,
      },
      {
        title: 'Qiskit Algorithms Library',
        desc: 'Core algorithm suite including modern VQE, QAOA, Amplitude Estimation, and Time Evolution built on IBM Quantum primitives.',
        url: 'https://github.com/qiskit-community/qiskit-algorithms',
        icon: Code2,
        tag: 'Algorithms',
        tagColor: 'cyan' as const,
      },
    ],
  },
  {
    id: 'tools',
    label: '04 — Hardware & Platform',
    eyebrow: 'IBM Quantum Infrastructure',
    color: '#f43f5e',
    resources: [
      {
        title: 'IBM Quantum Platform',
        desc: 'Cloud access to real utility-scale IBM quantum processors — execute circuits on superconducting qubit hardware from your browser.',
        url: 'https://quantum.ibm.com/',
        icon: Cpu,
        tag: 'Hardware',
        tagColor: 'purple' as const,
      },
      {
        title: 'IBM Quantum Runtime',
        desc: 'Next-generation execution architecture optimizing containerized quantum-classical loops via Sampler and Estimator primitives.',
        url: 'https://docs.quantum.ibm.com/guides/run-jobs',
        icon: Code2,
        tag: 'Runtime',
        tagColor: 'cyan' as const,
      },
      {
        title: 'IBM Quantum Systems Roadmap',
        desc: 'Follow the evolution of quantum processors: Heron, Flamingo, and Cross-resonance architectures pushing toward fault tolerance.',
        url: 'https://www.ibm.com/quantum/roadmap',
        icon: Cpu,
        tag: 'Roadmap',
        tagColor: 'purple' as const,
      },
      {
        title: 'Qiskit GitHub Community',
        desc: 'Join 500,000+ quantum developers worldwide. Contribute to open-source Qiskit packages, submit issues, and participate in RFCs.',
        url: 'https://github.com/Qiskit',
        icon: Code2,
        tag: 'Community',
        tagColor: 'cyan' as const,
      },
    ],
  },
]

export default function LearnPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden w-full bg-white dark:bg-[#09090f] transition-colors duration-250">
      <div className="quantum-bg" aria-hidden="true" />

      {/* Page hero */}
      <section className="relative z-10 pt-28 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span variants={fadeUp} className="section-eyebrow">Learning Hub</motion.span>
            <motion.h1 variants={fadeUp} className="mt-3 text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Quantum Computing
              <br />
              <span className="gradient-text-neon">From Zero to Hero.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Everything you need to go from &ldquo;What is a qubit?&rdquo; to developing quantum algorithms with Qiskit. Hand-picked resources from IBM Quantum and the global Qiskit open-source community.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── RESOURCE LIBRARY ─────────────────────────────────── */}
      <section className="relative z-10 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.span variants={fadeUp} className="section-eyebrow">Resource Library</motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              IBM &amp; Qiskit Resources
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 dark:text-slate-400 text-sm mb-10 max-w-xl">
              From interactive sandboxes and official documentation to structured courses and application modules — explore by your level and interest.
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
                    <div className="h-px flex-1 bg-pink-200/60 dark:bg-pink-900/40" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">{cat.eyebrow}</span>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {cat.resources.map((r) => (
                      <motion.a
                        key={r.title}
                        variants={fadeUp}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card bg-white/90 dark:bg-slate-900/80 border border-pink-200/80 dark:border-pink-900/40 group p-5 flex flex-col gap-3 cursor-pointer shadow-xs hover:shadow-md hover:border-pink-300 dark:hover:border-pink-700 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div
                            className="p-2.5 rounded-xl flex-shrink-0"
                            style={{
                              background: `${cat.color}18`,
                              border: `1px solid ${cat.color}35`,
                            }}
                          >
                            <r.icon size={16} style={{ color: cat.color }} />
                          </div>
                          <span className={r.tagColor === 'purple' ? 'tag-purple' : 'tag-cyan'}>
                            {r.tag}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                            {r.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed line-clamp-3">
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
            className="glass-card bg-white/90 dark:bg-slate-900/90 border border-pink-200/80 dark:border-pink-900/50 p-10 text-center shadow-lg shadow-pink-100/40 dark:shadow-pink-950/40"
          >
            <div className="text-4xl mb-4">⚛️</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ready to Build?</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 max-w-sm mx-auto">
              Explore the official tracks, get your team together, and prepare for the Quantum Hackathon.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/hackathon"
                className="btn-glow flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white shadow-md shadow-pink-200 dark:shadow-pink-950"
              >
                <span>View Hackathon Tracks</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href="https://learning.quantum.ibm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all"
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