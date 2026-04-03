import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || ''

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm the Synergy Industrial assistant. Ask me about motor repair, part numbers, or our services." },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current && typeof bottomRef.current.scrollIntoView === 'function') {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  async function send(e) {
    e.preventDefault()
    if (!input.trim() || sending) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setSending(true)
    try {
      const res = await fetch(`${API_BASE}/handleChat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || "I'll have someone follow up with you shortly." }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I\'m having trouble connecting. Please call us at (877) 259-9187.' }])
    }
    setSending(false)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent)',
          color: '#fff',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
          zIndex: 1000,
          transition: 'transform 0.2s',
        }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '5rem',
            right: '1.5rem',
            width: 'min(360px, calc(100vw - 2rem))',
            height: '440px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            zIndex: 999,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--color-accent)', color: '#fff' }}>
            <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>Synergy Assistant</p>
            <p style={{ fontSize: '0.8rem', opacity: 0.85 }}>Ask about services, parts, or pricing</p>
          </div>

          {/* Messages */}
          <div
            role="log"
            aria-label="Chat messages"
            style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '0.6rem 0.9rem',
                  borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                  backgroundColor: msg.role === 'user' ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                  color: msg.role === 'user' ? '#fff' : 'var(--color-text)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                }}
              >
                {msg.text}
              </div>
            ))}
            {sending && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                Typing…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={send}
            style={{ padding: '0.75rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.5rem' }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message…"
              aria-label="Chat message"
              style={{
                flex: 1,
                padding: '0.6rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--color-border)',
                fontSize: '0.9rem',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              aria-label="Send message"
              style={{
                padding: '0.6rem 0.85rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: 'var(--color-accent)',
                color: '#fff',
                opacity: !input.trim() || sending ? 0.5 : 1,
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
