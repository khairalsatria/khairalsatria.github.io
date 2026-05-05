import React, { useEffect, useRef } from 'react'

interface EducationItem {
  year: string
  school: string
  major: string
  gpa: string
}

interface ExperienceItem {
  year: string
  company: string
  role: string
  tech: string
}

interface Card {
  type: 'profile' | 'education' | 'experience'
  title: string
  name?: string
  role?: string
  location?: string
  email?: string
  nohp?: string
  bio?: string
  items?: EducationItem[] | ExperienceItem[]
}

const cards: Card[] = [
  {
    type: 'profile',
    title: 'PROFILE',
    name: 'Khairal Satria',
    role: 'IT Enthusiast',
    location: '📍 Jakarta Selatan, Indonesia',
    email: 'khairalsatriahaspi@gmail.com',
    nohp: '📞 +62 812-7564-5952',
    bio: 'Hello, I am Khairal Satria Haspi, Fresh Graduate of the Diploma Program in Information Management (Information Systems) at the State Polytechnic of Padang, in 2025. Possesses a keen interest in enhancing skills in the field of Information Technology, including Programming, Frontend Development, Backend Development, Fullstack Development, Software Testing, Data Analysis, Mobile Development, Web Development, UI/UX Design, Software Engineering, and more.',
  },
  {
    type: 'education',
    title: 'EDUCATION & CERTIFICATIONS',
    items: [
      { year: '2022 – 2025', school: 'Politeknik Negeri Padang', major: 'Manajemen Informatika', gpa: 'GPA 3.69' },
      { year: 'Feb – Jul 2024', school: 'Oracle Cloud Infrastructure Foundations', major: 'Talent Scouting Academy Digital Talent Scholarship 2024', gpa: '' },
      { year: 'Feb – Jul 2023', school: 'Java Fundamentals and Java Foundations', major: 'Talent Scouting Academy Digital Talent Scholarship 2023', gpa: '' },
      { year: '2019 – 2022', school: 'SMAN 1 Gunung Talang', major: 'IPA', gpa: '89.37' },
    ] as EducationItem[],
  },
  {
    type: 'experience',
    title: 'EXPERIENCE & PROJECTS',
    items: [
      { year: 'Nov 2025 – Mei 2026', company: 'Badan Kepegawaian Negara', role: 'Asisten Programmer', tech: 'React.js · Flutter · Next.js · Astro · Golang · Node.js · PHP · Figma' },
      { year: 'Sept – Des 2025', company: 'Hydtech', role: 'Fullstack Developer', tech: 'Flutter · PHP · Laravel · Figma · Tailwind · SQL · Selenium' },
      { year: 'Juni – Agus 2025', company: 'GenZE', role: 'Web Developer', tech: 'Flutter · PHP · Laravel · Figma · Bootstrap · SQL · Selenium' },
      { year: 'Feb – Mei 2025', company: 'Inovindo Digital Media', role: 'Web Developer', tech: 'Figma · PHP · Laravel · SQL' },
      { year: 'Okt – Des 2024', company: 'Kallos Moments', role: 'Fullstack Developer', tech: 'Figma · PHP · Laravel · SQL' },
    ] as ExperienceItem[],
  },
]

// Hook untuk observe elemen
function useScrollReveal() {
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = '1'
            ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    refs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el
  }

  return setRef
}

