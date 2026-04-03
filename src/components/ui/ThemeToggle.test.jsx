import { render, screen, fireEvent } from '@testing-library/react'
import { beforeEach, describe, it, expect } from 'vitest'
import ThemeToggle from './ThemeToggle'

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme')
  localStorage.clear()
})

describe('ThemeToggle', () => {
  it('renders a button', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('starts in light mode by default', () => {
    render(<ThemeToggle />)
    expect(document.documentElement).not.toHaveAttribute('data-theme', 'dark')
  })

  it('switches to dark mode on click', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('toggles back to light mode on second click', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))
    expect(document.documentElement).not.toHaveAttribute('data-theme', 'dark')
  })

  it('persists theme to localStorage', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('reads saved theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark')
    render(<ThemeToggle />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })
})
