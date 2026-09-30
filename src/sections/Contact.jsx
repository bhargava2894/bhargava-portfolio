import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import ContactForm from './ContactForm'
import { WordsReveal } from '../fx/Reveal'
import { profile } from '../data/resume'

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Kolkata'
})

function useLocalTime() {
  const [time, setTime] = useState(() => timeFormat.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(timeFormat.format(new Date())), 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Contact() {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)
  const time = useLocalTime()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const giantY = useTransform(scrollYProgress, [0, 1], ['60%', '0%'])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <footer id="contact" ref={ref} className="contact">
      <div className="container">
        <p className="kicker">
          <span className="kicker-index">(07)</span> Contact
        </p>

        <h2 className="contact-title">
          <WordsReveal text="Let's build something" />
          <br />
          <WordsReveal text="that scales." className="is-outline" delay={0.2} />
        </h2>

        <div className="contact-row">
          <ContactForm />

          <div className="contact-links">
            <button className="contact-copy" onClick={copyEmail} data-cursor="Copy">
              <span className="contact-label">Email</span>
              <span className="contact-copy-text">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'copied' : 'email'}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {copied ? 'Copied to clipboard ✓' : profile.email}
                  </motion.span>
                </AnimatePresence>
              </span>
            </button>
            <a href={profile.phoneHref}>
              <span className="contact-label">Phone</span>
              {profile.phone}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="contact-label">LinkedIn</span>
              /in/bhargava-sista ↗
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <span className="contact-label">GitHub</span>
              @bhargava2894 ↗
            </a>
          </div>
        </div>

        <div className="footer-bar">
          <span>© 2026 {profile.name}</span>
          <span>
            {profile.location} · {time} IST
          </span>
          <a href="#top" data-cursor="Top">
            Back to top ↑
          </a>
        </div>
      </div>

      <div className="footer-giant" aria-hidden="true">
        <motion.span style={{ y: giantY }}>{profile.name}</motion.span>
      </div>
    </footer>
  )
}
