import React, { useEffect, useRef, useState } from 'react'

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
  roles?: string[]   // ← sekarang array of roles
  location?: string
  email?: string
  nohp?: string
  bio?: string
  image?: string
  softSkills?: string[]
  items?: EducationItem[] | ExperienceItem[]
}

const cards: Card[] = [
  {
    type: 'profile',
    title: 'PROFILE',
    name: 'Khairal Satria',
    roles: [
      'IT Enthusiast',
      'Frontend Developer',
      'Mobile Developer',
      'UI/UX Designer',
      'Fullstack Developer',
    ],
    location: '📍 Jakarta Selatan, Indonesia',
    email: 'khairalsatriahaspi@gmail.com',
    nohp: '📞 +62 812-7564-5952',
    image: '/pp.png',
    bio: 'Hello, I am Khairal Satria Haspi, Fresh Graduate of the Diploma Program in Information Management (Information Systems) at the State Polytechnic of Padang, in 2025. Possesses a keen interest in enhancing skills in the field of Information Technology, including Programming, Frontend Development, Backend Development, Fullstack Development, Software Testing, Data Analysis, Mobile Development, Web Development, UI/UX Design, Software Engineering, and more.',
    softSkills: [
      'System Analysis', 
      'Problem Solving',
      'Debugging',
      'Collaborative Teamwork',
      'Analytical Thinking',
      'Growth Mindset',
      'Effective Communication',
      'Time Management'
    ],
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

// ── Animated Role Hook ──
function useRoleCycle(roles: string[], interval = 2600) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!roles || roles.length <= 1) return
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % roles.length)
        setVisible(true)
      }, 350)
    }, interval)
    return () => clearInterval(timer)
  }, [roles, interval])

  return { role: roles?.[index] ?? '', visible }
}

// ── Scroll Reveal Hook ──
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

// ── Profile Avatar ──
const ProfileAvatar: React.FC<{ image?: string; name?: string; accentColor?: string }> = ({
  image,
  name = '',
  accentColor = '#1a3bff',
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100px',
        height: '100px',
        marginBottom: '20px',
        cursor: 'default',
      }}
    >
      {/* Rotating dashed ring */}
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          inset: 0,
          animation: 'spinRing 8s linear infinite',
          opacity: hovered ? 1 : 0.45,
          transition: 'opacity 0.4s ease',
        }}
      >
        <circle
          cx="50" cy="50" r="47"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
      </svg>

      {/* Counter-rotating accent dots */}
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          inset: 0,
          animation: 'spinRingReverse 12s linear infinite',
        }}
      >
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const cx = 50 + 47 * Math.cos(rad)
          const cy = 50 + 47 * Math.sin(rad)
          return (
            <circle
              key={i}
              cx={cx} cy={cy} r="3"
              fill={i === 0 ? '#c5f400' : accentColor}
              opacity={hovered ? 1 : 0.6}
            />
          )
        })}
      </svg>

      {/* Glow blob behind photo */}
      <div style={{
        position: 'absolute',
        inset: '6px',
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${accentColor}30, transparent 70%)`,
        filter: 'blur(8px)',
        transition: 'opacity 0.4s ease',
        opacity: hovered ? 1 : 0.5,
      }} />

      {/* Photo */}
      <div style={{
        position: 'absolute',
        inset: '8px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `2px solid ${hovered ? '#c5f400' : accentColor}`,
        transition: 'border-color 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        boxShadow: hovered
          ? `0 0 0 3px ${accentColor}30, 0 12px 32px ${accentColor}40`
          : `0 4px 16px ${accentColor}25`,
      }}>
        {image ? (
          <img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(135deg, ${accentColor}, #c5f400)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '24px', color: 'white',
          }}>
            {name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Online badge */}
      <div style={{
        position: 'absolute',
        bottom: '10px', right: '4px',
        width: '14px', height: '14px',
        borderRadius: '50%',
        background: '#22c55e',
        border: '2px solid white',
        boxShadow: '0 0 0 2px rgba(34,197,94,0.3)',
        animation: 'pulse 2s ease infinite',
      }} />

      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinRingReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.3); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0.12); }
        }
      `}</style>
    </div>
  )
}

// ── Main Component ──
const Features: React.FC = () => {
  const setRef = useScrollReveal()
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  const profileCard = cards.find(c => c.type === 'profile')
  const { role: currentRole, visible: roleVisible } = useRoleCycle(profileCard?.roles ?? [], 2600)

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
            {/* Top accent line */}
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
                <div
                  ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                  style={{ ...hiddenStyle, transitionDelay: '100ms', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--blue)', marginBottom: '20px' }}
                >{card.title}</div>

                {/* Enhanced Profile Avatar */}
                <div
                  ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                  style={{ ...hiddenStyle, transitionDelay: '140ms' }}
                >
                  <ProfileAvatar image={card.image} name={card.name} accentColor="#1a3bff" />
                </div>

                <div
                  ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                  style={{ ...hiddenStyle, transitionDelay: '200ms', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', marginBottom: '8px' }}
                >{card.name}</div>

                {/* ── Animated Role Badge ── */}
                <div
                  ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                  style={{ ...hiddenStyle, transitionDelay: '240ms', marginBottom: '20px', minHeight: '28px' }}
                >
                  <div style={{
                    background: 'var(--blue)', color: 'white',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                    padding: '5px 14px', borderRadius: '50px',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                  }}>
                    {/* Blinking cursor dot */}
                    <span style={{
                      display: 'inline-block',
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      background: '#c5f400',
                      animation: 'blink 1.2s step-start infinite',
                      flexShrink: 0,
                    }} />
                    <span style={{
                      opacity: roleVisible ? 1 : 0,
                      transform: roleVisible ? 'translateY(0)' : 'translateY(6px)',
                      transition: 'opacity 0.3s ease, transform 0.3s ease',
                      display: 'inline-block',
                      minWidth: '120px',
                    }}>
                      {currentRole}
                    </span>
                  </div>
                </div>

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

                  {/* ── Soft Skills ── */}
                  {card.softSkills && card.softSkills.length > 0 && (
                    <div
                      ref={el => { const idx = itemCounter++; setItemRef(idx)(el as HTMLDivElement) }}
                      style={{ ...hiddenStyle, transitionDelay: '540ms', marginTop: '16px' }}
                    >
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                        letterSpacing: '0.12em', color: 'var(--blue)',
                        marginBottom: '10px',
                      }}>SOFT SKILLS</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {card.softSkills.map((skill, k) => (
                          <span key={k} style={{
                            background: 'rgba(26,59,255,0.07)',
                            color: 'var(--blue)',
                            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                            padding: '4px 12px', borderRadius: '50px',
                            letterSpacing: '0.03em',
                            display: 'inline-block',
                            lineHeight: 1.6,
                          }}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
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

      {/* Global keyframes */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default Features