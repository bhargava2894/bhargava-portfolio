import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Preloader from './fx/Preloader'
import Cursor from './fx/Cursor'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Bands from './sections/Bands'
import Work from './sections/Work'
import Impact from './sections/Impact'
import Experience from './sections/Experience'
import Stack from './sections/Stack'
import Credentials from './sections/Credentials'
import Contact from './sections/Contact'
import './styles/site.css'

function App() {
  const [loading, setLoading] = useState(true)
  const finishLoading = useCallback(() => setLoading(false), [])

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', loading)
  }, [loading])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={finishLoading} />}</AnimatePresence>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav ready={!loading} />

      <main>
        <Hero ready={!loading} />
        <div className="page">
          <About />
          <Bands />
          <Work />
          <Impact />
          <Experience />
          <Stack />
          <Credentials />
        </div>
      </main>

      <Contact />
    </MotionConfig>
  )
}

export default App
