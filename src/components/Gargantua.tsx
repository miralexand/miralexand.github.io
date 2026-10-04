export default function Gargantua({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="gargShadow" cx="50%" cy="50%" r="50%">
          <stop offset="50%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
        </radialGradient>
        <linearGradient id="gargDisk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(184,165,131,0)" />
          <stop offset="30%" stopColor="rgba(234,223,200,0.85)" />
          <stop offset="50%" stopColor="rgba(246,239,224,0.95)" />
          <stop offset="70%" stopColor="rgba(234,223,200,0.85)" />
          <stop offset="100%" stopColor="rgba(184,165,131,0)" />
        </linearGradient>
        <filter id="gargBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="gargBlurSm" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      <ellipse
        cx="300"
        cy="300"
        rx="272"
        ry="82"
        stroke="url(#gargDisk)"
        strokeWidth="14"
        filter="url(#gargBlur)"
        opacity="0.5"
      />
      <ellipse
        cx="300"
        cy="300"
        rx="272"
        ry="82"
        stroke="url(#gargDisk)"
        strokeWidth="3"
        opacity="0.75"
      />

      <circle cx="300" cy="300" r="150" fill="url(#gargShadow)" />
      <circle cx="300" cy="300" r="88" fill="#000" />

      <ellipse
        cx="300"
        cy="300"
        rx="90"
        ry="150"
        stroke="rgba(228,216,192,0.5)"
        strokeWidth="2.5"
        filter="url(#gargBlurSm)"
      />
      <ellipse
        cx="300"
        cy="300"
        rx="90"
        ry="150"
        stroke="rgba(240,230,208,0.7)"
        strokeWidth="1"
      />

      <circle
        cx="300"
        cy="300"
        r="93"
        stroke="rgba(245,236,216,0.9)"
        strokeWidth="1.6"
        filter="url(#gargBlurSm)"
      />
      <circle
        cx="300"
        cy="300"
        r="88"
        stroke="rgba(255,250,238,0.8)"
        strokeWidth="0.8"
      />
    </svg>
  );
}
