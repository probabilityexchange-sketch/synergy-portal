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
import ServiceLocation from './pages/ServiceLocation'

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
          {/* Programmatic SEO pages */}
          <Route path="/:service/:city" element={<Layout onQuoteClick={() => setQuoteOpen(true)}><ServiceLocation onQuoteClick={() => setQuoteOpen(true)} /></Layout>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
