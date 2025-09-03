import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import LoadingSpinner from './components/LoadingSpinner'
import './styles/globals.css'
import './styles/components.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <Suspense fallback={<LoadingSpinner />}>
        <Hero3D />
      </Suspense>
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <About />
        <Skills />
        <Projects />
        <Contact />
      </motion.main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Bhargava Sista. Built with React, Three.js & passion.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
