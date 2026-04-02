# Synergy Industrial Solutions — Public Site Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder homepage with a complete 5-page public marketing website optimized for 2026 local SEO, dark mode, email capture, AI chat stub, and Twilio/ElevenLabs-ready phone handling — all deployed on Firebase Blaze.

**Architecture:** Hybrid single-page-conversion + multi-route SEO. The homepage is a full conversion page; each sub-page (`/services`, `/service-area`, `/about`, `/contact`) has its own route, unique title/meta, and JSON-LD schema. All color tokens are CSS custom properties so a single `data-theme="dark"` on `<html>` flips the entire palette. Interactive features (lead modal, email opt-in, chat widget) POST to Firebase Functions v2.

**Tech Stack:** React 19, Vite, React Router v7, react-helmet-async, lucide-react, Vitest + React Testing Library, Firebase Hosting + Functions v2 (Node 20), Firestore.

---

## Spec Reference

`docs/superpowers/specs/2026-04-02-site-overhaul-design.md`

---

## File Map

### Create
```
src/styles/tokens.css              — CSS custom properties for light + dark theme
src/styles/global.css              — Base resets, typography, transitions
src/components/brand/Logo.jsx      — SVG 6-axis robot arm + wordmark
src/components/layout/Nav.jsx      — Top nav: logo, links, theme toggle, call, CTA
src/components/layout/Footer.jsx   — Address, phone, email, links, copyright
src/components/ui/ThemeToggle.jsx  — Sun/moon button, reads/writes localStorage
src/components/ui/LeadModal.jsx    — Quote/lead form modal → Firebase Function
src/components/ui/EmailSignup.jsx  — Email opt-in form → Firebase Function
src/components/ui/ChatWidget.jsx   — Floating chat button + slide-up panel stub
src/components/seo/PageSEO.jsx     — Helmet wrapper + JSON-LD schema injection
src/pages/Home.jsx                 — Full conversion homepage (replace existing)
src/pages/Services.jsx             — 6 service sections with schema
src/pages/ServiceArea.jsx          — Coverage map + FAQ schema
src/pages/About.jsx                — Chris + shop story
src/pages/Contact.jsx              — Lead form + call CTA
.env.development                   — Local API base URL for Firebase emulator
.env.production.example            — Template for production env vars
public/robots.txt                  — Allow all, sitemap link
public/sitemap.xml                 — All 5 routes
```

### Modify
```
src/App.jsx                        — Add 4 new routes, wrap with ThemeProvider logic
src/main.jsx                       — Import tokens.css + global.css
src/index.css                      — Clear existing styles (replaced by tokens.css)
functions/index.js                 — Add handleEmailSignup, handleChat, handleInboundCall
vite.config.js                     — Add Vitest config block
package.json                       — Add vitest, @testing-library/react, @testing-library/jest-dom, jsdom
```

### Test Files
```
src/components/brand/Logo.test.jsx
src/components/ui/ThemeToggle.test.jsx
src/components/layout/Nav.test.jsx
src/components/ui/LeadModal.test.jsx
src/components/ui/EmailSignup.test.jsx
src/components/ui/ChatWidget.test.jsx
src/components/seo/PageSEO.test.jsx
```

---

## Task 1: Testing Infrastructure

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Create: `src/test-setup.js`

- [ ] **Step 1: Install test dependencies**

```bash
cd /home/billy/projects/synergy/synergy-portal
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Expected: packages added to `node_modules`, `package.json` devDependencies updated.

- [ ] **Step 2: Add Vitest config to vite.config.js**

Replace the entire file:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
  },
})
```

- [ ] **Step 3: Create test setup file**

```js
// src/test-setup.js
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Smoke test — create a trivial test and run it**

```jsx
// src/smoke.test.jsx
import { describe, it, expect } from 'vitest'
describe('smoke', () => {
  it('works', () => expect(1 + 1).toBe(2))
})
```

Run: `npm test`
Expected: `1 passed`

- [ ] **Step 6: Delete smoke test, commit**

```bash
rm src/smoke.test.jsx
git add package.json vite.config.js src/test-setup.js
git commit -m "chore: add vitest + react testing library"
```

---

## Task 2: CSS Design Tokens + Global Styles

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Modify: `src/index.css` (clear it)
- Modify: `src/main.jsx` (import new styles)

- [ ] **Step 1: Create tokens.css**

```css
/* src/styles/tokens.css */

/* ── Light mode (default) ── */
html {
  --color-accent:        #F97316;
  --color-accent-hover:  #EA6C0A;
  --color-bg:            #FFFFFF;
  --color-bg-secondary:  #F8FAFC;
  --color-surface:       #FFFFFF;
  --color-border:        #E2E8F0;
  --color-text:          #1E293B;
  --color-text-muted:    #64748B;
  --color-text-inverse:  #FFFFFF;
  --color-dark-hero:     #0F172A;
  color-scheme: light;
}

/* ── Dark mode ── */
html[data-theme="dark"] {
  --color-bg:            #0F172A;
  --color-bg-secondary:  #1E293B;
  --color-surface:       #1E293B;
  --color-border:        #334155;
  --color-text:          #F1F5F9;
  --color-text-muted:    #94A3B8;
  --color-text-inverse:  #0F172A;
  --color-dark-hero:     #020617;
  color-scheme: dark;
}
```

- [ ] **Step 2: Create global.css**

```css
/* src/styles/global.css */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  transition: background-color 0.2s ease, color 0.2s ease;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

button {
  cursor: pointer;
  font-family: inherit;
}

/* Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
```

- [ ] **Step 3: Clear src/index.css**

Replace the entire contents with:
```css
/* Styles are in src/styles/tokens.css and src/styles/global.css */
```

- [ ] **Step 4: Update main.jsx to import new stylesheets**

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Commit**

```bash
git add src/styles/tokens.css src/styles/global.css src/index.css src/main.jsx
git commit -m "feat: add CSS design tokens and global styles with dark mode support"
```

---

## Task 3: Logo Component

**Files:**
- Create: `src/components/brand/Logo.jsx`
- Create: `src/components/brand/Logo.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/brand/Logo.test.jsx
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Logo
```
Expected: `FAIL — Cannot find module './Logo'`

- [ ] **Step 3: Create Logo.jsx**

```jsx
// src/components/brand/Logo.jsx
import { Link } from 'react-router-dom'

