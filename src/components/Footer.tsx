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
  return { isMobile: width < 640, isTablet: width >= 640 && width < 1024 }
}

const Footer: React.FC = () => {
  const { isMobile, isTablet } = useBreakpoint()

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Tech', href: '#tech' },
  ]
  const services = ['Programmer', 'Quality Assurance', 'Data Analysis', 'UI/UX Design']
  const tech = ['Frontend', 'Mobile Dev', 'Backend', 'QA/Testing']
  const social = ['WhatsApp', 'Instagram', 'LinkedIn', 'GitHub']

  const colStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }

  const linkStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: '14px',
    transition: 'color 0.2s ease',
  }

  const columns = [
    { title: 'NAVIGATION', items: navLinks.map(l => ({ label: l.label, href: l.href })) },
    { title: 'SERVICES', items: services.map(s => ({ label: s, href: '#' })) },
    { title: 'SKILLS', items: tech.map(s => ({ label: s, href: '#' })) },
    { title: 'SOCIAL MEDIA', items: social.map(s => ({ label: s, href: '#' })) },
  ]

  /* ── grid columns:
     mobile  → 1 col (brand full-width, then 2×2 link grid)
     tablet  → 2 col (brand | links side by side, links 2×2)
     desktop → 5 col (original)
  ── */
  const gridTemplateColumns = isMobile
    ? '1fr'
    : isTablet
    ? '1fr 1fr'
    : '2fr 1fr 1fr 1fr 1fr'

  return (
    <footer style={{
      background: 'var(--black)',
      padding: isMobile ? '48px 20px 32px' : isTablet ? '64px 32px 40px' : '80px 40px 40px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Top grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns,
          gap: isMobile ? '36px' : isTablet ? '32px' : '40px',
          marginBottom: isMobile ? '40px' : '60px',
        }}>

          {/* Brand block — always first, full-width on mobile */}
          <div style={isMobile ? { gridColumn: '1 / -1' } : {}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '20px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '20px',
                color: 'white',
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '20px 4px 4px 20px',
                padding: '4px 14px',
              }}>KHAIRAL</span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '20px',
                color: 'var(--black)',
                background: 'var(--lime)',
                borderRadius: '4px 20px 20px 4px',
                padding: '4px 14px',
              }}>SATRIA</span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              lineHeight: 1.7,
              maxWidth: isMobile ? '100%' : '280px',
            }}>
              Building beautiful, performant web and mobile experiences. Available for freelance projects worldwide.
            </p>
          </div>

          {/* On tablet: wrap 4 link columns into a 2×2 sub-grid inside one cell */}
          {isTablet ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
            }}>
              {columns.map((col, i) => (
                <div key={i} style={colStyle}>
                  <h4 style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: '8px',
                  }}>{col.title}</h4>
                  {col.items.map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      style={linkStyle}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--lime)'}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                    >{item.label}</a>
                  ))}
                </div>
              ))}
            </div>
          ) : isMobile ? (
            /* On mobile: 2×2 grid, full width */
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '28px',
            }}>
              {columns.map((col, i) => (
                <div key={i} style={colStyle}>
                  <h4 style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: '8px',
                  }}>{col.title}</h4>
                  {col.items.map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      style={linkStyle}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--lime)'}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                    >{item.label}</a>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: 4 separate columns */
            columns.map((col, i) => (
              <div key={i} style={colStyle}>
                <h4 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '8px',
                }}>{col.title}</h4>
                {col.items.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    style={linkStyle}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--lime)'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                  >{item.label}</a>
                ))}
              </div>
            ))
          )}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '28px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '6px' : '0',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)',
          }}>© 2026 Khairal Satria.</span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)',
          }}>All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer