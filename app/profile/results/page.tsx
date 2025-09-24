"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, TrendingUp, BookOpen, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProfileResultsPage() {
  const [user, setUser] = useState<any>(null)
  const [results, setResults] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setResults(parsedUser.assessmentResults)
    }
  }, [])

  if (!results) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="relative z-20 p-6 border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Career Mapper</span>
            </div>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Kembali ke Dashboard
            </Button>
          </div>
        </nav>

        {/* Results Content */}
        <div className="relative z-10 px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Hasil <GradientText>Assessment</GradientText> Anda
              </h1>
              <p className="text-xl text-muted-foreground">
                Berikut adalah analisis kemampuan dan rekomendasi karier untuk Anda
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Overall Score */}
              <FloatingCard delay={0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Skor Keseluruhan</h3>
                  <div className="text-4xl font-bold gradient-text mb-4">{results.overallScore}%</div>
                  <p className="text-muted-foreground">
                    {results.correctAnswers} dari {results.totalQuestions} jawaban benar
                  </p>
                </div>
              </FloatingCard>

              {/* Category Breakdown */}
              <FloatingCard delay={0.4}>
                <h3 className="text-xl font-semibold mb-4">Breakdown Kemampuan</h3>
                <div className="space-y-4">
                  {Object.entries(results.categoryScores).map(([category, score]: [string, any]) => (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm text-muted-foreground">
                          {score.correct}/{score.total}
                        </span>
                      </div>
                      <Progress value={(score.correct / score.total) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>

            {/* Career Recommendations */}
            <FloatingCard delay={0.6} className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Rekomendasi Karier</h3>
                  <p className="text-muted-foreground">Berdasarkan hasil assessment Anda</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.recommendations.map((career: string, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                    onClick={() => router.push(`/career-mapper?career=${encodeURIComponent(career)}`)}
                  >
                    <h4 className="font-semibold mb-2">{career}</h4>
                    <p className="text-sm text-muted-foreground mb-3">Klik untuk melihat roadmap detail</p>
                    <div className="flex items-center text-primary text-sm">
                      <span>Lihat Roadmap</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            </FloatingCard>

            {/* Next Steps */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">
                Langkah <GradientText>Selanjutnya</GradientText>
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="pulse-glow" asChild>
                  <Link href="/career-mapper">
                    <Target className="w-5 h-5 mr-2" />
                    Jelajahi AI Career Mapper
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/learning-path">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Mulai Learning Path
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
