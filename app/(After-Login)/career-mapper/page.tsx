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
  ChevronDown, SortAsc, MapPin, BookOpen, BarChart3, AlertCircle
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { CareerRoadmapModal } from "@/components/career-roadmap-modal"
import { Sidebar } from "@/components/sidebar"

export default function CareerMapperPage() {
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const [showRoadmap, setShowRoadmap] = useState(false)
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
    trending: false, // Bisa ditambahkan logic trending berdasarkan data
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

  const handleCareerClick = (careerName: string) => {
    setSelectedCareer(careerName)
    setShowRoadmap(true)
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
                        onClick={() => handleCareerClick(career.name)}
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

      {selectedCareer && (
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
    </AuthGuard>
  )
}

// Komponen terpisah untuk Career Card
function CareerCard({ 
  career, 
  index, 
  viewMode, 
  onClick, 
  getDifficultyColor, 
  getCategoryIcon, 
  getDemandColor,
  isAIRecommended 
}: any) {
  if (viewMode === 'list') {
    return (
      <FloatingCard
        delay={0.1 + index * 0.05}
        className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
        onClick={onClick}
      >
        <div className="flex items-center gap-6 p-2">
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
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </FloatingCard>
    )
  }

  return (
    <FloatingCard
      delay={0.1 + index * 0.05}
      className="cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
      onClick={onClick}
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
      <div className="mb-4">
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

      {/* Footer */}
      <div className="flex items-center justify-between">
        <Badge className={getDifficultyColor(career.difficulty)}>
          {career.difficulty}
        </Badge>
        <div className="flex items-center text-primary text-sm font-medium">
          <Eye className="w-4 h-4 mr-1" />
          <span>Lihat Detail</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </FloatingCard>
  )
}