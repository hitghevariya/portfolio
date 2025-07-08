"use client"

import { useEffect, useRef, useState } from "react"

interface SpiralAnimationLiteProps {
  className?: string
  opacity?: number
  particleCount?: number
}

export function SpiralAnimationLite({ className = "", opacity = 0.3, particleCount = 50 }: SpiralAnimationLiteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Lightweight animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    // Simple particle system
    const particles: Array<{
      angle: number
      radius: number
      speed: number
      opacity: number
      size: number
    }> = []

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: (i / particleCount) * Math.PI * 2,
        radius: 50 + Math.random() * 200,
        speed: 0.002 + Math.random() * 0.003,
        opacity: 0.3 + Math.random() * 0.7,
        size: 1 + Math.random() * 2,
      })
    }

    const animate = () => {
      timeRef.current += 0.016 // ~60fps

      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw particles
      particles.forEach((particle, index) => {
        // Update particle
        particle.angle += particle.speed

        // Calculate spiral position
        const spiralRadius = particle.radius + Math.sin(timeRef.current + index) * 20
        const x = centerX + Math.cos(particle.angle) * spiralRadius
        const y = centerY + Math.sin(particle.angle) * spiralRadius

        // Draw particle
        const alpha = particle.opacity * opacity * (0.5 + 0.5 * Math.sin(timeRef.current * 2 + index))
        ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, opacity, particleCount])

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity }} />
    </div>
  )
}
