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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Target, TrendingUp, BookOpen, ArrowRight, Calendar, 
  Award, Zap, Clock, Users, Star, BarChart3, Trophy,
  ChevronRight, Eye, Brain, Lightbulb, Rocket, User,
  Settings, Download, Share2, Bell, Gift, MapPin,
  Flame, CheckCircle, TrendingDown, Plus, Filter
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
      { id: 1, name: "First Steps", description: "Menyelesaikan modul pertama", icon: "🎯", unlocked: true, rarity: "common", points: 100 },
      { id: 2, name: "Consistent Learner", description: "Belajar 7 hari berturut-turut", icon: "🔥", unlocked: true, rarity: "common", points: 150 },
      { id: 3, name: "Skill Master", description: "Menguasai 3 skill utama", icon: "⭐", unlocked: true, rarity: "rare", points: 300 },
      { id: 4, name: "Speed Runner", description: "Menyelesaikan modul dalam 1 hari", icon: "⚡", unlocked: true, rarity: "epic", points: 500 },
      { id: 5, name: "Code Ninja", description: "Menyelesaikan 10 coding challenges", icon: "🥷", unlocked: true, rarity: "rare", points: 400 },
      { id: 6, name: "Team Player", description: "Berkolaborasi dalam 3 proyek tim", icon: "🤝", unlocked: false, rarity: "rare", points: 350 },
      { id: 7, name: "Project Builder", description: "Menyelesaikan 5 project", icon: "🏗️", unlocked: false, rarity: "rare", points: 600 },
      { id: 8, name: "Career Explorer", description: "Menjelajahi 10 jalur karier", icon: "🗺️", unlocked: false, rarity: "epic", points: 750 },
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
        estimatedTime: "2 minggu lagi",
        category: "Technology",
        lastActive: "2 hari lalu"
      },
      { 
        name: "Data Science", 
        progress: 60, 
        modules: 9, 
        totalModules: 15, 
        color: "from-green-500 to-teal-500",
        icon: <BarChart3 className="w-5 h-5" />,
        difficulty: "Advanced",
        estimatedTime: "1 bulan lagi",
        category: "Analytics",
        lastActive: "1 hari lalu"
      },
      { 
        name: "UI/UX Design", 
        progress: 45, 
        modules: 4, 
        totalModules: 10, 
        color: "from-purple-500 to-pink-500",
        icon: <Palette className="w-5 h-5" />,
        difficulty: "Beginner",
        estimatedTime: "3 minggu lagi",
        category: "Design",
        lastActive: "5 hari lalu"
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
      { type: "module", title: "React Hooks Advanced", timestamp: "2 jam lalu", points: 150, category: "Frontend" },
      { type: "achievement", title: "Speed Runner Achievement", timestamp: "1 hari lalu", points: 250, category: "Achievement" },
      { type: "project", title: "E-commerce Dashboard", timestamp: "3 hari lalu", points: 500, category: "Project" },
      { type: "quiz", title: "JavaScript Quiz", timestamp: "5 hari lalu", points: 75, category: "Assessment" },
      { type: "certificate", title: "React Fundamentals", timestamp: "1 minggu lalu", points: 1000, category: "Certificate" },
    ],
    skills: [
      { name: "React", level: 85, category: "Frontend", trend: "up" },
      { name: "JavaScript", level: 92, category: "Programming", trend: "up" },
      { name: "TypeScript", level: 78, category: "Programming", trend: "up" },
      { name: "Python", level: 65, category: "Backend", trend: "stable" },
      { name: "UI/UX Design", level: 70, category: "Design", trend: "up" },
      { name: "Data Analysis", level: 55, category: "Analytics", trend: "down" },
    ]
  })

  const [user, setUser] = useState<any>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTimeRange, setSelectedTimeRange] = useState("week")
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
  const totalAchievements = progressData.achievements.filter(ach => ach.unlocked).length
  const totalPoints = progressData.achievements.filter(ach => ach.unlocked).reduce((acc, ach) => acc + ach.points, 0)

  const achievementsByRarity = useMemo(() => {
    const grouped = progressData.achievements.reduce((acc, ach) => {
      if (!acc[ach.rarity]) acc[ach.rarity] = []
      acc[ach.rarity].push(ach)
      return acc
    }, {} as Record<string, typeof progressData.achievements>)
    return grouped
  }, [progressData.achievements])

  const skillsByCategory = useMemo(() => {
    const grouped = progressData.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    }, {} as Record<string, typeof progressData.skills>)
    return grouped
  }, [progressData.skills])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'epic': return 'from-purple-500 to-pink-500'
      case 'rare': return 'from-blue-500 to-cyan-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getSkillTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />
      default: return <div className="w-3 h-3 rounded-full bg-gray-400" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'module': return <BookOpen className="w-4 h-4 text-blue-500" />
      case 'achievement': return <Award className="w-4 h-4 text-yellow-500" />
      case 'project': return <Code className="w-4 h-4 text-green-500" />
      case 'quiz': return <Brain className="w-4 h-4 text-purple-500" />
      case 'certificate': return <Trophy className="w-4 h-4 text-orange-500" />
      default: return <BookOpen className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <AuthGuard>
      <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Content - Remove sticky header, integrate into scrollable area */}
          <div className="flex-1 overflow-auto">
            <div className="px-6 py-8 space-y-8">
              
              {/* 1. Enhanced Profile Dashboard Header */}
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
                <div className="relative p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-white/30">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                          Profile Dashboard
                        </h1>
                        <p className="text-white/80 text-lg">
                          Kelola progress belajar dan achievement Anda
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Enhanced stats cards */}
                      <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                            <BarChart3 className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {Math.round((progressData.completedModules / progressData.totalModules) * 100)}%
                          </div>
                          <div className="text-sm text-slate-600 font-medium">Progress</div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {weeklyTotal.toFixed(1)}h
                          </div>
                          <div className="text-sm text-slate-600 font-medium">Minggu ini</div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {totalAchievements}
                          </div>
                          <div className="text-sm text-slate-600 font-medium">Achievements</div>
                        </div>
                      </Card>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-3 ml-8">
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-xl transition-all duration-200">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-xl transition-all duration-200">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 2. Enhanced User Profile Card */}
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="relative p-8">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 ring-4 ring-gradient-to-r ring-blue-500/20 shadow-xl">
                        <AvatarImage src="/nada_satya_maharani.jpg" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        {isLoadingUser ? (
                          <span className="inline-block h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                        ) : (
                          <>
                            <span className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                              {user?.name || "Pengguna"}
                            </span>
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
                              Level {progressData.level}
                            </Badge>
                            <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200 px-4 py-2 text-sm font-semibold">
                              <Flame className="w-4 h-4 mr-2" />
                              {progressData.currentStreak} hari streak
                            </Badge>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-8 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                            <Trophy className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{totalPoints} poin total</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{interestIcons[user?.interest || "engineer"]?.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{progressData.studyTime}h belajar</span>
                        </div>
                      </div>
                    </div>
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl shadow-lg">
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                          {Math.round((progressData.completedModules / progressData.totalModules) * 100)}%
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                          Completion Rate
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>

              {/* 3. Enhanced Level Progress Card - REDESIGNED */}
              <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-950/30 dark:via-indigo-950/30 dark:to-blue-950/30">
                {/* Enhanced Background Layers */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/8 via-indigo-500/8 to-blue-500/8" />
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-400/15 to-blue-400/15 rounded-full -translate-y-24 translate-x-24" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/10 to-purple-400/10 rounded-full translate-y-16 -translate-x-16" />
                  <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full -translate-x-10 -translate-y-10" />
                </div>
                
                <div className="relative p-8">
                  {/* Header Section */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                          <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-xs font-bold text-white">{progressData.level}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Level {progressData.level}
                          </span>
                          <ChevronRight className="w-6 h-6 text-slate-400" />
                          <span className="text-lg text-slate-500 dark:text-slate-400">Level {progressData.level + 1}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Perjalanan pembelajaran Anda</p>
                      </div>
                    </div>
                    
                    {/* Points Display */}
                    <Card className="px-6 py-4 bg-white/90 backdrop-blur-sm border-0 rounded-2xl shadow-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          {progressData.totalPoints}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">/ {progressData.nextLevelPoints} pts</div>
                      </div>
                    </Card>
                  </div>

                  {/* Enhanced Progress Section */}
                  <div className="space-y-6">
                    {/* Main Progress Bar */}
                    <div className="relative">
                      <div className="h-8 bg-white/60 backdrop-blur-sm rounded-full border-2 border-purple-200/50 dark:border-purple-800/50 shadow-inner overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
                          style={{ width: `${levelProgress}%` }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 -translate-x-full animate-pulse" />
                          
                          {/* Progress glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                        </div>
                        
                        {/* Progress percentage text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-white drop-shadow-lg">
                            {levelProgress.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Progress markers */}
                      <div className="flex justify-between mt-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full shadow-sm" />
                        <div className="w-2 h-2 bg-indigo-300 rounded-full shadow-sm" />
                        <div className="w-2 h-2 bg-blue-300 rounded-full shadow-sm" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm" />
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Points Remaining */}
                      <Card className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-950/50 dark:to-indigo-950/50 border-0 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                              {progressData.nextLevelPoints - progressData.totalPoints}
                            </div>
                            <div className="text-xs text-purple-600/80 dark:text-purple-400/80 font-medium">
                              poin lagi
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Current Streak */}
                      <Card className="p-4 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-950/50 dark:to-red-950/50 border-0 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                            <Flame className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
                              {progressData.currentStreak}
                            </div>
                            <div className="text-xs text-orange-600/80 dark:text-orange-400/80 font-medium">
                              hari streak
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Estimated Time */}
                      <Card className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 border-0 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                              ~3 hari
                            </div>
                            <div className="text-xs text-emerald-600/80 dark:text-emerald-400/80 font-medium">
                              ke level {progressData.level + 1}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Level Benefits Preview */}
                    <Card className="p-6 bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 backdrop-blur-sm border-0 rounded-2xl shadow-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                          <Gift className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200">Level {progressData.level + 1} Rewards</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Unlock these benefits</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Award className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">New Badge</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
                            <Rocket className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Premium Features</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                            <Users className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Study Groups</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>


              {/* 4. Enhanced Navigation Tabs - REDESIGNED */}
              <Card className="relative overflow-hidden border-0 shadow-xl backdrop-blur-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/3 via-purple-500/3 to-pink-500/3" />
                  <div className="absolute top-0 right-0 w-96 h-32 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full -translate-y-16 translate-x-48" />
                  <div className="absolute bottom-0 left-0 w-64 h-24 bg-gradient-to-tr from-emerald-400/5 to-cyan-400/5 rounded-full translate-y-12 -translate-x-32" />
                </div>
                
                <div className="relative p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Navigation Menu</h3>
                    <p className="text-slate-600 dark:text-slate-400">Jelajahi berbagai aspek profil Anda</p>
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-slate-100/80 dark:bg-slate-700/80 backdrop-blur-sm gap-3 py-12 px-3 rounded-3xl border-2 border-slate-200/50 dark:border-slate-600/50 shadow-inner justify-center content-center">
                      <TabsTrigger 
                        value="overview" 
                        className="
                          group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out font-semibold py-4 px-6
                          data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:via-indigo-500 data-[state=active]:to-purple-500 
                          data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 data-[state=active]:border-0
                          data-[state=inactive]:bg-white/70 data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:bg-white/90 data-[state=inactive]:hover:text-slate-900 
                          data-[state=inactive]:border data-[state=inactive]:border-slate-200/80 data-[state=inactive]:shadow-sm data-[state=inactive]:hover:shadow-md
                          dark:data-[state=inactive]:bg-slate-600/50 dark:data-[state=inactive]:text-slate-300 dark:data-[state=inactive]:hover:bg-slate-600/80 dark:data-[state=inactive]:border-slate-500/50
                        "
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center justify-center gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg group-data-[state=active]:bg-white/20 group-data-[state=active]:backdrop-blur-sm transition-all duration-300">
                            <BarChart3 className="w-4 h-4 text-white group-data-[state=inactive]:text-blue-600" />
                          </div>
                          <span className="font-bold">Overview</span>
                        </div>
                      </TabsTrigger>
                      
                      <TabsTrigger 
                        value="learning" 
                        className="
                          group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out font-semibold py-4 px-6
                          data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:via-green-500 data-[state=active]:to-teal-500 
                          data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 data-[state=active]:border-0
                          data-[state=inactive]:bg-white/70 data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:bg-white/90 data-[state=inactive]:hover:text-slate-900 
                          data-[state=inactive]:border data-[state=inactive]:border-slate-200/80 data-[state=inactive]:shadow-sm data-[state=inactive]:hover:shadow-md
                          dark:data-[state=inactive]:bg-slate-600/50 dark:data-[state=inactive]:text-slate-300 dark:data-[state=inactive]:hover:bg-slate-600/80 dark:data-[state=inactive]:border-slate-500/50
                        "
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center justify-center gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg group-data-[state=active]:bg-white/20 group-data-[state=active]:backdrop-blur-sm transition-all duration-300">
                            <BookOpen className="w-4 h-4 text-white group-data-[state=inactive]:text-emerald-600" />
                          </div>
                          <span className="font-bold">Learning</span>
                        </div>
                      </TabsTrigger>
                      
                      <TabsTrigger 
                        value="achievements" 
                        className="
                          group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out font-semibold py-4 px-6
                          data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:via-yellow-500 data-[state=active]:to-orange-500 
                          data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 data-[state=active]:border-0
                          data-[state=inactive]:bg-white/70 data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:bg-white/90 data-[state=inactive]:hover:text-slate-900 
                          data-[state=inactive]:border data-[state=inactive]:border-slate-200/80 data-[state=inactive]:shadow-sm data-[state=inactive]:hover:shadow-md
                          dark:data-[state=inactive]:bg-slate-600/50 dark:data-[state=inactive]:text-slate-300 dark:data-[state=inactive]:hover:bg-slate-600/80 dark:data-[state=inactive]:border-slate-500/50
                        "
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center justify-center gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg group-data-[state=active]:bg-white/20 group-data-[state=active]:backdrop-blur-sm transition-all duration-300">
                            <Award className="w-4 h-4 text-white group-data-[state=inactive]:text-amber-600" />
                          </div>
                          <span className="font-bold">Achievements</span>
                        </div>
                      </TabsTrigger>
                      
                      <TabsTrigger 
                        value="analytics" 
                        className="
                          group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out font-semibold py-4 px-6
                          data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:via-pink-500 data-[state=active]:to-red-500 
                          data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 data-[state=active]:border-0
                          data-[state=inactive]:bg-white/70 data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:bg-white/90 data-[state=inactive]:hover:text-slate-900 
                          data-[state=inactive]:border data-[state=inactive]:border-slate-200/80 data-[state=inactive]:shadow-sm data-[state=inactive]:hover:shadow-md
                          dark:data-[state=inactive]:bg-slate-600/50 dark:data-[state=inactive]:text-slate-300 dark:data-[state=inactive]:hover:bg-slate-600/80 dark:data-[state=inactive]:border-slate-500/50
                        "
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-red-400/20 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center justify-center gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-rose-400 to-red-500 rounded-lg flex items-center justify-center shadow-lg group-data-[state=active]:bg-white/20 group-data-[state=active]:backdrop-blur-sm transition-all duration-300">
                            <TrendingUp className="w-4 h-4 text-white group-data-[state=inactive]:text-rose-600" />
                          </div>
                          <span className="font-bold">Analytics</span>
                        </div>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  {/* Tab indicators */}
                  <div className="flex justify-center mt-6 gap-3">
                    {["overview", "learning", "achievements", "analytics"].map((tab, index) => (
                      <div
                        key={tab}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          activeTab === tab 
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg" 
                            : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-4 bg-slate-200 dark:bg-slate-700 rounded-full h-1 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                      style={{ 
                        width: `${(["overview", "learning", "achievements", "analytics"].indexOf(activeTab) + 1) * 25}%` 
                      }}
                    />
                  </div>
                </div>
              </Card>

              {/* Quick Actions dengan desain yang diperbaiki */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Quick Actions</h2>
                  <div className="flex gap-3">
                    <Button size="sm" className="bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm" className="bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200">
                      <Calendar className="w-4 h-4 mr-2" />
                      This Week
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Primary Action - Lanjut Belajar */}
                  <Card className="relative group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                    <Link href="/learning-path" className="relative block p-8 text-center text-white">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <Rocket className="w-8 h-8" />
                      </div>
                      <div className="font-bold text-xl mb-2">Lanjut Belajar</div>
                      <div className="text-white/80 text-sm">2 modul menunggu</div>
                    </Link>
                  </Card>
                  
                  {/* Secondary Actions */}
                  <Card className="group overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Link href="/career-mapper" className="block p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <div className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Career Mapper</div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm">Jelajahi karier</div>
                    </Link>
                  </Card>
                  
                  <Card className="group overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Link href="/assessment" className="block p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <div className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Assessment</div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm">Ukur kemampuan</div>
                    </Link>
                  </Card>
                  
                  <Card className="group overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Link href="/profile/edit-profile" className="block p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <Settings className="w-8 h-8 text-white" />
                      </div>
                      <div className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Edit Profile</div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm">Pengaturan akun</div>
                    </Link>
                  </Card>
                </div>
              </div>

              {/* Tabbed Content dengan desain yang diperbaiki */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="overview" className="space-y-8">
                  {/* Learning Progress Overview dengan gradient background */}
                  <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-32 translate-x-32" />
                    <div className="relative p-8">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                            <BookOpen className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Learning Progress</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">Perjalanan belajar Anda</p>
                          </div>
                        </div>
                        <Button asChild size="sm" className="bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 shadow-lg hover:bg-white rounded-full">
                          <Link href="/learning-path">
                            Lihat Detail
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      {/* Enhanced Stats Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                          <div className="relative p-8">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                <BookOpen className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                <div className="text-4xl font-bold mb-1">
                                  {progressData.completedModules}
                                </div>
                                <div className="text-white/80 font-medium">
                                  Modul Selesai
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                          <div className="relative p-8">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                <Clock className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                <div className="text-4xl font-bold mb-1">
                                  {progressData.studyTime}h
                                </div>
                                <div className="text-white/80 font-medium">
                                  Total Belajar
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                          <div className="relative p-8">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                <Award className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                <div className="text-4xl font-bold mb-1">
                                  {progressData.certificatesEarned}
                                </div>
                                <div className="text-white/80 font-medium">
                                  Sertifikat
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>

                      {/* Enhanced Learning Path Cards */}
                      <div className="space-y-6">
                        {progressData.learningPaths.map((path, index) => (
                          <Card 
                            key={index}
                            className="relative group overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-slate-800 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                            onClick={() => router.push(`/learning-path/${path.name.toLowerCase().replace(/\s+/g, '-')}`)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-8">
                              <div className="flex items-center gap-6 mb-6">
                                <div className={`w-20 h-20 bg-gradient-to-br ${path.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                                  {path.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h4 className="font-bold text-xl text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                                      {path.name}
                                    </h4>
                                    <Badge className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full">
                                      {path.difficulty}
                                    </Badge>
                                  </div>
                                  <p className="text-slate-600 dark:text-slate-400 mb-1">
                                    {path.modules}/{path.totalModules} modul • {path.category}
                                  </p>
                                  <p className="text-sm text-slate-500">
                                    Terakhir aktif: {path.lastActive}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    {path.progress}%
                                  </div>
                                  <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all ml-auto" />
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="relative">
                                  <Progress value={path.progress} className="h-4 rounded-full bg-slate-100 border border-slate-200" />
                                  <div 
                                    className={`absolute top-0 left-0 h-4 bg-gradient-to-r ${path.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                                    style={{ width: `${path.progress}%` }}
                                  />
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{path.estimatedTime}</span>
                                  <span className="font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">{path.modules} dari {path.totalModules} selesai</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Assessment Results dengan enhanced design */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full -translate-y-16 translate-x-16" />
                      <div className="relative p-8">
                        <div className="text-center mb-8">
                          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <TrendingUp className="w-12 h-12 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">Assessment Score</h3>
                          <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">{results.overallScore}%</div>
                          <p className="text-slate-600 dark:text-slate-400 text-lg">
                            {results.correctAnswers} dari {results.totalQuestions} jawaban benar
                          </p>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-bold mb-4 text-green-700 dark:text-green-400">Strengths</h4>
                          {results.strengths?.map((strength: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-green-100 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
                              <Star className="w-5 h-5 text-green-600" />
                              <span className="font-medium text-green-800 dark:text-green-200">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>

                    <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full -translate-y-16 translate-x-16" />
                      <div className="relative p-8">
                        <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Breakdown Kemampuan</h3>
                        <div className="space-y-6">
                          {Object.entries(results.categoryScores).map(([category, score]: [string, any]) => {
                            const value = score?.total > 0 ? (score.correct / score.total) * 100 : 0
                            const getColor = (val: number) => {
                              if (val >= 80) return { bg: 'from-green-500 to-emerald-500', text: 'text-green-600' }
                              if (val >= 60) return { bg: 'from-yellow-500 to-orange-500', text: 'text-yellow-600' }
                              return { bg: 'from-red-500 to-pink-500', text: 'text-red-600' }
                            }
                            const colorScheme = getColor(value)
                            
                            return (
                              <div key={category} className="p-6 rounded-2xl border-0 bg-white/80 dark:bg-slate-800 backdrop-blur-sm shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                  <span className="font-bold text-slate-800 dark:text-slate-200">{category}</span>
                                  <span className={`text-lg font-bold ${colorScheme.text}`}>
                                    {value.toFixed(0)}%
                                  </span>
                                </div>
                                <div className="relative">
                                  <Progress value={value} className="h-3 rounded-full bg-slate-100 border border-slate-200" />
                                  <div 
                                    className={`absolute top-0 left-0 h-3 bg-gradient-to-r ${colorScheme.bg} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                                    style={{ width: `${value}%` }}
                                  />
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                  {score?.correct ?? 0}/{score?.total ?? 0} benar
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        
                        <div className="mt-8">
                          <h4 className="font-bold mb-4 text-orange-700 dark:text-orange-400">Area for Improvement</h4>
                          {results.improvements?.map((improvement: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-orange-100 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-800 mb-3">
                              <Lightbulb className="w-5 h-5 text-orange-600" />
                              <span className="font-medium text-orange-800 dark:text-orange-200">{improvement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Career Recommendations dengan enhanced design */}
                  <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-pink-400/10 rounded-full -translate-y-32 translate-x-32" />
                    <div className="relative p-8">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                            <Target className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Career Recommendations</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">Berdasarkan hasil assessment Anda</p>
                          </div>
                        </div>
                        <Button asChild className="bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 shadow-lg hover:bg-white rounded-full">
                          <Link href="/career-mapper">
                            Explore All
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {results.recommendations.map((career: string, index: number) => {
                          const gradients = [
                            'from-blue-500 to-cyan-500',
                            'from-purple-500 to-pink-500',
                            'from-emerald-500 to-teal-500'
                          ]
                          return (
                            <Card
                              key={index}
                              className="group relative overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-slate-800 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                              onClick={() => router.push(`/career-mapper?career=${encodeURIComponent(career)}`)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="relative p-8">
                                <div className="flex items-start justify-between mb-6">
                                  <div className={`w-14 h-14 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <Target className="w-7 h-7 text-white" />
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                </div>
                                <h4 className="font-bold text-xl mb-4 text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                                  {career}
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                  Cocok dengan profil dan kemampuan Anda
                                </p>
                                <div className="flex items-center text-indigo-600 font-semibold">
                                  <Eye className="w-5 h-5 mr-2" />
                                  Lihat Roadmap
                                </div>
                              </div>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Learning Tab dengan enhanced design */}
                <TabsContent value="learning" className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {progressData.learningPaths.map((path, index) => (
                      <Card 
                        key={index}
                        className="group relative overflow-hidden border-0 shadow-xl bg-white/90 dark:bg-slate-800 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                        onClick={() => router.push(`/learning-path/${path.name.toLowerCase().replace(/\s+/g, '-')}`)}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                        <div className="relative p-8">
                          <div className="flex items-center gap-6 mb-6">
                            <div className={`w-20 h-20 bg-gradient-to-br ${path.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                              {path.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-bold text-xl text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                                  {path.name}
                                </h4>
                                <Badge className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full">
                                  {path.difficulty}
                                </Badge>
                              </div>
                              <p className="text-slate-600 dark:text-slate-400 mb-1">
                                {path.modules}/{path.totalModules} modul • {path.category}
                              </p>
                              <p className="text-sm text-slate-500">
                                Terakhir aktif: {path.lastActive}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                {path.progress}%
                              </div>
                              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all ml-auto" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="relative">
                              <Progress value={path.progress} className="h-4 rounded-full bg-slate-100 border border-slate-200" />
                              <div 
                                className={`absolute top-0 left-0 h-4 bg-gradient-to-r ${path.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                                style={{ width: `${path.progress}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{path.estimatedTime}</span>
                              <span className="font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">{path.modules} dari {path.totalModules} selesai</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Achievements Tab dengan enhanced design */}
                <TabsContent value="achievements" className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {progressData.achievements.map((ach) => (
                      <Card
                        key={ach.id}
                        className={`
                          group relative overflow-hidden border-0 shadow-lg transition-all duration-300 cursor-pointer
                          ${ach.unlocked 
                            ? `bg-gradient-to-br ${getRarityColor(ach.rarity)} text-white shadow-xl hover:shadow-2xl hover:scale-105` 
                            : 'bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 opacity-60 hover:opacity-80'
                          }
                        `}
                      >
                        {ach.unlocked && (
                          <>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
                          </>
                        )}
                        <div className="relative p-8 text-center">
                          <div className="text-5xl mb-4">{ach.icon}</div>
                          <h3 className={`font-bold text-lg mb-3 ${ach.unlocked ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                            {ach.name}
                          </h3>
                          <p className={`text-sm mb-6 ${ach.unlocked ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'}`}>
                            {ach.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge 
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                ach.unlocked 
                                  ? 'bg-white/20 text-white border border-white/30' 
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {ach.rarity}
                            </Badge>
                            <span className={`text-sm font-bold ${ach.unlocked ? 'text-white' : 'text-slate-500'}`}>
                              +{ach.points} pts
                            </span>
                          </div>
                        </div>
                        {ach.unlocked && (
                          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                        )}
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Analytics Tab dengan enhanced design */}
                <TabsContent value="analytics" className="space-y-8">
                  {/* Skills Analytics */}
                  <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                    <div className="relative p-8">
                      <h3 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">Skill Development</h3>
                      <div className="space-y-8">
                        {Object.entries(skillsByCategory).map(([category, skills]) => (
                          <div key={category}>
                            <h4 className="font-bold text-lg mb-6 text-blue-600 dark:text-blue-400">{category}</h4>
                            <div className="space-y-4">
                              {skills.map((skill, index) => (
                                <Card key={index} className="p-6 bg-white/80 dark:bg-slate-800 backdrop-blur-sm border-0 shadow-md">
                                  <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-3">
                                        <span className="font-bold text-slate-800 dark:text-slate-200">{skill.name}</span>
                                        <div className="flex items-center gap-3">
                                          {getSkillTrendIcon(skill.trend)}
                                          <span className="text-lg font-bold text-slate-700 dark:text-slate-300">{skill.level}%</span>
                                        </div>
                                      </div>
                                      <div className="relative">
                                        <Progress value={skill.level} className="h-3 rounded-full bg-slate-100 border border-slate-200" />
                                        <div 
                                          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                          style={{ width: `${skill.level}%` }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Activity Timeline */}
                  <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
                    <div className="relative p-8">
                      <h3 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">Recent Activity</h3>
                      <div className="space-y-4">
                        {progressData.recentActivities.map((activity, index) => (
                          <Card key={index} className="group p-6 bg-white/80 dark:bg-slate-800 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-6">
                              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="font-bold text-lg text-slate-800 dark:text-slate-200">{activity.title}</span>
                                  <Badge className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs">
                                    {activity.category}
                                  </Badge>
                                </div>
                                <div className="text-slate-600 dark:text-slate-400">{activity.timestamp}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                  +{activity.points}
                                </div>
                                <div className="text-sm text-slate-500">points</div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}