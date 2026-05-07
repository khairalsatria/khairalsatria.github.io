import { useEffect, useState, useRef } from 'react'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeSlideOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(16px) scale(0.85); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);    opacity: 0.5; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }

        .stt-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: none;
          background: var(--lime, #c5f400);
          color: var(--black, #111);
          cursor: pointer;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                      background 0.2s ease;
        }
        .stt-btn:hover {
          transform: scale(1.12);
          background: var(--lime, #c5f400);
          filter: brightness(1.08);
        }
        .stt-btn:active {
          transform: scale(0.94);
        }
        .stt-btn svg {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .stt-btn:hover svg {
          animation: arrowBounce 0.6s ease infinite;
        }

        .stt-ring {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2px solid var(--lime, #c5f400);
          pointer-events: none;
          z-index: 998;
          animation: pulse-ring 1.6s cubic-bezier(0.4,0,0.6,1) infinite;
        }

        .stt-visible {
          animation: fadeSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .stt-hidden {
          animation: fadeSlideOut 0.25s ease forwards;
        }
      `}</style>

      {/* Pulse ring — hanya saat hovered */}
      {visible && hovered && <span className="stt-ring" />}

      {visible && (
        <button
          ref={btnRef}
          onClick={scrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="stt-btn stt-visible"
          aria-label="Scroll to top"
          title="Back to top"
        >
          {/* Icon: rounded arrow up dengan tail */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  )
}

export default ScrollToTop