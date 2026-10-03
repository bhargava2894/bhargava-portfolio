import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../fx/Reveal'
import { easeOutExpo } from '../fx/motion'
import { certifications, education } from '../data/resume'

export default function Credentials() {
  return (
    <section id="education" className="section credentials">
      <div className="container">
        <SectionHeading index="06" kicker="Education" title="Dual master's from the USA, grounded in security and computer science." />

        <ol className="edu-list">
          {education.map((item, i) => (
            <motion.li
              key={item.degree}
              className="edu-row"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: i * 0.08 }}
            >
              <span className="edu-years">{item.years}</span>
              <div>
                <h3>
                  {item.degree}
                  {item.tag && <span className="edu-tag">{item.tag}</span>}
                </h3>
                <p>
                  {item.school} · {item.place}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          className="certs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="kicker">Certifications</p>
          <ul className="chips chips-lg">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
