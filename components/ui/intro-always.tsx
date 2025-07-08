"use client"

import { useState, useEffect } from "react"
import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { motion, AnimatePresence } from "framer-motion"

interface IntroAlwaysProps {
  onComplete: () => void
}

export function IntroAlways({ onComplete }: IntroAlwaysProps) {
  const [showButton, setShowButton] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Show the enter button after 2 seconds
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Full Spiral Animation */}
      <div className="absolute inset-0">
        <SpiralAnimation opacity={1} />
      </div>

      {/* Center Enter Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {showButton && (
            <motion.button
              onClick={handleEnter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="
                text-teal-400 text-2xl tracking-[0.2em] uppercase font-extralight
                transition-all duration-700 border border-teal-500/30 px-8 py-4 rounded-full
                hover:tracking-[0.3em] hover:bg-teal-500/10 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]
                animate-pulse
              "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enter
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
