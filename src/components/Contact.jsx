import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission will be implemented in Iteration 2
    alert('Contact form will be functional in the next iteration!')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="contact-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="contact-info"
          >
            <h3>Let's Connect</h3>
            <p>
              Interested in cloud-native solutions, secure file transfer systems, 
              or microservices architecture? I'd love to hear from you.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:bhargava.sista94@gmail.com">
                  bhargava.sista94@gmail.com
                </a>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <a href="tel:+918977036364">+91 8977036364</a>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Hyderabad, Telangana, India</span>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">💼</span>
                <a href="https://linkedin.com/in/bhargava-sista" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">🐙</span>
                <a href="https://github.com/bhargava-sista" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <motion.button
              type="submit"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
