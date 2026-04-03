// src/pages/Home.jsx
import { Phone, Wrench, Cpu, Activity, Zap, Settings, ShoppingCart, MapPin, ArrowRight, DollarSign, Clock, Leaf } from 'lucide-react'
import PageSEO, { LOCAL_BUSINESS_SCHEMA } from '../components/seo/PageSEO'
import EmailSignup from '../components/ui/EmailSignup'

const HERO_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  '@type': ['LocalBusiness', 'AutoRepair'],
  sameAs: ['https://synergyindustrialsolutions.com'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Industrial Repair Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electric Motor Rewind', description: 'AC and DC motors of all HP ranges rewound to OEM spec.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Servo Motor Repair', description: 'Encoder replacement, precision alignment, and full diagnostics.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AC/DC Drive Repair', description: 'Component-level VFD and servo drive repair.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PLC Repair', description: 'Board-level diagnostics and repair for all major PLC brands.' } },
    ],
  },
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does electric motor repair cost compared to replacement?',
      acceptedAnswer: { '@type': 'Answer', text: 'Repairing an electric motor typically costs 20–50% of the price of a new replacement motor, depending on the damage. For large industrial motors and servo drives, repair is almost always the smarter financial choice.' },
    },
    {
      '@type': 'Question',
      name: 'Do you offer motor pickup and delivery near Chattanooga?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We offer free pickup and delivery within 100 miles of our Stevenson, AL shop — covering Chattanooga TN, North Alabama, and Northwest Georgia.' },
    },
    {
      '@type': 'Question',
      name: 'How long does an electric motor rewind take?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most standard motor rewinds are completed within 5–7 business days. Rush service is available for critical downtime situations.' },
    },
    {
      '@type': 'Question',
      name: 'What brands of VFDs and servo drives do you repair?',
      acceptedAnswer: { '@type': 'Answer', text: 'We repair all major brands including Siemens, ABB, Allen-Bradley, Yaskawa, Schneider Electric, and FANUC. We perform component-level board repair, not just module swaps.' },
    },
  ],
}

const SERVICES = [
  { icon: <Wrench size={28} strokeWidth={1.5} />, name: 'Electric Motor Rewind', desc: 'AC and DC motors of all HP ranges rewound to OEM spec. Custom stator work available.' },
  { icon: <Activity size={28} strokeWidth={1.5} />, name: 'Servo Motor Repair', desc: 'Encoder replacement, precision alignment, and full diagnostics on all major brands.' },
  { icon: <Cpu size={28} strokeWidth={1.5} />, name: 'AC/DC Drive Repair', desc: 'Component-level VFD and servo drive repair — Siemens, ABB, Allen-Bradley, Yaskawa.' },
  { icon: <Settings size={28} strokeWidth={1.5} />, name: 'PLC Repair', desc: 'Allen-Bradley, Siemens, Mitsubishi, and Omron PLC board-level diagnostics and repair.' },
  { icon: <ShoppingCart size={28} strokeWidth={1.5} />, name: 'New Motor Sales', desc: 'Sourcing and drop-shipping of new motors and drives from leading manufacturers.' },
  { icon: <Zap size={28} strokeWidth={1.5} />, name: 'Electronics Repair', desc: 'Component-level PCB repair for industrial control boards and drive electronics.' },
]

const BRANDS = ['SIEMENS', 'ABB', 'Schneider Electric', 'FANUC', 'YASKAWA', 'Allen-Bradley']

const STATS = [
  { number: '5–7', unit: 'Day Turnaround', note: 'Rush service available' },
  { number: '100', unit: 'Mile Pickup Radius', note: 'Free pickup & delivery' },
  { number: '20+', unit: 'Years Experience', note: 'Component-level repair' },
]

const CITIES = ['Chattanooga, TN', 'Scottsboro, AL', 'Huntsville, AL', 'Fort Payne, AL', 'Gadsden, AL', 'Dalton, GA', 'Rome, GA', 'Cleveland, TN', 'Athens, TN', 'Guntersville, AL']

const PHOTO_PLACEHOLDER = ({ label, aspect = '16/9', minHeight }) => (
  <div style={{
    border: '2px dashed rgba(249,115,22,0.4)',
    borderRadius: '0.5rem',
    aspectRatio: aspect,
    minHeight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(249,115,22,0.04)',
    gap: '0.5rem',
    padding: '2rem',
  }}>
    <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', letterSpacing: '0.1em', color: 'rgba(249,115,22,0.6)', textTransform: 'uppercase', textAlign: 'center' }}>[ PHOTO PLACEHOLDER ]</span>
    <span style={{ fontSize: '0.8rem', color: 'rgba(249,115,22,0.5)', textAlign: 'center', maxWidth: '200px', lineHeight: 1.4 }}>{label}</span>
  </div>
)

