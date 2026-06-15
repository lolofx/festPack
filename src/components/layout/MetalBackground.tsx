import skullImg from '../../assets/skull.webp';
import guitarImg from '../../assets/guitar.svg';

const GUITAR_FILTER = 'invert(1) sepia(1) saturate(5) hue-rotate(60deg)';

const GlowLayer = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <defs>
      <filter id="glow-blur" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="80" />
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
    style={{ opacity: 0.05, filter: 'blur(2px)' }}
  >
    <defs>
      <pattern id="grunge-tile" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <line x1="0" y1="120" x2="120" y2="0" stroke="#39ff14" strokeWidth="0.5" opacity="0.5" />
        <line x1="20" y1="100" x2="100" y2="20" stroke="#39ff14" strokeWidth="0.3" opacity="0.3" />
        <circle cx="20" cy="20" r="1.5" fill="#39ff14" opacity="0.4" />
        <circle cx="70" cy="85" r="1.2" fill="#ff6600" opacity="0.35" />
        <circle cx="95" cy="35" r="1" fill="#39ff14" opacity="0.3" />
        <circle cx="40" cy="95" r="1.5" fill="#39ff14" opacity="0.25" />
        <circle cx="55" cy="55" r="0.8" fill="#ff6600" opacity="0.2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grunge-tile)" />
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

    {/* === Guitares de coin (bas gauche et bas droit) === */}
    <img
      src={guitarImg}
      alt=""
      width="90"
      style={{
        position: 'absolute',
        bottom: '60px',
        left: '-8px',
        filter: GUITAR_FILTER,
        opacity: 0.18,
        mixBlendMode: 'screen',
        transformOrigin: 'bottom left',
        transform: 'rotate(35deg)',
      }}
    />
    <img
      src={guitarImg}
      alt=""
      width="90"
      style={{
        position: 'absolute',
        bottom: '50px',
        right: '8px',
        filter: GUITAR_FILTER,
        opacity: 0.18,
        mixBlendMode: 'screen',
        transformOrigin: 'bottom right',
        transform: 'rotate(-35deg)',
      }}
    />

    {/* Ligne neon bottom uniquement */}
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
