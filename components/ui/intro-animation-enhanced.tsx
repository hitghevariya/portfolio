"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SpiralAnimationLite } from "@/components/ui/spiral-animation-lite"

interface IntroAnimationEnhancedProps {
  onComplete: () => void
}

export function IntroAnimationEnhanced({ onComplete }: IntroAnimationEnhancedProps) {
  const [phase, setPhase] = useState<"loading" | "reveal" | "ready" | "exit">("loading")
  const [showButton, setShowButton] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle explosion effect
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
      life: number
      maxLife: number
      size: number
      color: string
    }> = []

    // Create explosion particles
    const createExplosion = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
        const speed = 2 + Math.random() * 4
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          size: 2 + Math.random() * 3,
          color: Math.random() > 0.5 ? "rgba(45, 212, 191, " : "rgba(20, 184, 166, ",
        })
      }
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.life++

        const alpha = 1 - p.life / p.maxLife
        if (alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.fillStyle = p.color + alpha + ")"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
        ctx.fill()
      }

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate)
      }
    }

    // Animation sequence
    const sequence = async () => {
      // Phase 1: Loading particles
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Create multiple explosions
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      createExplosion(centerX, centerY, 50)
      animate()

      await new Promise((resolve) => setTimeout(resolve, 800))
      setPhase("reveal")

      await new Promise((resolve) => setTimeout(resolve, 1500))
      setPhase("ready")
      setShowButton(true)
    }

    sequence()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  const handleEnter = () => {
    setPhase("exit")
    setTimeout(() => {
      onComplete()
    }, 1200)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Spiral Background */}
        <div className="absolute inset-0">
          <SpiralAnimationLite opacity={phase === "loading" ? 0.3 : 0.6} particleCount={80} />
        </div>

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{
            opacity: phase === "loading" ? 0 : 0.3,
            scale: 1,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Glowing Orbs */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 bg-teal-500/20 rounded-full blur-xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: phase === "loading" ? 0 : [1, 1.2, 1],
                opacity: phase === "loading" ? 0 : [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-8 max-w-4xl px-4">
            {/* Loading Phase */}
            <AnimatePresence>
              {phase === "loading" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <motion.div
                    className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-400 rounded-full mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <motion.p
                    className="text-teal-400 text-lg tracking-wider"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Initializing...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reveal Phase */}
            <AnimatePresence>
              {phase === "reveal" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Name with dramatic entrance */}
                  <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                    initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-teal-200"
                      style={{
                        filter: "drop-shadow(0 0 30px rgba(45, 212, 191, 0.8))",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      Hit Ghevariya
                    </motion.span>
                  </motion.h1>

                  {/* Subtitle with typewriter effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <TypewriterText
                      text="Software Engineer · Machine Learning Engineer"
                      className="text-xl md:text-2xl text-gray-300 font-light"
                    />
                  </motion.div>

                  {/* Animated line */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: "200px" }}
                    transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ready Phase */}
            <AnimatePresence>
              {phase === "ready" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="space-y-8"
                >
                  {/* Final title */}
                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(45, 212, 191, 0.5)",
                        "0 0 40px rgba(45, 212, 191, 0.8)",
                        "0 0 20px rgba(45, 212, 191, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
                      Hit Ghevariya
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-xl md:text-2xl text-gray-400 font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Software Engineer · Machine Learning Engineer
                  </motion.p>

                  {/* Enter Button with enhanced effects */}
                  <AnimatePresence>
                    {showButton && (
                      <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="pt-8"
                      >
                        <motion.button
                          onClick={handleEnter}
                          className="
                            relative group overflow-hidden
                            text-teal-400 text-2xl md:text-3xl tracking-[0.3em] uppercase font-extralight
                            border-2 border-teal-500/40 px-16 py-6 rounded-full
                            transition-all duration-500
                            hover:tracking-[0.5em] hover:border-teal-400/80
                            hover:shadow-[0_0_50px_rgba(45,212,191,0.6)]
                          "
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(45, 212, 191, 0.3)",
                              "0 0 40px rgba(45, 212, 191, 0.6)",
                              "0 0 20px rgba(45, 212, 191, 0.3)",
                            ],
                          }}
                          transition={{
                            boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                          }}
                        >
                          {/* Button background effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-teal-400/20 to-teal-500/10 rounded-full"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          />

                          {/* Pulsing rings */}
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute inset-0 border border-teal-400/20 rounded-full"
                              animate={{
                                scale: [1, 1.5, 2],
                                opacity: [0.6, 0.3, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.4,
                                ease: "easeOut",
                              }}
                            />
                          ))}

                          <span className="relative z-10">Enter</span>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Exit Animation Overlay */}
        <AnimatePresence>
          {phase === "exit" && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

// Typewriter effect component
function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <p className={className}>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-6 bg-teal-400 ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      />
    </p>
  )
}
