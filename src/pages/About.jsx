// src/pages/About.jsx
import { Phone, Mail } from 'lucide-react'
import PageSEO, { LOCAL_BUSINESS_SCHEMA } from '../components/seo/PageSEO'

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    LOCAL_BUSINESS_SCHEMA,
    {
      '@type': 'Person',
      name: 'Chris Timmons',
      jobTitle: 'Owner',
      worksFor: {
        '@type': 'LocalBusiness',
        name: 'Synergy Industrial Solutions',
        telephone: '+18772599187',
      },
    },
  ],
}

const DIFFERENTIATORS = [
  { title: 'Component-Level Repair', body: "We repair at the board level — not just swap modules. That means faster turnaround and lower cost for you." },
  { title: 'All Major Brands', body: "Siemens, ABB, Yaskawa, Fanuc, Allen-Bradley, Schneider Electric — if it's in your facility, we work on it." },
  { title: 'Local & Accountable', body: "Locally owned and operated in Stevenson, AL. You deal directly with our technicians, not a call center." },
  { title: 'Pickup & Delivery', body: "Free pickup within 100 miles. We come to your facility, coordinate with your team, and return equipment fully tested." },
]

export default function About({ onQuoteClick }) {
  const muted = { color: 'var(--color-text-muted)', lineHeight: 1.7 }

  return (
    <>
      <PageSEO
        title="About Synergy Industrial Solutions — Stevenson, AL"
        description="Synergy Industrial Solutions is a locally owned electric motor rewind and industrial electronics repair shop based in Stevenson, Alabama, serving the Chattanooga region."
        canonical="/about"
        schema={SCHEMA}
      />

      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '5rem 5%', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            About Synergy Industrial Solutions
          </h1>
          <p style={{ fontSize: '1.15rem', ...muted }}>
            Locally owned and operated in Stevenson, Alabama — providing precision motor rewind, servo repair, and industrial electronics service to manufacturers throughout the Chattanooga region.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Our Story
          </h2>
          <p style={{ ...muted, marginBottom: '1rem' }}>
            Synergy Industrial Solutions was founded with a single mission: give manufacturers and industrial facilities in North Alabama and the Chattanooga area access to expert motor rewind and electronics repair — without the delays and overhead of shipping equipment to distant service centers.
          </p>
          <p style={{ ...muted, marginBottom: '1rem' }}>
            Our shop is equipped with precision test equipment including Megger insulation testers, surge comparators, and load banks — the same tools used by the largest motor repair facilities in the region.
          </p>
          <p style={{ ...muted }}>
            Every job comes with documented pre- and post-repair test data. When we return your equipment, you know exactly what was done and how it performed on our test bench.
          </p>
        </div>

        <div style={{ borderRadius: '0.75rem', overflow: 'hidden', aspectRatio: '4/3' }}>
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800"
            alt="Synergy Industrial Solutions shop interior — motor repair equipment"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            What Sets Us Apart
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {DIFFERENTIATORS.map(({ title, body }) => (
              <div key={title} style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '0.75rem' }}>{title}</h3>
                <p style={{ ...muted, fontSize: '0.95rem' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '5rem 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Ready to Work Together?
        </h2>
        <p style={{ ...muted, marginBottom: '2rem' }}>
          Call us, email us, or request a quote online. We respond within 1 business hour.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+18772599187" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-accent)', color: '#fff', fontWeight: 700 }}>
            <Phone size={18} /> (877) 259-9187
          </a>
          <a href="mailto:Info@Synergyindsolutions.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', borderRadius: '0.5rem', border: '2px solid var(--color-border)', color: 'var(--color-text)', fontWeight: 700 }}>
            <Mail size={18} /> Email Us
          </a>
        </div>
      </div>
    </>
  )
}
