"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { 
  CheckCircle2, ArrowLeft, Clock, Target, BookOpen, 
  Star, Award, TrendingUp, Users, Zap, Brain,
  AlertCircle, Calendar, PlayCircle, Download
} from "lucide-react"

export default function RoadmapPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const careerName = searchParams.get('career')
  
  const [careerData, setCareerData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  useEffect(() => {
    if (!careerName) {
      router.push('/career-mapper')
      return
    }

    async function fetchCareerData() {
      try {
        setError(null)
        const res = await fetch("/api/CareerRecommendation")
        if (res.ok) {
          const data = await res.json()
          const career = data.recommendations?.find((rec: any) => 
            rec.careerName === careerName
          )
          
          if (career) {
            setCareerData(career)
          } else {
            setError("Karier tidak ditemukan")
          }
        } else {
          throw new Error('Failed to fetch career data')
        }
      } catch (err) {
        setError("Gagal memuat data karier")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCareerData()
  }, [careerName, router])

  if (loading) {
    return (
      <AuthGuard>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar
            isExpanded={isSidebarExpanded}
            onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Memuat roadmap karier...</p>
            </div>
          </div>
        </div>
      </AuthGuard>
    )
  }

  if (error || !careerData) {
    return (
      <AuthGuard>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar
            isExpanded={isSidebarExpanded}
            onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Terjadi Kesalahan</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => router.push('/career-mapper')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Career Mapper
              </Button>
            </div>
          </div>
        </div>
      </AuthGuard>
    )
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
          <div className="sticky top-0 z-20 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push('/career-mapper')}
                    className="text-white hover:bg-white/20"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                  </Button>
                  <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">
                      Learning Roadmap: <GradientText className="text-white">{careerData.careerName}</GradientText>
                    </h1>
                    <p className="text-white/90 text-sm">
                      Panduan pembelajaran terstruktur untuk mencapai karier impian Anda
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {careerData.level}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {careerData.estimatedLearningTime}
                  </Badge>
                </div>
              </div>

              {/* Career Summary */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{careerData.salaryRange}</div>
                    <div className="text-white/70 text-sm">Rentang Gaji</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{careerData.growthRate}</div>
                    <div className="text-white/70 text-sm">Pertumbuhan Tahunan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{careerData.aiScore}%</div>
                    <div className="text-white/70 text-sm">AI Match Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-6 py-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            {careerData.learningMilestones && careerData.learningMilestones.length > 0 ? (
              <RoadmapTimeline learningMilestones={careerData.learningMilestones} />
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Roadmap Belum Tersedia</h3>
                <p className="text-muted-foreground">
                  Roadmap pembelajaran untuk karier ini sedang dalam pengembangan
                </p>
              </div>
            )}

            {/* Additional Info Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              {/* Required Skills */}
              {careerData.requiredSkills && careerData.requiredSkills.length > 0 && (
                <FloatingCard>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      Skills yang Diperlukan
                    </h3>
                    <div className="space-y-3">
                      {careerData.requiredSkills.map((skill: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                          <Star className="w-4 h-4 text-orange-500 flex-shrink-0" />
                          <span className="text-orange-700 dark:text-orange-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FloatingCard>
              )}

              {/* Soft Skills */}
              {careerData.softSkills && careerData.softSkills.length > 0 && (
                <FloatingCard>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-rose-500" />
                      Soft Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {careerData.softSkills.map((skill: string, index: number) => (
                        <Badge key={index} className="bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-200 border-rose-300 dark:border-rose-600">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FloatingCard>
              )}

              {/* Tools & Technologies */}
              {careerData.tools && careerData.tools.length > 0 && (
                <FloatingCard>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-violet-500" />
                      Tools & Teknologi
                    </h3>
                    <div className="space-y-2">
                      {careerData.tools.map((tool: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800">
                          <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                          <span className="text-violet-700 dark:text-violet-300 text-sm">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FloatingCard>
              )}

              {/* Career Path */}
              {careerData.careerPath && careerData.careerPath.length > 0 && (
                <FloatingCard>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-500" />
                      Jalur Karier
                    </h3>
                    <div className="space-y-3">
                      {careerData.careerPath.map((step: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-indigo-800 dark:text-indigo-200 font-medium">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FloatingCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

// Komponen Roadmap Timeline yang diperbaiki
function RoadmapTimeline({ learningMilestones }: { learningMilestones: any[] }) {
  const itemsPerRow = 2 // Sesuaikan untuk layout yang lebih baik
  const rows = []
  
  for (let i = 0; i < learningMilestones.length; i += itemsPerRow) {
    rows.push(learningMilestones.slice(i, i + itemsPerRow))
  }

  return (
    <div className="relative w-full py-8">
      {/* SVG Connection Lines */}
      <svg
        className="absolute top-0 left-0 w-full h-full z-0 opacity-30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="roadmapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path
          d={generateConnectionPath(rows.length, itemsPerRow)}
          stroke="url(#roadmapGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Milestone Cards */}
      <div className="relative z-10 space-y-16">
        {rows.map((row, rowIdx) => {
          const isEven = rowIdx % 2 === 0
          
          return (
            <div
              key={rowIdx}
              className={`grid gap-8 ${
                itemsPerRow === 1 
                  ? "grid-cols-1 max-w-2xl mx-auto" 
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {row.map((milestone, idx) => {
                const globalIndex = rowIdx * itemsPerRow + idx
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: globalIndex * 0.2,
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    className={`${isEven && idx === 1 ? 'md:mt-12' : ''} ${!isEven && idx === 0 ? 'md:mt-12' : ''}`}
                  >
                    <FloatingCard className="h-full hover:shadow-xl transition-all duration-300 group">
                      <div className="p-6">
                        {/* Milestone Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <span className="text-xl font-bold">{milestone.month}M</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                              {milestone.achievement}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Bulan ke-{milestone.month}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Skills to Learn */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-500" />
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300">
                              Skills yang Dipelajari:
                            </h4>
                          </div>
                          
                          <div className="grid gap-2">
                            {milestone.skills?.map((skill: string, skillIndex: number) => (
                              <motion.div
                                key={skillIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (globalIndex * 0.2) + (skillIndex * 0.1) }}
                                className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800 group-hover:border-blue-300 transition-colors"
                              >
                                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <span className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                                  {skill}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full group-hover:bg-blue-500 group-hover:text-white transition-colors"
                          >
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Mulai Pembelajaran
                          </Button>
                        </div>
                      </div>
                    </FloatingCard>
                  </motion.div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Helper function untuk generate connection path
function generateConnectionPath(rows: number, itemsPerRow: number) {
  if (rows <= 1) return ""
  
  const stepY = 320 // Sesuaikan dengan spacing antar row
  const startX = itemsPerRow === 1 ? 300 : 200
  const endX = itemsPerRow === 1 ? 300 : 600
  const startY = 120

  let path = `M ${startX} ${startY} `

  for (let r = 0; r < rows - 1; r++) {
    const currentY = startY + stepY * r
    const nextY = startY + stepY * (r + 1)
    const midY = currentY + (stepY / 2)

    if (r % 2 === 0) {
      // Even row: start from left, go to right of next row
      path += `L ${startX} ${midY} `
      path += `Q ${startX + 50} ${midY} ${startX + 100} ${midY + 50} `
      path += `Q ${endX - 100} ${nextY - 50} ${endX} ${nextY} `
    } else {
      // Odd row: start from right, go to left of next row  
      path += `L ${endX} ${midY} `
      path += `Q ${endX - 50} ${midY} ${endX - 100} ${midY + 50} `
      path += `Q ${startX + 100} ${nextY - 50} ${startX} ${nextY} `
    }
  }

  return path
}