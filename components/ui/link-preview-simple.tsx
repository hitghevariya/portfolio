"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ExternalLink, Globe } from "lucide-react"

interface LinkPreviewSimpleProps {
  children: React.ReactNode
  url: string
  className?: string
  description?: string
}

export const LinkPreviewSimple = ({ children, url, className, description }: LinkPreviewSimpleProps) => {
  const [isOpen, setOpen] = React.useState(false)

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "")
    } catch {
      return url
    }
  }

  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return null
    }
  }

  return (
    <HoverCardPrimitive.Root
      openDelay={200}
      closeDelay={100}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <HoverCardPrimitive.Trigger asChild>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-teal-400 hover:text-teal-300 transition-colors duration-200 cursor-pointer underline decoration-teal-500/30 hover:decoration-teal-400/60 underline-offset-2 inline-flex items-center gap-1",
            className,
          )}
        >
          {children}
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content className="z-50" side="top" align="center" sideOffset={10}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                },
              }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 shadow-xl max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {getFavicon(url) ? (
                    <img
                      src={getFavicon(url)! || "/placeholder.svg"}
                      alt=""
                      className="w-6 h-6 rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                        e.currentTarget.nextElementSibling!.classList.remove("hidden")
                      }}
                    />
                  ) : null}
                  <Globe className="w-6 h-6 text-teal-400 hidden" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-200 text-sm truncate">{getDomain(url)}</div>
                  {description && <div className="text-xs text-gray-400 mt-1 line-clamp-2">{description}</div>}
                  <div className="text-xs text-teal-400 mt-1 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    Visit site
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  )
}
