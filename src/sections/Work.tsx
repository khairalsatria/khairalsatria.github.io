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
      'public/web-jdih/beranda.png',
      'public/web-jdih/kategori.png',
      'public/web-jdih/dokumen.png',
      'public/web-jdih/hukum.png',
      'public/web-jdih/detail.png',
    ],
  },
  {
    id: 2,
    title: 'Chatbot BKN',
    category: 'Web Dev',
    tags: ['Frontend', 'Next.js', 'Typescript'],
    color: '#fff4f4',
    accentColor: '#ff4f4f',
    year: '2026',
    description: 'Perancangan identitas brand lengkap mulai dari logo, color palette, typography, hingga brand guidelines untuk startup lokal.',
    link: 'https://github.com',
    screenshots: [
      'public/web-chatbot/portal.png',
      'public/web-chatbot/login.png',
      'public/web-chatbot/chat.png',
    ],
  },
  {
    id: 3,
    title: 'Sisfo Desa',
    category: 'UI/UX Design',
    tags: ['Figma', 'Prototype'],
    color: '#fdf4ff',
    accentColor: '#9b4fff',
    year: '2025',
    description: 'Dashboard analytics dengan visualisasi data interaktif. Menampilkan berbagai chart, tabel, dan metric bisnis secara real-time.',
    link: 'https://github.com',
    screenshots: [
      'public/sisfo-desa/figma.png',
      'public/sisfo-desa/home.png',
      'public/sisfo-desa/penduduk.png',
      'public/sisfo-desa/berita.png',
    ],
  },
  {
    id: 4,
    title: 'JDIH Mobile BKN',
    category: 'Mobile App',
    tags: ['Frontend', 'Flutter', 'Figma'],
    color: '#e8f4fd',
    accentColor: '#1a3bff',
    year: '2026',
    description: 'Aplikasi mobile cross-platform dengan UI yang clean dan performant. Dibangun menggunakan Flutter dengan design system yang konsisten.',
    link: 'https://github.com',
    screenshots: [
      'public/mobile-jdih/home.jpeg',
      'public/mobile-jdih/hukum.jpeg',
      'public/mobile-jdih/detail.jpeg',
      'public/mobile-jdih/info.jpeg',
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
      'public/wellnet/welcome.png',
      'public/wellnet/home.png',
      'public/wellnet/admin.jpeg',
    ],
  },
  {
    id: 6,
    title: 'Kallos Moments',
    category: 'Web Dev',
    tags: ['Fullstack', 'PHP', 'Laravel'],
    color: '#f4f4ff',
    accentColor: '#6366f1',
    year: '2024',
    description: 'Landing page SaaS dengan animasi smooth, conversion-optimized layout, dan performa tinggi. Built with Next.js dan Framer Motion.',
    link: 'https://github.com',
    screenshots: [
      'public/kallos-moments/home.png',
      'public/kallos-moments/login.png',
      'public/kallos-moments/kontak.png',
      'public/kallos-moments/admin.png',
    ],
  },
  {
    id: 7,
    title: 'JDIH Mobile BKN',
    category: 'UI/UX Design',
    tags: ['Figma', 'Prototype'],
    color: '#fef9f0',
    accentColor: '#f59e0b',
    year: '2026',
    description: 'Design dan prototyping aplikasi mobile dengan fokus pada UX yang intuitif. Meliputi user research, wireframe, hingga high-fidelity prototype.',
    link: 'https://github.com',
    screenshots: [
      'public/figma-jdih/figma.png',
    ],
  },
  {
    id: 8,
    title: 'GenZE',
    category: 'Web Dev',
    tags: ['Fullstack', 'PHP', 'Laravel'],
    color: '#fdf4ff',
    accentColor: '#9b4fff',
    year: '2025',
    description: 'Dashboard analytics dengan visualisasi data interaktif. Menampilkan berbagai chart, tabel, dan metric bisnis secara real-time.',
    link: 'https://github.com',
    screenshots: [
      'public/genze/portal.png',
      'public/genze/login.png',
      'public/genze/pembayaran.png',
      'public/genze/invoice.png',
      'public/genze/dashboard.png',
      'public/genze/kelas.png',
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
      'public/figma-gojek/home.png',
      'public/figma-gojek/menu.png',
      'public/figma-gojek/promo.png',
      'public/figma-gojek/history.png',
      'public/figma-gojek/profile.png',
    ],
  },
]

const CATEGORIES = ['All', , 'Mobile App', 'Web Dev', 'UI/UX Design']

