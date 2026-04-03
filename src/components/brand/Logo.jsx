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
        gap: '0.65rem',
        textDecoration: 'none',
      }}
    >
      {/* Electric motor / gear icon */}
      <svg
        width={h}
        height={h}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer gear ring */}
        <circle cx="18" cy="18" r="15" stroke="#F97316" strokeWidth="2.5" fill="none" />
        {/* Inner hub */}
        <circle cx="18" cy="18" r="7" fill="#F97316" />
        {/* Center bore */}
        <circle cx="18" cy="18" r="3" fill="var(--color-bg)" />
        {/* Gear teeth — 6 teeth evenly spaced */}
        <rect x="16.25" y="1" width="3.5" height="5" rx="1" fill="#F97316" />
        <rect x="16.25" y="30" width="3.5" height="5" rx="1" fill="#F97316" />
        <rect x="1" y="16.25" width="5" height="3.5" rx="1" fill="#F97316" />
        <rect x="30" y="16.25" width="5" height="3.5" rx="1" fill="#F97316" />
        {/* Diagonal teeth */}
        <rect
          x="26.5" y="4.5" width="3.5" height="5" rx="1"
          fill="#F97316"
          transform="rotate(60 28.25 7)"
        />
        <rect
          x="26.5" y="4.5" width="3.5" height="5" rx="1"
          fill="#F97316"
          transform="rotate(-60 28.25 7)"
        />
        <rect
          x="6" y="26.5" width="3.5" height="5" rx="1"
          fill="#F97316"
          transform="rotate(60 7.75 29)"
        />
        <rect
          x="6" y="26.5" width="3.5" height="5" rx="1"
          fill="#F97316"
          transform="rotate(-60 7.75 29)"
        />
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
