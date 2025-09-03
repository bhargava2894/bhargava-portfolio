import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import projectsData from '../data/projects.json'

function ProjectModal({ project, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>&times;</button>
            <h2>{project.title}</h2>
            <p className="project-duration">{project.duration}</p>
            <div className="modal-body">
              <p className="project-description">{project.description}</p>
              
              <div className="project-details">
                <h3>Key Responsibilities & Achievements</h3>
                <ul>
                  {project.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="project-impact">
                <h3>Technical Impact</h3>
                <ul>
                  {project.impact.map((impact, index) => (
                    <li key={index}>{impact}</li>
                  ))}
                </ul>
              </div>

              <div className="project-tech">
                <h3>Technologies Used</h3>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="projects-grid">
          {projectsData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="project-card"
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="project-company">{project.company}</span>
              </div>
              
              <p className="project-summary">{project.summary}</p>
              
              <div className="project-metrics">
                {project.metrics.map((metric, metricIndex) => (
                  <span key={metricIndex} className="metric">{metric}</span>
                ))}
              </div>

              <div className="project-footer">
                <div className="project-tags">
                  {project.primaryTech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag-small">{tech}</span>
                  ))}
                </div>
                <span className="view-more">View Details →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
