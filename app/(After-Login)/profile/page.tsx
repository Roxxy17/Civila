"use client"

import { useState, useEffect, useMemo } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Target, TrendingUp, BookOpen, ArrowRight, Calendar, 
  Award, Zap, Clock, Users, Star, BarChart3, Trophy,
  ChevronRight, Eye, Brain, Lightbulb, Rocket
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Cog, Palette, Shield, Code, Cpu } from "lucide-react"

export default function ProfileResultsPage() {
  const [progressData, setProgressData] = useState({
    overallProgress: 85,
    completedModules: 18,
    totalModules: 24,
    currentStreak: 12,
    longestStreak: 25,
    totalPoints: 3450,
    level: 4,
    nextLevelPoints: 4000,
    studyTime: 127, // hours
    projectsCompleted: 8,
    certificatesEarned: 3,
    achievements: [
      { id: 1, name: "First Steps", description: "Menyelesaikan modul pertama", icon: "🎯", unlocked: true, rarity: "common" },
      { id: 2, name: "Consistent Learner", description: "Belajar 7 hari berturut-turut", icon: "🔥", unlocked: true, rarity: "common" },
      { id: 3, name: "Skill Master", description: "Menguasai 3 skill utama", icon: "⭐", unlocked: true, rarity: "rare" },
      { id: 4, name: "Speed Runner", description: "Menyelesaikan modul dalam 1 hari", icon: "⚡", unlocked: true, rarity: "epic" },
      { id: 5, name: "Project Builder", description: "Menyelesaikan 5 project", icon: "🏗️", unlocked: false, rarity: "rare" },
      { id: 6, name: "Career Explorer", description: "Menjelajahi 10 jalur karier", icon: "🗺️", unlocked: false, rarity: "epic" },
    ],
    learningPaths: [
      { 
        name: "Frontend Development", 
        progress: 85, 
        modules: 10, 
        totalModules: 12, 
        color: "from-blue-500 to-cyan-500",
        icon: <Code className="w-5 h-5" />,
        difficulty: "Intermediate",
        estimatedTime: "2 minggu lagi"
      },
      { 
        name: "Data Science", 
        progress: 60, 
        modules: 9, 
        totalModules: 15, 
        color: "from-green-500 to-teal-500",
        icon: <BarChart3 className="w-5 h-5" />,
        difficulty: "Advanced",
        estimatedTime: "1 bulan lagi"
      },
      { 
        name: "UI/UX Design", 
        progress: 45, 
        modules: 4, 
        totalModules: 10, 
        color: "from-purple-500 to-pink-500",
        icon: <Palette className="w-5 h-5" />,
        difficulty: "Beginner",
        estimatedTime: "3 minggu lagi"
      },
    ],
    weeklyActivity: [
      { day: "Sen", completed: 3, total: 3, hours: 2.5 },
      { day: "Sel", completed: 4, total: 4, hours: 3.2 },
      { day: "Rab", completed: 2, total: 3, hours: 1.8 },
      { day: "Kam", completed: 3, total: 3, hours: 2.1 },
      { day: "Jum", completed: 4, total: 4, hours: 3.5 },
      { day: "Sab", completed: 2, total: 2, hours: 1.5 },
      { day: "Min", completed: 1, total: 2, hours: 0.8 },
    ],
    recentActivities: [
      { type: "module", title: "React Hooks Advanced", timestamp: "2 jam lalu", points: 150 },
      { type: "achievement", title: "Speed Runner Achievement", timestamp: "1 hari lalu", points: 250 },
      { type: "project", title: "E-commerce Dashboard", timestamp: "3 hari lalu", points: 500 },
    ]
  })

  const [user, setUser] = useState<any>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const [results, setResults] = useState<any>({
    overallScore: 78,
    correctAnswers: 23,
    totalQuestions: 30,
    categoryScores: {
      "Logika & Problem Solving": { correct: 8, total: 10 },
      "Kreativitas & Design": { correct: 7, total: 10 },
      "Teknis & Programming": { correct: 8, total: 10 },
    },
    recommendations: ["Full-Stack Developer", "UI/UX Designer", "Data Analyst"],
    strengths: ["Analytical Thinking", "Visual Design", "Code Structure"],
    improvements: ["Algorithm Optimization", "User Research", "Database Design"]
  })

  const interestIcons: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
    engineer: { icon: <Cog className="w-6 h-6" />, label: "Engineer", color: "text-orange-500" },
    designer: { icon: <Palette className="w-6 h-6" />, label: "Designer", color: "text-pink-500" },
    cybersecurity: { icon: <Shield className="w-6 h-6" />, label: "Cybersecurity", color: "text-green-500" },
    developer: { icon: <Code className="w-6 h-6" />, label: "Developer", color: "text-blue-500" },
    ai: { icon: <Cpu className="w-6 h-6" />, label: "AI Specialist", color: "text-purple-500" },
  }

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        if (parsedUser.assessmentResults) setResults(parsedUser.assessmentResults)
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e)
    } finally {
      setIsLoadingUser(false)
    }
  }, [])

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  const levelProgress = useMemo(() => {
    if (!progressData?.nextLevelPoints) return 0
    return Math.min(100, Math.round((progressData.totalPoints / progressData.nextLevelPoints) * 100))
  }, [progressData])

  const hasAssessment = results?.totalQuestions > 0
  const weeklyTotal = progressData.weeklyActivity.reduce((acc, day) => acc + day.hours, 0)

  const achievementsByRarity = useMemo(() => {
    const grouped = progressData.achievements.reduce((acc, ach) => {
      if (!acc[ach.rarity]) acc[ach.rarity] = []
      acc[ach.rarity].push(ach)
      return acc
    }, {} as Record<string, typeof progressData.achievements>)
    return grouped
  }, [progressData.achievements])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'epic': return 'from-purple-500 to-pink-500'
      case 'rare': return 'from-blue-500 to-cyan-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <AuthGuard>
      <div className="p-5 gap-5 flex h-screen w-screen scrollbar-none overflow-hidden">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
        />
        <div className="flex flex-col w-full relative">
          {/* Enhanced sticky header */}
          <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
            <div className="max-w-7xl mx-auto px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src="/nada_satya_maharani.jpg" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      {isLoadingUser ? (
                        <span className="inline-block h-5 w-48 bg-muted rounded animate-pulse" />
                      ) : (
                        <>
                          <span className="gradient-text">{user?.name || "Pengguna"}</span>
                          <Badge variant="outline" className="text-xs">
                            Level {progressData.level}
                          </Badge>
                        </>
                      )}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {progressData.currentStreak} hari streak
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {progressData.totalPoints} poin
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  {/* Quick stats cards */}
                  <Card className="p-3 bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card transition-all">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{Math.round((progressData.completedModules / progressData.totalModules) * 100)}%</div>
                      <div className="text-xs text-muted-foreground">Progress</div>
                    </div>
                  </Card>
                  <Card className="p-3 bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card transition-all">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">{weeklyTotal.toFixed(1)}h</div>
                      <div className="text-xs text-muted-foreground">Minggu ini</div>
                    </div>
                  </Card>
                  <Card className="p-3 bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card transition-all">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">{progressData.projectsCompleted}</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Level progress bar */}
              <div className="mt-4 bg-card/40 rounded-full p-1">
                <div className="flex items-center justify-between text-xs mb-1 px-2">
                  <span className="text-muted-foreground">Level {progressData.level}</span>
                  <span className="text-muted-foreground">
                    {progressData.totalPoints}/{progressData.nextLevelPoints} pts
                  </span>
                </div>
                <Progress 
                  value={levelProgress} 
                  className="h-2" 
                  aria-label="Progress ke level berikutnya"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 h-full overflow-auto px-5 py-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Quick Actions */}
              <div className="mb-8">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  <Button 
                    size="sm" 
                    className="whitespace-nowrap gradient-bg" 
                    asChild
                  >
                    <Link href="/learning-path">
                      <Rocket className="w-4 h-4 mr-2" />
                      Lanjut Belajar
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="whitespace-nowrap" asChild>
                    <Link href="/career-mapper">
                      <Target className="w-4 h-4 mr-2" />
                      Career Mapper
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="whitespace-nowrap" asChild>
                    <Link href="/assessment">
                      <Brain className="w-4 h-4 mr-2" />
                      Retake Assessment
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-8">

                {/* === MAIN CONTENT === */}
                <div className="space-y-8">

                  {/* Learning Progress Overview */}
                  <FloatingCard delay={0.1} className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full -translate-y-16 translate-x-16" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">Learning Progress</h3>
                            <p className="text-muted-foreground">Perjalanan belajar Anda</p>
                          </div>
                        </div>
                        <Button asChild size="sm" variant="outline" className="rounded-full">
                          <Link href="/learning-path">
                            Lihat Detail
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {progressData.completedModules}
                              </div>
                              <div className="text-sm text-blue-600/70 dark:text-blue-400/70">
                                Modul Selesai
                              </div>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                              <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {progressData.studyTime}h
                              </div>
                              <div className="text-sm text-green-600/70 dark:text-green-400/70">
                                Total Belajar
                              </div>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                              <Award className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {progressData.certificatesEarned}
                              </div>
                              <div className="text-sm text-purple-600/70 dark:text-purple-400/70">
                                Sertifikat
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>

                      <div className="space-y-4">
                        {progressData.learningPaths.map((path, index) => (
                          <Card 
                            key={index}
                            className="p-5 hover:shadow-lg transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/30"
                            onClick={() => router.push(`/learning-path/${path.name.toLowerCase().replace(/\s+/g, '-')}`)}
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className={`w-12 h-12 bg-gradient-to-br ${path.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                {path.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {path.name}
                                  </h4>
                                  <Badge variant="outline" className="text-xs">
                                    {path.difficulty}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {path.modules}/{path.totalModules} modul • {path.estimatedTime}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary mb-1">
                                  {path.progress}%
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all ml-auto" />
                              </div>
                            </div>
                            <Progress value={path.progress} className="h-3" />
                          </Card>
                        ))}
                      </div>
                    </div>
                  </FloatingCard>

                  {/* Assessment Results */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FloatingCard delay={0.2}>
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <TrendingUp className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Assessment Score</h3>
                        <div className="text-5xl font-bold gradient-text mb-2">{results.overallScore}%</div>
                        <p className="text-muted-foreground">
                          {results.correctAnswers} dari {results.totalQuestions} jawaban benar
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold mb-3">Strengths</h4>
                        {results.strengths?.map((strength: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                            <Star className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </FloatingCard>

                    <FloatingCard delay={0.25}>
                      <h3 className="text-xl font-semibold mb-4">Breakdown Kemampuan</h3>
                      <div className="space-y-4">
                        {Object.entries(results.categoryScores).map(([category, score]: [string, any]) => {
                          const value = score?.total > 0 ? (score.correct / score.total) * 100 : 0
                          const getColor = (val: number) => {
                            if (val >= 80) return 'text-green-500'
                            if (val >= 60) return 'text-yellow-500'
                            return 'text-red-500'
                          }
                          
                          return (
                            <div key={category} className="p-4 rounded-lg border border-border bg-card/50">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">{category}</span>
                                <span className={`text-sm font-bold ${getColor(value)}`}>
                                  {value.toFixed(0)}%
                                </span>
                              </div>
                              <Progress value={value} className="h-2 mb-2" />
                              <div className="text-xs text-muted-foreground">
                                {score?.correct ?? 0}/{score?.total ?? 0} benar
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3 text-orange-600">Area for Improvement</h4>
                        {results.improvements?.map((improvement: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-950/30 rounded-lg mb-2">
                            <Lightbulb className="w-4 h-4 text-orange-500" />
                            <span className="text-sm">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </FloatingCard>
                  </div>

                  {/* Career Recommendations */}
                  <FloatingCard delay={0.3}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                          <Target className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">Career Recommendations</h3>
                          <p className="text-muted-foreground">Berdasarkan hasil assessment Anda</p>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="rounded-full">
                        <Link href="/career-mapper">
                          Explore All
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {results.recommendations.map((career: string, index: number) => (
                        <Card
                          key={index}
                          className="p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5"
                          onClick={() => router.push(`/career-mapper?career=${encodeURIComponent(career)}`)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                              <Target className="w-5 h-5 text-white" />
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                          <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                            {career}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Cocok dengan profil dan kemampuan Anda
                          </p>
                          <div className="flex items-center text-primary text-sm font-medium">
                            <Eye className="w-4 h-4 mr-1" />
                            Lihat Roadmap
                          </div>
                        </Card>
                      ))}
                    </div>
                  </FloatingCard>
                </div>

                {/* === ENHANCED SIDEBAR === */}
                <div className="space-y-6">
                  
                  {/* Profile Card */}
                  <FloatingCard delay={0.35} className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full -translate-y-12 translate-x-12" />
                    <div className="relative text-center mb-6">
                      <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-primary/20">
                        <AvatarImage src="/nada_satya_maharani.jpg" />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl font-bold">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <h2 className="text-xl font-bold mb-1">
                        {isLoadingUser ? (
                          <span className="inline-block h-5 w-32 bg-muted rounded animate-pulse mx-auto" />
                        ) : (
                          user?.name || "Nama User"
                        )}
                      </h2>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className={interestIcons[user?.interest || "engineer"]?.color}>
                          {interestIcons[user?.interest || "engineer"]?.icon}
                        </div>
                        <span className="text-sm font-medium">
                          {interestIcons[user?.interest || "engineer"]?.label}
                        </span>
                      </div>
                      <Button asChild className="w-full" variant="outline">
                        <Link href="/profile/edit-profile">
                          Edit Profile
                        </Link>
                      </Button>
                    </div>
                  </FloatingCard>

                  {/* Weekly Activity */}
                  <FloatingCard delay={0.4}>
                    <h3 className="text-lg font-semibold mb-4">Aktivitas Mingguan</h3>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {progressData.weeklyActivity.map((d) => {
                        const pct = d.total > 0 ? Math.round((d.completed / d.total) * 100) : 0
                        return (
                          <div key={d.day} className="flex flex-col items-center gap-2">
                            <div
                              className="w-8 h-16 rounded-md border border-border bg-card/60 flex items-end overflow-hidden relative group"
                              title={`${d.day}: ${d.completed}/${d.total} tasks (${d.hours}h)`}
                            >
                              <div
                                className="w-full bg-gradient-to-t from-primary to-accent transition-all duration-500"
                                style={{ height: `${pct}%` }}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-md" />
                            </div>
                            <span className="text-xs text-muted-foreground font-medium">{d.day}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="text-center p-3 bg-card/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {weeklyTotal.toFixed(1)}h
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Total minggu ini
                      </div>
                    </div>
                  </FloatingCard>

                  {/* Achievements */}
                  <FloatingCard delay={0.45}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Achievements</h3>
                      <Button asChild size="sm" variant="ghost">
                        <Link href="/achievements">
                          View All
                        </Link>
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(achievementsByRarity).map(([rarity, achievements]) => (
                        <div key={rarity}>
                          <div className="text-xs uppercase text-muted-foreground tracking-wide mb-2 font-semibold">
                            {rarity}
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {achievements.slice(0, 3).map((ach) => (
                              <div
                                key={ach.id}
                                className={`
                                  relative p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer group
                                  ${ach.unlocked 
                                    ? `bg-gradient-to-br ${getRarityColor(rarity)} border-transparent shadow-lg hover:scale-105` 
                                    : 'border-dashed border-border bg-card/30 opacity-60'
                                  }
                                `}
                                title={ach.description}
                              >
                                <div className="text-center">
                                  <div className="text-2xl mb-1">{ach.icon}</div>
                                  <div className={`text-xs font-medium ${ach.unlocked ? 'text-white' : 'text-muted-foreground'}`}>
                                    {ach.name}
                                  </div>
                                </div>
                                {ach.unlocked && (
                                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-lg transition-colors" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </FloatingCard>

                  {/* Recent Activity */}
                  <FloatingCard delay={0.5}>
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {progressData.recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            {activity.type === 'module' && <BookOpen className="w-4 h-4 text-white" />}
                            {activity.type === 'achievement' && <Award className="w-4 h-4 text-white" />}
                            {activity.type === 'project' && <Code className="w-4 h-4 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{activity.title}</div>
                            <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                          </div>
                          <div className="text-xs font-medium text-primary">
                            +{activity.points}
                          </div>
                        </div>
                      ))}
                    </div>
                  </FloatingCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}