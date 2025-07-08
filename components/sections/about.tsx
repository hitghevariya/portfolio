"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Code, Briefcase, GraduationCap, MapPin } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export default function About() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const quickFacts = [
    {
      icon: <Code className="h-5 w-5 text-teal-400" />,
      title: "Software Engineer",
      description: "Passionate about clean code and innovative solutions",
    },
    {
      icon: <Briefcase className="h-5 w-5 text-teal-400" />,
      title: "ML Engineer",
      description: "Building intelligent systems with cutting-edge AI",
    },
    {
      icon: <GraduationCap className="h-5 w-5 text-teal-400" />,
      title: "Continuous Learner",
      description: "Always expanding knowledge and skills",
    },
    {
      icon: <MapPin className="h-5 w-5 text-teal-400" />,
      title: "Surat, Gujrat",
      description: "Based in India",
    },
  ]

  return (
    <section id="about" className="py-20 relative scroll-mt-16">
      <SectionHeading title="About Me" subtitle="Get to know me better" />

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div
          className={cn(
            "relative opacity-0 transform -translate-x-8 transition-all duration-1000",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <GlowingEffect
              spread={45}
              glow={true}
              disabled={false}
              proximity={120}
              inactiveZone={0.3}
              borderWidth={3}
              movementDuration={2.5}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-teal-300/20 rounded-2xl -rotate-6 transform scale-95"></div>
            <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800/50"></div>
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/hit-profile-new.jpg"
                alt="Hit Ghevariya"
                width={400}
                height={400}
                className="object-cover h-full w-full"
                priority
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "space-y-6 opacity-0 transform translate-x-8 transition-all duration-1000 delay-300",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800/50 shadow-lg">
            <p className="text-gray-300 leading-relaxed">
              I'm a passionate Software Engineer and Machine Learning enthusiast with a strong foundation in
              problem-solving and algorithm design. I enjoy creating responsive, user-friendly applications and
              exploring the possibilities of AI.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              My journey in tech is driven by curiosity and a desire to build solutions that make a difference. I'm
              constantly learning and adapting to new technologies to stay at the forefront of innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickFacts.map((fact, index) => (
              <div key={index} className="relative">
                <GlowingEffect
                  spread={25}
                  glow={true}
                  disabled={false}
                  proximity={70}
                  inactiveZone={0.4}
                  borderWidth={1.5}
                  movementDuration={1.5}
                />
                <div className="bg-gray-900/30 backdrop-blur-sm p-4 rounded-xl border border-gray-800/50 hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(45,212,191,0.15)]">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{fact.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-200">{fact.title}</h3>
                      <p className="text-sm text-gray-400">{fact.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
