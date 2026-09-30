import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import CountUp from '../fx/CountUp'
import { WordsReveal } from '../fx/Reveal'
import { impact } from '../data/resume'

/**
 * Vertical scroll drives a horizontal track: the section is tall, its viewport is
 * sticky, and the track translates by exactly its overflow width.
 */
export default function Impact() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const overflow = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const x = useTransform([scrollYProgress, overflow], ([progress, distance]) => -progress * distance)
  const smoothX = useSpring(x, { stiffness: 220, damping: 40, mass: 0.4 })
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) overflow.set(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [overflow])

  return (
    <section id="impact" ref={sectionRef} className="impact" style={{ height: `${120 + impact.length * 55}vh` }}>
      <div className="impact-sticky">
        <motion.div ref={trackRef} className="impact-track" style={{ x: smoothX }}>
          <div className="impact-intro">
            <p className="kicker">
              <span className="kicker-index">(03)</span> Impact
            </p>
            <h2 className="impact-title">
              <WordsReveal text="Measured in terabytes, tests and minutes." />
            </h2>
            <p className="impact-hint">
              Keep scrolling
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12h16m0 0-6-6m6 6-6 6" />
              </svg>
            </p>
          </div>

          {impact.map((item, i) => (
            <article key={item.title} className="impact-panel">
              <span className="impact-index">/{String(i + 1).padStart(2, '0')}</span>
              <CountUp
                className="impact-value"
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
                duration={1.8}
              />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </motion.div>

        <div className="impact-progress" aria-hidden="true">
          <motion.span style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  )
}
