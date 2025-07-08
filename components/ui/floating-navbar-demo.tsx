"use client"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Home, User, Briefcase, Code, Trophy, Mail } from "lucide-react"

export default function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "#hero",
      icon: <Home className="h-4 w-4 text-gray-400" />,
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
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
      <DummyContent />
    </div>
  )
}

const DummyContent = () => {
  return (
    <div className="grid grid-cols-1 h-[40rem] w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative border border-gray-800/50 rounded-md">
      <p className="text-gray-300 text-center text-4xl mt-40 font-bold">Scroll back up to reveal Floating Navbar</p>
      <div className="inset-0 absolute bg-[url('/grid.svg')] bg-center opacity-10" />
    </div>
  )
}
