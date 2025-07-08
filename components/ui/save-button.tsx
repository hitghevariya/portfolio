"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SaveButtonProps {
  text?: {
    idle?: string
    saving?: string
    saved?: string
  }
  className?: string
  onSave?: () => Promise<void> | void
}

export function SaveButton({
  text = {
    idle: "Save",
    saving: "Saving...",
    saved: "Saved!",
  },
  className,
  onSave,
}: SaveButtonProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")

  const handleSave = async () => {
    if (status === "idle") {
      setStatus("saving")
      try {
        if (onSave) {
          await onSave()
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1500))
        }
        setStatus("saved")
        setTimeout(() => {
          setStatus("idle")
        }, 2000)
      } catch (error) {
        setStatus("idle")
        console.error("Save failed:", error)
      }
    }
  }

  const getButtonStyles = () => {
    switch (status) {
      case "saving":
        return "bg-teal-500 text-white"
      case "saved":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-800 text-teal-400 border border-teal-500/30 hover:bg-gray-700"
    }
  }

  return (
    <motion.button
      onClick={handleSave}
      disabled={status !== "idle"}
      className={cn(
        "relative overflow-hidden rounded-full px-6 py-3 transition-all duration-300 font-medium",
        "hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] disabled:opacity-70",
        getButtonStyles(),
        className,
      )}
      style={{ minWidth: "150px" }}
      whileHover={status === "idle" ? { scale: 1.02 } : {}}
      whileTap={status === "idle" ? { scale: 0.98 } : {}}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          {status === "saving" && (
            <motion.span
              key="saving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.2 },
                rotate: { repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" },
              }}
            >
              <Loader2 className="w-4 h-4" />
            </motion.span>
          )}
          {status === "saved" && (
            <motion.span
              key="saved"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-4 h-4" />
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {status === "idle" ? text.idle : status === "saving" ? text.saving : text.saved}
        </motion.span>
      </span>
    </motion.button>
  )
}
