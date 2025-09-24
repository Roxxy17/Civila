"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, Clock, TrendingUp, DollarSign, BookOpen, CheckCircle, Play, ExternalLink, Star, Target } from "lucide-react"
import { useRouter } from "next/navigation"

interface CareerRoadmapModalProps {
  isOpen: boolean
  onClose: () => void
  career: string
  careerData: any
}

const roadmapData: { [key: string]: any } = {
  "Data Scientist": {
    phases: [
      {
        title: "Foundation (Bulan 1-3)",
        duration: "3 bulan",
        modules: [
          { name: "Python Basics", duration: "2 minggu", completed: false },
          { name: "Statistics & Probability", duration: "3 minggu", completed: false },
          { name: "Data Manipulation (Pandas)", duration: "2 minggu", completed: false },
          { name: "Data Visualization", duration: "2 minggu", completed: false },
        ],
      },
      {
        title: "Intermediate (Bulan 4-8)",
        duration: "5 bulan",
        modules: [
          { name: "Machine Learning Basics", duration: "4 minggu", completed: false },
          { name: "SQL & Databases", duration: "3 minggu", completed: false },
          { name: "Feature Engineering", duration: "3 minggu", completed: false },
          { name: "Model Evaluation", duration: "2 minggu", completed: false },
          { name: "Deep Learning Intro", duration: "4 minggu", completed: false },
        ],
      },
      {
        title: "Advanced (Bulan 9-12)",
        duration: "4 bulan",
        modules: [
          { name: "Advanced ML Algorithms", duration: "4 minggu", completed: false },
          { name: "Big Data Tools", duration: "3 minggu", completed: false },
          { name: "MLOps & Deployment", duration: "4 minggu", completed: false },
          { name: "Portfolio Projects", duration: "5 minggu", completed: false },
        ],
      },
    ],
    resources: [
      { name: "Python for Data Science", type: "Course", platform: "Coursera", url: "#" },
      { name: "Kaggle Learn", type: "Practice", platform: "Kaggle", url: "#" },
      { name: "Hands-On Machine Learning", type: "Book", platform: "O'Reilly", url: "#" },
    ],
  },
  "Software Engineer": {
    phases: [
      {
        title: "Foundation (Bulan 1-2)",
        duration: "2 bulan",
        modules: [
          { name: "JavaScript Fundamentals", duration: "3 minggu", completed: false },
          { name: "HTML & CSS", duration: "2 minggu", completed: false },
          { name: "Git & Version Control", duration: "1 minggu", completed: false },
          { name: "Basic Algorithms", duration: "2 minggu", completed: false },
        ],
      },
      {
        title: "Frontend Development (Bulan 3-5)",
        duration: "3 bulan",
        modules: [
          { name: "React.js", duration: "4 minggu", completed: false },
          { name: "State Management", duration: "2 minggu", completed: false },
          { name: "CSS Frameworks", duration: "2 minggu", completed: false },
          { name: "Frontend Projects", duration: "4 minggu", completed: false },
        ],
      },
      {
        title: "Backend & Full Stack (Bulan 6-8)",
        duration: "3 bulan",
        modules: [
          { name: "Node.js & Express", duration: "3 minggu", completed: false },
          { name: "Database Design", duration: "2 minggu", completed: false },
          { name: "API Development", duration: "3 minggu", completed: false },
          { name: "Full Stack Projects", duration: "4 minggu", completed: false },
        ],
      },
    ],
    resources: [
      { name: "The Complete Web Developer", type: "Course", platform: "Udemy", url: "#" },
      { name: "freeCodeCamp", type: "Practice", platform: "freeCodeCamp", url: "#" },
      { name: "MDN Web Docs", type: "Documentation", platform: "Mozilla", url: "#" },
    ],
  },
  "Product Manager": {
    phases: [
      {
        title: "Product Fundamentals (Bulan 1-2)",
        duration: "2 bulan",
        modules: [
          { name: "Product Management Basics", duration: "2 minggu", completed: false },
          { name: "User Research Methods", duration: "2 minggu", completed: false },
          { name: "Market Analysis", duration: "2 minggu", completed: false },
          { name: "Product Strategy", duration: "2 minggu", completed: false },
        ],
      },
      {
        title: "Execution & Analytics (Bulan 3-5)",
        duration: "3 bulan",
        modules: [
          { name: "Agile & Scrum", duration: "2 minggu", completed: false },
          { name: "Product Analytics", duration: "3 minggu", completed: false },
          { name: "A/B Testing", duration: "2 minggu", completed: false },
          { name: "Roadmap Planning", duration: "3 minggu", completed: false },
          { name: "Stakeholder Management", duration: "2 minggu", completed: false },
        ],
      },
      {
        title: "Leadership & Growth (Bulan 6-8)",
        duration: "3 bulan",
        modules: [
          { name: "Product Leadership", duration: "3 minggu", completed: false },
          { name: "Growth Strategies", duration: "3 minggu", completed: false },
          { name: "Product Launch", duration: "2 minggu", completed: false },
          { name: "Case Study Projects", duration: "4 minggu", completed: false },
        ],
      },
    ],
    resources: [
      { name: "Product Management Fundamentals", type: "Course", platform: "Coursera", url: "#" },
      { name: "Product Hunt", type: "Community", platform: "Product Hunt", url: "#" },
      { name: "Inspired by Marty Cagan", type: "Book", platform: "Amazon", url: "#" },
    ],
  },
}

