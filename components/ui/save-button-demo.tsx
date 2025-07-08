"use client"

import { SaveButton } from "@/components/ui/save-button"

export function SaveButtonDemo() {
  const handleCustomSave = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Portfolio data saved!")
  }

  return (
    <div className="flex flex-col gap-6 items-center p-8">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">SaveButton Demo</h2>

      <div className="grid gap-4">
        <SaveButton
          text={{
            idle: "Save me, please!",
            saving: "Working on it...",
            saved: "Saved! Woohoo!",
          }}
        />

        <SaveButton
          text={{
            idle: "Save Portfolio",
            saving: "Saving changes...",
            saved: "Portfolio Saved!",
          }}
          onSave={handleCustomSave}
        />

        <SaveButton
          text={{
            idle: "Quick Save",
            saving: "Processing...",
            saved: "Done!",
          }}
          className="bg-teal-600 hover:bg-teal-700"
        />
      </div>
    </div>
  )
}
