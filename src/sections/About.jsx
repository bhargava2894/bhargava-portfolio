import React from 'react'
import { motion } from 'framer-motion'
import { ScrollWords } from '../fx/Reveal'
import CountUp from '../fx/CountUp'
import { easeOutExpo } from '../fx/motion'
import { manifesto, stats } from '../data/resume'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-side"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <p className="kicker">
              <span className="kicker-index">(01)</span> About
            </p>
            <div className="about-badge">
              <span className="about-badge-ring" aria-hidden="true">
                <svg viewBox="0 0 120 120">
                  <defs>
                    <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                  </defs>
                  <text>
                    <textPath href="#badge-circle" textLength="286" lengthAdjust="spacing">FULL STACK · JAVA · DISTRIBUTED · CLOUD · GENAI · </textPath>
                  </text>
                </svg>
              </span>
              <span className="about-badge-core">8+</span>
            </div>
          </motion.div>

          <ScrollWords text={manifesto} className="about-manifesto" />
        </div>

        <ul className="stats">
          {stats.map((stat, i) => (
            <motion.li
              key={stat.label}
              className="stat"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: i * 0.1 }}
            >
              <CountUp
                className="stat-value"
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
              />
              <span className="stat-label">{stat.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
