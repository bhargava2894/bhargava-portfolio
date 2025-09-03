import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import GlobeBackground from './GlobeBackground'

function Scene() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.22} />
      {/* Slightly reduced intensities for better hero text contrast */}
      <pointLight position={[6, 6, 6]} intensity={0.6} color="#4FC3F7" />
      <pointLight position={[-6, -6, -6]} intensity={0.3} color="#29B6F6" />
      <GlobeBackground />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.35}
      />
    </>
  )
}

export default function Hero3D() {
  return (
    <section className="hero">
      <div className="hero-canvas">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-text"
        >
          <h1 className="hero-title">
            <span className="gradient-text gradient-text-3d">Bhargava Sista</span>
          </h1>
          <p className="hero-subtitle">Software Engineer</p>
          <p className="hero-description">
            Specialized in cloud-native MFT platforms, secure workflows,
            and enterprise-scale microservices architecture
          </p>
          <div className="hero-location">
            <span>📍 Hyderabad, Telangana</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
