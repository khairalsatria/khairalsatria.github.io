import React, { useState, useEffect } from 'react'

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['Work', 'About', 'Tech', 'Contact']

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '16px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(26,59,255,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '18px',
          color: scrolled ? 'white' : 'white',
          background: 'rgba(255,255,255,0.15)',
          border: '2px solid rgba(255,255,255,0.4)',
          borderRadius: '20px 4px 4px 20px',
          padding: '4px 14px',
          letterSpacing: '0.05em',
        }}>KHAIRAL</span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '18px',
          color: 'var(--black)',
          background: 'var(--lime)',
          borderRadius: '4px 20px 20px 4px',
          padding: '4px 14px',
          letterSpacing: '0.05em',
        }}>SATRIA</span>
      </div>

      {/* Nav Links */}
      <div style={{
        display: 'flex',
        gap: '4px',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '50px',
        padding: '6px',
      }}>
        {navLinks.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '14px',
            padding: '8px 20px',
            borderRadius: '50px',
            transition: 'all 0.2s ease',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.2)'
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = 'transparent'
          }}
          >{link}</a>
        ))}
      </div>

      {/* CTA */}
      <a href="https://wa.me/6281275645952" style={{
        background: 'var(--lime)',
        color: 'var(--black)',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '14px',
        padding: '10px 24px',
        borderRadius: '50px',
        textDecoration: 'none',
        border: '2px solid var(--lime)',
        transition: 'all 0.2s ease',
        letterSpacing: '0.02em',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'transparent'
        ;(e.currentTarget as HTMLElement).style.color = 'white'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'var(--lime)'
        ;(e.currentTarget as HTMLElement).style.color = 'var(--black)'
      }}
      >Hire me</a>
    </nav>
  )
}

export default Navbar
