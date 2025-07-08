"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface IntroProfessionalProps {
  onComplete: () => void
}

export function IntroProfessional({ onComplete }: IntroProfessionalProps) {
  const [phase, setPhase] = useState<"loading" | "welcome" | "ready" | "exit">("loading")
  const [showButton, setShowButton] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Lightweight particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
      maxLife: number
    }> = []

    // Create particles
    const createParticles = (count: number) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          life: 0,
          maxLife: 300 + Math.random() * 200,
        })
      }
    }

    createParticles(30)

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Fade out over time
        const alpha = p.opacity * (1 - p.life / p.maxLife)

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          // Create new particle
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            life: 0,
            maxLife: 300 + Math.random() * 200,
          })
          continue
        }

        // Draw particle
        ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections to nearby particles
        particles.slice(i + 1).forEach((otherP) => {
          const dx = p.x - otherP.x
          const dy = p.y - otherP.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            const connectionAlpha = (1 - distance / 80) * alpha * 0.3
            ctx.strokeStyle = `rgba(45, 212, 191, ${connectionAlpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(otherP.x, otherP.y)
            ctx.stroke()
          }
        })
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Loading (1s)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPhase("welcome")

      // Phase 2: Welcome (2s)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPhase("ready")
      setShowButton(true)
    }

    sequence()
  }, [])

  const handleEnter = () => {
    setPhase("exit")
    setTimeout(() => {
      onComplete()
    }, 800)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

        {/* Animated Background Grid */}
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 bg-teal-500/10 rounded-full blur-xl"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center space-y-8 max-w-2xl px-4 relative z-10">
          {/* Loading Phase */}
          <AnimatePresence mode="wait">
            {phase === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <motion.div
                  className="relative w-16 h-16 mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="absolute inset-0 border-2 border-teal-500/30 rounded-full"></div>
                  <div className="absolute inset-2 border-2 border-teal-400/50 rounded-full"></div>
                  <motion.div
                    className="absolute inset-4 border-2 border-teal-300 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </motion.div>
                <motion.p
                  className="text-teal-400 text-lg font-light tracking-wide"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  Loading Portfolio...
                </motion.p>
                <motion.div
                  className="flex justify-center space-x-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-teal-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Welcome Phase */}
            {phase === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200"
                  initial={{ scale: 0.9, rotateX: -15 }}
                  animate={{ scale: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Welcome
                </motion.h1>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.p
                    className="text-xl text-gray-300 font-light"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    I'm Hit Ghevariya
                  </motion.p>
                  <motion.p
                    className="text-gray-400"
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    Software Engineer · Machine Learning Engineer
                  </motion.p>
                </motion.div>
                <motion.div
                  className="w-24 h-0.5 bg-gradient-to-r from-teal-400 to-teal-200 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            )}

            {/* Ready Phase */}
            {phase === "ready" && (
              <motion.div
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(45, 212, 191, 0.3)",
                        "0 0 30px rgba(45, 212, 191, 0.5)",
                        "0 0 20px rgba(45, 212, 191, 0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Hit Ghevariya
                  </motion.h1>
                  <motion.p
                    className="text-xl text-gray-300 font-light"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Software Engineer · ML Engineer
                  </motion.p>
                  <motion.div
                    className="w-24 h-0.5 bg-gradient-to-r from-teal-400 to-teal-200 mx-auto rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  />
                </div>

                {/* Enter Button */}
                <AnimatePresence>
                  {showButton && (
                    <motion.button
                      onClick={handleEnter}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                      className="
                        group relative overflow-hidden
                        text-teal-400 text-lg tracking-[0.2em] uppercase font-light
                        border border-teal-500/40 px-8 py-3 rounded-full
                        transition-all duration-300
                        hover:bg-teal-500/10 hover:border-teal-400/60
                        hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]
                        hover:tracking-[0.3em]
                      "
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-teal-400/10 to-teal-500/5 rounded-full"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 border border-teal-400/20 rounded-full"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />

                      <span className="relative z-10">Enter Portfolio</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtle scan lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-teal-400/20"
              style={{ top: `${20 + i * 15}%` }}
              animate={{
                opacity: [0, 0.3, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
