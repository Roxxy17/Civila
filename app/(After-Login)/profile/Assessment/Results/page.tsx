"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { TrendingUp, CheckCircle, ListChecks } from "lucide-react"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function AssessmentResultsPage() {
  const [results, setResults] = useState<any[]>([])
  const [selectedResult, setSelectedResult] = useState<any | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch("/api/Assesment/Result", { method: "GET" })
      if (res.ok) {
        const data = await res.json()
        setResults(data.results || [])
        // Jika ada query ?latest=true, langsung tampilkan hasil terbaru
        if (searchParams.get("latest") === "true" && data.results?.length) {
          setSelectedResult(data.results[data.results.length - 1])
        }
      }
    }
    fetchResults()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => setSelectedResult(null)

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-background to-accent/30 p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-5xl mx-auto">
        <FloatingCard className="p-8 shadow-2xl border border-primary/30">
          <h1 className="text-3xl font-bold mb-8 text-center">
            <GradientText>Riwayat Hasil Assessment</GradientText>
          </h1>
          {results.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <ListChecks className="mx-auto mb-4 w-10 h-10 text-primary/60" />
              Belum ada hasil assessment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((result: any, idx: number) => (
                <FloatingCard
                  key={idx}
                  className="cursor-pointer hover:shadow-xl transition-all border border-primary/20 bg-gradient-to-br from-background/80 to-accent/10"
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <span className="font-bold text-lg">Assessment #{idx + 1}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted-foreground text-sm">
                      Skor: <span className="font-bold">{result.overallScore}%</span>
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted-foreground text-sm">
                      Rekomendasi:{" "}
                      {result.recommendedCareers?.slice(0, 2).map((rec: string, i: number) => (
                        <span key={i} className="font-semibold text-primary">
                          {rec}
                          {i < result.recommendedCareers.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() => setSelectedResult(result)}
                  >
                    Detail
                  </Button>
                </FloatingCard>
              ))}
            </div>
          )}

          {/* Modal Detail */}
          {selectedResult && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="relative w-full max-w-3xl">
                <FloatingCard className="p-8 border border-primary/40 shadow-2xl bg-background">
                  <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    {/* Overall Score */}
                    <div className="flex-1 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 shadow">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Skor Keseluruhan</h3>
                        <div className="text-4xl font-bold gradient-text mb-4">{selectedResult.overallScore}%</div>
                        <p className="text-muted-foreground">
                          {selectedResult.breakdown && typeof selectedResult.breakdown === "object"
                            ? Object.values(selectedResult.breakdown).reduce((a: number, b: any) => a + (b || 0), 0)
                            : 0} jawaban benar
                        </p>
                      </div>
                    </div>
                    {/* Category Breakdown */}
                    <div className="flex-1 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 shadow">
                      <h3 className="text-xl font-semibold mb-4">Breakdown Kemampuan</h3>
                      <div className="space-y-4">
                        {selectedResult.breakdown &&
                          Object.entries(selectedResult.breakdown).map(
                            ([category, score]: [string, any]) => (
                              <div key={category}>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium">{category}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {score}
                                  </span>
                                </div>
                                <Progress
                                  value={typeof score === "number" ? score : 0}
                                  className="h-2"
                                />
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                  {/* Recommendations */}
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      <GradientText>Rekomendasi Karier</GradientText>
                    </h3>
                    <ul className="flex flex-wrap gap-4 justify-center mt-2">
                      {selectedResult.recommendedCareers?.map((rec: string, idx: number) => (
                        <li key={idx} className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold shadow">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary/80 transition"
                      onClick={handleClose}
                    >
                      Lihat Riwayat Assessment Lainnya
                    </Button>
                  </div>
                </FloatingCard>
              </div>
            </div>
          )}
        </FloatingCard>
      </div>
    </div>
  )
}