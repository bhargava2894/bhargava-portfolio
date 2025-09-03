import React from 'react'
import { motion } from 'framer-motion'
import aboutData from '../data/about.json'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">About Me</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="about-text"
          >
            <p className="about-summary">{aboutData.summary}</p>
            
            <div className="about-highlights">
              <h3>Key Expertise</h3>
              <ul className="highlights-list">
                {aboutData.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="about-education">
              <h3>Education</h3>
              {aboutData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h4>{edu.degree}</h4>
                  <p className="institution">{edu.institution}</p>
                  <span className="duration">{edu.duration}</span>
                </div>
              ))}
            </div>

            <div className="about-certifications">
              <h3>Certifications</h3>
              <ul className="cert-list">
                {aboutData.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
