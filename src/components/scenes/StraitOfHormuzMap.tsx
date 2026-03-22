/**
 * Realistic Strait of Hormuz SVG map
 * Bright, readable version with red blockade indicator at the strait narrows.
 */
export default function StraitOfHormuzMap() {
  return (
    <svg viewBox="0 0 480 400" className="w-full">
      <defs>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b6d99" />
          <stop offset="100%" stopColor="#2a5578" />
        </linearGradient>
        <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c2a87d" />
          <stop offset="100%" stopColor="#a89068" />
        </linearGradient>
        <linearGradient id="landGradOman" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bfa574" />
          <stop offset="100%" stopColor="#a48d60" />
        </linearGradient>
        <filter id="landShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
        </filter>
        <radialGradient id="blockadeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tankerPulse" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
          <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Water */}
      <rect width="480" height="400" fill="url(#waterGrad)" rx="8" />
      {[80, 160, 240, 320].map((y, i) => (
        <line key={`wl${i}`} x1="0" y1={y} x2="480" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* ── IRAN ── */}
      <path
        d="M0,0 L480,0 L480,80 L460,85 L440,95 L420,88 L395,92 L380,100 L365,95 L345,105 L330,110
           L315,105 L295,115 L280,120 L270,118 L255,125 L240,130 L225,126 L210,135 L195,140
           L180,138 L165,145 L155,150 L140,148 L125,155 L110,160 L95,158 L80,165 L65,170
           L50,168 L35,175 L20,180 L0,185 Z"
        fill="url(#landGrad)" filter="url(#landShadow)"
      />
      <path d="M50,20 L70,10 L90,25 L110,8 L130,22 L150,5 L170,20 L190,12 L210,28 L230,10 L250,24 L270,15 L290,30 L310,8 L330,25 L350,12 L370,28 L390,18 L410,30 L430,15 L450,25"
        fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <path d="M40,40 L60,30 L80,42 L100,28 L120,38 L140,25 L160,40 L180,32 L200,45 L220,30 L240,42 L260,35 L280,48 L300,30 L320,44 L340,32 L360,46 L380,35 L400,48 L420,38"
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* ── OMAN / UAE + Musandam ── */}
      <path
        d="M0,400 L0,310 L15,305 L30,310 L50,300 L70,305 L90,295 L110,300 L130,290
           L145,285 L155,280 L165,275 L175,268 L182,258 L186,248 L188,238 L186,228
           L182,220 L178,215 L175,225 L170,235 L168,248 L172,258 L178,265
           L185,270 L195,275 L210,285 L225,290 L240,295 L260,300 L280,305
           L300,308 L320,312 L340,315 L360,320 L380,325 L400,330 L420,335
           L440,338 L460,340 L480,345 L480,400 Z"
        fill="url(#landGradOman)" filter="url(#landShadow)"
      />
      <path d="M186,238 L192,232 L196,240 L190,248 L186,242"
        fill="#bfa574" stroke="#a48d60" strokeWidth="0.5" opacity="0.7" />

      {/* ── ISLANDS ── */}
      <path
        d="M240,135 L265,130 L290,128 L315,130 L335,135 L350,140 L345,148 L325,152
           L300,150 L275,148 L255,145 L242,142 Z"
        fill="#c2a87d" stroke="#a89068" strokeWidth="0.5" opacity="0.9"
      />
      <ellipse cx="355" cy="155" rx="12" ry="8" fill="#c2a87d" stroke="#a89068" strokeWidth="0.5" opacity="0.85" />
      <ellipse cx="385" cy="148" rx="9" ry="6" fill="#c2a87d" stroke="#a89068" strokeWidth="0.5" opacity="0.8" />
      <ellipse cx="310" cy="162" rx="8" ry="5" fill="#c2a87d" stroke="#a89068" strokeWidth="0.5" opacity="0.75" />
      <ellipse cx="120" cy="225" rx="6" ry="4" fill="#c2a87d" stroke="#a89068" strokeWidth="0.5" opacity="0.7" />
      <ellipse cx="165" cy="200" rx="5" ry="3.5" fill="#c2a87d" stroke="#a89068" strokeWidth="0.5" opacity="0.7" />
      <ellipse cx="185" cy="195" rx="4" ry="3" fill="#c2a87d" stroke="#a89068" strokeWidth="0.5" opacity="0.7" />

      {/* ── SHIPPING LANES ── */}
      {/* Outbound (left → right, upper lane) */}
      <path
        d="M10,175 C60,170 100,165 140,162 C180,158 220,156 260,160 C300,164 340,170 370,178 C400,186 430,192 475,198"
        fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="16" strokeLinecap="round"
      />
      <path
        d="M10,175 C60,170 100,165 140,162 C180,158 220,156 260,160 C300,164 340,170 370,178 C400,186 430,192 475,198"
        fill="none" stroke="rgba(245,158,11,0.55)" strokeWidth="1.5" strokeDasharray="8,6"
      />
      <polygon points="458,192 470,198 458,204" fill="rgba(245,158,11,0.7)" />
      <polygon points="408,180 420,186 408,192" fill="rgba(245,158,11,0.5)" />

      {/* Inbound (left → right, lower lane) */}
      <path
        d="M10,260 C60,248 100,238 140,225 C180,212 220,200 260,192 C300,184 340,180 370,188 C400,196 430,204 475,212"
        fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="16" strokeLinecap="round"
      />
      <path
        d="M10,260 C60,248 100,238 140,225 C180,212 220,200 260,192 C300,184 340,180 370,188 C400,196 430,204 475,212"
        fill="none" stroke="rgba(245,158,11,0.55)" strokeWidth="1.5" strokeDasharray="8,6"
      />
      <polygon points="458,206 470,212 458,218" fill="rgba(245,158,11,0.7)" />
      <polygon points="408,196 420,202 408,208" fill="rgba(245,158,11,0.5)" />

      {/* Animated pulse (left → right) */}
      <path
        d="M10,218 C60,206 100,196 140,188 C180,180 220,176 260,180 C300,184 340,190 370,198 C400,206 430,212 475,220"
        fill="none" stroke="url(#tankerPulse)" strokeWidth="3" strokeLinecap="round"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-200" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke-dasharray" values="0,200;60,140;0,200" dur="3s" repeatCount="indefinite" />
      </path>

      {/* ══ RED BLOCKADE INDICATOR at strait narrows ══ */}
      <circle cx="340" cy="185" r="28" fill="url(#blockadeGlow)">
        <animate attributeName="r" values="24;32;24" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="340" cy="185" r="6" fill="#ef4444">
        <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="340" cy="185" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="340" y="210" fill="#ef4444" fontSize="8" fontWeight="700" fontFamily="monospace" textAnchor="middle" letterSpacing="1">STRAIT CLOSED</text>

      {/* ── LABELS ── */}
      <text x="200" y="50" fill="rgba(255,255,255,0.85)" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="4">IRAN</text>
      <text x="268" y="178" fill="rgba(200,230,255,0.7)" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif" fontStyle="italic" letterSpacing="1">
        Strait of Hormuz
      </text>
      <text x="20" y="260" fill="rgba(200,230,255,0.45)" fontSize="12" fontWeight="500" fontFamily="Inter, sans-serif" fontStyle="italic" letterSpacing="2">
        Persian Gulf
      </text>
      <text x="370" y="270" fill="rgba(200,230,255,0.45)" fontSize="10" fontWeight="500" fontFamily="Inter, sans-serif" fontStyle="italic" letterSpacing="1">
        Gulf of Oman
      </text>
      <text x="250" y="365" fill="rgba(255,255,255,0.7)" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="4">OMAN</text>
      <text x="30" y="340" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="2">UAE</text>
      <text x="195" y="250" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Inter, sans-serif" letterSpacing="1">Musandam</text>

      {/* Island labels */}
      <text x="260" y="125" fill="rgba(255,255,255,0.5)" fontSize="7" fontWeight="500" fontFamily="Inter, sans-serif">Qeshm</text>
      <text x="345" y="172" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="Inter, sans-serif">Hormuz</text>
      <text x="376" y="140" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="Inter, sans-serif">Larak</text>

      {/* Cities */}
      <circle cx="310" cy="108" r="2.5" fill="rgba(255,255,255,0.7)" />
      <text x="318" y="112" fill="rgba(255,255,255,0.6)" fontSize="7" fontWeight="500" fontFamily="Inter, sans-serif">Bandar Abbas</text>
      <circle cx="55" cy="295" r="2" fill="rgba(255,255,255,0.6)" />
      <text x="62" y="299" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="Inter, sans-serif">Dubai</text>
      <circle cx="425" cy="320" r="2" fill="rgba(255,255,255,0.6)" />
      <text x="405" y="315" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="Inter, sans-serif">Jask</text>

      {/* Lane labels */}
      <text x="30" y="168" fill="rgba(245,158,11,0.65)" fontSize="6" fontWeight="600" fontFamily="monospace" transform="rotate(-3,30,168)">OUTBOUND →</text>
      <text x="30" y="254" fill="rgba(245,158,11,0.65)" fontSize="6" fontWeight="600" fontFamily="monospace" transform="rotate(-5,30,254)">INBOUND →</text>
    </svg>
  );
}
