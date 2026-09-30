import React, { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

const spring = { stiffness: 170, damping: 14, mass: 0.12 }

/** Pulls its child toward the pointer while hovered, then springs back. */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  const handleMove = (event) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    x.set((event.clientX - (left + width / 2)) * strength)
    y.set((event.clientY - (top + height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}
