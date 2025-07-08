"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  date: string
  techStack: string[]
  demoUrl?: string
  codeUrl?: string
  imageSrc?: string
}

export default function ProjectCard({
  title,
  description,
  date,
  techStack,
  demoUrl,
  codeUrl,
  imageSrc,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden group transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      {imageSrc && (
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          width={800}
          height={500}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Card body */}
      <div className="p-6 flex flex-col h-full">
        <div>
          <h3 className="text-xl font-semibold text-gray-200 group-hover:text-teal-400 transition-colors">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>

        {/* Tech stack */}
        <ul className="flex flex-wrap gap-2 mt-4">
          {techStack.map((tech) => (
            <li key={tech} className="text-xs bg-gray-800/40 px-2 py-1 rounded-md text-teal-300">
              {tech}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-auto pt-6 flex items-center justify-between text-gray-400">
          <span className="text-xs">{date}</span>
          <div className="flex gap-4">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm hover:text-teal-300 transition-colors"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
            {codeUrl && (
              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm hover:text-teal-300 transition-colors"
              >
                <Github size={16} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div
        className={cn(
          "h-1 bg-gradient-to-r from-teal-500 to-teal-300 transition-all duration-500 transform origin-left",
          isHovered ? "scale-x-100" : "scale-x-0",
        )}
      />
    </div>
  )
}
