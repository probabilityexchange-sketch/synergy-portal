// src/pages/ServiceLocation.jsx
import { useParams } from 'react-router-dom'
import { Phone, Wrench, Cpu, Activity, Settings, ShoppingCart, Zap, Clock, MapPin, Shield, Truck } from 'lucide-react'

// City data - population and metro info
const CITIES = {
  'chattanooga-tn': { name: 'Chattanooga', state: 'TN', metro: '180K', distance: '25 miles from Stevenson' },
  'nashville-tn': { name: 'Nashville', state: 'TN', metro: '1.9M', distance: '85 miles from Stevenson' },
  'south-nashville-tn': { name: 'South Nashville', state: 'TN', metro: '1.9M', distance: '90 miles from Stevenson' },
  'murfreesboro-tn': { name: 'Murfreesboro', state: 'TN', metro: '150K', distance: '70 miles from Stevenson' },
  'clarksville-tn': { name: 'Clarksville', state: 'TN', metro: '160K', distance: '100 miles from Stevenson' },
  'dunlap-tn': { name: 'Dunlap', state: 'TN', metro: '50K', distance: '40 miles from Stevenson' },
  'birmingham-al': { name: 'Birmingham', state: 'AL', metro: '1.1M', distance: '65 miles from Stevenson' },
  'hoover-al': { name: 'Hoover', state: 'AL', metro: '1.1M', distance: '70 miles from Stevenson' },
  'pelham-al': { name: 'Pelham', state: 'AL', metro: '85K', distance: '75 miles from Stevenson' },
  'huntsville-al': { name: 'Huntsville', state: 'AL', metro: '480K', distance: '50 miles from Stevenson' },
  'madison-al': { name: 'Madison', state: 'AL', metro: '60K', distance: '55 miles from Stevenson' },
  'decatur-al': { name: 'Decatur', state: 'AL', metro: '150K', distance: '35 miles from Stevenson' },
  'athens-al': { name: 'Athens', state: 'AL', metro: '60K', distance: '45 miles from Stevenson' },
  'florence-al': { name: 'Florence', state: 'AL', metro: '150K', distance: '60 miles from Stevenson' },
  'anniston-al': { name: 'Anniston', state: 'AL', metro: '100K', distance: '50 miles from Stevenson' },
  'gadsden-al': { name: 'Gadsden', state: 'AL', metro: '75K', distance: '45 miles from Stevenson' },
  'talladega-al': { name: 'Talladega', state: 'AL', metro: '80K', distance: '55 miles from Stevenson' },
  'fort-payne-al': { name: 'Fort Payne', state: 'AL', metro: '70K', distance: '30 miles from Stevenson' },
  'scottsboro-al': { name: 'Scottsboro', state: 'AL', metro: '55K', distance: '35 miles from Stevenson' },
  'bridgeport-al': { name: 'Bridgeport', state: 'AL', metro: '25K', distance: '15 miles from Stevenson' },
}

// Service definitions with icons and descriptions
const SERVICES = {
  'motor-rewind': {
    name: 'Motor Rewinding',
    icon: <Wrench size={28} strokeWidth={1.5} />,
    desc: 'Professional electric motor rewinding services for AC and DC motors of all HP ranges. We restore motors to OEM specifications with custom stator work available.',
    services: ['AC Motor Rewind', 'DC Motor Rewind', 'Stator Repair', 'Rotor Rewind', 'Custom Winding'],
  },
  'ac-motor-repair': {
    name: 'AC Motor Repair',
    icon: <Zap size={28} strokeWidth={1.5} />,
    desc: 'Complete AC motor repair including bearing replacement, shaft repair, winding diagnostics, and full rebuilds for industrial and commercial applications.',
    services: ['Bearing Replacement', 'Shaft Repair', 'Winding Repair', 'Bearing Replacement', 'Dynamic Balancing'],
  },
  'dc-motor-repair': {
    name: 'DC Motor Repair',
    icon: <Activity size={28} strokeWidth={1.5} />,
    desc: 'Specialized DC motor repair for industrial applications. Full diagnostics, armature repair, field rewinding, and brush replacement.',
    services: ['Armature Rewind', 'Field Winding', 'Brush Replacement', 'Commutator Repair', 'Bearing Replacement'],
  },
  'servomotor-repair': {
    name: 'Servo Motor Repair',
    icon: <Cpu size={28} strokeWidth={1.5} />,
    desc: 'Precision servo motor repair with encoder replacement, alignment services, and comprehensive diagnostics for all major brands.',
    services: ['Encoder Replacement', 'Precision Alignment', 'Brake Repair', 'Hall Sensor Repair', 'Full Rebuild'],
  },
  'gearbox-repair': {
    name: 'Gearbox Repair',
    icon: <Settings size={28} strokeWidth={1.5} />,
    desc: 'Industrial gearbox repair and rebuild services. Gear replacement, bearing service, seal replacement, and housing repair.',
    services: ['Gear Replacement', 'Bearing Service', 'Seal Replacement', 'Housing Repair', 'Oil Analysis'],
  },
  'pump-repair': {
    name: 'Pump Repair',
    icon: <Activity size={28} strokeWidth={1.5} />,
    desc: 'Industrial pump repair for centrifugal, positive displacement, and hydraulic pumps. Seal replacement, impeller repair, and bearing service.',
    services: ['Seal Replacement', 'Impeller Repair', 'Bearing Replacement', 'Wear Ring Replacement', 'Coupling Alignment'],
  },
}

