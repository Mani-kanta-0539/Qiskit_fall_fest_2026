// ============================================================
// Qiskit Fall Fest 2026 — Central Data Layer
// ============================================================

export type TrackDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Multi-Level';

export interface ScheduleItem {
  id: string;
  day: 1 | 2 | 3;
  time: string;
  title: string;
  speaker?: string;
  track?: string;
  type: 'keynote' | 'workshop' | 'hackathon' | 'ceremony' | 'break' | 'panel';
  streamUrl?: string;
  recordingUrl?: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  category: 'keynote' | 'mentor' | 'judge';
  topics: string[];
  avatar?: string;
  linkedIn?: string;
  github?: string;
}

export interface TrackSubtrack {
  name: string;
  detail: string;
}

export interface Track {
  id: string;
  number: string;
  title: string;
  provider: string;
  category: string;
  description: string;
  tools: string[];
  difficulty: TrackDifficulty;
  problemBrief: string;
  fullChallenge?: string;
  subtracks?: TrackSubtrack[];
  metrics?: string[];
  evaluation?: string;
  psReleased?: boolean;
  driveLink?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Sponsor {
  name: string;
  logo?: string;
  tier: 'patron' | 'gold' | 'silver' | 'community';
  url?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  linkedIn?: string;
  email?: string;
}

export interface Announcement {
  id: string;
  message: string;
  timestamp: string;
  pinned: boolean;
  type: 'info' | 'warning' | 'success';
}

export interface ChecklistItemData {
  id: string;
  label: string;
  detail?: string;
  required: boolean;
}

export interface Resource {
  title: string;
  description: string;
  url: string;
  type: 'docs' | 'video' | 'notebook' | 'repo';
}

export const eventConfig = {
  name: 'Qiskit Fall Fest 2026',
  tagline: 'Decoding Quantum Horizons: Hack, Learn & Build',
  badge: 'Official IBM Qiskit Fall Fest Extension • 2026 Edition',
  startDate: new Date('2026-10-05T09:00:00+05:30'),
  endDate: new Date('2026-10-07T18:00:00+05:30'),
  scheduleAnnounced: false,
  speakersAnnounced: false,
  hackathonAnnounced: true,
  evaluationPartner: 'Bloq Quantum',
  hardDeadline: 'October 6, 2026 at 6:00 PM IST',
  problemStatementsDrive: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
  hackathonRegistrationForm: 'https://docs.google.com/forms/d/e/1FAIpQLScQXAQKre_qbcroO5Uy9FqaUgeV9qdX95G3YST9TSXRQw73CA/viewform?usp=dialog',
  hackathonManualDrive: 'https://drive.google.com/file/d/1OaZpssRo4MlzTZodmjcmFnx9X6TtGgDG/view?usp=sharing',
  venue: {
    name: 'Dr. Y.V.S. Murthy Auditorium',
    institution: 'Andhra University College of Engineering (AUCE Autonomous)',
    campus: 'North Campus',
    department: 'Department of Computer Science & Systems Engineering',
    address: 'Dr. Y.V.S. Murthy Auditorium, AU College of Engineering (Autonomous) North Campus, Andhra University, Visakhapatnam, Andhra Pradesh — 530003',
    mapsEmbed:
      'https://maps.google.com/maps?q=Dr+YVS+Murty+Auditorium,+Andhra+University+College+of+Engineering,+Visakhapatnam&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapsUrl:
      'https://maps.google.com/?q=Dr+YVS+Murty+Auditorium,+Andhra+University+College+of+Engineering,+Visakhapatnam',
    wifi: 'Network: AU-Guest / QFF2026 | Password: Provided at check-in desk',
    parking: 'Free visitor parking available directly adjacent to Dr. Y.V.S. Murthy Auditorium (AU North Campus Gate 2).',
    transit: 'Visakhapatnam Junction (VSKP) is ~5 km away (~15 min by auto/cab). Frequent RTC buses (Route 900, 99) stop at AU Main Gate / Maddilapalem.',
  },
  registration: 'https://luma.com/event/evt-5G930IWLSnr5DyA',
  lumaEventId: 'evt-5G930IWLSnr5DyA',
  devpost: 'https://qff2026.devpost.com',
  discord: 'https://discord.gg/84zyUDhH6',
  whatsapp: 'https://chat.whatsapp.com/F0w75zLBIL95S7FzSKKyL8',
  instagram: 'https://instagram.com/au.qff_26/',
  twitter: 'https://twitter.com/qff2026',
  linkedin: 'https://linkedin.com/company/qiskit-fall-fest-andhra-university',
  github: 'https://github.com/qff-2026',
  contactEmail: 'andhrauniversityqiskitfallfest@gmail.com',
  helpDeskLocation: 'Dr. Y.V.S. Murthy Auditorium Foyer, AUCE North Campus',
  stats: [
    { label: '3 Days', icon: 'calendar' },
    { label: '100+ Hackers', icon: 'users' },
    { label: '8 Global Challenges', icon: 'trophy' },
    { label: 'IBM Mentors', icon: 'star' },
    { label: 'Qiskit Labs', icon: 'cpu' },
  ],
};

export const scheduleData: ScheduleItem[] = [
  { id: 'd1-01', day: 1, time: '09:00 – 09:30', title: 'Registration & Welcome Kit', type: 'ceremony' },
  { id: 'd1-02', day: 1, time: '09:30 – 10:30', title: 'Opening Ceremony & IBM Quantum Partnership Address', speaker: 'IBM Quantum Ambassador', track: 'Keynote', type: 'keynote', streamUrl: 'https://youtube.com/live/placeholder' },
  { id: 'd1-03', day: 1, time: '10:30 – 12:00', title: 'Introduction to Quantum Computing with Qiskit', speaker: 'Workshop Lead', track: 'Workshop', type: 'workshop' },
  { id: 'd1-04', day: 1, time: '12:00 – 13:00', title: 'Lunch Break', type: 'break' },
  { id: 'd1-05', day: 1, time: '13:00 – 14:30', title: 'Quantum Gates, Circuits & the Bloch Sphere', speaker: 'Faculty Mentor', track: 'Workshop', type: 'workshop' },
  { id: 'd1-06', day: 1, time: '14:30 – 16:00', title: 'Hands-On Lab: Building Your First Quantum Circuit', speaker: 'Technical Team', track: 'Lab', type: 'workshop' },
  { id: 'd1-07', day: 1, time: '16:00 – 17:30', title: 'Guest Keynote: The Future of Quantum Computing', speaker: 'Distinguished Guest', track: 'Keynote', type: 'keynote', streamUrl: 'https://youtube.com/live/placeholder' },
  { id: 'd1-08', day: 1, time: '17:30 – 18:00', title: 'Q&A Panel & Day 1 Wrap-Up', type: 'panel' },
  { id: 'd2-01', day: 2, time: '09:00 – 09:30', title: 'Hackathon Kickoff & Rules Briefing', type: 'ceremony' },
  { id: 'd2-02', day: 2, time: '09:30 – 10:00', title: 'Track Presentations & Problem Statement Release', track: 'Hackathon', type: 'hackathon' },
  { id: 'd2-03', day: 2, time: '10:00 – 12:00', title: 'Team Formation & Ideation Sprint', track: 'Hackathon', type: 'hackathon' },
  { id: 'd2-04', day: 2, time: '12:00 – 13:00', title: 'Lunch Break', type: 'break' },
  { id: 'd2-05', day: 2, time: '13:00 – 18:00', title: 'Hackathon Coding Sprint Begins', track: 'Hackathon', type: 'hackathon' },
  { id: 'd2-06', day: 2, time: '15:00 – 17:00', title: 'Quantum ML Workshop: QML with Qiskit', speaker: 'QML Expert', track: 'Workshop', type: 'workshop' },
  { id: 'd2-07', day: 2, time: '20:00 – 22:00', title: 'Mentor Office Hours — Open Floor', type: 'workshop' },
  { id: 'd3-01', day: 3, time: '09:00 – 10:00', title: 'Final Submission Deadline & Project Freeze', track: 'Hackathon', type: 'hackathon' },
  { id: 'd3-02', day: 3, time: '10:00 – 12:00', title: 'Project Demo Presentations (Judges Round)', track: 'Hackathon', type: 'hackathon' },
  { id: 'd3-03', day: 3, time: '12:00 – 13:00', title: 'Lunch Break', type: 'break' },
  { id: 'd3-04', day: 3, time: '13:00 – 14:00', title: 'Judging Deliberation (Closed Session)', type: 'ceremony' },
  { id: 'd3-05', day: 3, time: '14:00 – 15:00', title: 'Closing Keynote: Quantum Careers & Pathways', speaker: 'Industry Leader', track: 'Keynote', type: 'keynote', streamUrl: 'https://youtube.com/live/placeholder' },
  { id: 'd3-06', day: 3, time: '15:00 – 16:30', title: 'Awards Ceremony & Prize Distribution', type: 'ceremony', streamUrl: 'https://youtube.com/live/placeholder' },
  { id: 'd3-07', day: 3, time: '16:30 – 17:00', title: 'Certificate Distribution & Closing Remarks', type: 'ceremony' },
];

export const speakersData: Speaker[] = [
  { id: 's1', name: 'Dr. Quantum Expert', role: 'IBM Quantum Ambassador', category: 'keynote', affiliation: 'IBM Quantum', topics: ['Quantum Computing', 'Qiskit', 'Quantum Hardware'], linkedIn: '#' },
  { id: 's2', name: 'Prof. Entanglement', role: 'Associate Professor', category: 'keynote', affiliation: 'IIT / IISc', topics: ['Quantum Algorithms', 'Quantum Information'], linkedIn: '#' },
  { id: 's3', name: 'Dr. Superposition', role: 'Research Scientist', category: 'keynote', affiliation: 'TIFR / ISRO', topics: ['Quantum Sensing', 'Future of Quantum Tech'], linkedIn: '#' },
  { id: 'm1', name: 'Ananya Sharma', role: 'Qiskit Developer', category: 'mentor', affiliation: 'IBM Quantum Network', topics: ['Qiskit Runtime', 'VQE', 'QAOA'], linkedIn: '#', github: '#' },
  { id: 'm2', name: 'Rahul Nair', role: 'PhD Researcher', category: 'mentor', affiliation: 'University Quantum Lab', topics: ['Quantum Error Correction', 'QECC'], linkedIn: '#', github: '#' },
  { id: 'm3', name: 'Priya Menon', role: 'ML Engineer', category: 'mentor', affiliation: 'AI Research Lab', topics: ['Quantum Machine Learning', 'Qiskit ML'], linkedIn: '#' },
  { id: 'm4', name: 'Arjun Kapoor', role: 'Software Engineer', category: 'mentor', affiliation: 'Quantum Startup', topics: ['Quantum Optimization', 'QUBO'], github: '#' },
  { id: 'j1', name: 'Dr. Measurement', role: 'Senior Research Scientist', category: 'judge', affiliation: 'IBM Research', topics: ['Judging: Innovation & Impact'], linkedIn: '#' },
  { id: 'j2', name: 'Prof. Coherence', role: 'Department Head', category: 'judge', affiliation: 'Host University', topics: ['Judging: Technical Complexity'], linkedIn: '#' },
  { id: 'j3', name: 'Ms. Qubit', role: 'CTO', category: 'judge', affiliation: 'Quantum Ventures', topics: ['Judging: Practical Feasibility'], linkedIn: '#' },
];

// ─── Official Hackathon Tracks (8 Challenges) ─────────────────

export const tracksData: Track[] = [
  {
    id: 'track-gamifying-qec',
    number: '01',
    title: 'Gamifying Quantum Error Detection, Mitigation & Correction',
    provider: 'McGill University • Wenyu Sun',
    category: 'Error Correction & Games',
    difficulty: 'Intermediate',
    description: 'Demystify error resilience by gamifying error handling workflows. Through interactive game mechanics or simulation frameworks, optimize space-time tradeoffs, route checks, and protect quantum states against realistic device noise.',
    problemBrief: 'Design an interactive game or benchmark application centered on spacetime codes, noise mitigation add-ons (PNA, SLC), or surface code decoding (MWPM, Union-Find).',
    fullChallenge: 'Design an interactive game or benchmark application centered on one (or more) of the three pillars of quantum reliability: (1) Spacetime Codes with qiskit-paulice, (2) Error Mitigation with Qiskit add-ons, or (3) Surface Code decoding.',
    subtracks: [
      {
        name: 'Pillar 1: Error Detection with Spacetime Codes',
        detail: 'Leverage qiskit-paulice to implement low-overhead error detection based on Clifford Perturbation Check (CPC) codes. Quantify the fidelity difference between pure Clifford circuits and T-doped circuits under syndrome measurement and post-selection filtering.',
      },
      {
        name: 'Pillar 2: Error Mitigation',
        detail: 'Build strategies that reduce noise in expectation values using recent Qiskit ecosystem add-ons, including Propagated Noise Absorption (qiskit-addon-pna), Shaded Lightcones (qiskit-addon-slc), and NoiseLearnerV3.',
      },
      {
        name: 'Pillar 3: Error Correction with the Surface Code',
        detail: 'Model and decode surface codes (rotated planar or toroidal geometries) using classical decoders such as Minimum-Weight Perfect Matching (MWPM), Union-Find (UF), or Tensor Network contraction with minimal truncation error.',
      },
    ],
    metrics: [
      'Post-Selection Yield / Acceptance Rate: η = N_accepted / N_total',
      'Decoding Fidelity / Success Probability: State overlap F = ⟨ψ_target|ρ_decoded|ψ_target⟩',
      'Overhead Ratio: Ratio of ancilla qubits and physical gate operations relative to protected logical qubits',
    ],
    evaluation: 'Qiskit Integration (10%), Methods and Creativity (20%), Scientific Insight and Effect (30%), Presentation and Defense (40%)',
    tools: ['Qiskit', 'qiskit-paulice', 'qiskit-addon-pna', 'qiskit-addon-slc', 'NoiseLearnerV3', 'PyMatching / MWPM'],
    psReleased: true,
    driveLink: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
  },
  {
    id: 'track-qaoa-portfolio',
    number: '02',
    title: 'Combinatorial Optimization with QAOA: Constrained Portfolio Selection',
    provider: 'Basque Quantum (BasQ) • Benjamin Tirado',
    category: 'Optimization & Finance',
    difficulty: 'Multi-Level',
    description: 'Extend canonical QAOA beyond unconstrained toy problems toward a robust, constrained portfolio selection pipeline. Formulate financial objectives and strict budget constraints into a parameterized cost Hamiltonian.',
    problemBrief: 'Formulate financial objective and budget constraints (picking exactly K assets out of N) into a parameterized cost Hamiltonian and optimize alternating layers using Qiskit Runtime primitives.',
    fullChallenge: 'Extend canonical QAOA beyond unconstrained toy graphs toward a robust, constrained portfolio selection pipeline. Formulate the financial objective and budget constraints into a parameterized cost Hamiltonian H_C and optimize alternating layers of cost unitaries and mixer unitaries using Qiskit Runtime primitives.',
    subtracks: [
      {
        name: 'Beginner: Parameter Landscapes & Constraint Penalties',
        detail: 'Formulate a small asset instance (N = 4 to 6) with a budget penalty term λ(∑ x_i - K)². Systematically investigate the trade-off between penalty multiplier λ and QAOA depth p ∈ {1, 2, 3}. Evaluate convergence using classical optimizers (COBYLA, SLSQP).',
      },
      {
        name: 'Intermediate: Custom Mixers or Quantum Machine Learning',
        detail: 'Scale the asset universe. Implement constraint-preserving mixers (XY-mixers) that preserve the Hamming weight K, or develop a hybrid QML approach with classical warm-starting relaxations.',
      },
      {
        name: 'Advanced: Utility-Scale Realities on Heavy-Hex',
        detail: 'Address scaling challenges on 127-qubit heavy-hex topology. Mitigate SWAP network depth through commuting-gate routing, analyze barren plateaus, and incorporate error suppression (dynamical decoupling, Pauli twirling).',
      },
    ],
    metrics: [
      'Approximation Ratio: α = C_QAOA / C_exact (compared to brute-force integer programming)',
      'Feasibility Probability: Percentage of total measured shots satisfying all constraints',
      'Transpilation Overhead: Total circuit depth and non-local (two-qubit) gate count on restricted coupling topologies',
    ],
    evaluation: 'Mathematical Rigor & Formulation (30%), Constraint Enforcement (25%), Noise Resilience & Scaling (25%), Presentation & Defense (20%)',
    tools: ['Qiskit', 'Qiskit Runtime (SamplerV2)', 'Qiskit Optimization', 'COBYLA / SLSQP', 'Heavy-Hex Transpiler'],
    psReleased: true,
    driveLink: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
  },
  {
    id: 'track-vqe-chemistry',
    number: '03',
    title: 'Molecular Ground-State Energy Estimation with VQE: Beyond Equilibrium',
    provider: 'Basque Quantum (BasQ) • Benjamin Tirado',
    category: 'Quantum Chemistry',
    difficulty: 'Multi-Level',
    description: 'Moving beyond single-point equilibrium calculations on minimal-basis H2, this challenge explores molecular potential energy surfaces, electron correlation recovery, and quantum resource reduction techniques.',
    problemBrief: 'Construct an end-to-end electronic structure simulation pipeline using qiskit-nature and EstimatorV2. Map second-quantized fermionic Hamiltonians into Pauli operators and confront chemistry simulation demands.',
    fullChallenge: 'Construct an end-to-end electronic structure simulation pipeline using qiskit-nature and StatevectorEstimator / EstimatorV2. Map second-quantized fermionic Hamiltonians into Pauli operators, formulate parameterized ansatz circuits, and confront the resource demands of chemistry simulations.',
    subtracks: [
      {
        name: 'Beginner: Potential Energy Surface of HeH⁺',
        detail: 'Compute the complete Potential Energy Surface (PES) of HeH⁺ across internuclear distances R ∈ [0.4, 2.5] Å. Locate equilibrium bond distance, estimate dissociation limit, and evaluate UCCSD ansatz accuracy across bond-breaking regimes.',
      },
      {
        name: 'Intermediate: Resource Reduction on Larger Molecules',
        detail: 'Scale up to LiH or BeH₂. Implement quantum resource reduction: Jordan-Wigner vs Parity mappings, Z₂ symmetry reduction (qubit tapering), freezing core non-valence orbitals, and grouping commuting Hamiltonian observables.',
      },
      {
        name: 'Advanced: Strongly Correlated Systems & Non-Ansatz Methods',
        detail: 'Investigate systems where fixed single-reference UCCSD ansätze fail due to multireference character. Implement adaptive ansätze (Adapt-VQE), sample configurations for classical quantum subspace expansion, or deploy Zero-Noise Extrapolation (ZNE).',
      },
    ],
    metrics: [
      'Chemical Accuracy: Absolute difference |E_VQE - E_exact| ≤ 1.6 × 10⁻³ Ha (1 kcal/mol)',
      'Resource Scaling: Number of active physical qubits, parameter count, and total CNOT depth after hardware-aware transpilation',
    ],
    evaluation: 'Chemical Accuracy (35%), Resource Reduction Strategy (25%), Ansatz Innovation (20%), Clarity & Defense (20%)',
    tools: ['Qiskit', 'qiskit-nature', 'Qiskit Runtime (EstimatorV2)', 'PySCF / ElectronicEnergy', 'Adapt-VQE', 'ZNE'],
    psReleased: true,
    driveLink: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
  },
  {
    id: 'track-geometry-routing',
    number: '04',
    title: 'Geometry-Aware Quantum Cloud Challenge: Routing, Noise & Architecture Comparison',
    provider: 'quanTA, University of Saskatchewan • Steven Rayan',
    category: 'Architecture & Routing',
    difficulty: 'Advanced',
    description: 'Celebrating a decade of cloud quantum computing (from 5-qubit 2016 processors to modern multi-hundred-qubit devices), benchmark routing overhead and error-protection schemes across diverse processor geometries including hyperbolic tessellations.',
    problemBrief: 'Generate and verify a maximally entangled Bell state across three distinct processor topologies (2016 5-qubit star, 127-qubit heavy-hex, and Hyperbolic-inspired lattice) using a 9-case benchmark matrix.',
    fullChallenge: 'Generate and verify a maximally entangled Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 between two designated remote physical ports across three distinct processor topologies: (a) 2016-Inspired Reference 5-qubit, (b) Contemporary IBM-Style 127-qubit heavy-hex, (c) Hyperbolic-Inspired Architecture.',
    subtracks: [
      {
        name: 'Core Experimental Matrix (9-Case)',
        detail: 'Execute the complete 3x3 benchmark matrix: 2016-Inspired (5 Qubits), Contemporary IBM-Style (Heavy-Hex), and Hyperbolic-Inspired across Ideal Baseline, Noisy Baseline, and Noisy + Protection.',
      },
      {
        name: 'Protection Mechanisms',
        detail: 'Implement parity/stabilizer checks or syndrome post-selection to detect phase/bit flips along the routing path without collapsing the Bell state.',
      },
      {
        name: 'Architectural Recommendation',
        detail: 'Deliver an evidence-based recommendation proposing specific coupling graph features for future cloud QPUs, quantifying fidelity gain vs circuit cost.',
      },
    ],
    metrics: [
      'Bell State Verification Fidelity: F(Φ⁺) = (1 + ⟨XX⟩ - ⟨YY⟩ + ⟨ZZ⟩) / 4',
      'Trade-off Characterization: Added SWAP count, total two-qubit gate depth, and post-selection survival yield η',
      'Architectural Recommendation Quality: Evidence-based topological proposals for cloud QPUs',
    ],
    evaluation: 'Benchmark Completeness 9-case matrix (30%), Protection Mechanism (25%), Architectural Insight (25%), Code & Documentation (20%)',
    tools: ['Qiskit', 'Qiskit Transpiler & PassManager', 'Fake127Qubit / AerSimulator', 'NetworkX', 'Graph Theory'],
    psReleased: true,
    driveLink: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
  },
  {
    id: 'track-tfim-dynamics',
    number: '05',
    title: 'Simulating Quantum Dynamics: The Transverse-Field Ising Model (TFIM)',
    provider: 'Basque Quantum (BasQ) • Benjamin Tirado',
    category: 'Many-Body Simulation',
    difficulty: 'Multi-Level',
    description: 'Simulate non-equilibrium quantum many-body dynamics using digital quantum simulation circuits for TFIM spin chains, exploring the fundamental trade-off between algorithmic Trotter error and physical hardware gate noise.',
    problemBrief: 'Construct digital quantum simulation circuits for TFIM spin chains using Qiskit PauliEvolutionGate and product-formula synthesis algorithms (LieTrotter, SuzukiTrotter).',
    fullChallenge: 'Construct digital quantum simulation circuits for TFIM spin chains using Qiskit PauliEvolutionGate and product-formula synthesis algorithms (LieTrotter, SuzukiTrotter). Track the time-resolved decay and oscillation of physical observables and study strategies to suppress error accumulation.',
    subtracks: [
      {
        name: 'Beginner: Observable Signatures & Trotter Scaling',
        detail: 'Prepare fully polarized ferromagnetic state |00...0⟩. Simulate average site magnetization M_z(t) and evaluate two-point connected correlation functions C_ij(t). Benchmark error vs step size Δt comparing Lie-Trotter vs Suzuki-Trotter.',
      },
      {
        name: 'Intermediate: Recovering Signals Hidden by Device Noise',
        detail: 'Push simulations to regimes where circuit depth causes decoherence to dominate (N ≥ 8 or extended evolution times t). Deploy ZNE, Pauli Twirling, and Twirled Readout Error eXtinction (TREX) to restore corrupted signatures.',
      },
      {
        name: 'Advanced: Utility Scale and Floquet Dynamics',
        detail: 'Model periodically kicked (Floquet) Ising dynamics or regimes where classical exact diagonalization is computationally intractable. Establish validation techniques based on conserved quantities and short-time asymptotics.',
      },
    ],
    metrics: [
      'Trotter Error: Discrepancy between Trotterized expectation values and exact classical numerical baselines',
      'Depth-Accuracy Sweet Spot: Optimal step size Δt* minimizing total error (discretization + noise)',
      'Observables Fidelity: Preservation of magnetization bounds and light-cone spreading velocity of correlations',
    ],
    evaluation: 'Simulation Fidelity & Accuracy (30%), Error Mitigation Mastery (30%), Physics Insight (20%), Defense & Visuals (20%)',
    tools: ['Qiskit', 'PauliEvolutionGate', 'LieTrotter / SuzukiTrotter', 'Qiskit Runtime (EstimatorV2)', 'ZNE / TREX'],
    psReleased: true,
    driveLink: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
  },
  {
    id: 'track-protein-folding',
    number: '06',
    title: 'Protein Folding Structure Prediction on Custom 3D Lattices',
    provider: 'Cleveland Clinic & IBM Quantum',
    category: 'Biophysics & Healthcare',
    difficulty: 'Advanced',
    description: 'Predicting 3D native protein structures directly from primary amino acid sequences represents a grand challenge in structural biology. Combine variational quantum algorithms with coarse-grained 3D discrete lattice models.',
    problemBrief: 'Design, encode, and simulate a variational quantum algorithm for ab initio protein structure prediction of target peptide chains (5–10 amino acids) exploring 3D lattices (BCC, cubic, hybrid) on IBM Eagle R3 and Heron R2.',
    fullChallenge: 'Design, encode, and simulate a variational quantum algorithm for ab initio protein structure prediction of target peptide chains (5–10 amino acids). Venture beyond standard tetrahedral and FCC geometries by exploring alternative 3D tessellations (BCC z=8, cubic z=6, or custom hybrid) on IBM Eagle R3 and Heron R2 architectures.',
    subtracks: [
      {
        name: '1. Lattice Kinematic Encoding',
        detail: 'Represent polypeptide backbone configuration using Turn-based (relative directional) encoding to enforce chain connectivity intrinsically, or Coordinate-based Cartesian encoding with boundary penalties.',
      },
      {
        name: '2. Conformational Hamiltonian Formulation',
        detail: 'Construct total Ising Hamiltonian: H_total = H_interaction + λ_self-avoid H_backbone + λ_density H_compact with Hydrophobic-Polar (HP) or Miyazawa-Jernigan (MJ) contact potentials.',
      },
      {
        name: '3. Variational Optimization & Transpilation',
        detail: 'Implement VQE with hardware-efficient ansätze (RealAmplitudes, TwoLocal) paired with SPSA/COBYLA via EstimatorV2. Compile to heavy-hex topology with dynamical decoupling and TREX readout mitigation.',
      },
    ],
    metrics: [
      'Root-Mean-Square Deviation (RMSD): RMSD = √(1/L ∑ ||r_VQE - r_native||²) compared to true minimum-energy conformation',
      'Contact Map Overlap (CMO): Ratio of correctly formed native non-local contacts to total contacts',
      'Feasible Conformation Yield (η_valid): Percentage of measured bitstrings satisfying strict self-avoiding walk (SAW) constraints',
      'Transpiled Gate Depth: Number of CNOT/CZ gates required after mapping to native heavy-hex layouts',
    ],
    evaluation: 'Biophysical Model & Lattice Innovation (30%), Qiskit Runtime & Architecture Realization (30%), Scalability & Resource Analysis (20%), Presentation & Defense (20%)',
    tools: ['Qiskit', 'Qiskit Runtime (EstimatorV2)', 'RealAmplitudes / TwoLocal', 'SPSA / COBYLA', 'Heavy-Hex Transpiler', 'TREX'],
    psReleased: true,
    driveLink: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
  },
  {
    id: 'track-bb84-cybersecurity',
    number: '07',
    title: 'Information-Theoretic Cybersecurity with BB84 Quantum Key Distribution',
    provider: 'Rensselaer Polytechnic Institute (RPI) & IBM Quantum',
    category: 'Cybersecurity & Networks',
    difficulty: 'Intermediate',
    description: 'Quantum Key Distribution (QKD) leverages physical postulates of quantum mechanics (the no-cloning theorem and Heisenberg uncertainty principle) to establish unconditionally secure cryptographic keys.',
    problemBrief: 'Construct an end-to-end BB84 QKD simulation pipeline using Qiskit across Alice, Bob, and Eve, evaluate information leakage under realistic channel noise, and benchmark against NIST PQC standards.',
    fullChallenge: 'Construct an end-to-end, fully functional BB84 Quantum Key Distribution and post-processing simulation pipeline using Qiskit. Simulate the complete transmission workflow across Alice, Bob, and Eve, evaluate information leakage under realistic channel noise models, and place QKD within the broader landscape of Post-Quantum Cryptography (PQC).',
    subtracks: [
      {
        name: '1. State Preparation & Quantum Channel',
        detail: 'Alice generates random classical bits and chooses between rectilinear (Z) and diagonal (X) bases, transmitting qubits through a simulated noisy quantum channel.',
      },
      {
        name: '2. Eavesdropping Attacks',
        detail: 'Implement Intercept-Resend Attack (Eve measures in random basis and reprepairs states) and Entanglement-based / Beam-Splitter Attack (Eve couples ancilla probe qubits via CNOT gates).',
      },
      {
        name: '3. Measurement, Sifting & Error Correction',
        detail: 'Bob measures in random bases, parties execute public basis reconciliation (sifting), calculate QBER over sacrificed sample, and execute classical error correction (Cascade/Winnow) + Privacy Amplification (Toeplitz hashing).',
      },
      {
        name: '4. Post-Quantum Cryptography Comparative Study',
        detail: 'Benchmark security, hardware requirements, key generation rates, and network scalability of BB84 against leading NIST Post-Quantum Cryptographic standards (ML-KEM / Kyber lattice-based key encapsulation).',
      },
    ],
    metrics: [
      'Quantum Bit Error Rate (QBER): QBER = N_error / N_sifted (Baseline: 0%; Intercept-Resend: ~25%; Shor-Preskill abort: ~11%)',
      'Asymptotic Secret Key Rate (R): R ≥ 1 - 2H_2(QBER), where H_2 is binary Shannon entropy',
      'Mutual Information Advantage: ΔI = I(A; B) - I(A; E); verify ΔI > 0 for positive distillable key length',
    ],
    evaluation: 'Protocol Completeness & Correctness (30%), Eavesdropping Analysis & Noise Modeling (30%), PQC Comparative Analysis (20%), Code Clarity & Presentation (20%)',
    tools: ['Qiskit', 'Qiskit Aer (NoiseModel)', 'Cascade / Winnow Protocol', 'Toeplitz Hashing', 'NIST ML-KEM Benchmarks'],
    psReleased: true,
    driveLink: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
  },
  {
    id: 'track-quantum-ai-biomedical',
    number: '08',
    title: 'Quantum AI for Biomedical Diagnostics: Hybrid Vision Models for Early Disease Detection',
    provider: 'Global Healthcare Track • Medical Imaging Initiative',
    category: 'Quantum AI & Healthcare',
    difficulty: 'Advanced',
    description: 'Modern medical diagnostics (CT, MRI, digital histopathology) generate immense, high-dimensional datasets. Parameterized Quantum Circuits and quanvolutional kernels map image features into expressive quantum Hilbert spaces.',
    problemBrief: 'Develop an end-to-end hybrid quantum-classical diagnostic system using Qiskit and qiskit-machine-learning for early-stage disease classification or lesion segmentation from clinical imagery (BreakHis, Chest X-Ray, HAM10000).',
    fullChallenge: 'Develop an end-to-end hybrid quantum-classical diagnostic system using Qiskit and qiskit-machine-learning for early-stage disease classification or lesion segmentation from clinical imagery. Demonstrate that parameterized quantum layers extract informative, noise-robust diagnostic features.',
    subtracks: [
      {
        name: '1. Data Preprocessing & Dimensionality Mapping',
        detail: 'Select a benchmark clinical image repository (BreakHis breast cancer histopathology, Chest X-Ray pneumonia/COVID, or HAM10000 skin lesions). Apply classical feature compression (ResNet backbones or autoencoders) into N ∈ [4, 16] qubits.',
      },
      {
        name: '2. Quantum Circuit Architecture Design',
        detail: 'Implement one architectural paradigm: Quanvolutional Neural Network (QCNN with 2x2 sliding kernels), Quantum Support Vector Classifier (QSVC with ZZ-Feature Maps), or Variational Quantum Classifier (VQC with data re-uploading and CX/CZ ladders).',
      },
      {
        name: '3. Hardware Execution & Noise Resilience',
        detail: 'Evaluate classification stability against simulated thermal relaxation and depolarizing gate noise. Implement Zero-Noise Extrapolation (ZNE) and Twirled Readout Error eXtinction (TREX) under NISQ conditions.',
      },
    ],
    metrics: [
      'Diagnostic Discrimination: Area Under the ROC Curve (AUC-ROC), Diagnostic Sensitivity (Recall at high specificity), and macro-F1 score',
      'Sample Efficiency Advantage: Learning curves comparing quantum vs classical convergence speed under small-data training regimes (N_train ≤ 200)',
      'Parameter Efficiency Ratio: Performance achieved per trainable weight compared to equivalent classical CNN baselines',
    ],
    evaluation: 'Clinical Relevance & Data Pipeline (25%), Quantum Model Architecture & Innovation (35%), Noise Resilience & Hardware Feasibility (25%), Clarity & Communication (15%)',
    tools: ['Qiskit', 'qiskit-machine-learning', 'Qiskit Runtime (EstimatorV2)', 'PyTorch / torchvision', 'ZNE / TREX'],
    psReleased: true,
    driveLink: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
  },
];

// ─── FAQ Data ─────────────────────────────────────────────────

export const faqData: FAQ[] = [
  {
    question: 'Where is the event being conducted on campus?',
    answer: 'The event takes place at Dr. Y.V.S. Murthy Auditorium, Andhra University College of Engineering (AUCE Autonomous) North Campus, Visakhapatnam. The auditorium is equipped with state-of-the-art audiovisual facilities, central AC, high-speed Wi-Fi, and ample seating for all registered participants.',
  },
  {
    question: 'How do I access the official Hackathon Problem Statements?',
    answer: 'All 8 official problem statements—provided by McGill University, Basque Quantum, Cleveland Clinic, RPI, quanTA, and Global Healthcare—are available in full on the Hackathon page and can also be downloaded directly from our official Google Drive folder.',
  },
  {
    question: 'Do I need prior experience in quantum computing to participate?',
    answer: 'No prior background in quantum physics or quantum circuits is required. Day 1 begins with foundational "Quantum 101" crash courses, environment setup tutorials, and beginner-friendly Jupyter notebooks. Familiarity with basic Python syntax and elementary linear algebra is all you need.',
  },
  {
    question: 'Is there any registration fee?',
    answer: 'No. Registration, workshop participation, mentorship, hackathon entry, and cloud hardware access are 100% free of cost, courtesy of IBM Quantum and Andhra University.',
  },
  {
    question: 'What are the hardware and software prerequisites?',
    answer: 'You only need a working laptop (Windows, macOS, or Linux) with Python 3.10+ installed and a modern web browser. We will provide campus Wi-Fi, power extension hubs, and step-by-step guides to install Qiskit and set up your free IBM Quantum Platform account.',
  },
  {
    question: 'How do teams work for the hackathon?',
    answer: "You can participate solo or in teams of up to 4 members. If you don't have a team yet, you can register individually and join our Discord/WhatsApp matchmaking channels or meet teammates during the in-person team formation mixer on Day 1.",
  },
  {
    question: 'Can I participate virtually, or is it strictly in-person?',
    answer: 'The technical keynotes, introductory workshops, and opening ceremonies will be live-streamed and archived on YouTube for remote viewers. However, hackathon judging, team mentoring sessions, physical swag distribution, and the hands-on project demos will take place in-person at Dr. Y.V.S. Murthy Auditorium.',
  },
  {
    question: 'What will projects be judged on?',
    answer: 'Projects are evaluated on technical rigor (effective and creative use of Qiskit circuits and primitives), originality of the solution, practical feasibility, and clarity of the demo pitch deck and GitHub code repository, in accordance with each track\'s specific criteria.',
  },
  {
    question: 'Will attendees receive certificates?',
    answer: 'Yes. All participants who attend the core workshops and submit a valid hackathon project or lab notebook will receive an official digital Certificate of Participation. Winners will also receive merit certificates and IBM Qiskit gear.',
  },
];

// ─── Sponsors & Partners ─────────────────────────────────────

export const sponsorsData: Sponsor[] = [
  { name: 'IBM Quantum', logo: '/assets/ibm/IBM_Quantum_logotype_pos_RGB.png', tier: 'patron', url: 'https://www.ibm.com/quantum' },
  { name: 'Andhra University', logo: '/assets/logos/andhra-university.jpeg', tier: 'patron', url: 'https://www.andhrauniversity.edu.in' },
  { name: 'More Coming Soon', tier: 'patron' },
  { name: 'AU Quantum Computing Students', tier: 'community' },
  { name: 'Codeiam Club', tier: 'community' },
];

// ─── Organizing Team ─────────────────────────────────────────

export const teamData: TeamMember[] = [
  { name: 'Your Name', role: 'Technical Lead', linkedIn: '#', email: 'you@university.edu' },
  { name: 'Co-Organizer Name', role: 'Event Coordinator', linkedIn: '#' },
  { name: 'Design Lead', role: 'Creative Director', linkedIn: '#' },
  { name: 'Logistics Head', role: 'Operations Lead', linkedIn: '#' },
  { name: 'Marketing Lead', role: 'Outreach & Social Media', linkedIn: '#' },
  { name: 'Faculty Coordinator', role: 'Faculty Advisor', linkedIn: '#' },
  { name: 'Volunteer 1', role: 'Registration Desk', linkedIn: '#' },
  { name: 'Volunteer 2', role: 'Technical Support', linkedIn: '#' },
];

// ─── Announcements ───────────────────────────────────────────

export const announcements: Announcement[] = [
  {
    id: 'a1',
    message: '🎉 General Registrations are now OPEN! Reserve your free spot for Qiskit Fall Fest 2026 (Oct 5–7) at Dr. Y.V.S. Murthy Auditorium, AUCE North Campus.',
    timestamp: 'Live Now',
    pinned: true,
    type: 'success',
  },
  {
    id: 'a2',
    message: '🚀 Official Hackathon Problem Statements are RELEASED! 8 global tracks from McGill, Basque Quantum, Cleveland Clinic, RPI & more. Download PDFs via Google Drive.',
    timestamp: 'Just Released',
    pinned: true,
    type: 'success',
  },
  {
    id: 'a3',
    message: '📍 Venue Confirmed: Dr. Y.V.S. Murthy Auditorium, Andhra University College of Engineering (AUCE) North Campus, Visakhapatnam.',
    timestamp: 'Official Notice',
    pinned: true,
    type: 'info',
  },
];

// ─── Participant Checklist ────────────────────────────────────

export const checklistItems: ChecklistItemData[] = [
  { id: 'c1', label: 'Laptop + Charger', detail: 'Windows / Mac / Linux, 8GB RAM minimum', required: true },
  { id: 'c2', label: 'Student ID Card', detail: 'For registration verification at check-in desk', required: true },
  { id: 'c3', label: 'IBM Quantum Account', detail: 'Register free at quantum.ibm.com', required: true },
  { id: 'c4', label: 'Python 3.10+ Installed', detail: 'Download from python.org', required: true },
  { id: 'c5', label: 'Qiskit Installed', detail: 'Run: pip install qiskit qiskit-ibm-runtime', required: true },
  { id: 'c6', label: 'Qiskit API Token Saved', detail: 'Fetch from IBM Quantum Platform → Account settings', required: true },
  { id: 'c7', label: 'Downloaded Track PDFs & Starter Kit', detail: 'Available on Google Drive folder', required: false },
  { id: 'c8', label: 'Joined Discord Server', detail: 'Invite link on our Socials page', required: false },
  { id: 'c9', label: 'Joined WhatsApp Announcement Group', detail: 'For real-time updates during the event', required: false },
  { id: 'c10', label: 'Power Bank (Recommended)', detail: 'Especially for Day 2–3 hackathon sessions', required: false },
];

// ─── Learning Resources ──────────────────────────────────────

export const resources: Resource[] = [
  {
    title: 'Official Hackathon Manual (PDF)',
    description: 'Complete official guidelines, rules, submission specifications, and team instructions for Qiskit Fall Fest 2026 Hackathon.',
    url: 'https://drive.google.com/file/d/1OaZpssRo4MlzTZodmjcmFnx9X6TtGgDG/view?usp=sharing',
    type: 'docs',
  },
  {
    title: 'Official Problem Statements & Challenge Starter Kit',
    description: 'Official challenge prompt PDFs and starter resources for all 8 hackathon tracks on Google Drive.',
    url: 'https://drive.google.com/drive/folders/1fDArPVLnw7HBNlvgqfTxnaP4hPaem_WB?usp=sharing',
    type: 'notebook',
  },
  {
    title: 'Qiskit Documentation',
    description: 'Official IBM Qiskit docs — circuits, primitives, runtime, transpilation.',
    url: 'https://docs.quantum.ibm.com',
    type: 'docs',
  },
  {
    title: 'Qiskit Textbook',
    description: 'Learn Quantum Computation using Qiskit — free, interactive textbook.',
    url: 'https://github.com/Qiskit/textbook',
    type: 'docs',
  },
  {
    title: 'IBM Quantum Learning',
    description: 'Courses, labs and tutorials from IBM on quantum computing fundamentals.',
    url: 'https://learning.quantum.ibm.com',
    type: 'docs',
  },
  {
    title: 'Qiskit YouTube Channel',
    description: 'Official IBM Qiskit video tutorials, seminars and live demos.',
    url: 'https://www.youtube.com/qiskit',
    type: 'video',
  },
  {
    title: 'IBM Quantum Platform',
    description: 'Access real quantum hardware and simulators on IBM Quantum Platform.',
    url: 'https://quantum.ibm.com',
    type: 'repo',
  },
];

// ─── Contacts ─────────────────────────────────────────────────

export const contacts = [
  { name: 'Your Name', role: 'Technical Lead', phone: '+91 98765 43210', email: 'techlead@qff2026.edu', whatsapp: '+919876543210' },
  { name: 'Co-Organizer', role: 'Event Coordinator', phone: '+91 98765 43211', email: 'coordinator@qff2026.edu', whatsapp: '+919876543211' },
  { name: 'Help Desk', role: 'On-site Support', phone: '+91 98765 43212', email: 'help@qff2026.edu', whatsapp: '+919876543212' },
];

// ─── Timeline Events ──────────────────────────────────────────

export interface TimelineEvent {
  id: string;
  date: Date;
  label: string;
  sublabel: string;
  type: 'registration' | 'hackathon' | 'event' | 'deadline' | 'certificate';
}

export const timelineEvents: TimelineEvent[] = [
  { id: 'tl1', date: new Date('2026-09-01'), label: 'Registration Opens', sublabel: 'Sep 1, 2026', type: 'registration' },
  { id: 'tl2', date: new Date('2026-10-01'), label: 'Submission Portal Open', sublabel: 'Oct 1, 2026', type: 'hackathon' },
  { id: 'tl3', date: new Date('2026-10-05'), label: 'Day 1 — Hands-On Workshops', sublabel: 'Oct 5, 2026', type: 'event' },
  { id: 'tl4', date: new Date('2026-10-06'), label: 'Day 2 — Virtual Mentorship', sublabel: 'Oct 6, 2026', type: 'event' },
  { id: 'tl5', date: new Date('2026-10-06T18:00:00+05:30'), label: 'Hard Submission Deadline', sublabel: 'Oct 6 (6:00 PM IST)', type: 'deadline' },
  { id: 'tl6', date: new Date('2026-10-06T20:00:00+05:30'), label: 'Shortlist Announcement', sublabel: 'Oct 6 (Evening)', type: 'hackathon' },
  { id: 'tl7', date: new Date('2026-10-07'), label: 'Day 3 — Grand Finale Pitching', sublabel: 'Oct 7, 2026', type: 'hackathon' },
  { id: 'tl8', date: new Date('2026-10-14'), label: 'IBM Certificates & Swag', sublabel: 'Oct 14, 2026', type: 'certificate' },
];

// ─── Code of Conduct ──────────────────────────────────────────

export interface CodeOfConductItem {
  num: string;
  title: string;
  body: string;
}

export const codeOfConduct: CodeOfConductItem[] = [
  { num: '01', title: 'Be Respectful', body: 'Treat every participant, mentor, organiser, and judge with dignity and respect. Personal attacks, trolling, or harassment of any kind are strictly prohibited.' },
  { num: '02', title: 'Inclusive Language', body: 'Use welcoming, inclusive language. Be mindful of how your words affect others. Avoid derogatory terms related to gender, race, religion, ability, or sexual orientation.' },
  { num: '03', title: 'Original Work Only', body: 'All hackathon submissions must be original work created during the event. Plagiarism or significant reuse of pre-existing projects without disclosure will result in disqualification.' },
  { num: '04', title: 'Follow IBM Guidelines', body: 'Abide by IBM Quantum Community Guidelines and IBM\'s usage terms for quantum hardware access. Misuse of IBM Quantum credentials or resources will be reported to IBM.' },
  { num: '05', title: 'Responsible AI Use', body: 'AI tools may assist development but must not replace core quantum programming effort. Clearly disclose all AI assistance in your project submission README.' },
  { num: '06', title: 'Collaborate and Lift Others', body: 'Share knowledge, help teammates, and contribute to a culture of collective learning. The goal is to grow together as a community, not just to win.' },
  { num: '07', title: 'No Disruptive Behaviour', body: 'Disruptive behaviour during keynotes, workshops, or judging sessions — including loud phone calls, interrupting presenters, or causing distractions — is not permitted.' },
  { num: '08', title: 'Safety and Consent', body: 'Do not photograph, video, or share content of other participants without their explicit consent. Report unsafe situations to organisers immediately.' },
  { num: '09', title: 'Fair Play', body: 'Do not access systems, networks, or datasets beyond what is explicitly provided. Ethical conduct with IBM Quantum hardware and simulator access is mandatory.' },
  { num: '10', title: 'Consequences', body: 'Violations of this Code of Conduct may result in a warning, removal from the event, or a permanent ban from future QFF events. Severe violations will be escalated to relevant authorities.' },
];

// ─── Partners ─────────────────────────────────────────────────

export interface Partner {
  name: string;
  url?: string;
  logo?: string;
  type: 'club' | 'institution' | 'community';
}

export const partnersData: Partner[] = [
  { name: 'AU Quantum Computing Students Club', type: 'club' },
  { name: 'Codeiam Club', type: 'club' },
  { name: 'IEEE Student Branch — AU', type: 'club' },
];
