"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, BookOpen, Play, CheckCircle, Clock, Target, Star, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { LearningModuleModal } from "@/components/learning-module-modal"

const learningPaths = {
  "Data Scientist": {
    title: "Data Scientist Learning Path",
    description: "Menjadi ahli dalam analisis data dan machine learning",
    totalModules: 15,
    estimatedTime: "12-18 bulan",
    difficulty: "Advanced",
    modules: [
      {
        id: 1,
        title: "Python Programming Fundamentals",
        description: "Pelajari dasar-dasar Python untuk data science",
        duration: "2 minggu",
        type: "Course",
        difficulty: "Beginner",
        completed: false,
        locked: false,
        content: {
          lessons: ["Variables & Data Types", "Control Flow", "Functions", "Object-Oriented Programming"],
          projects: ["Calculator App", "Data Processing Script"],
          resources: [
            { name: "Python.org Tutorial", url: "#", type: "Documentation" },
            { name: "Automate the Boring Stuff", url: "#", type: "Book" },
          ],
        },
      },
      {
        id: 2,
        title: "Statistics & Probability",
        description: "Konsep statistik yang essential untuk data science",
        duration: "3 minggu",
        type: "Theory",
        difficulty: "Intermediate",
        completed: false,
        locked: true,
        content: {
          lessons: [
            "Descriptive Statistics",
            "Probability Distributions",
            "Hypothesis Testing",
            "Correlation & Regression",
          ],
          projects: ["Statistical Analysis Report", "A/B Testing Simulation"],
          resources: [
            { name: "Khan Academy Statistics", url: "#", type: "Course" },
            { name: "Think Stats", url: "#", type: "Book" },
          ],
        },
      },
      {
        id: 3,
        title: "Data Manipulation with Pandas",
        description: "Master data manipulation menggunakan Pandas library",
        duration: "2 minggu",
        type: "Hands-on",
        difficulty: "Intermediate",
        completed: false,
        locked: true,
        content: {
          lessons: ["DataFrame Basics", "Data Cleaning", "Grouping & Aggregation", "Merging Data"],
          projects: ["Sales Data Analysis", "Customer Segmentation"],
          resources: [
            { name: "Pandas Documentation", url: "#", type: "Documentation" },
            { name: "Python for Data Analysis", url: "#", type: "Book" },
          ],
        },
      },
    ],
  },
  "Software Engineer": {
    title: "Software Engineer Learning Path",
    description: "Menjadi full-stack developer yang handal",
    totalModules: 12,
    estimatedTime: "8-12 bulan",
    difficulty: "Intermediate",
    modules: [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        description: "Pelajari dasar-dasar JavaScript modern",
        duration: "3 minggu",
        type: "Course",
        difficulty: "Beginner",
        completed: false,
        locked: false,
        content: {
          lessons: ["ES6+ Features", "DOM Manipulation", "Async Programming", "Error Handling"],
          projects: ["Todo App", "Weather App"],
          resources: [
            { name: "MDN JavaScript Guide", url: "#", type: "Documentation" },
            { name: "JavaScript.info", url: "#", type: "Tutorial" },
          ],
        },
      },
      {
        id: 2,
        title: "React.js Development",
        description: "Build modern web applications dengan React",
        duration: "4 minggu",
        type: "Framework",
        difficulty: "Intermediate",
        completed: false,
        locked: true,
        content: {
          lessons: ["Components & JSX", "State & Props", "Hooks", "Context API"],
          projects: ["E-commerce App", "Social Media Dashboard"],
          resources: [
            { name: "React Documentation", url: "#", type: "Documentation" },
            { name: "React Tutorial", url: "#", type: "Course" },
          ],
        },
      },
    ],
  },
  "Product Manager": {
    title: "Product Manager Learning Path",
    description: "Menjadi product manager yang strategic dan data-driven",
    totalModules: 10,
    estimatedTime: "6-10 bulan",
    difficulty: "Intermediate",
    modules: [
      {
        id: 1,
        title: "Product Management Fundamentals",
        description: "Dasar-dasar product management dan strategy",
        duration: "2 minggu",
        type: "Theory",
        difficulty: "Beginner",
        completed: false,
        locked: false,
        content: {
          lessons: ["Product Lifecycle", "Market Research", "User Personas", "Product Strategy"],
          projects: ["Product Requirements Document", "Market Analysis Report"],
          resources: [
            { name: "Product Management Course", url: "#", type: "Course" },
            { name: "Inspired by Marty Cagan", url: "#", type: "Book" },
          ],
        },
      },
    ],
  },
}

