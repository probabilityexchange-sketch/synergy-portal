import { Helmet } from 'react-helmet-async'

const BUSINESS = {
  name: 'Synergy Industrial Solutions',
  phone: '+18772599187',
  email: 'Info@Synergyindsolutions.com',
  address: {
    street: '1208a Kentucky Avenue',
    city: 'Stevenson',
    state: 'AL',
    zip: '35772',
    country: 'US',
  },
  geo: { lat: 34.8687, lng: -85.8455 },
  url: 'https://synergyindustrialsolutions.com',
  hours: 'Mo-Fr 07:00-17:00',
}

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BUSINESS.name,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  url: BUSINESS.url,
  openingHours: BUSINESS.hours,
  description: 'Expert electric motor rewind, servo motor repair, AC/DC drive repair, and PLC repair. Serving Chattanooga TN, North Alabama, and NW Georgia. Pickup and delivery within 100 miles of Stevenson, AL.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.zip,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
  },
  areaServed: [
    'Hamilton County, TN',
    'Jackson County, AL',
    'Madison County, AL',
    'DeKalb County, AL',
    'Whitfield County, GA',
    'Walker County, GA',
    'Bradley County, TN',
    'Marion County, AL',
  ],
  priceRange: '$$',
}

export default function PageSEO({ title, description, canonical, schema }) {
  const safeTitle = title || 'Synergy Industrial Solutions'
  const fullTitle = safeTitle.includes('Synergy') ? safeTitle : `${safeTitle} | Synergy Industrial Solutions`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`https://synergyindustrialsolutions.com${canonical}`} />}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
