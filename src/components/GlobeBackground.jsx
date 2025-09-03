import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GreatCircle({ radius = 2.2, segments = 192, color = '#2aa7ff', rotation = [0, 0, 0], opacity = 0.28 }) {
  const ref = useRef()
  const geometry = useMemo(() => new THREE.BufferGeometry(), [])
  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    [color, opacity]
  )

  const positions = useMemo(() => {
    const pts = []
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      pts.push(Math.cos(theta) * radius, Math.sin(theta) * radius, 0)
    }
    return new Float32Array(pts)
  }, [radius, segments])

  useMemo(() => {
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  }, [geometry, positions])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0007
      ref.current.rotation.x += 0.00035
    }
  })

  return <line ref={ref} rotation={rotation} geometry={geometry} material={material} />
}

function Starfield({ count = 400, spread = 8, color = '#64b5f6', opacity = 0.22, size = 0.01 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      const r = spread * (0.6 + Math.random() * 0.4)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i] = r * Math.sin(phi) * Math.cos(theta)
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count, spread])

  const geometry = useMemo(() => new THREE.BufferGeometry(), [])
  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size,
        transparent: true,
        opacity,
        depthWrite: false,
        color
      }),
    [opacity, size, color]
  )

  useMemo(() => {
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  }, [geometry, positions])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005
    }
  })

  return <points ref={ref} geometry={geometry} material={material} />
}

export default function GlobeBackground() {
  const circles = useMemo(() => {
    const arr = []
    const hues = ['#4FC3F7', '#29B6F6', '#64B5F6']
    for (let i = 0; i < 8; i++) {
      const tilt = (i / 8) * Math.PI
      arr.push({ rotation: [tilt, 0, 0], color: hues[i % hues.length], opacity: 0.3 })
    }
    for (let i = 0; i < 8; i++) {
      const tilt = (i / 8) * Math.PI
      arr.push({ rotation: [0, tilt, 0], color: hues[(i + 1) % hues.length], opacity: 0.25 })
    }
    return arr
  }, [])

  return (
    <>
      <Starfield />
      {circles.map((c, idx) => (
        <GreatCircle key={idx} rotation={c.rotation} color={c.color} opacity={c.opacity} />
      ))}
    </>
  )
}
