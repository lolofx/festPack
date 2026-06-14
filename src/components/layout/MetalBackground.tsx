const GlowLayer = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <defs>
      <filter id="glow-blur">
        <feGaussianBlur stdDeviation="60" />
      </filter>
    </defs>
    <ellipse cx="60%" cy="40%" rx="300" ry="200" fill="#39ff14" opacity="0.06" filter="url(#glow-blur)" />
    <ellipse cx="10%" cy="80%" rx="200" ry="150" fill="#ff6600" opacity="0.05" filter="url(#glow-blur)" />
    <ellipse cx="85%" cy="15%" rx="180" ry="130" fill="#cc0000" opacity="0.04" filter="url(#glow-blur)" />
  </svg>
);

const GrungeLayer = () => (
  <svg
    className="absolute inset-0 w-full h-full metal-grunge-animate"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.04 }}
  >
    <defs>
      <pattern id="grunge-tile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <line x1="0" y1="40" x2="40" y2="0" stroke="#39ff14" strokeWidth="0.5" opacity="0.6" />
        <line x1="-10" y1="30" x2="30" y2="-10" stroke="#39ff14" strokeWidth="0.3" opacity="0.4" />
        <circle cx="8" cy="8" r="1" fill="#39ff14" opacity="0.5" />
        <circle cx="25" cy="30" r="0.8" fill="#ff6600" opacity="0.4" />
        <circle cx="35" cy="12" r="0.7" fill="#39ff14" opacity="0.3" />
        <circle cx="15" cy="35" r="1" fill="#39ff14" opacity="0.3" />
        <line x1="5" y1="20" x2="12" y2="20" stroke="#39ff14" strokeWidth="0.5" opacity="0.3" />
        <line x1="28" y1="6" x2="38" y2="6" stroke="#ff6600" strokeWidth="0.4" opacity="0.25" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grunge-tile)" />
  </svg>
);

