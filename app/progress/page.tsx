"use client"

import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowLeft, Trophy, Star, Calendar, BookOpen, Award, TrendingUp, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ProgressPage() {
  const [progressData, setProgressData] = useState({
    overallProgress: 65,
    completedModules: 12,
    totalModules: 24,
    currentStreak: 7,
    longestStreak: 15,
    totalPoints: 2450,
    level: 3,
    nextLevelPoints: 3000,
    achievements: [
      { id: 1, name: "First Steps", description: "Menyelesaikan modul pertama", icon: "🎯", unlocked: true },
      { id: 2, name: "Consistent Learner", description: "Belajar 7 hari berturut-turut", icon: "🔥", unlocked: true },
      { id: 3, name: "Skill Master", description: "Menguasai 3 skill utama", icon: "⭐", unlocked: true },
      { id: 4, name: "Project Builder", description: "Menyelesaikan 5 project", icon: "🏗️", unlocked: false },
      { id: 5, name: "Career Explorer", description: "Menjelajahi 10 jalur karier", icon: "🗺️", unlocked: false },
      { id: 6, name: "Knowledge Seeker", description: "Membaca 50 artikel", icon: "📚", unlocked: false },
    ],
    learningPaths: [
      { name: "Frontend Development", progress: 75, modules: 8, totalModules: 12, color: "from-blue-500 to-cyan-500" },
      { name: "Data Science", progress: 45, modules: 6, totalModules: 15, color: "from-green-500 to-teal-500" },
      { name: "UI/UX Design", progress: 30, modules: 3, totalModules: 10, color: "from-purple-500 to-pink-500" },
    ],
    weeklyActivity: [
      { day: "Sen", completed: 2, total: 3 },
      { day: "Sel", completed: 3, total: 3 },
      { day: "Rab", completed: 1, total: 2 },
      { day: "Kam", completed: 2, total: 2 },
      { day: "Jum", completed: 3, total: 4 },
      { day: "Sab", completed: 1, total: 1 },
      { day: "Min", completed: 0, total: 2 },
    ],
  })

  return (
    <AuthGuard>
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="relative z-20 p-6 border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">Progress Tracker</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative z-10 px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Progress <GradientText>Tracker</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground">Pantau kemajuan pembelajaran dan pencapaian Anda</p>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <FloatingCard delay={0.1}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Progress Keseluruhan</p>
                    <p className="text-3xl font-bold">{progressData.overallProgress}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <Progress value={progressData.overallProgress} className="mb-2" />
                <p className="text-xs text-muted-foreground">
                  {progressData.completedModules}/{progressData.totalModules} modul selesai
                </p>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Streak Saat Ini</p>
                    <p className="text-3xl font-bold">{progressData.currentStreak}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Terpanjang: {progressData.longestStreak} hari</p>
              </FloatingCard>

              <FloatingCard delay={0.3}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Level & Poin</p>
                    <p className="text-3xl font-bold">Level {progressData.level}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
                <Progress value={(progressData.totalPoints / progressData.nextLevelPoints) * 100} className="mb-2" />
                <p className="text-xs text-muted-foreground">
                  {progressData.totalPoints}/{progressData.nextLevelPoints} poin
                </p>
              </FloatingCard>

              <FloatingCard delay={0.4}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Achievement</p>
                    <p className="text-3xl font-bold">{progressData.achievements.filter((a) => a.unlocked).length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">dari {progressData.achievements.length} total</p>
              </FloatingCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Learning Paths Progress */}
              <FloatingCard delay={0.5}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Progress Learning Path</h3>
                </div>
                <div className="space-y-4">
                  {progressData.learningPaths.map((path, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{path.name}</h4>
                        <Badge variant="secondary">{path.progress}%</Badge>
                      </div>
                      <Progress value={path.progress} className="mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {path.modules}/{path.totalModules} modul selesai
                      </p>
                    </div>
                  ))}
                </div>
              </FloatingCard>

              {/* Weekly Activity */}
              <FloatingCard delay={0.6}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Aktivitas Mingguan</h3>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {progressData.weeklyActivity.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs text-muted-foreground mb-2">{day.day}</p>
                      <div className="space-y-1">
                        {Array.from({ length: day.total }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-full h-3 rounded ${
                              i < day.completed ? "bg-gradient-to-r from-primary to-accent" : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs mt-1">
                        {day.completed}/{day.total}
                      </p>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>

            {/* Achievements */}
            <FloatingCard delay={0.7}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Achievement</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {progressData.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      achievement.unlocked
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-border bg-muted/50 opacity-60"
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.name}</h4>
                        {achievement.unlocked && <CheckCircle className="w-4 h-4 text-primary inline ml-2" />}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
