# Synergy Industrial Solutions — Public Site Overhaul Design Spec
**Date:** 2026-04-02  
**Scope:** Public-facing marketing website only (internal dashboard is a separate phase)

---

## Business Context

**Business:** Synergy Industrial Solutions  
**Address:** 1208a Kentucky Avenue, Stevenson, Alabama 35772  
**Phone:** 1-877-259-9187 (public)  
**Email:** Info@Synergyindsolutions.com  
**Owner:** Chris Timmons  
**Chris's cell:** Stored in Firebase environment variables only — never in source code or on the website  
**Service area:** 100-mile radius of Stevenson, AL — including Chattanooga TN metro, North Alabama, and NW Georgia  
**Competitive targets:** Chattanooga Industrial Motors, Tekwell, Chattanooga Armature Works

**Services offered:**
- Electric motor rewind
- Servo motor repair
- AC/DC drive repair (VFDs, servo drives)
- PLC repair
- New motor/equipment sales
- Electronics repair
- Pickup and delivery within 100 miles

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 19 + Vite |
| Routing | React Router v7 |
| SEO | react-helmet-async |
| Icons | lucide-react |
| Styling | CSS custom properties (no Tailwind) — inline styles migrated to CSS variables for dark mode support |
| Hosting | Firebase Hosting (Blaze plan) |
| Backend | Firebase Functions v2 (Node.js) |
| Database | Firestore |
| Email capture | Firestore `subscribers` collection |
| Lead capture | Firestore `leads` collection |
| Phone | VOIP (current default) — Twilio + ElevenLabs AI voice ready as opt-in |
| Chat widget | Stubbed to Firebase Function — AI model wired in later |

---

## Visual Design System

### Color Palette

| Token | Light Mode | Dark Mode |
|---|---|---|
| `--color-accent` | `#F97316` (orange) | `#F97316` (same) |
| `--color-accent-hover` | `#EA6C0A` | `#EA6C0A` |
| `--color-bg` | `#FFFFFF` | `#0F172A` |
| `--color-bg-secondary` | `#F8FAFC` | `#1E293B` |
| `--color-surface` | `#FFFFFF` | `#1E293B` |
| `--color-border` | `#E2E8F0` | `#334155` |
| `--color-text` | `#1E293B` | `#F1F5F9` |
| `--color-text-muted` | `#64748B` | `#94A3B8` |
| `--color-text-inverse` | `#FFFFFF` | `#0F172A` |

### Typography
- Font: Inter (Google Fonts)
- H1: 4rem–4.5rem, weight 900, tracking -0.025em
- H2: 2.25rem–2.5rem, weight 800
- H3: 1.5rem, weight 700
- Body: 1rem–1.125rem, weight 400, line-height 1.6
- Nav links: 1rem, weight 600

### Dark Mode Implementation
- `data-theme="dark"` attribute on `<html>` element
- All colors defined as CSS custom properties; flipping `data-theme` remaps all tokens in one step
- Toggle: sun/moon icon button in top nav
- State persisted to `localStorage` key `theme`
- 200ms CSS transition on background-color and color properties
- Default: light mode

### Logo / Wordmark
- SVG built in code — no external file dependency
- Visual: simplified 6-axis robot arm silhouette in `#F97316` orange
- Text: **SYNERGY** in heavy weight (900) black/white + **Industrial Solutions** in orange, weight 600
- Scales cleanly from 32px nav height to full-size hero usage

---

## Site Architecture

### Routes

| Path | Component | Page Title | Schema Type |
|---|---|---|---|
| `/` | `<Home>` | "Electric Motor Rewind & Industrial Repair — Stevenson AL \| Synergy Industrial" | `LocalBusiness`, `WebSite` |
| `/services` | `<Services>` | "Motor Rewind, Servo & Drive Repair Services \| Synergy Industrial Solutions" | `Service` (one per service) |
| `/service-area` | `<ServiceArea>` | "Serving Chattanooga TN, North Alabama & NW Georgia \| Synergy Industrial Solutions" | `LocalBusiness` with `areaServed` |
| `/about` | `<About>` | "About Synergy Industrial Solutions — Stevenson, AL" | `Person` + `LocalBusiness` |
| `/contact` | `<Contact>` | "Contact Us \| Synergy Industrial Solutions" | `LocalBusiness`, `ContactPage` |

### SEO Infrastructure (every page)
- Unique `<title>`, `<meta name="description">`, `<link rel="canonical">`
- JSON-LD schema block via `react-helmet-async`
- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- Proper heading hierarchy: one `<h1>` per page, `<h2>` for sections
- `robots.txt` and `sitemap.xml` generated at build time via Vite plugin or static file