export default function Home({ onQuoteClick }) {
  const s = {
    section: { padding: '5rem 5%', maxWidth: '1400px', margin: '0 auto' },
    h2: { fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)', marginBottom: '1rem', lineHeight: 1.05 },
    muted: { color: 'var(--color-text-muted)', lineHeight: 1.7 },
  }

  return (
    <>
      <PageSEO
        title="Electric Motor Rewind & Industrial Repair — Stevenson AL | Synergy Industrial"
        description="Expert electric motor rewind, servo motor repair, AC/DC drive repair, and PLC repair serving Chattanooga TN, North Alabama, and NW Georgia. Free pickup within 100 miles."
        canonical="/"
        schema={[HERO_SCHEMA, FAQ_SCHEMA]}
      />

      {/* ── Hero ── */}
      <section style={{
        backgroundColor: 'var(--color-dark-hero)',
        backgroundImage: 'radial-gradient(rgba(249,115,22,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        minHeight: '88vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: '4rem',
        alignItems: 'center',
        padding: '6rem 5%',
      }}>
        <div style={{ maxWidth: '660px' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(249,115,22,0.15)', color: 'var(--color-accent)', borderRadius: '2rem', padding: '0.35rem 1rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '1.75rem', textTransform: 'uppercase' }}>
            Chattanooga TN · North Alabama · NW Georgia
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', color: '#F1F5F9', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '0.03em' }}>
            Expert Motor Rewind &{' '}
            <span style={{ color: 'var(--color-accent)' }}>Industrial Electronics</span>{' '}
            Repair
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94A3B8', maxWidth: '520px', lineHeight: 1.75, marginBottom: '1rem' }}>
            Precision motor rewind, servo repair, VFD diagnostics, and PLC repair — with free pickup and delivery within 100 miles of Stevenson, AL.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(249,115,22,0.8)', marginBottom: '2.25rem', fontWeight: 600, letterSpacing: '0.02em' }}>
            Repair instead of replacing — a WIN-WIN for your budget and your operations.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="tel:+18772599187"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.75rem', borderRadius: '0.4rem', backgroundColor: 'var(--color-accent)', color: '#fff', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}
            >
              <Phone size={17} /> Call (877) 259-9187
            </a>
            <button
              onClick={onQuoteClick}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.75rem', borderRadius: '0.4rem', backgroundColor: 'transparent', border: '2px solid #334155', color: '#F1F5F9', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
            >
              Request Pickup <ArrowRight size={17} />
            </button>
          </div>
        </div>
        <div>
          <PHOTO_PLACEHOLDER label="Shop interior or motor repair in progress" aspect="4/3" />
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', padding: '1.5rem 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}>We service:</span>
          {BRANDS.map(b => (
            <span key={b} style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{b}</span>
          ))}
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent)' }}>
            <MapPin size={14} /> 100-Mile Free Pickup & Delivery
          </span>
        </div>
      </div>

      {/* ── The Problem We Solve ── */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', padding: '4rem 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ ...s.h2 }}>Every hour of downtime costs money.</h2>
            <p style={{ ...s.muted, fontSize: '1.05rem', marginBottom: '1.25rem' }}>
              When a motor or drive fails, you need answers fast — not a sales pitch for replacement equipment.
            </p>
            <p style={{ ...s.muted }}>
              We diagnose, repair, and return your equipment to OEM spec. Most jobs are back in your hands in 5–7 business days. We come to you — Chris personally handles pickup and delivery within 100 miles.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { icon: <Clock size={20} />, label: 'Fast diagnosis', sub: 'Same-day evaluation' },
              { icon: <DollarSign size={20} />, label: 'Repair vs replace', sub: '20–50% of new cost' },
              { icon: <MapPin size={20} />, label: 'We come to you', sub: '100-mile service area' },
              { icon: <Leaf size={20} />, label: 'Sustainable choice', sub: 'Keep equipment running' },
            ].map(({ icon, label, sub }) => (
              <div key={label} style={{ padding: '1.25rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
                <div style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '0.2rem' }}>{label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <div style={{ ...s.section }}>
        <h2 style={{ ...s.h2 }}>Industrial Repair Services</h2>
        <p style={{ ...s.muted, maxWidth: '600px', marginBottom: '3rem' }}>
          From single-phase fractional motors to large industrial servo systems — we repair, rewind, and restore.
        </p>
        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          {SERVICES.map(({ icon, name, desc }) => (
            <div
              key={name}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.75rem 1.5rem', padding: '1.5rem 0', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>{icon}</span>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-text)', lineHeight: 1.2 }}>{name}</h3>
              </div>
              <p style={{ ...s.muted, fontSize: '0.95rem' }}>{desc}</p>
              <button
                onClick={onQuoteClick}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Get a quote <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '3rem 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {STATS.map(({ number, unit, note }) => (
            <div key={unit} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: '3.25rem', color: 'var(--color-accent)', lineHeight: 1, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>{number}</span>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.9rem' }}>{unit}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Repair vs Replace ── */}
      <div style={{ ...s.section }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(249,115,22,0.1)', color: 'var(--color-accent)', borderRadius: '2rem', padding: '0.3rem 1rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              Win-Win
            </div>
            <h2 style={{ ...s.h2 }}>Repair, Don't Replace</h2>
            <p style={{ ...s.muted, fontSize: '1.05rem', marginBottom: '2rem' }}>
              Replacing a failed motor or drive is expensive, slow, and wasteful. In most cases, repair is the better call — for your budget, your timeline, and your operation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Cost savings', body: 'Repair typically costs 20–50% of a new unit. On a $10,000 VFD, that\'s real money back in your budget.' },
                { label: 'Faster return', body: 'No waiting on OEM lead times. Most repairs complete in 5–7 days. New equipment can take weeks.' },
                { label: 'Less waste', body: 'Extending the life of your equipment reduces scrap, packaging, and manufacturing emissions.' },
              ].map(({ label, body }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '3px', backgroundColor: 'var(--color-accent)', borderRadius: '2px', alignSelf: 'stretch', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.2rem' }}>{label}</div>
                    <div style={{ ...s.muted, fontSize: '0.92rem' }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PHOTO_PLACEHOLDER label="Motor rewind in progress — stator or winding work" aspect="4/3" />
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ ...s.h2, marginBottom: '0.5rem' }}>What Our Customers Say</h2>
          <p style={{ ...s.muted, marginBottom: '3rem' }}>Real feedback from maintenance teams and plant managers across the region.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                border: '2px dashed var(--color-border)',
                borderRadius: '0.75rem',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                backgroundColor: 'var(--color-surface)',
              }}>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: 'var(--color-border)', fontSize: '1.1rem' }}>★</span>
                  ))}
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                  Customer testimonial coming soon. If you've worked with Synergy Industrial, we'd love to hear from you.
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>— Customer Name</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Company / Location</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
            Find us on{' '}
            <a href="https://www.google.com/maps/search/Synergy+Industrial+Solutions+Stevenson+AL" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
              Google Maps
            </a>
            {' '}and leave a review.
          </p>
        </div>
      </div>

      {/* ── Service Area ── */}
      <div style={{ ...s.section }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ ...s.h2 }}>Serving Chattanooga & Beyond</h2>
            <p style={{ ...s.muted, marginBottom: '1.5rem' }}>
              Free pickup and delivery within 100 miles of our Stevenson, AL shop — covering the greater Chattanooga metro, North Alabama, and Northwest Georgia.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {CITIES.map(c => (
                <span key={c} style={{ padding: '0.3rem 0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '2rem', fontSize: '0.83rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {c}
                </span>
              ))}
            </div>
            <button
              onClick={onQuoteClick}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.5rem', borderRadius: '0.4rem', backgroundColor: 'var(--color-accent)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}
            >
              <Phone size={16} /> Schedule a Pickup
            </button>
          </div>
          <div style={{ borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--color-border)', aspectRatio: '4/3' }}>
            <iframe
              title="Synergy Industrial Solutions location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.5!2d-85.8455!3d34.8687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDUyJzA3LjMiTiA4NcKwNTAnNDMuOCJX!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* ── Email Opt-In ── */}
      <div style={{ backgroundColor: 'var(--color-dark-hero)', backgroundImage: 'radial-gradient(rgba(249,115,22,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(249,115,22,0.15)', color: 'var(--color-accent)', borderRadius: '2rem', padding: '0.3rem 1rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              Free Download
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F1F5F9', marginBottom: '0.75rem', lineHeight: 1.05 }}>
              Industrial Motor Maintenance Checklist
            </h2>
            <p style={{ color: '#94A3B8', lineHeight: 1.75 }}>
              Catch problems before they cause downtime. This checklist is used by maintenance teams across the Chattanooga region to keep motors and drives running longer.
            </p>
          </div>
          <div>
            <EmailSignup source="homepage-checklist" dark />
          </div>
        </div>
      </div>
    </>
  )
}
