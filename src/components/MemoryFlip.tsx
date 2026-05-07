import React, { useState, useEffect, useCallback } from 'react'

interface Card {
  id: number
  symbol: { emoji: string; label: string }
  flipped: boolean
  matched: boolean
}

const TECH_SYMBOLS = [
  { emoji: '⚛️',  label: 'React'      },
  { emoji: '🟨',  label: 'JavaScript' },
  { emoji: '🐍',  label: 'Python'     },
  { emoji: '🦀',  label: 'Rust'       },
  { emoji: '🐳',  label: 'Docker'     },
  { emoji: '🌿',  label: 'Git'        },
  { emoji: '🗄️',  label: 'Database'   },
  { emoji: '🔷',  label: 'TypeScript' },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeck(): Card[] {
  return shuffle(
    TECH_SYMBOLS.flatMap((sym, i) => [
      { id: i * 2,     symbol: sym, flipped: false, matched: false },
      { id: i * 2 + 1, symbol: sym, flipped: false, matched: false },
    ])
  )
}

const MemoryFlip: React.FC = () => {
  const [cards, setCards]         = useState<Card[]>(buildDeck)
  const [selected, setSelected]   = useState<number[]>([])
  const [moves, setMoves]         = useState(0)
  const [time, setTime]           = useState(0)
  const [running, setRunning]     = useState(false)
  const [phase, setPhase]         = useState<'idle' | 'playing' | 'result'>('idle')
  const [bestMoves, setBestMoves] = useState<number | null>(null)
  const [locked, setLocked]       = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setTime(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  const startGame = () => {
    setCards(buildDeck())
    setSelected([])
    setMoves(0)
    setTime(0)
    setLocked(false)
    setPhase('playing')
    setRunning(true)
  }

  const flipCard = useCallback((cardId: number) => {
    if (locked || phase !== 'playing') return
    setCards(prev => {
      const card = prev.find(c => c.id === cardId)
      if (!card || card.flipped || card.matched) return prev
      return prev.map(c => c.id === cardId ? { ...c, flipped: true } : c)
    })
    setSelected(prev => {
      if (prev.length === 1 && prev[0] === cardId) return prev
      return [...prev, cardId]
    })
  }, [locked, phase])

  useEffect(() => {
    if (selected.length !== 2) return
    setLocked(true)
    setMoves(m => m + 1)
    const [a, b] = selected
    const cardA = cards.find(c => c.id === a)
    const cardB = cards.find(c => c.id === b)
    if (cardA?.symbol.label === cardB?.symbol.label) {
      setCards(prev => prev.map(c =>
        c.id === a || c.id === b ? { ...c, matched: true, flipped: true } : c
      ))
      setSelected([])
      setLocked(false)
    } else {
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === a || c.id === b ? { ...c, flipped: false } : c
        ))
        setSelected([])
        setLocked(false)
      }, 900)
    }
  }, [selected])

  useEffect(() => {
    if (phase !== 'playing') return
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setRunning(false)
      setPhase('result')
      setBestMoves(prev => prev === null ? moves : Math.min(prev, moves))
    }
  }, [cards, phase, moves])

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  const rank = moves <= 10 ? 'S' : moves <= 14 ? 'A' : moves <= 18 ? 'B' : moves <= 24 ? 'C' : 'D'
  const rankColor = rank === 'S' ? '#c5f400' : rank === 'A' ? '#ffd700' : rank === 'B' ? '#80cfff' : rank === 'C' ? '#aaa' : '#ff8888'
  const matched = cards.filter(c => c.matched).length / 2

  return (
    <section id="game2" style={{
      padding: '60px 24px',
      background: '#060c18',
    }}>
      <style>{`
        .mf-card-wrap {
          perspective: 500px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          aspect-ratio: 1 / 1;
        }
        .mf-card-inner {
          width: 100%; height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
        }
        .mf-card-wrap.flipped .mf-card-inner,
        .mf-card-wrap.matched .mf-card-inner { transform: rotateY(180deg); }
        .mf-face, .mf-back {
          position: absolute; inset: 0;
          border-radius: 10px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .mf-face {
          background: #0d1a2e;
          border: 1.5px solid rgba(197,244,0,0.12);
          transition: border-color 0.2s, background 0.2s;
        }
        .mf-face:hover {
          border-color: rgba(197,244,0,0.4);
          background: #111f38;
        }
        .mf-back {
          background: #0d1a2e;
          border: 1.5px solid rgba(197,244,0,0.3);
          transform: rotateY(180deg);
          flex-direction: column; gap: 2px;
        }
        .mf-card-wrap.matched .mf-back {
          background: rgba(197,244,0,0.07);
          border-color: rgba(197,244,0,0.55);
        }
        @keyframes matchPop {
          0%   { transform: rotateY(180deg) scale(1); }
          50%  { transform: rotateY(180deg) scale(1.1); }
          100% { transform: rotateY(180deg) scale(1); }
        }
        .mf-card-wrap.matched .mf-card-inner {
          animation: matchPop 0.3s ease 0.05s both;
        }
        @keyframes resultIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mf-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        @media (max-width: 360px) {
          .mf-grid { gap: 6px; }
        }
      `}</style>

      {/* Header — compact */}
      <div style={{ maxWidth: '420px', margin: '0 auto 24px', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
          letterSpacing: '0.14em', color: '#c5f400', marginBottom: '8px',
        }}>MINI GAME</p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(22px, 5vw, 36px)', letterSpacing: '-0.03em',
          color: 'white', marginBottom: '6px',
        }}>Memory Flip 🃏</h2>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: '13px',
          color: 'rgba(255,255,255,0.4)',
        }}>Cocokkan semua kartu tech. Sedikit move = rank lebih tinggi.</p>
      </div>

      <div style={{ maxWidth: '420px', margin: '0 auto' }}>

        {/* HUD — compact single row */}
        {phase === 'playing' && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '10px', padding: '8px 14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '10px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>MOVES</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: '#c5f400' }}>{moves}</span>
            </div>
            {/* progress dots */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '140px' }}>
              {TECH_SYMBOLS.map((s, i) => (
                <div key={i} style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: i < matched ? '#c5f400' : 'rgba(255,255,255,0.12)',
                  transition: 'background 0.3s ease',
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>TIME</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'white' }}>{fmt(time)}</span>
            </div>
          </div>
        )}

        {/* Card Grid */}
        {phase !== 'result' && (
          <div className="mf-grid">
            {cards.map(card => (
              <div
                key={card.id}
                className={`mf-card-wrap ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
                onClick={() => flipCard(card.id)}
              >
                <div className="mf-card-inner">
                  <div className="mf-face">
                    <span style={{ fontSize: 'clamp(14px, 3.5vw, 20px)', opacity: 0.2 }}>{'</>'}</span>
                  </div>
                  <div className="mf-back">
                    <span style={{ fontSize: 'clamp(18px, 4.5vw, 28px)', lineHeight: 1 }}>{card.symbol.emoji}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 'clamp(7px, 1.6vw, 10px)',
                      color: card.matched ? '#c5f400' : 'rgba(255,255,255,0.5)',
                      fontWeight: 700, letterSpacing: '0.04em',
                    }}>{card.symbol.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* IDLE */}
        {phase === 'idle' && (
          <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            {bestMoves !== null && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffd700' }}>
                🏆 BEST: {bestMoves} moves
              </div>
            )}
            <button onClick={startGame} style={{
              background: '#c5f400', color: '#0a0a0a',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px',
              padding: '11px 32px', borderRadius: '50px', border: 'none',
              cursor: 'pointer', boxShadow: '0 0 24px rgba(197,244,0,0.2)',
              transition: 'transform 0.2s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            >MULAI →</button>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[['≤10','S 🏆'],['≤14','A ⭐'],['≤18','B'],['≤24','C']].map(([m, r]) => (
                <div key={m} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.22)' }}>{m}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{r}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === 'result' && (
          <div style={{
            textAlign: 'center', padding: '32px 24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            animation: 'resultIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '64px', color: rankColor, lineHeight: 1,
              textShadow: `0 0 36px ${rankColor}55`, marginBottom: '4px',
            }}>{rank}</div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: '24px',
            }}>RANK</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '24px' }}>
              {[
                { label: 'MOVES', val: moves, color: '#c5f400' },
                { label: 'TIME',  val: fmt(time), color: '#80cfff' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: s.color }}>{s.val}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
            {moves === bestMoves && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffd700', marginBottom: '16px' }}>
                🏆 NEW BEST — {bestMoves} moves!
              </div>
            )}
            <button onClick={startGame} style={{
              background: '#c5f400', color: '#0a0a0a',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px',
              padding: '11px 32px', borderRadius: '50px', border: 'none',
              cursor: 'pointer', boxShadow: '0 0 24px rgba(197,244,0,0.2)',
              transition: 'transform 0.2s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            >MAIN LAGI →</button>
          </div>
        )}
      </div>
    </section>
  )
}

export default MemoryFlip