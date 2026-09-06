export default function QuantumBackground() {
  return (
    <div className="quantum-bg" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.65 }}
      >
        <defs>
          <pattern id="qcircuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Qubit wire lines */}
            <line x1="0" y1="20" x2="120" y2="20" stroke="#f472b6" strokeWidth="0.6" strokeOpacity="0.4" />
            <line x1="0" y1="60" x2="120" y2="60" stroke="#f472b6" strokeWidth="0.6" strokeOpacity="0.4" />
            <line x1="0" y1="100" x2="120" y2="100" stroke="#f472b6" strokeWidth="0.6" strokeOpacity="0.25" />
            {/* Gate boxes */}
            <rect x="10" y="13" width="14" height="14" rx="2" fill="#ffffff" fillOpacity="0.9" stroke="#ec4899" strokeWidth="0.8" strokeOpacity="0.85" />
            <text x="17" y="23" textAnchor="middle" fontSize="6.5" fill="#db2777" fontWeight="bold" fontFamily="monospace">H</text>
            <rect x="50" y="53" width="14" height="14" rx="2" fill="#ffffff" fillOpacity="0.9" stroke="#db2777" strokeWidth="0.8" strokeOpacity="0.8" />
            <text x="57" y="63" textAnchor="middle" fontSize="6.5" fill="#be185d" fontWeight="bold" fontFamily="monospace">X</text>
            <rect x="90" y="13" width="14" height="14" rx="2" fill="#ffffff" fillOpacity="0.9" stroke="#ec4899" strokeWidth="0.8" strokeOpacity="0.8" />
            <text x="97" y="23" textAnchor="middle" fontSize="6.5" fill="#db2777" fontWeight="bold" fontFamily="monospace">R</text>
            {/* CNOT control/target */}
            <circle cx="75" cy="20" r="3" fill="#db2777" fillOpacity="0.9" />
            <line x1="75" y1="23" x2="75" y2="57" stroke="#db2777" strokeWidth="0.6" strokeOpacity="0.6" strokeDasharray="2,2" />
            <circle cx="75" cy="60" r="5" fill="#ffffff" stroke="#db2777" strokeWidth="0.9" strokeOpacity="0.85" />
            <line x1="71" y1="60" x2="79" y2="60" stroke="#db2777" strokeWidth="0.9" strokeOpacity="0.85" />
            <line x1="75" y1="56" x2="75" y2="64" stroke="#db2777" strokeWidth="0.9" strokeOpacity="0.85" />
            {/* Measure boxes */}
            <rect x="105" y="13" width="10" height="14" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.6" strokeOpacity="0.7" />
            <rect x="105" y="53" width="10" height="14" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.6" strokeOpacity="0.7" />
          </pattern>
          <radialGradient id="heroGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fff8fa" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Circuit pattern */}
        <rect width="100%" height="100%" fill="url(#qcircuit)" />
        {/* Hero radial glow */}
        <rect width="100%" height="100%" fill="url(#heroGlow)" />
      </svg>
    </div>
  )
}
