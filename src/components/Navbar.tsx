import React, { useState, useEffect } from 'react'

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tutup menu saat resize ke desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navLinks = ['Work', 'About', 'Tech', 'Contact']

  const navBg = scrolled || menuOpen ? 'rgba(26,59,255,0.97)' : 'transparent'

  return (
    <>
      <style>{`
        .hamburger { display: none; }
        .nav-desktop-links { display: flex; }
        .nav-cta { display: block; }

        @media (max-width: 768px) {
          .hamburger { display: flex !important; }
          .nav-desktop-links { display: none !important; }
          .nav-cta { display: none !important; }
        }

        .hamburger span {
          display: block;
          width: 24px;
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
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        background: navBg,
        backdropFilter: scrolled || menuOpen ? 'blur(10px)' : 'none',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800, fontSize: '18px', color: 'white',
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.4)',
            borderRadius: '20px 4px 4px 20px',
            padding: '4px 14px', letterSpacing: '0.05em',
          }}>KHAIRAL</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800, fontSize: '18px', color: 'var(--black)',
            background: 'var(--lime)',
            borderRadius: '4px 20px 20px 4px',
            padding: '4px 14px', letterSpacing: '0.05em',
          }}>SATRIA</span>
        </div>

        {/* Nav Links — Desktop */}
        <div className="nav-desktop-links" style={{
          gap: '4px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50px',
          padding: '6px',
        }}>
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              color: 'white', textDecoration: 'none',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px',
              padding: '8px 20px', borderRadius: '50px',
              transition: 'all 0.2s ease', letterSpacing: '0.02em',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >{link}</a>
          ))}
        </div>

        {/* CTA — Desktop */}
        <a href="https://wa.me/6281275645952" className="nav-cta" style={{
          background: 'var(--lime)', color: 'var(--black)',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px',
          padding: '10px 24px', borderRadius: '50px', textDecoration: 'none',
          border: '2px solid var(--lime)', transition: 'all 0.2s ease',
          letterSpacing: '0.02em',
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

        {/* Hamburger — Mobile */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            flexDirection: 'column', gap: '5px', padding: '4px',
          }}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '60px', left: 0, right: 0,
          zIndex: 99,
          background: 'rgba(26,59,255,0.98)',
          backdropFilter: 'blur(12px)',
          padding: '20px 24px 28px',
          display: 'flex', flexDirection: 'column', gap: '4px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          animation: 'slideDown 0.25s ease',
        }}>
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'white', textDecoration: 'none',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px',
                padding: '14px 16px', borderRadius: '12px',
                transition: 'background 0.2s ease', letterSpacing: '0.02em',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >{link}</a>
          ))}
          <a href="https://wa.me/6281275645952"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block', marginTop: '12px',
              background: 'var(--lime)', color: 'var(--black)',
              textAlign: 'center', padding: '14px 24px',
              borderRadius: '50px', fontFamily: 'var(--font-display)',
              fontWeight: 700, fontSize: '15px', textDecoration: 'none',
              border: '2px solid var(--lime)', transition: 'all 0.2s ease',
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
        </div>
      )}
    </>
  )
}

export default Navbar