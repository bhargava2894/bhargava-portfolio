import React, { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'
import { easeOutExpo } from './motion'

const format = (value, decimals) =>
  value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

/** Counts from zero to `value` the first time it scrolls into view. */
export default function CountUp({ value, decimals = 0, prefix = '', suffix = '', duration = 2.2, className = '' }) {
  const ref = useRef(null)
  const numberRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(0, value, {
      duration,
      ease: easeOutExpo,
      onUpdate: (latest) => {
        if (numberRef.current) numberRef.current.textContent = format(latest, decimals)
      }
    })
    return () => controls.stop()
  }, [inView, value, decimals, duration])

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${format(value, decimals)}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        <span ref={numberRef}>{format(0, decimals)}</span>
        {suffix}
      </span>
    </span>
  )
}
