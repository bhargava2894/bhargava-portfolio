import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'
import { CharReveal } from '../fx/Reveal'
import Magnetic from '../fx/Magnetic'
import { easeOutExpo } from '../fx/motion'
import { profile } from '../data/resume'

const HeroScene = lazy(() => import('./HeroScene'))

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  transition: { duration: 1, ease: easeOutExpo, delay }
})

export default function Hero({ ready }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [focusIndex, setFocusIndex] = useState(0)

  // Scroll: the whole hero recedes (scales, rounds, darkens) as the next section slides over it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const radius = useTransform(scrollYProgress, [0, 0.4], [0, 48])
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.65])

  // Pointer: the two lines of the name drift apart in opposite directions.
  const pointerX = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 50, damping: 18 })
  const firstLineX = useTransform(smoothX, (v) => v * -40)
  const secondLineX = useTransform(smoothX, (v) => v * 40)

  useEffect(() => {
    const onMove = (event) => pointerX.set(event.clientX / window.innerWidth - 0.5)
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointerX])

  useEffect(() => {
    if (!ready) return undefined
    const id = setInterval(() => setFocusIndex((i) => (i + 1) % profile.focus.length), 2200)
    return () => clearInterval(id)
  }, [ready])

  const show = ready ? { opacity: 1, y: 0 } : undefined

  return (
    <section id="top" ref={ref} className="hero">
      <motion.div className="hero-inner" style={{ y, scale, borderRadius: radius }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-canvas" aria-hidden="true">
          <Suspense fallback={null}>
            <HeroScene active={inView} />
          </Suspense>
        </div>

        <div className="hero-content">
          <div className="hero-meta">
            <motion.p {...fadeUp(0.5)} animate={show}>
              <span className="hero-meta-label">Role</span>
              {profile.role}
            </motion.p>
            <motion.p {...fadeUp(0.6)} animate={show}>
              <span className="hero-meta-label">Currently</span>
              {profile.company}, Hyderabad
            </motion.p>
            <motion.p {...fadeUp(0.7)} animate={show} className="hero-meta-exp">
              <span className="hero-meta-label">Experience</span>
              8+ years
            </motion.p>
          </div>

          <h1 className="hero-name" aria-label={profile.name}>
            <motion.span className="hero-line" style={{ x: firstLineX }}>
              <CharReveal text={profile.first.toUpperCase()} play={ready} delay={0.25} />
            </motion.span>
            <motion.span className="hero-line hero-line-2" style={{ x: secondLineX }}>
              <motion.span className="hero-focus" {...fadeUp(1)} animate={show}>
                <span className="hero-focus-label">Engineering</span>
                <span className="hero-focus-word">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={profile.focus[focusIndex]}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.5, ease: easeOutExpo }}
                    >
                      {profile.focus[focusIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.span>
              <CharReveal text={profile.last.toUpperCase()} className="is-outline" play={ready} delay={0.5} />
            </motion.span>
          </h1>

          <div className="hero-bottom">
            <motion.p className="hero-lede" {...fadeUp(1.1)} animate={show}>
              I build secure, high-throughput Java systems for regulated enterprises, from terabyte-scale file
              transfer to AI platforms I run in production.
            </motion.p>

            <motion.div className="hero-actions" {...fadeUp(1.25)} animate={show}>
              <Magnetic strength={0.45}>
                <a href="#work" className="hero-orb" data-cursor="Scroll">
                  <span>See the work</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 4v16m0 0-6-6m6 6 6-6" />
                  </svg>
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        <motion.div className="hero-shade" style={{ opacity: shade }} aria-hidden="true" />
      </motion.div>
    </section>
  )
}
