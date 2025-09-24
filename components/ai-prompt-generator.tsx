"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Brain, Sparkles, ArrowRight, Briefcase, TrendingUp, Clock, DollarSign, Lock, User } from "lucide-react"
import Link from "next/link"

interface CareerRecommendation {
  id: string
  title: string
  description: string
  salaryRange: string
  growthRate: string
  timeToLearn: string
  skills: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

interface AIPromptGeneratorProps {
  isAuthenticated?: boolean
}

export function AIPromptGenerator({ isAuthenticated = false }: AIPromptGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([])
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null)
  const [showRoadmap, setShowRoadmap] = useState(false)

  // Mock AI response - in real app this would call an AI API
  const generateRecommendations = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock recommendations based on prompt
    const mockRecommendations: CareerRecommendation[] = [
      {
        id: "1",
        title: "Full Stack Developer",
        description:
          "Mengembangkan aplikasi web end-to-end dengan teknologi modern seperti React, Node.js, dan database.",
        salaryRange: "Rp 8-25 juta/bulan",
        growthRate: "+22% per tahun",
        timeToLearn: "6-12 bulan",
        skills: ["JavaScript", "React", "Node.js", "Database", "Git"],
        difficulty: "Intermediate",
      },
      {
        id: "2",
        title: "Data Scientist",
        description:
          "Menganalisis data besar untuk menghasilkan insights bisnis menggunakan machine learning dan statistik.",
        salaryRange: "Rp 12-35 juta/bulan",
        growthRate: "+31% per tahun",
        timeToLearn: "8-18 bulan",
        skills: ["Python", "Machine Learning", "Statistics", "SQL", "Tableau"],
        difficulty: "Advanced",
      },
      {
        id: "3",
        title: "UI/UX Designer",
        description: "Merancang pengalaman pengguna yang intuitif dan menarik untuk aplikasi dan website.",
        salaryRange: "Rp 6-20 juta/bulan",
        growthRate: "+18% per tahun",
        timeToLearn: "4-8 bulan",
        skills: ["Figma", "Design Thinking", "Prototyping", "User Research", "Adobe Creative"],
        difficulty: "Beginner",
      },
    ]

    setRecommendations(mockRecommendations)
    setIsLoading(false)
  }

  const handleCareerClick = (career: CareerRecommendation) => {
    setSelectedCareer(career)
    if (isAuthenticated) {
      setShowRoadmap(true)
    }
  }

  const mockRoadmap = [
    {
      phase: "Foundation",
      duration: "1-2 bulan",
      topics: ["HTML/CSS Basics", "JavaScript Fundamentals", "Git Version Control"],
    },
    {
      phase: "Frontend Development",
      duration: "2-3 bulan",
      topics: ["React.js", "State Management", "Responsive Design"],
    },
    { phase: "Backend Development", duration: "2-3 bulan", topics: ["Node.js", "Express.js", "Database Design"] },
    { phase: "Advanced Topics", duration: "2-4 bulan", topics: ["Testing", "Deployment", "Performance Optimization"] },
  ]

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <GradientText>AI Career Mapper</GradientText> Generator
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ceritakan minat dan passion kamu, biarkan AI merekomendasikan jalur karier yang tepat untukmu.
          </p>
        </div>

        <FloatingCard className="max-w-4xl mx-auto mb-12">
          <div className="space-y-6">
            {/* Prompt Input */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-medium">Ceritakan tentang minat dan passion kamu:</span>
              </div>
              <div className="flex space-x-4">
                <Input
                  placeholder="Contoh: Saya suka coding, problem solving, dan tertarik dengan teknologi web..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1 bg-background/50 border-border/50 focus:border-primary"
                />
                <Button
                  onClick={generateRecommendations}
                  disabled={!prompt.trim() || isLoading}
                  className="pulse-glow btn-hover-lift"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Sample Prompts */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Contoh prompt:</span>
              {[
                "Suka coding dan teknologi",
                "Tertarik dengan data dan analisis",
                "Passion di design dan kreativitas",
                "Ingin jadi entrepreneur",
              ].map((sample) => (
                <Badge
                  key={sample}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => setPrompt(sample)}
                >
                  {sample}
                </Badge>
              ))}
            </div>
          </div>
        </FloatingCard>

        {/* Career Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Rekomendasi Karier untuk Kamu</h3>
              <p className="text-muted-foreground">Klik pada karier yang menarik untuk melihat roadmap pembelajaran</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((career, index) => (
                <FloatingCard
                  key={career.id}
                  delay={index * 0.2}
                  className="cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handleCareerClick(career)}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">{career.title}</h4>
                      </div>
                      <Badge
                        variant={
                          career.difficulty === "Beginner"
                            ? "default"
                            : career.difficulty === "Intermediate"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {career.difficulty}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{career.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span>{career.salaryRange}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span>{career.growthRate}</span>
                      </div>
                      <div className="flex items-center space-x-2 col-span-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>Waktu belajar: {career.timeToLearn}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium">Skills yang dibutuhkan:</span>
                      <div className="flex flex-wrap gap-1">
                        {career.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-sm text-muted-foreground">Klik untuk roadmap</span>
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
        )}

        {/* Roadmap Modal/Section */}
        {selectedCareer && showRoadmap && isAuthenticated && (
          <FloatingCard className="mt-8">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  Roadmap Pembelajaran: <GradientText>{selectedCareer.title}</GradientText>
                </h3>
                <p className="text-muted-foreground">Panduan step-by-step untuk mencapai karier impianmu</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockRoadmap.map((phase, index) => (
                  <Card key={index} className="bg-background/50 border-border/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <CardTitle className="text-lg">{phase.phase}</CardTitle>
                      </div>
                      <CardDescription>{phase.duration}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="text-sm text-muted-foreground flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button size="lg" className="pulse-glow btn-hover-lift" asChild>
                  <Link href="/learning-path">
                    Mulai Learning Path
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </FloatingCard>
        )}

        {/* Login Required Message */}
        {selectedCareer && !isAuthenticated && (
          <FloatingCard className="mt-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                Roadmap untuk <GradientText>{selectedCareer.title}</GradientText>
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Untuk melihat roadmap pembelajaran yang detail dan mengakses fitur AI Career Mapper lengkap, silakan
                daftar atau masuk ke akun kamu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="pulse-glow btn-hover-lift" asChild>
                  <Link href="/register">
                    <User className="mr-2 w-5 h-5" />
                    Daftar Gratis
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="btn-hover-lift bg-transparent" asChild>
                  <Link href="/login">Masuk</Link>
                </Button>
              </div>
            </div>
          </FloatingCard>
        )}
      </div>
    </section>
  )
}
