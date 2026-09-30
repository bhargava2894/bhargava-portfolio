import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import Magnetic from '../fx/Magnetic'
import { easeInOutQuart, easeOutExpo } from '../fx/motion'
import { profile } from '../data/resume'

const links = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'impact', label: 'Impact' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' }
]

function RollText({ children }) {
  return (
    <span className="roll">
      <span className="roll-inner">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  )
}

export default function Nav({ ready }) {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setHidden(latest > lastY.current && latest > 240)
    setScrolled(latest > 40)
    lastY.current = latest
  })

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen)
    if (!menuOpen) return undefined
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const headerY = !ready ? '-120%' : hidden && !menuOpen ? '-120%' : '0%'

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu' : ''}`}
        initial={{ y: '-120%' }}
        animate={{ y: headerY }}
        transition={{ duration: 0.7, ease: easeOutExpo, delay: ready && !scrolled ? 0.9 : 0 }}
      >
        <div className="nav-inner">
          <a href="#top" className="nav-logo" data-cursor="Top" onClick={() => setMenuOpen(false)}>
            <span className="nav-logo-mark">BS</span>
            <span className="nav-logo-text">
              <RollText>{profile.name}</RollText>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {links.map((link) => (
              <a key={link.id} href={`#${link.id}`}>
                <RollText>{link.label}</RollText>
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <Magnetic strength={0.3}>
              <a href="#contact" className="nav-cta">
                <span className="nav-cta-dot" />
                <RollText>Let&apos;s talk</RollText>
              </a>
            </Magnetic>
            <button
              className={`nav-burger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="menu-overlay"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: easeInOutQuart }}
          >
            <motion.nav
              className="menu-links"
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
            >
              {[...links, { id: 'contact', label: 'Contact' }].map((link, i) => (
                <span className="mask" key={link.id}>
                  <motion.a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    variants={{
                      hidden: { y: '110%', transition: { duration: 0.3 } },
                      show: { y: '0%', transition: { duration: 0.8, ease: easeOutExpo } }
                    }}
                  >
                    <span className="menu-index">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                </span>
              ))}
            </motion.nav>
            <motion.div
              className="menu-foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
            >
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span>{profile.location}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
