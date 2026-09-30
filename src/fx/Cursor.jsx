import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE = 'a, button, [data-cursor]'

/**
 * Two-part cursor: a precise dot plus a trailing ring that grows over interactive
 * elements and shows the element's `data-cursor` label. Only mounts for fine pointers.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [target, setTarget] = useState(null) // null = idle, '' = hovering, 'text' = labelled hover
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 })

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!query.matches) return undefined

    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }
    const onOver = (event) => {
      const element = event.target.closest?.(INTERACTIVE)
      setTarget(element ? element.getAttribute('data-cursor') ?? '' : null)
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  const hovering = target !== null
  const label = hovering && target.length > 0 ? target : null

  return (
    <>
      {/* Difference-blended layer: the ring and dot invert whatever they pass over. */}
      <div className={`cursor-layer is-diff ${visible ? '' : 'is-hidden'}`} aria-hidden="true">
        <motion.div className="cursor-anchor" style={{ x: ringX, y: ringY }}>
          <motion.div
            className={`cursor-ring ${hovering ? 'is-hover' : ''}`}
            animate={{ scale: label ? 0 : pressed ? 0.8 : hovering ? 1.9 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          />
        </motion.div>
        <motion.div className="cursor-anchor" style={{ x, y }}>
          <motion.div className="cursor-dot" animate={{ scale: hovering ? 0 : 1 }} transition={{ duration: 0.2 }} />
        </motion.div>
      </div>

      {/* Solid layer: the labelled bubble keeps its brand colour. */}
      <div className={`cursor-layer ${visible ? '' : 'is-hidden'}`} aria-hidden="true">
        <motion.div className="cursor-anchor" style={{ x: ringX, y: ringY }}>
          <AnimatePresence>
            {label && (
              <motion.div
                key="bubble"
                className="cursor-bubble"
                initial={{ scale: 0 }}
                animate={{ scale: pressed ? 0.88 : 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}
