"use client"

import { useState, useEffect } from "react"
import { Settings, Zap, ZapOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PerformanceSettings {
  reducedMotion: boolean
  lightweightAnimations: boolean
  disableParticles: boolean
}

export function PerformanceToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<PerformanceSettings>({
    reducedMotion: false,
    lightweightAnimations: false,
    disableParticles: false,
  })

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("performanceSettings")
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  // Save settings to localStorage and apply
  const updateSettings = (newSettings: PerformanceSettings) => {
    setSettings(newSettings)
    localStorage.setItem("performanceSettings", JSON.stringify(newSettings))

    // Apply CSS classes for reduced motion
    if (newSettings.reducedMotion) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }

    // Dispatch custom event for other components to listen
    window.dispatchEvent(
      new CustomEvent("performanceSettingsChanged", {
        detail: newSettings,
      }),
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="bg-gray-900/80 backdrop-blur-sm border-gray-700 text-gray-300 hover:text-teal-400"
      >
        {settings.lightweightAnimations ? <ZapOff size={16} /> : <Zap size={16} />}
      </Button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 min-w-[250px]">
          <h3 className="text-sm font-medium text-gray-200 mb-3 flex items-center gap-2">
            <Settings size={16} />
            Performance Settings
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) =>
                  updateSettings({
                    ...settings,
                    reducedMotion: e.target.checked,
                  })
                }
                className="rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500"
              />
              Reduce Motion
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={settings.lightweightAnimations}
                onChange={(e) =>
                  updateSettings({
                    ...settings,
                    lightweightAnimations: e.target.checked,
                  })
                }
                className="rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500"
              />
              Lightweight Animations
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={settings.disableParticles}
                onChange={(e) =>
                  updateSettings({
                    ...settings,
                    disableParticles: e.target.checked,
                  })
                }
                className="rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500"
              />
              Disable Particles
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
