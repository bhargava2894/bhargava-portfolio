import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { easeInOutQuart } from './motion'

const words = ['Java', 'Spring', 'Reactor', 'Kafka', 'Kubernetes', 'AWS', 'GenAI', 'Bhargava Sista']
const DURATION = 2300

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Full-screen counter that cycles through the stack, then lifts off the page
 * with a curved trailing edge that flattens as it leaves.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [size, setSize] = useState(null)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    setSize({ w: window.innerWidth, h: window.innerHeight })

    let frame
    let timeout
    let start
    const tick = (now) => {
      if (start === undefined) start = now
      const progress = Math.min((now - start) / DURATION, 1)
      setCount(Math.round(easeInOutCubic(progress) * 100))
      if (progress < 1) frame = requestAnimationFrame(tick)
      else timeout = setTimeout(() => doneRef.current(), 350)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
    }
  }, [])

  const wordIndex = Math.min(words.length - 1, Math.floor((count / 100) * words.length))
  const exitTransition = { duration: 1, ease: easeInOutQuart, delay: 0.1 }

  return (
    <motion.div className="preloader" exit={{ y: '-100vh', transition: exitTransition }} aria-hidden="true">
      <div className="pre-top">
        <span>Bhargava Sista</span>
        <span>Portfolio ©2026</span>
      </div>

      <div className="pre-word">
        <span className="pre-dot" />
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="pre-count">
        {String(count).padStart(3, '0')}
        <span>%</span>
      </div>
      <div className="pre-bar">
        <span style={{ transform: `scaleX(${count / 100})` }} />
      </div>

      {size && (
        <svg className="pre-curve" viewBox={`0 0 ${size.w} ${size.h + 300}`} preserveAspectRatio="none">
          <motion.path
            initial={{ d: `M0 0 L${size.w} 0 L${size.w} ${size.h} Q${size.w / 2} ${size.h + 300} 0 ${size.h} L0 0` }}
            exit={{
              d: `M0 0 L${size.w} 0 L${size.w} ${size.h} Q${size.w / 2} ${size.h} 0 ${size.h} L0 0`,
              transition: exitTransition
            }}
          />
        </svg>
      )}
    </motion.div>
  )
}
