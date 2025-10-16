"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { 
  Brain, Search, Target, TrendingUp, Clock, Star, ArrowRight, 
  Sparkles, Filter, Grid3X3, List, Eye, Users, Award, Zap,
  ChevronDown, SortAsc, MapPin, BookOpen, BarChart3, AlertCircle,
  Map, Info
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { CareerRoadmapModal } from "@/components/career-roadmap-modal"
import { Sidebar } from "@/components/sidebar"

export default function CareerMapperPage() {
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null)
  const [showTrendingOnly, setShowTrendingOnly] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) setUser(JSON.parse(userData))

    async function fetchRecommendations() {
      try {
        setError(null)
        const res = await fetch("/api/CareerRecommendation")
        if (res.ok) {
          const data = await res.json()
          setRecommendations(data.recommendations || [])
        } else {
          throw new Error('Failed to fetch recommendations')
        }
      } catch (err) {
        setError("Gagal memuat rekomendasi karier. Silakan coba lagi.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRecommendations()
  }, [])

  // Mapping API ke struktur UI yang diperlukan
  const mappedCareers = recommendations.map((rec) => ({
    id: rec._id,
    name: rec.careerName,
    description: `Karier ${rec.careerName} yang disesuaikan dengan profil dan kemampuan Anda berdasarkan hasil assessment.`,
    salary: rec.salaryRange,
    growth: rec.growthRate,
    skills: rec.requiredSkills || [],
    timeToMaster: rec.estimatedLearningTime,
    difficulty: rec.level === "Junior" ? "Beginner" : rec.level === "Mid" ? "Intermediate" : rec.level === "Senior" ? "Advanced" : "Beginner",
    trending: false,
    category: "AI Recommended",
    demandLevel: "Personalized",
    level: rec.level,
    createdAt: rec.createdAt,
    raw: rec,
  }))

  // Filter logic menggunakan data dari API
  const filteredCareers = mappedCareers.filter((career) => {
    const matchesSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = !filterDifficulty || career.difficulty === filterDifficulty
    const matchesTrending = !showTrendingOnly || career.trending
    return matchesSearch && matchesDifficulty && matchesTrending
  })

  // Handlers
  const handleCareerRoadmap = (careerName: string) => {
    router.push(`/career-mapper/roadmap?career=${encodeURIComponent(careerName)}`)
  }

  const handleCareerDetail = (careerName: string) => {
    setSelectedCareer(careerName)
    setShowDetail(true)
    setShowRoadmap(false)
  }

  const handleViewLearningPath = (careerName: string) => {
    // Redirect ke learning path page dengan career parameter
    router.push(`/learning-path?career=${encodeURIComponent(careerName)}`)
  }

  const getCareerByName = (name: string) => {
    return mappedCareers.find((c) => c.name === name)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
      case "Intermediate":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20"
      case "Advanced":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technology":
        return <Brain className="w-4 h-4" />
      case "Design":
        return <Target className="w-4 h-4" />
      case "Business":
        return <BarChart3 className="w-4 h-4" />
      case "Marketing":
        return <TrendingUp className="w-4 h-4" />
      case "AI Recommended":
        return <Sparkles className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High":
        return "text-emerald-500"
      case "Medium":
        return "text-amber-500"
      case "Personalized":
        return "text-purple-500"
      default:
        return "text-muted-foreground"
    }
  }

  // Retry function
  const handleRetry = () => {
    setLoading(true)
    setError(null)
    window.location.reload()
  }

  return (
    <AuthGuard>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">
                      AI <GradientText>Career Mapper</GradientText>
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Rekomendasi karier berdasarkan kemampuan dan minat Anda
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    disabled={loading}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    disabled={loading}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Enhanced Search & Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari karier yang diminati..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11"
                    disabled={loading}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filterDifficulty === "Beginner" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterDifficulty(filterDifficulty === "Beginner" ? null : "Beginner")}
                    className="h-11"
                    disabled={loading}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Beginner
                  </Button>
                  <Button
                    variant={filterDifficulty === "Intermediate" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterDifficulty(filterDifficulty === "Intermediate" ? null : "Intermediate")}
                    className="h-11"
                    disabled={loading}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Intermediate
                  </Button>
                  <Button
                    variant={filterDifficulty === "Advanced" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterDifficulty(filterDifficulty === "Advanced" ? null : "Advanced")}
                    className="h-11"
                    disabled={loading}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Advanced
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-6 py-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Memuat rekomendasi karier...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Terjadi Kesalahan</h3>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={handleRetry} className="mr-2">
                    Coba Lagi
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/assessment')}>
                    Ambil Assessment
                  </Button>
                </div>
              </div>
            ) : mappedCareers.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Belum Ada Rekomendasi Karier</h3>
                  <p className="text-muted-foreground mb-4">
                    Anda belum memiliki rekomendasi karier. Ikuti assessment terlebih dahulu untuk mendapatkan rekomendasi yang dipersonalisasi.
                  </p>
                  <Button onClick={() => router.push('/assessment')} className="mr-2">
                    <Target className="w-4 h-4 mr-2" />
                    Mulai Assessment
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/dashboard')}>
                    Kembali ke Dashboard
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* AI Recommended Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Rekomendasi AI untuk Anda</h2>
                      <p className="text-sm text-muted-foreground">
                        Berdasarkan hasil assessment dan profil Anda ({mappedCareers.length} karier)
                      </p>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/20">
                      Personalized
                    </Badge>
                  </div>
                  
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                  }>
                    {filteredCareers.map((career, index) => (
                      <CareerCard 
                        key={career.id}
                        career={career}
                        index={index}
                        viewMode={viewMode}
                        onViewDetail={() => handleCareerDetail(career.name)}
                        onViewRoadmap={() => handleCareerRoadmap(career.name)}
                        onViewLearningPath={() => handleViewLearningPath(career.name)}
                        getDifficultyColor={getDifficultyColor}
                        getCategoryIcon={getCategoryIcon}
                        getDemandColor={getDemandColor}
                        isAIRecommended={true}
                      />
                    ))}
                  </div>
                  
                  {filteredCareers.length === 0 && mappedCareers.length > 0 && (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Tidak ada karier ditemukan</h3>
                      <p className="text-muted-foreground">
                        Coba ubah filter atau kata kunci pencarian Anda
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchTerm("")
                          setFilterDifficulty(null)
                          setShowTrendingOnly(false)
                        }}
                        className="mt-4"
                      >
                        Reset Filter
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Career Roadmap Modal */}
      {selectedCareer && showRoadmap && (
        <CareerRoadmapModal
          isOpen={showRoadmap}
          onClose={() => {
            setShowRoadmap(false)
            setSelectedCareer(null)
          }}
          career={selectedCareer}
          careerData={getCareerByName(selectedCareer)}
        />
      )}

      {/* Career Detail Modal */}
      {selectedCareer && showDetail && (
        <CareerDetailModal
          isOpen={showDetail}
          onClose={() => {
            setShowDetail(false)
            setSelectedCareer(null)
          }}
          career={selectedCareer}
          careerData={getCareerByName(selectedCareer)}
          router={router}
        />
      )}
    </AuthGuard>
  )
}

