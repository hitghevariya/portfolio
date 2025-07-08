"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/ui/navbar"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Achievements from "@/components/sections/achievements"
import Contact from "@/components/sections/contact"
import { ParticlesBackground } from "@/components/ui/particles-background"
import { FloatingElements } from "@/components/ui/floating-elements"
import { IntroProfessional } from "@/components/ui/intro-professional"
import { PerformanceToggle } from "@/components/ui/performance-toggle"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { User, Code, Briefcase, Trophy, Mail } from "lucide-react"

export default function Portfolio() {
  const [showIntro, setShowIntro] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [performanceSettings, setPerformanceSettings] = useState({
    reducedMotion: false,
    lightweightAnimations: false,
    disableParticles: false,
  })

  // Load performance settings
  useEffect(() => {
    const saved = localStorage.getItem("performanceSettings")
    if (saved) {
      setPerformanceSettings(JSON.parse(saved))
    }

    // Check if user has seen intro before
    const hasSeenIntro = localStorage.getItem("hasSeenIntro")
    if (hasSeenIntro && !window.location.hash.includes("intro")) {
      setShowIntro(false)
      setShowContent(true)
    }

    // Listen for performance settings changes
    const handleSettingsChange = (event: CustomEvent) => {
      setPerformanceSettings(event.detail)
    }

    window.addEventListener("performanceSettingsChanged", handleSettingsChange as EventListener)
    return () => {
      window.removeEventListener("performanceSettingsChanged", handleSettingsChange as EventListener)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setTimeout(() => {
      setShowContent(true)
      localStorage.setItem("hasSeenIntro", "true")
    }, 200)
  }

  // Floating navigation items
  const floatingNavItems = [
    {
      name: "Home",
      link: "#hero",
      icon: <Code className="h-4 w-4 text-gray-400" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <User className="h-4 w-4 text-gray-400" />,
    },
    {
      name: "Skills",
      link: "#skills",
      icon: <Code className="h-4 w-4 text-gray-400" />,
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <Briefcase className="h-4 w-4 text-gray-400" />,
    },
    {
      name: "Achievements",
      link: "#achievements",
      icon: <Trophy className="h-4 w-4 text-gray-400" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <Mail className="h-4 w-4 text-gray-400" />,
    },
  ]

  return (
    <>
      {/* Professional Intro Animation */}
      {showIntro && <IntroProfessional onComplete={handleIntroComplete} />}

      {/* Main Portfolio Content */}
      {showContent && (
        <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden relative">
          {/* Floating Navigation */}
          <FloatingNav navItems={floatingNavItems} />

          {/* Enhanced Background Effects */}
          {!performanceSettings.disableParticles && (
            <>
              <ParticlesBackground
                particleCount={performanceSettings.lightweightAnimations ? 30 : 50}
                connectionDistance={performanceSettings.lightweightAnimations ? 80 : 100}
                speed={performanceSettings.lightweightAnimations ? 0.2 : 0.3}
                opacity={0.4}
                className="z-0"
              />
              <FloatingElements count={performanceSettings.lightweightAnimations ? 8 : 12} className="z-0" />
            </>
          )}

          {/* Animated Grid Background */}
          <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-0 opacity-10 animate-pulse"></div>

          {/* Gradient Overlays */}
          <div className="fixed inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-teal-500/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-teal-500/5 to-transparent"></div>
            <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-teal-500/5 to-transparent"></div>
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-teal-500/5 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <Navbar />
            <div className="container mx-auto px-4">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Achievements />
              <Contact />
            </div>
          </div>

          {/* Performance Toggle */}
          <PerformanceToggle />
        </main>
      )}
    </>
  )
}
