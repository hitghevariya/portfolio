"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface HolographicDisplayProps {
  text: string
  isActive: boolean
}

export function HolographicDisplay({ text, isActive }: HolographicDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 400

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.02

      // Clear with slight transparency for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw holographic grid
      ctx.strokeStyle = "rgba(45, 212, 191, 0.3)"
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 40) {
        const offset = Math.sin(time + x * 0.01) * 10
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 40) {
        const offset = Math.cos(time + y * 0.01) * 10
        ctx.beginPath()
        ctx.moveTo(0, y + offset)
        ctx.lineTo(canvas.width, y + offset)
        ctx.stroke()
      }

      // Draw text with holographic effect
      ctx.font = "bold 48px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Multiple layers for depth
      for (let i = 0; i < 5; i++) {
        const alpha = 0.8 - i * 0.15
        const offset = i * 2
        const hue = 180 + Math.sin(time + i) * 20

        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha})`
        ctx.fillText(text, centerX + offset, centerY + offset)
      }

      // Scan lines
      for (let y = 0; y < canvas.height; y += 4) {
        const alpha = 0.1 + Math.sin(time * 10 + y * 0.1) * 0.05
        ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`
        ctx.fillRect(0, y, canvas.width, 2)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isActive, text])

  if (!isActive) return null

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full"
        style={{
          filter: "blur(0.5px) brightness(1.2)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  )
}
