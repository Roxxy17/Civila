"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Brain, Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginSuccessModal } from "@/components/login-success-modal"
import { EventInfoCard } from "@/components/EventInfoCard"

const messages = [
  {
    title: "Growth",
    text: "Every small step today builds the stronger you tomorrow.",
  },
  {
    title: "Focus",
    text: "Discipline turns learning into power.",
  },
  {
    title: "Evolve",
    text: "Don’t chase perfection—chase progress, and growth will follow.",
  },
  {
    title: "Rise",
    text: "Every challenge you face is a chance to level up.",
  },
  {
    title: "Learn",
    text: "Knowledge isn’t just collected, it’s lived and applied.",
  },
]

export default function LoginPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length)
        setFade(true)
      }, 1500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { theme } = useTheme()

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setRegistrationSuccess(true)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userData,
        email: formData.email,
        isAuthenticated: true,
      }),
    )

    setIsLoading(false)
    setShowSuccessModal(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-cover bg-center"
      style={{
        backgroundImage:
          theme === "dark"
            ? "url('/bgdark.jpg')"
            : "url('/bglight.jpg')"
      }}
    >
      <div className="flex flex-col md:flex-row items-stretch gap-6 w-full max-w-4xl">
        {/* LEFT CARD */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="
          p-8
          bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
          border-r border-white/30
          rounded-3xl
          ">
            <div className="flex justify-between items-center mb-6">
              <img
                src={theme === "dark" ? "/civilafontDM.png" : "/civilafontLM.png"}
                alt="Civilafont Logo"
                className="w-[20%] h-auto transition-all"
              />
            </div>

            <h1 className="text-3xl font-normal text-secondary mb-6">Log in</h1>

            {registrationSuccess && (
              <div className="mb-6 p-4 bg-primary/30 border border-background rounded-3xl">
                <p className="text-popover-foreground text-sm text-center">
                  Pendaftaran berhasil! Silakan masuk dengan akun Anda.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <div className="relative flex items-center">
                  <div className="absolute left-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                    <Mail className="absolute w-5 h-5 text-secondary" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-15"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative flex items-center">
                  <div className="absolute left-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                    <Lock className="absolute w-5 h-5 text-secondary" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-15 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-800"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <p className="text-xs text-secondary-foreground">Please consume responsibly.</p>

              <Button type="submit" className="w-full mt-2 rounded-full h-10 text-lg" size="lg" disabled={isLoading}>
                {isLoading ? "Masuk..." : "Log in"}
              </Button>
            </form>
          </div>

          <div className="bg-popover text-background rounded-3xl p-8 mt-5">
            <h2
              className={`text-background text-2xl font-normal transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"
                }`}
            >
              {messages[currentIndex].title}
            </h2>
            <span
              className={`text-background text-sm font-normal block transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"
                }`}
            >
              {messages[currentIndex].text}
            </span>
          </div>
        </div>

        {/* RIGHT CARD */}
        <EventInfoCard
          rightText="Don't have an account yet?"
          rightButtonText="Sign Up"
          onRightButtonClick={() => router.push("/register")}
        />
      </div>

      <LoginSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  )
}
