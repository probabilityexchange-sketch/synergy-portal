import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import Logo from '../brand/Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dark-hero)',
        color: 'var(--color-text-inverse)',
        padding: '3rem 5% 2rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid #1E293B',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Logo size="sm" />
          <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Expert motor rewind, servo repair, and industrial electronics — serving
            Chattanooga, North Alabama, and NW Georgia.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: '#64748B', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Services
          </h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['Motor Rewind', 'Servo Motors', 'AC/DC Drives', 'PLC Repair', 'New Sales', 'Electronics Repair'].map(s => (
              <Link key={s} to="/services" style={{ fontSize: '0.9rem', color: '#94A3B8', transition: 'color 0.2s' }}>
                {s}
              </Link>
            ))}
          </nav>
        </div>

        {/* Company */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: '#64748B', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Company
          </h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { label: 'Service Area', to: '/service-area' },
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map(({ label, to }) => (
              <Link key={to} to={to} style={{ fontSize: '0.9rem', color: '#94A3B8', transition: 'color 0.2s' }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: '#64748B', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <a href="tel:+18772599187" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: '#94A3B8' }}>
              <Phone size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
              (877) 259-9187
            </a>
            <a href="mailto:Info@Synergyindsolutions.com" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: '#94A3B8', wordBreak: 'break-all' }}>
              <Mail size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
              Info@Synergyindsolutions.com
            </a>
            <a
              href="https://maps.google.com/?q=1208a+Kentucky+Ave+Stevenson+AL+35772"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: '#94A3B8' }}
            >
              <MapPin size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
              1208a Kentucky Ave<br />Stevenson, AL 35772
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#475569',
        }}
      >
        <p>© {year} Synergy Industrial Solutions. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/contact" style={{ color: '#475569' }}>Privacy Policy</Link>
          <Link to="/contact" style={{ color: '#475569' }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
