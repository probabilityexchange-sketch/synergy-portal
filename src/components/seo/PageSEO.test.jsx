import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import PageSEO from './PageSEO'
import { describe, it, expect } from 'vitest'

const wrap = (ui) => render(<HelmetProvider>{ui}</HelmetProvider>)

describe('PageSEO', () => {
  it('renders without crashing', () => {
    expect(() =>
      wrap(<PageSEO title="Test Page" description="Test description" />)
    ).not.toThrow()
  })

  it('accepts schema prop without throwing', () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Synergy Industrial Solutions',
    }
    expect(() =>
      wrap(<PageSEO title="Test" description="Test" schema={schema} />)
    ).not.toThrow()
  })
})
