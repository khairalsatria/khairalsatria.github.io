import React, { useState, useEffect, useRef } from 'react'

interface Project {
  id: number
  title: string
  category: string
  tags: string[]
  color: string
  accentColor: string
  year: string
  description: string
  link: string
  screenshots: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: 'JDIH BKN',
    category: 'Web Dev',
    tags: ['Frontend', 'Astro', 'React.js'],
    color: '#e8f4fd',
    accentColor: '#1a3bff',
    year: '2026',
    description: 'Aplikasi mobile cross-platform dengan UI yang clean dan performant. Dibangun menggunakan Flutter dengan design system yang konsisten.',
    link: 'https://github.com',
    screenshots: [
      '/web-jdih/beranda.png',
      '/web-jdih/kategori.png',
      '/web-jdih/dokumen.png',
      '/web-jdih/hukum.png',
      '/web-jdih/detail.png',
    ],
  },
  {
    id: 4,
    title: 'Chatbot BKN',
    category: 'Web Dev',
    tags: ['Frontend', 'Next.js', 'Typescript'],
    color: '#fff4f4',
    accentColor: '#ff4f4f',
    year: '2026',
    description: 'Perancangan identitas brand lengkap mulai dari logo, color palette, typography, hingga brand guidelines untuk startup lokal.',
    link: 'https://github.com',
    screenshots: [
      '/web-chatbot/portal.png',
      '/web-chatbot/login.png',
      '/web-chatbot/chat.png',
    ],
  },
  {
    id: 7,
    title: 'Sisfo Desa',
    category: 'UI/UX Design',
    tags: ['Figma', 'Prototype'],
    color: '#fdf4ff',
    accentColor: '#9b4fff',
    year: '2025',
    description: 'Dashboard analytics dengan visualisasi data interaktif. Menampilkan berbagai chart, tabel, dan metric bisnis secara real-time.',
    link: 'https://github.com',
    screenshots: [
      '/sisfo-desa/figma.png',
      '/sisfo-desa/home.png',
      '/sisfo-desa/penduduk.png',
      '/sisfo-desa/berita.png',
    ],
  },
  {
    id: 2,
    title: 'JDIH Mobile BKN',
    category: 'Mobile App',
    tags: ['Frontend', 'Flutter', 'Figma'],
    color: '#e8f4fd',
    accentColor: '#1a3bff',
    year: '2026',
    description: 'Aplikasi mobile cross-platform dengan UI yang clean dan performant. Dibangun menggunakan Flutter dengan design system yang konsisten.',
    link: 'https://github.com',
    screenshots: [
      '/mobile-jdih/home.jpeg',
      '/mobile-jdih/hukum.jpeg',
      '/mobile-jdih/detail.jpeg',
      '/mobile-jdih/info.jpeg',
    ],
  },
  {
    id: 5,
    title: 'Wellnet',
    category: 'Mobile App',
    tags: ['Fullstack', 'PHP', 'Flutter'],
    color: '#f0fdf4',
    accentColor: '#22c55e',
    year: '2025',
    description: 'Real-time chat application dengan fitur rooms, direct messages, dan notifikasi. Menggunakan WebSocket untuk komunikasi live.',
    link: 'https://github.com',
    screenshots: [
      '/wellnet/welcome.png',
      '/wellnet/home.png',
      '/wellnet/admin.jpeg',
    ],
  },
  {
    id: 8,
    title: 'Kallos Moments',
    category: 'Web Dev',
    tags: ['Fullstack', 'PHP', 'Laravel'],
    color: '#f4f4ff',
    accentColor: '#6366f1',
    year: '2024',
    description: 'Landing page SaaS dengan animasi smooth, conversion-optimized layout, dan performa tinggi. Built with Next.js dan Framer Motion.',
    link: 'https://github.com',
    screenshots: [
      '/kallos-moments/home.png',
      '/kallos-moments/login.png',
      '/kallos-moments/kontak.png',
      '/kallos-moments/admin.png',
    ],
  },
  {
    id: 3,
    title: 'JDIH Mobile BKN',
    category: 'UI/UX Design',
    tags: ['Figma', 'Prototype'],
    color: '#fef9f0',
    accentColor: '#f59e0b',
    year: '2026',
    description: 'Design dan prototyping aplikasi mobile dengan fokus pada UX yang intuitif. Meliputi user research, wireframe, hingga high-fidelity prototype.',
    link: 'https://github.com',
    screenshots: [
      '/figma-jdih/figma.png',
    ],
  },
  {
    id: 6,
    title: 'GenZE',
    category: 'Web Dev',
    tags: ['Fullstack', 'PHP', 'Laravel'],
    color: '#fdf4ff',
    accentColor: '#9b4fff',
    year: '2025',
    description: 'Dashboard analytics dengan visualisasi data interaktif. Menampilkan berbagai chart, tabel, dan metric bisnis secara real-time.',
    link: 'https://github.com',
    screenshots: [
      '/genze/portal.png',
      '/genze/login.png',
      '/genze/pembayaran.png',
      '/genze/invoice.png',
      '/genze/dashboard.png',
      '/genze/kelas.png',
    ],
  },
  {
    id: 9,
    title: 'Gojep App',
    category: 'UI/UX Design',
    tags: ['Figma', 'Prototype'],
    color: '#f0fdf4',
    accentColor: '#22c55e',
    year: '2024',
    description: 'Landing page SaaS dengan animasi smooth, conversion-optimized layout, dan performa tinggi. Built with Next.js dan Framer Motion.',
    link: 'https://github.com',
    screenshots: [
      '/figma-gojek/home.png',
      '/figma-gojek/menu.png',
      '/figma-gojek/promo.png',
      '/figma-gojek/history.png',
      '/figma-gojek/profile.png',
    ],
  },
]

