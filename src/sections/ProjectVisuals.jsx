import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const LANES = [96, 124, 150, 176, 204]

/** Parallel ranged parts streaming between two clouds under a pulsing memory budget. */
function TransferVisual() {
  return (
    <svg viewBox="0 0 400 300" className="pv-svg" role="img" aria-label="Parallel multipart transfer between S3 and GCS">
      <g className="pv-stroke">
        <rect x="18" y="66" width="92" height="168" rx="16" />
        <rect x="290" y="66" width="92" height="168" rx="16" />
        {LANES.map((y) => (
          <line key={y} x1="110" x2="290" y1={y} y2={y} className="pv-dash" />
        ))}
      </g>
      <text x="64" y="156" className="pv-label pv-big" textAnchor="middle">S3</text>
      <text x="336" y="156" className="pv-label pv-big" textAnchor="middle">GCS</text>
      <text x="64" y="178" className="pv-label" textAnchor="middle">source</text>
      <text x="336" y="178" className="pv-label" textAnchor="middle">target</text>

      {LANES.map((y, i) => (
        <motion.rect
          key={y}
          y={y - 4}
          width="24"
          height="8"
          rx="4"
          className="pv-fill"
          initial={{ x: 112 }}
          animate={{ x: [112, 264], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.3 + (i % 3) * 0.25, repeat: Infinity, ease: 'easeInOut', delay: i * 0.22 }}
        />
      ))}

      <text x="18" y="36" className="pv-label">buffer pool · 2 GiB</text>
      <rect x="18" y="44" width="364" height="6" rx="3" className="pv-track" />
      <motion.rect
        x="18"
        y="44"
        height="6"
        rx="3"
        className="pv-fill"
        animate={{ width: [120, 300, 180, 330, 120] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <text x="18" y="270" className="pv-label">bounded parallel ranges</text>
      <text x="382" y="270" className="pv-label" textAnchor="end">up to 5 TB / file</text>
    </svg>
  )
}

// Deterministic scatter so the "embedding space" is identical on every render.
function seededPoints(count) {
  let seed = 7
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  return Array.from({ length: count }, () => ({ x: 30 + rand() * 340, y: 40 + rand() * 220 }))
}

/** A query vector finding its nearest résumé chunks. */
function VectorVisual() {
  const query = { x: 214, y: 146 }
  const { points, nearest } = useMemo(() => {
    const all = seededPoints(46)
    const ranked = [...all].sort(
      (a, b) => Math.hypot(a.x - query.x, a.y - query.y) - Math.hypot(b.x - query.x, b.y - query.y)
    )
    return { points: all, nearest: ranked.slice(0, 6) }
  }, [query.x, query.y])

  return (
    <svg viewBox="0 0 400 300" className="pv-svg" role="img" aria-label="Vector search finding nearest résumé chunks">
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3.2"
          className="pv-dot"
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 2.5 + (i % 5) * 0.4, repeat: Infinity, delay: (i % 7) * 0.3 }}
        />
      ))}
      {nearest.map((p, i) => (
        <motion.line
          key={i}
          x1={query.x}
          y1={query.y}
          x2={p.x}
          y2={p.y}
          className="pv-link"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.15, times: [0, 0.35, 0.8, 1] }}
        />
      ))}
      {nearest.map((p, i) => (
        <circle key={`n-${i}`} cx={p.x} cy={p.y} r="5" className="pv-fill" />
      ))}
      <motion.circle
        cx={query.x}
        cy={query.y}
        r="10"
        className="pv-ring"
        animate={{ r: [10, 40], opacity: [0.9, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />
      <circle cx={query.x} cy={query.y} r="9" className="pv-fill" />
      <text x="20" y="28" className="pv-label">query → top-k · cosine similarity</text>
      <text x="380" y="284" className="pv-label" textAnchor="end">gemini embeddings</text>
    </svg>
  )
}

const HUB_NODES = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
  return { x: 200 + Math.cos(angle) * 112, y: 150 + Math.sin(angle) * 104 }
})

/** Internal APIs streaming reactively into one PostgreSQL source of truth. */
function HubVisual() {
  return (
    <svg viewBox="0 0 400 300" className="pv-svg" role="img" aria-label="Internal APIs aggregated into PostgreSQL">
      <motion.circle
        cx="200"
        cy="150"
        r="58"
        className="pv-stroke pv-dash"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      {HUB_NODES.map((n, i) => (
        <g key={i}>
          <line x1={n.x} y1={n.y} x2="200" y2="150" className="pv-stroke pv-faint" />
          <motion.circle
            r="4"
            className="pv-fill"
            animate={{ cx: [n.x, 200], cy: [n.y, 150], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.27, ease: 'easeIn' }}
          />
          <rect x={n.x - 22} y={n.y - 13} width="44" height="26" rx="13" className="pv-node" />
          <text x={n.x} y={n.y + 4} className="pv-label" textAnchor="middle">api</text>
        </g>
      ))}
      <circle cx="200" cy="150" r="34" className="pv-fill" />
      <text x="200" y="155" className="pv-label pv-core" textAnchor="middle">PG</text>
    </svg>
  )
}

const visuals = { transfer: TransferVisual, vectors: VectorVisual, hub: HubVisual }

export default function ProjectVisual({ type }) {
  const Visual = visuals[type]
  return Visual ? <Visual /> : null
}