### Schema Highlights
- `LocalBusiness`: real address, real phone, `geo` coordinates for Stevenson AL, `openingHours: "Mo-Fr 07:00-17:00"`, plus "After-hours service available" in description
- `areaServed` on service-area page: Hamilton County TN, Jackson County AL, Madison County AL, DeKalb County AL, Whitfield County GA (and surrounding)
- `Service` schema on services page: one block per service with `name`, `description`, `provider`, `areaServed`
- `/contact` page FAQ schema for questions like "Do you service Chattanooga?", "How far will you travel?", "Do you offer pickup?" — targets Google AI Overviews

---

## Navigation

### Desktop Top Nav (left → right)
`[Logo/Wordmark]` | Services | Service Area | About | Contact | `[☀️/🌙 toggle]` | `📞 (877) 259-9187` | `[Get a Quote]` (orange button)

### Mobile Nav
Hamburger → slide-in drawer with same links. Call button always visible in mobile header (prominent, tap-to-call).

### Notes
- Chris's cell phone is NOT in the nav, site, or source code
- The public 877 number routes to his VOIP system
- "Get a Quote" opens a modal lead form on all pages

---

## Page Designs

### Home (`/`)

1. **Hero** — Dark slate background, orange accents. Left: headline + subtext + 2 CTAs. Right: cutaway motor or robot arm illustration (SVG or high-quality image).
   - H1: *"Expert Motor Rewind & Industrial Electronics Repair"*
   - Subtext: *"Serving the Chattanooga metro, North Alabama, and NW Georgia. Pickup and delivery within 100 miles of Stevenson, AL."*
   - CTA 1: **Call (877) 259-9187** (tel link)
   - CTA 2: **Get a Free Quote** (opens modal lead form)

2. **Trust Bar** — Horizontal logo strip: Siemens, ABB, Schneider Electric, FANUC, Yaskawa. Plus badges: "100-Mile Pickup & Delivery", "Locally Owned & Operated", "Emergency Service Available".

3. **Services Overview** — 3×2 card grid. Each card: orange icon, service name (H3), 2-sentence description, "Learn More →" link to `/services`.
   - Motor Rewind | Servo Motors | AC/DC Drive Repair | PLC Repair | New Sales | Electronics Repair

4. **Why Choose Synergy** — 3-column: Fast Turnaround / Pickup & Delivery / Expert Diagnostics. Icons, short copy.

5. **Service Area Callout** — Map visual (static embed or image) + city list led by Chattanooga. *"We come to you — anywhere within 100 miles of Stevenson, AL."*

6. **Email Opt-In Band** — Dark slate. *"Get maintenance tips and priority scheduling."* Email input + submit → Firestore `subscribers`.

7. **Footer** — Address, phone, email, nav links, social placeholders, copyright.

8. **Floating Chat Widget** — Orange button, bottom-right, all pages. Opens slide-up chat panel. Stubbed to Firebase Function.

---

### Services (`/services`)

Five stacked sections, each with:
- `<h2>` heading (keyword-optimized)
- 3–4 sentences of description
- Bulleted capability list
- "Request This Service" CTA → Contact modal

Services:
1. Electric Motor Rewind — AC/DC motors, custom stators, all HP ranges
2. Servo Motor Repair — encoder replacement, precision alignment, all major brands
3. AC/DC Drive & VFD Repair — component-level board repair, Siemens/ABB/Allen-Bradley/Yaskawa
4. PLC Repair — Allen-Bradley, Siemens, Mitsubishi, Omron
5. New Motor & Equipment Sales — sourcing, drop shipping, installation support
6. Electronics Repair — component-level PCB repair, industrial control boards

---

### Service Area (`/service-area`)

- Hero: *"Serving Chattanooga TN, North Alabama & NW Georgia"*
- Static SVG map showing 100-mile radius from Stevenson AL (no Google Maps API key required; real embed can be added later)
- City/county list: Chattanooga TN, Scottsboro AL, Huntsville AL, Fort Payne AL, Gadsden AL, Dalton GA, Rome GA, Cleveland TN, Athens TN, and more
- Pickup & Delivery callout section
- FAQ section (schema-marked for AI Overviews):
  - "Do you service Chattanooga, TN?"
  - "How far will you travel for pickup?"
  - "Do you offer emergency service?"
  - "What areas do you cover in North Alabama?"

---

### About (`/about`)

