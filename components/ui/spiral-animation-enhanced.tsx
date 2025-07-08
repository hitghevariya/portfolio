"use client"

import { useEffect, useRef, useState } from "react"

interface SpiralAnimationEnhancedProps {
  className?: string
  opacity?: number
  particleCount?: number
  showTrails?: boolean
}

export function SpiralAnimationEnhanced({
  className = "",
  opacity = 0.6,
  particleCount = 100,
  showTrails = true,
}: SpiralAnimationEnhancedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    const particles: Array<{
      angle: number
      radius: number
      speed: number
      opacity: number
      size: number
      trail: Array<{ x: number; y: number; alpha: number }>
      color: { r: number; g: number; b: number }
    }> = []

    // Initialize particles with enhanced properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: (i / particleCount) * Math.PI * 4,
        radius: 30 + Math.random() * 300,
        speed: 0.005 + Math.random() * 0.01,
        opacity: 0.4 + Math.random() * 0.6,
        size: 1 + Math.random() * 4,
        trail: [],
        color: {
          r: 45 + Math.random() * 20,
          g: 212 + Math.random() * 20,
          b: 191 + Math.random() * 20,
        },
      })
    }

    const animate = () => {
      timeRef.current += 0.016

      // Create trailing effect instead of clearing
      if (showTrails) {
        ctx.fillStyle = "rgba(17, 24, 39, 0.1)"
        ctx.fillRect(0, 0, dimensions.width, dimensions.height)
      } else {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      }

      particles.forEach((particle, index) => {
        // Update particle
        particle.angle += particle.speed

        // Create multiple spiral layers
        const spiralRadius =
          particle.radius +
          Math.sin(timeRef.current * 2 + index * 0.1) * 30 +
          Math.cos(timeRef.current * 0.5 + index * 0.05) * 15

        const x = centerX + Math.cos(particle.angle) * spiralRadius
        const y = centerY + Math.sin(particle.angle) * spiralRadius

        // Add to trail
        if (showTrails) {
          particle.trail.push({ x, y, alpha: 1 })
          if (particle.trail.length > 20) {
            particle.trail.shift()
          }

          // Draw trail
          particle.trail.forEach((point, trailIndex) => {
            const alpha = (trailIndex / particle.trail.length) * particle.opacity * opacity * 0.5
            const size = (trailIndex / particle.trail.length) * particle.size * 0.5

            ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`
            ctx.beginPath()
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
            ctx.fill()
          })
        }

        // Draw main particle with glow effect
        const alpha = particle.opacity * opacity * (0.7 + 0.3 * Math.sin(timeRef.current * 3 + index))

        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 3)
        gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`)
        gradient.addColorStop(
          0.5,
          `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha * 0.5})`,
        )
        gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`
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
  }, [dimensions, opacity, particleCount, showTrails])

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
