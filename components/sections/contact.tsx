"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Linkedin, Github, Send } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SaveButton } from "@/components/ui/save-button"
import { LinkPreview } from "@/components/ui/link-preview"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export default function Contact() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    // Show success message
    alert("Message sent successfully!")
  }

  const handleSaveContact = async () => {
    // Simulate saving contact information
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Contact information saved!")
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-teal-400" />,
      label: "Location",
      value: "Surat, Gujarat, 395006",
    },
    {
      icon: <Phone className="h-5 w-5 text-teal-400" />,
      label: "Phone",
      value: "+91 8140036379",
    },
    {
      icon: <Mail className="h-5 w-5 text-teal-400" />,
      label: "Email",
      value: "hitgha137@gmail.com",
    },
    {
      icon: <Linkedin className="h-5 w-5 text-teal-400" />,
      label: "LinkedIn",
      value: "linkedin.com/in/hit-ghevariya",
      link: "https://www.linkedin.com/in/hit-ghevariya-244973263/",
    },
    {
      icon: <Github className="h-5 w-5 text-teal-400" />,
      label: "GitHub",
      value: "github.com/hitghevariya",
      link: "https://github.com/hitghevariya",
    },
  ]

  return (
    <section id="contact" className="py-20 relative scroll-mt-16">
      <SectionHeading title="Contact Me" subtitle="Let's get in touch" />

      <div className="grid md:grid-cols-2 gap-10">
        <div
          className={cn(
            "space-y-6 opacity-0 transform -translate-x-8 transition-all duration-1000",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <div className="relative">
            <GlowingEffect
              spread={35}
              glow={true}
              disabled={false}
              proximity={85}
              inactiveZone={0.3}
              borderWidth={2}
              movementDuration={1.8}
            />
            <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">{info.icon}</div>
                    <div>
                      <h4 className="text-sm text-gray-400">{info.label}</h4>
                      {info.link ? (
                        <LinkPreview url={info.link} className="text-gray-300 hover:text-teal-400 transition-colors">
                          {info.value}
                        </LinkPreview>
                      ) : (
                        <p className="text-gray-300">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* SaveButton Demo */}
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <p className="text-sm text-gray-400 mb-3">Save my contact info:</p>
                <SaveButton
                  text={{
                    idle: "Save Contact",
                    saving: "Saving...",
                    saved: "Contact Saved!",
                  }}
                  onSave={handleSaveContact}
                />
              </div>
            </div>
          </div>

          {/* Social Links with Preview */}
          <div className="relative">
            <GlowingEffect
              spread={30}
              glow={true}
              disabled={false}
              proximity={75}
              inactiveZone={0.35}
              borderWidth={1.5}
              movementDuration={1.6}
            />
            <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Find me online</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-teal-400" />
                  <LinkPreview
                    url="https://github.com/hitghevariya"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    GitHub Profile
                  </LinkPreview>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-teal-400" />
                  <LinkPreview
                    url="https://www.linkedin.com/in/hit-ghevariya-244973263/"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    LinkedIn Profile
                  </LinkPreview>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "opacity-0 transform translate-x-8 transition-all duration-1000 delay-300",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <div className="relative">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={95}
              inactiveZone={0.25}
              borderWidth={2}
              movementDuration={2}
            />
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50"
            >
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Send Me a Message</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm text-gray-400 mb-1 block">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-teal-500 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-gray-400 mb-1 block">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-teal-500 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm text-gray-400 mb-1 block">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-teal-500 focus:ring-teal-500/20 min-h-[120px]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all duration-300"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Hit Ghevariya. All rights reserved.</p>
        <p className="mt-2">
          Built with{" "}
          <LinkPreview url="https://nextjs.org" className="hover:text-teal-400 transition-colors">
            Next.js
          </LinkPreview>
          ,{" "}
          <LinkPreview url="https://tailwindcss.com" className="hover:text-teal-400 transition-colors">
            Tailwind CSS
          </LinkPreview>
          , and{" "}
          <LinkPreview url="https://framer.com/motion" className="hover:text-teal-400 transition-colors">
            Framer Motion
          </LinkPreview>
        </p>
      </div>
    </section>
  )
}
