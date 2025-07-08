import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo"

export default function GlowingDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-teal-400">Glowing Effect Demo</h1>
        <GlowingEffectDemo />
      </div>
    </div>
  )
}
