import React, { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import SocialBar from './components/SocialBar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Features from './sections/Features'
import About from './sections/About'
import Work from './sections/Work'
import Tech from './sections/Tech'
import Contact from './sections/Contact'
import ScrollToTop from './components/ScrollToTop'
import BugHunter from './components/BugHunter'
import MemoryFlip from './components/MemoryFlip'

function App() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    // Touch device — jangan jalankan cursor logic sama sekali
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX  // tanpa * 1.111, karena zoom: 0.9 sudah dihapus dari CSS
      mouseY = e.clientY
      cursor.style.left = mouseX - 6 + 'px'
      cursor.style.top = mouseY - 6 + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX - 18) * 0.15
      followerY += (mouseY - followerY - 18) * 0.15
      follower.style.left = followerX + 'px'
      follower.style.top = followerY + 'px'
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)  // cleanup RAF yang tadinya leak
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />

      <Navbar />
      <SocialBar />

      <main>
        <Hero />
        <Features />
        <About />
        <Work />
        <Tech />
        
        <MemoryFlip />
        <Contact />
        <ScrollToTop />
        
      </main>

      <Footer />
    </>
  )
}

export default App