// ...existing code...
// Komponen Career Detail Modal - ENHANCED dengan warna professional dan responsive
function CareerDetailModal({ isOpen, onClose, career, careerData, router }: any) {
  if (!isOpen || !careerData) return null

  const rawData = careerData.raw

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">{careerData.name}</h2>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg truncate">{rawData?.category} • {rawData?.level}</p>
                <div className="flex items-center gap-2 sm:gap-3 mt-2 flex-wrap">
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    AI Score: {rawData?.aiScore}%
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    {rawData?.marketDemand} Demand
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 ml-2"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-240px)] sm:max-h-[calc(95vh-260px)]">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Main Info */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8 pb-6">
              {/* Description */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                  Deskripsi Karier
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 sm:p-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    {rawData?.description || careerData.description}
                  </p>
                </div>
              </div>

              {/* Day in Life */}
              {rawData?.dayInLife && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    Hari Tipikal dalam Pekerjaan
                  </h3>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 sm:p-6 border border-emerald-200 dark:border-emerald-800">
                    <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed text-sm sm:text-base">
                      {rawData.dayInLife}
                    </p>
                  </div>
                </div>
              )}

              {/* Match Reasons */}
              {rawData?.matchReasons && rawData.matchReasons.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                    Mengapa Cocok untuk Anda
                  </h3>
                  <div className="space-y-3">
                    {rawData.matchReasons.map((reason: string, index: number) => (
                      <div key={index} className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 sm:p-4 border border-amber-200 dark:border-amber-800">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-amber-800 dark:text-amber-200 text-xs sm:text-sm leading-relaxed">
                            {reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Milestones */}
              {rawData?.learningMilestones && rawData.learningMilestones.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    Milestone Pembelajaran
                  </h3>
                  <div className="space-y-4">
                    {rawData.learningMilestones.map((milestone: any, index: number) => (
                      <div key={index} className="relative">
                        {/* Timeline line */}
                        {index < rawData.learningMilestones.length - 1 && (
                          <div className="absolute left-5 sm:left-6 top-12 sm:top-12 w-0.5 h-16 sm:h-20 bg-blue-200 dark:bg-blue-800"></div>
                        )}
                        
                        <div className="flex gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-xs sm:text-sm flex-shrink-0">
                            {milestone.month}M
                          </div>
                          <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4 border border-blue-200 dark:border-blue-800">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">
                              {milestone.achievement}
                            </h4>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {milestone.skills?.map((skill: string, skillIndex: number) => (
                                <Badge key={skillIndex} className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 border-blue-300 dark:border-blue-600 text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Path */}
              {rawData?.careerPath && rawData.careerPath.length > 0 && (
                <div className="">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    Jalur Karier
                  </h3>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 sm:p-6 border border-indigo-200 dark:border-indigo-800">
                    <div className="space-y-3 pb-2">
                      {rawData.careerPath.map((step: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-indigo-800 dark:text-indigo-200 font-medium text-sm sm:text-base break-words">
                              {step}
                            </span>
                          </div>
                          {index < rawData.careerPath.length - 1 && (
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Details & Stats */}
            <div className="space-y-4 sm:space-y-6">
              {/* Key Metrics */}
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                  Informasi Kunci
                </h3>
                <div className="space-y-3">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 sm:p-4 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">Rentang Gaji</span>
                    </div>
                    <span className="font-bold text-sm sm:text-lg text-emerald-600 break-words">{careerData.salary}</span>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">Pertumbuhan</span>
                    </div>
                    <span className="font-bold text-sm sm:text-lg text-blue-600">{careerData.growth}</span>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 sm:p-4 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300">Waktu Belajar</span>
                    </div>
                    <span className="font-bold text-sm sm:text-lg text-amber-600">{careerData.timeToMaster}</span>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 sm:p-4 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Tingkat Kesulitan</span>
                    </div>
                    <Badge className={careerData.difficulty === 'Beginner' ? 'bg-emerald-500 text-white' : 
                                   careerData.difficulty === 'Intermediate' ? 'bg-amber-500 text-white' : 
                                   'bg-red-500 text-white'}>
                      {rawData?.difficulty || careerData.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Work Types */}
              {rawData?.workType && rawData.workType.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                    Tipe Pekerjaan
                  </h3>
                  <div className="space-y-2">
                    {rawData.workType.map((type: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 sm:p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                        <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-teal-700 dark:text-teal-300">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Skills */}
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  Skills Diperlukan
                </h3>
                <div className="space-y-2">
                  {careerData.skills?.slice(0, 5).map((skill: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 sm:p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 break-words">{skill}</span>
                    </div>
                  ))}
                  {careerData.skills?.length > 5 && (
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        +{careerData.skills.length - 5} skills lainnya
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Soft Skills */}
              {rawData?.softSkills && rawData.softSkills.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
                    Soft Skills
                  </h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {rawData.softSkills.map((skill: string, index: number) => (
                      <Badge key={index} className="bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-200 border-rose-300 dark:border-rose-600 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {rawData?.tools && rawData.tools.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
                    Tools & Teknologi
                  </h3>
                  <div className="space-y-2">
                    {rawData.tools.slice(0, 5).map((tool: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800">
                        <div className="w-2 h-2 bg-violet-500 rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-violet-700 dark:text-violet-300 break-words">{tool}</span>
                      </div>
                    ))}
                    {rawData.tools.length > 5 && (
                      <div className="text-center">
                        <Badge variant="outline" className="text-xs">
                          +{rawData.tools.length - 5} tools lainnya
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* AI Recommendation Badge */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">Rekomendasi AI</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3">
                  Karier ini direkomendasikan khusus untuk Anda berdasarkan analisis AI mendalam terhadap profil dan kemampuan Anda.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-slate-500 to-slate-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${rawData?.aiScore || 0}%` }}
                    ></div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    {rawData?.aiScore || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50/98 to-white/98 dark:from-slate-800/98 dark:to-slate-900/98 backdrop-blur-md">
          <div className="p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button onClick={onClose} variant="outline" className="flex-1 text-sm sm:text-base">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Tutup
              </Button>
              <Button 
                onClick={() => {
                  onClose()
                  router.push(`/career-mapper/roadmap?career=${encodeURIComponent(careerData.name)}`)
                }}
                className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-sm sm:text-base"
              >
                <Map className="w-4 h-4 mr-2" />
                Lihat Learning Roadmap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Komponen terpisah untuk Career Card dengan 3 tombol
function CareerCard({ 
  career, 
  index, 
  viewMode, 
  onViewDetail,
  onViewRoadmap,
  onViewLearningPath,
  getDifficultyColor, 
  getCategoryIcon, 
  getDemandColor,
  isAIRecommended 
}: any) {
  if (viewMode === 'list') {
    return (
      <FloatingCard
        delay={0.1 + index * 0.05}
        className="transition-all duration-300 group hover:shadow-lg"
      >
        <div className="flex items-center gap-6 p-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg ${
            isAIRecommended 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
              : 'bg-gradient-to-br from-primary to-accent'
          }`}>
            {getCategoryIcon(career.category)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors truncate">
                {career.name}
              </h3>
              {career.trending && <Badge className="bg-orange-500/20 text-orange-600">🔥 Trending</Badge>}
              {isAIRecommended && <Badge className="bg-purple-500/20 text-purple-600">✨ AI</Badge>}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{career.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>💰 {career.salary}</span>
              <span>📈 {career.growth}</span>
              <span>⏱️ {career.timeToMaster}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge className={getDifficultyColor(career.difficulty)}>
              {career.difficulty}
            </Badge>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetail()
                }}
                className="text-xs"
              >
                <Info className="w-3 h-3 mr-1" />
                Detail
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onViewRoadmap()
                }}
                className="text-xs"
              >
                <Map className="w-3 h-3 mr-1" />
                Roadmap
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onViewLearningPath()
                }}
                className="text-xs"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Learning
              </Button>
            </div>
          </div>
        </div>
      </FloatingCard>
    )
  }

  return (
    <FloatingCard
      delay={0.1 + index * 0.05}
      className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
        <div className={`w-full h-full rounded-full ${
          isAIRecommended 
            ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
            : 'bg-gradient-to-br from-primary to-accent'
        } transform translate-x-8 -translate-y-8`} />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform ${
          isAIRecommended 
            ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
            : 'bg-gradient-to-br from-primary to-accent'
        }`}>
          {getCategoryIcon(career.category)}
        </div>
        <div className="flex gap-1">
          {career.trending && (
            <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/20 text-xs">
              🔥 Hot
            </Badge>
          )}
          {isAIRecommended && (
            <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/20 text-xs">
              ✨ AI
            </Badge>
          )}
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {career.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {career.description}
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Gaji</span>
          <span className="text-sm font-semibold">{career.salary}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Pertumbuhan</span>
          <span className="text-sm font-semibold text-emerald-600">{career.growth}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Waktu Belajar</span>
          <span className="text-sm font-semibold">{career.timeToMaster}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <p className="text-xs text-muted-foreground mb-2">Skills diperlukan:</p>
        <div className="flex flex-wrap gap-1">
          {career.skills?.slice(0, 3).map((skill: string) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {career.skills?.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{career.skills.length - 3}
            </Badge>
          )}
        </div>
      </div>

      {/* Footer with Level and Action Buttons */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge className={getDifficultyColor(career.difficulty)}>
            {career.difficulty}
          </Badge>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onViewDetail()
            }}
            className="text-xs"
          >
            <Info className="w-3 h-3 mr-1" />
            Lihat Detail
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onViewRoadmap()
            }}
            className="text-xs"
          >
            <Map className="w-3 h-3 mr-1" />
            Lihat Roadmap
          </Button>
        </div>
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onViewLearningPath()
          }}
          className="text-xs w-full"
          variant="outline"
        >
          <BookOpen className="w-3 h-3 mr-1" />
          Mulai Learning Path
        </Button>
      </div>
    </FloatingCard>
  )
}