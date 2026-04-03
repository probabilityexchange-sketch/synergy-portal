import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Phone, ClipboardList } from 'lucide-react'
import Logo from '../brand/Logo'
import ThemeToggle from '../ui/ThemeToggle'

export default function Nav({ onQuoteClick }) {
  const navLinks = [
    { to: '/services', label: 'Services' },
    { to: '/service-area', label: 'Service Area' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const linkStyle = {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background-color 0.2s, border-color 0.2s',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1rem 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <Logo />

        {/* Desktop nav */}
        <nav
          style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
          aria-label="Main navigation"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                ...linkStyle,
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <ThemeToggle />
          <a
            href="tel:+18772599187"
            aria-label="Call (877) 259-9187"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--color-border)',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              whiteSpace: 'nowrap',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            <Phone size={15} />
            (877) 259-9187
          </a>
          <button
            onClick={onQuoteClick}
            aria-label="Get a quote"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              transition: 'background-color 0.2s',
            }}
          >
            <ClipboardList size={15} />
            Get a Quote
          </button>
        </div>
      </div>
    </header>
  )
}
