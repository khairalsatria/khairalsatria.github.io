import React, { useState } from 'react'

const socials = [
  {
    label: 'Resume CV',
    icon: (
      <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', fontFamily: 'var(--font-display)' }}>
        CV
      </span>
    ),
    bg: '#1a3bff',
    glow: 'rgba(26,59,255,0.6)',
    href: 'https://drive.google.com/file/d/1_GFxwnIW4lIdVTfejOX0b0XaBSqL_YU3/view',
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    bg: '#1a3bff',
    glow: 'rgba(26,59,255,0.6)',
    href: 'https://www.linkedin.com/in/khairalsatriahaspi/',
  },
  {
    label: 'Email',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    bg: '#c5f400',
    glow: 'rgba(197,244,0,0.55)',
    color: '#0a0a0a',
    href: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWrRtsnVJwpgtFcpCbPzLnlDWMSvwxfgdkFVhJMSSrqrdzNzVtLSpclfzVvlXvHdDpNRgDqnb',
  },
  {
    label: 'WhatsApp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.52 3.48A11.91 11.91 0 0012.06 0C5.45 0 .09 5.36.09 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.19-1.62a11.94 11.94 0 005.87 1.5h.01c6.61 0 11.97-5.36 11.97-11.97 0-3.2-1.25-6.21-3.52-8.43zM12.07 21.7h-.01a9.74 9.74 0 01-4.97-1.37l-.36-.21-3.67.96.98-3.58-.23-.37a9.72 9.72 0 01-1.5-5.18c0-5.4 4.39-9.79 9.79-9.79 2.61 0 5.06 1.02 6.91 2.87a9.72 9.72 0 012.87 6.91c0 5.4-4.39 9.79-9.79 9.79zm5.44-7.3c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
      </svg>
    ),
    bg: '#c5f400',
    glow: 'rgba(197,244,0,0.55)',
    color: '#0a0a0a',
    href: 'https://wa.me/6281275645952',
  },
  {
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    bg: '#0a0a0a',
    glow: 'rgba(255,255,255,0.2)',
    href: 'https://www.instagram.com/khaiiral/',
  },
  {
    label: 'GitHub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    bg: '#0a0a0a',
    glow: 'rgba(255,255,255,0.2)',
    href: 'https://github.com/khairalsatria',
  },
]

const SocialBar: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <>
      <div style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        {socials.map((s, i) => {
          const isHovered = hoveredIdx === i

          return (
            <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

              {/* Tooltip label */}
              <div style={{
                position: 'absolute',
                left: '58px',
                background: s.bg,
                color: s.color || 'white',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '6px 12px',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(-8px) scale(0.92)',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: isHovered ? `0 4px 20px ${s.glow}` : 'none',
                // Arrow
              }}>
                {s.label}
                {/* Arrow pointing left */}
                <div style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0, height: 0,
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  borderRight: `5px solid ${s.bg}`,
                }} />
              </div>

              {/* Button */}
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  width: '48px',
                  height: '48px',
                  background: s.bg,
                  color: s.color || 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  borderRadius: '0 10px 10px 0',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  transform: isHovered
                    ? 'translateX(6px) scale(1.15)'
                    : 'translateX(-4px) scale(1)',
                  boxShadow: isHovered
                    ? `0 0 0 2px ${s.glow}, 0 8px 28px ${s.glow}, 0 0 40px ${s.glow}`
                    : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'none',
                }}
              >
                {/* Shimmer on hover */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }} />

                {/* Ripple ring */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '0 10px 10px 0',
                  boxShadow: `inset 0 0 0 ${isHovered ? '1px' : '0px'} rgba(255,255,255,0.4)`,
                  transition: 'box-shadow 0.3s ease',
                  pointerEvents: 'none',
                }} />

                {/* Icon — scale up on hover */}
                <div style={{
                  transform: isHovered ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  position: 'relative', zIndex: 1,
                }}>
                  {s.icon}
                </div>
              </a>
            </div>
          )
        })}
      </div>

      {/* Keyframes for pulse glow */}
      <style>{`
        @keyframes socialGlowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default SocialBar