const Features: React.FC = () => {
  const setRef = useScrollReveal()
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  // Observe tiap item di dalam card juga
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = '1'
            ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )
    itemRefs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el
  }

  const hiddenStyle: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(32px)',
    transition: 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
  }

  let itemCounter = 0

  return (
    <section style={{ background: 'white', padding: '80px 40px 100px' }}>

      {/* Marquee banner */}
      <div
        ref={el => setRef(0)(el as HTMLDivElement)}
        style={{
          ...hiddenStyle,
          background: 'var(--blue)',
          overflow: 'hidden',
          padding: '18px 0',
          marginBottom: '80px',
        }}
      >
        <div style={{
          display: 'flex',
          gap: '60px',
          whiteSpace: 'nowrap',
          animation: 'marquee 70s linear infinite',
          width: 'max-content',
        }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{
              color: 'white',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '14px',
              letterSpacing: '0.15em',
              display: 'flex',
              alignItems: 'center',
              gap: '60px',
            }}>
              REACT.JS ✦ FLUTTER ✦ NEXT.JS ✦ VUE.JS ✦ TYPESCRIPT ✦ JAVASCRIPT ✦ HTML ✦ CSS ✦ TAILWIND ✦ FRAMER ✦ PHP ✦ LARAVEL ✦ GOLANG ✦ NODE.JS ✦ REST API ✦ POSTMAN ✦ GIT/GITHUB ✦ SQL ✦ FIGMA ✦ SELENIUM ✦ POWERBI
            </span>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {cards.map((card, i) => (
          <div
            key={i}
            ref={el => setRef(i + 1)(el as HTMLDivElement)}
            style={{
              ...hiddenStyle,
              transitionDelay: `${i * 120}ms`,
              background: 'var(--light)',
              borderRadius: '24px',
              padding: '40px 36px',
              border: '2px solid transparent',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(26,59,255,0.12)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'transparent'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            {/* Top accent line on hover */}
            <div style={{
              position: 'absolute',
              top: 0, left: '36px', right: '36px',
              height: '3px',
              background: 'linear-gradient(90deg, var(--blue), var(--lime))',
              borderRadius: '0 0 4px 4px',
            }} />

            {/* ── PROFILE ── */}
            {card.type === 'profile' && (
              <>
                {/* Label */}
                <div
                  ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                  style={{ ...hiddenStyle, transitionDelay: '100ms', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--blue)', marginBottom: '20px' }}
                >{card.title}</div>

                {/* Avatar initials */}
                <div
                  ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                  style={{
                    ...hiddenStyle, transitionDelay: '160ms',
                    width: '64px', height: '64px',
                    background: 'linear-gradient(135deg, var(--blue), #4f6fff)',
                    borderRadius: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: '22px', color: 'white',
                    letterSpacing: '-0.02em',
                    marginBottom: '20px',
                    boxShadow: '0 8px 24px rgba(26,59,255,0.3)',
                  }}
                >KS</div>

                <div
                  ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                  style={{ ...hiddenStyle, transitionDelay: '200ms', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', marginBottom: '4px' }}
                >{card.name}</div>

                <div
                  ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                  style={{
                    ...hiddenStyle, transitionDelay: '240ms',
                    background: 'var(--blue)', color: 'white',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                    padding: '5px 14px', borderRadius: '50px',
                    display: 'inline-block', marginBottom: '20px', letterSpacing: '0.05em',
                  }}
                >{card.role}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    card.location,
                    `✉️ ${card.email}`,
                    card.nohp,
                  ].map((line, k) => {
                    const idx = itemCounter++
                    return (
                      <div
                        key={k}
                        ref={el => setItemRef(idx)(el as HTMLDivElement)}
                        style={{ ...hiddenStyle, transitionDelay: `${280 + k * 60}ms`, display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display)', fontSize: '13px', color: 'var(--gray)' }}
                      >{line}</div>
                    )
                  })}
                  <div
                    ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                    style={{ ...hiddenStyle, transitionDelay: '480ms', fontFamily: 'var(--font-display)', fontSize: '13px', color: 'var(--gray)', lineHeight: 1.7, textAlign: 'justify', marginTop: '4px' }}
                  >{card.bio}</div>
                </div>
              </>
            )}

            {/* ── EDUCATION ── */}
            {card.type === 'education' && (
              <>
                <div
                  ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                  style={{ ...hiddenStyle, transitionDelay: '100ms', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--blue)', marginBottom: '24px' }}
                >{card.title}</div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {(card.items as EducationItem[])?.map((item, j) => {
                    const idx = itemCounter++
                    return (
                      <div
                        key={j}
                        ref={el => setItemRef(idx)(el as HTMLDivElement)}
                        style={{
                          ...hiddenStyle,
                          transitionDelay: `${160 + j * 80}ms`,
                          borderTop: j === 0 ? 'none' : '1px solid var(--border)',
                          paddingTop: j === 0 ? '0' : '16px',
                          paddingBottom: '16px',
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gray)', marginBottom: '6px', letterSpacing: '0.05em' }}>{item.year}</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', marginBottom: '4px', lineHeight: 1.3 }}>{item.school}</div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', color: 'var(--gray)', flex: 1 }}>{item.major}</span>
                          {item.gpa && (
                            <span style={{
                              background: 'var(--lime)', color: 'var(--black)',
                              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                              padding: '3px 10px', borderRadius: '50px', flexShrink: 0,
                            }}>{item.gpa}</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {/* ── EXPERIENCE ── */}
            {card.type === 'experience' && (
              <>
                <div
                  ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                  style={{ ...hiddenStyle, transitionDelay: '100ms', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--blue)', marginBottom: '24px' }}
                >{card.title}</div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {(card.items as ExperienceItem[])?.map((item, j) => {
                    const idx = itemCounter++
                    return (
                      <div
                        key={j}
                        ref={el => setItemRef(idx)(el as HTMLDivElement)}
                        style={{
                          ...hiddenStyle,
                          transitionDelay: `${160 + j * 80}ms`,
                          borderTop: j === 0 ? 'none' : '1px solid var(--border)',
                          paddingTop: j === 0 ? '0' : '14px',
                          paddingBottom: '14px',
                          display: 'flex', gap: '12px', alignItems: 'flex-start',
                        }}
                      >
                        {/* Timeline dot */}
                        <div style={{
                          width: '8px', height: '8px', flexShrink: 0,
                          borderRadius: '50%', marginTop: '6px',
                          background: j === 0 ? 'var(--lime)' : 'var(--border)',
                          boxShadow: j === 0 ? '0 0 0 3px rgba(197,244,0,0.3)' : 'none',
                          transition: 'background 0.3s ease',
                        }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gray)', marginBottom: '4px' }}>{item.year}</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', marginBottom: '4px' }}>{item.company}</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', color: 'var(--gray)', marginBottom: '6px' }}>{item.role}</div>
                          <div style={{
                            background: 'rgba(26,59,255,0.07)', color: 'var(--blue)',
                            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                            padding: '4px 12px', borderRadius: '50px',
                            letterSpacing: '0.03em', display: 'inline-block',
                            lineHeight: 1.6,
                          }}>{item.tech}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features