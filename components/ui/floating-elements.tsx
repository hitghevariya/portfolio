"use client"

import { motion } from "framer-motion"

interface FloatingElementsProps {
  count?: number
  className?: string
}

export function FloatingElements({ count = 12, className = "" }: FloatingElementsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Floating Orbs */}
      {[...Array(Math.floor(count / 2))].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-20 h-20 bg-teal-500/10 rounded-full blur-xl"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 2) * 60}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Dots */}
      {[...Array(Math.floor(count / 2))].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 bg-teal-400/40 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent"
          style={{
            width: "200px",
            left: `${20 + i * 30}%`,
            top: `${40 + i * 20}%`,
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
