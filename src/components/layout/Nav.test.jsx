import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nav from './Nav'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('Nav', () => {
  it('renders the logo', () => {
    wrap(<Nav />)
    expect(screen.getByText('SYNERGY')).toBeInTheDocument()
  })

  it('renders nav links', () => {
    wrap(<Nav />)
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /service area/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders the public phone number as a tel link', () => {
    wrap(<Nav />)
    const link = screen.getByRole('link', { name: /877/i })
    expect(link).toHaveAttribute('href', 'tel:+18772599187')
  })

  it('does NOT contain Chris cell phone number', () => {
    wrap(<Nav />)
    expect(document.body.innerHTML).not.toContain('256-548-2494')
    expect(document.body.innerHTML).not.toContain('2565482494')
  })

  it('renders Get a Quote button', () => {
    wrap(<Nav />)
    expect(screen.getByRole('button', { name: /get a quote/i })).toBeInTheDocument()
  })
})
