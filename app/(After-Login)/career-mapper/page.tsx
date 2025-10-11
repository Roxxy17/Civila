"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Brain, Search, Target, TrendingUp, Clock, Star, ArrowRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { CareerRoadmapModal } from "@/components/career-roadmap-modal"

const mockCareerData = {
  "Data Scientist": {
    description: "Menganalisis data kompleks untuk menghasilkan insights bisnis yang berharga",
    salary: "Rp 15-35 juta/bulan",
    growth: "25% per tahun",
    skills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization"],
    timeToMaster: "12-18 bulan",
    difficulty: "Advanced",
    trending: true,
  },
  "Software Engineer": {
    description: "Mengembangkan aplikasi dan sistem software yang inovatif",
    salary: "Rp 12-30 juta/bulan",
    growth: "22% per tahun",
    skills: ["JavaScript", "React", "Node.js", "Database", "System Design"],
    timeToMaster: "8-12 bulan",
    difficulty: "Intermediate",
    trending: true,
  },
  "Product Manager": {
    description: "Memimpin pengembangan produk dari konsep hingga peluncuran",
    salary: "Rp 18-40 juta/bulan",
    growth: "19% per tahun",
    skills: ["Product Strategy", "Analytics", "User Research", "Agile", "Leadership"],
    timeToMaster: "6-10 bulan",
    difficulty: "Intermediate",
    trending: true,
  },
  "UI/UX Designer": {
    description: "Merancang pengalaman pengguna yang intuitif dan menarik",
    salary: "Rp 10-25 juta/bulan",
    growth: "13% per tahun",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
    timeToMaster: "6-9 bulan",
    difficulty: "Beginner",
    trending: false,
  },
  "Digital Marketing": {
    description: "Mengembangkan strategi pemasaran digital yang efektif",
    salary: "Rp 8-20 juta/bulan",
    growth: "16% per tahun",
    skills: ["SEO", "Social Media", "Google Ads", "Analytics", "Content Marketing"],
    timeToMaster: "4-6 bulan",
    difficulty: "Beginner",
    trending: false,
  },
  "Business Analyst": {
    description: "Menganalisis proses bisnis dan memberikan rekomendasi perbaikan",
    salary: "Rp 12-28 juta/bulan",
    growth: "14% per tahun",
    skills: ["Data Analysis", "Process Mapping", "Requirements Gathering", "SQL", "Business Intelligence"],
    timeToMaster: "6-8 bulan",
    difficulty: "Intermediate",
    trending: false,
  },
}

export default function CareerMapperPage() {
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null)
  const [showTrendingOnly, setShowTrendingOnly] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) setUser(JSON.parse(userData))

    async function fetchRecommendations() {
      try {
        const res = await fetch("/api/CareerRecommendation")
        if (res.ok) {
          const data = await res.json()
          setRecommendations(data.recommendations || [])
        }
      } finally {
        setLoading(false)
      }
    }
    fetchRecommendations()
  }, [])

  // Mapping API ke struktur UI
  const mappedCareers = recommendations.map((rec) => ({
    name: rec.careerName,
    description: "", // Tambahkan jika ada di API
    salary: rec.salaryRange,
    growth: rec.growthRate,
    skills: rec.requiredSkills,
    timeToMaster: rec.estimatedLearningTime,
    difficulty:
      rec.level === "Junior"
        ? "Beginner"
        : rec.level === "Mid"
        ? "Intermediate"
        : rec.level === "Senior"
        ? "Advanced"
        : "",
    trending: false,
    raw: rec,
  }))

  // Fallback ke mock jika belum ada data AI
  const allCareers =
    mappedCareers.length > 0
      ? mappedCareers
      : Object.entries(mockCareerData).map(([name, data]) => ({
          name,
          ...data,
        }))

  // Modal data
  const getCareerByName = (name: string) =>
    allCareers.find((c) => c.name === name) ||
    Object.entries(mockCareerData)
      .map(([n, d]) => ({ name: n, ...d }))
      .find((c) => c.name === name)

  // Filter logic
  const filteredCareers = allCareers.filter((career) => {
    const matchesSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = !filterDifficulty || career.difficulty === filterDifficulty
    const matchesTrending = !showTrendingOnly || career.trending
    return matchesSearch && matchesDifficulty && matchesTrending
  })

  const handleCareerClick = (careerName: string) => {
    setSelectedCareer(careerName)
    setShowRoadmap(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
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

        {/* Career Mapper Content */}
        <div className="relative z-10 px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                AI <GradientText>Career Mapper</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Temukan karier impian Anda dengan rekomendasi AI yang dipersonalisasi berdasarkan kemampuan dan minat
              </p>
            </div>

            {/* Loading */}
            {loading && (
              <div className="text-center py-12">Memuat rekomendasi karier...</div>
            )}

            {/* All Careers */}
            {!loading && (
              <>
                <div className="mb-8">
                  <FloatingCard delay={0.4}>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Cari karier yang diminati..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant={filterDifficulty === "Beginner" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterDifficulty(filterDifficulty === "Beginner" ? null : "Beginner")}
                        >
                          Beginner
                        </Button>
                        <Button
                          variant={filterDifficulty === "Intermediate" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterDifficulty(filterDifficulty === "Intermediate" ? null : "Intermediate")}
                        >
                          Intermediate
                        </Button>
                        <Button
                          variant={filterDifficulty === "Advanced" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterDifficulty(filterDifficulty === "Advanced" ? null : "Advanced")}
                        >
                          Advanced
                        </Button>
                        <Button
                          variant={showTrendingOnly ? "default" : "outline"}
                          size="sm"
                          onClick={() => setShowTrendingOnly(!showTrendingOnly)}
                        >
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Trending
                        </Button>
                      </div>
                    </div>
                  </FloatingCard>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCareers.map((career, index) => (
                    <FloatingCard
                      key={career.name}
                      delay={0.2 + index * 0.1}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleCareerClick(career.name)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">{career.name}</h3>
                        {career.trending && <Badge className="bg-orange-500/20 text-orange-400">Trending</Badge>}
                      </div>

                      <p className="text-muted-foreground mb-4">{career.description}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Gaji:</span>
                          <span className="font-medium">{career.salary}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Pertumbuhan:</span>
                          <span className="font-medium text-green-400">{career.growth}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Waktu Belajar:</span>
                          <span className="font-medium">{career.timeToMaster}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Skill yang dibutuhkan:</p>
                        <div className="flex flex-wrap gap-1">
                          {career.skills?.slice(0, 3).map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {career.skills?.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{career.skills.length - 3} lainnya
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={getDifficultyColor(career.difficulty)}>{career.difficulty}</Badge>
                        <div className="flex items-center text-primary">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">Lihat Roadmap</span>
                        </div>
                      </div>
                    </FloatingCard>
                  ))}
                </div>

                {filteredCareers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Tidak ada karier yang sesuai dengan filter Anda.</p>
                  </div>
                )}
              </>
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