const CATEGORIES = ['All', 'Mobile App', 'Web Dev', 'UI/UX Design']

/* ── hook: track window width ── */
function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return { isMobile: width < 640, isTablet: width >= 640 && width < 1024, width }
}

const Work: React.FC = () => {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const [activeImg, setActiveImg] = useState(0)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set())
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const { isMobile, isTablet } = useBreakpoint()

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  /* ── column count ── */
  const cols = isMobile ? 1 : isTablet ? 2 : 3

  /* ── split into columns for masonry ── */
  const columns: Project[][] = Array.from({ length: cols }, () => [])
  filtered.forEach((p, i) => columns[i % cols].push(p))

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = Number((entry.target as HTMLElement).dataset.id)
            setVisibleIds(prev => new Set([...prev, id]))
          }
        })
      },
      { threshold: 0.1 }
    )
    cardRefs.current.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [filtered.length, cols])

  const openModal = (project: Project) => {
    setSelected(project)
    setActiveImg(0)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelected(null)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const getInitials = (title: string) =>
    title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  const paddings = [56, 88, 48, 72, 60, 80, 52, 76, 64]

  return (
    <section
      id="work"
      style={{
        padding: isMobile ? '64px 20px 80px' : 'clamp(64px, 8vw, 100px) clamp(20px, 5vw, 40px) 120px',
        background: 'var(--black)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bg blobs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'rgba(26,59,255,0.06)', borderRadius: '50%', top: '-100px', right: '-100px', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(197,244,0,0.04)', borderRadius: '50%', bottom: '0', left: '-80px', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* ── Header ── */}
        <div style={{
          marginBottom: isMobile ? '40px' : '64px',
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '24px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '2px', background: 'var(--lime)' }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--lime)' }}>
                WORKS AND PROJECTS COLLECTION
              </p>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(36px, 8vw, 80px)',
              letterSpacing: '-0.03em', color: 'white', lineHeight: 0.95,
            }}>
              Selected<br />
              <span style={{ color: 'white' }}>Projects</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div style={{
            display: 'flex', gap: '6px', flexWrap: 'wrap',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '50px', padding: '6px',
            /* on mobile: allow horizontal scroll instead of wrapping */
            ...(isMobile ? {
              flexWrap: 'nowrap',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              width: '100%',
            } : {}),
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? 'var(--lime)' : 'transparent',
                  color: filter === cat ? 'var(--black)' : 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                  padding: isMobile ? '8px 14px' : '9px 18px',
                  borderRadius: '50px', border: 'none',
                  letterSpacing: '0.06em', transition: 'all 0.25s ease', cursor: 'none',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Masonry Grid (CSS columns → JS column split for stability) ── */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          {columns.map((col, colIdx) => (
            <div key={colIdx} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {col.map((project, rowIdx) => {
                const globalIdx = colIdx + rowIdx * cols
                const isVisible = visibleIds.has(project.id)
                const pad = paddings[globalIdx % paddings.length]
                return (
                  <div
                    key={project.id}
                    data-id={project.id}
                    ref={el => { if (el) cardRefs.current.set(project.id, el) }}
                    onClick={() => openModal(project)}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      background: project.color,
                      borderRadius: '24px',
                      padding: `28px 24px ${pad}px`,
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      border: '2px solid transparent',
                      transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.3s ease, opacity 0.6s ease',
                      transform: !isVisible
                        ? 'translateY(40px)'
                        : hoveredId === project.id
                        ? 'translateY(-8px) scale(1.02)'
                        : 'translateY(0) scale(1)',
                      opacity: isVisible ? 1 : 0,
                      boxShadow: hoveredId === project.id
                        ? `0 28px 60px rgba(0,0,0,0.4), 0 0 0 1px ${project.accentColor}40`
                        : 'none',
                      borderColor: hoveredId === project.id ? `${project.accentColor}40` : 'transparent',
                      transitionDelay: isVisible ? '0ms' : `${globalIdx * 60}ms`,
                    }}
                  >
                    {/* Shimmer */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(135deg, ${project.accentColor}10, transparent 60%)`,
                      opacity: hoveredId === project.id ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                      borderRadius: '24px', pointerEvents: 'none',
                    }} />

                    {/* Top accent line */}
                    <div style={{
                      position: 'absolute', top: 0, left: '24px', right: '24px',
                      height: '3px',
                      background: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
                      borderRadius: '0 0 4px 4px',
                      opacity: hoveredId === project.id ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }} />

                    {/* VIEW badge */}
                    <div style={{
                      position: 'absolute', top: '16px', right: '16px',
                      background: project.accentColor, color: 'white',
                      fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
                      padding: '4px 10px', borderRadius: '50px', letterSpacing: '0.08em',
                      opacity: hoveredId === project.id ? 1 : 0,
                      transform: hoveredId === project.id ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.9)',
                      transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                    }}>VIEW ↗</div>

                    {/* Content */}
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px',
                        letterSpacing: '0.12em', color: project.accentColor, marginBottom: '16px', opacity: 0.85,
                      }}>
                        {String(project.id).padStart(2, '0')}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{
                          display: 'inline-block', width: '6px', height: '6px',
                          background: project.accentColor, borderRadius: '50%', flexShrink: 0,
                        }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--gray)', textTransform: 'uppercase' }}>
                          {project.category} · {project.year}
                        </span>
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 800,
                        fontSize: isMobile ? '20px' : '22px',
                        letterSpacing: '-0.02em', color: 'var(--black)', lineHeight: 1.2,
                      }}>
                        {project.title}
                      </h3>
                    </div>

                    {/* Tags + arrow */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {project.tags.map(tag => (
                          <span key={tag} style={{
                            background: 'rgba(0,0,0,0.07)', color: 'var(--black)',
                            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                            padding: '4px 10px', borderRadius: '50px', letterSpacing: '0.04em',
                          }}>{tag}</span>
                        ))}
                      </div>
                      <div style={{
                        width: '34px', height: '34px',
                        background: hoveredId === project.id ? project.accentColor : 'rgba(0,0,0,0.08)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: hoveredId === project.id ? 'white' : 'var(--black)',
                        fontSize: '15px', flexShrink: 0,
                        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                        transform: hoveredId === project.id ? 'rotate(45deg) scale(1.1)' : 'rotate(0) scale(1)',
                      }}>↗</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ MODAL ═══════════ */}
      {selected && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'center',
            padding: isMobile ? '0' : '32px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: isMobile ? '24px 24px 0 0' : '28px',
              width: '100%',
              maxWidth: isMobile ? '100%' : '900px',
              maxHeight: isMobile ? '92dvh' : '92vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              animation: isMobile ? 'slideUpMobile 0.35s cubic-bezier(0.16, 1, 0.3, 1)' : 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: isMobile ? '20px 20px 16px' : '24px 32px',
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexShrink: 0,
              background: selected.color,
              gap: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <div style={{
                  width: isMobile ? '44px' : '52px',
                  height: isMobile ? '44px' : '52px',
                  background: selected.accentColor,
                  borderRadius: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: isMobile ? '15px' : '18px', color: 'white',
                  letterSpacing: '-0.02em', flexShrink: 0,
                  boxShadow: `0 8px 24px ${selected.accentColor}50`,
                }}>
                  {getInitials(selected.title)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: isMobile ? '16px' : '20px',
                    letterSpacing: '-0.02em', color: 'var(--black)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {selected.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{
                      background: selected.accentColor, color: 'white',
                      fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '50px', letterSpacing: '0.05em',
                    }}>{selected.category}</span>
                    <span style={{
                      background: 'rgba(0,0,0,0.08)', color: 'var(--gray)',
                      fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '50px',
                    }}>{selected.year}</span>
                    {!isMobile && selected.tags.map(t => (
                      <span key={t} style={{
                        background: 'rgba(0,0,0,0.06)', color: 'var(--black)',
                        fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                        padding: '3px 10px', borderRadius: '50px',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{
                  width: '38px', height: '38px',
                  background: 'rgba(0,0,0,0.08)', border: 'none', borderRadius: '50%',
                  fontSize: '16px', cursor: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'background 0.2s ease', color: 'var(--black)',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.15)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.08)'}
              >✕</button>
            </div>

            {/* Modal Body */}
            <div style={{ overflowY: 'auto', flex: 1, WebkitOverflowScrolling: 'touch' }}>

              {/* Main screenshot */}
              <div style={{
                position: 'relative',
                background: '#111',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxHeight: isMobile ? '50vh' : '60vh',
              }}>
                <img
                  key={activeImg}
                  src={selected.screenshots[activeImg]}
                  alt={`Screenshot ${activeImg + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: isMobile ? '50vh' : '60vh',
                    objectFit: 'contain',
                    display: 'block',
                    animation: 'fadeIn 0.25s ease',
                  }}
                />

                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                  pointerEvents: 'none',
                }} />

                {selected.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg(p => (p - 1 + selected.screenshots.length) % selected.screenshots.length)}
                      style={{
                        position: 'absolute', left: isMobile ? '10px' : '16px', top: '50%', transform: 'translateY(-50%)',
                        width: isMobile ? '36px' : '44px', height: isMobile ? '36px' : '44px',
                        background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
                        color: 'white', fontSize: '20px', cursor: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >‹</button>
                    <button
                      onClick={() => setActiveImg(p => (p + 1) % selected.screenshots.length)}
                      style={{
                        position: 'absolute', right: isMobile ? '10px' : '16px', top: '50%', transform: 'translateY(-50%)',
                        width: isMobile ? '36px' : '44px', height: isMobile ? '36px' : '44px',
                        background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
                        color: 'white', fontSize: '20px', cursor: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >›</button>
                  </>
                )}

                {selected.screenshots.length > 1 && (
                  <div style={{
                    position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', gap: '6px',
                  }}>
                    {selected.screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImg(idx)}
                        style={{
                          width: activeImg === idx ? '24px' : '7px',
                          height: '7px', borderRadius: '50px',
                          background: activeImg === idx ? selected.accentColor : 'rgba(255,255,255,0.4)',
                          border: 'none', cursor: 'none',
                          transition: 'all 0.3s ease', padding: 0,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {selected.screenshots.length > 1 && (
                <div style={{
                  display: 'flex', gap: '10px',
                  padding: isMobile ? '12px 16px' : '16px 32px',
                  background: 'var(--light)', overflowX: 'auto',
                  borderBottom: '1px solid var(--border)',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                }}>
                  {selected.screenshots.map((src, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      style={{
                        flexShrink: 0, borderRadius: '10px', overflow: 'hidden',
                        cursor: 'none',
                        border: `2px solid ${activeImg === idx ? selected.accentColor : 'transparent'}`,
                        transition: 'all 0.2s ease',
                        transform: activeImg === idx ? 'scale(1.04)' : 'scale(1)',
                      }}
                    >
                      <img
                        src={src}
                        alt={`Thumb ${idx + 1}`}
                        style={{
                          width: isMobile ? '88px' : '110px',
                          height: isMobile ? '56px' : '68px',
                          objectFit: 'cover', display: 'block',
                          opacity: activeImg === idx ? 1 : 0.55,
                          transition: 'opacity 0.2s ease',
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description & CTA */}
              <div style={{
                padding: isMobile ? '20px 20px 28px' : '28px 32px 32px',
                display: 'flex',
                alignItems: isMobile ? 'stretch' : 'flex-start',
                justifyContent: 'space-between',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '20px',
                flexWrap: 'wrap',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: isMobile ? '14px' : '15px',
                  color: 'var(--gray)', lineHeight: 1.75, maxWidth: '560px', flex: 1,
                }}>
                  {selected.description}
                </p>
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: selected.accentColor, color: 'white',
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: '14px', padding: '14px 28px', borderRadius: '50px',
                    textDecoration: 'none', display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px', flexShrink: 0, transition: 'all 0.25s ease',
                    boxShadow: `0 8px 24px ${selected.accentColor}40`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${selected.accentColor}60`
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${selected.accentColor}40`
                  }}
                >
                  View Project ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(32px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideUpMobile { from { opacity: 0; transform: translateY(100%) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </section>
  )
}

export default Work