const MiniSkull = ({ rotation }: { rotation: number }) => (
  <svg viewBox="0 0 60 56" width="60" height="56" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotation}deg)` }}>
    <ellipse cx="30" cy="22" rx="22" ry="19" stroke="#39ff14" strokeWidth="1.5" />
    <polygon points="14,16 22,12 30,14 30,24 22,28 14,22" stroke="#39ff14" strokeWidth="1.3" />
    <polygon points="46,16 38,12 30,14 30,24 38,28 46,22" stroke="#39ff14" strokeWidth="1.3" />
    <polygon points="30,28 26,36 34,36" stroke="#39ff14" strokeWidth="1" />
    <rect x="14" y="38" width="32" height="14" rx="1" stroke="#39ff14" strokeWidth="1.2" />
    <line x1="22" y1="38" x2="22" y2="52" stroke="#39ff14" strokeWidth="0.8" />
    <line x1="30" y1="38" x2="30" y2="52" stroke="#39ff14" strokeWidth="0.8" />
    <line x1="38" y1="38" x2="38" y2="52" stroke="#39ff14" strokeWidth="0.8" />
  </svg>
);

const SkullLayer = () => (
  <div className="absolute inset-0 overflow-hidden">

    {/* === Crâne principal === */}
    {/* Div 1: déplace le coin TL au centre du viewport */}
    <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
      {/* Div 2: recentre l'élément (translate statique, pas animé) */}
      <div style={{ transform: 'translate(-50%, -50%)' }}>
      {/* Div 3: rotation animée — ne touche pas au translate parent */}
      <div className="metal-skull-animate">
        <svg
          viewBox="0 0 300 280"
          width="280"
          height="260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cranium outer */}
          <ellipse cx="150" cy="115" rx="112" ry="96" stroke="#39ff14" strokeWidth="2" />
          {/* Cranium inner hatch detail */}
          <ellipse cx="150" cy="110" rx="88" ry="74" stroke="#39ff14" strokeWidth="0.7" opacity="0.35" />
          {/* Crown ridge */}
          <path d="M62,68 L95,42 L150,32 L205,42 L238,68" stroke="#39ff14" strokeWidth="1.5" opacity="0.6" />
          {/* Temple dashes */}
          <line x1="30" y1="105" x2="48" y2="108" stroke="#39ff14" strokeWidth="1.2" opacity="0.5" />
          <line x1="270" y1="105" x2="252" y2="108" stroke="#39ff14" strokeWidth="1.2" opacity="0.5" />
          {/* Cheekbone angular lines */}
          <path d="M38,140 L52,163 L88,170" stroke="#39ff14" strokeWidth="1.5" />
          <path d="M262,140 L248,163 L212,170" stroke="#39ff14" strokeWidth="1.5" />
          {/* Left eye socket — hexagonal angular */}
          <polygon points="74,88 100,72 130,80 134,112 108,130 78,118" stroke="#39ff14" strokeWidth="2" />
          {/* Right eye socket */}
          <polygon points="226,88 200,72 170,80 166,112 192,130 222,118" stroke="#39ff14" strokeWidth="2" />
          {/* Nasal cavity — sharp inverted triangle */}
          <polygon points="150,142 140,178 160,178" stroke="#39ff14" strokeWidth="1.6" />
          {/* Forehead hatch marks */}
          <line x1="110" y1="55" x2="118" y2="63" stroke="#39ff14" strokeWidth="0.8" opacity="0.4" />
          <line x1="150" y1="40" x2="150" y2="50" stroke="#39ff14" strokeWidth="0.8" opacity="0.4" />
          <line x1="190" y1="55" x2="182" y2="63" stroke="#39ff14" strokeWidth="0.8" opacity="0.4" />
          {/* Jaw rectangle */}
          <rect x="70" y="188" width="160" height="58" rx="3" stroke="#39ff14" strokeWidth="1.8" />
          {/* Tooth dividers — 7 lines = 8 teeth */}
          <line x1="90"  y1="188" x2="90"  y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="110" y1="188" x2="110" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="130" y1="188" x2="130" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="150" y1="188" x2="150" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="170" y1="188" x2="170" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="190" y1="188" x2="190" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          <line x1="210" y1="188" x2="210" y2="246" stroke="#39ff14" strokeWidth="1.2" />
          {/* Jaw connectors to cranium */}
          <line x1="70"  y1="188" x2="55"  y2="175" stroke="#39ff14" strokeWidth="1.2" opacity="0.5" />
          <line x1="230" y1="188" x2="245" y2="175" stroke="#39ff14" strokeWidth="1.2" opacity="0.5" />
        </svg>
      </div>
      </div>
    </div>

    {/* === Triangles de coin === */}
    {/* Top-left fire */}
    <svg className="absolute top-0 left-0" width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.15 }}>
      <polygon points="0,0 80,0 0,80" fill="#ff6600" />
    </svg>
    {/* Bottom-right blood */}
    <svg className="absolute bottom-0 right-0" width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.12 }}>
      <polygon points="80,80 0,80 80,0" fill="#cc0000" />
    </svg>
    {/* Top-right blood (small) */}
    <svg className="absolute top-0 right-0" width="50" height="50" viewBox="0 0 50 50" style={{ opacity: 0.08 }}>
      <polygon points="50,0 50,50 0,0" fill="#cc0000" />
    </svg>
    {/* Bottom-left fire (small) */}
    <svg className="absolute bottom-0 left-0" width="50" height="50" viewBox="0 0 50 50" style={{ opacity: 0.08 }}>
      <polygon points="0,50 0,0 50,50" fill="#ff6600" />
    </svg>

    {/* === Mini crânes de coin (opacity 0.08, rotations fixes) === */}
    <div className="absolute top-2 left-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '0s' }}>
      <MiniSkull rotation={0} />
    </div>
    <div className="absolute top-2 right-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '1.5s' }}>
      <MiniSkull rotation={90} />
    </div>
    <div className="absolute bottom-2 right-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '3s' }}>
      <MiniSkull rotation={180} />
    </div>
    <div className="absolute bottom-2 left-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '4.5s' }}>
      <MiniSkull rotation={270} />
    </div>

    {/* Ligne neon top et bottom */}
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: '#39ff14', opacity: 0.25 }} />
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: '#39ff14', opacity: 0.25 }} />
  </div>
);

export function MetalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <GlowLayer />
      <GrungeLayer />
      <SkullLayer />
    </div>
  );
}
