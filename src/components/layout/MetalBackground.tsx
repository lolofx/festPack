import skullImg from '../../assets/skull.png';

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

    {/* === Crâne principal — image PNG avec blend mode screen === */}
    <div className="absolute inset-0 flex items-center justify-center">
      <img
        src={skullImg}
        alt=""
        width="380"
        height="380"
        className="metal-skull-animate"
        style={{ mixBlendMode: 'screen', opacity: 0.22 }}
      />
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
