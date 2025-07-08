"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import React from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

type LinkPreviewProps = {
  children: React.ReactNode
  url: string
  className?: string
  width?: number
  height?: number
  quality?: number
} & ({ isStatic: true; imageSrc: string } | { isStatic?: false; imageSrc?: never })

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  const [isOpen, setOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)
  const translateX = useSpring(x, springConfig)

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetRect = event.currentTarget.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2
    x.set(offsetFromCenter)
  }

  // Generate preview URL using a more reliable service
  const getPreviewUrl = (targetUrl: string) => {
    if (isStatic) return imageSrc

    // Use multiple fallback services
    const services = [
      `https://api.urlbox.io/v1/ca482d7e-9417-4569-90fe-80f7c5e1c781/png?url=${encodeURIComponent(targetUrl)}&width=${width * 2}&height=${height * 2}&quality=${quality}`,
      `https://image.thum.io/get/width/${width * 2}/crop/${height * 2}/${encodeURIComponent(targetUrl)}`,
      `https://mini.s-shot.ru/${width}x${height}/PNG/?${encodeURIComponent(targetUrl)}`,
    ]

    return services[0] // Use first service as primary
  }

  const previewUrl = getPreviewUrl(url)

  return (
    <>
      {isMounted && (
        <div className="hidden">
          <img
            src={previewUrl || "/placeholder.svg"}
            width={width}
            height={height}
            alt="hidden preload"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>
      )}

      <HoverCardPrimitive.Root
        openDelay={300}
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
            onMouseMove={handleMouseMove}
            className={cn(
              "text-teal-400 hover:text-teal-300 transition-colors duration-200 cursor-pointer underline decoration-teal-500/30 hover:decoration-teal-400/60 underline-offset-2",
              className,
            )}
          >
            {children}
          </a>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-50"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="shadow-xl rounded-xl border border-gray-700/50 bg-gray-900/95 backdrop-blur-sm"
                style={{
                  x: translateX,
                }}
              >
                <div className="p-2">
                  {!imageError ? (
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        width={width}
                        height={height}
                        className="rounded-lg object-cover"
                        alt={`Preview of ${url}`}
                        onError={() => setImageError(true)}
                      />
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-teal-500/30 border-t-teal-400 rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex flex-col items-center justify-center text-gray-400 border border-gray-700/50"
                      style={{ width, height }}
                    >
                      <div className="text-2xl mb-2">🌐</div>
                      <div className="text-xs text-center px-2">
                        <div className="font-medium text-teal-400 mb-1">Link Preview</div>
                        <div className="text-gray-500 truncate max-w-[150px]">
                          {url.replace(/^https?:\/\//, "").split("/")[0]}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  )
}
