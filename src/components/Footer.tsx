import React from 'react'

const Footer: React.FC = () => {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]
  const services = ['Programmer', 'Quality Assurance', 'Data Analysis', 'UI/UX Design']
  const stack = ['Frontend', 'Mobile Dev', 'Backend', 'QA/Testing']
  const social = ['GitHub', 'Instagram', 'LinkedIn', 'WhatsApp']

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

  return (
    <footer style={{
      background: 'var(--black)',
      padding: '80px 40px 40px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: '40px',
          marginBottom: '60px',
        }}>
          <div>
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
              maxWidth: '280px',
            }}>
              Building beautiful, performant web and mobile experiences. Available for freelance projects worldwide.
            </p>
          </div>

          {[
            { title: 'NAVIGATION', items: navLinks.map(l => ({ label: l.label, href: l.href })) },
            { title: 'SERVICES', items: services.map(s => ({ label: s, href: '#' })) },
            { title: 'SKILLS', items: stack.map(s => ({ label: s, href: '#' })) },
            { title: 'SOCIAL LINKS', items: social.map(s => ({ label: s, href: '#' })) },
          ].map((col, i) => (
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
                <a key={item.label} href={item.href} style={linkStyle}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--lime)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                >{item.label}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
          }}> All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
