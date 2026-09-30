import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../fx/Reveal'
import { easeOutExpo } from '../fx/motion'
import { skills } from '../data/resume'

const chipList = { show: { transition: { staggerChildren: 0.035, delayChildren: 0.35 } } }
const chip = {
  hidden: { opacity: 0, y: 14, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeOutExpo } }
}

// Feeds a radial spotlight that follows the pointer across each tile.
const trackSpotlight = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

export default function Stack() {
  return (
    <section id="stack" className="section stack">
      <div className="container">
        <SectionHeading index="05" kicker="Toolkit" title="The stack behind the work." />

        <div className="bento">
          {skills.map((group, i) => (
            <motion.article
              key={group.group}
              className={`bento-tile ${group.featured ? 'is-featured' : ''}`}
              style={{ '--span': group.span }}
              onPointerMove={trackSpotlight}
              initial={{ opacity: 0, y: 60, rotateX: -18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: easeOutExpo, delay: (i % 2) * 0.1 }}
            >
              <div className="bento-head">
                <span className="bento-index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{group.group}</h3>
              </div>
              <motion.ul
                className="chips chips-lg"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={chipList}
              >
                {group.items.map((item) => (
                  <motion.li key={item} variants={chip}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
