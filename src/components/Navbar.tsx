import React, { useState, useEffect } from 'react'

function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return { isMobile: width <= 768 }
}

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = ['Work', 'About', 'Tech', 'Contact']

  const isActive = scrolled || menuOpen

  return (
    <>
      <style>{`
        .nav-link-item {
          color: white;
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 14px;
          padding: 8px 20px;
          border-radius: 50px;
          transition: background 0.2s ease;
          letter-spacing: 0.02em;
        }
        .nav-link-item:hover {
          background: rgba(255,255,255,0.2);
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: isMobile ? '12px 20px' : '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
        background: isActive ? 'rgba(26,59,255,0.97)' : 'transparent',
        backdropFilter: isActive ? 'blur(10px)' : 'none',
      }}>

        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '2px', textDecoration: 'none', flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: isMobile ? '15px' : '18px',
            color: 'white',
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.4)',
            borderRadius: '20px 4px 4px 20px',
            padding: isMobile ? '3px 10px' : '4px 14px',
            letterSpacing: '0.05em',
          }}>KHAIRAL</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: isMobile ? '15px' : '18px',
            color: 'var(--black)',
            background: 'var(--lime)',
            borderRadius: '4px 20px 20px 4px',
            padding: isMobile ? '3px 10px' : '4px 14px',
            letterSpacing: '0.05em',
          }}>SATRIA</span>
        </a>

        {/* Nav Links — Desktop only */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            gap: '4px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50px',
            padding: '6px',
          }}>
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link-item">
                {link}
              </a>
            ))}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* CTA — Desktop only */}
          {!isMobile && (
            <a
              href="https://wa.me/6281275645952"
              style={{
                background: 'var(--lime)', color: 'var(--black)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px',
                padding: '10px 24px', borderRadius: '50px', textDecoration: 'none',
                border: '2px solid var(--lime)', transition: 'all 0.2s ease',
                letterSpacing: '0.02em', cursor: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--lime)'
                e.currentTarget.style.color = 'var(--black)'
              }}
            >Hire me</a>
          )}

          {/* Hamburger — Mobile only */}
          {isMobile && (
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(prev => !prev)}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '5px',
                padding: '6px', borderRadius: '8px',
              }}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          )}
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      {isMobile && menuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 98,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              animation: 'fadeOverlay 0.2s ease',
            }}
          />

          {/* Drawer */}
          <div style={{
            position: 'fixed',
            top: '58px',
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'rgba(15,30,200,0.98)',
            backdropFilter: 'blur(16px)',
            padding: '16px 20px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            animation: 'slideDown 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {navLinks.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '17px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  transition: 'background 0.2s ease',
                  letterSpacing: '0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: i < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {link}
                <span style={{ opacity: 0.4, fontSize: '18px' }}>→</span>
              </a>
            ))}

            <a
              href="https://wa.me/6281275645952"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '16px',
                background: 'var(--lime)',
                color: 'var(--black)',
                textAlign: 'center',
                padding: '15px 24px',
                borderRadius: '50px',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
                border: '2px solid var(--lime)',
                transition: 'all 0.2s ease',
                gap: '8px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--lime)'
                e.currentTarget.style.color = 'var(--black)'
              }}
            >
              Hire me ✦
            </a>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar