import React, { useState, useEffect, useRef, useCallback } from 'react'

interface Bug {
  id: number
  x: number
  y: number
  size: number
  speed: number
  emoji: string
  born: number
  lifespan: number
  angle: number
  wobble: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

const BUG_EMOJIS = ['🐛', '🐞', '🦟', '🕷️', '🦗', '🐜']
const GAME_DURATION = 30
const ARENA_W = 500
const ARENA_H = 280

const BugHunter: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'result'>('idle')
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [bugs, setBugs] = useState<Bug[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [combo, setCombo] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [lastHit, setLastHit] = useState<{ x: number; y: number; pts: number } | null>(null)

  const frameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const bugIdRef = useRef(0)
  const particleIdRef = useRef(0)
  const spawnTimerRef = useRef(0)
  const comboTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scoreRef = useRef(0)
  const missedRef = useRef(0)
  const timeRef = useRef(GAME_DURATION)
  const phaseRef = useRef<'idle' | 'playing' | 'result'>('idle')

  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { missedRef.current = missed }, [missed])
  useEffect(() => { phaseRef.current = phase }, [phase])

  const spawnBug = useCallback((now: number): Bug => {
    const elapsed = GAME_DURATION - timeRef.current
    const difficulty = Math.min(elapsed / 20, 1)
    const size = 32 - difficulty * 10
    return {
      id: bugIdRef.current++,
      x: size + Math.random() * (ARENA_W - size * 2),
      y: size + Math.random() * (ARENA_H - size * 2),
      size,
      speed: 60 + difficulty * 80 + Math.random() * 40,
      emoji: BUG_EMOJIS[Math.floor(Math.random() * BUG_EMOJIS.length)],
      born: now,
      lifespan: 2200 - difficulty * 700,
      angle: Math.random() * Math.PI * 2,
      wobble: Math.random() * Math.PI * 2,
    }
  }, [])

