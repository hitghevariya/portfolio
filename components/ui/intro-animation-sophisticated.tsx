"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface IntroAnimationSophisticatedProps {
  onComplete: () => void
}

export function IntroAnimationSophisticated({ onComplete }: IntroAnimationSophisticatedProps) {
  const [phase, setPhase] = useState<"boot" | "scan" | "matrix" | "hologram" | "reveal" | "ready" | "exit">("boot")
  const [showButton, setShowButton] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)

  // Boot sequence
  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Boot (2s)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPhase("scan")

      // Phase 2: Scan (2s)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPhase("matrix")

      // Phase 3: Matrix (2s)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPhase("hologram")

      // Phase 4: Hologram (2s)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPhase("reveal")

      // Phase 5: Reveal (3s)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setPhase("ready")
      setShowButton(true)
    }

    sequence()
  }, [])

  // Advanced particle system
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
      type: "spark" | "glow" | "trail"
    }> = []

    const createParticleExplosion = (x: number, y: number, count: number, type: "spark" | "glow" | "trail") => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
        const speed = 2 + Math.random() * 6
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 60 + Math.random() * 60,
          size: type === "glow" ? 3 + Math.random() * 5 : 1 + Math.random() * 3,
          color: type === "spark" ? "rgba(255, 255, 255, " : "rgba(45, 212, 191, ",
          type,
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
        p.vx *= 0.99
        p.vy *= 0.99
        p.life++

        const alpha = 1 - p.life / p.maxLife
        if (alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        if (p.type === "glow") {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
          gradient.addColorStop(0, p.color + alpha + ")")
          gradient.addColorStop(1, p.color + "0)")
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = p.color + alpha + ")"
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Create continuous effects based on phase
      if (phase === "scan" && Math.random() < 0.1) {
        createParticleExplosion(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          5,
          Math.random() > 0.5 ? "spark" : "glow",
        )
      }

      if (particles.length > 0 || phase === "scan") {
        animationId = requestAnimationFrame(animate)
      }
    }

    if (phase === "scan" || phase === "hologram") {
      // Initial explosion
      createParticleExplosion(canvas.width / 2, canvas.height / 2, 100, "glow")
      animate()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [phase])

  // Matrix rain effect
  useEffect(() => {
    const canvas = matrixCanvasRef.current
    if (!canvas || phase !== "matrix") return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?"
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    let animationId: number
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(45, 212, 191, 0.8)"
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [phase])

  // Advanced particle field
  useEffect(() => {
    const canvas = particleCanvasRef.current
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
      hue: number
    }> = []

    // Initialize particle field
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: 180 + Math.random() * 40, // Teal range
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const alpha = (1 - distance / 100) * 0.3
            ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      if (phase === "hologram" || phase === "reveal" || phase === "ready") {
        animationId = requestAnimationFrame(animate)
      }
    }

    if (phase === "hologram" || phase === "reveal" || phase === "ready") {
      animate()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [phase])

  const handleEnter = () => {
    setPhase("exit")
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Canvas Layers */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <canvas ref={matrixCanvasRef} className="absolute inset-0 w-full h-full" />
        <canvas ref={particleCanvasRef} className="absolute inset-0 w-full h-full" />

        {/* Scanning Lines */}
        <AnimatePresence>
          {phase === "scan" && (
            <>
              <motion.div
                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                initial={{ top: "0%", opacity: 0 }}
                animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, ease: "linear", repeat: 2 }}
              />
              <motion.div
                className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-teal-400 to-transparent"
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, ease: "linear", repeat: 2, delay: 0.5 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Boot Phase */}
        <AnimatePresence>
          {phase === "boot" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center space-y-8">
                <motion.div
                  className="text-teal-400 font-mono text-lg"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  INITIALIZING SYSTEM...
                </motion.div>

                <div className="space-y-2">
                  {["LOADING NEURAL NETWORKS", "CALIBRATING SENSORS", "ESTABLISHING CONNECTION"].map((text, i) => (
                    <motion.div
                      key={i}
                      className="text-green-400 font-mono text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.5, duration: 0.5 }}
                    >
                      {">"} {text}
                      <motion.span
                        className="ml-2"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 + 0.5 }}
                      >
                        ✓
                      </motion.span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-300"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan Phase */}
        <AnimatePresence>
          {phase === "scan" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center space-y-8">
                <motion.div
                  className="text-teal-400 font-mono text-2xl"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(45, 212, 191, 0.5)",
                      "0 0 20px rgba(45, 212, 191, 1)",
                      "0 0 10px rgba(45, 212, 191, 0.5)",
                    ],
                  }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  SCANNING ENVIRONMENT...
                </motion.div>

                <motion.div
                  className="relative w-32 h-32 mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="absolute inset-0 border-2 border-teal-400 rounded-full"></div>
                  <div className="absolute inset-2 border border-teal-300 rounded-full"></div>
                  <motion.div
                    className="absolute inset-0 border-t-2 border-teal-500 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Matrix Phase */}
        <AnimatePresence>
          {phase === "matrix" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-teal-400 font-mono text-3xl font-bold"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                ACCESSING MAINFRAME...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hologram Phase */}
        <AnimatePresence>
          {phase === "hologram" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center space-y-8">
                <motion.div
                  className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(45, 212, 191, 0.8))",
                  }}
                >
                  HOLOGRAM PROJECTION
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl"></div>
                  <div className="relative text-teal-300 font-mono">RENDERING IDENTITY MATRIX...</div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reveal Phase */}
        <AnimatePresence>
          {phase === "reveal" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center space-y-12 max-w-4xl px-4">
                {/* Main Title with Advanced Effects */}
                <motion.div className="relative">
                  <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
                    initial={{ opacity: 0, scale: 0.3, rotateY: -180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  >
                    <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      style={{
                        backgroundSize: "200% 200%",
                        filter: "drop-shadow(0 0 40px rgba(45, 212, 191, 0.8))",
                      }}
                    >
                      Hit Ghevariya
                    </motion.span>
                  </motion.h1>

                  {/* Holographic scan lines */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-t border-teal-400/30"
                      style={{ top: `${20 + i * 15}%` }}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: [0, 0.8, 0], scaleX: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>

                {/* Subtitle with Glitch Effect */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  <GlitchText
                    text="Software Engineer · Machine Learning Engineer"
                    className="text-xl md:text-3xl text-gray-300 font-light"
                  />
                </motion.div>

                {/* Data Stream */}
                <motion.div
                  className="font-mono text-sm text-teal-400/60 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  <div>NEURAL_NETWORK_STATUS: ACTIVE</div>
                  <div>CREATIVITY_LEVEL: MAXIMUM</div>
                  <div>INNOVATION_MODE: ENABLED</div>
                  <div>SYSTEM_READY: TRUE</div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ready Phase */}
        <AnimatePresence>
          {phase === "ready" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="text-center space-y-12">
                {/* Final Title */}
                <motion.h1
                  className="text-5xl md:text-7xl font-bold tracking-tight"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(45, 212, 191, 0.5)",
                      "0 0 40px rgba(45, 212, 191, 0.8)",
                      "0 0 60px rgba(45, 212, 191, 1)",
                      "0 0 40px rgba(45, 212, 191, 0.8)",
                      "0 0 20px rgba(45, 212, 191, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-200">
                    Hit Ghevariya
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-300 font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Software Engineer · Machine Learning Engineer
                </motion.p>

                {/* Advanced Enter Button */}
                <AnimatePresence>
                  {showButton && (
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.5 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -50, scale: 0.5 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="pt-8"
                    >
                      <motion.button
                        onClick={handleEnter}
                        className="
                          relative group overflow-hidden
                          text-teal-400 text-2xl md:text-4xl tracking-[0.4em] uppercase font-extralight
                          border-2 border-teal-500/40 px-20 py-8 rounded-full
                          transition-all duration-700
                          hover:tracking-[0.6em] hover:border-teal-400/80
                        "
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-cyan-400/20 to-teal-500/10 rounded-full"
                          animate={{
                            x: ["-100%", "100%"],
                            opacity: [0, 0.5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />

                        {/* Multiple Pulsing Rings */}
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0 border border-teal-400/20 rounded-full"
                            animate={{
                              scale: [1, 2, 3],
                              opacity: [0.8, 0.4, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.5,
                              ease: "easeOut",
                            }}
                          />
                        ))}

                        {/* Holographic Grid */}
                        <div className="absolute inset-0 opacity-20">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-full h-px bg-teal-400"
                              style={{ top: `${12.5 * i}%` }}
                              animate={{
                                opacity: [0, 1, 0],
                                scaleX: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </div>

                        <span className="relative z-10">ENTER</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exit Animation */}
        <AnimatePresence>
          {phase === "exit" && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

// Glitch Text Component
function GlitchText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    let glitchInterval: NodeJS.Timeout

    const startGlitch = () => {
      let iterations = 0
      glitchInterval = setInterval(() => {
        setDisplayText((prev) =>
          prev
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return text[index]
              }
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            })
            .join(""),
        )

        if (iterations >= text.length) {
          clearInterval(glitchInterval)
          setDisplayText(text)
        }

        iterations += 1 / 3
      }, 30)
    }

    const timeout = setTimeout(startGlitch, 500)

    return () => {
      clearTimeout(timeout)
      clearInterval(glitchInterval)
    }
  }, [text])

  return <div className={className}>{displayText}</div>
}
