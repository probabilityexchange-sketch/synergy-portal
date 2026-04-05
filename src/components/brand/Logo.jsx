import { Link } from 'react-router-dom'

export default function Logo({ size = 'md' }) {
  const heights = { sm: 36, md: 47, lg: 62 }
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
      <img src="/logowhitebg.svg" alt="Synergy Industrial Solutions" height={h} style={{ width: 'auto' }} />

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
