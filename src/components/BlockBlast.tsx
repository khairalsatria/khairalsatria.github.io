import React, { useState, useCallback, useEffect } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────
type Cell = string | null
type Grid = Cell[][]
interface BlockShape {
  shape: number[][]
  color: string
}

// ── Constants ──────────────────────────────────────────────────────────────
const GRID_SIZE = 6
const COLORS = {
  lime:   '#c5f400',
  blue:   '#3b6bff',
  cyan:   '#00d4ff',
  purple: '#a855f7',
  orange: '#ff6b2b',
  pink:   '#ff4d8f',
}

const BLOCK_POOL: BlockShape[] = [
  // 1x1
  { shape: [[1]],                          color: COLORS.lime   },
  // 1x2
  { shape: [[1,1]],                        color: COLORS.cyan   },
  { shape: [[1],[1]],                      color: COLORS.cyan   },
  // 1x3
  { shape: [[1,1,1]],                      color: COLORS.blue   },
  { shape: [[1],[1],[1]],                  color: COLORS.blue   },
  // 2x2
  { shape: [[1,1],[1,1]],                  color: COLORS.orange },
  // L shapes
  { shape: [[1,0],[1,0],[1,1]],            color: COLORS.purple },
  { shape: [[0,1],[0,1],[1,1]],            color: COLORS.purple },
  { shape: [[1,1],[1,0],[1,0]],            color: COLORS.pink   },
  { shape: [[1,1],[0,1],[0,1]],            color: COLORS.pink   },
  // T shape
  { shape: [[1,1,1],[0,1,0]],              color: COLORS.orange },
  { shape: [[0,1],[1,1],[0,1]],            color: COLORS.orange },
  // S/Z
  { shape: [[0,1,1],[1,1,0]],              color: COLORS.lime   },
  { shape: [[1,1,0],[0,1,1]],              color: COLORS.cyan   },
  // 2x3
  { shape: [[1,1],[1,1],[1,1]],            color: COLORS.blue   },
]

function emptyGrid(): Grid {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))
}

function pickBlocks(): BlockShape[] {
  const pool = [...BLOCK_POOL]
  const result: BlockShape[] = []
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    result.push(pool.splice(idx, 1)[0])
  }
  return result
}

function canPlace(grid: Grid, shape: number[][], row: number, col: number): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue
      const nr = row + r, nc = col + c
      if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) return false
      if (grid[nr][nc]) return false
    }
  }
  return true
}

function placeBlock(grid: Grid, shape: number[][], row: number, col: number, color: string): Grid {
  const next = grid.map(r => [...r])
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c]) next[row + r][col + c] = color
  return next
}

function clearLines(grid: Grid): { grid: Grid; cleared: number } {
  const next = grid.map(r => [...r])
  const toClearRows = new Set<number>()
  const toClearCols = new Set<number>()

  for (let r = 0; r < GRID_SIZE; r++)
    if (next[r].every(c => c !== null)) toClearRows.add(r)
  for (let c = 0; c < GRID_SIZE; c++)
    if (next.every(r => r[c] !== null)) toClearCols.add(c)

  toClearRows.forEach(r => { for (let c = 0; c < GRID_SIZE; c++) next[r][c] = null })
  toClearCols.forEach(c => { for (let r = 0; r < GRID_SIZE; r++) next[r][c] = null })

  return { grid: next, cleared: toClearRows.size + toClearCols.size }
}

function hasAnyMove(grid: Grid, blocks: BlockShape[]): boolean {
  return blocks.some(b =>
    b && Array.from({ length: GRID_SIZE }, (_, r) =>
      Array.from({ length: GRID_SIZE }, (_, c) => canPlace(grid, b.shape, r, c))
    ).flat().some(Boolean)
  )
}

function getPreviewCells(shape: number[][], row: number, col: number): Set<string> {
  const s = new Set<string>()
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c]) s.add(`${row + r},${col + c}`)
  return s
}

