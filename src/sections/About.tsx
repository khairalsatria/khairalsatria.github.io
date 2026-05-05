import React, { useEffect, useRef } from 'react'

const services = ['Programmer', 'Quality Assurance', 'Data Analysis', 'UI/UX Design']
const skills = ['REACT.JS', 'FLUTTER', 'NEXT.JS', 'VUE.JS', 'HTML/CSS', 'JAVASCRIPT', 'TYPESCRIPT', 'REST API', 'GOLANG', 'NODE.JS', 'PHP', 'POSTMAN', 'FIGMA', 'SQL', 'LARAVEL', 'GIT/GITHUB', 'SELENIUM', 'POWERBI', 'TABLEAU']
const skillColors = skills.map((_, i) => i % 2 === 0 ? 'var(--blue)' : 'var(--lime)')
const skillTextColors = skills.map((_, i) => i % 2 === 0 ? 'white' : 'var(--black)')
const stats = [
  { num: '1+', label: 'Years Exp.' },
  { num: '10+', label: 'Projects' },
  { num: '100%', label: 'Satisfaction' },
]

function useReveal(options?: IntersectionObserverInit) {
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ;(entry.target as HTMLElement).style.opacity = '1'
          ;(entry.target as HTMLElement).style.transform = 'translateY(0) scale(1)'
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, ...options })

    refs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el
  }
}

const hidden: React.CSSProperties = {
  opacity: 0,
  transform: 'translateY(28px) scale(0.98)',
  transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
}

const About: React.FC = () => {
  const setRef = useReveal()
  const [hoveredSvc, setHoveredSvc] = React.useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = React.useState<number | null>(null)

  return (
    <section id="about" style={{ padding: '100px 40px', background: 'white', borderTop: '2px solid var(--light)' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '80px', alignItems: 'start',
      }}>

        {/* ── LEFT: Services ── */}
        <div>
          {/* Label */}
          <div
            ref={el => setRef(0)(el as HTMLDivElement)}
            style={{ ...hidden, transitionDelay: '0ms', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--gray)', marginBottom: '40px' }}
          >MY SERVICES</div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {services.map((svc, i) => (
              <div
                key={i}
                ref={el => setRef(i + 1)(el as HTMLDivElement)}
                onMouseEnter={() => setHoveredSvc(i)}
                onMouseLeave={() => setHoveredSvc(null)}
                style={{
                  ...hidden,
                  transitionDelay: `${80 + i * 80}ms`,
                  borderTop: '1px solid var(--border)',
                  padding: '22px 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'none',
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: 'clamp(24px, 3.5vw, 44px)', letterSpacing: '-0.02em',
                  color: hoveredSvc === i ? 'var(--blue)' : 'var(--black)',
                  transition: 'color 0.25s ease, transform 0.25s ease',
                  transform: hoveredSvc === i ? 'translateX(8px)' : 'translateX(0)',
                }}>{svc}</h3>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                  background: hoveredSvc === i ? 'var(--blue)' : 'var(--light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px',
                  color: hoveredSvc === i ? 'white' : 'var(--black)',
                  transition: 'all 0.25s ease',
                  transform: hoveredSvc === i ? 'rotate(45deg) scale(1.1)' : 'rotate(0) scale(1)',
                }}>↗</div>
              </div>
            ))}
            <div
              ref={el => setRef(services.length + 1)(el as HTMLDivElement)}
              style={{ ...hidden, transitionDelay: `${80 + services.length * 80}ms`, borderTop: '1px solid var(--border)' }}
            />
          </div>
        </div>

        {/* ── RIGHT: About ── */}
        <div>
          {/* Available badge */}
          <div
            ref={el => setRef(10)(el as HTMLDivElement)}
            style={{ ...hidden, transitionDelay: '0ms', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}
          >
            <div style={{
              width: '10px', height: '10px', background: 'var(--lime)', borderRadius: '50%',
              animation: 'pulse 2s ease infinite', boxShadow: '0 0 0 4px rgba(197,244,0,0.2)',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.1em', color: 'var(--black)',
              border: '1px solid var(--border)', padding: '6px 16px', borderRadius: '50px',
            }}>AVAILABLE FOR NEW PROJECTS</span>
          </div>

          {/* Heading */}
          <h2
            ref={el => setRef(11)(el as HTMLDivElement)}
            style={{
              ...hidden, transitionDelay: '80ms',
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-0.03em',
              lineHeight: 1.1, marginBottom: '20px',
            }}
          >
            Crafting digital{' '}
            <span style={{ color: 'var(--blue)' }}>experiences</span>{' '}
            that matter.
          </h2>

          {/* Body text */}
          <p
            ref={el => setRef(12)(el as HTMLDivElement)}
            style={{
              ...hidden, transitionDelay: '160ms',
              fontFamily: 'var(--font-display)', fontSize: '15px',
              color: 'var(--gray)', lineHeight: 1.75, marginBottom: '36px',
            }}
          >
            Specializing in building high-performance web and mobile applications with a focus on clean code and exceptional user experience. I turn complex ideas into elegant, fast, and accessible interfaces.
          </p>

          {/* Skill tags */}
          <div
            ref={el => setRef(13)(el as HTMLDivElement)}
            style={{ ...hidden, transitionDelay: '240ms', display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}
          >
            {skills.map((skill, i) => (
              <span
                key={i}
                onMouseEnter={() => setHoveredSkill(i)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  background: skillColors[i],
                  color: skillTextColors[i],
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                  padding: '7px 16px', borderRadius: '50px', letterSpacing: '0.05em',
                  transition: 'all 0.2s ease',
                  transform: hoveredSkill === i ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredSkill === i ? '0 6px 16px rgba(0,0,0,0.15)' : 'none',
                  cursor: 'none',
                }}
              >{skill}</span>
            ))}
          </div>

          {/* Stats */}
          <div
            ref={el => setRef(14)(el as HTMLDivElement)}
            style={{
              ...hidden, transitionDelay: '320ms',
              background: 'var(--light)', borderRadius: '20px',
              padding: '28px 32px',
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px',
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px',
                  color: i === 1 ? 'var(--blue)' : 'var(--black)',
                  lineHeight: 1, marginBottom: '4px',
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'var(--gray)', letterSpacing: '0.05em',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About