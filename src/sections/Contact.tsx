import React, { useState } from 'react'

const Contact: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const emojis = ['😞', '😕', '😐', '🙂', '🤩']
  const labels = ['Bad', 'Poor', 'Okay', 'Good', 'Amazing!']

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    background: 'var(--light)',
    border: '2px solid transparent',
    borderRadius: '14px',
    fontFamily: 'var(--font-display)',
    fontSize: '15px',
    color: 'var(--black)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  return (
    <section id="contact" style={{
      padding: '100px 40px',
      background: 'var(--light)',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Feedback */}
        <div style={{
          background: 'white',
          borderRadius: '28px',
          padding: '60px',
          textAlign: 'center',
          marginBottom: '40px',
          boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--blue)',
            marginBottom: '16px',
          }}>FEEDBACK</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '36px',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}>How was your experience?</h2>
          <p style={{
            color: 'var(--gray)',
            fontFamily: 'var(--font-display)',
            fontSize: '15px',
            marginBottom: '40px',
          }}>We value your feedback to improve our services and products.</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            {emojis.map((emoji, i) => (
              <button key={i} onClick={() => setRating(i)} style={{
                fontSize: '36px',
                background: 'none',
                border: '3px solid',
                borderColor: rating === i ? 'var(--blue)' : 'transparent',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                transform: rating === i ? 'scale(1.2)' : 'scale(1)',
                filter: rating !== null && rating !== i ? 'grayscale(1) opacity(0.4)' : 'none',
              }}>
                {emoji}
              </button>
            ))}
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: rating !== null ? 'var(--blue)' : 'var(--gray)',
            fontWeight: 700,
            minHeight: '20px',
          }}>
            {rating !== null ? labels[rating] : 'Rate us'}
          </p>
        </div>

        {/* Contact Form */}
        {/* <div style={{
          background: 'white',
          borderRadius: '28px',
          padding: '60px',
          boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--blue)',
            marginBottom: '16px',
          }}>GET IN TOUCH</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '36px',
            letterSpacing: '-0.02em',
            marginBottom: '40px',
          }}>Let's work together</h2>

          {submitted ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              background: 'var(--lime)',
              borderRadius: '20px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px' }}>Message sent!</h3>
              <p style={{ fontFamily: 'var(--font-display)', color: 'var(--black)', marginTop: '8px' }}>I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--blue)'}
                onBlur={e => (e.target as HTMLElement).style.borderColor = 'transparent'}
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--blue)'}
                onBlur={e => (e.target as HTMLElement).style.borderColor = 'transparent'}
              />
              <textarea
                placeholder="Tell me about your project..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--blue)'}
                onBlur={e => (e.target as HTMLElement).style.borderColor = 'transparent'}
              />
              <button
                onClick={() => { if (name && email && message) setSubmitted(true) }}
                style={{
                  background: 'var(--blue)',
                  color: 'white',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '16px',
                  padding: '18px',
                  borderRadius: '14px',
                  border: 'none',
                  letterSpacing: '0.02em',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--lime)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--black)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--blue)'
                  ;(e.currentTarget as HTMLElement).style.color = 'white'
                }}
              >
                Send Message →
              </button>
            </div>
          )}
        </div> */}
      </div>
    </section>
  )
}

export default Contact
