import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Logo from './Logo'

describe('Logo', () => {
  it('renders the brand name', () => {
    render(<MemoryRouter><Logo /></MemoryRouter>)
    expect(screen.getByText('SYNERGY')).toBeInTheDocument()
    expect(screen.getByText('Industrial Solutions')).toBeInTheDocument()
  })

  it('links to the homepage', () => {
    render(<MemoryRouter><Logo /></MemoryRouter>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })

  it('contains an SVG robot arm icon', () => {
    const { container } = render(<MemoryRouter><Logo /></MemoryRouter>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
