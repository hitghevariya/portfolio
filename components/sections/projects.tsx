"use client"

import { useState, useEffect } from "react"
import SectionHeading from "@/components/ui/section-heading"
import ProjectCard from "@/components/ui/project-card"
import { LinkPreview } from "@/components/ui/link-preview"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export default function Projects() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects = [
    {
      
      title: "AI Resume Roaster",
      description:
      "AI Resume Roaster is an intelligent web-based tool that evaluates resumes using AI-powered algorithms. It highlights strengths and weaknesses, provides actionable feedback on structure, skills, and keywords, and scores resumes based on industry best practices.",
      date: "June 2025",
      techStack: ["Python", "OpenAI API", "Streamlit", "NLP", "Resume Parsing"],
      codeUrl: "https://github.com/hitghevariya/ai-resume-roaster"


    },
    {
      title: "Total Video Duration Calculator",
      description:
        "Total Video Duration Calculator is a Python script that scans a folder and calculates the combined playtime of all video files. It supports formats like .mp4, .mkv, and .avi and returns the total duration in hours, minutes, and seconds.",
      date: "April 2025",
      techStack: ["Python", "moviepy"],
      codeUrl: "https://github.com/hitghevariya/Total-Video-Duration-Calculator/blob/master/main.py",
    },
    {
      title: "Weather Dashboard App",
      description:
        "Weather Dashboard App is a React-based web application that allows users to search for current weather conditions in any city around the world. It fetches real-time data using the OpenWeatherMap API and dynamically changes the theme based on the weather. The app provides temperature,   humidity, wind speed, and weather descriptions in a clean, responsive UI.",
      date: "July 2025",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Axios", "Vite", "OpenWeatherMap API"],
      codeUrl: "https://github.com/hitghevariya/weather-dashboard"
}
,
  ]

  return (
    <section id="projects" className="py-20 relative scroll-mt-16">
      <SectionHeading title="Projects" subtitle="Some of my recent work" />

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              "opacity-0 transform translate-y-8 transition-all duration-700",
              mounted && "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 200}ms` : "0ms",
            }}
          >
            <div className="relative">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={100}
                inactiveZone={0.25}
                borderWidth={2.5}
                movementDuration={2}
              />
              <ProjectCard
                title={project.title}
                description={project.description}
                date={project.date}
                techStack={project.techStack}
                codeUrl={project.codeUrl}
                imageSrc={project.imageSrc}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack Links with Preview */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200 mb-6">
          Built with amazing technologies
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-teal-500/50 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(45,212,191,0.15)]">
            <LinkPreview url="https://streamlit.io" className="text-gray-300 hover:text-teal-400 transition-colors">
              Streamlit
            </LinkPreview>
          </button>
          <button className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-teal-500/50 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(45,212,191,0.15)]">
            <LinkPreview url="https://python.org" className="text-gray-300 hover:text-teal-400 transition-colors">
              Python
            </LinkPreview>
          </button>
          <button className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-teal-500/50 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(45,212,191,0.15)]">
            <LinkPreview url="https://github.com" className="text-gray-300 hover:text-teal-400 transition-colors">
              GitHub
            </LinkPreview>
          </button>
          <button className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-teal-500/50 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(45,212,191,0.15)]">
            <LinkPreview
              url="https://code.visualstudio.com"
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              VS Code
            </LinkPreview>
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4">Click on any technology to learn more</p>
      </div>
    </section>
  )
}