export function CareerRoadmapModal({ isOpen, onClose, career, careerData }: CareerRoadmapModalProps) {
  const [activePhase, setActivePhase] = useState(0)
  const router = useRouter()

  if (!isOpen) return null

  const roadmap = roadmapData[career] || { phases: [], resources: [] }

  const getTotalModules = () => {
    return roadmap.phases.reduce((total: number, phase: any) => total + phase.modules.length, 0)
  }

  const getCompletedModules = () => {
    return roadmap.phases.reduce(
      (total: number, phase: any) => total + phase.modules.filter((module: any) => module.completed).length,
      0,
    )
  }

  const handleStartLearning = () => {
    onClose()
    router.push(`/learning-path?career=${encodeURIComponent(career)}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <FloatingCard className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  <GradientText>{career}</GradientText> Roadmap
                </h2>
                <p className="text-muted-foreground">{careerData.description}</p>
              </div>
            </div>

            {/* Career Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-3 bg-muted/20 rounded-lg text-center">
                <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Gaji</p>
                <p className="font-semibold text-sm">{careerData.salary}</p>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg text-center">
                <TrendingUp className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Pertumbuhan</p>
                <p className="font-semibold text-sm">{careerData.growth}</p>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg text-center">
                <Clock className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Durasi</p>
                <p className="font-semibold text-sm">{careerData.timeToMaster}</p>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg text-center">
                <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="font-semibold text-sm">{careerData.difficulty}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress Keseluruhan</span>
                <span className="text-sm text-muted-foreground">
                  {getCompletedModules()}/{getTotalModules()} modul
                </span>
              </div>
              <Progress value={(getCompletedModules() / getTotalModules()) * 100} className="h-2" />
            </div>
          </div>

          {/* Roadmap Phases */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Roadmap Pembelajaran</h3>

            {/* Phase Tabs */}
            <div className="flex space-x-2 mb-6 overflow-x-auto">
              {roadmap.phases.map((phase: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setActivePhase(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activePhase === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {phase.title}
                </button>
              ))}
            </div>

            {/* Active Phase Content */}
            {roadmap.phases[activePhase] && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">{roadmap.phases[activePhase].title}</h4>
                  <Badge variant="outline">{roadmap.phases[activePhase].duration}</Badge>
                </div>

                <div className="grid gap-3">
                  {roadmap.phases[activePhase].modules.map((module: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            module.completed ? "bg-green-500" : "bg-muted border-2 border-muted-foreground"
                          }`}
                        >
                          {module.completed && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <p className="font-medium">{module.name}</p>
                          <p className="text-sm text-muted-foreground">{module.duration}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resources */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Sumber Belajar Rekomendasi</h3>
            <div className="grid gap-3">
              {roadmap.resources.map((resource: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{resource.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {resource.type} • {resource.platform}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Skill yang Akan Dikuasai</h3>
            <div className="flex flex-wrap gap-2">
              {careerData.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleStartLearning} className="flex-1 pulse-glow" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Mulai Learning Path
            </Button>
            <Button variant="outline" size="lg" className="flex-1 bg-transparent">
              <BookOpen className="w-5 h-5 mr-2" />
              Simpan ke Wishlist
            </Button>
          </div>
        </FloatingCard>
      </div>
    </div>
  )
}
