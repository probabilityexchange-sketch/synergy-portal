import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || ''

export default function EmailSignup({ source = 'website', dark = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(`${API_BASE}/handleEmailSignup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#22c55e' }}>
        <CheckCircle size={22} />
        <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>You're on the list!</span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <div style={{ position: 'relative', flexGrow: 1, minWidth: '220px', maxWidth: '380px' }}>
        <Mail
          size={18}
          style={{
            position: 'absolute',
            left: '0.85rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94A3B8',
          }}
        />
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="Email address"
          style={{
            width: '100%',
            padding: '0.75rem 0.75rem 0.75rem 2.75rem',
            borderRadius: '0.5rem',
            border: dark ? 'none' : '1px solid var(--color-border)',
            fontSize: '1rem',
            backgroundColor: dark ? 'rgba(255,255,255,0.1)' : 'var(--color-bg)',
            color: dark ? '#fff' : 'var(--color-text)',
          }}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        aria-label="Subscribe"
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          backgroundColor: 'var(--color-accent)',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1rem',
          opacity: status === 'submitting' ? 0.7 : 1,
          whiteSpace: 'nowrap',
        }}
      >
        {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p style={{ width: '100%', color: '#f87171', fontSize: '0.875rem' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
