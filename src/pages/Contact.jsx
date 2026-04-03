// src/pages/Contact.jsx
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import PageSEO, { LOCAL_BUSINESS_SCHEMA } from '../components/seo/PageSEO'

const API_BASE = import.meta.env.VITE_API_BASE || ''

const SERVICES = ['Electric Motor Rewind', 'Servo Motor Repair', 'AC/DC Drive Repair', 'PLC Repair', 'New Motor Sales', 'Electronics Repair', 'Other / Not Sure']

const FAQS = [
  { q: 'Do you service Chattanooga, TN?', a: 'Yes — free pickup and delivery anywhere in the Chattanooga metro and Hamilton County.' },
  { q: 'How quickly can you pick up?', a: 'We typically schedule pickup within 1–2 business days. Call for same-day arrangements.' },
  { q: 'Do you provide written estimates?', a: 'Yes. Every job gets a written estimate before work begins.' },
  { q: 'What are your hours?', a: 'Monday–Friday 7:00 AM – 5:00 PM. After-hours service available for critical equipment failures.' },
]

const FAQ_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  mainEntityOfPage: {
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  },
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')

  const muted = { color: 'var(--color-text-muted)', lineHeight: 1.7 }
  const inputStyle = { width: '100%', padding: '0.65rem 0.85rem', border: '1px solid var(--color-border)', borderRadius: '0.375rem', fontSize: '1rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)' }
  const labelStyle = { display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.35rem' }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(`${API_BASE}/handleNewLead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'Contact Page' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageSEO
        title="Contact Us | Synergy Industrial Solutions"
        description="Contact Synergy Industrial Solutions in Stevenson, AL. Call (877) 259-9187 or submit a request. Serving Chattanooga TN, North Alabama, and NW Georgia."
        canonical="/contact"
        schema={FAQ_SCHEMA}
      />

      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '4rem 5%', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '700px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            Get In Touch
          </h1>
          <p style={{ fontSize: '1.1rem', ...muted }}>
            We respond to all inquiries within 1 business hour. Call, email, or fill out the form below.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.25rem' }}>Contact Info</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="tel:+18772599187" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--color-accent)', borderRadius: '0.5rem', color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                <Phone size={20} /> (877) 259-9187
              </a>
              <a href="mailto:Info@Synergyindsolutions.com" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.85rem 1rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', color: 'var(--color-text)', wordBreak: 'break-all' }}>
                <Mail size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-accent)' }} />
                <span>Info@Synergyindsolutions.com</span>
              </a>
              <a href="https://maps.google.com/?q=1208a+Kentucky+Ave+Stevenson+AL+35772" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.85rem 1rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', color: 'var(--color-text)' }}>
                <MapPin size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-accent)' }} />
                <span>1208a Kentucky Avenue<br />Stevenson, AL 35772</span>
              </a>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.85rem 1rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', color: 'var(--color-text)' }}>
                <Clock size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-accent)' }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>Mon–Fri 7:00 AM – 5:00 PM</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>After-hours available for emergencies</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>Quick Answers</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {FAQS.map(({ q, a }) => (
                <div key={q} style={{ padding: '1rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: '0.4rem' }}>{q}</p>
                  <p style={{ fontSize: '0.85rem', ...muted }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '2rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <CheckCircle size={52} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                We'll be in touch!
              </h2>
              <p style={muted}>We typically respond within 1 business hour during normal business hours.</p>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.5rem' }}>Send a Message</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="ct-name" style={labelStyle}>Name *</label>
                  <input id="ct-name" name="name" required value={form.name} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label htmlFor="ct-phone" style={labelStyle}>Phone *</label>
                    <input id="ct-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="ct-email" style={labelStyle}>Email</label>
                    <input id="ct-email" name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label htmlFor="ct-service" style={labelStyle}>Service Needed</label>
                  <select id="ct-service" name="service" value={form.service} onChange={handleChange} style={inputStyle}>
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="ct-message" style={labelStyle}>Message</label>
                  <textarea id="ct-message" name="message" value={form.message} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                {status === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>Something went wrong. Please call (877) 259-9187.</p>
                )}
                <button type="submit" disabled={status === 'submitting'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem', backgroundColor: 'var(--color-accent)', color: '#fff', fontWeight: 700, fontSize: '1rem', border: 'none', borderRadius: '0.5rem', opacity: status === 'submitting' ? 0.7 : 1 }}>
                  <Send size={16} />
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