// ── Component ──────────────────────────────────────────────────────────────
const BlockBlast: React.FC = () => {
  const [grid, setGrid]           = useState<Grid>(emptyGrid)
  const [queue, setQueue]         = useState<(BlockShape | null)[]>(pickBlocks)
  const [selected, setSelected]   = useState<number | null>(null)
  const [hover, setHover]         = useState<{ r: number; c: number } | null>(null)
  const [score, setScore]         = useState(0)
  const [best, setBest]           = useState(0)
  const [combo, setCombo]         = useState(0)
  const [phase, setPhase]         = useState<'idle' | 'playing' | 'gameover'>('idle')
  const [flash, setFlash]         = useState<Set<string>>(new Set())
  const [shake, setShake]         = useState(false)
  const [scorePopups, setScorePopups] = useState<{ id: number; val: number; r: number; c: number }[]>([])
  const popupId = React.useRef(0)

  const startGame = () => {
    setGrid(emptyGrid())
    setQueue(pickBlocks())
    setSelected(null)
    setHover(null)
    setScore(0)
    setCombo(0)
    setFlash(new Set())
    setPhase('playing')
  }

  const triggerScorePopup = (val: number, r: number, c: number) => {
    const id = popupId.current++
    setScorePopups(prev => [...prev, { id, val, r, c }])
    setTimeout(() => setScorePopups(prev => prev.filter(p => p.id !== id)), 800)
  }

  const handleCellTap = useCallback((r: number, c: number) => {
    if (phase !== 'playing' || selected === null) return
    const block = queue[selected]
    if (!block) return

    if (!canPlace(grid, block.shape, r, c)) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
      return
    }

    // place
    const newGrid = placeBlock(grid, block.shape, r, c, block.color)
    const { grid: clearedGrid, cleared } = clearLines(newGrid)

    // flash cleared lines
    if (cleared > 0) {
      const flashCells = new Set<string>()
      for (let row = 0; row < GRID_SIZE; row++)
        if (newGrid[row].every(cell => cell !== null))
          for (let col = 0; col < GRID_SIZE; col++) flashCells.add(`${row},${col}`)
      for (let col = 0; col < GRID_SIZE; col++)
        if (newGrid.every(row => row[col] !== null))
          for (let row = 0; row < GRID_SIZE; row++) flashCells.add(`${row},${col}`)
      setFlash(flashCells)
      setTimeout(() => setFlash(new Set()), 350)
    }

    const newCombo = cleared > 0 ? combo + 1 : 0
    const pts = cleared === 0 ? 0 :
      cleared === 1 ? (10 * (newCombo > 1 ? newCombo : 1)) :
      cleared === 2 ? (25 * (newCombo > 1 ? newCombo : 1)) :
      50 * (newCombo > 1 ? newCombo : 1)

    if (pts > 0) triggerScorePopup(pts, r, c)

    const newScore = score + pts + 1
    const newQueue = queue.map((b, i) => i === selected ? null : b) as (BlockShape | null)[]
    const allUsed = newQueue.every(b => b === null)
    const finalQueue = allUsed ? pickBlocks() : newQueue

    setGrid(clearedGrid)
    setQueue(finalQueue)
    setScore(newScore)
    setBest(prev => Math.max(prev, newScore))
    setCombo(newCombo)
    setSelected(null)
    setHover(null)

    // check game over
    setTimeout(() => {
      if (!hasAnyMove(clearedGrid, finalQueue.filter(Boolean) as BlockShape[])) {
        setPhase('gameover')
      }
    }, 400)
  }, [phase, selected, queue, grid, score, combo])

  const previewCells = selected !== null && hover && queue[selected]
    ? getPreviewCells(queue[selected]!.shape, hover.r, hover.c)
    : new Set<string>()

  const previewValid = selected !== null && hover && queue[selected]
    ? canPlace(grid, queue[selected]!.shape, hover.r, hover.c)
    : false

  const previewColor = selected !== null && queue[selected] ? queue[selected]!.color : null

  // cell size responsive
  const CELL = 48

  return (
    <section id="blockblast" style={{ padding: '60px 24px', background: '#060c18' }}>
      <style>{`
        .bb-cell {
          border-radius: 6px;
          transition: background 0.12s ease, transform 0.1s ease, box-shadow 0.1s ease;
          cursor: pointer;
          position: relative;
        }
        .bb-cell:active { transform: scale(0.92); }
        .bb-block-card {
          border-radius: 12px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          border: 2px solid transparent;
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          min-width: 80px; min-height: 80px;
          -webkit-tap-highlight-color: transparent;
        }
        .bb-block-card:hover { background: rgba(255,255,255,0.08); }
        .bb-block-card.selected {
          border-color: #c5f400;
          background: rgba(197,244,0,0.08);
          transform: scale(1.08) translateY(-4px);
          box-shadow: 0 8px 24px rgba(197,244,0,0.2);
        }
        .bb-block-card.used { opacity: 0.2; pointer-events: none; }
        @keyframes flashCell {
          0%,100% { filter: brightness(1); }
          50%      { filter: brightness(2.5); transform: scale(1.05); }
        }
        @keyframes scoreFloat {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-48px) scale(1.3); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        @keyframes gameoverIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes idlePulse {
          0%,100% { transform: scale(1); opacity: 0.7; }
          50%      { transform: scale(1.04); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: '360px', margin: '0 auto 20px', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
          letterSpacing: '0.14em', color: '#c5f400', marginBottom: '6px',
        }}>MINI GAME</p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(22px, 5vw, 36px)', letterSpacing: '-0.03em',
          color: 'white', marginBottom: '4px',
        }}>Block Blast 🧩</h2>
        {/* <p style={{
          fontFamily: 'var(--font-display)', fontSize: '13px',
          color: 'rgba(255,255,255,0.4)',
        }}>Pilih blok → tap grid untuk menempatkan. Hapus baris/kolom = poin!</p> */}
      </div>

      <div style={{ maxWidth: '360px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

        {/* Score HUD */}
        {phase === 'playing' && (
          <div style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 16px', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>SCORE</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: '#c5f400' }}>{score}</div>
            </div>
            {combo >= 2 && (
              <div style={{
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '11px',
                color: '#ffd700', background: 'rgba(255,215,0,0.1)',
                padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(255,215,0,0.2)',
              }}>🔥 x{combo} COMBO</div>
            )}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>BEST</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'rgba(255,255,255,0.5)' }}>{best}</div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL}px)`,
            gap: '4px',
            padding: '10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            position: 'relative',
            animation: shake ? 'shake 0.4s ease' : 'none',
          }}
        >
          {Array.from({ length: GRID_SIZE }, (_, r) =>
            Array.from({ length: GRID_SIZE }, (_, c) => {
              const key = `${r},${c}`
              const filled = grid[r][c]
              const isPreview = previewCells.has(key)
              const isFlash = flash.has(key)
              const isHoverCell = hover?.r === r && hover?.c === c

              let bg = 'rgba(255,255,255,0.05)'
              let boxShadow = 'none'
              let border = '1px solid rgba(255,255,255,0.06)'

              if (filled) {
                bg = filled
                boxShadow = `0 2px 8px ${filled}55`
                border = `1px solid ${filled}88`
              }
              if (isPreview && !filled) {
                bg = previewValid ? `${previewColor}55` : 'rgba(255,80,80,0.25)'
                border = `1px solid ${previewValid ? previewColor + 'aa' : 'rgba(255,80,80,0.5)'}`
              }
              if (isFlash) {
                bg = '#ffffff'
                boxShadow = '0 0 16px #ffffff'
              }

              return (
                <div
                  key={key}
                  className="bb-cell"
                  style={{
                    width: `${CELL}px`, height: `${CELL}px`,
                    background: bg, boxShadow, border,
                    animation: isFlash ? 'flashCell 0.35s ease' : 'none',
                  }}
                  onClick={() => handleCellTap(r, c)}
                  onMouseEnter={() => phase === 'playing' && selected !== null && setHover({ r, c })}
                  onMouseLeave={() => setHover(null)}
                />
              )
            })
          )}

          {/* Score popups */}
          {scorePopups.map(p => (
            <div key={p.id} style={{
              position: 'absolute',
              left: `${p.c * (CELL + 4) + 10}px`,
              top: `${p.r * (CELL + 4) + 10}px`,
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '16px', color: '#ffd700',
              pointerEvents: 'none', zIndex: 20,
              animation: 'scoreFloat 0.8s ease forwards',
              textShadow: '0 0 10px #ffd700',
              whiteSpace: 'nowrap',
            }}>+{p.val}</div>
          ))}
        </div>

        {/* Block queue */}
        {phase === 'playing' && (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', width: '100%' }}>
            {queue.map((block, i) => (
              <div
                key={i}
                className={`bb-block-card ${selected === i ? 'selected' : ''} ${!block ? 'used' : ''}`}
                style={{ flex: 1 }}
                onClick={() => block && setSelected(selected === i ? null : i)}
              >
                {block ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${block.shape[0].length}, 14px)`,
                    gridTemplateRows: `repeat(${block.shape.length}, 14px)`,
                    gap: '2px',
                  }}>
                    {block.shape.flat().map((cell, ci) => (
                      <div key={ci} style={{
                        width: '14px', height: '14px',
                        borderRadius: '3px',
                        background: cell ? block.color : 'transparent',
                        boxShadow: cell ? `0 0 6px ${block.color}66` : 'none',
                      }} />
                    ))}
                  </div>
                ) : (
                  <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)' }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Hint text */}
        {phase === 'playing' && (
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: selected !== null ? '#c5f400' : 'rgba(255,255,255,0.25)',
            textAlign: 'center', transition: 'color 0.2s ease',
          }}>
            {selected !== null ? '👆 Tap grid untuk menempatkan blok' : '👆 Pilih salah satu blok di atas'}
          </p>
        )}

        {/* IDLE */}
        {phase === 'idle' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 18px)', gap: '3px', animation: 'idlePulse 2s ease infinite' }}>
              {[1,1,1,1,1,0,1,0,0].map((c, i) => (
                <div key={i} style={{ width: '18px', height: '18px', borderRadius: '4px', background: c ? '#c5f400' : 'transparent', boxShadow: c ? '0 0 8px #c5f40066' : 'none' }} />
              ))}
            </div>
            <button onClick={startGame} style={{
              background: '#c5f400', color: '#0a0a0a',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px',
              padding: '11px 32px', borderRadius: '50px', border: 'none',
              cursor: 'pointer', boxShadow: '0 0 24px rgba(197,244,0,0.25)',
              transition: 'transform 0.2s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            >MAIN SEKARANG →</button>
          </div>
        )}

        {/* GAME OVER */}
        {phase === 'gameover' && (
          <div style={{
            width: '100%', textAlign: 'center', padding: '28px 24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            animation: 'gameoverIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>💥</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '22px', color: 'white', marginBottom: '20px',
            }}>Game Over</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '24px' }}>
              {[
                { label: 'SCORE', val: score, color: '#c5f400' },
                { label: 'BEST',  val: best,  color: '#ffd700' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: s.color }}>{s.val}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginTop: '3px' }}>{s.label}</div>
                </div>
              ))}
            </div>
            {score >= best && best > 0 && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffd700', marginBottom: '16px' }}>
                🏆 NEW BEST!
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
            >MAIN LAGI →</button>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlockBlast