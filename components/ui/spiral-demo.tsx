"use client"

import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { useState, useEffect } from "react"

const SpiralDemo = () => {
  const [startVisible, setStartVisible] = useState(false)

  // Handle navigation back to portfolio
  const navigateToPortfolio = () => {
    window.location.href = "/"
  }

  // Fade in the start button after animation loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Spiral Animation */}
      <div className="absolute inset-0">
        <SpiralAnimation opacity={0.8} />
      </div>

      {/* Simple Elegant Text Button with Pulsing Effect */}
      <div
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
          transition-all duration-1500 ease-out
          ${startVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <button
          onClick={navigateToPortfolio}
          className="
            text-teal-400 text-2xl tracking-[0.2em] uppercase font-extralight
            transition-all duration-700 border border-teal-500/30 px-8 py-4 rounded-full
            hover:tracking-[0.3em] hover:bg-teal-500/10 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]
            animate-pulse
          "
        >
          Enter Portfolio
        </button>
      </div>
    </div>
  )
}

export { SpiralDemo }