- Chris's background and experience (placeholder copy, structured for him to fill in)
- Shop history and mission
- What makes Synergy different vs. larger competitors
- Photo placeholder (structured layout ready for real photos)
- `Person` schema for Chris: name, `jobTitle: "Owner"`, worksFor → Synergy Industrial Solutions

---

### Contact (`/contact`)

- Lead form: Name, Phone, Email, Service Needed (dropdown), Message → Firebase Function `handleNewLead` → Firestore `leads`
- Large tap-to-call button: **Call (877) 259-9187**
- Address with Google Maps deep link
- Email link: Info@Synergyindsolutions.com
- *"We respond within 1 business hour"* expectation setter
- FAQ schema (same as service-area, reinforces AI Overview presence)

---

## Feature Integration Details

### Dark Mode Toggle
- Component: `<ThemeToggle>` — sun/moon icon, in nav
- On mount: reads `localStorage.getItem('theme')`, applies to `<html data-theme>`
- On toggle: flips theme, writes to `localStorage`
- CSS transitions: 200ms ease on all color/background properties

### Email Opt-In
- Component: `<EmailSignup>` — used on homepage and footer
- On submit: POST to Firebase Function `handleEmailSignup`
- Function writes `{ email, source, createdAt, status: 'active' }` to Firestore `subscribers`
- UI shows inline success/error state, no page reload

### Lead Form / Quote Modal
- Component: `<LeadModal>` — reusable, triggered from any "Get a Quote" / "Request Service" CTA
- Fields: name, phone, email, service (dropdown), message
- POST to existing Firebase Function `handleNewLead` → Firestore `leads`
- Future: Function sends SMS to Chris via Twilio (env var for his cell, never hardcoded)

### Chat Widget
- Component: `<ChatWidget>` — floating button + slide-up panel
- Sends messages to Firebase Function `handleChat`
- Function returns stubbed response for now
- Designed for drop-in AI: changing the Function is the only change needed to go live with Claude/OpenAI

### Twilio + ElevenLabs (phone — backend only)
- Firebase Function `handleInboundCall` built and deployed but **disabled by default**
- Default: 877 number routes to Chris's VOIP — no Firebase Function in the call path
- To enable ElevenLabs AI: point Twilio webhook to the function URL + set `ELEVENLABS_ENABLED=true` env var
- If AI is active and caller requests a human: Twilio `<Dial>` to Chris's cell (from env var `CHRIS_CELL`)
- All call leads captured to Firestore `leads` with `source: 'phone'`

---

## Firebase Structure

### Firestore Collections
```
leads/          { name, phone, email, service, notes, source, createdAt, status }
subscribers/    { email, source, createdAt, status }
```

### Firebase Functions
| Function | Trigger | Purpose |
|---|---|---|
| `handleNewLead` | HTTP POST | Lead form → Firestore, future SMS to Chris |
| `handleEmailSignup` | HTTP POST | Email opt-in → Firestore subscribers |
| `handleChat` | HTTP POST | Chat widget stub — AI model added later |
| `handleInboundCall` | HTTP (Twilio webhook) | ElevenLabs AI voice — disabled by default |

### Environment Variables (never in source)
```
CHRIS_CELL=+12565482494
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
ELEVENLABS_API_KEY=
ELEVENLABS_AGENT_ID=
ELEVENLABS_ENABLED=false
```

---

## File Structure (new)

```
src/
  components/
    layout/
      Nav.jsx           # Top nav with dark mode toggle, call button
      Footer.jsx        # Footer with address, links
    ui/
      ThemeToggle.jsx   # Sun/moon toggle button
      LeadModal.jsx     # Reusable quote/lead form modal
      EmailSignup.jsx   # Email opt-in form
      ChatWidget.jsx    # Floating chat button + panel
    seo/
      PageSEO.jsx       # Wrapper: helmet + JSON-LD schema per page
    brand/
      Logo.jsx          # SVG 6-axis robot arm + wordmark
  pages/
    Home.jsx
    Services.jsx
    ServiceArea.jsx
    About.jsx
    Contact.jsx
  styles/
    tokens.css          # CSS custom properties (light + dark theme)
    global.css          # Base resets, typography
  App.jsx               # Routes
  main.jsx
functions/
  index.js              # All Firebase Functions
public/
  robots.txt
  sitemap.xml
```

---

## Out of Scope (this phase)
- Internal dashboard (motor rewind workflow, job queue, diagnostic screens)
- Customer job-tracking portal
- Online payment / invoicing
- Real-time inventory management
- Twilio SMS notifications (stubbed, wired in next phase)
- AI chat model (stubbed, wired in next phase)
