import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { SectionHeading } from '../fx/Reveal'
import ProjectVisual from './ProjectVisuals'
import { easeInOutQuart, easeOutExpo } from '../fx/motion'
import { projects } from '../data/resume'

/**
 * Each card sticks to the viewport; as later cards slide over it, it shrinks toward
 * its target scale so the stack reads as a deck of case studies.
 */
function ProjectCard({ project, i, progress, range, targetScale, onOpen }) {
  const cardRef = useRef(null)
  const { scrollYProgress: enter } = useScroll({ target: cardRef, offset: ['start end', 'start start'] })
  const visualScale = useTransform(enter, [0, 1], [1.35, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div className="card-slot" ref={cardRef}>
      <motion.article
        className={`project-card theme-${project.theme}`}
        style={{ scale, top: `calc(-6vh + ${i * 26}px)` }}
        onClick={onOpen}
        data-cursor="Open"
      >
        <div className="pc-body">
          <div className="pc-top">
            <span className="pc-index">{project.index}</span>
            <span className="pc-pill">{project.client}</span>
            <span className="pc-period">{project.period}</span>
          </div>

          <h3 className="pc-title">
            {project.title}
            {project.subtitle && <span className="pc-subtitle">{project.subtitle}</span>}
          </h3>
          <p className="pc-tagline">{project.tagline}</p>

          <dl className="pc-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="pc-metric">
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>

          <div className="pc-foot">
            <ul className="chips">
              {project.stack.slice(0, 5).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <button
              className="pc-open"
              onClick={(event) => {
                event.stopPropagation()
                onOpen()
              }}
              data-cursor="Open"
            >
              Case study
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </button>
          </div>
        </div>

        <div className="pc-visual">
          <motion.div className="pc-visual-inner" style={{ scale: visualScale }}>
            <ProjectVisual type={project.visual} />
          </motion.div>
        </div>
      </motion.article>
    </div>
  )
}

const listVariants = { show: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } } }
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } }
}

function CaseStudy({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return undefined
    const previouslyFocused = document.activeElement
    document.documentElement.classList.add('modal-open')
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.({ preventScroll: true })
    }
  }, [project, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="case-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.3 } }}
          onClick={onClose}
        >
          <motion.div
            className={`case-sheet theme-${project.theme}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.9, ease: easeInOutQuart }}
            onClick={(event) => event.stopPropagation()}
          >
            <button ref={closeRef} className="case-close" onClick={onClose} data-cursor="Close">
              Close
              <span aria-hidden="true">✕</span>
            </button>

            <div className="case-head">
              <p className="kicker">
                <span className="kicker-index">({project.index})</span> {project.client} · {project.period}
              </p>
              <h2 id="case-title" className="case-title">
                <span className="mask">
                  <motion.span
                    className="mask-inner"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1, ease: easeOutExpo, delay: 0.35 }}
                  >
                    {project.title}
                  </motion.span>
                </span>
              </h2>
              <motion.p
                className="case-tagline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.5 }}
              >
                {project.tagline}
              </motion.p>
              <ul className="chips">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>

            <motion.ol className="case-list" initial="hidden" animate="show" variants={listVariants}>
              {project.highlights.map((item, i) => (
                <motion.li key={item.t} variants={itemVariants}>
                  <span className="case-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default function Work() {
  const stackRef = useRef(null)
  const [openProject, setOpenProject] = useState(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })
  const close = useCallback(() => setOpenProject(null), [])

  return (
    <section id="work" className="section work">
      <div className="container">
        <SectionHeading index="02" kicker="Selected work" title="Systems built to carry real weight." />
      </div>

      <div className="work-stack" ref={stackRef}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            i={i}
            progress={scrollYProgress}
            range={[i / projects.length, 1]}
            targetScale={1 - (projects.length - 1 - i) * 0.05}
            onOpen={() => setOpenProject(project)}
          />
        ))}
      </div>

      <CaseStudy project={openProject} onClose={close} />
    </section>
  )
}
