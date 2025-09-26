"use client"

import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  User,
  LogOut,
  BarChart3,
  Target,
  BookOpen,
  Trophy,
  Star,
  Calendar,
  TrendingUp,
  Gamepad2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { useSession, signOut } from "next-auth/react"
import { useEffect } from "react"


export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    completedModules: 12,
    totalModules: 24,
    currentStreak: 7,
    totalPoints: 2450,
    level: 3,
    achievements: 8,
  })
  const progressPercentage = (stats.completedModules / stats.totalModules) * 100
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  useEffect(() => {
  console.log("Session:", session)
  console.log("Status:", status)
}, [session, status])

  // Jika belum login, redirect ke login
  if (status === "loading") return null
  if (!session?.user) {
    router.push("/login")
    return null
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <AuthGuard>
      <div className="p-5 gap-5 flex h-screen w-screen scrollbar-none overflow-hidden">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
        />
        <div className="flex flex-col w-full h-full relative">
          {/* Dashboard Content */}
          <div className="flex-1 h-full overflow-auto p-5">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">
                  Dashboard <GradientText>Career Mapper</GradientText>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Selamat datang, <span className="font-semibold">{session.user.name || session.user.email}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <FloatingCard
                  delay={0.1}
                  className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                    border-r border-white/30
                    rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Progress Belajar</p>
                      <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <Progress value={progressPercentage} className="mt-3" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {stats.completedModules} dari {stats.totalModules} modul
                  </p>
                </FloatingCard>

                <FloatingCard
                  delay={0.1}
                  className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                    border-r border-white/30
                    rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Streak Harian</p>
                      <p className="text-2xl font-bold">{stats.currentStreak} hari</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Pertahankan konsistensi!</p>
                </FloatingCard>

                <FloatingCard
                  delay={0.1}
                  className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                    border-r border-white/30
                    rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Poin</p>
                      <p className="text-2xl font-bold">{stats.totalPoints.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Level {stats.level}</p>
                </FloatingCard>

                <FloatingCard
                  delay={0.1}
                  className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                    border-r border-white/30
                    rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Achievement</p>
                      <p className="text-2xl font-bold">{stats.achievements}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Pencapaian terbuka</p>
                </FloatingCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                  className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                  border-r border-white/30
                  rounded-3xl
                  shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]
                  p-6
                  transition-all duration-500"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Profil & Assessment</h3>
                      <p className="text-sm text-muted-foreground">
                        {session.user?.hasProfile ? "Profil lengkap" : "Belum lengkap"}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Lengkapi profil dan ikuti tes kemampuan untuk mendapatkan rekomendasi yang akurat.
                  </p>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/profile/setup">
                      {session.user?.hasProfile ? "Lihat Profil" : "Lengkapi Profil"}
                    </Link>
                  </Button>
                </div>

                <div
                  className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                  border-r border-white/30
                  rounded-3xl
                  shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]
                  p-6
                  transition-all duration-500"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">AI Career Mapper</h3>
                      <p className="text-sm text-muted-foreground">
                        Rekomendasi karier
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Dapatkan rekomendasi karier dan roadmap pembelajaran yang dipersonalisasi.
                  </p>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/profile/setup">Jelajahi Karier</Link>
                  </Button>
                </div>

                <div
                  className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                  border-r border-white/30
                  rounded-3xl
                  shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]
                  p-6
                  transition-all duration-500"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Learning Path</h3>
                      <p className="text-sm text-muted-foreground">
                        Jalur pembelajaran
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Ikuti jalur pembelajaran yang disesuaikan dengan tujuan karier Anda.
                  </p>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/profile/setup">Mulai Belajar</Link>
                  </Button>
                </div>

                <div
                  className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                  border-r border-white/30
                  rounded-3xl
                  shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]
                  p-6
                  transition-all duration-500"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Progress Tracker</h3>
                      <p className="text-sm text-muted-foreground">
                        Pantau kemajuan
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Lihat statistik pembelajaran dan pencapaian Anda.
                  </p>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/profile/setup">Lihat Progress</Link>
                  </Button>
                </div>

                <div
                  className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                  border-r border-white/30
                  rounded-3xl
                  shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]
                  p-6
                  transition-all duration-500"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Portfolio</h3>
                      <p className="text-sm text-muted-foreground">
                        Showcase karya
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Bangun portfolio profesional untuk menunjukkan kemampuan Anda.
                  </p>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/profile/setup">Kelola Portfolio</Link>
                  </Button>
                </div>

                <div
                  className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                  border-r border-white/30
                  rounded-3xl
                  shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]
                  p-6
                  transition-all duration-500"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Gamification Hub</h3>
                      <p className="text-sm text-muted-foreground">
                        Challenges & rewards
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Ikuti challenges, raih badges, dan bersaing di leaderboard.
                  </p>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/profile/setup">Explore Games</Link>
                  </Button>
                </div>
              </div>

              {/* Tambahkan tombol logout */}
              <div className="mt-8">
                <Button onClick={handleLogout} variant="outline">
                  <LogOut className="mr-2 w-4 h-4" /> Keluar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
