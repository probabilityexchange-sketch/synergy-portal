import { useState, useEffect } from 'react'
import { X, Send, CheckCircle } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || ''

const SERVICES = [
  'Electric Motor Rewind',
  'Servo Motor Repair',
  'AC/DC Drive Repair',
  'PLC Repair',
  'New Motor Sales',
  'Electronics Repair',
  'Other / Not Sure',
]

export default function LeadModal({ isOpen, onClose, defaultService = '' }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: defaultService, message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  // Reset form and status each time the modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', phone: '', email: '', service: defaultService, message: '' })
      setStatus('idle')
    }
  }, [isOpen, defaultService])

  if (!isOpen) return null

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
        body: JSON.stringify({ ...form, source: 'Website Quote Form' }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.6rem 0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    marginBottom: '0.35rem',
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request a Quote"
      aria-describedby="lm-subtitle"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: '1rem',
          padding: '2rem',
          width: '100%',
          maxWidth: '500px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
          }}
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={48} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
              We'll be in touch soon!
            </h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Thanks for reaching out. We typically respond within 1 business hour.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
              Request a Quote
            </h2>
            <p id="lm-subtitle" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              We respond within 1 business hour.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="lm-name" style={labelStyle}>Name *</label>
                <input id="lm-name" name="name" required value={form.name} onChange={handleChange} style={inputStyle} aria-label="Name" />
              </div>
              <div>
                <label htmlFor="lm-phone" style={labelStyle}>Phone *</label>
                <input id="lm-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} style={inputStyle} aria-label="Phone" />
              </div>
              <div>
                <label htmlFor="lm-email" style={labelStyle}>Email</label>
                <input id="lm-email" name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} aria-label="Email" />
              </div>
              <div>
                <label htmlFor="lm-service" style={labelStyle}>Service Needed</label>
                <select id="lm-service" name="service" value={form.service} onChange={handleChange} style={inputStyle} aria-label="Service">
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="lm-message" style={labelStyle}>Message</label>
                <textarea id="lm-message" name="message" value={form.message} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} aria-label="Message" />
              </div>

              {status === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                  Something went wrong. Please call us at (877) 259-9187.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-label="Send request"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem',
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  opacity: status === 'submitting' ? 0.7 : 1,
                }}
              >
                <Send size={16} />
                {status === 'submitting' ? 'Sending…' : 'Send Request'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
