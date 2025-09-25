"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EventInfoCard } from "@/components/EventInfoCard"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const res = await fetch("/api/auth/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    })
    const data = await res.json()
    setIsLoading(false)
    if (res.ok) {
      router.push("/login?registered=true")
    } else {
      alert(data.error)
    }
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

            <h1 className="text-3xl font-normal text-secondary mb-6">Sign Up</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <div className="relative flex items-center">
                  <div className="absolute left-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                    <User className="absolute w-5 h-5 text-secondary" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-15"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative flex items-center">
                  <div className="absolute left-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                    <Mail className="absolute w-5 h-5 text-secondary" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="youremail@email.com"
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

              <div className="space-y-2">
                <div className="relative flex items-center">
                  <div className="absolute left-1.5 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                    <Lock className="absolute w-5 h-5 text-secondary" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-15"
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

              <p className="text-xs text-gray-500">Please consume responsibly.</p>

              <Button type="submit" className="w-full mt-2 rounded-full h-10 text-lg" size="lg" disabled={isLoading}>
                {isLoading ? "Sign up..." : "Sign Up"}
              </Button>
            </form>
          </div>
        </div>

        {/* RIGHT CARD */}
        <EventInfoCard
          rightText="Already have an account?"
          rightButtonText="Login"
          onRightButtonClick={() => router.push("/login")}
        />
      </div>
    </div>
  )
}
