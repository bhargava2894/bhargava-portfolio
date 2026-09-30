import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Magnetic from '../fx/Magnetic'
import { easeOutExpo } from '../fx/motion'
import { profile } from '../data/resume'

// Delivery goes through Web3Forms when VITE_WEB3FORMS_KEY is set (fast and reliable; the key is
// public by design). Without a key it falls back to FormSubmit, which needs a one-time activation
// click and is often slow, hence the timeout.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const FORMSUBMIT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || `https://formsubmit.co/ajax/${profile.email}`
const TIMEOUT_MS = 15000

const initialForm = { name: '', email: '', message: '', _honey: '' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please add your name.'
  if (!form.email.trim()) errors.email = 'Please add your email so I can reply.'
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'That email address looks incomplete.'
  if (!form.message.trim()) errors.message = 'Please write a short message.'
  return errors
}

function buildRequest(form) {
  const subject = `Portfolio: new message from ${form.name.trim()}`

  if (WEB3FORMS_KEY) {
    return {
      url: 'https://api.web3forms.com/submit',
      init: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: 'Portfolio contact form',
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          botcheck: form._honey
        })
      }
    }
  }

  // Form-encoded body keeps this a "simple" CORS request, so the browser skips the extra
  // preflight round trip that made FormSubmit feel stuck.
  return {
    url: FORMSUBMIT_ENDPOINT,
    init: {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new URLSearchParams({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        _replyto: form.email.trim(),
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        _honey: form._honey
      })
    }
  }
}

const fields = [
  { name: 'name', index: '01', label: 'Your name', type: 'text', autoComplete: 'name', placeholder: 'Jane Doe' },
  { name: 'email', index: '02', label: 'Your email', type: 'email', autoComplete: 'email', placeholder: 'jane@company.com' }
]

function FieldError({ id, message }) {
  return (
    <span id={id} className="cform-field-error" aria-live="polite">
      <AnimatePresence>
        {message && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {message}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const formRef = useRef(null)

  const update = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return

    // Validate ourselves instead of the browser's tooltip, which pops up under the fixed nav.
    const errors = validate(form)
    setFieldErrors(errors)
    const firstInvalid = ['name', 'email', 'message'].find((key) => errors[key])
    if (firstInvalid) {
      const field = formRef.current?.elements.namedItem(firstInvalid)
      field?.focus({ preventScroll: true })
      field?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setStatus('sending')
    setError('')
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    try {
      const { url, init } = buildRequest(form)
      const response = await fetch(url, { ...init, signal: controller.signal })
      const data = await response.json().catch(() => ({}))
      // Web3Forms returns a boolean, FormSubmit the string "true".
      if (!response.ok || String(data.success) !== 'true') {
        throw new Error(data.message || `The mail service answered with an error (${response.status}).`)
      }
      setStatus('sent')
      setForm(initialForm)
    } catch (err) {
      setError(
        err.name === 'AbortError'
          ? 'the mail service took too long to respond.'
          : err.message === 'Failed to fetch'
            ? 'the mail service could not be reached.'
            : err.message
      )
      setStatus('error')
    } finally {
      clearTimeout(timer)
    }
  }

  const fallbackHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio: message from ${form.name || 'a visitor'}`
  )}&body=${encodeURIComponent(form.message)}`

  return (
    <div className="cform-wrap">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            className="cform-sent"
            role="status"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <motion.span
              className="cform-check"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24">
                <motion.path
                  d="M5 12.5 10 17.5 19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                />
              </svg>
            </motion.span>
            <h3>Message sent.</h3>
            <p>Thanks for reaching out. It&apos;s in my inbox, and I&apos;ll reply to the email you left.</p>
            <button className="cform-again" onClick={() => setStatus('idle')}>
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            className="cform"
            onSubmit={submit}
            noValidate
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <div className="cform-head">
              <span className="cform-live" aria-hidden="true" />
              <span>Send a message</span>
              <span className="cform-head-note">Straight to my inbox</span>
            </div>

            <div className="cform-row">
              {fields.map((field) => (
                <label key={field.name} className={`cform-field ${fieldErrors[field.name] ? 'is-invalid' : ''}`}>
                  <span className="cform-label">
                    <span className="cform-index">{field.index}</span>
                    {field.label}
                  </span>
                  <span className="cform-control">
                  <input
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={update}
                    maxLength={200}
                    aria-invalid={Boolean(fieldErrors[field.name])}
                    aria-describedby={`${field.name}-error`}
                  />
                  <span className="cform-line" aria-hidden="true" />
                  </span>
                  <FieldError id={`${field.name}-error`} message={fieldErrors[field.name]} />
                </label>
              ))}
            </div>

            <label className={`cform-field ${fieldErrors.message ? 'is-invalid' : ''}`}>
              <span className="cform-label">
                <span className="cform-index">03</span>
                What are you building?
              </span>
              <span className="cform-control">
              <textarea
                name="message"
                rows={4}
                placeholder="Tell me about the role, the system, or the problem."
                value={form.message}
                onChange={update}
                maxLength={5000}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby="message-error"
              />
              <span className="cform-line" aria-hidden="true" />
              </span>
              <span className="cform-count" aria-hidden="true">
                {form.message.length} / 5000
              </span>
              <FieldError id="message-error" message={fieldErrors.message} />
            </label>

            {/* Honeypot: invisible to people, filled in by bots; FormSubmit drops those submissions. */}
            <input
              className="cform-honey"
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              value={form._honey}
              onChange={update}
              aria-hidden="true"
            />

            <div className="cform-foot">
              <Magnetic strength={0.4}>
                <button
                  type="submit"
                  className={`contact-orb ${status === 'sending' ? 'is-sending' : ''}`}
                  disabled={status === 'sending'}
                  data-cursor="Send"
                >
                  <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </button>
              </Magnetic>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.p
                    className="cform-error"
                    role="alert"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Couldn&apos;t send: {error}{' '}
                    <a href={fallbackHref}>Email me directly instead.</a>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
