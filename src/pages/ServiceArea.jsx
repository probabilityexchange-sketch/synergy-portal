// src/pages/ServiceArea.jsx
import { MapPin, Truck, Phone, Clock } from 'lucide-react'
import PageSEO, { LOCAL_BUSINESS_SCHEMA } from '../components/seo/PageSEO'

const COVERAGE = [
  { region: 'Tennessee', cities: ['Chattanooga', 'Cleveland', 'Athens', 'Dayton', 'Jasper', 'South Pittsburg', 'Dunlap'] },
  { region: 'North Alabama', cities: ['Scottsboro', 'Huntsville', 'Fort Payne', 'Gadsden', 'Guntersville', 'Rainsville', 'Albertville', 'Anniston', 'Boaz'] },
  { region: 'Northwest Georgia', cities: ['Dalton', 'Rome', 'Ringgold', 'Fort Oglethorpe', 'Calhoun', 'Cartersville'] },
]

const FAQS = [
  {
    q: 'Do you service Chattanooga, TN?',
    a: 'Yes — Chattanooga and the surrounding Hamilton County area are within our standard 100-mile service radius. We offer free pickup and delivery to customers throughout the Chattanooga metro.',
  },
  {
    q: 'How far will you travel for pickup?',
    a: 'We provide free pickup and delivery within 100 miles of our Stevenson, Alabama shop. This covers most of North Alabama, the Chattanooga TN metro, and Northwest Georgia.',
  },
  {
    q: 'Do you offer emergency or after-hours service?',
    a: 'Yes. We offer after-hours service for critical equipment failures. Call our main line at (877) 259-9187 and follow the prompts for urgent service.',
  },
  {
    q: 'What areas in North Alabama do you cover?',
    a: 'We regularly service Scottsboro, Huntsville, Fort Payne, Gadsden, Guntersville, Albertville, Boaz, Rainsville, and surrounding Jackson, DeKalb, and Madison Counties.',
  },
  {
    q: 'Can you pick up from a manufacturing facility?',
    a: 'Absolutely. We work with manufacturing plants, utilities, and maintenance shops throughout the region. We coordinate with your maintenance team for pickup scheduling to minimize downtime.',
  },
  {
    q: 'Is there a minimum job size for pickup service?',
    a: 'No minimum — we pick up motors and drives of any size, from fractional HP units to large industrial motors. Just call ahead to schedule.',
  },
]

const SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  '@type': 'LocalBusiness',
  hasMap: 'https://maps.google.com/?q=1208a+Kentucky+Ave+Stevenson+AL+35772',
  mainEntityOfPage: {
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  },
}

export default function ServiceArea({ onQuoteClick }) {
  const muted = { color: 'var(--color-text-muted)', lineHeight: 1.7 }

  return (
    <>
      <PageSEO
        title="Serving Chattanooga TN, North Alabama & NW Georgia | Synergy Industrial Solutions"
        description="Free pickup and delivery within 100 miles of Stevenson, AL. Serving Chattanooga TN, Huntsville AL, Fort Payne AL, Dalton GA, and surrounding areas for motor and drive repair."
        canonical="/service-area"
        schema={SCHEMA}
      />

      <div style={{ backgroundColor: 'var(--color-dark-hero)', padding: '5rem 5%', color: '#F1F5F9' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <MapPin size={40} color="#F97316" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Serving Chattanooga TN, North Alabama & NW Georgia
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94A3B8', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Free pickup and delivery within 100 miles of Stevenson, AL. We bring the shop to you — minimizing your downtime.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: <Truck size={18} />, text: 'Free Pickup & Delivery' },
              { icon: <Clock size={18} />, text: 'After-Hours Available' },
              { icon: <Phone size={18} />, text: '(877) 259-9187' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F97316', fontWeight: 700 }}>
                {icon} {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '2px dashed var(--color-border)', borderRadius: '1rem', aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
            <MapPin size={56} color="var(--color-accent)" />
            <div>
              <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text)' }}>Stevenson, AL 35772</p>
              <p style={{ ...muted, fontSize: '0.9rem' }}>Center of our 100-mile service radius</p>
            </div>
            <a
              href="https://maps.google.com/?q=1208a+Kentucky+Ave+Stevenson+AL+35772"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: '2px solid var(--color-accent)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.9rem' }}
            >
              View on Google Maps
            </a>
          </div>

          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
              Coverage Area
            </h2>
            {COVERAGE.map(({ region, cities }) => (
              <div key={region} style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                  {region}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cities.map(c => (
                    <span key={c} style={{ padding: '0.3rem 0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '2rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            Common Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {FAQS.map(({ q, a }) => (
              <div key={q} style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>{q}</h3>
                <p style={{ ...muted, fontSize: '0.95rem' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
