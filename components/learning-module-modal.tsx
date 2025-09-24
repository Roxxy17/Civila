"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { X, BookOpen, Code, ExternalLink, CheckCircle, Play, Clock, Target } from "lucide-react"

interface LearningModuleModalProps {
  isOpen: boolean
  onClose: () => void
  module: any
  onComplete: (moduleId: number) => void
}

export function LearningModuleModal({ isOpen, onClose, module, onComplete }: LearningModuleModalProps) {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [lessonProgress, setLessonProgress] = useState<{ [key: number]: boolean }>({})
  const [projectProgress, setProjectProgress] = useState<{ [key: number]: boolean }>({})

  if (!isOpen || !module) return null

  const handleLessonComplete = (lessonIndex: number) => {
    setLessonProgress((prev) => ({ ...prev, [lessonIndex]: true }))
  }

  const handleProjectComplete = (projectIndex: number) => {
    setProjectProgress((prev) => ({ ...prev, [projectIndex]: true }))
  }

  const getOverallProgress = () => {
    const totalItems = module.content.lessons.length + module.content.projects.length
    const completedLessons = Object.values(lessonProgress).filter(Boolean).length
    const completedProjects = Object.values(projectProgress).filter(Boolean).length
    return ((completedLessons + completedProjects) / totalItems) * 100
  }

  const canCompleteModule = () => {
    const allLessonsCompleted = module.content.lessons.every((_: any, index: number) => lessonProgress[index])
    const allProjectsCompleted = module.content.projects.every((_: any, index: number) => projectProgress[index])
    return allLessonsCompleted && allProjectsCompleted
  }

  const handleCompleteModule = () => {
    if (canCompleteModule()) {
      onComplete(module.id)
    }
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
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  <GradientText>{module.title}</GradientText>
                </h2>
                <p className="text-muted-foreground">{module.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <Badge>{module.type}</Badge>
              <Badge
                className={
                  module.difficulty === "Beginner"
                    ? "bg-green-500/20 text-green-400"
                    : module.difficulty === "Intermediate"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                }
              >
                {module.difficulty}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {module.duration}
              </span>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress Modul</span>
                <span className="text-sm text-muted-foreground">{Math.round(getOverallProgress())}%</span>
              </div>
              <Progress value={getOverallProgress()} className="h-2" />
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="lessons" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="lessons" className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Materi Pembelajaran</h3>
              {module.content.lessons.map((lesson: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        lessonProgress[index] ? "bg-green-500" : "bg-muted border-2 border-muted-foreground"
                      }`}
                    >
                      {lessonProgress[index] && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <p className="font-medium">{lesson}</p>
                      <p className="text-sm text-muted-foreground">Lesson {index + 1}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={lessonProgress[index] ? "outline" : "default"}
                    onClick={() => handleLessonComplete(index)}
                  >
                    {lessonProgress[index] ? <CheckCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Hands-on Projects</h3>
              {module.content.projects.map((project: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        projectProgress[index] ? "bg-green-500" : "bg-muted border-2 border-muted-foreground"
                      }`}
                    >
                      {projectProgress[index] && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <p className="font-medium">{project}</p>
                      <p className="text-sm text-muted-foreground">Project {index + 1}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={projectProgress[index] ? "outline" : "default"}
                    onClick={() => handleProjectComplete(index)}
                  >
                    {projectProgress[index] ? <CheckCircle className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Sumber Belajar</h3>
              {module.content.resources.map((resource: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{resource.name}</p>
                      <p className="text-sm text-muted-foreground">{resource.type}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleCompleteModule}
              disabled={!canCompleteModule()}
              className="flex-1 pulse-glow"
              size="lg"
            >
              <Target className="w-5 h-5 mr-2" />
              {canCompleteModule() ? "Selesaikan Modul" : "Selesaikan Semua Materi Dulu"}
            </Button>
            <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={onClose}>
              Lanjutkan Nanti
            </Button>
          </div>
        </FloatingCard>
      </div>
    </div>
  )
}
