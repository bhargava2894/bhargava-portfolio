import React, { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap
} from 'framer-motion'

const COPIES = 4

/**
 * An endless ticker that speeds up, reverses and skews with the page's scroll velocity.
 * The row is repeated COPIES times and wrapped over one copy's width so the loop is seamless.
 */
export default function VelocityMarquee({ items, baseVelocity = 2, className = '' }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [12, -12])
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, -200 / COPIES, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) direction.current = -1
    else if (velocityFactor.get() > 0) direction.current = 1
    moveBy += direction.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className={`marquee ${className}`}>
      <motion.div className="marquee-track" style={{ x, skewX }}>
        {Array.from({ length: COPIES }).map((_, copy) => (
          <span className="marquee-copy" key={copy}>
            {items.map((item) => (
              <span className="marquee-item" key={item}>
                {item}
                <span className="marquee-star">✺</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
