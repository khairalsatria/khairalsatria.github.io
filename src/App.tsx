import React, { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import SocialBar from './components/SocialBar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Features from './sections/Features'
import About from './sections/About'
import Work from './sections/Work'
import Stack from './sections/Stack'
import Contact from './sections/Contact'

function App() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX * 1.111
      mouseY = e.clientY * 1.111
      cursor.style.left = mouseX - 6 + 'px'
      cursor.style.top = mouseY - 6 + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX - 18) * 0.15
      followerY += (mouseY - followerY - 18) * 0.15
      follower.style.left = followerX + 'px'
      follower.style.top = followerY + 'px'
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />

      <Navbar />
      <SocialBar />

      <main>
        <Hero />
        <Features />
        <About />
        <Work />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
