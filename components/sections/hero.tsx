"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Sparkles } from "lucide-react"
import { SaveButton } from "@/components/ui/save-button"
import { motion } from "framer-motion"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleViewProjects = async () => {
    // Simulate loading projects
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Scroll to projects section
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative pt-16" id="hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Central glow */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-teal-400/60" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center space-y-6 max-w-4xl px-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={150}
            inactiveZone={0.6}
            borderWidth={1}
            movementDuration={3}
            className="opacity-30"
          />

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 200%",
                filter: "drop-shadow(0 0 15px rgba(45,212,191,0.5))",
              }}
            >
              Hit Ghevariya
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Software Engineer · Machine Learning Engineer
          </motion.p>

          <motion.div
            className="pt-4 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <SaveButton
              text={{
                idle: "View Projects",
                saving: "Loading Projects...",
                saved: "Projects Loaded!",
              }}
              onSave={handleViewProjects}
            />
          </motion.div>

          {/* Animated typing indicator */}
          <motion.div
            className="flex items-center justify-center gap-2 text-teal-400/60 text-sm pt-8"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <span>Ready to explore</span>
            <motion.div
              className="flex space-x-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
              <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
              <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.button
          onClick={handleScrollToAbout}
          aria-label="Scroll to About section"
          className="cursor-pointer hover:text-teal-300 transition-colors group"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowDown className="text-teal-400 h-8 w-8 group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.8)] transition-all duration-300" />
        </motion.button>
      </motion.div>
    </section>
  )
}
