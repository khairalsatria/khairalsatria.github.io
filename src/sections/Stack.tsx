import React, { useState, useEffect, useRef } from 'react'

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const stackItems = [
  { name: 'React.js',   src: `${CDN}/react/react-original.svg` },
  { name: 'Flutter',    src: `${CDN}/flutter/flutter-original.svg` },
  { name: 'Next.js',    src: `${CDN}/nextjs/nextjs-original.svg` },
  { name: 'Vue.js',     src: `${CDN}/vuejs/vuejs-original.svg` },
  { name: 'JavaScript', src: `${CDN}/javascript/javascript-original.svg` },
  { name: 'TypeScript', src: `${CDN}/typescript/typescript-original.svg` },
  { name: 'HTML/CSS',   src: `${CDN}/html5/html5-original.svg` },
  { name: 'Tailwind',   src: `${CDN}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Golang',     src: `${CDN}/go/go-original.svg` },
  { name: 'PHP',        src: `${CDN}/php/php-original.svg` },
  { name: 'Laravel',    src: `${CDN}/laravel/laravel-original.svg` },
  { name: 'Node.js',    src: `${CDN}/nodejs/nodejs-original.svg` },
  { name: 'Rest API',   src: `${CDN}/fastapi/fastapi-original.svg` },
  { name: 'SQL',        src: `${CDN}/mysql/mysql-original.svg` },
  { name: 'MongoDB',    src: `${CDN}/mongodb/mongodb-original.svg` },
  { name: 'PostgreSQL', src: `${CDN}/postgresql/postgresql-original.svg` },
  { name: 'Figma',      src: `${CDN}/figma/figma-original.svg` },
  { name: 'GitHub',     src: `${CDN}/github/github-original.svg` },
  { name: 'GitLab',     src: `${CDN}/gitlab/gitlab-original.svg` },
  { name: 'Postman',    src: `${CDN}/postman/postman-original.svg` },
  { name: 'Selenium',   src: `${CDN}/selenium/selenium-original.svg` },
  { name: 'Power BI',   src: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
  { name: 'VsCode',     src: `${CDN}/vscode/vscode-original.svg` },
  { name: 'Vercel',     src: `${CDN}/vercel/vercel-original.svg` },
  { name: 'Firebase',   src: `${CDN}/firebase/firebase-plain.svg` },
  { name: 'Docker',     src: `${CDN}/docker/docker-original.svg` },
  { name: 'WordPress',  src: `${CDN}/wordpress/wordpress-original.svg` },
]

// Arah mencar dari berbagai posisi — berulang sesuai index
const directions = [
  { x: -80, y: -80 },  // kiri atas
  { x: 0,   y: -100 }, // atas
  { x: 80,  y: -80 },  // kanan atas
  { x: 100, y: 0 },    // kanan
  { x: 80,  y: 80 },   // kanan bawah
  { x: 0,   y: 100 },  // bawah
  { x: -80, y: 80 },   // kiri bawah
  { x: -100,y: 0 },    // kiri
]

const Stack: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null)
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  // Observe header
  useEffect(() => {
    if (!headerRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.2 }
    )
    obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  // Observe section — trigger all cards once section enters viewport
  useEffect(() => {
    if (!sectionRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger each card with a small delay
          stackItems.forEach((_, i) => {
            setTimeout(() => {
              setVisibleSet(prev => new Set([...prev, i]))
            }, i * 45)
          })
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="stack" style={{ padding: '100px 40px', background: 'white', borderTop: '2px solid var(--light)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '60px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
            letterSpacing: '0.15em', color: 'var(--blue)', marginBottom: '16px',
          }}>TECH STACK</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1,
          }}>Tools I work with</h2>
        </div>

        {/* Grid */}
        <div
          ref={sectionRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '12px',
          }}
        >
          {stackItems.map((item, i) => {
            const dir = directions[i % directions.length]
            const isVisible = visibleSet.has(i)
            const isHovered = hovered === item.name

            return (
              <div
                key={item.name}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '20px 8px',
                  borderRadius: '16px',
                  border: `1.5px solid ${isHovered ? 'var(--blue)' : 'var(--border)'}`,
                  background: isHovered ? 'var(--light)' : 'white',
                  cursor: 'none',

                  // Scatter-in animation
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? isHovered ? 'translateY(-6px) scale(1.06)' : 'translateY(0) scale(1)'
                    : `translate(${dir.x}px, ${dir.y}px) scale(0.6)`,

                  transition: isVisible
                    ? `opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease`
                    : 'none',

                  boxShadow: isHovered ? '0 8px 28px rgba(26,59,255,0.14)' : 'none',
                }}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  style={{
                    width: '40px', height: '40px', objectFit: 'contain',
                    transition: 'transform 0.3s ease',
                    transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                    filter: isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' : 'none',
                  }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                  color: isHovered ? 'var(--blue)' : 'var(--gray)',
                  textAlign: 'center', lineHeight: 1.3,
                  transition: 'color 0.2s ease',
                }}>{item.name}</span>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Stack