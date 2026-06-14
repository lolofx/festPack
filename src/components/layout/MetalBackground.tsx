import skullImg from '../../assets/skull.png';
import metalhandImg from '../../assets/metalhand.svg';

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
  <img
    src={metalhandImg}
    alt=""
    width="90"
    height="90"
    style={{
      transform: `rotate(${rotation}deg)`,
      filter: 'invert(1) sepia(1) saturate(5) hue-rotate(60deg)',
      mixBlendMode: 'screen',
    }}
  />
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
