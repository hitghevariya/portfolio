"use client"

import { useState, useEffect } from "react"
import SectionHeading from "@/components/ui/section-heading"
import AchievementCard from "@/components/ui/achievement-card"
import { cn } from "@/lib/utils"

export default function Achievements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const achievements = [
    {
      icon: "🏆",
      title: "Published Research Paper in AIDE confernce",
      description: "Paper is about High-Precision Gender Classification ",
    },
    {
      icon: "🏆",
      title: "Cleared GATE-2025",
      description: "Cleared GATE with 400 score",
    },
  ]

  return (
    <section id="achievements" className="py-20 relative scroll-mt-16">
      <SectionHeading title="Achievements" subtitle="Recognition and accomplishments" />

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={cn(
              "opacity-0 transform translate-y-8 transition-all duration-700",
              mounted && "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 150}ms` : "0ms",
            }}
          >
            <AchievementCard icon={achievement.icon} title={achievement.title} description={achievement.description} />
          </div>
        ))}
      </div>
    </section>
  )
}
