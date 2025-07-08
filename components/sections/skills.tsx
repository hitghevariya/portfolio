"use client"

import { useState, useEffect } from "react"
import { Code, Server, Palette, Brain } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { LinkPreviewSimple } from "@/components/ui/link-preview-simple"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export default function Skills() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const skillCategories = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Languages",
      skills: [
        {
          name: "C",
          url: "https://en.wikipedia.org/wiki/C_(programming_language)",
          description: "System programming language",
        },
        { name: "Python", url: "https://python.org", description: "Versatile programming language" },
        { name: "Java", url: "https://java.com", description: "Object-oriented programming language" },
      ],
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Technologies / Tools",
      skills: [
        { name: "Git", url: "https://git-scm.com", description: "Version control system" },
        { name: "GitHub", url: "https://github.com", description: "Code hosting platform" },
        { name: "VS Code", url: "https://code.visualstudio.com", description: "Code editor" },
      ],
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Skills",
      skills: [
        {
          name: "Data Structures and Algorithms",
          url: "https://en.wikipedia.org/wiki/Data_structure",
          description: "Fundamental CS concepts",
        },
        {
          name: "Problem-Solving",
          url: "https://en.wikipedia.org/wiki/Problem_solving",
          description: "Analytical thinking approach",
        },
        {
          name: "Responsive Web Design",
          url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
          description: "Mobile-first design approach",
        },
      ],
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Soft Skills",
      skills: [
        {
          name: "Critical Thinking",
          url: "https://en.wikipedia.org/wiki/Critical_thinking",
          description: "Analytical reasoning skills",
        },
        {
          name: "Problem-Solving Skills",
          url: "https://en.wikipedia.org/wiki/Problem_solving",
          description: "Solution-oriented mindset",
        },
        {
          name: "Adaptability",
          url: "https://en.wikipedia.org/wiki/Adaptability",
          description: "Flexibility in changing environments",
        },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 relative scroll-mt-16">
      <SectionHeading title="Skills" subtitle="Technologies and abilities I've acquired" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className={cn(
              "relative bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-teal-500/50 transition-all duration-500 opacity-0 transform translate-y-8",
              mounted && "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 100}ms` : "0ms",
            }}
          >
            <GlowingEffect
              spread={30}
              glow={true}
              disabled={false}
              proximity={80}
              inactiveZone={0.3}
              borderWidth={2}
              movementDuration={1.5}
            />

            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-800/50 rounded-lg text-teal-400">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-200">{category.title}</h3>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="bg-gray-800/30 px-4 py-2 rounded-lg border border-gray-700/50 hover:border-teal-500/30 hover:shadow-[0_0_10px_rgba(45,212,191,0.15)] transition-all duration-300"
                    >
                      <LinkPreviewSimple
                        url={skill.url}
                        description={skill.description}
                        className="text-gray-300 hover:text-teal-400 transition-colors no-underline"
                      >
                        {skill.name}
                      </LinkPreviewSimple>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
