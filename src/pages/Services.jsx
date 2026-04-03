// src/pages/Services.jsx
import { Wrench, Activity, Cpu, Settings, ShoppingCart, Zap, ArrowRight } from 'lucide-react'
import PageSEO, { LOCAL_BUSINESS_SCHEMA } from '../components/seo/PageSEO'

const SERVICES = [
  {
    id: 'motor-rewind',
    icon: <Wrench size={36} strokeWidth={2} />,
    name: 'Electric Motor Rewind',
    description: 'We rewind AC and DC electric motors of all sizes — from fractional horsepower single-phase units to large three-phase industrial motors. Every rewind is performed to original equipment manufacturer specifications using premium magnet wire and insulation materials.',
    capabilities: [
      'AC and DC motors — all HP ranges',
      'Single-phase and three-phase stators',
      'Custom coil winding for obsolete motors',
      'Varnish impregnation and baking',
      'Pre/post rewind insulation testing (Megger, Surge)',
      'Load testing and certificate of compliance',
    ],
  },
  {
    id: 'servo-motor',
    icon: <Activity size={36} strokeWidth={2} />,
    name: 'Servo Motor Repair',
    description: 'Our technicians are trained to repair servo motors from all major manufacturers including Fanuc, Yaskawa, Allen-Bradley Kinetix, Siemens, and Bosch Rexroth. We perform precision encoder replacement, bearing replacement, and complete winding diagnostics.',
    capabilities: [
      'Fanuc, Yaskawa, AB Kinetix, Siemens, Bosch Rexroth',
      'Encoder replacement and calibration',
      'Precision bearing replacement',
      'Resolver and Hall-effect sensor repair',
      'Winding insulation and resistance testing',
      'Brake inspection and replacement',
    ],
  },
  {
    id: 'drive-repair',
    icon: <Cpu size={36} strokeWidth={2} />,
    name: 'AC/DC Drive & VFD Repair',
    description: 'Variable frequency drives and servo drives are repaired at the component level — not just swapped. We diagnose failed IGBTs, capacitor banks, gate driver boards, and control cards across all major drive manufacturers.',
    capabilities: [
      'Siemens, ABB, Allen-Bradley, Yaskawa, Lenze, Danfoss',
      'IGBT and power module replacement',
      'DC bus capacitor bank replacement',
      'Gate driver and control board repair',
      'Parameter backup and restoration',
      'Load-bank testing before return to service',
    ],
  },
  {
    id: 'plc-repair',
    icon: <Settings size={36} strokeWidth={2} />,
    name: 'PLC Repair',
    description: 'Programmable logic controller failure can halt an entire production line. We provide rapid board-level diagnostics and repair for the most common industrial PLC platforms, and can help source replacement modules when repair is not feasible.',
    capabilities: [
      'Allen-Bradley / Rockwell (MicroLogix, SLC, ControlLogix)',
      'Siemens S5, S7, TIA Portal platforms',
      'Mitsubishi FX and Q series',
      'Omron CJ and CS series',
      'Component-level I/O card repair',
      'Module sourcing and replacement',
    ],
  },
  {
    id: 'new-sales',
    icon: <ShoppingCart size={36} strokeWidth={2} />,
    name: 'New Motor & Equipment Sales',
    description: 'Need a new motor or drive instead of a repair? We source from leading manufacturers and can arrange drop-shipping directly to your facility. We also assist with motor selection, frame sizing, and installation support.',
    capabilities: [
      'NEMA and IEC frame motors',
      'General purpose and inverter-duty motors',
      'AC drives and soft starters',
      'Servo motor and drive packages',
      'Drop-ship to job site available',
      'Application and sizing consultation',
    ],
  },
  {
    id: 'electronics-repair',
    icon: <Zap size={36} strokeWidth={2} />,
    name: 'Electronics Repair',
    description: 'Beyond drives and PLCs, we repair a wide range of industrial electronic assemblies at the component level — including HMI displays, relay logic panels, power supplies, and custom control boards.',
    capabilities: [
      'HMI touchscreen and display repair',
      'Industrial power supply repair',
      'Relay logic and relay output boards',
      'Custom control board diagnostics',
      'Component-level PCB rework',
      'Conformal coating and potting removal',
    ],
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': SERVICES.map(s => ({
    '@type': 'Service',
    name: s.name,
    description: s.description,
    provider: {
      '@type': 'LocalBusiness',
      name: LOCAL_BUSINESS_SCHEMA.name,
      telephone: LOCAL_BUSINESS_SCHEMA.telephone,
    },
    areaServed: LOCAL_BUSINESS_SCHEMA.areaServed,
    url: `https://synergyindustrialsolutions.com/services#${s.id}`,
  })),
}

export default function Services({ onQuoteClick }) {
  const muted = { color: 'var(--color-text-muted)', lineHeight: 1.7 }

  return (
    <>
      <PageSEO
        title="Motor Rewind, Servo & Drive Repair Services | Synergy Industrial Solutions"
        description="Electric motor rewind, servo motor repair, AC/DC VFD drive repair, PLC repair, and new motor sales. Serving Chattanooga TN, North Alabama, and NW Georgia."
        canonical="/services"
        schema={SCHEMA}
      />

      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '4rem 5%', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Industrial Repair Services
          </h1>
          <p style={{ fontSize: '1.15rem', ...muted }}>
            From electric motor rewind to servo systems and PLC repair — we provide component-level diagnostics and expert repair for the full range of industrial electromechanical equipment.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 5%', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {SERVICES.map(({ id, icon, name, description, capabilities }) => (
          <section key={id} id={id} style={{ scrollMarginTop: '5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(249,115,22,0.1)', padding: '0.75rem', borderRadius: '0.5rem', flexShrink: 0 }}>
                {icon}
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>{name}</h2>
            </div>
            <p style={{ ...muted, fontSize: '1.05rem', marginBottom: '1.5rem' }}>{description}</p>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem', marginBottom: '1.75rem', listStyle: 'none', padding: 0 }}>
              {capabilities.map(c => (
                <li key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>✓</span>
                  {c}
                </li>
              ))}
            </ul>
            <button
              onClick={onQuoteClick}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.5rem', borderRadius: '0.5rem', border: '2px solid var(--color-accent)', backgroundColor: 'transparent', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Request {name} <ArrowRight size={16} />
            </button>
            <hr style={{ marginTop: '3rem', borderColor: 'var(--color-border)', borderStyle: 'solid', borderWidth: '1px 0 0' }} />
          </section>
        ))}
      </div>
    </>
  )
}
