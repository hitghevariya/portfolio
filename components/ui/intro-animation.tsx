"use client"

import { useState, useEffect } from "react"
import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { motion, AnimatePresence } from "framer-motion"

interface IntroAnimationProps {
  onComplete: () => void
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showButton, setShowButton] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Show the enter button after 3 seconds
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setIsExiting(true)
    // Wait for exit animation to complete
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Spiral Animation Background */}
        <div className="absolute inset-0">
          <SpiralAnimation opacity={0.9} />
        </div>

        {/* Animated Grid Overlay */}
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-8">
            {/* Main Title with Staggered Animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200 drop-shadow-[0_0_30px_rgba(45,212,191,0.8)]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                >
                  Hit Ghevariya
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-gray-400 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            >
              Software Engineer · Machine Learning Engineer
            </motion.p>

            {/* Animated Divider */}
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-200 mx-auto rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 128, opacity: 1 }}
              transition={{ duration: 1, delay: 2, ease: "easeOut" }}
            />

            {/* Enter Button */}
            <AnimatePresence>
              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.8 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="pt-8"
                >
                  <motion.button
                    onClick={handleEnter}
                    className="
                      relative group
                      text-teal-400 text-xl md:text-2xl tracking-[0.3em] uppercase font-extralight
                      border border-teal-500/30 px-12 py-4 rounded-full
                      transition-all duration-700
                      hover:tracking-[0.4em] hover:bg-teal-500/10 
                      hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]
                      hover:border-teal-400/60
                    "
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Button Background Glow */}
                    <motion.div
                      className="absolute inset-0 bg-teal-500/5 rounded-full blur-xl"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />

                    {/* Pulsing Ring */}
                    <motion.div
                      className="absolute inset-0 border border-teal-400/20 rounded-full"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />

                    <span className="relative z-10">Enter</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Exit Animation Overlay */}
        <AnimatePresence>
          {isExiting && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