  const spawnParticles = useCallback((x: number, y: number) => {
    const colors = ['#c5f400', '#ffffff', '#a0d400', '#ffff80']
    const newP: Particle[] = Array.from({ length: 8 }, () => ({
      id: particleIdRef.current++,
      x, y,
      vx: (Math.random() - 0.5) * 160,
      vy: (Math.random() - 0.5) * 160,
      life: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(prev => [...prev, ...newP])
    setTimeout(() => setParticles(prev => prev.filter(p => !newP.find(n => n.id === p.id))), 600)
  }, [])

  const gameLoop = useCallback((timestamp: number) => {
    if (phaseRef.current !== 'playing') return
    const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05)
    lastTimeRef.current = timestamp

    timeRef.current = Math.max(0, timeRef.current - dt)
    setTimeLeft(Math.ceil(timeRef.current))

    if (timeRef.current <= 0) {
      setPhase('result')
      setBestScore(prev => Math.max(prev, scoreRef.current))
      setBugs([])
      return
    }

    spawnTimerRef.current += dt
    const spawnInterval = Math.max(0.55, 1.1 - (GAME_DURATION - timeRef.current) / 60)
    if (spawnTimerRef.current >= spawnInterval) {
      spawnTimerRef.current = 0
      setBugs(prev => prev.length >= 7 ? prev : [...prev, spawnBug(timestamp)])
    }

    setBugs(prev => {
      const alive: Bug[] = []
      let newMissed = 0
      for (const bug of prev) {
        const age = timestamp - bug.born
        if (age > bug.lifespan) { newMissed++; continue }
        const wobbleX = Math.sin(bug.wobble + age * 0.003) * 18
        const wobbleY = Math.cos(bug.wobble + age * 0.002) * 14
        const nx = bug.x + Math.cos(bug.angle) * bug.speed * dt + wobbleX * dt
        const ny = bug.y + Math.sin(bug.angle) * bug.speed * dt + wobbleY * dt
        let angle = bug.angle
        let bx = nx, by = ny
        if (nx < bug.size || nx > ARENA_W - bug.size) { angle = Math.PI - angle; bx = Math.max(bug.size, Math.min(ARENA_W - bug.size, nx)) }
        if (ny < bug.size || ny > ARENA_H - bug.size) { angle = -angle; by = Math.max(bug.size, Math.min(ARENA_H - bug.size, ny)) }
        alive.push({ ...bug, x: bx, y: by, angle })
      }
      if (newMissed > 0) setMissed(p => p + newMissed)
      return alive
    })

    frameRef.current = requestAnimationFrame(gameLoop)
  }, [spawnBug])

  const startGame = () => {
    setPhase('playing'); phaseRef.current = 'playing'
    setScore(0); scoreRef.current = 0
    setMissed(0); missedRef.current = 0
    setTimeLeft(GAME_DURATION); timeRef.current = GAME_DURATION
    setCombo(0); setBugs([]); setParticles([])
    spawnTimerRef.current = 0
    lastTimeRef.current = performance.now()
    frameRef.current = requestAnimationFrame(gameLoop)
  }

  const killBug = (bug: Bug, e: React.MouseEvent) => {
    e.stopPropagation()
    if (phaseRef.current !== 'playing') return
    setBugs(prev => prev.filter(b => b.id !== bug.id))
    const newCombo = combo + 1
    setCombo(newCombo)
    const pts = newCombo >= 5 ? 3 : newCombo >= 3 ? 2 : 1
    setScore(p => p + pts)
    spawnParticles(bug.x, bug.y)
    setLastHit({ x: bug.x, y: bug.y, pts })
    setTimeout(() => setLastHit(null), 500)
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
    comboTimerRef.current = setTimeout(() => setCombo(0), 1200)
  }

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  const timerPct = (timeLeft / GAME_DURATION) * 100
  const timerColor = timeLeft > 15 ? '#c5f400' : timeLeft > 8 ? '#ffd700' : '#ff4444'
  const accuracy = (score + missed) > 0 ? Math.round((score / (score + missed)) * 100) : 0
  const rank = score >= 40 ? 'S' : score >= 28 ? 'A' : score >= 18 ? 'B' : score >= 10 ? 'C' : 'D'
  const rankColor = rank === 'S' ? '#c5f400' : rank === 'A' ? '#ffd700' : rank === 'B' ? '#80cfff' : rank === 'C' ? '#aaa' : '#ff8888'

  return (
    <section id="game" style={{ padding: '60px 24px', background: 'var(--black, #0a0a0a)' }}>
      <style>{`
        .bh-arena { cursor: crosshair; user-select: none; }
        .bh-bug {
          position: absolute; display: flex; align-items: center; justify-content: center;
          border-radius: 50%; cursor: pointer;
          transition: transform 0.08s ease; will-change: transform, left, top;
        }
        .bh-bug:hover { transform: scale(1.15) !important; filter: brightness(1.2); }
        .bh-bug:active { transform: scale(0.85) !important; }
        @keyframes bugSpawn {
          from { transform: scale(0) rotate(-180deg); opacity: 0; }
          to   { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes ptsPop {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-36px) scale(1.3); }
        }
        @keyframes comboShake {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        @keyframes particleFly {
          to { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
        @keyframes timerPulse {
          0%,100% { opacity: 1; } 50% { opacity: 0.5; }
        }
        @keyframes resultIn {
          from { opacity: 0; transform: scale(0.9) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .bh-scanline {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(197,244,0,0.03) 50%);
          background-size: 100% 4px; pointer-events: none; z-index: 0;
        }
        .bh-crt::after {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%);
          pointer-events: none; z-index: 5; border-radius: 12px;
        }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: '520px', margin: '0 auto 24px', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
          letterSpacing: '0.14em', color: '#c5f400', marginBottom: '8px',
        }}>MINI GAME</p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(24px, 5vw, 40px)', letterSpacing: '-0.03em',
          color: 'white', marginBottom: '6px',
        }}>Bug Hunter 🐛</h2>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: '13px',
          color: 'rgba(255,255,255,0.4)',
        }}>Click all the bugs before they escape. </p>
      </div>

      <div style={{ maxWidth: `${ARENA_W}px`, margin: '0 auto' }}>

        {/* HUD */}
        {phase === 'playing' && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '8px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '18px',
              color: '#c5f400', minWidth: '52px',
            }}>{String(score).padStart(3, '0')}</div>

            <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${timerPct}%`, background: timerColor,
                borderRadius: '99px', transition: 'width 0.3s linear, background 0.5s ease',
                animation: timeLeft <= 5 ? 'timerPulse 0.5s ease infinite' : 'none',
              }} />
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '18px',
              color: timerColor, minWidth: '36px', textAlign: 'right',
              animation: timeLeft <= 5 ? 'timerPulse 0.5s ease infinite' : 'none',
            }}>{timeLeft}s</div>

