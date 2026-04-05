import { Link } from 'react-router-dom'

export default function Logo({ size = 'md' }) {
  const heights = { sm: 28, md: 36, lg: 48 }
  const h = heights[size] || 36
  const textSizes = { sm: '1.1rem', md: '1.4rem', lg: '1.8rem' }
  const fs = textSizes[size] || '1.4rem'

  return (
    <Link
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        textDecoration: 'none',
      }}
    >
      {/* 6-axis robot arm SVG */}
      <svg
        width={h}
        height={h}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Base plate */}
        <rect x="2" y="32" width="18" height="3" rx="1.5" fill="#F97316" />
        {/* Column */}
        <rect x="7" y="21" width="6" height="12" rx="2" fill="#F97316" />
        {/* Shoulder joint */}
        <circle cx="10" cy="21" r="4" fill="#F97316" />
        {/* Upper arm */}
        <line x1="10" y1="21" x2="6" y2="11" stroke="#F97316" strokeWidth="4.5" strokeLinecap="round" />
        {/* Elbow joint */}
        <circle cx="6" cy="11" r="3.5" fill="#F97316" />
        {/* Forearm */}
        <line x1="6" y1="11" x2="24" y2="7" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />
        {/* Wrist joint */}
        <circle cx="24" cy="7" r="3" fill="#F97316" />
        {/* Gripper upper jaw */}
        <line x1="24" y1="7" x2="33" y2="3" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
        {/* Gripper lower jaw */}
        <line x1="24" y1="7" x2="33" y2="11" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Wordmark */}
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span
          style={{
            fontSize: fs,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
          }}
        >
          SYNERGY
        </span>
        <span
          style={{
            fontSize: `calc(${fs} * 0.55)`,
            fontWeight: 600,
            color: 'var(--color-accent)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Industrial Solutions
        </span>
      </span>
    </Link>
  )
}