const STATS = [
  { icon: <Clock size={20} />, label: '5-7 Days Standard Turnaround' },
  { icon: <Zap size={20} />, label: '24 Hour Rush Service Available' },
  { icon: <Truck size={20} />, label: '100 Miles Service Radius' },
  { icon: <Shield size={20} />, label: '1 Year Warranty on Repairs' },
]

function getCityData(citySlug) {
  if (CITIES[citySlug]) return CITIES[citySlug]
  // Handle legacy URLs - try to parse from slug like "chattanooga-tn"
  const parts = citySlug.split('-')
  const statePart = parts.pop()
  const cityPart = parts.join('-')
  return CITIES[`${cityPart}-${statePart}`]
}

export default function ServiceLocation({ onQuoteClick }) {
  const { service, city } = useParams()
  
  const cityData = getCityData(city)
  const serviceData = SERVICES[service]

  if (!cityData || !serviceData) {
    return (
      <div className="service-location-page">
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h1>Page Not Found</h1>
          <p>Invalid service or location.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="service-location-page">
      {/* Hero Section */}
      <section className="hero" style={{ 
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          {serviceData.name} in {cityData.name}, {cityData.state}
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          {serviceData.desc} Serving industrial facilities in {cityData.name} and surrounding areas.
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '0.5rem' }}>
          {cityData.distance} • {cityData.metro} metro area
        </p>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
          Our {serviceData.name} Services in {cityData.name}
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {serviceData.services.map((item, i) => (
            <div key={i} style={{
              background: 'white',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{ color: 'var(--color-accent)' }}>{serviceData.icon}</div>
              <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ 
        background: 'var(--color-bg-alt)', 
        padding: '2.5rem 2rem',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          {STATS.map((stat, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              color: 'var(--color-text)'
            }}>
              <div style={{ color: 'var(--color-accent)' }}>{stat.icon}</div>
              <span style={{ fontWeight: 500 }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
          Synergy Industrial Solutions has been serving the {cityData.name}, {cityData.state} area for over 20 years. 
          Our team of certified technicians specializes in {serviceData.name.toLowerCase()} for industrial and commercial applications. 
          We understand that equipment downtime costs your business money, which is why we offer fast turnaround times 
          and emergency service options.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
          Located just {cityData.distance.toLowerCase()}, we offer <strong>free pickup and delivery</strong> within our 100-mile service radius. 
          Every repair comes with our <strong>1-year warranty</strong> for parts and labor. We service all major brands including 
          Siemens, ABB, Allen-Bradley, Yaskawa, and FANUC.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--color-text)' }}>
          Whether you need routine maintenance or emergency repairs, our team has the expertise to get your equipment 
          back online quickly and reliably. Contact us today for a free quote on your {cityData.name} location.
        </p>
      </section>

      {/* CTA Section */}
      <section style={{ 
        background: 'var(--color-accent)',
        padding: '3rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>
          Need {serviceData.name} in {cityData.name}?
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.9 }}>
          Call us at <strong>(256) 555-0142</strong> or request a quote online
        </p>
        <button 
          onClick={onQuoteClick}
          style={{
            background: 'white',
            color: 'var(--color-accent)',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
        >
          Get Quote
        </button>
      </section>
    </div>
  )
}