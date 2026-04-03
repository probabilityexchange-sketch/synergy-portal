import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import ChatWidget from './ChatWidget'

describe('ChatWidget', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ reply: 'Thanks for your message!' }) })
    )
  })

  it('renders the floating chat button', () => {
    render(<ChatWidget />)
    expect(screen.getByRole('button', { name: /chat/i })).toBeInTheDocument()
  })

  it('panel is hidden by default', () => {
    render(<ChatWidget />)
    expect(screen.queryByRole('log')).not.toBeInTheDocument()
  })

  it('opens panel when button is clicked', () => {
    render(<ChatWidget />)
    fireEvent.click(screen.getByRole('button', { name: /chat/i }))
    expect(screen.getByRole('log')).toBeInTheDocument()
  })

  it('sends a message and shows the reply', async () => {
    render(<ChatWidget />)
    fireEvent.click(screen.getByRole('button', { name: /chat/i }))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Hello' } })
    fireEvent.submit(input.closest('form'))
    await waitFor(() => {
      expect(screen.getByText(/thanks for your message/i)).toBeInTheDocument()
    })
  })
})
