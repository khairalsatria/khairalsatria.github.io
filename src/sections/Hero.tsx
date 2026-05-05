import React, { useEffect, useRef } from 'react'

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(60px)'
    setTimeout(() => {
      el.style.transition = 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 100)
  }, [])

  return (
    <section id="home" className="grid-bg" style={{
      minHeight: '100vh',
      background: 'var(--blue)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 40px 60px',
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'rgba(197,244,0,0.08)',
        borderRadius: '50%',
        top: '-200px',
        right: '-100px',
        filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        bottom: '-100px',
        left: '-100px',
        filter: 'blur(60px)',
      }} />

      {/* Available badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '50px',
        padding: '8px 20px',
        marginBottom: '40px',
        animation: 'fadeIn 0.6s ease forwards',
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          background: 'var(--lime)',
          borderRadius: '50%',
          animation: 'pulse 2s ease infinite',
          boxShadow: '0 0 0 4px rgba(197,244,0,0.2)',
        }} />
        <span style={{
          color: 'white',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.1em',
        }}>AVAILABLE FOR FREELANCE</span>
      </div>

      {/* Main Title */}
      <div ref={titleRef} style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(80px, 15vw, 180px)',
          lineHeight: 0.85,
          letterSpacing: '-0.03em',
          color: 'var(--lime)',
          textShadow: '6px 6px 0 rgba(0,0,0,0.2)',
        }}>Hello, I am</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(60px, 12vw, 150px)',
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          color: 'white',
          textShadow: '6px 6px 0 rgba(0,0,0,0.15)',
        }}>KHAIRAL</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(60px, 12vw, 150px)',
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          color: 'white',
          textShadow: '6px 6px 0 rgba(0,0,0,0.15)',
        }}>SATRIA
          <span style={{
            display: 'inline-block',
            width: '0.15em',
            height: '0.8em',
            background: 'var(--lime)',
            marginLeft: '8px',
            verticalAlign: 'middle',
            animation: 'blink 1s ease infinite',
          }} />
        </div>
      </div>

      {/* Floating cards */}
      <div style={{
        position: 'absolute',
        right: '60px',
        top: '180px',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '20px',
        padding: '20px 24px',
        animation: 'float 4s ease-in-out infinite',
      }}>
        <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>IT Enthusiast</div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>1+ yrs experience</div>
      </div>

      <div style={{
        position: 'absolute',
        right: '200px',
        bottom: '100px',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '20px',
        padding: '20px 24px',
        animation: 'float2 4.5s ease-in-out infinite',
      }}>
        <div style={{ color: 'var(--lime)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, marginBottom: '4px', letterSpacing: '0.1em' }}>PROJECTS</div>
        <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px' }}>10+</div>
      </div>

      {/* Card 3 - Top Left */}
      <div style={{
        position: 'absolute',
        left: '60px',
        top: '180px',
        background: 'var(--lime)',
        borderRadius: '20px',
        padding: '20px 24px',
        animation: 'float 6s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'var(--black)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
        }}>⚡</div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--black)', marginBottom: '2px' }}>AVAILABLE NOW</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px', color: 'var(--black)' }}>Open for work</div>
        </div>
      </div>

      {/* Card 4 - Bottom Right */}
      <div style={{
        position: 'absolute',
        left: '180px',
        bottom: '60px',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '20px',
        padding: '20px 24px',
        animation: 'float2 5s ease-in-out infinite',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '12px' }}>LATEST STACK</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {['Frontend', 'Mobile', 'Backend', 'Fullstack', 'UI/UX', 'QA', 'Data'].map(tech => (
            <div key={tech} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{ width: '6px', height: '6px', background: 'var(--lime)', borderRadius: '50%' }} />
              <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px' }}>{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 5 - Center Right (mini badge) */}
      <div style={{
        position: 'absolute',
        right: '80px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'var(--blue)',
        border: '2px solid var(--lime)',
        borderRadius: '50px',
        padding: '12px 20px',
        animation: 'float 7s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          background: 'var(--lime)',
          borderRadius: '50%',
          animation: 'pulse 1.5s ease infinite',
          boxShadow: '0 0 0 3px rgba(197,244,0,0.2)',
        }} />
        <span style={{ color: 'white', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}>Technology</span>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.6,
      }}>
        <span style={{ color: 'white', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em' }}>SCROLL DOWN</span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, white, transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}

export default Hero
