import React, { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { SectionHeading } from '../fx/Reveal'
import { easeOutExpo } from '../fx/motion'
import { experience } from '../data/resume'

export default function Experience() {
  const [open, setOpen] = useState(0)
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.8', 'end 0.6'] })
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHeading index="04" kicker="Experience" title="Five teams, three cities, one throughline: Java in production." />

        <div className="xp-wrap" ref={listRef}>
          <motion.span className="xp-line" style={{ scaleY: line }} aria-hidden="true" />
          <ul className="xp-list">
            {experience.map((job, i) => {
              const isOpen = open === i
              return (
                <motion.li
                  key={job.company}
                  className={`xp-row ${isOpen ? 'is-open' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  transition={{ duration: 0.9, ease: easeOutExpo, delay: i * 0.05 }}
                >
                  <button
                    className="xp-head"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`xp-body-${i}`}
                    data-cursor={isOpen ? 'Close' : 'Open'}
                  >
                    <span className="xp-period">{job.period}</span>
                    <span className="xp-role">{job.role}</span>
                    <span className="xp-company">{job.company}</span>
                    <span className="xp-toggle" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`xp-body-${i}`}
                        className="xp-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: easeOutExpo }}
                      >
                        <div className="xp-body-inner">
                          <p className="xp-loc">
                            {job.location}
                            {job.note && <span> · {job.note}</span>}
                          </p>
                          <ul className="xp-bullets">
                            {job.bullets.map((bullet, b) => (
                              <motion.li
                                key={bullet}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.1 + b * 0.05 }}
                              >
                                {bullet}
                              </motion.li>
                            ))}
                          </ul>
                          <ul className="chips">
                            {job.stack.map((tech) => (
                              <li key={tech}>{tech}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