export default function Logo({ size = 'md' }) {
  const heights = { sm: 28, md: 36, lg: 48 }
  const h = heights[size] || 36
  const textSizes = { sm: '1.1rem', md: '1.4rem', lg: '1.8rem' }
  const fs = textSizes[size] || '1.4rem'

  return (
    <Link
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        textDecoration: 'none',
      }}
    >
      {/* 6-axis robot arm SVG */}
      <svg
        width={h}
        height={h}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Base plate */}
        <rect x="2" y="32" width="18" height="3" rx="1.5" fill="#F97316" />
        {/* Column */}
        <rect x="7" y="21" width="6" height="12" rx="2" fill="#F97316" />
        {/* Shoulder joint */}
        <circle cx="10" cy="21" r="4" fill="#F97316" />
        {/* Upper arm */}
        <line x1="10" y1="21" x2="6" y2="11" stroke="#F97316" strokeWidth="4.5" strokeLinecap="round" />
        {/* Elbow joint */}
        <circle cx="6" cy="11" r="3.5" fill="#F97316" />
        {/* Forearm */}
        <line x1="6" y1="11" x2="24" y2="7" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />
        {/* Wrist joint */}
        <circle cx="24" cy="7" r="3" fill="#F97316" />
        {/* Gripper upper jaw */}
        <line x1="24" y1="7" x2="33" y2="3" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
        {/* Gripper lower jaw */}
        <line x1="24" y1="7" x2="33" y2="11" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Wordmark */}
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span
          style={{
            fontSize: fs,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
          }}
        >
          SYNERGY
        </span>
        <span
          style={{
            fontSize: `calc(${fs} * 0.55)`,
            fontWeight: 600,
            color: 'var(--color-accent)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Industrial Solutions
        </span>
      </span>
    </Link>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- Logo
```
Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/brand/
git commit -m "feat: add Logo component with SVG robot arm wordmark"
```

---

## Task 4: ThemeToggle Component

**Files:**
- Create: `src/components/ui/ThemeToggle.jsx`
- Create: `src/components/ui/ThemeToggle.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/ui/ThemeToggle.test.jsx
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- ThemeToggle
```
Expected: `FAIL — Cannot find module './ThemeToggle'`

- [ ] **Step 3: Create ThemeToggle.jsx**

```jsx
// src/components/ui/ThemeToggle.jsx
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      setIsDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: 'none',
        border: '1px solid var(--color-border)',
        borderRadius: '0.375rem',
        padding: '0.4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-text-muted)',
        transition: 'color 0.2s, border-color 0.2s',
      }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- ThemeToggle
```
Expected: `6 passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/ThemeToggle.jsx src/components/ui/ThemeToggle.test.jsx
git commit -m "feat: add ThemeToggle with localStorage persistence"
```

---

## Task 5: Nav Component

**Files:**
- Create: `src/components/layout/Nav.jsx`
- Create: `src/components/layout/Nav.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/layout/Nav.test.jsx
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Nav.test
```
Expected: `FAIL — Cannot find module './Nav'`

- [ ] **Step 3: Create Nav.jsx**

```jsx
// src/components/layout/Nav.jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Phone, ClipboardList, Menu, X } from 'lucide-react'
import Logo from '../brand/Logo'
import ThemeToggle from '../ui/ThemeToggle'

export default function Nav({ onQuoteClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/services', label: 'Services' },
    { to: '/service-area', label: 'Service Area' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const linkStyle = {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background-color 0.2s, border-color 0.2s',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1rem 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <Logo />

        {/* Desktop nav */}
        <nav
          style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
          aria-label="Main navigation"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                ...linkStyle,
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <ThemeToggle />
          <a
            href="tel:+18772599187"
            aria-label="Call (877) 259-9187"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--color-border)',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              whiteSpace: 'nowrap',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            <Phone size={15} />
            (877) 259-9187
          </a>
          <button
            onClick={onQuoteClick}
            aria-label="Get a quote"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              transition: 'background-color 0.2s',
            }}
          >
            <ClipboardList size={15} />
            Get a Quote
          </button>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- Nav.test
```
Expected: `5 passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Nav.jsx src/components/layout/Nav.test.jsx
git commit -m "feat: add Nav component with sticky header, theme toggle, call link"
```

---

## Task 6: Footer Component

**Files:**
- Create: `src/components/layout/Footer.jsx`

- [ ] **Step 1: Create Footer.jsx**

No separate test needed — Footer is pure presentational with no logic. It will be verified via the page integration.

```jsx
// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import Logo from '../brand/Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dark-hero)',
        color: 'var(--color-text-inverse)',
        padding: '3rem 5% 2rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid #1E293B',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Logo size="sm" />
          <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Expert motor rewind, servo repair, and industrial electronics — serving
            Chattanooga, North Alabama, and NW Georgia.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: '#64748B', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Services
          </h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['Motor Rewind', 'Servo Motors', 'AC/DC Drives', 'PLC Repair', 'New Sales', 'Electronics Repair'].map(s => (
              <Link key={s} to="/services" style={{ fontSize: '0.9rem', color: '#94A3B8', transition: 'color 0.2s' }}>
                {s}
              </Link>
            ))}
          </nav>
        </div>

        {/* Company */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: '#64748B', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Company
          </h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { label: 'Service Area', to: '/service-area' },
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map(({ label, to }) => (
              <Link key={to} to={to} style={{ fontSize: '0.9rem', color: '#94A3B8', transition: 'color 0.2s' }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: '#64748B', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <a href="tel:+18772599187" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: '#94A3B8' }}>
              <Phone size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
              (877) 259-9187
            </a>
            <a href="mailto:Info@Synergyindsolutions.com" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: '#94A3B8', wordBreak: 'break-all' }}>
              <Mail size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
              Info@Synergyindsolutions.com
            </a>
            <a
              href="https://maps.google.com/?q=1208a+Kentucky+Ave+Stevenson+AL+35772"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: '#94A3B8' }}
            >
              <MapPin size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
              1208a Kentucky Ave<br />Stevenson, AL 35772
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#475569',
        }}
      >
        <p>© {year} Synergy Industrial Solutions. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/contact" style={{ color: '#475569' }}>Privacy Policy</Link>
          <Link to="/contact" style={{ color: '#475569' }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.jsx
git commit -m "feat: add Footer component with address, links, services nav"
```

---

## Task 7: PageSEO Component

**Files:**
- Create: `src/components/seo/PageSEO.jsx`
- Create: `src/components/seo/PageSEO.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/seo/PageSEO.test.jsx
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- PageSEO
```
Expected: `FAIL — Cannot find module './PageSEO'`

- [ ] **Step 3: Create PageSEO.jsx**

```jsx
// src/components/seo/PageSEO.jsx
import { Helmet } from 'react-helmet-async'

const BUSINESS = {
  name: 'Synergy Industrial Solutions',
  phone: '+18772599187',
  email: 'Info@Synergyindsolutions.com',
  address: {
    street: '1208a Kentucky Avenue',
    city: 'Stevenson',
    state: 'AL',
    zip: '35772',
    country: 'US',
  },
  geo: { lat: 34.8687, lng: -85.8455 },
  url: 'https://synergyindustrialsolutions.com',
  hours: 'Mo-Fr 07:00-17:00',
}

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BUSINESS.name,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  url: BUSINESS.url,
  openingHours: BUSINESS.hours,
  description: 'Expert electric motor rewind, servo motor repair, AC/DC drive repair, and PLC repair. Serving Chattanooga TN, North Alabama, and NW Georgia. Pickup and delivery within 100 miles of Stevenson, AL.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.zip,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
  },
  areaServed: [
    'Hamilton County, TN',
    'Jackson County, AL',
    'Madison County, AL',
    'DeKalb County, AL',
    'Whitfield County, GA',
    'Walker County, GA',
    'Bradley County, TN',
    'Marion County, AL',
  ],
  priceRange: '$$',
}

export default function PageSEO({ title, description, canonical, schema }) {
  const fullTitle = title.includes('Synergy') ? title : `${title} | Synergy Industrial Solutions`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`https://synergyindustrialsolutions.com${canonical}`} />}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- PageSEO
```
Expected: `2 passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/seo/
git commit -m "feat: add PageSEO component with LocalBusiness schema constants"
```

---

## Task 8: LeadModal Component

**Files:**
- Create: `src/components/ui/LeadModal.jsx`
- Create: `src/components/ui/LeadModal.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/ui/LeadModal.test.jsx
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- LeadModal
```
Expected: `FAIL — Cannot find module './LeadModal'`

- [ ] **Step 3: Create LeadModal.jsx**

```jsx
// src/components/ui/LeadModal.jsx
import { useState } from 'react'
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
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
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
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- LeadModal
```
Expected: `4 passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/LeadModal.jsx src/components/ui/LeadModal.test.jsx
git commit -m "feat: add LeadModal with form submission and success state"
```

---

## Task 9: EmailSignup Component

**Files:**
- Create: `src/components/ui/EmailSignup.jsx`
- Create: `src/components/ui/EmailSignup.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/ui/EmailSignup.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import EmailSignup from './EmailSignup'

describe('EmailSignup', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true }) })
    )
  })

  it('renders email input and submit button', () => {
    render(<EmailSignup />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  it('shows success message after submission', async () => {
    render(<EmailSignup source="homepage" />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }))
    await waitFor(() => {
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument()
    })
  })

  it('posts to handleEmailSignup with email and source', async () => {
    render(<EmailSignup source="footer" />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'user@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }))
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('handleEmailSignup'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('user@example.com'),
        })
      )
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- EmailSignup
```
Expected: `FAIL — Cannot find module './EmailSignup'`

- [ ] **Step 3: Create EmailSignup.jsx**

```jsx
// src/components/ui/EmailSignup.jsx
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- EmailSignup
```
Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/EmailSignup.jsx src/components/ui/EmailSignup.test.jsx
git commit -m "feat: add EmailSignup component with Firestore backend stub"
```

---

## Task 10: ChatWidget Component

**Files:**
- Create: `src/components/ui/ChatWidget.jsx`
- Create: `src/components/ui/ChatWidget.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/ui/ChatWidget.test.jsx
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- ChatWidget
```
Expected: `FAIL — Cannot find module './ChatWidget'`

- [ ] **Step 3: Create ChatWidget.jsx**

```jsx
// src/components/ui/ChatWidget.jsx
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || ''

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I\'m the Synergy Industrial assistant. Ask me about motor repair, part numbers, or our services.' },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
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
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || 'I\'ll have someone follow up with you shortly.' }])
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- ChatWidget
```
Expected: `4 passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/ChatWidget.jsx src/components/ui/ChatWidget.test.jsx
git commit -m "feat: add ChatWidget floating panel stubbed to Firebase Function"
```

---

## Task 11: Update App.jsx + Routes

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update App.jsx with all 5 routes**

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useState } from 'react'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import ChatWidget from './components/ui/ChatWidget'
import LeadModal from './components/ui/LeadModal'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceArea from './pages/ServiceArea'
import About from './pages/About'
import Contact from './pages/Contact'

function Layout({ children, onQuoteClick }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav onQuoteClick={onQuoteClick} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)

  return (
    <HelmetProvider>
      <BrowserRouter>
        <LeadModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
        <Routes>
          <Route path="/" element={<Layout onQuoteClick={() => setQuoteOpen(true)}><Home onQuoteClick={() => setQuoteOpen(true)} /></Layout>} />
          <Route path="/services" element={<Layout onQuoteClick={() => setQuoteOpen(true)}><Services onQuoteClick={() => setQuoteOpen(true)} /></Layout>} />
          <Route path="/service-area" element={<Layout onQuoteClick={() => setQuoteOpen(true)}><ServiceArea onQuoteClick={() => setQuoteOpen(true)} /></Layout>} />
          <Route path="/about" element={<Layout onQuoteClick={() => setQuoteOpen(true)}><About onQuoteClick={() => setQuoteOpen(true)} /></Layout>} />
          <Route path="/contact" element={<Layout onQuoteClick={() => setQuoteOpen(true)}><Contact /></Layout>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
```

- [ ] **Step 2: Remove old pages/DashboardLayout.jsx reference**

The old `DashboardLayout` import was removed above. The file can remain but is no longer routed — leave it for the dashboard phase.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: update App routes for all 5 public pages"
```

---

## Task 12: Home Page

**Files:**
- Modify: `src/pages/Home.jsx` (full replacement)

- [ ] **Step 1: Write the new Home.jsx**

```jsx
// src/pages/Home.jsx
import { Phone, Wrench, Cpu, Activity, Zap, Settings, ShoppingCart, MapPin, ArrowRight } from 'lucide-react'
import PageSEO, { LOCAL_BUSINESS_SCHEMA } from '../components/seo/PageSEO'
import EmailSignup from '../components/ui/EmailSignup'

const HERO_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  '@type': ['LocalBusiness', 'AutoRepair'],
  sameAs: ['https://synergyindustrialsolutions.com'],
}

const SERVICES = [
  { icon: <Wrench size={32} strokeWidth={2} />, name: 'Electric Motor Rewind', desc: 'AC and DC motors of all HP ranges rewound to OEM spec. Custom stator work available.' },
  { icon: <Activity size={32} strokeWidth={2} />, name: 'Servo Motor Repair', desc: 'Encoder replacement, precision alignment, and full diagnostics on all major brands.' },
  { icon: <Cpu size={32} strokeWidth={2} />, name: 'AC/DC Drive Repair', desc: 'Component-level VFD and servo drive repair — Siemens, ABB, Allen-Bradley, Yaskawa.' },
  { icon: <Settings size={32} strokeWidth={2} />, name: 'PLC Repair', desc: 'Allen-Bradley, Siemens, Mitsubishi, and Omron PLC board-level diagnostics and repair.' },
  { icon: <ShoppingCart size={32} strokeWidth={2} />, name: 'New Motor Sales', desc: 'Sourcing and drop-shipping of new motors and drives from leading manufacturers.' },
  { icon: <Zap size={32} strokeWidth={2} />, name: 'Electronics Repair', desc: 'Component-level PCB repair for industrial control boards and drive electronics.' },
]

const BRANDS = ['SIEMENS', 'ABB', 'Schneider Electric', 'FANUC', 'YASKAWA', 'Allen-Bradley']

const WHY = [
  { icon: <Activity size={28} />, title: 'Fast Turnaround', body: 'Most standard rewinds completed within 5–7 business days. Rush service available.' },
  { icon: <MapPin size={28} />, title: 'Pickup & Delivery', body: 'We come to you — free pickup and delivery within 100 miles of Stevenson, AL.' },
  { icon: <Cpu size={28} />, title: 'Expert Diagnostics', body: 'Component-level troubleshooting with state-of-the-art test equipment. No guess work.' },
]

const CITIES = ['Chattanooga, TN', 'Scottsboro, AL', 'Huntsville, AL', 'Fort Payne, AL', 'Gadsden, AL', 'Dalton, GA', 'Rome, GA', 'Cleveland, TN', 'Athens, TN', 'Guntersville, AL']

export default function Home({ onQuoteClick }) {
  const s = {
    section: { padding: '5rem 5%', maxWidth: '1400px', margin: '0 auto' },
    h2: { fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '1rem', letterSpacing: '-0.02em' },
    muted: { color: 'var(--color-text-muted)', lineHeight: 1.7 },
  }

  return (
    <>
      <PageSEO
        title="Electric Motor Rewind & Industrial Repair — Stevenson AL | Synergy Industrial"
        description="Expert electric motor rewind, servo motor repair, AC/DC drive repair, and PLC repair serving Chattanooga TN, North Alabama, and NW Georgia. Pickup within 100 miles."
        canonical="/"
        schema={HERO_SCHEMA}
      />

      {/* ── Hero ── */}
      <section
        style={{
          backgroundColor: 'var(--color-dark-hero)',
          padding: '6rem 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '1400px', width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(249,115,22,0.15)', color: 'var(--color-accent)', borderRadius: '2rem', padding: '0.35rem 1rem', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
              Serving Chattanooga TN · North Alabama · NW Georgia
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#F1F5F9', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              Expert Motor Rewind &<br />
              <span style={{ color: 'var(--color-accent)' }}>Industrial Electronics</span> Repair
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#94A3B8', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Precision motor rewind, servo repair, VFD diagnostics, and PLC repair — with free pickup and delivery within 100 miles of Stevenson, AL.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="tel:+18772599187"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-accent)', color: '#fff', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }}
              >
                <Phone size={18} /> Call (877) 259-9187
              </a>
              <button
                onClick={onQuoteClick}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.75rem', borderRadius: '0.5rem', backgroundColor: 'transparent', border: '2px solid #334155', color: '#F1F5F9', fontWeight: 700, fontSize: '1.05rem' }}
              >
                Get a Free Quote <ArrowRight size={18} />
              </button>
            </div>
          </div>
          {/* Hero badge */}
          <div style={{ display: 'none' }} aria-hidden="true" />
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', padding: '1.5rem 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}>We service:</span>
          {BRANDS.map(b => (
            <span key={b} style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{b}</span>
          ))}
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent)' }}>
            <MapPin size={14} /> 100-Mile Pickup & Delivery
          </span>
        </div>
      </div>

      {/* ── Services ── */}
      <div style={{ ...s.section }}>
        <h2 style={{ ...s.h2, textAlign: 'center' }}>Industrial Repair Services</h2>
        <p style={{ ...s.muted, textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
          From single-phase fractional motors to large industrial servo systems — we repair, rewind, and restore.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {SERVICES.map(({ icon, name, desc }) => (
            <div
              key={name}
              style={{ padding: '1.75rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(249,115,22,0.1)', padding: '0.75rem', borderRadius: '0.5rem', width: 'fit-content' }}>
                {icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)' }}>{name}</h3>
              <p style={{ ...s.muted, fontSize: '0.95rem', flexGrow: 1 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Choose Synergy ── */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ ...s.h2, textAlign: 'center' }}>Why Choose Synergy?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
            {WHY.map(({ icon, title, body }) => (
              <div key={title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '2rem' }}>
                <div style={{ color: 'var(--color-accent)' }}>{icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)' }}>{title}</h3>
                <p style={{ ...s.muted, fontSize: '0.95rem' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Service Area Callout ── */}
      <div style={{ ...s.section }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={s.h2}>Serving Chattanooga & Beyond</h2>
            <p style={{ ...s.muted, marginBottom: '1.5rem' }}>
              We provide free pickup and delivery within 100 miles of our Stevenson, AL shop — covering the greater Chattanooga metro, North Alabama, and Northwest Georgia.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {CITIES.map(c => (
                <span key={c} style={{ padding: '0.3rem 0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '2rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '0.75rem', padding: '2rem', textAlign: 'center', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <MapPin size={48} color="var(--color-accent)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>Stevenson, AL 35772</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>100-mile service radius</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Email Opt-In ── */}
      <div style={{ backgroundColor: 'var(--color-dark-hero)', padding: '5rem 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#F1F5F9', marginBottom: '0.75rem' }}>
            Stay Ahead of Downtime
          </h2>
          <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
            Subscribe for maintenance tips, priority scheduling alerts, and case studies from our shop.
          </p>
          <EmailSignup source="homepage" dark />
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Run dev server to visually verify**

```bash
npm run dev
```
Open `http://localhost:5173`. Confirm hero, trust bar, services grid, why section, service area callout, and email opt-in all render correctly.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: build full Home page with hero, services, trust signals, service area callout"
```

---

## Task 13: Services Page

**Files:**
- Create: `src/pages/Services.jsx`

- [ ] **Step 1: Create Services.jsx**

```jsx
// src/pages/Services.jsx
import { Wrench, Activity, Cpu, Settings, ShoppingCart, Zap, ArrowRight } from 'lucide-react'
import PageSEO, { LOCAL_BUSINESS_SCHEMA } from '../components/seo/PageSEO'

const SERVICES = [
  {
    id: 'motor-rewind',
    icon: <Wrench size={36} strokeWidth={2} />,
    name: 'Electric Motor Rewind',
    description: 'We rewind AC and DC electric motors of all sizes — from fractional horsepower single-phase units to large three-phase industrial motors. Every rewind is performed to original equipment manufacturer specifications using premium magnet wire and insulation materials.',
    capabilities: [
      'AC and DC motors — all HP ranges',
      'Single-phase and three-phase stators',
      'Custom coil winding for obsolete motors',
      'Varnish impregnation and baking',
      'Pre/post rewind insulation testing (Megger, Surge)',
      'Load testing and certificate of compliance',
    ],
  },
  {
    id: 'servo-motor',
    icon: <Activity size={36} strokeWidth={2} />,
    name: 'Servo Motor Repair',
    description: 'Our technicians are trained to repair servo motors from all major manufacturers including Fanuc, Yaskawa, Allen-Bradley Kinetix, Siemens, and Bosch Rexroth. We perform precision encoder replacement, bearing replacement, and complete winding diagnostics.',
    capabilities: [
      'Fanuc, Yaskawa, AB Kinetix, Siemens, Bosch Rexroth',
      'Encoder replacement and calibration',
      'Precision bearing replacement',
      'Resolver and Hall-effect sensor repair',
      'Winding insulation and resistance testing',
      'Brake inspection and replacement',
    ],
  },
  {
    id: 'drive-repair',
    icon: <Cpu size={36} strokeWidth={2} />,
    name: 'AC/DC Drive & VFD Repair',
    description: 'Variable frequency drives and servo drives are repaired at the component level — not just swapped. We diagnose failed IGBTs, capacitor banks, gate driver boards, and control cards across all major drive manufacturers.',
    capabilities: [
      'Siemens, ABB, Allen-Bradley, Yaskawa, Lenze, Danfoss',
      'IGBT and power module replacement',
      'DC bus capacitor bank replacement',
      'Gate driver and control board repair',
      'Parameter backup and restoration',
      'Load-bank testing before return to service',
    ],
  },
  {
    id: 'plc-repair',
    icon: <Settings size={36} strokeWidth={2} />,
    name: 'PLC Repair',
    description: 'Programmable logic controller failure can halt an entire production line. We provide rapid board-level diagnostics and repair for the most common industrial PLC platforms, and can help source replacement modules when repair is not feasible.',
    capabilities: [
      'Allen-Bradley / Rockwell (MicroLogix, SLC, ControlLogix)',
      'Siemens S5, S7, TIA Portal platforms',
      'Mitsubishi FX and Q series',
      'Omron CJ and CS series',
      'Component-level I/O card repair',
      'Module sourcing and replacement',
    ],
  },
  {
    id: 'new-sales',
    icon: <ShoppingCart size={36} strokeWidth={2} />,
    name: 'New Motor & Equipment Sales',
    description: 'Need a new motor or drive instead of a repair? We source from leading manufacturers and can arrange drop-shipping directly to your facility. We also assist with motor selection, frame sizing, and installation support.',
    capabilities: [
      'NEMA and IEC frame motors',
      'General purpose and inverter-duty motors',
      'AC drives and soft starters',
      'Servo motor and drive packages',
      'Drop-ship to job site available',
      'Application and sizing consultation',
    ],
  },
  {
    id: 'electronics-repair',
    icon: <Zap size={36} strokeWidth={2} />,
    name: 'Electronics Repair',
    description: 'Beyond drives and PLCs, we repair a wide range of industrial electronic assemblies at the component level — including HMI displays, relay logic panels, power supplies, and custom control boards.',
    capabilities: [
      'HMI touchscreen and display repair',
      'Industrial power supply repair',
      'Relay logic and relay output boards',
      'Custom control board diagnostics',
      'Component-level PCB rework',
      'Conformal coating and potting removal',
    ],
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': SERVICES.map(s => ({
    '@type': 'Service',
    name: s.name,
    description: s.description,
    provider: {
      '@type': 'LocalBusiness',
      name: LOCAL_BUSINESS_SCHEMA.name,
      telephone: LOCAL_BUSINESS_SCHEMA.telephone,
    },
    areaServed: LOCAL_BUSINESS_SCHEMA.areaServed,
    url: `https://synergyindustrialsolutions.com/services#${s.id}`,
  })),
}

export default function Services({ onQuoteClick }) {
  const s = {
    muted: { color: 'var(--color-text-muted)', lineHeight: 1.7 },
  }

  return (
    <>
      <PageSEO
        title="Motor Rewind, Servo & Drive Repair Services | Synergy Industrial Solutions"
        description="Electric motor rewind, servo motor repair, AC/DC VFD drive repair, PLC repair, and new motor sales. Serving Chattanooga TN, North Alabama, and NW Georgia."
        canonical="/services"
        schema={SCHEMA}
      />

      {/* Hero */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '4rem 5%', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Industrial Repair Services
          </h1>
          <p style={{ fontSize: '1.15rem', ...s.muted }}>
            From electric motor rewind to servo systems and PLC repair — we provide component-level diagnostics and expert repair for the full range of industrial electromechanical equipment.
          </p>
        </div>
      </div>

      {/* Services */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 5%', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {SERVICES.map(({ id, icon, name, description, capabilities }) => (
          <section key={id} id={id} style={{ scrollMarginTop: '5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(249,115,22,0.1)', padding: '0.75rem', borderRadius: '0.5rem', flexShrink: 0 }}>
                {icon}
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>{name}</h2>
            </div>
            <p style={{ ...s.muted, fontSize: '1.05rem', marginBottom: '1.5rem' }}>{description}</p>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem', marginBottom: '1.75rem', listStyle: 'none', padding: 0 }}>
              {capabilities.map(c => (
                <li key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>✓</span>
                  {c}
                </li>
              ))}
            </ul>
            <button
              onClick={onQuoteClick}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.5rem', borderRadius: '0.5rem', border: '2px solid var(--color-accent)', backgroundColor: 'transparent', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Request {name} <ArrowRight size={16} />
            </button>
            <hr style={{ marginTop: '3rem', borderColor: 'var(--color-border)', borderStyle: 'solid', borderWidth: '1px 0 0' }} />
          </section>
        ))}
      </div>
    </>
  )
}
```

- [ ] **Step 2: Run dev server to verify**

```bash
npm run dev
```
Navigate to `http://localhost:5173/services`. Confirm all 6 services render with capabilities and CTA.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Services.jsx
git commit -m "feat: add Services page with 6 service sections and schema markup"
```

---

## Task 14: Service Area Page

**Files:**
- Create: `src/pages/ServiceArea.jsx`

- [ ] **Step 1: Create ServiceArea.jsx**

```jsx
// src/pages/ServiceArea.jsx
import { MapPin, Truck, Phone, Clock } from 'lucide-react'
import PageSEO, { LOCAL_BUSINESS_SCHEMA } from '../components/seo/PageSEO'

