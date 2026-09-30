import React from 'react'
import VelocityMarquee from '../fx/VelocityMarquee'
import { marqueeRows } from '../data/resume'

/** Two crossed ticker tapes that react to scroll speed. */
export default function Bands() {
  return (
    <section className="bands" aria-hidden="true">
      <div className="band band-a">
        <VelocityMarquee items={marqueeRows[0]} baseVelocity={-1.4} />
      </div>
      <div className="band band-b">
        <VelocityMarquee items={marqueeRows[1]} baseVelocity={1.4} className="is-outline" />
      </div>
    </section>
  )
}
