import React, { useEffect, useRef } from 'react'

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId: number

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const TOTAL = 90
    const particles = Array.from({ length: TOTAL }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.8 + 0.8,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.6 + 0.35,
      color: Math.random() > 0.65 ? '#c5f400' : 'rgba(255,255,255,1)',
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.22 * (1 - dist / 160)})`
            ctx.lineWidth = 0.9
            ctx.stroke()
          }
        }
      }
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
      })
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
    />
  )
}

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
    <section
      id="home"
      style={{
        minHeight: '100vh',
        background: 'var(--blue)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
      }}
    >
      {/* Background layers — tidak berubah */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 60% at 10% 20%, rgba(197,244,0,0.22) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 90% 80%, rgba(255,255,255,0.14) 0%, transparent 55%),
          radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,20,120,0.45) 0%, transparent 70%)
        `,
        animation: 'auroraPulse 10s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', inset: '-100px', zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        animation: 'gridDrift 20s linear infinite',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 80px, rgba(197,244,0,0.07) 80px, rgba(197,244,0,0.07) 81px)`,
        animation: 'diagonalSlide 18s linear infinite',
      }} />
      <div style={{
        position: 'absolute', width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(197,244,0,0.22) 0%, transparent 70%)',
        borderRadius: '50%', top: '-250px', right: '-150px',
        filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none',
        animation: 'blobFloat1 12s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)',
        borderRadius: '50%', bottom: '-150px', left: '-120px',
        filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none',
        animation: 'blobFloat2 15s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(197,244,0,0.18) 0%, transparent 70%)',
        borderRadius: '50%', top: '40%', left: '15%',
        filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none',
        animation: 'blobFloat1 9s ease-in-out infinite alternate-reverse',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        opacity: 0.07,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
      }} />
      <ParticleCanvas />

      {/* Available badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '50px', padding: '8px 20px',
        marginBottom: '40px',
        animation: 'fadeIn 0.6s ease forwards',
        position: 'relative', zIndex: 10,
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          width: '8px', height: '8px',
          background: 'var(--lime)', borderRadius: '50%',
          animation: 'pulse 2s ease infinite',
          boxShadow: '0 0 0 4px rgba(197,244,0,0.2)',
        }} />
        <span style={{
          color: 'white', fontFamily: 'var(--font-mono)',
          fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
        }}>AVAILABLE FOR FREELANCE</span>
      </div>

      {/* Main Title */}
      <div ref={titleRef} style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(44px, 12vw, 180px)',
          lineHeight: 0.85, letterSpacing: '-0.03em',
          color: 'var(--lime)',
          textShadow: '6px 6px 0 rgba(0,0,0,0.2)',
        }}>Hello, I Am</div>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(40px, 10vw, 150px)',
          lineHeight: 0.9, letterSpacing: '-0.03em',
          color: 'white',
          textShadow: '6px 6px 0 rgba(0,0,0,0.15)',
        }}>KHAIRAL</div>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(40px, 10vw, 150px)',
          lineHeight: 0.9, letterSpacing: '-0.03em',
          color: 'white',
          textShadow: '6px 6px 0 rgba(0,0,0,0.15)',
        }}>
          SATRIA
          <span style={{
            display: 'inline-block', width: '0.15em', height: '0.8em',
            background: 'var(--lime)', marginLeft: '8px',
            verticalAlign: 'middle', animation: 'blink 1s ease infinite',
          }} />
        </div>
      </div>

      {/* ── Floating cards: HANYA tampil di desktop ── */}
      <style>{`
        .hero-float-cards { display: contents; }

        @media (max-width: 900px) {
          .hero-float-cards { display: none; }
        }

        /* Mobile: stats row di bawah title */
        .hero-mobile-stats {
          display: none;
          position: relative;
          zIndex: 10;
          margin-top: 40px;
          width: 100%;
          max-width: 480px;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .hero-mobile-stats { display: flex; }
        }

        .hero-stat-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 50px;
          padding: 10px 18px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
        }

        @keyframes auroraPulse {
          0%   { opacity: 0.8; transform: scale(1) rotate(0deg); }
          50%  { opacity: 1;   transform: scale(1.08) rotate(1deg); }
          100% { opacity: 0.85; transform: scale(1.03) rotate(-1deg); }
        }
        @keyframes gridDrift {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes diagonalSlide {
          0%   { background-position: 0 0; }
          100% { background-position: 113px 113px; }
        }
        @keyframes blobFloat1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes blobFloat2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-30px, -40px) scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(197,244,0,0.2); }
          50%       { box-shadow: 0 0 0 6px rgba(197,244,0,0.35); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Desktop floating cards */}
      <div className="hero-float-cards">
        {/* Card 1 - Top Right */}
        <div style={{
          position: 'absolute', right: '60px', top: '180px', zIndex: 10,
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '20px', padding: '20px 24px',
          animation: 'float 4s ease-in-out infinite',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}>
          <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>IT Enthusiast</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>1+ yrs experience</div>
        </div>

        {/* Card 2 - Bottom Right */}
        <div style={{
          position: 'absolute', right: '200px', bottom: '100px', zIndex: 10,
          background: 'var(--lime)', borderRadius: '20px', padding: '20px 24px',
          animation: 'float2 4.5s ease-in-out infinite',
          boxShadow: '0 12px 40px rgba(197,244,0,0.35)',
        }}>
          <div style={{ color: 'var(--black)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, marginBottom: '4px', letterSpacing: '0.1em' }}>PROJECTS</div>
          <div style={{ color: 'var(--black)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px' }}>10+</div>
        </div>

        {/* Card 3 - Top Left */}
        <div style={{
          position: 'absolute', left: '140px', top: '110px', zIndex: 10,
          background: 'var(--lime)', borderRadius: '20px', padding: '20px 24px',
          animation: 'float 6s ease-in-out infinite',
          display: 'flex', alignItems: 'center', gap: '12px',
          boxShadow: '0 12px 40px rgba(197,244,0,0.3)',
        }}>
          <div style={{ fontSize: '18px' }}>⚡</div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--black)', marginBottom: '2px' }}>AVAILABLE NOW</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px', color: 'var(--black)' }}>Open for work</div>
          </div>
        </div>

        {/* Card 4 - Bottom Left */}
        <div style={{
          position: 'absolute', left: '200px', bottom: '80px', zIndex: 10,
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '20px', padding: '20px 24px',
          animation: 'float2 5s ease-in-out infinite',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '12px' }}>Skills Open</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['Frontend', 'Mobile', 'Backend', 'Fullstack', 'UI/UX', 'QA', 'Data'].map(tech => (
              <div key={tech} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', background: 'var(--lime)', borderRadius: '50%' }} />
                <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px' }}>{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5 - Center Right badge */}
        <div style={{
          position: 'absolute', right: '80px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
          background: 'rgba(26,59,255,0.7)', backdropFilter: 'blur(12px)',
          border: '2px solid var(--lime)',
          borderRadius: '50px', padding: '12px 20px',
          animation: 'float 7s ease-in-out infinite',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 0 0 4px rgba(197,244,0,0.1)',
        }}>
          <div style={{ width: '8px', height: '8px', background: 'var(--lime)', borderRadius: '50%', animation: 'pulse 1.5s ease infinite', boxShadow: '0 0 0 3px rgba(197,244,0,0.2)' }} />
          <span style={{ color: 'white', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}>Technology</span>
        </div>
      </div>

      {/* Mobile stats pills — tampil di bawah title */}
      <div className="hero-mobile-stats" style={{ position: 'relative', zIndex: 10, marginTop: '40px' }}>
        <div className="hero-stat-pill">
          <span style={{ fontSize: '16px' }}>⚡</span>
          <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px' }}>Open for Work</span>
        </div>
        <div className="hero-stat-pill" style={{ background: 'var(--lime)', border: 'none' }}>
          <span style={{ color: 'var(--black)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>PROJECTS</span>
          <span style={{ color: 'var(--black)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px' }}>10+</span>
        </div>
        <div className="hero-stat-pill">
          <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px' }}>IT Enthusiast</span>
        </div>
        <div className="hero-stat-pill" style={{ width: '100%', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {['Frontend', 'Mobile', 'Backend', 'UI/UX', 'QA'].map(tech => (
            <div key={tech} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '5px', height: '5px', background: 'var(--lime)', borderRadius: '50%' }} />
              <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px' }}>{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        opacity: 0.6, zIndex: 10,
      }}>
        <span style={{ color: 'white', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em' }}>SCROLL DOWN</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, white, transparent)', animation: 'float 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}

export default Hero