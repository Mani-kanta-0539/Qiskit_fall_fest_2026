// ============================================================
// Qiskit Fall Fest 2026 — Central Data Layer
// Update this file with real data; no component changes needed.
// ============================================================

// ─── Types ───────────────────────────────────────────────────

export type TrackDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

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

export interface Track {
  id: string;
  number: string;
  title: string;
  description: string;
  tools: string[];
  difficulty: TrackDifficulty;
  problemBrief: string;
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

// ─── Event Config ────────────────────────────────────────────

export const eventConfig = {
  name: 'Qiskit Fall Fest 2026',
  tagline: 'Decoding Quantum Horizons: Hack, Learn & Build',
  badge: 'Official IBM Qiskit Fall Fest Extension • 2026 Edition',
  startDate: new Date('2026-10-05T09:00:00+05:30'),
  endDate: new Date('2026-10-07T18:00:00+05:30'),
  // Set to true when you are ready to publish real schedule, speakers, or hackathon tracks:
  scheduleAnnounced: false,
  speakersAnnounced: false,
  hackathonAnnounced: false,
  venue: {
    name: 'Main Auditorium / Seminar Complex',
    institution: 'Andhra University (North Campus)',
    department: 'Department of Computer Science & Systems Engineering',
    address: 'North Campus, Andhra University, Visakhapatnam, Andhra Pradesh — 530003',
    mapsEmbed:
      'https://maps.google.com/maps?q=Andhra+University+North+Campus,+Visakhapatnam&t=&z=15&ie=UTF8&iwloc=&output=embed',
    wifi: 'Network: AU-Guest / QFF2026 | Password: Provided at check-in desk',
    parking: 'Free visitor parking available inside AU North Campus Gate 2.',
    transit: 'Visakhapatnam Junction (VSKP) is ~5 km away. Frequent RTC buses available from RTC Complex & Maddilapalem.',
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
  helpDeskLocation: 'Ground Floor Foyer, North Campus',
  stats: [
    { label: '3 Days', icon: 'calendar' },
    { label: '100+ Hackers', icon: 'users' },
    { label: '₹50,000 Prize Pool', icon: 'trophy' },
    { label: 'IBM Mentors', icon: 'star' },
    { label: 'Qiskit Labs', icon: 'cpu' },
  ],
};

// ─── Schedule Data ───────────────────────────────────────────

export const scheduleData: ScheduleItem[] = [
  // Day 1
  {
    id: 'd1-01', day: 1, time: '09:00 – 09:30', title: 'Registration & Welcome Kit',
    type: 'ceremony',
  },
  {
    id: 'd1-02', day: 1, time: '09:30 – 10:30',
    title: 'Opening Ceremony & IBM Quantum Partnership Address',
    speaker: 'IBM Quantum Ambassador', track: 'Keynote', type: 'keynote',
    streamUrl: 'https://youtube.com/live/placeholder',
  },
  {
    id: 'd1-03', day: 1, time: '10:30 – 12:00',
    title: 'Introduction to Quantum Computing with Qiskit',
    speaker: 'Workshop Lead', track: 'Workshop', type: 'workshop',
  },
  {
    id: 'd1-04', day: 1, time: '12:00 – 13:00', title: 'Lunch Break', type: 'break',
  },
  {
    id: 'd1-05', day: 1, time: '13:00 – 14:30',
    title: 'Quantum Gates, Circuits & the Bloch Sphere',
    speaker: 'Faculty Mentor', track: 'Workshop', type: 'workshop',
  },
  {
    id: 'd1-06', day: 1, time: '14:30 – 16:00',
    title: 'Hands-On Lab: Building Your First Quantum Circuit',
    speaker: 'Technical Team', track: 'Lab', type: 'workshop',
  },
  {
    id: 'd1-07', day: 1, time: '16:00 – 17:30',
    title: 'Guest Keynote: The Future of Quantum Computing',
    speaker: 'Distinguished Guest', track: 'Keynote', type: 'keynote',
    streamUrl: 'https://youtube.com/live/placeholder',
  },
  {
    id: 'd1-08', day: 1, time: '17:30 – 18:00',
    title: 'Q&A Panel & Day 1 Wrap-Up', type: 'panel',
  },
  // Day 2
  {
    id: 'd2-01', day: 2, time: '09:00 – 09:30',
    title: 'Hackathon Kickoff & Rules Briefing', type: 'ceremony',
  },
  {
    id: 'd2-02', day: 2, time: '09:30 – 10:00',
    title: 'Track Presentations & Problem Statement Release', track: 'Hackathon', type: 'hackathon',
  },
  {
    id: 'd2-03', day: 2, time: '10:00 – 12:00',
    title: 'Team Formation & Ideation Sprint', track: 'Hackathon', type: 'hackathon',
  },
  {
    id: 'd2-04', day: 2, time: '12:00 – 13:00', title: 'Lunch Break', type: 'break',
  },
  {
    id: 'd2-05', day: 2, time: '13:00 – 18:00',
    title: '24-Hour Hackathon — Coding Begins', track: 'Hackathon', type: 'hackathon',
  },
  {
    id: 'd2-06', day: 2, time: '15:00 – 17:00',
    title: 'Quantum ML Workshop: QML with Qiskit',
    speaker: 'QML Expert', track: 'Workshop', type: 'workshop',
  },
  {
    id: 'd2-07', day: 2, time: '20:00 – 22:00',
    title: 'Mentor Office Hours — Open Floor', type: 'workshop',
  },
  // Day 3
  {
    id: 'd3-01', day: 3, time: '09:00 – 10:00',
    title: 'Final Submission Deadline & Project Freeze', track: 'Hackathon', type: 'hackathon',
  },
  {
    id: 'd3-02', day: 3, time: '10:00 – 12:00',
    title: 'Project Demo Presentations (Judges Round)', track: 'Hackathon', type: 'hackathon',
  },
  {
    id: 'd3-03', day: 3, time: '12:00 – 13:00', title: 'Lunch Break', type: 'break',
  },
  {
    id: 'd3-04', day: 3, time: '13:00 – 14:00',
    title: 'Judging Deliberation (Closed Session)', type: 'ceremony',
  },
  {
    id: 'd3-05', day: 3, time: '14:00 – 15:00',
    title: 'Closing Keynote: Quantum Careers & Pathways',
    speaker: 'Industry Leader', track: 'Keynote', type: 'keynote',
    streamUrl: 'https://youtube.com/live/placeholder',
  },
  {
    id: 'd3-06', day: 3, time: '15:00 – 16:30',
    title: 'Awards Ceremony & Prize Distribution', type: 'ceremony',
    streamUrl: 'https://youtube.com/live/placeholder',
  },
  {
    id: 'd3-07', day: 3, time: '16:30 – 17:00',
    title: 'Certificate Distribution & Closing Remarks', type: 'ceremony',
  },
];

// ─── Speakers, Mentors & Judges ──────────────────────────────

export const speakersData: Speaker[] = [
  {
    id: 's1', name: 'Dr. Quantum Expert', role: 'IBM Quantum Ambassador', category: 'keynote',
    affiliation: 'IBM Quantum', topics: ['Quantum Computing', 'Qiskit', 'Quantum Hardware'],
    linkedIn: '#',
  },
  {
    id: 's2', name: 'Prof. Entanglement', role: 'Associate Professor', category: 'keynote',
    affiliation: 'IIT / IISc', topics: ['Quantum Algorithms', 'Quantum Information'],
    linkedIn: '#',
  },
  {
    id: 's3', name: 'Dr. Superposition', role: 'Research Scientist', category: 'keynote',
    affiliation: 'TIFR / ISRO', topics: ['Quantum Sensing', 'Future of Quantum Tech'],
    linkedIn: '#',
  },
  {
    id: 'm1', name: 'Ananya Sharma', role: 'Qiskit Developer', category: 'mentor',
    affiliation: 'IBM Quantum Network', topics: ['Qiskit Runtime', 'VQE', 'QAOA'],
    linkedIn: '#', github: '#',
  },
  {
    id: 'm2', name: 'Rahul Nair', role: 'PhD Researcher', category: 'mentor',
    affiliation: 'University Quantum Lab', topics: ['Quantum Error Correction', 'QECC'],
    linkedIn: '#', github: '#',
  },
  {
    id: 'm3', name: 'Priya Menon', role: 'ML Engineer', category: 'mentor',
    affiliation: 'AI Research Lab', topics: ['Quantum Machine Learning', 'Pennylane'],
    linkedIn: '#',
  },
  {
    id: 'm4', name: 'Arjun Kapoor', role: 'Software Engineer', category: 'mentor',
    affiliation: 'Quantum Startup', topics: ['Quantum Optimization', 'QUBO'],
    github: '#',
  },
  {
    id: 'j1', name: 'Dr. Measurement', role: 'Senior Research Scientist', category: 'judge',
    affiliation: 'IBM Research', topics: ['Judging: Innovation & Impact'],
    linkedIn: '#',
  },
  {
    id: 'j2', name: 'Prof. Coherence', role: 'Department Head', category: 'judge',
    affiliation: 'Host University', topics: ['Judging: Technical Complexity'],
    linkedIn: '#',
  },
  {
    id: 'j3', name: 'Ms. Qubit', role: 'CTO', category: 'judge',
    affiliation: 'Quantum Ventures', topics: ['Judging: Practical Feasibility'],
    linkedIn: '#',
  },
];

// ─── Hackathon Tracks ────────────────────────────────────────

export const tracksData: Track[] = [
  {
    id: 't1', number: '01',
    title: 'Quantum Algorithms & Optimization',
    description: 'Design and implement quantum algorithms to solve real-world optimization problems using Qiskit and QAOA/VQE frameworks.',
    problemBrief: 'Build a quantum algorithm that outperforms (or matches) a classical heuristic for an NP-hard optimization problem of your choice — logistics, scheduling, or portfolio optimization.',
    tools: ['Qiskit', 'Qiskit Optimization', 'QAOA', 'VQE', 'IBM Quantum Platform'],
    difficulty: 'Intermediate',
  },
  {
    id: 't2', number: '02',
    title: 'Quantum Machine Learning (QML)',
    description: 'Leverage parameterized quantum circuits as hybrid machine learning models to classify, cluster, or generate data.',
    problemBrief: 'Train a Quantum Neural Network or Variational Quantum Classifier on a real dataset and compare its performance against a classical baseline. Explain the quantum advantage (or lack thereof).',
    tools: ['Qiskit Machine Learning', 'PennyLane', 'PyTorch', 'IBM Quantum Runtime'],
    difficulty: 'Advanced',
  },
  {
    id: 't3', number: '03',
    title: 'Error Mitigation & Quantum Games',
    description: 'Explore the frontier of near-term quantum computing — implement error mitigation techniques or build a creative quantum game/art piece using quantum randomness and gates.',
    problemBrief: 'Either: (A) Apply Zero Noise Extrapolation or Probabilistic Error Cancellation to improve a noisy quantum circuit\'s accuracy, OR (B) Build a creative, interactive quantum game powered by genuine quantum randomness via Qiskit.',
    tools: ['Qiskit', 'Qiskit Experiments', 'Mthree', 'IBM Quantum Simulators'],
    difficulty: 'Beginner',
  },
];

// ─── FAQ Data ─────────────────────────────────────────────────

export const faqData: FAQ[] = [
  {
    question: 'Do I need prior experience in quantum computing to participate?',
    answer: 'No prior background in quantum physics or quantum circuits is required. Day 1 begins with foundational "Quantum 101" crash courses, environment setup tutorials, and beginner-friendly Jupyter notebooks. Familiarity with basic Python syntax and elementary linear algebra (vectors and matrix multiplication) is all you need.',
  },
  {
    question: 'Is there any registration fee?',
    answer: 'No. Registration, workshop participation, mentorship, hackathon entry, and cloud simulator access are 100% free of cost, courtesy of IBM Quantum and our university department.',
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
    answer: 'The technical keynotes, introductory workshops, and opening ceremonies will be live-streamed and archived on YouTube for remote viewers. However, hackathon judging, team mentoring sessions, physical swag distribution, and the hands-on project demos will take place in-person at the campus auditorium.',
  },
  {
    question: 'What will projects be judged on?',
    answer: 'Projects are evaluated on technical rigor (effective and creative use of Qiskit circuits and primitives), originality of the solution, practical feasibility, and clarity of the demo pitch deck and GitHub code repository.',
  },
  {
    question: 'Will attendees receive certificates?',
    answer: 'Yes. All participants who attend the core workshops and submit a valid hackathon project or lab notebook will receive an official digital Certificate of Completion. Winners will also receive merit certificates and IBM Qiskit gear.',
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
    message: '🎉 General Registrations are now OPEN! Reserve your free pass for Qiskit Fall Fest 2026 (Oct 5–7).',
    timestamp: 'Live Now',
    pinned: true,
    type: 'success',
  },
  {
    id: 'a2',
    message: '⚡ Hackathon Registrations opening soon — assemble your team of 2–4 builders and prepare your Qiskit toolkit!',
    timestamp: 'Coming Soon',
    pinned: true,
    type: 'warning',
  },
  {
    id: 'a3',
    message: '📅 Event Dates Confirmed: October 5–7, 2026. Free workshops, keynote lectures & 24h hackathon!',
    timestamp: 'Official Notice',
    pinned: true,
    type: 'info',
  },
];

// ─── Participant Checklist ────────────────────────────────────

export const checklistItems: ChecklistItemData[] = [
  { id: 'c1', label: 'Laptop + Charger', detail: 'Windows / Mac / Linux, 8GB RAM minimum', required: true },
  { id: 'c2', label: 'Student ID Card', detail: 'For registration verification at the event', required: true },
  { id: 'c3', label: 'IBM Quantum Account', detail: 'Register free at quantum.ibm.com', required: true },
  { id: 'c4', label: 'Python 3.10+ Installed', detail: 'Download from python.org', required: true },
  { id: 'c5', label: 'Qiskit Installed', detail: 'Run: pip install qiskit qiskit-ibm-runtime', required: true },
  { id: 'c6', label: 'Qiskit API Token Saved', detail: 'Fetch from IBM Quantum Platform → Account settings', required: true },
  { id: 'c7', label: 'Joined Discord Server', detail: 'Invite link on our Socials page', required: false },
  { id: 'c8', label: 'Joined WhatsApp Announcement Group', detail: 'For real-time updates during the event', required: false },
  { id: 'c9', label: 'Downloaded Starter Notebook', detail: 'Available on the Learn page', required: false },
  { id: 'c10', label: 'Power Bank (Recommended)', detail: 'Especially for Day 2 hackathon', required: false },
];

// ─── Learning Resources ──────────────────────────────────────

export const resources: Resource[] = [
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
    title: 'Qiskit Fall Fest 2026 Starter Kit',
    description: 'Pre-configured Jupyter notebooks to get you started on all three tracks.',
    url: 'https://github.com/qff-2026/starter-kit',
    type: 'notebook',
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
  { name: 'Your Name', role: 'Technical Lead', phone: '+91 98765 43210', email: 'techleaed@qff2026.edu', whatsapp: '+919876543210' },
  { name: 'Co-Organizer', role: 'Event Coordinator', phone: '+91 98765 43211', email: 'coordinator@qff2026.edu', whatsapp: '+919876543211' },
  { name: 'Help Desk', role: 'On-site Support', phone: '+91 98765 43212', email: 'help@qff2026.edu', whatsapp: '+919876543212' },
];
