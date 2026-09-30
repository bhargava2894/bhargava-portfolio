import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const PACKETS = 7

/** Glossy black liquid core that leans toward the pointer and ripples harder as it moves. */
function Core() {
  const mesh = useRef()
  const material = useRef()
  const { viewport, size } = useThree()
  const wide = size.width > 900
  const baseX = wide ? viewport.width * 0.22 : 0
  const radius = wide ? 1.35 : 1.05

  useFrame((state, delta) => {
    const { pointer } = state
    const m = mesh.current
    m.rotation.y += delta * 0.18
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, pointer.y * 0.5, 0.04)
    m.position.x = THREE.MathUtils.lerp(m.position.x, baseX + pointer.x * 0.35, 0.05)
    m.position.y = THREE.MathUtils.lerp(m.position.y, (wide ? 0.1 : 0.5) + pointer.y * 0.25, 0.05)
    const energy = Math.min(1, Math.hypot(pointer.x, pointer.y))
    material.current.distort = THREE.MathUtils.lerp(material.current.distort, 0.32 + energy * 0.22, 0.04)
  })

  return (
    <mesh ref={mesh} position={[baseX, 0, 0]}>
      <sphereGeometry args={[radius, 160, 160]} />
      <MeshDistortMaterial
        ref={material}
        color="#120604"
        roughness={0.08}
        metalness={0.95}
        distort={0.35}
        speed={1.8}
        envMapIntensity={1.4}
      />
    </mesh>
  )
}

/** Orbiting "data packets": a nod to the file-transfer work. */
function Orbit() {
  const group = useRef()
  const { viewport, size } = useThree()
  const wide = size.width > 900
  const baseX = wide ? viewport.width * 0.22 : 0
  const packets = useMemo(
    () => Array.from({ length: PACKETS }, (_, i) => ({ angle: (i / PACKETS) * Math.PI * 2, size: 0.04 + (i % 3) * 0.02 })),
    []
  )

  useFrame((state, delta) => {
    group.current.rotation.z += delta * 0.25
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 1.15 + state.pointer.y * 0.2, 0.05)
  })

  const ring = wide ? 2.1 : 1.6

  return (
    <group position={[baseX, wide ? 0.1 : 0.5, 0]}>
      <group ref={group} rotation={[1.15, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[ring, 0.006, 16, 200]} />
          <meshBasicMaterial color="#ffd9bf" transparent opacity={0.55} />
        </mesh>
        {packets.map((p, i) => (
          <mesh key={i} position={[Math.cos(p.angle) * ring, Math.sin(p.angle) * ring, 0]}>
            <sphereGeometry args={[p.size, 16, 16]} />
            <meshBasicMaterial color={i % 2 ? '#fff1e6' : '#ffb27a'} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function HeroScene({ active }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#ffe2cc" />
      <pointLight position={[-4, -2, 2]} intensity={8} color="#ff5a1f" />

      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <Core />
      </Float>
      <Orbit />
      <Sparkles count={70} size={2.4} speed={0.35} opacity={0.5} color="#ffe6d2" scale={[12, 6, 4]} />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={5} color="#ff6a1f" rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={3} />
          <Lightformer form="circle" intensity={2.5} color="#fff1e6" rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} color="#ffb27a" rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="ring" intensity={4} color="#ff4d00" rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={10} />
          <Lightformer form="rect" intensity={1.2} color="#ffd2b0" position={[0, 0, 6]} scale={[12, 1, 1]} />
        </group>
      </Environment>
    </Canvas>
  )
}
