import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { easeOutExpo } from './motion'

const wordVariants = {
  hidden: { y: '115%', rotate: 7 },
  show: { y: '0%', rotate: 0, transition: { duration: 1, ease: easeOutExpo } }
}

/** Splits text into words that rise out of a mask when scrolled into view. */
export function WordsReveal({ text, className = '', delay = 0, stagger = 0.06 }) {
  return (
    <motion.span
      className={`words-reveal ${className}`}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {text.split(' ').map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="mask" aria-hidden="true">
            <motion.span className="mask-inner" variants={wordVariants}>
              {word}
            </motion.span>
          </span>{' '}
        </React.Fragment>
      ))}
    </motion.span>
  )
}

/** Per-character rise, driven by an explicit `play` flag (used after the preloader lifts). */
export function CharReveal({ text, className = '', play = true, delay = 0, stagger = 0.04 }) {
  return (
    <span className={`char-reveal ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span className="mask" aria-hidden="true" key={`${char}-${i}`}>
          <motion.span
            className="mask-inner"
            initial={{ y: '110%', rotate: 10 }}
            animate={play ? { y: '0%', rotate: 0 } : { y: '110%', rotate: 10 }}
            transition={{ duration: 1.2, ease: easeOutExpo, delay: delay + i * stagger }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function ScrollWord({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <span className={`sw-word ${accent ? 'is-accent' : ''}`}>
      <motion.span style={{ opacity, y }}>{children}</motion.span>{' '}
    </span>
  )
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={`scroll-words ${className}`}>
      {words.map((raw, i) => {
        const accent = raw.startsWith('*')
        const word = raw.replace(/\*/g, '')
        const start = i / words.length
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} accent={accent}>
            {word}
          </ScrollWord>
        )
      })}
    </p>
  )
}

export function SectionHeading({ index, kicker, title, className = '' }) {
  return (
    <header className={`section-head ${className}`}>
      <motion.p
        className="kicker"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
      >
        <span className="kicker-index">({index})</span> {kicker}
      </motion.p>
      <h2 className="section-title">
        <WordsReveal text={title} />
      </h2>
    </header>
  )
}
