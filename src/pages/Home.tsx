import { useEffect } from 'react'
import Nav from '../components/Nav'
import Hero from '../components/sections/Hero'
import Experience from '../components/sections/Experience'
import Portfolio from '../components/sections/Portfolio'
import Authority from '../components/sections/Authority'
import Connect from '../components/sections/Connect'
import { useReveal } from '../hooks/useReveal'

export default function Home() {
  // Kick off reveal observer after mount
  useReveal()

  // Update document title
  useEffect(() => {
    document.title = 'Christian Weber — AI-Native Cloud Architect'
  }, [])

  return (
    <>
      <Nav />
      <Hero />
      <Experience />
      <Portfolio />
      <Authority />
      <Connect />
    </>
  )
}