const COVERAGE = [
  { region: 'Tennessee', cities: ['Chattanooga', 'Cleveland', 'Athens', 'Dayton', 'Jasper', 'South Pittsburg', 'Dunlap'] },
  { region: 'North Alabama', cities: ['Scottsboro', 'Huntsville', 'Fort Payne', 'Gadsden', 'Guntersville', 'Rainsville', 'Albertville', 'Anniston', 'Boaz'] },
  { region: 'Northwest Georgia', cities: ['Dalton', 'Rome', 'Ringgold', 'Fort Oglethorpe', 'Calhoun', 'Cartersville'] },
]

const FAQS = [
  {
    q: 'Do you service Chattanooga, TN?',
    a: 'Yes — Chattanooga and the surrounding Hamilton County area are within our standard 100-mile service radius. We offer free pickup and delivery to customers throughout the Chattanooga metro.',
  },
  {
    q: 'How far will you travel for pickup?',
    a: 'We provide free pickup and delivery within 100 miles of our Stevenson, Alabama shop. This covers most of North Alabama, the Chattanooga TN metro, and Northwest Georgia.',
  },
  {
    q: 'Do you offer emergency or after-hours service?',
    a: 'Yes. We offer after-hours service for critical equipment failures. Call our main line at (877) 259-9187 and follow the prompts for urgent service.',
  },
  {
    q: 'What areas in North Alabama do you cover?',
    a: 'We regularly service Scottsboro, Huntsville, Fort Payne, Gadsden, Guntersville, Albertville, Boaz, Rainsville, and surrounding Jackson, DeKalb, and Madison Counties.',
  },
  {
    q: 'Can you pick up from a manufacturing facility?',
    a: 'Absolutely. We work with manufacturing plants, utilities, and maintenance shops throughout the region. We coordinate with your maintenance team for pickup scheduling to minimize downtime.',
  },
  {
    q: 'Is there a minimum job size for pickup service?',
    a: 'No minimum — we pick up motors and drives of any size, from fractional HP units to large industrial motors. Just call ahead to schedule.',
  },
]

const SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  '@type': 'LocalBusiness',
  hasMap: 'https://maps.google.com/?q=1208a+Kentucky+Ave+Stevenson+AL+35772',
  mainEntityOfPage: {
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  },
}

export default function ServiceArea({ onQuoteClick }) {
  const muted = { color: 'var(--color-text-muted)', lineHeight: 1.7 }

  return (
    <>
      <PageSEO
        title="Serving Chattanooga TN, North Alabama & NW Georgia | Synergy Industrial Solutions"
        description="Free pickup and delivery within 100 miles of Stevenson, AL. Serving Chattanooga TN, Huntsville AL, Fort Payne AL, Dalton GA, and surrounding areas for motor and drive repair."
        canonical="/service-area"
        schema={SCHEMA}
      />

      {/* Hero */}
      <div style={{ backgroundColor: 'var(--color-dark-hero)', padding: '5rem 5%', color: '#F1F5F9' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <MapPin size={40} color="#F97316" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Serving Chattanooga TN, North Alabama & NW Georgia
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94A3B8', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Free pickup and delivery within 100 miles of Stevenson, AL. We bring the shop to you — minimizing your downtime.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: <Truck size={18} />, text: 'Free Pickup & Delivery' },
              { icon: <Clock size={18} />, text: 'After-Hours Available' },
              { icon: <Phone size={18} />, text: '(877) 259-9187' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F97316', fontWeight: 700 }}>
                {icon} {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map placeholder + coverage */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* Map visual */}
          <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '2px dashed var(--color-border)', borderRadius: '1rem', aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
            <MapPin size={56} color="var(--color-accent)" />
            <div>
              <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text)' }}>Stevenson, AL 35772</p>
              <p style={{ ...muted, fontSize: '0.9rem' }}>Center of our 100-mile service radius</p>
            </div>
            <a
              href="https://maps.google.com/?q=1208a+Kentucky+Ave+Stevenson+AL+35772"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: '2px solid var(--color-accent)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.9rem' }}
            >
              View on Google Maps
            </a>
          </div>

          {/* Coverage list */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
              Coverage Area
            </h2>
            {COVERAGE.map(({ region, cities }) => (
              <div key={region} style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                  {region}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cities.map(c => (
                    <span key={c} style={{ padding: '0.3rem 0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '2rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            Common Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {FAQS.map(({ q, a }) => (
              <div key={q} style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>{q}</h3>
                <p style={{ ...muted, fontSize: '0.95rem' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Run dev server and verify `/service-area`**

```bash
npm run dev
```
Navigate to `http://localhost:5173/service-area`. Confirm hero, coverage grid, and FAQ cards render.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ServiceArea.jsx
git commit -m "feat: add ServiceArea page with coverage map, city grid, and FAQ schema"
```

---

## Task 15: About Page

**Files:**
- Create: `src/pages/About.jsx`

- [ ] **Step 1: Create About.jsx**

```jsx
// src/pages/About.jsx
import { Phone, Mail, MapPin } from 'lucide-react'
import PageSEO, { LOCAL_BUSINESS_SCHEMA } from '../components/seo/PageSEO'

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    LOCAL_BUSINESS_SCHEMA,
    {
      '@type': 'Person',
      name: 'Chris Timmons',
      jobTitle: 'Owner',
      worksFor: {
        '@type': 'LocalBusiness',
        name: 'Synergy Industrial Solutions',
        telephone: '+18772599187',
      },
    },
  ],
}

const DIFFERENTIATORS = [
  { title: 'Component-Level Repair', body: 'We repair at the board level — not just swap modules. That means faster turnaround and lower cost for you.' },
  { title: 'All Major Brands', body: 'Siemens, ABB, Yaskawa, Fanuc, Allen-Bradley, Schneider Electric — if it\'s in your facility, we work on it.' },
  { title: 'Local & Accountable', body: 'Locally owned and operated in Stevenson, AL. You deal directly with our technicians, not a call center.' },
  { title: 'Pickup & Delivery', body: 'Free pickup within 100 miles. We come to your facility, coordinate with your team, and return equipment fully tested.' },
]

export default function About({ onQuoteClick }) {
  const muted = { color: 'var(--color-text-muted)', lineHeight: 1.7 }

  return (
    <>
      <PageSEO
        title="About Synergy Industrial Solutions — Stevenson, AL"
        description="Synergy Industrial Solutions is a locally owned electric motor rewind and industrial electronics repair shop based in Stevenson, Alabama, serving the Chattanooga region."
        canonical="/about"
        schema={SCHEMA}
      />

      {/* Hero */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '5rem 5%', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--color-text)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            About Synergy Industrial Solutions
          </h1>
          <p style={{ fontSize: '1.15rem', ...muted }}>
            Locally owned and operated in Stevenson, Alabama — providing precision motor rewind, servo repair, and industrial electronics service to manufacturers throughout the Chattanooga region.
          </p>
        </div>
      </div>

      {/* Story */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 5%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Our Story
          </h2>
          <p style={{ ...muted, marginBottom: '1rem' }}>
            Synergy Industrial Solutions was founded with a single mission: give manufacturers and industrial facilities in North Alabama and the Chattanooga area access to expert motor rewind and electronics repair — without the delays and overhead of shipping equipment to distant service centers.
          </p>
          <p style={{ ...muted, marginBottom: '1rem' }}>
            Our shop is equipped with precision test equipment including Megger insulation testers, surge comparators, and load banks — the same tools used by the largest motor repair facilities in the region.
          </p>
          <p style={{ ...muted }}>
            Every job comes with documented pre- and post-repair test data. When we return your equipment, you know exactly what was done and how it performed on our test bench.
          </p>
        </div>

        {/* Photo placeholder */}
        <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '2px dashed var(--color-border)', borderRadius: '0.75rem', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.75rem', color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: '2.5rem' }}>📷</div>
          <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Shop photo coming soon</p>
        </div>
      </div>

      {/* Why different */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '5rem 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            What Sets Us Apart
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {DIFFERENTIATORS.map(({ title, body }) => (
              <div key={title} style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '0.75rem' }}>{title}</h3>
                <p style={{ ...muted, fontSize: '0.95rem' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '5rem 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Ready to Work Together?
        </h2>
        <p style={{ ...muted, marginBottom: '2rem' }}>
          Call us, email us, or request a quote online. We respond within 1 business hour.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+18772599187" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-accent)', color: '#fff', fontWeight: 700 }}>
            <Phone size={18} /> (877) 259-9187
          </a>
          <a href="mailto:Info@Synergyindsolutions.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', borderRadius: '0.5rem', border: '2px solid var(--color-border)', color: 'var(--color-text)', fontWeight: 700 }}>
            <Mail size={18} /> Email Us
          </a>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/About.jsx
git commit -m "feat: add About page with story, differentiators, and Person schema"
```

---

## Task 16: Contact Page

**Files:**
- Create: `src/pages/Contact.jsx`

- [ ] **Step 1: Create Contact.jsx**

```jsx
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

      {/* Hero */}
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

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 5%', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '4rem', alignItems: 'start' }}>
        {/* Contact info */}
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

          {/* FAQ */}
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

        {/* Form */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Contact.jsx
git commit -m "feat: add Contact page with lead form, FAQ schema, and contact info"
```

---

## Task 17: Firebase Functions — New Functions

**Files:**
- Modify: `functions/index.js` (add `handleEmailSignup`, `handleChat`, `handleInboundCall`)

- [ ] **Step 1: Add new functions to functions/index.js**

Replace the entire file:

```js
// functions/index.js
const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');

admin.initializeApp();

// ── Shared CORS helper ──────────────────────────────────────────────────────

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    res.set(CORS_HEADERS).status(204).send('');
    return true;
  }
  return false;
}

// ── handleNewLead ───────────────────────────────────────────────────────────
// Receives lead form submissions → Firestore leads collection
// Future: SMS to Chris via Twilio

exports.handleNewLead = onRequest({ cors: true }, async (req, res) => {
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { name, phone, email, service, message, notes, source } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'name and phone are required' });
  }

  try {
    const leadRef = await admin.firestore().collection('leads').add({
      name,
      phone,
      email: email || null,
      service: service || null,
      notes: message || notes || null,
      source: source || 'Web Form',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'new',
    });

    logger.info('New lead created', { leadId: leadRef.id, name, source });

    // TODO (next phase): Send SMS to Chris via Twilio
    // const chris = process.env.CHRIS_CELL;
    // await twilioClient.messages.create({ to: chris, from: process.env.TWILIO_FROM, body: `New lead: ${name} ${phone}` });

    res.status(200).json({ success: true, leadId: leadRef.id });
  } catch (err) {
    logger.error('handleNewLead error', err);
    res.status(500).json({ error: 'Failed to process lead' });
  }
});

// ── handleEmailSignup ───────────────────────────────────────────────────────
// Receives email opt-in → Firestore subscribers collection

exports.handleEmailSignup = onRequest({ cors: true }, async (req, res) => {
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { email, source } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    // Upsert by email to avoid duplicates
    const existing = await admin.firestore()
      .collection('subscribers')
      .where('email', '==', email.toLowerCase())
      .limit(1)
      .get();

    if (existing.empty) {
      await admin.firestore().collection('subscribers').add({
        email: email.toLowerCase(),
        source: source || 'website',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'active',
      });
    }

    logger.info('Email signup', { email, source });
    res.status(200).json({ success: true });
  } catch (err) {
    logger.error('handleEmailSignup error', err);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

// ── handleChat ──────────────────────────────────────────────────────────────
// Chat widget stub — returns a placeholder reply
// Replace the body with Claude/OpenAI API call when ready

exports.handleChat = onRequest({ cors: true }, async (req, res) => {
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' });
  }

  logger.info('Chat message received', { length: message.length });

  // ── STUB: Replace this block with AI API call ──
  const reply = [
    'Thanks for your message! For immediate assistance, please call us at (877) 259-9187.',
    'Great question. Our team handles motor rewind, servo repair, VFD/drive repair, and PLC repair. Want to request a quote?',
    'We serve the Chattanooga metro, North Alabama, and NW Georgia with free pickup and delivery within 100 miles of Stevenson, AL.',
  ][Math.floor(Math.random() * 3)];
  // ── END STUB ──

  res.status(200).json({ reply });
});

// ── handleInboundCall ───────────────────────────────────────────────────────
// Twilio webhook for inbound calls — ElevenLabs AI voice (DISABLED by default)
// To enable: set ELEVENLABS_ENABLED=true in Firebase env and point Twilio webhook here.
// Default behavior: thank the caller and hang up (VOIP handles the actual call).

exports.handleInboundCall = onRequest({ cors: false }, async (req, res) => {
  const enabled = process.env.ELEVENLABS_ENABLED === 'true';

  res.set('Content-Type', 'text/xml');

  if (!enabled) {
    // ElevenLabs not enabled — this endpoint should not be receiving calls.
    // Return minimal TwiML.
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you for calling Synergy Industrial Solutions. Please hold.</Say>
  <Hangup/>
</Response>`);
  }

  // ElevenLabs Conversational AI via Twilio Media Streams
  // Replace ELEVENLABS_AGENT_ID with your actual agent ID from ElevenLabs dashboard.
  const agentId = process.env.ELEVENLABS_AGENT_ID || '';
  const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`;

  return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="${wsUrl}">
      <Parameter name="agent_id" value="${agentId}"/>
    </Stream>
  </Connect>
</Response>`);
  // Note: Transfer to Chris's cell is handled by the ElevenLabs agent via a
  // tool call that triggers a separate Twilio REST API call using CHRIS_CELL env var.
});
```

- [ ] **Step 2: Commit**

```bash
git add functions/index.js
git commit -m "feat: add handleEmailSignup, handleChat stub, handleInboundCall (ElevenLabs, disabled by default)"
```

---

## Task 18: Environment Files

**Files:**
- Create: `.env.development`
- Create: `.env.production.example`

- [ ] **Step 1: Create .env.development**

```
# .env.development
# Firebase emulator URLs — run `firebase emulators:start` to use these
VITE_API_BASE=http://localhost:5001/synergy-portal/us-central1
```

> Note: Replace `synergy-portal` with your actual Firebase project ID from `.firebaserc` or the Firebase console.

- [ ] **Step 2: Create .env.production.example**

```
# .env.production.example — copy to .env.production and fill in real values
VITE_API_BASE=https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net
```

- [ ] **Step 3: Confirm .env files are in .gitignore**

```bash
cat .gitignore | grep -E "\.env"
```

If `.env` files are not listed, add them:
```bash
echo ".env.development" >> .gitignore
echo ".env.production" >> .gitignore
```

- [ ] **Step 4: Commit**

```bash
git add .env.production.example .gitignore
git commit -m "chore: add env file templates for Firebase Function URLs"
```

---

## Task 19: SEO Assets

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Step 1: Create robots.txt**

```txt
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://synergyindustrialsolutions.com/sitemap.xml
```

- [ ] **Step 2: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://synergyindustrialsolutions.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://synergyindustrialsolutions.com/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://synergyindustrialsolutions.com/service-area</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://synergyindustrialsolutions.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://synergyindustrialsolutions.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt public/sitemap.xml
git commit -m "feat: add robots.txt and sitemap.xml for SEO"
```

---

## Task 20: Build Verification + All Tests

- [ ] **Step 1: Run all tests**

```bash
npm test
```
Expected: all tests pass (ThemeToggle, Logo, Nav, LeadModal, EmailSignup, ChatWidget, PageSEO).

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: `dist/` folder generated with no errors. Check for any TypeScript or ESLint warnings and fix them.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```
Open `http://localhost:4173`. Spot-check each route: `/`, `/services`, `/service-area`, `/about`, `/contact`. Confirm dark mode toggle persists across page navigations. Confirm chat widget appears on all pages. Confirm no console errors.

- [ ] **Step 4: Verify Chris's cell is not in built output**

```bash
grep -r "256-548-2494" dist/ || grep -r "2565482494" dist/
```
Expected: no matches.

- [ ] **Step 5: Verify schema on homepage**

In the browser console on the production preview:
```js
document.querySelectorAll('script[type="application/ld+json"]')
```
Expected: at least one result with valid LocalBusiness schema.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: verified build passes, all tests green, SEO schema present"
```

---

## Post-Implementation: Firebase Deploy

After all tasks are complete, deploy with:

```bash
# Deploy hosting + functions
firebase deploy

# Or deploy separately
firebase deploy --only hosting
firebase deploy --only functions
```

The production URL will be shown in the Firebase console. Update `VITE_API_BASE` in your production environment to match the deployed function URLs.

---

## Env Variables Required in Firebase Functions

Set these in the Firebase console or via CLI before deploying:
```bash
# Chris's cell — NEVER commit this value
firebase functions:secrets:set CHRIS_CELL

# Twilio (set when ready to enable SMS)
firebase functions:secrets:set TWILIO_ACCOUNT_SID
firebase functions:secrets:set TWILIO_AUTH_TOKEN

# ElevenLabs (set when ready to enable AI voice)
firebase functions:secrets:set ELEVENLABS_API_KEY
firebase functions:secrets:set ELEVENLABS_AGENT_ID

# Default: ElevenLabs disabled
firebase functions:config:set app.elevenlabs_enabled="false"
```
