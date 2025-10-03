"use client"

import { useState } from "react"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { CheckCircle, Sparkles, Brain, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function GenerateAssessmentPage({ onComplete }: { onComplete?: () => void }) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/Assesment/Question", { method: "POST" })
      if (res.ok) {
        setIsCompleted(true)
        if (onComplete) onComplete()
      } else {
        throw new Error("Gagal generate soal")
      }
    } catch (error) {
      console.error("Error generating assessment:", error)
      alert("Gagal generate soal assessment. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Enhanced backdrop with correct pointer events */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md pointer-events-none" />
      
      {/* Modal content with proper z-index */}
      <div className="relative z-10 w-full max-w-lg pointer-events-auto">
        {!isCompleted ? (
          <FloatingCard className="bg-background/95 dark:bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl">
            <div className="p-8 text-center space-y-6">
              {/* Header Icon */}
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center pulse-glow shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-foreground">
                  Generate <GradientText>Assessment</GradientText>
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
                  Sistem akan menghasilkan soal assessment yang dipersonalisasi berdasarkan profil dan minat karier Anda
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 py-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Soal dipersonalisasi sesuai profil</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Analisis mendalam berbasis AI</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Rekomendasi karier yang akurat</span>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={handleGenerate} 
                disabled={loading}
                size="lg"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg pulse-glow btn-hover-lift transition-all duration-300 relative z-20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Assessment...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Soal Assessment
                  </>
                )}
              </Button>

              {loading && (
                <div className="space-y-3">
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full loading-shimmer"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mohon tunggu sebentar, sistem sedang memproses...
                  </p>
                </div>
              )}
            </div>
          </FloatingCard>
        ) : (
          <FloatingCard className="bg-background/95 dark:bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl">
            <div className="p-8 text-center space-y-6">
              {/* Success Icon with Animation */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 rounded-2xl flex items-center justify-center mx-auto pulse-glow shadow-lg animate-in zoom-in duration-500">
                  <CheckCircle className="w-10 h-10 text-white animate-in zoom-in duration-700 delay-200" />
                </div>
                
                {/* Success Particles Effect */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 border-2 border-green-400/30 rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-3 animate-in slide-in-from-bottom duration-500 delay-300">
                <h2 className="text-3xl font-bold text-foreground">
                  <GradientText>Assessment Siap!</GradientText>
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
                  Soal assessment telah berhasil digenerate! Anda dapat mulai mengerjakan sekarang untuk mendapatkan insight karier yang mendalam.
                </p>
              </div>

              {/* Next Steps Info */}
              <div className="bg-muted/30 dark:bg-muted/20 rounded-xl p-4 space-y-3 animate-in slide-in-from-bottom duration-500 delay-500">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Brain className="w-4 h-4 text-primary" />
                  <span>Yang Akan Anda Dapatkan:</span>
                </div>
                <div className="grid gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>Analisis kepribadian mendalam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>Rekomendasi karier yang tepat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>Roadmap pengembangan skill</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 animate-in slide-in-from-bottom duration-500 delay-700">
                <Button 
                  onClick={() => {
                    if (onComplete) onComplete()
                  }}
                  size="lg"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg pulse-glow btn-hover-lift relative z-20"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Mulai Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/dashboard")}
                  className="w-full text-sm border-border/50 hover:bg-muted/50 relative z-20"
                >
                  Kembali ke Dashboard
                </Button>
              </div>

              {/* Estimated time */}
              <p className="text-xs text-muted-foreground/70 animate-in fade-in duration-500 delay-1000">
                ⏱️ Estimasi waktu pengerjaan: 10-15 menit
              </p>
            </div>
          </FloatingCard>
        )}
      </div>
    </div>
  )
}