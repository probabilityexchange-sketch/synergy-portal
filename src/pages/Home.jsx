import { Helmet } from 'react-helmet-async';
import { Phone, Calendar, ClipboardList, Wrench, Cpu, Activity, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1e293b', margin: 0, padding: 0 }}>
      <Helmet>
        <title>Synergy Industrial Solutions | Precision Motor Rewinding & VFD Repair</title>
        <meta name="description" content="The Future of Industrial Repair Management. Specialized in precision motor rewinding, industrial electronics, VFD repair, and servo & robotics diagnostics." />
        {/* Basic SEO Schema Markup for Local Business */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Synergy Industrial Solutions",
              "image": "",
              "@id": "",
              "url": "https://synergyindustrialsolutions.com",
              "telephone": "+18005550199",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Industrial Parkway",
                "addressLocality": "Manufacturing City",
                "addressRegion": "ST",
                "postalCode": "12345",
                "addressCountry": "US"
              }  
            }
          `}
        </script>
      </Helmet>
      
      {/* Modern Top Navigation - Cleaned up Logo Design */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 5%', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Activity size={32} color="#f97316" strokeWidth={2.5} />
          <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.025em', color: '#0f172a' }}>
            Synergy <span style={{ color: '#f97316', fontWeight: '600' }}>Industrial</span>
          </span>
        </div>
        
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '1rem', fontWeight: '600', color: '#475569' }}>
          <a href="#services" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Services</a>
          <a href="#features" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Features</a>
          <a href="#case-studies" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Case Studies</a>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Client Portal</Link>
        </nav>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* CTA 1: Direct Call Mobile Optimized */}
          <a href="tel:+18005550199" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '0.375rem', fontWeight: '700', color: '#0f172a', border: '2px solid #e2e8f0', textDecoration: 'none', transition: 'all 0.2s' }}>
            <Phone size={18} /> (800) 555-0199
          </a>
          {/* CTA 2: Request a Quote */}
          <button style={{ padding: '0.6rem 1.25rem', borderRadius: '0.375rem', fontWeight: '700', backgroundColor: '#f97316', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
            <ClipboardList size={18} /> Request Quote
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '6rem 5%', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '800px', zIndex: 2 }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: '900', lineHeight: '1.05', color: '#0f172a', marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>
            The Future of <br/> Industrial Repair.
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#475569', margin: '0 auto 3rem auto', lineHeight: '1.6', maxWidth: '650px' }}>
            Minimize downtime and maximize reliability with our advanced diagnostic suite and precision repair services. Talk to our AI assistant instantly or schedule a diagnostic to keep operations moving.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            {/* CTA 3: Schedule Diagnostic */}
            <button style={{ padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '0.5rem', fontWeight: '700', backgroundColor: '#f97316', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px 0 rgba(249, 115, 22, 0.39)' }}>
              <Calendar size={20} /> Schedule Diagnostic
            </button>
            <a href="tel:+18005550199" style={{ padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '0.5rem', fontWeight: '700', backgroundColor: '#fff', color: '#0f172a', border: '2px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <Phone size={20} /> Call Now (AI Answer)
            </a>
          </div>
        </div>
        {/* Abstract background elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0) 70%)', borderRadius: '50%', zIndex: 1 }}></div>
      </section>

      {/* Services Features */}
      <section id="services" style={{ padding: '5rem 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', backgroundColor: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
          <div style={{ color: '#f97316', padding: '1rem', backgroundColor: '#fff7ed', borderRadius: '0.75rem', width: 'fit-content' }}><Wrench size={40} strokeWidth={2} /></div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>Precision Motor Rewinding</h3>
          <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '1.1rem' }}>Expert precision motor rewinding ensuring unparalleled reliability for all specialized and custom stator projects.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', backgroundColor: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
          <div style={{ color: '#f97316', padding: '1rem', backgroundColor: '#fff7ed', borderRadius: '0.75rem', width: 'fit-content' }}><Cpu size={40} strokeWidth={2} /></div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>Electronics & VFD Repair</h3>
          <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '1.1rem' }}>Comprehensive component-level repair for variable frequency drives, PLCs, and critical industrial electronics.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', backgroundColor: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
          <div style={{ color: '#f97316', padding: '1rem', backgroundColor: '#fff7ed', borderRadius: '0.75rem', width: 'fit-content' }}><Activity size={40} strokeWidth={2} /></div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>Servo & Robotics Suite</h3>
          <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '1.1rem' }}>State-of-the-art diagnostic and repair capabilities for servo motors and automated robotic manufacturing systems.</p>
        </div>
      </section>

      {/* Lead Generation & Newsletter Section */}
      <section style={{ padding: '5rem 5%', backgroundColor: '#0f172a', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Stay Ahead of Downtime.</h2>
        <p style={{ fontSize: '1.125rem', color: '#94a3b8', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          Subscribe to our technical newsletter for maintenance tips, case studies, and insights from our top diagnostic engineers.
        </p>
        <form style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }} onSubmit={(e) => { e.preventDefault(); alert('Subscribed and synced to CRM!'); }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Mail size={20} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="email" placeholder="Enter your email address" required style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '0.5rem', border: 'none', fontSize: '1rem', outline: 'none' }} />
          </div>
          <button type="submit" style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '0.5rem', fontWeight: '700', backgroundColor: '#f97316', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Subscribe
          </button>
        </form>
      </section>
      
      {/* Footer */}
      <footer style={{ padding: '2rem 5%', backgroundColor: '#020617', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p>© 2026 Synergy Industrial Solutions. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