const Work: React.FC = () => {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const [activeImg, setActiveImg] = useState(0)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set())
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

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
  }, [filtered.length])

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

  return (
    <section id="work" style={{ padding: '100px 40px 120px', background: 'var(--black)', position: 'relative', overflow: 'hidden' }}>

      {/* Bg blobs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'rgba(26,59,255,0.06)', borderRadius: '50%', top: '-100px', right: '-100px', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(197,244,0,0.04)', borderRadius: '50%', bottom: '0', left: '-80px', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ marginBottom: '64px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '2px', background: 'var(--lime)' }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--lime)' }}>
                WORKS COLLECTION
              </p>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-0.03em', color: 'white', lineHeight: 0.95 }}>
              Selected<br />
              <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)', color: 'transparent' }}>Projects</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div style={{
            display: 'flex', gap: '8px', flexWrap: 'wrap',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '50px', padding: '6px',
          }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat || '')} style={{
                background: filter === cat ? 'var(--lime)' : 'transparent',
                color: filter === cat ? 'var(--black)' : 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                padding: '9px 18px', borderRadius: '50px', border: 'none',
                letterSpacing: '0.06em', transition: 'all 0.25s ease', cursor: 'none',
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div style={{ columns: 3, columnGap: '16px' }}>
          {filtered.map((project, i) => {
            const isVisible = visibleIds.has(project.id)
            const paddings = [56, 88, 48, 72, 60, 80, 52, 76, 64]
            return (
              <div
                key={project.id}
                data-id={project.id}
                ref={el => { if (el) cardRefs.current.set(project.id, el) }}
                onClick={() => openModal(project)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '16px',
                  background: project.color,
                  borderRadius: '24px',
                  padding: `32px 28px ${paddings[i % paddings.length]}px`,
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
                  transitionDelay: isVisible ? '0ms' : `${i * 60}ms`,
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
                  position: 'absolute', top: 0, left: '28px', right: '28px',
                  height: '3px',
                  background: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
                  borderRadius: '0 0 4px 4px',
                  opacity: hoveredId === project.id ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }} />

                {/* VIEW badge */}
                <div style={{
                  position: 'absolute', top: '18px', right: '18px',
                  background: project.accentColor, color: 'white',
                  fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
                  padding: '4px 10px', borderRadius: '50px', letterSpacing: '0.08em',
                  opacity: hoveredId === project.id ? 1 : 0,
                  transform: hoveredId === project.id ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.9)',
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                }}>VIEW ↗</div>

                {/* Content */}
                <div style={{ position: 'relative' }}>
                  {/* Project number */}
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '12px',
                    letterSpacing: '0.12em',
                    color: project.accentColor,
                    marginBottom: '20px',
                    opacity: 0.85,
                  }}>
                    {String(project.id).padStart(2, '0')}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{
                      display: 'inline-block', width: '6px', height: '6px',
                      background: project.accentColor, borderRadius: '50%',
                    }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--gray)', textTransform: 'uppercase' }}>
                      {project.category} · {project.year}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: '22px', letterSpacing: '-0.02em',
                    color: 'var(--black)', lineHeight: 1.2,
                    transition: 'color 0.2s ease',
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
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '32px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: '28px',
              width: '100%', maxWidth: '900px', maxHeight: '92vh',
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
              animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '24px 32px',
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexShrink: 0,
              background: selected.color,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Initials box */}
                <div style={{
                  width: '52px', height: '52px',
                  background: selected.accentColor,
                  borderRadius: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '18px', color: 'white',
                  letterSpacing: '-0.02em', flexShrink: 0,
                  boxShadow: `0 8px 24px ${selected.accentColor}50`,
                }}>
                  {getInitials(selected.title)}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.02em', color: 'var(--black)' }}>
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
                    {selected.tags.map(t => (
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
            <div style={{ overflowY: 'auto', flex: 1 }}>

              {/* Main screenshot */}
              <div style={{ 
                position: 'relative', 
                background: '#111', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxHeight: '60vh',  // batas tinggi maksimal
              }}>
                <img
                  key={activeImg}
                  src={selected.screenshots[activeImg]}
                  alt={`Screenshot ${activeImg + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',         // ← ikuti tinggi natural gambar
                    maxHeight: '60vh',      // ← jangan overflow layar
                    objectFit: 'contain',   // ← tampilkan full tanpa crop
                    display: 'block',
                    animation: 'fadeIn 0.25s ease',
                  }}
                />

                {/* Bottom gradient */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                  pointerEvents: 'none',
                }} />

                {/* Nav arrows */}
                {selected.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg(p => (p - 1 + selected.screenshots.length) % selected.screenshots.length)}
                      style={{
                        position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                        width: '44px', height: '44px',
                        background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
                        color: 'white', fontSize: '22px', cursor: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'}
                    >‹</button>
                    <button
                      onClick={() => setActiveImg(p => (p + 1) % selected.screenshots.length)}
                      style={{
                        position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                        width: '44px', height: '44px',
                        background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
                        color: 'white', fontSize: '22px', cursor: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'}
                    >›</button>
                  </>
                )}

                {/* Dot indicators */}
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
                  display: 'flex', gap: '10px', padding: '16px 32px',
                  background: 'var(--light)', overflowX: 'auto',
                  borderBottom: '1px solid var(--border)',
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
                          width: '110px', height: '68px', objectFit: 'cover', display: 'block',
                          opacity: activeImg === idx ? 1 : 0.55,
                          transition: 'opacity 0.2s ease',
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description & CTA */}
              <div style={{ padding: '28px 32px 32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--gray)', lineHeight: 1.75, maxWidth: '560px', flex: 1 }}>
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
    </section>
  )
}

export default Work