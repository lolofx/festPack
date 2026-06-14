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

const MetalHand = ({ rotation }: { rotation: number }) => (
  <svg viewBox="0 0 82 96" width="72" height="84" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotation}deg)` }}>
    {/* Toiles / splatter depuis le centre */}
    <line x1="41" y1="52" x2="4"  y2="16" stroke="#39ff14" strokeWidth="0.7" opacity="0.45"/>
    <line x1="41" y1="52" x2="78" y2="13" stroke="#39ff14" strokeWidth="0.7" opacity="0.45"/>
    <line x1="41" y1="52" x2="4"  y2="80" stroke="#39ff14" strokeWidth="0.5" opacity="0.32"/>
    <line x1="41" y1="52" x2="80" y2="76" stroke="#39ff14" strokeWidth="0.5" opacity="0.32"/>
    <line x1="41" y1="52" x2="82" y2="52" stroke="#39ff14" strokeWidth="0.4" opacity="0.22"/>
    <line x1="41" y1="52" x2="0"  y2="50" stroke="#39ff14" strokeWidth="0.4" opacity="0.22"/>
    {/* Nœuds de toile */}
    <circle cx="12"  cy="24" r="1.2" fill="#39ff14" opacity="0.35"/>
    <circle cx="70"  cy="20" r="1.2" fill="#39ff14" opacity="0.35"/>
    <circle cx="72"  cy="70" r="1.0" fill="#39ff14" opacity="0.28"/>
    <circle cx="10"  cy="72" r="1.0" fill="#39ff14" opacity="0.28"/>

    {/* Poignet */}
    <rect x="26" y="76" width="28" height="18" rx="4" stroke="#39ff14" strokeWidth="1.4"/>
    {/* Ligne articulaire poignet */}
    <line x1="26" y1="82" x2="54" y2="82" stroke="#39ff14" strokeWidth="0.7" opacity="0.4"/>

    {/* Paume */}
    <rect x="16" y="40" width="48" height="38" rx="5" stroke="#39ff14" strokeWidth="1.7"/>
    {/* Lignes osseuses de la paume */}
    <line x1="30" y1="76" x2="30" y2="50" stroke="#39ff14" strokeWidth="0.6" opacity="0.28"/>
    <line x1="41" y1="76" x2="41" y2="48" stroke="#39ff14" strokeWidth="0.6" opacity="0.28"/>
    <line x1="52" y1="76" x2="52" y2="50" stroke="#39ff14" strokeWidth="0.6" opacity="0.28"/>
    {/* Ligne de knuckles */}
    <line x1="16" y1="58" x2="64" y2="58" stroke="#39ff14" strokeWidth="0.7" opacity="0.25"/>

    {/* Majeur replié — bosse de phalange gauche */}
    <path d="M28,40 C27,32 30,24 34,23 C37,22 39,25 39,30 C39,35 38,40 36,40"
          stroke="#39ff14" strokeWidth="1.3"/>
    <line x1="27" y1="31" x2="38" y2="30" stroke="#39ff14" strokeWidth="0.7" opacity="0.4"/>

    {/* Annulaire replié — bosse de phalange droite */}
    <path d="M44,40 C44,34 47,26 50,24 C53,23 55,26 54,31 C53,36 51,40 48,40"
          stroke="#39ff14" strokeWidth="1.3"/>
    <line x1="44" y1="31" x2="55" y2="30" stroke="#39ff14" strokeWidth="0.7" opacity="0.4"/>

    {/* Index — dressé vers le haut à droite */}
    <path d="M56,40 L57,37 C58,28 59,17 57,9 C56,6 54,5 52,6 C50,7 49,10 50,18 L51,37 L53,40"
          stroke="#39ff14" strokeWidth="1.6" strokeLinejoin="round"/>
    {/* Jointures index */}
    <line x1="50" y1="22" x2="58" y2="20" stroke="#39ff14" strokeWidth="0.9" opacity="0.5"/>
    <line x1="50" y1="13" x2="57" y2="11" stroke="#39ff14" strokeWidth="0.9" opacity="0.5"/>
    {/* Facettes osseuses index */}
    <path d="M51,29 L57,28" stroke="#39ff14" strokeWidth="0.6" opacity="0.35"/>

    {/* Auriculaire — dressé vers le haut à gauche */}
    <path d="M24,40 L22,37 C21,28 21,17 23,9 C24,6 26,5 28,6 C30,7 31,10 30,18 L29,37 L27,40"
          stroke="#39ff14" strokeWidth="1.6" strokeLinejoin="round"/>
    {/* Jointures auriculaire */}
    <line x1="21" y1="22" x2="30" y2="20" stroke="#39ff14" strokeWidth="0.9" opacity="0.5"/>
    <line x1="22" y1="13" x2="30" y2="11" stroke="#39ff14" strokeWidth="0.9" opacity="0.5"/>
    {/* Facettes osseuses auriculaire */}
    <line x1="21" y1="29" x2="29" y2="28" stroke="#39ff14" strokeWidth="0.6" opacity="0.35"/>

    {/* Pouce — sort à droite */}
    <path d="M64,58 C67,53 73,50 78,51 C81,52 82,55 80,58 C78,61 73,63 68,62 C64,61 63,60 64,58"
          stroke="#39ff14" strokeWidth="1.4"/>
    {/* Jointure pouce */}
    <line x1="70" y1="50" x2="68" y2="62" stroke="#39ff14" strokeWidth="0.8" opacity="0.4"/>
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
          viewBox="0 0 300 340"
          width="260"
          height="295"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ===== MOHAWK ===== */}
          {/* Spike central — pointu, effilé */}
          <path d="M150,8 L145,58 L150,44 L155,58 Z"
                stroke="#39ff14" strokeWidth="2" strokeLinejoin="round"/>
          {/* Base du mohawk — touffe de poils hachurés */}
          <path d="M128,84 L132,68 L136,76 L140,60 L144,74 L148,55 L150,44 L152,55 L156,74 L160,60 L164,76 L168,68 L172,84"
                stroke="#39ff14" strokeWidth="1.5" strokeLinejoin="round" opacity="0.75"/>
          {/* Hachures mohawk internes */}
          <line x1="139" y1="72" x2="137" y2="80" stroke="#39ff14" strokeWidth="0.7" opacity="0.4"/>
          <line x1="150" y1="62" x2="150" y2="72" stroke="#39ff14" strokeWidth="0.7" opacity="0.4"/>
          <line x1="161" y1="72" x2="163" y2="80" stroke="#39ff14" strokeWidth="0.7" opacity="0.4"/>

          {/* ===== CRANIUM — dôme organique arrondi ===== */}
          <path d="M82,175 C65,158 60,132 62,108 C65,76 82,56 102,48 C116,42 132,38 150,38 C168,38 184,42 198,48 C218,56 235,76 238,108 C240,132 235,158 218,175 L215,200 L85,200 Z"
                stroke="#39ff14" strokeWidth="2.2"/>
          {/* Cranium inner — ligne de volume */}
          <path d="M92,172 C78,158 74,136 76,114 C79,90 92,74 108,66 C120,60 134,57 150,57 C166,57 180,60 192,66 C208,74 221,90 224,114 C226,136 222,158 208,172"
                stroke="#39ff14" strokeWidth="0.7" opacity="0.3"/>

          {/* Temple hachures gauche — style gravure */}
          <path d="M66,120 C63,130 64,143 68,155" stroke="#39ff14" strokeWidth="0.9" opacity="0.38"/>
          <path d="M73,108 C70,120 71,135 75,148" stroke="#39ff14" strokeWidth="0.7" opacity="0.25"/>
          <path d="M80,100 C77,112 78,128 82,142" stroke="#39ff14" strokeWidth="0.5" opacity="0.18"/>
          {/* Temple hachures droite */}
          <path d="M234,120 C237,130 236,143 232,155" stroke="#39ff14" strokeWidth="0.9" opacity="0.38"/>
          <path d="M227,108 C230,120 229,135 225,148" stroke="#39ff14" strokeWidth="0.7" opacity="0.25"/>
          <path d="M220,100 C223,112 222,128 218,142" stroke="#39ff14" strokeWidth="0.5" opacity="0.18"/>

          {/* Cicatrice / fissure front */}
          <path d="M188,74 L184,86 L190,92 L186,102" stroke="#39ff14" strokeWidth="1" opacity="0.45"/>

          {/* ===== ARCADE SOURCILIÈRE ===== */}
          <path d="M86,172 C100,160 122,155 150,156 C178,157 200,162 214,172"
                stroke="#39ff14" strokeWidth="2.2" opacity="0.85"/>

          {/* ===== ORBITES — ovales profonds, style woodcut ===== */}
          {/* Orbite gauche */}
          <path d="M98,192 C93,178 97,165 112,161 C127,157 143,166 144,180 C145,194 134,205 118,205 C102,205 95,204 98,192 Z"
                stroke="#39ff14" strokeWidth="2.3"/>
          {/* Hachures internes œil gauche */}
          <path d="M104,182 C109,174 120,173 128,177" stroke="#39ff14" strokeWidth="0.8" opacity="0.35"/>
          <path d="M102,190 C107,184 118,183 126,187" stroke="#39ff14" strokeWidth="0.6" opacity="0.25"/>

          {/* Orbite droite */}
          <path d="M202,192 C205,204 198,205 182,205 C166,205 155,194 156,180 C157,166 173,157 188,161 C203,165 207,178 202,192 Z"
                stroke="#39ff14" strokeWidth="2.3"/>
          {/* Hachures internes œil droit */}
          <path d="M196,182 C191,174 180,173 172,177" stroke="#39ff14" strokeWidth="0.8" opacity="0.35"/>
          <path d="M198,190 C193,184 182,183 174,187" stroke="#39ff14" strokeWidth="0.6" opacity="0.25"/>

          {/* ===== CAVITÉ NASALE ===== */}
          <path d="M150,210 Q140,230 138,238 L162,238 Q160,230 150,210 Z"
                stroke="#39ff14" strokeWidth="1.8"/>

          {/* ===== POMMETTES / JOUES ===== */}
          <path d="M218,182 C232,190 240,204 236,220 C232,230 222,236 210,238"
                stroke="#39ff14" strokeWidth="1.4" opacity="0.5"/>
          <path d="M82,182 C68,190 60,204 64,220 C68,230 78,236 90,238"
                stroke="#39ff14" strokeWidth="1.4" opacity="0.5"/>

          {/* ===== GENCIVE SUPÉRIEURE ===== */}
          <path d="M88,244 C102,236 122,232 150,232 C178,232 198,236 212,244"
                stroke="#39ff14" strokeWidth="1.6"/>

          {/* ===== DENTS INDIVIDUELLES — 8 dents ===== */}
          <rect x="90"  y="246" width="14" height="19" rx="3.5" stroke="#39ff14" strokeWidth="1.5"/>
          <rect x="106" y="246" width="14" height="22" rx="3.5" stroke="#39ff14" strokeWidth="1.5"/>
          <rect x="122" y="246" width="14" height="24" rx="3.5" stroke="#39ff14" strokeWidth="1.5"/>
          <rect x="138" y="246" width="14" height="25" rx="3.5" stroke="#39ff14" strokeWidth="1.5"/>
          <rect x="154" y="246" width="14" height="25" rx="3.5" stroke="#39ff14" strokeWidth="1.5"/>
          <rect x="170" y="246" width="14" height="24" rx="3.5" stroke="#39ff14" strokeWidth="1.5"/>
          <rect x="186" y="246" width="14" height="22" rx="3.5" stroke="#39ff14" strokeWidth="1.5"/>
          <rect x="202" y="246" width="14" height="19" rx="3.5" stroke="#39ff14" strokeWidth="1.5"/>

          {/* ===== MÂCHOIRE INFÉRIEURE ===== */}
          <path d="M78,272 C80,294 96,308 122,314 L178,314 C204,308 220,294 222,272"
                stroke="#39ff14" strokeWidth="2.2"/>
          {/* Hachures menton */}
          <path d="M116,310 C132,318 168,318 184,310" stroke="#39ff14" strokeWidth="0.9" opacity="0.35"/>
          {/* Dents inférieures partielles */}
          <line x1="100" y1="272" x2="102" y2="290" stroke="#39ff14" strokeWidth="1.2"/>
          <line x1="118" y1="272" x2="120" y2="296" stroke="#39ff14" strokeWidth="1.2"/>
          <line x1="136" y1="272" x2="137" y2="298" stroke="#39ff14" strokeWidth="1.2"/>
          <line x1="154" y1="272" x2="154" y2="298" stroke="#39ff14" strokeWidth="1.2"/>
          <line x1="172" y1="272" x2="171" y2="296" stroke="#39ff14" strokeWidth="1.2"/>
          <line x1="190" y1="272" x2="188" y2="290" stroke="#39ff14" strokeWidth="1.2"/>
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
      <MetalHand rotation={0} />
    </div>
    <div className="absolute top-2 right-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '1.5s' }}>
      <MetalHand rotation={90} />
    </div>
    <div className="absolute bottom-2 right-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '3s' }}>
      <MetalHand rotation={180} />
    </div>
    <div className="absolute bottom-2 left-2 metal-corner-float" style={{ opacity: 0.08, animationDelay: '4.5s' }}>
      <MetalHand rotation={270} />
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
