"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide original navbar when scrolled past 100px (floating navbar takes over)
      if (currentScrollY > 100) {
        setVisible(false)
      } else {
        // Show original navbar when near top
        setVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const resetIntro = () => {
    localStorage.removeItem("hasSeenIntro")
    window.location.reload()
  }

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        visible ? "translate-y-0 opacity-100 bg-transparent" : "-translate-y-full opacity-0 pointer-events-none",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200 hover:opacity-80 transition-opacity cursor-pointer"
          >
            HG
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-300 hover:text-teal-400 transition-colors duration-200 cursor-pointer font-medium"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={resetIntro}
              className="text-xs text-gray-500 hover:text-teal-400 transition-colors duration-200 ml-4 cursor-pointer"
            >
              Reset Intro
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-teal-400 transition-colors cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block py-2 text-gray-300 hover:text-teal-400 transition-colors w-full text-left cursor-pointer font-medium"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={resetIntro}
              className="block py-2 text-gray-500 hover:text-teal-400 transition-colors text-sm w-full text-left cursor-pointer"
            >
              Reset Intro
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
