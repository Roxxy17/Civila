"use client"

import { useState } from "react"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function GenerateAssessmentPage({ onComplete }: { onComplete?: () => void }) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleGenerate = async () => {
    setLoading(true)
    const res = await fetch("/api/Assesment/Question", { method: "POST" })
    setLoading(false)
    if (res.ok) {
      setIsCompleted(true)
      if (onComplete) onComplete() // Panggil handler setelah selesai
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-md">
        {!isCompleted ? (
          <FloatingCard className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              <GradientText>Generate Soal Assessment</GradientText>
            </h2>
            <p className="text-muted-foreground mb-4">
              Klik tombol di bawah untuk mulai generate soal assessment karier Anda.
            </p>
            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? "Memproses..." : "Generate Soal"}
            </Button>
          </FloatingCard>
        ) : (
          <FloatingCard className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              <GradientText>Soal Berhasil Digenerate!</GradientText>
            </h2>
            <p className="text-muted-foreground mb-4">Anda dapat mulai mengerjakan assessment sekarang.</p>
            <Button onClick={() => router.push("/profile/Assessment/Work")}>
              Mulai Kerjakan Assessment
            </Button>
          </FloatingCard>
        )}
      </div>
    </div>
  )
}