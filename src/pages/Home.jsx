// src/pages/Home.jsx
import { Phone, Wrench, Cpu, Activity, Zap, Settings, ShoppingCart, MapPin, ArrowRight } from 'lucide-react'
import PageSEO, { LOCAL_BUSINESS_SCHEMA } from '../components/seo/PageSEO'
import EmailSignup from '../components/ui/EmailSignup'

const HERO_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  '@type': ['LocalBusiness', 'AutoRepair'],
  sameAs: ['https://synergyindustrialsolutions.com'],
}

const SERVICES = [
  { icon: <Wrench size={32} strokeWidth={2} />, name: 'Electric Motor Rewind', desc: 'AC and DC motors of all HP ranges rewound to OEM spec. Custom stator work available.' },
  { icon: <Activity size={32} strokeWidth={2} />, name: 'Servo Motor Repair', desc: 'Encoder replacement, precision alignment, and full diagnostics on all major brands.' },
  { icon: <Cpu size={32} strokeWidth={2} />, name: 'AC/DC Drive Repair', desc: 'Component-level VFD and servo drive repair — Siemens, ABB, Allen-Bradley, Yaskawa.' },
  { icon: <Settings size={32} strokeWidth={2} />, name: 'PLC Repair', desc: 'Allen-Bradley, Siemens, Mitsubishi, and Omron PLC board-level diagnostics and repair.' },
  { icon: <ShoppingCart size={32} strokeWidth={2} />, name: 'New Motor Sales', desc: 'Sourcing and drop-shipping of new motors and drives from leading manufacturers.' },
  { icon: <Zap size={32} strokeWidth={2} />, name: 'Electronics Repair', desc: 'Component-level PCB repair for industrial control boards and drive electronics.' },
]

const BRANDS = ['SIEMENS', 'ABB', 'Schneider Electric', 'FANUC', 'YASKAWA', 'Allen-Bradley']

const WHY = [
  { icon: <Activity size={28} />, title: 'Fast Turnaround', body: 'Most standard rewinds completed within 5–7 business days. Rush service available.' },
  { icon: <MapPin size={28} />, title: 'Pickup & Delivery', body: 'We come to you — free pickup and delivery within 100 miles of Stevenson, AL.' },
  { icon: <Cpu size={28} />, title: 'Expert Diagnostics', body: 'Component-level troubleshooting with state-of-the-art test equipment. No guess work.' },
]

const CITIES = ['Chattanooga, TN', 'Scottsboro, AL', 'Huntsville, AL', 'Fort Payne, AL', 'Gadsden, AL', 'Dalton, GA', 'Rome, GA', 'Cleveland, TN', 'Athens, TN', 'Guntersville, AL']

export default function Home({ onQuoteClick }) {
  const s = {
    section: { padding: '5rem 5%', maxWidth: '1400px', margin: '0 auto' },
    h2: { fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '1rem', letterSpacing: '-0.02em' },
    muted: { color: 'var(--color-text-muted)', lineHeight: 1.7 },
  }

  return (
    <>
      <PageSEO
        title="Electric Motor Rewind & Industrial Repair — Stevenson AL | Synergy Industrial"
        description="Expert electric motor rewind, servo motor repair, AC/DC drive repair, and PLC repair serving Chattanooga TN, North Alabama, and NW Georgia. Pickup within 100 miles."
        canonical="/"
        schema={HERO_SCHEMA}
      />

      {/* ── Hero ── */}
      <section
        style={{
          backgroundColor: 'var(--color-dark-hero)',
          padding: '6rem 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '1400px', width: '100%' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(249,115,22,0.15)', color: 'var(--color-accent)', borderRadius: '2rem', padding: '0.35rem 1rem', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            Serving Chattanooga TN · North Alabama · NW Georgia
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#F1F5F9', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem', maxWidth: '800px' }}>
            Expert Motor Rewind &<br />
            <span style={{ color: 'var(--color-accent)' }}>Industrial Electronics</span> Repair
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94A3B8', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Precision motor rewind, servo repair, VFD diagnostics, and PLC repair — with free pickup and delivery within 100 miles of Stevenson, AL.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="tel:+18772599187"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-accent)', color: '#fff', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }}
            >
              <Phone size={18} /> Call (877) 259-9187
            </a>
            <button
              onClick={onQuoteClick}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.75rem', borderRadius: '0.5rem', backgroundColor: 'transparent', border: '2px solid #334155', color: '#F1F5F9', fontWeight: 700, fontSize: '1.05rem' }}
            >
              Get a Free Quote <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', padding: '1.5rem 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}>We service:</span>
          {BRANDS.map(b => (
            <span key={b} style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{b}</span>
          ))}
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent)' }}>
            <MapPin size={14} /> 100-Mile Pickup & Delivery
          </span>
        </div>
      </div>

      {/* ── Services Overview ── */}
      <div style={{ ...s.section }}>
        <h2 style={{ ...s.h2, textAlign: 'center' }}>Industrial Repair Services</h2>
        <p style={{ ...s.muted, textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
          From single-phase fractional motors to large industrial servo systems — we repair, rewind, and restore.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {SERVICES.map(({ icon, name, desc }) => (
            <div
              key={name}
              style={{ padding: '1.75rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(249,115,22,0.1)', padding: '0.75rem', borderRadius: '0.5rem', width: 'fit-content' }}>
                {icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)' }}>{name}</h3>
              <p style={{ ...s.muted, fontSize: '0.95rem', flexGrow: 1 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Choose Synergy ── */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ ...s.h2, textAlign: 'center' }}>Why Choose Synergy?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
            {WHY.map(({ icon, title, body }) => (
              <div key={title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '2rem' }}>
                <div style={{ color: 'var(--color-accent)' }}>{icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)' }}>{title}</h3>
                <p style={{ ...s.muted, fontSize: '0.95rem' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Service Area Callout ── */}
      <div style={{ ...s.section }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={s.h2}>Serving Chattanooga & Beyond</h2>
            <p style={{ ...s.muted, marginBottom: '1.5rem' }}>
              We provide free pickup and delivery within 100 miles of our Stevenson, AL shop — covering the greater Chattanooga metro, North Alabama, and Northwest Georgia.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {CITIES.map(c => (
                <span key={c} style={{ padding: '0.3rem 0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '2rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '0.75rem', padding: '2rem', textAlign: 'center', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <MapPin size={48} color="var(--color-accent)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>Stevenson, AL 35772</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>100-mile service radius</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Email Opt-In ── */}
      <div style={{ backgroundColor: 'var(--color-dark-hero)', padding: '5rem 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#F1F5F9', marginBottom: '0.75rem' }}>
            Stay Ahead of Downtime
          </h2>
          <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
            Subscribe for maintenance tips, priority scheduling alerts, and case studies from our shop.
          </p>
          <EmailSignup source="homepage" dark />
        </div>
      </div>
    </>
  )
}