            {combo >= 2 && (
              <div style={{
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '11px',
                color: '#ffd700', background: 'rgba(255,215,0,0.1)',
                padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(255,215,0,0.25)',
                animation: 'comboShake 0.2s ease', whiteSpace: 'nowrap',
              }}>x{combo} COMBO</div>
            )}
          </div>
        )}

        {/* Arena */}
        <div
          className="bh-arena bh-crt"
          style={{
            width: '100%', height: `${ARENA_H}px`,
            background: '#050d1a',
            border: `2px solid ${phase === 'playing' ? 'rgba(197,244,0,0.3)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '12px', position: 'relative', overflow: 'hidden',
            transition: 'border-color 0.3s ease',
          }}
        >
          <div className="bh-scanline" />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `
              linear-gradient(rgba(197,244,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(197,244,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }} />

          {/* IDLE */}
          {phase === 'idle' && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              zIndex: 10, gap: '14px',
            }}>
              <div style={{ fontSize: '48px', animation: 'bugSpawn 0.5s ease' }}>🐛</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: '22px', color: 'white', letterSpacing: '-0.02em',
              }}>Ready to Hunt?</div>
              {bestScore > 0 && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c5f400' }}>
                  BEST: {bestScore} pts
                </div>
              )}
              <button onClick={startGame} style={{
                background: '#c5f400', color: '#0a0a0a',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px',
                padding: '11px 32px', borderRadius: '50px', border: 'none',
                cursor: 'pointer', boxShadow: '0 0 24px rgba(197,244,0,0.25)',
                transition: 'transform 0.2s ease',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
              >START HUNTING →</button>
            </div>
          )}

          {/* Bugs */}
          {phase === 'playing' && bugs.map(bug => {
            const age = performance.now() - bug.born
            const lifePct = age / bug.lifespan
            const urgency = lifePct > 0.65
            return (
              <div
                key={bug.id}
                className="bh-bug"
                onClick={e => killBug(bug, e)}
                style={{
                  left: `${bug.x - bug.size / 2}px`, top: `${bug.y - bug.size / 2}px`,
                  width: `${bug.size}px`, height: `${bug.size}px`,
                  fontSize: `${bug.size * 0.72}px`,
                  background: urgency ? `rgba(255,${Math.floor(100 - lifePct * 80)},0,0.18)` : 'rgba(197,244,0,0.10)',
                  border: `1.5px solid ${urgency ? `rgba(255,80,0,${0.4 + lifePct * 0.4})` : 'rgba(197,244,0,0.25)'}`,
                  animation: `bugSpawn 0.2s cubic-bezier(0.34,1.56,0.64,1) both`,
                  zIndex: 4,
                }}
              >{bug.emoji}</div>
            )
          })}

          {/* Particles */}
          {particles.map(p => (
            <div key={p.id} style={{
              position: 'absolute', left: `${p.x}px`, top: `${p.y}px`,
              width: '5px', height: '5px', background: p.color, borderRadius: '50%',
              pointerEvents: 'none', zIndex: 6,
              // @ts-ignore
              '--tx': `${p.vx * 0.5}px`, '--ty': `${p.vy * 0.5}px`,
              animation: 'particleFly 0.55s ease forwards',
            }} />
          ))}

          {/* +pts */}
          {lastHit && (
            <div style={{
              position: 'absolute', left: `${lastHit.x}px`, top: `${lastHit.y - 12}px`,
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: lastHit.pts >= 3 ? '18px' : '14px',
              color: lastHit.pts >= 3 ? '#ffd700' : '#c5f400',
              pointerEvents: 'none', zIndex: 8,
              animation: 'ptsPop 0.5s ease forwards',
              textShadow: '0 0 10px currentColor', whiteSpace: 'nowrap',
            }}>
              {lastHit.pts >= 3 ? '🔥 +3' : lastHit.pts >= 2 ? '⚡ +2' : '+1'}
            </div>
          )}

          {/* RESULT */}
          {phase === 'result' && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(5,13,26,0.92)', backdropFilter: 'blur(8px)', zIndex: 10,
            }}>
              <div style={{
                textAlign: 'center', padding: '28px 36px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                animation: 'resultIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '56px', color: rankColor, lineHeight: 1,
                  textShadow: `0 0 32px ${rankColor}88`, marginBottom: '4px',
                }}>{rank}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', marginBottom: '20px',
                }}>RANK</div>

                <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '20px' }}>
                  {[
                    { label: 'SCORE', val: score, color: '#c5f400' },
                    { label: 'MISSED', val: missed, color: '#ff6b6b' },
                    { label: 'ACC', val: `${accuracy}%`, color: '#80cfff' },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: s.color }}>{s.val}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginTop: '3px' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {score >= bestScore && bestScore > 0 && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffd700', marginBottom: '14px' }}>
                    🏆 NEW BEST SCORE!
                  </div>
                )}

                <button onClick={startGame} style={{
                  background: '#c5f400', color: '#0a0a0a',
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px',
                  padding: '10px 28px', borderRadius: '50px', border: 'none',
                  cursor: 'pointer', boxShadow: '0 0 20px rgba(197,244,0,0.2)',
                  transition: 'transform 0.2s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >PLAY AGAIN →</button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom hint */}
        {phase === 'idle' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px', flexWrap: 'wrap' }}>
            {[
              { icon: '🐛', label: '1 pt' },
              { icon: '⚡', label: '2 pts — 3x combo' },
              { icon: '🔥', label: '3 pts — 5x combo' },
            ].map(h => (
              <div key={h.label} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                color: 'rgba(255,255,255,0.3)',
              }}>
                <span>{h.icon}</span>{h.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BugHunter