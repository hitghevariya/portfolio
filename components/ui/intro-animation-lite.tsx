"use client"

import { useState, useEffect } from "react"
import { SpiralAnimationLite } from "@/components/ui/spiral-animation-lite"
import { motion, AnimatePresence } from "framer-motion"

interface IntroAnimationLiteProps {
  onComplete: () => void
}

export function IntroAnimationLite({ onComplete }: IntroAnimationLiteProps) {
  const [showButton, setShowButton] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Show button faster
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(() => {
      onComplete()
    }, 800) // Faster transition
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Lightweight Spiral Animation */}
        <div className="absolute inset-0">
          <SpiralAnimationLite opacity={0.6} particleCount={30} />
        </div>

        {/* Simplified Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6">
            {/* Title */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Hit Ghevariya
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Software Engineer · ML Engineer
            </motion.p>

            {/* Enter Button */}
            <AnimatePresence>
              {showButton && (
                <motion.button
                  onClick={handleEnter}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="
                    text-teal-400 text-xl tracking-[0.2em] uppercase font-light
                    border border-teal-500/30 px-8 py-3 rounded-full
                    transition-all duration-300
                    hover:bg-teal-500/10 hover:border-teal-400/60
                  "
                >
                  Enter
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
