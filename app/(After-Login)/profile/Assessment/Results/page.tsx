"use client"

import { Suspense, useEffect, useState, useCallback, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { TrendingUp, CheckCircle, ListChecks, Calendar, Award, Target, Brain, ArrowLeft, Sparkles, BarChart3, User, Clock, Star, Trophy, Zap, ChevronRight, Download, Share2, Filter, Search } from "lucide-react"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function CareerPickButton({ careerName, assessmentResultId }: { careerName: string, assessmentResultId: string }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handlePick = async () => {
    setLoading(true)
    setError("")
    setSuccess(false)
    console.log("careerName:", careerName, "assessmentResultId:", assessmentResultId);
    try {
      const res = await fetch("/api/CareerRecommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerName,
          assessmentResultId
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
      } else {
        setError(data.error || "Gagal memilih karier")
      }
    } catch (err) {
      setError("Gagal memilih karier")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors group flex items-center gap-4">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md">
        <User className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <span className="font-semibold text-foreground text-sm">{careerName}</span>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3 h-3 text-yellow-500" />
          <span className="text-xs text-muted-foreground">Rekomendasi tinggi</span>
        </div>
        {success && (
          <span className="text-xs text-green-600 block mt-1">Karier berhasil dipilih!</span>
        )}
        {error && (
          <span className="text-xs text-red-600 block mt-1">{error}</span>
        )}
      </div>
      <Button
        size="sm"
        className="ml-2"
        disabled={loading || success}
        onClick={handlePick}
      >
        {loading ? "Memproses..." : success ? "Dipilih" : "Pilih Karier"}
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  )
}

// Debounce hook untuk search
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

function ResultsContent() {
  const [results, setResults] = useState<any[]>([])
  const [filteredResults, setFilteredResults] = useState<any[]>([])
  const [selectedResult, setSelectedResult] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterScore, setFilterScore] = useState("all")
  const searchParams = useSearchParams()
  const router = useRouter()

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch results
  useEffect(() => {
    if (!mounted) return

    const fetchResults = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/Assesment/Result", { method: "GET" })
        if (res.ok) {
          const data = await res.json()
          const resultData = data.results || []
          setResults(resultData)
          setFilteredResults(resultData)

          if (searchParams?.get("latest") === "true" && resultData.length) {
            setSelectedResult(resultData[resultData.length - 1])
          }
        }
      } catch (error) {
        console.error("Error fetching results:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [mounted, searchParams])

  // Memoized filter functions
  const scoreFilterFunctions = useMemo(() => ({
    excellent: (score: number) => score >= 90,
    good: (score: number) => score >= 70 && score < 90,
    average: (score: number) => score >= 50 && score < 70,
    poor: (score: number) => score < 50,
  }), [])

  // Filter and search with useMemo for performance
  useEffect(() => {
    let filtered = results

    // Filter by score
    if (filterScore !== "all" && scoreFilterFunctions[filterScore as keyof typeof scoreFilterFunctions]) {
      const filterFn = scoreFilterFunctions[filterScore as keyof typeof scoreFilterFunctions]
      filtered = filtered.filter(result => filterFn(result.overallScore || 0))
    }

    // Search by career recommendations (debounced)
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase()
      filtered = filtered.filter(result =>
        result.recommendedCareers?.some((career: string) =>
          career.toLowerCase().includes(searchLower)
        )
      )
    }

    setFilteredResults(filtered)
  }, [results, debouncedSearchTerm, filterScore, scoreFilterFunctions])

  // Memoized utility functions
  const getScoreColor = useCallback((score: number) => {
    if (score >= 90) return "text-emerald-500"
    if (score >= 80) return "text-green-500"
    if (score >= 70) return "text-blue-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 50) return "text-orange-500"
    return "text-red-500"
  }, [])

  const getScoreGradient = useCallback((score: number) => {
    if (score >= 90) return "from-emerald-500 to-emerald-600"
    if (score >= 80) return "from-green-500 to-green-600"
    if (score >= 70) return "from-blue-500 to-blue-600"
    if (score >= 60) return "from-yellow-500 to-yellow-600"
    if (score >= 50) return "from-orange-500 to-orange-600"
    return "from-red-500 to-red-600"
  }, [])

  const getScoreLabel = useCallback((score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 80) return "Very Good"
    if (score >= 70) return "Good"
    if (score >= 60) return "Average"
    if (score >= 50) return "Below Average"
    return "Needs Improvement"
  }, [])

  const getScoreBadgeVariant = useCallback((score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }, [])

  // Event handlers
  const handleClose = useCallback(() => setSelectedResult(null), [])

  const handleCardClick = useCallback((result: any) => {
    setSelectedResult(result)
  }, [])

  const handleDetailClick = useCallback((e: React.MouseEvent, result: any) => {
    e.stopPropagation()
    setSelectedResult(result)
  }, [])

  const handleResetFilter = useCallback(() => {
    setSearchTerm("")
    setFilterScore("all")
  }, [])

  const handleBackToDashboard = useCallback(() => {
    router.push("/dashboard")
  }, [router])

  const handleNewAssessment = useCallback(() => {
    router.push("/profile/setup")
  }, [router])

  // Memoized date functions
  const formatDate = useCallback((dateString: string | undefined) => {
    if (!dateString) return new Date().toLocaleDateString('id-ID')
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    } catch {
      return new Date().toLocaleDateString('id-ID')
    }
  }, [])

  const getTimeAgo = useCallback((dateString: string | undefined) => {
    if (!dateString) return "Baru saja"
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

      if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam lalu`
      return `${Math.floor(diffInMinutes / 1440)} hari lalu`
    } catch {
      return "Baru saja"
    }
  }, [])

  // Memoized stats
  const stats = useMemo(() => {
    const totalAssessments = results.length
    const averageScore = totalAssessments > 0
      ? Math.round(results.reduce((acc, r) => acc + (r.overallScore || 0), 0) / totalAssessments)
      : 0

    return { totalAssessments, averageScore }
  }, [results])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-foreground font-medium">Memuat halaman...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <FloatingCard className="bg-card border-border shadow-lg">
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto">
              <BarChart3 className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">
                <GradientText>Memuat Hasil...</GradientText>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Mengambil data hasil assessment Anda
              </p>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
            </div>
          </div>
        </FloatingCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            <GradientText>Hasil Assessment Karier</GradientText>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Lihat riwayat dan analisis mendalam dari setiap assessment yang telah Anda selesaikan.
            Temukan insight berharga untuk perkembangan karier Anda.
          </p>
        </div>

        {/* Navigation & Stats */}
        <FloatingCard className="bg-card border-border shadow-lg mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              {/* Left: Navigation */}
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleBackToDashboard}
                  className="border-border hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>

                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Assessment Results</span>
                </div>
              </div>

              {/* Right: Stats */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.totalAssessments}</div>
                  <div className="text-xs text-muted-foreground">Total Assessment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.averageScore}%</div>
                  <div className="text-xs text-muted-foreground">Rata-rata Skor</div>
                </div>
                <Badge variant="outline" className="px-4 py-2 bg-primary/10 border-primary/30 text-primary font-semibold">
                  <Trophy className="w-4 h-4 mr-1" />
                  {filteredResults.length} Hasil
                </Badge>
              </div>
            </div>
          </div>
        </FloatingCard>

        {/* Search & Filter Section */}
        {results.length > 0 && (
          <FloatingCard className="bg-card border-border shadow-lg mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                  <Input
                    placeholder="Cari berdasarkan rekomendasi karier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border focus:border-primary"
                  />
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={filterScore} onValueChange={setFilterScore}>
                    <SelectTrigger className="w-48 bg-background border-border">
                      <SelectValue placeholder="Filter by score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Skor</SelectItem>
                      <SelectItem value="excellent">Excellent (90-100%)</SelectItem>
                      <SelectItem value="good">Good (70-89%)</SelectItem>
                      <SelectItem value="average">Average (50-69%)</SelectItem>
                      <SelectItem value="poor">Poor (&lt;50%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Info */}
              {(searchTerm || filterScore !== "all") && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Menampilkan {filteredResults.length} dari {results.length} hasil
                  </span>
                  {searchTerm && (
                    <Badge variant="secondary" className="text-xs">
                      Pencarian: "{searchTerm}"
                    </Badge>
                  )}
                  {filterScore !== "all" && (
                    <Badge variant="secondary" className="text-xs">
                      Filter: {filterScore}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </FloatingCard>
        )}

        {/* Results Content */}
        {filteredResults.length === 0 && results.length > 0 ? (
          // No filtered results
          <FloatingCard className="bg-card border-border shadow-lg">
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Tidak Ada Hasil</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Tidak ditemukan assessment yang sesuai dengan kriteria pencarian atau filter Anda.
              </p>
              <Button
                variant="outline"
                onClick={handleResetFilter}
                className="border-border hover:bg-muted"
              >
                Reset Filter
              </Button>
            </div>
          </FloatingCard>
        ) : results.length === 0 ? (
          // No results at all
          <FloatingCard className="bg-card border-border shadow-lg">
            <div className="p-16 text-center">
              <div className="w-32 h-32 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-8">
                <ListChecks className="w-16 h-16 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Belum Ada Assessment</h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Anda belum memiliki hasil assessment. Mulai assessment pertama Anda untuk mendapatkan
                rekomendasi karier yang akurat dan insight berharga.
              </p>
              <Button
                size="lg"
                onClick={handleNewAssessment}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg px-8 py-3"
              >
                <Brain className="w-5 h-5 mr-2" />
                Mulai Assessment Pertama
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </FloatingCard>
        ) : (
          // Results Grid
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {filteredResults.map((result: any, idx: number) => {
              const score = result.overallScore || 0
              const careers = result.recommendedCareers || []

              return (
                <FloatingCard
                  key={`result-${idx}-${result._id || result.id || idx}`}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border-border bg-card hover:bg-accent/5 group"
                  onClick={() => handleCardClick(result)}
                >
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getScoreGradient(score)} rounded-xl flex items-center justify-center shadow-md`}>
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                            Assessment #{idx + 1}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{getTimeAgo(result.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className={`text-xl font-bold ${getScoreColor(score)}`}>
                          {score}%
                        </div>
                        <Badge variant={getScoreBadgeVariant(score)} className="text-xs px-2">
                          {getScoreLabel(score)}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Progress</span>
                        <span className="font-semibold text-foreground">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>

                    {/* Top Recommendations */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Target className="w-4 h-4 text-primary" />
                        <span>Rekomendasi Karier:</span>
                      </div>
                      <div className="space-y-2">
                        {careers.slice(0, 2).map((rec: string, i: number) => (
                          <div key={`career-${i}-${rec}`} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                            <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-foreground truncate">{rec}</span>
                          </div>
                        ))}
                        {careers.length > 2 && (
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10">
                            <Zap className="w-3 h-3 text-primary" />
                            <span className="text-sm font-medium text-primary">
                              +{careers.length - 2} karier lainnya
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Date & Action */}
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(result.createdAt)}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary hover:bg-primary/10 transition-colors px-3 pointer-events-auto"
                          onClick={(e) => handleDetailClick(e, result)}
                        >
                          Lihat Detail
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              )
            })}
          </div>
        )}

        {/* Quick Actions */}
        {results.length > 0 && (
          <FloatingCard className="bg-card border-border shadow-lg">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Siap untuk Assessment Berikutnya?</h3>
                  <p className="text-sm text-muted-foreground">
                    Lakukan assessment baru untuk insight karier yang lebih mendalam
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={handleNewAssessment}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Assessment Baru
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </FloatingCard>
        )}
      </div>

      {/* Optimized Modal Detail */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />

          <div className="relative z-10 w-full max-w-4xl pointer-events-auto">
            <FloatingCard className="bg-card border-border shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="text-center relative">
                  <div className="absolute top-0 right-0 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border hover:bg-muted"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border hover:bg-muted"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className={`w-24 h-24 bg-gradient-to-br ${getScoreGradient(selectedResult.overallScore || 0)} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3 text-foreground">
                    <GradientText>Hasil Assessment Anda</GradientText>
                  </h2>
                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedResult.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Selesai dalam 15 menit</span>
                    </div>
                    <Badge variant="outline" className="px-3 py-1">
                      {getScoreLabel(selectedResult.overallScore || 0)}
                    </Badge>
                  </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Overall Score */}
                  <FloatingCard className="bg-primary/5 border-primary/20">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Skor Keseluruhan</h3>
                      <div className="text-3xl font-bold text-primary mb-2">{selectedResult.overallScore || 0}%</div>
                      <p className="text-sm text-muted-foreground">Assessment karier lengkap</p>
                      <div className="mt-3">
                        <Progress value={selectedResult.overallScore || 0} className="h-2" />
                      </div>
                    </div>
                  </FloatingCard>

                  {/* Categories */}
                  <FloatingCard className="bg-green-500/5 border-green-500/20">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Kategori Dinilai</h3>
                      <div className="text-3xl font-bold text-green-500 mb-2">
                        {selectedResult.breakdown ? Object.keys(selectedResult.breakdown).length : 0}
                      </div>
                      <p className="text-sm text-muted-foreground">Area kompetensi</p>
                    </div>
                  </FloatingCard>

                  {/* Recommendations */}
                  <FloatingCard className="bg-yellow-500/5 border-yellow-500/20">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Rekomendasi</h3>
                      <div className="text-3xl font-bold text-yellow-500 mb-2">
                        {selectedResult.recommendedCareers?.length || 0}
                      </div>
                      <p className="text-sm text-muted-foreground">Karier yang cocok</p>
                    </div>
                  </FloatingCard>
                </div>

                {/* Category Breakdown */}
                {selectedResult.breakdown && (
                  <FloatingCard className="bg-muted/20 border-border">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Breakdown Kemampuan
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(selectedResult.breakdown).map(
                          ([category, score]: [string, any]) => {
                            const numScore = typeof score === "number" ? score : 0
                            return (
                              <div key={category} className="space-y-3 p-4 rounded-xl bg-background border-border">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-foreground">{category}</span>
                                  <Badge variant="outline" className={`${getScoreColor(numScore)}`}>
                                    {numScore}%
                                  </Badge>
                                </div>
                                <Progress value={numScore} className="h-3" />
                                <div className="text-xs text-muted-foreground">
                                  {getScoreLabel(numScore)}
                                </div>
                              </div>
                            )
                          }
                        )}
                      </div>
                    </div>
                  </FloatingCard>
                )}

                {/* Recommendations */}
                {selectedResult.recommendedCareers && selectedResult.recommendedCareers.length > 0 && (
                  <FloatingCard className="bg-primary/5 border-primary/20">
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">
                          <GradientText>Rekomendasi Karier untuk Anda</GradientText>
                        </h3>
                        <p className="text-muted-foreground text-sm mt-2 max-w-2xl mx-auto">
                          Berdasarkan analisis mendalam terhadap jawaban assessment Anda
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedResult.recommendedCareers.map((rec: string, idx: number) => (
                          <CareerPickButton
                            key={`recommendation-${idx}-${rec}`}
                            careerName={rec}
                            assessmentResultId={selectedResult.parentId} // pastikan ini _id dokumen utama!
                          />
                        ))}
                      </div>
                    </div>
                  </FloatingCard>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border hover:bg-muted px-8"
                    onClick={handleClose}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Riwayat
                  </Button>

                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg px-8"
                    onClick={handleNewAssessment}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Assessment Baru
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AssessmentResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-foreground font-medium">Memuat hasil assessment...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}