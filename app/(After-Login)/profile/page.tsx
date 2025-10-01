"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, BookOpen, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Cog, Palette, Shield, Code, Cpu } from "lucide-react" // ambil icon yang mau dipakai


export default function ProfileResultsPage() {
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

  // const interestIcons: Record<string, React.ReactNode> = {
  //   engineer: <Cog className="w-6 h-6 text-primary" />,
  //   designer: <Palette className="w-6 h-6 text-pink-500" />,
  //   cybersecurity: <Shield className="w-6 h-6 text-green-500" />,
  //   developer: <Code className="w-6 h-6 text-blue-500" />,
  //   ai: <Cpu className="w-6 h-6 text-purple-500" />,
  // }


  const [user, setUser] = useState<any>(null)
  // const [results, setResults] = useState<any>(null)
  const router = useRouter()
  const [results, setResults] = useState<any>({
    overallScore: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    categoryScores: {
      "Logika": { correct: 3, total: 6 },
      "Kreativitas": { correct: 0, total: 0 },
      "Teknis": { correct: 0, total: 0 },
    },
    recommendations: ["Belajar Dasar", "Eksplorasi Skill", "Ikut Project Mini"],
  })

  const interestIcons: Record<
    string,
    { icon: React.ReactNode; label: string }
  > = {
    engineer: {
      icon: <Cog className="w-6 h-6 text-primary" />,
      label: "Engineer",
    },
    designer: {
      icon: <Palette className="w-6 h-6 text-pink-500" />,
      label: "Designer",
    },
    cybersecurity: {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      label: "Cybersecurity",
    },
    developer: {
      icon: <Code className="w-6 h-6 text-blue-500" />,
      label: "Developer",
    },
    ai: {
      icon: <Cpu className="w-6 h-6 text-purple-500" />,
      label: "AI Specialist",
    },
  }


  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      if (parsedUser.assessmentResults) {
        setResults(parsedUser.assessmentResults)
      }
    }
  }, [])


  // if (!results) {
  //   return (
  //     <AuthGuard>
  //       <div className="min-h-screen flex items-center justify-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  //       </div>
  //     </AuthGuard>
  //   )
  // }
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <AuthGuard>
      <div className="p-5 gap-5 flex h-screen w-screen scrollbar-none overflow-hidden">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
        />
        <div className="flex flex-col w-full relative">
          {/* Results Content */}
          <div className="flex-1 h-full overflow-auto px-5">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 mb-5">

                {/* UMUM */}
                <div
                  className="bg-background backdrop-blur-xl
                  border-r border-white/30
                  rounded-3xl
                  shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]
                  p-6
                  transition-all duration-500"
                >
                  {/* Mingguan */}
                  <div
                    className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                      border-r border-white/30
                      rounded-3xl
                      shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]
                      p-6 mb-5
                      transition-all duration-500"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">Progress Learning Path</h3>
                    </div>

                    <div className="space-y-4">
                      {progressData.learningPaths.map((path, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border border-border bg-card/50"
                        >
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
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Overall Score */}
                    <div
                      className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
    border-r border-white/30
    rounded-3xl
    shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]
    p-6
    transition-all duration-500"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Skor Keseluruhan</h3>
                        <div className="text-4xl font-bold gradient-text mb-4">{results.overallScore}%</div>
                        <p className="text-muted-foreground">
                          {results.correctAnswers} dari {results.totalQuestions} jawaban benar
                        </p>
                      </div>
                    </div>

                    {/* Category Breakdown */}
                    <div
                      className="bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
                        border-r border-white/30
                        rounded-3xl
                        shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]
                        p-6
                        transition-all duration-500"
                    >
                      <h3 className="text-xl font-semibold mb-4">Breakdown Kemampuan</h3>
                      <div className="space-y-4">
                        {Object.entries(results.categoryScores).map(
                          ([category, score]: [string, any]) => (
                            <div key={category}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">{category}</span>
                                <span className="text-sm text-muted-foreground">
                                  {score.correct}/{score.total}
                                </span>
                              </div>
                              <Progress
                                value={
                                  score.total > 0
                                    ? (score.correct / score.total) * 100
                                    : 0
                                }
                                className="h-2"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>


                  {/* Career Recommendations */}
                  <FloatingCard delay={0.6} className="mb-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Rekomendasi Karier</h3>
                        <p className="text-muted-foreground">Berdasarkan hasil assessment Anda</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {results.recommendations.map((career: string, index: number) => (
                        <div
                          key={index}
                          className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                          onClick={() => router.push(`/career-mapper?career=${encodeURIComponent(career)}`)}
                        >
                          <h4 className="font-semibold mb-2">{career}</h4>
                          <p className="text-sm text-muted-foreground mb-3">Klik untuk melihat roadmap detail</p>
                          <div className="flex items-center text-primary text-sm">
                            <span>Lihat Roadmap</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </FloatingCard>

                  {/* Next Steps */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-6">
                      Langkah <GradientText>Selanjutnya</GradientText>
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="pulse-glow" asChild>
                        <Link href="/career-mapper">
                          <Target className="w-5 h-5 mr-2" />
                          Jelajahi AI Career Mapper
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href="/learning-path">
                          <BookOpen className="w-5 h-5 mr-2" />
                          Mulai Learning Path
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* PROFILE */}
                <div
                  className="relative rounded-3xl overflow-hidden shadow-[0_8px_10px_0_rgba(31,38,135,0.37)] 
                    bg-background transition-all duration-500"
                  style={{ height: "max-content", minHeight: "5%" }}
                >
                  {/* Background Foto (hanya 30% tinggi card) */}
                  <div className="absolute top-0 left-0 w-full h-[60%]">
                    <img
                      src="/nada_satya_maharani.jpg" // ganti dengan foto user/nada
                      alt="Profile Background"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient putih dari bawah foto ke atas */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                  </div>

                  {/* Konten utama */}
                  <div className="relative z-10 p-6 mt-[100%]">
                    <h1 className="text-xl font-bold mb-4 text-foreground">
                      Nada Satya Maharani
                    </h1>
                    <p className="font-normal text-sm mb-4 text-foreground">
                      Test test
                    </p>

                    {/* === Stats Bar (Streak, Gems, Badge, Interest) === */}
                    <div className="flex items-center gap-4 mb-4">
                      {/* Streak */}
                      <div className="flex items-center gap-1">
                        <img src="/icons/fire-on.png" alt="Streak" className="h-5" />
                        <span className="text-sm font-medium text-foreground">7</span>
                      </div>
                      {/* Interest Logo */}
                      <div className="ml-auto flex items-center gap-2">
                        {interestIcons[user?.interest || "engineer"]?.icon}
                        <span className="text-sm font-medium text-foreground">
                          {interestIcons[user?.interest || "engineer"]?.label}
                        </span>
                      </div>

                    </div>

                    <Button asChild className="w-full h-10 rounded-full bg-transparent" variant="outline">
                      <Link href="/profile/edit-profile">
                        {user?.hasProfile ? "Edit Profile" : "Lengkapi Profil"}
                      </Link>
                    </Button>

                    {/* Learning Paths Progress */}
                    {/* <FloatingCard delay={0.5} className="mt-6">
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
                    </FloatingCard> */}
                  </div>
                </div>



              </div>


            </div>
          </div>
        </div>
      </div>
    </AuthGuard >
  )
}
