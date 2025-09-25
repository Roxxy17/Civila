"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { CheckCircle, LayoutDashboard, User, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface LoginSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginSuccessModal({ isOpen, onClose }: LoginSuccessModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()

  if (!isOpen) return null

  const handleChoice = (path: string) => {
    setIsClosing(true)
    setTimeout(() => {
      router.push(path)
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-card-foreground backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md transform transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <FloatingCard className="relative bg-card">
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-normal text-primary mb-2">
              Login Successful!
            </h2>
            <p className="text-secondary-foreground">Welcome back! Select your next step:</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => handleChoice("/dashboard")}
              className="w-full justify-start text-left h-auto p-4 rounded-3xl"
              variant="outline"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-secondary hover:text-background">Ke Dashboard</div>
                  <div className="text-sm text-secondary hover:text-background">Lihat progress dan rekomendasi karier</div>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleChoice("/profile/setup")}
              className="w-full justify-start text-left h-auto p-4 rounded-3xl"
              variant="outline"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Lengkapi Profil</div>
                  <div className="text-sm text-muted-foreground">Isi biodata dan ikuti tes kemampuan</div>
                </div>
              </div>
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">Kamu bisa mengubah pilihan ini kapan saja di pengaturan</p>
          </div>
        </FloatingCard>
      </div>
    </div>
  )
}
