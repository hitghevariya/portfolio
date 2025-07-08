"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

// Vector utility classes
class Vector2D {
  constructor(
    public x: number,
    public y: number,
  ) {}

  static random(min: number, max: number): number {
    return min + Math.random() * (max - min)
  }
}

class Vector3D {
  constructor(
    public x: number,
    public y: number,
    public z: number,
  ) {}

  static random(min: number, max: number): number {
    return min + Math.random() * (max - min)
  }
}

// Animation controller
class AnimationController {
  private timeline: gsap.core.Timeline
  private time = 0
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private dpr: number
  private size: number
  private stars: Star[] = []

  // Constants
  private readonly changeEventTime = 0.32
  private readonly cameraZ = -400
  private readonly cameraTravelDistance = 3400
  private readonly startDotYOffset = 28
  private readonly viewZoom = 100
  private readonly numberOfStars = 3000 // Reduced for better performance
  private readonly trailLength = 60 // Reduced trail length

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number, size: number) {
    this.canvas = canvas
    this.ctx = ctx
    this.dpr = dpr
    this.size = size
    this.timeline = gsap.timeline({ repeat: -1 })

    // Initialize
    this.setupRandomGenerator()
    this.createStars()
    this.setupTimeline()
  }

  // Setup random number generator
  private setupRandomGenerator() {
    const originalRandom = Math.random
    const customRandom = () => {
      let seed = 1234
      return () => {
        seed = (seed * 9301 + 49297) % 233280
        return seed / 233280
      }
    }

    Math.random = customRandom()
    this.createStars()
    Math.random = originalRandom
  }

  // Create stars
  private createStars() {
    for (let i = 0; i < this.numberOfStars; i++) {
      this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance))
    }
  }

  // Setup animation timeline
  private setupTimeline() {
    this.timeline.to(this, {
      time: 1,
      duration: 20, // Slower animation
      repeat: -1,
      ease: "none",
      onUpdate: () => this.render(),
    })
  }

  // Easing functions
  public ease(p: number, g: number): number {
    if (p < 0.5) return 0.5 * Math.pow(2 * p, g)
    else return 1 - 0.5 * Math.pow(2 * (1 - p), g)
  }

  // Elastic easing
  public easeOutElastic(x: number): number {
    const c4 = (2 * Math.PI) / 4.5
    if (x <= 0) return 0
    if (x >= 1) return 1
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1
  }

  // Map function
  public map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
  }

  // Constrain range
  public constrain(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }

  // Linear interpolation
  public lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t
  }

  // Spiral path
  public spiralPath(p: number): Vector2D {
    p = this.constrain(1.2 * p, 0, 1)
    p = this.ease(p, 1.8)
    const numberOfSpiralTurns = 4 // Reduced spiral turns
    const theta = 2 * Math.PI * numberOfSpiralTurns * Math.sqrt(p)
    const r = 120 * Math.sqrt(p) // Smaller radius

    return new Vector2D(r * Math.cos(theta), r * Math.sin(theta) + this.startDotYOffset)
  }

  // Rotation transform
  public rotate(v1: Vector2D, v2: Vector2D, p: number, orientation: boolean): Vector2D {
    const middle = new Vector2D((v1.x + v2.x) / 2, (v1.y + v2.y) / 2)

    const dx = v1.x - middle.x
    const dy = v1.y - middle.y
    const angle = Math.atan2(dy, dx)
    const o = orientation ? -1 : 1
    const r = Math.sqrt(dx * dx + dy * dy)

    // Elastic effect
    const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p)

    return new Vector2D(
      middle.x + r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
      middle.y + r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p)),
    )
  }

  // Project dot
  public showProjectedDot(position: Vector3D, sizeFactor: number) {
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
    const newCameraZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance

    if (position.z > newCameraZ) {
      const dotDepthFromCamera = position.z - newCameraZ

      // 3D -> 2D projection formula
      const x = (this.viewZoom * position.x) / dotDepthFromCamera
      const y = (this.viewZoom * position.y) / dotDepthFromCamera
      const sw = (300 * sizeFactor) / dotDepthFromCamera // Reduced size

      this.ctx.lineWidth = sw
      this.ctx.beginPath()
      this.ctx.arc(x, y, 0.5, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }

  // Draw start dot
  private drawStartDot() {
    if (this.time > this.changeEventTime) {
      const dy = (this.cameraZ * this.startDotYOffset) / this.viewZoom
      const position = new Vector3D(0, dy, this.cameraTravelDistance)
      this.showProjectedDot(position, 2.0)
    }
  }

  // Main render function
  public render() {
    const ctx = this.ctx
    if (!ctx) return

    // Use transparent background instead of black
    ctx.clearRect(0, 0, this.size, this.size)

    ctx.save()
    ctx.translate(this.size / 2, this.size / 2)

    // Calculate time parameters
    const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1)
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)

    // Rotate camera
    ctx.rotate(-Math.PI * this.ease(t2, 2.7) * 0.5) // Reduced rotation

    // Draw trail with teal color
    this.drawTrail(t1)

    // Draw stars with teal color
    ctx.fillStyle = "rgba(45, 212, 191, 0.8)" // Teal color with transparency
    for (const star of this.stars) {
      star.render(t1, this)
    }

    // Draw start dot
    this.drawStartDot()

    ctx.restore()
  }

  // Draw trail
  private drawTrail(t1: number) {
    for (let i = 0; i < this.trailLength; i++) {
      const f = this.map(i, 0, this.trailLength, 1.0, 0.1)
      const sw = (1.0 * (1 - t1) + 2.0 * Math.sin(Math.PI * t1)) * f

      // Use teal gradient for trail
      const alpha = f * 0.6
      this.ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`
      this.ctx.lineWidth = sw

      const pathTime = t1 - 0.0002 * i
      const position = this.spiralPath(pathTime)

      // Add rotation effect
      const basePos = position
      const offset = new Vector2D(position.x + 3, position.y + 3)
      const rotated = this.rotate(basePos, offset, Math.sin(this.time * Math.PI * 2) * 0.3 + 0.5, i % 2 === 0)

      this.ctx.beginPath()
      this.ctx.arc(rotated.x, rotated.y, sw / 2, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }

  // Pause animation
  public pause() {
    this.timeline.pause()
  }

  // Resume animation
  public resume() {
    this.timeline.play()
  }

  // Destroy animation
  public destroy() {
    this.timeline.kill()
  }
}

// Star class
class Star {
  private dx: number
  private dy: number
  private spiralLocation: number
  private strokeWeightFactor: number
  private z: number
  private angle: number
  private distance: number
  private rotationDirection: number
  private expansionRate: number
  private finalScale: number

  constructor(cameraZ: number, cameraTravelDistance: number) {
    this.angle = Math.random() * Math.PI * 2
    this.distance = 25 * Math.random() + 10 // Reduced distance
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1
    this.expansionRate = 1.0 + Math.random() * 0.5 // Reduced expansion
    this.finalScale = 0.5 + Math.random() * 0.4 // Smaller final scale

    this.dx = this.distance * Math.cos(this.angle)
    this.dy = this.distance * Math.sin(this.angle)

    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3
    this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ)

    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t
    this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation)
    this.strokeWeightFactor = Math.pow(Math.random(), 2.0) * 0.7 // Reduced size
  }

  render(p: number, controller: AnimationController) {
    const spiralPos = controller.spiralPath(this.spiralLocation)
    const q = p - this.spiralLocation

    if (q > 0) {
      const displacementProgress = controller.constrain(3 * q, 0, 1) // Reduced speed

      // Simplified easing
      const easing = controller.easeOutElastic(displacementProgress)

      // Calculate position offset with reduced movement
      const screenX = spiralPos.x + this.dx * easing * 0.7
      const screenY = spiralPos.y + this.dy * easing * 0.7

      // Convert 2D screen coordinates to 3D space coordinates
      const vx = ((this.z - controller["cameraZ"]) * screenX) / controller["viewZoom"]
      const vy = ((this.z - controller["cameraZ"]) * screenY) / controller["viewZoom"]

      const position = new Vector3D(vx, vy, this.z)

      // Smaller particle size
      const sizeMultiplier = 0.8 + displacementProgress * 0.4
      const dotSize = 4.0 * this.strokeWeightFactor * sizeMultiplier

      controller.showProjectedDot(position, dotSize)
    }
  }
}

interface SpiralAnimationProps {
  className?: string
  opacity?: number
}

export function SpiralAnimation({ className = "", opacity = 0.3 }: SpiralAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<AnimationController | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Handle window size changes
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Create and manage animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Handle DPR to solve blur issues
    const dpr = window.devicePixelRatio || 1
    const size = Math.max(dimensions.width, dimensions.height)

    canvas.width = size * dpr
    canvas.height = size * dpr

    // Set CSS dimensions
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`

    // Scale context to fit DPR
    ctx.scale(dpr, dpr)

    // Create animation controller
    animationRef.current = new AnimationController(canvas, ctx, dpr, size)

    return () => {
      // Cleanup animation
      if (animationRef.current) {
        animationRef.current.destroy()
        animationRef.current = null
      }
    }
  }, [dimensions])

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity }} />
    </div>
  )
}