export default function LearningPathPage() {
  const [user, setUser] = useState<any>(null)
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [selectedModule, setSelectedModule] = useState<any>(null)
  const [showModuleModal, setShowModuleModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Check if there's a specific career from URL params
    const careerParam = searchParams.get("career")
    if (careerParam && learningPaths[careerParam as keyof typeof learningPaths]) {
      setSelectedPath(careerParam)
    }
  }, [searchParams])

  const getCurrentPath = () => {
    if (!selectedPath) return null
    return learningPaths[selectedPath as keyof typeof learningPaths]
  }

  const getPathProgress = (path: any) => {
    const completedModules = path.modules.filter((module: any) => module.completed).length
    return (completedModules / path.modules.length) * 100
  }

  const handleModuleClick = (module: any) => {
    if (!module.locked) {
      setSelectedModule(module)
      setShowModuleModal(true)
    }
  }

  const handleModuleComplete = (moduleId: number) => {
    if (!selectedPath) return

    // Update module completion status
    const pathData = learningPaths[selectedPath as keyof typeof learningPaths]
    const moduleIndex = pathData.modules.findIndex((m) => m.id === moduleId)
    if (moduleIndex !== -1) {
      pathData.modules[moduleIndex].completed = true

      // Unlock next module
      if (moduleIndex + 1 < pathData.modules.length) {
        pathData.modules[moduleIndex + 1].locked = false
      }

      // Save to localStorage
      const userData = JSON.parse(localStorage.getItem("user") || "{}")
      userData.learningProgress = userData.learningProgress || {}
      userData.learningProgress[selectedPath] = pathData
      localStorage.setItem("user", JSON.stringify(userData))

      setShowModuleModal(false)
    }
  }

  const filteredPaths = Object.entries(learningPaths).filter(([name, path]) => {
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = !filterDifficulty || path.difficulty === filterDifficulty
    return matchesSearch && matchesDifficulty
  })

  if (selectedPath) {
    const currentPath = getCurrentPath()
    if (!currentPath) return null

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
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => setSelectedPath(null)}>
                  Kembali ke Learning Paths
                </Button>
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Dashboard
                </Button>
              </div>
            </div>
          </nav>

          {/* Learning Path Content */}
          <div className="relative z-10 px-6 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Path Header */}
              <FloatingCard delay={0.2} className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">
                      <GradientText>{currentPath.title}</GradientText>
                    </h1>
                    <p className="text-muted-foreground mb-4">{currentPath.description}</p>
                    <div className="flex items-center space-x-4">
                      <Badge>{currentPath.difficulty}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {currentPath.estimatedTime}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {currentPath.modules.filter((m: any) => m.completed).length}/{currentPath.totalModules} modul
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress Keseluruhan</span>
                    <span className="text-sm text-muted-foreground">{Math.round(getPathProgress(currentPath))}%</span>
                  </div>
                  <Progress value={getPathProgress(currentPath)} className="h-3" />
                </div>
              </FloatingCard>

              {/* Modules List */}
              <div className="space-y-4">
                {currentPath.modules.map((module: any, index: number) => (
                  <FloatingCard
                    key={module.id}
                    delay={0.2 + index * 0.1}
                    className={`cursor-pointer transition-all ${
                      module.locked ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-lg"
                    }`}
                    onClick={() => handleModuleClick(module)}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          module.completed
                            ? "bg-green-500"
                            : module.locked
                              ? "bg-muted"
                              : "bg-gradient-to-br from-primary to-accent"
                        }`}
                      >
                        {module.completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : module.locked ? (
                          <div className="w-6 h-6 bg-muted-foreground rounded-full" />
                        ) : (
                          <Play className="w-6 h-6 text-white" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold">{module.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {module.type}
                          </Badge>
                          <Badge
                            className={`text-xs ${
                              module.difficulty === "Beginner"
                                ? "bg-green-500/20 text-green-400"
                                : module.difficulty === "Intermediate"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {module.difficulty}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{module.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {module.duration}
                          </span>
                          {module.completed && (
                            <span className="flex items-center text-green-400">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Selesai
                            </span>
                          )}
                          {module.locked && (
                            <span className="text-muted-foreground">Terkunci - Selesaikan modul sebelumnya</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {selectedModule && (
          <LearningModuleModal
            isOpen={showModuleModal}
            onClose={() => setShowModuleModal(false)}
            module={selectedModule}
            onComplete={handleModuleComplete}
          />
        )}
      </AuthGuard>
    )
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

        {/* Learning Paths Content */}
        <div className="relative z-10 px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                <GradientText>Learning Paths</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Pilih jalur pembelajaran yang sesuai dengan tujuan karier Anda dan mulai perjalanan menuju keahlian baru
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8">
              <FloatingCard delay={0.2}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari learning path..."
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
                  </div>
                </div>
              </FloatingCard>
            </div>

            {/* Learning Paths Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaths.map(([pathName, path], index) => (
                <FloatingCard
                  key={pathName}
                  delay={0.2 + index * 0.1}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedPath(pathName)}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{path.title}</h3>
                      <Badge className="mt-1">{path.difficulty}</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{path.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Modul:</span>
                      <span className="font-medium">{path.totalModules} modul</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Estimasi:</span>
                      <span className="font-medium">{path.estimatedTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Progress:</span>
                      <span className="font-medium">{Math.round(getPathProgress(path))}%</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Progress value={getPathProgress(path)} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-primary">
                      <Target className="w-4 h-4 mr-1" />
                      <span className="text-sm">Mulai Belajar</span>
                    </div>
                    {getPathProgress(path) > 0 && (
                      <div className="flex items-center text-green-400">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm">Dalam Progress</span>
                      </div>
                    )}
                  </div>
                </FloatingCard>
              ))}
            </div>

            {filteredPaths.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Tidak ada learning path yang sesuai dengan filter Anda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
