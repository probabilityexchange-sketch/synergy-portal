import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import LeadModal from './LeadModal'

describe('LeadModal', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true, leadId: 'abc123' }) })
    )
  })

  it('does not render when closed', () => {
    render(<LeadModal isOpen={false} onClose={() => {}} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the form when open', () => {
    render(<LeadModal isOpen={true} onClose={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<LeadModal isOpen={true} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('shows success message after valid submission', async () => {
    render(<LeadModal isOpen={true} onClose={() => {}} />)
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Smith' } })
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '555-1234' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@test.com' } })
    fireEvent.click(screen.getByRole('button', { name: /send request/i }))
    await waitFor(() => {
      expect(screen.getByText(/we'll be in touch/i)).toBeInTheDocument()
    })
  })
})
