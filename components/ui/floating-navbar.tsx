"use client"

import { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent, type JSX } from "framer-motion"
import { cn } from "@/lib/utils"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious()
      if (previous !== undefined) {
        const direction = current - previous
        const currentScrollY = window.scrollY

        // Only show floating nav when:
        // 1. Scrolled past 100px (away from original navbar)
        // 2. AND scrolling UP (direction < 0)
        if (currentScrollY > 100) {
          if (direction < 0) {
            // Scrolling UP - show floating nav
            setVisible(true)
          } else {
            // Scrolling DOWN - hide floating nav
            setVisible(false)
          }
        } else {
          // Near top - hide floating nav (original navbar territory)
          setVisible(false)
        }
      }
    }
  })

  const handleNavClick = (link: string) => {
    const element = document.querySelector(link)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -100,
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-gray-700/50 rounded-full bg-gray-900/95 backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
            className,
          )}
        >
          {navItems.map((navItem: any, idx: number) => (
            <button
              key={`link=${idx}`}
              onClick={() => handleNavClick(navItem.link)}
              className={cn(
                "relative text-gray-300 items-center flex space-x-1 hover:text-teal-400 transition-colors duration-200 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-800/50",
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
            </button>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border text-sm font-medium relative border-gray-700/50 text-gray-200 hover:text-teal-400 px-4 py-2 rounded-full hover:border-teal-500/50 transition-all duration-200 hover:shadow-[0_0_10px_rgba(45,212,191,0.3)]"
          >
            <span>Top</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-teal-500 to-transparent h-px" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
