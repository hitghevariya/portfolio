"use client"

import { useState, useEffect } from "react"
import SectionHeading from "@/components/ui/section-heading"
import ProjectCard from "@/components/ui/project-card"
import { cn } from "@/lib/utils"

export default function Projects() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects = [
    {
      title: "AI Resume Roaster",
      description: "AI-powered resume analysis tool that provides feedback and roasting with file upload functionality",
      date: "Jan 2025",
      techStack: ["Stramlit", "Python", "PDF Processing"],
      codeUrl: "https://github.com/hitghevariya/resumeroaster/blob/main/main.py",
      
    },
    {
      title: "Total Video Duration Calculator",
      description: "Total Video Duration Calculator is a Python script that scans a folder and calculates the combined playtime of all video files. It supports formats like .mp4, .mkv, and .avi and returns the total duration in hours, minutes, and seconds.",
      date: "April 2025",
      techStack: ["Python","moviepy"],
      codeUrl: "https://github.com/hitghevariya/Total-Video-Duration-Calculator/blob/master/main.py",
  
    },
    
  ]

  return (
    <section id="projects" className="py-20 relative scroll-mt-16">
      <SectionHeading title="Projects" subtitle="Some of my recent work" />

      <div className="grid md:grid-cols-2 gap-6">
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
            <ProjectCard
              title={project.title}
              description={project.description}
              date={project.date}
              techStack={project.techStack}
              codeUrl={project.codeUrl}
              imageSrc={project.imageSrc}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
