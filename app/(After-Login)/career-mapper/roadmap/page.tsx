"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

// Components
import { AuthGuard } from "@/components/auth-guard"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"

// Icons
import { 
  CheckCircle2, ArrowLeft, Clock, Target, BookOpen, 
  AlertCircle, Calendar, PlayCircle, Code, Database, 
  Palette, Shield, Monitor, Globe, Brain, BarChart3,
  GitBranch, ExternalLink, Zap, Settings, TrendingUp,
  Map, X, Sparkles, Trophy
} from "lucide-react"

// Types
interface RoadmapNode {
  id: string
  name: string
  description: string
  category: 'foundation' | 'core' | 'advanced' | 'specialization'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  timeEstimate: string
  progress?: number
  color: string
  resources: Array<{ name: string; type: string }>
}

interface Milestone {
  month: number
  achievement: string
  skills: string[]
}

interface CareerData {
  careerName: string
  level: string
  estimatedLearningTime: string
  salaryRange: string
  aiScore: number
  learningMilestones: Milestone[]
  requiredSkills: string[]
  tools: string[]
  careerPath: string[]
}

// Main Component
export default function RoadmapPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const careerName = searchParams.get('career')
  
  // States
  const [careerData, setCareerData] = useState<CareerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null)
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'roadmap' | 'timeline'>('roadmap')

  // Effects
  useEffect(() => {
    if (!careerName) {
      router.push('/career-mapper')
      return
    }
    fetchCareerData()
  }, [careerName, router])

  // Handlers
  const fetchCareerData = async () => {
    try {
      setError(null)
      const res = await fetch("/api/CareerRecommendation")
      
      if (!res.ok) throw new Error('Failed to fetch career data')
      
      const data = await res.json()
      const career = data.recommendations?.find((rec: any) => 
        rec.careerName === careerName
      )
      
      if (career) {
        setCareerData(career)
      } else {
        setError("Karier tidak ditemukan")
      }
    } catch (err) {
      setError("Gagal memuat data karier")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleNodeComplete = (nodeId: string) => {
    setCompletedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const handleBackToMapper = () => router.push('/career-mapper')

  // Early returns
  if (loading) return <LoadingState isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded} />
  if (error || !careerData) return <ErrorState error={error} onBack={handleBackToMapper} isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded} />

  // Transform data
  const roadmapNodes = transformToRoadmapNodes(careerData)
  const progressPercentage = Math.round((completedNodes.size / roadmapNodes.length) * 100)

  return (
    <AuthGuard>
      <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <RoadmapHeader 
            careerData={careerData}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onBack={handleBackToMapper}
            completedNodes={completedNodes}
            roadmapNodes={roadmapNodes}
            progressPercentage={progressPercentage}
          />

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {viewMode === 'roadmap' ? (
                <InteractiveRoadmap 
                  nodes={roadmapNodes}
                  completedNodes={completedNodes}
                  onNodeClick={setSelectedNode}
                  onToggleComplete={toggleNodeComplete}
                />
              ) : (
                <TimelineView 
                  milestones={careerData.learningMilestones}
                  completedNodes={completedNodes}
                  onToggleComplete={toggleNodeComplete}
                />
              )}

              {/* Additional Info Cards */}
              <AdditionalInfoCards careerData={careerData} />
            </div>
          </div>
        </div>

        {/* Node Detail Modal */}
        <AnimatePresence>
          {selectedNode && (
            <NodeDetailModal 
              node={selectedNode}
              isCompleted={completedNodes.has(selectedNode.id)}
              onClose={() => setSelectedNode(null)}
              onToggleComplete={() => toggleNodeComplete(selectedNode.id)}
            />
          )}
        </AnimatePresence>
      </div>
    </AuthGuard>
  )
}

// Loading State Component
function LoadingState({ isSidebarExpanded, setIsSidebarExpanded }: any) {
  return (
    <AuthGuard>
      <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-medium mb-2">Loading Roadmap</h3>
            <p className="text-muted-foreground">Preparing your learning journey...</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

// Error State Component
function ErrorState({ error, onBack, isSidebarExpanded, setIsSidebarExpanded }: any) {
  return (
    <AuthGuard>
      <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggleExpanded={() => setIsSidebarExpanded(prev => !prev)}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Oops! Something went wrong</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={onBack} size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Career Mapper
            </Button>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

// Header Component
function RoadmapHeader({ 
  careerData, 
  viewMode, 
  setViewMode, 
  onBack, 
  completedNodes, 
  roadmapNodes, 
  progressPercentage 
}: any) {
  return (
    <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="px-6 py-4">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Map className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                <GradientText>{careerData.careerName}</GradientText> Roadmap
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Your personalized learning path to success
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            
            <Badge variant="outline" className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
              {careerData.level}
            </Badge>
            <Badge variant="outline" className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-300">
              {careerData.estimatedLearningTime}
            </Badge>
          </div>
        </div>

        {/* Progress Overview */}
        <ProgressOverview 
          completedNodes={completedNodes}
          roadmapNodes={roadmapNodes}
          careerData={careerData}
          progressPercentage={progressPercentage}
        />
      </div>
    </div>
  )
}

// View Mode Toggle Component
function ViewModeToggle({ viewMode, setViewMode }: any) {
  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
      <button
        onClick={() => setViewMode('roadmap')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          viewMode === 'roadmap' 
            ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
        }`}
      >
        <GitBranch className="w-4 h-4 mr-1.5 inline" />
        Roadmap
      </button>
      <button
        onClick={() => setViewMode('timeline')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          viewMode === 'timeline' 
            ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
        }`}
      >
        <Calendar className="w-4 h-4 mr-1.5 inline" />
        Timeline
      </button>
    </div>
  )
}

// Progress Overview Component
function ProgressOverview({ completedNodes, roadmapNodes, careerData, progressPercentage }: any) {
  const stats = [
    { label: 'Completed', value: completedNodes.size, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Total Skills', value: roadmapNodes.length, color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Salary Range', value: careerData.salaryRange, color: 'text-green-600 dark:text-green-400' },
    { label: 'AI Match', value: `${careerData.aiScore}%`, color: 'text-orange-600 dark:text-orange-400' },
  ]

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className={`${stat.color.replace('600', '500').replace('400', '400')} text-xs`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Learning Progress</span>
          <span className="text-sm text-slate-600 dark:text-slate-400">{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2 bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  )
}

// Interactive Roadmap Component
function InteractiveRoadmap({ nodes, completedNodes, onNodeClick, onToggleComplete }: any) {
  const layers = [
    { key: 'foundation', title: 'Foundation', description: 'Building blocks and core concepts', color: 'from-blue-500 to-cyan-500' },
    { key: 'core', title: 'Core Skills', description: 'Essential skills and practical knowledge', color: 'from-purple-500 to-pink-500' },
    { key: 'advanced', title: 'Advanced Topics', description: 'Specialized knowledge and expert skills', color: 'from-orange-500 to-red-500' },
    { key: 'specialization', title: 'Specialization', description: 'Expert-level mastery and niche skills', color: 'from-green-500 to-emerald-500' },
  ]

  return (
    <div className="relative">
      {/* Background Grid */}
      <BackgroundGrid />

      {/* Roadmap Flow */}
      <div className="relative z-10 space-y-16">
        {layers.map((layer) => (
          <RoadmapLayer
            key={layer.key}
            title={layer.title}
            description={layer.description}
            nodes={nodes.filter((node: any) => node.category === layer.key)}
            completedNodes={completedNodes}
            onNodeClick={onNodeClick}
            onToggleComplete={onToggleComplete}
            color={layer.color}
          />
        ))}
      </div>
    </div>
  )
}

// Background Grid Component
function BackgroundGrid() {
  return (
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" className="h-full w-full">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

// Roadmap Layer Component
function RoadmapLayer({ title, description, nodes, completedNodes, onNodeClick, onToggleComplete, color }: any) {
  if (!nodes || nodes.length === 0) return null

  return (
    <div className="space-y-6">
      {/* Layer Header */}
      <div className="text-center">
        <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${color} text-white px-6 py-3 rounded-2xl shadow-lg`}>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">{description}</p>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {nodes.map((node: any, index: number) => (
          <RoadmapNode
            key={node.id}
            node={node}
            isCompleted={completedNodes.has(node.id)}
            onNodeClick={onNodeClick}
            onToggleComplete={onToggleComplete}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  )
}

// Individual Roadmap Node Component
function RoadmapNode({ node, isCompleted, onNodeClick, onToggleComplete, delay }: any) {
  const IconComponent = getSkillIcon(node.name)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <Card 
        className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
          isCompleted 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 shadow-lg' 
            : 'hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg'
        }`}
        onClick={() => onNodeClick(node)}
      >
        <div className="space-y-3">
          {/* Node Header */}
          <div className="flex items-start justify-between">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
              isCompleted 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
            }`}>
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <IconComponent className="w-6 h-6" />
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleComplete(node.id)
              }}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isCompleted 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-slate-300 dark:border-slate-600 hover:border-green-400'
              }`}
            >
              {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
            </button>
          </div>

          {/* Node Content */}
          <div>
            <h3 className={`font-semibold text-sm mb-2 group-hover:text-blue-600 transition-colors ${
              isCompleted ? 'text-green-800 dark:text-green-200' : 'text-slate-800 dark:text-slate-200'
            }`}>
              {node.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`text-xs ${getDifficultyColor(node.difficulty)}`}>
                {node.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {node.timeEstimate}
              </Badge>
            </div>
            
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
              {node.description}
            </p>
          </div>

          {/* Progress Indicator */}
          {node.progress && node.progress > 0 && node.progress < 100 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Progress</span>
                <span>{node.progress}%</span>
              </div>
              <Progress value={node.progress} className="h-1" />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

// Timeline View Component
function TimelineView({ milestones, completedNodes, onToggleComplete }: any) {
  if (!milestones || milestones.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">No Timeline Available</h3>
        <p className="text-slate-500 dark:text-slate-500">Timeline data is not available for this career path.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Learning Timeline</h2>
        <p className="text-slate-600 dark:text-slate-400">Your month-by-month learning journey</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {milestones.map((milestone: Milestone, index: number) => (
            <TimelineItem
              key={index}
              milestone={milestone}
              index={index}
              completedNodes={completedNodes}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Timeline Item Component
function TimelineItem({ milestone, index, completedNodes, onToggleComplete }: any) {
  const completedSkills = milestone.skills?.filter((_: any, idx: number) => 
    completedNodes.has(`${milestone.month}-${idx}`)).length || 0
  const totalSkills = milestone.skills?.length || 0
  const progressPercent = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      className="relative flex items-start gap-6"
    >
      {/* Timeline Dot */}
      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
        {milestone.month}M
      </div>

      {/* Content */}
      <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              {milestone.achievement}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>Month {milestone.month}</span>
            </div>
          </div>

          {/* Skills Grid */}
          {milestone.skills && milestone.skills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {milestone.skills.map((skill: string, skillIndex: number) => {
                const skillId = `${milestone.month}-${skillIndex}`
                const isCompleted = completedNodes.has(skillId)
                
                return (
                  <div
                    key={skillIndex}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      isCompleted 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                    onClick={() => onToggleComplete(skillId)}
                  >
                    <button
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isCompleted 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-slate-300 dark:border-slate-600 hover:border-green-400'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </button>
                    <span className={`text-sm font-medium ${
                      isCompleted 
                        ? 'text-green-800 dark:text-green-200' 
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {skill}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Milestone Progress */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Milestone Progress
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {progressPercent}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// Node Detail Modal Component
function NodeDetailModal({ node, isCompleted, onClose, onToggleComplete }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${node.color || 'from-blue-500 to-purple-600'} text-white p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                {React.createElement(getSkillIcon(node.name), { className: "w-6 h-6" })}
              </div>
              <div>
                <h2 className="text-xl font-bold">{node.name}</h2>
                <p className="text-white/90 text-sm capitalize">{node.category}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Description</h3>
            <p className="text-slate-600 dark:text-slate-400">{node.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Difficulty</h4>
              <Badge className={getDifficultyColor(node.difficulty)}>{node.difficulty}</Badge>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Time Estimate</h4>
              <Badge variant="outline">{node.timeEstimate}</Badge>
            </div>
          </div>

          {node.resources && node.resources.length > 0 && (
            <div>
              <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">Learning Resources</h4>
              <div className="space-y-2">
                {node.resources.map((resource: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <ExternalLink className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{resource.name}</span>
                    <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-6">
          <div className="flex gap-3">
            <Button 
              onClick={onToggleComplete}
              className={`transition-colors ${isCompleted ? 'bg-green-500 hover:bg-green-600' : ''}`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </>
              )}
            </Button>
            <Button variant="outline" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Additional Info Cards Component
function AdditionalInfoCards({ careerData }: { careerData: CareerData }) {
  const infoCards = [
    {
      title: 'Core Skills Required',
      icon: Zap,
      color: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      iconColor: 'text-orange-500',
      textColor: 'text-orange-700 dark:text-orange-300',
      data: careerData.requiredSkills,
      type: 'list'
    },
    {
      title: 'Tools & Technologies',
      icon: Settings,
      color: 'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20',
      borderColor: 'border-violet-200 dark:border-violet-800',
      iconColor: 'text-violet-500',
      textColor: 'text-violet-700 dark:text-violet-200',
      data: careerData.tools,
      type: 'badges'
    },
    {
      title: 'Career Progression',
      icon: TrendingUp,
      color: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      iconColor: 'text-indigo-500',
      textColor: 'text-indigo-800 dark:text-indigo-200',
      data: careerData.careerPath,
      type: 'numbered'
    }
  ]

  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {infoCards.map((card, index) => {
        if (!card.data || card.data.length === 0) return null

        return (
          <Card key={index} className={`p-6 bg-gradient-to-br ${card.color} ${card.borderColor}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              {card.title}
            </h3>

            {card.type === 'list' && (
              <div className="space-y-2">
                {card.data.map((item: string, itemIndex: number) => (
                  <div key={itemIndex} className="flex items-center gap-3 p-2.5 bg-white/60 dark:bg-slate-800/60 rounded-lg border border-orange-200/50 dark:border-orange-800/50">
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className={`text-sm font-medium ${card.textColor}`}>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {card.type === 'badges' && (
              <div className="flex flex-wrap gap-2">
                {card.data.map((item: string, itemIndex: number) => (
                  <Badge key={itemIndex} className={`bg-violet-100 dark:bg-violet-900 ${card.textColor} border-violet-200 dark:border-violet-700 text-xs`}>
                    {item}
                  </Badge>
                ))}
              </div>
            )}

            {card.type === 'numbered' && (
              <div className="space-y-3">
                {card.data.map((item: string, itemIndex: number) => (
                  <div key={itemIndex} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {itemIndex + 1}
                    </div>
                    <span className={`font-medium text-sm ${card.textColor}`}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}

// Utility Functions
function transformToRoadmapNodes(careerData: CareerData): RoadmapNode[] {
  const nodes: RoadmapNode[] = []
  
  // Transform learning milestones to roadmap nodes
  careerData.learningMilestones?.forEach((milestone, milestoneIndex) => {
    milestone.skills?.forEach((skill, skillIndex) => {
      nodes.push({
        id: `milestone-${milestoneIndex}-skill-${skillIndex}`,
        name: skill,
        description: `Learn ${skill} as part of ${milestone.achievement}`,
        category: getCategoryFromIndex(milestoneIndex),
        difficulty: getDifficultyFromIndex(milestoneIndex),
        timeEstimate: '2-3 weeks',
        progress: 0,
        color: getNodeColor(milestoneIndex),
        resources: [
          { name: 'Online Course', type: 'Course' },
          { name: 'Documentation', type: 'Docs' },
          { name: 'Tutorial', type: 'Video' }
        ]
      })
    })
  })

  // Add required skills as foundation nodes
  careerData.requiredSkills?.forEach((skill, index) => {
    if (!nodes.find(node => node.name.toLowerCase() === skill.toLowerCase())) {
      nodes.unshift({
        id: `required-${index}`,
        name: skill,
        description: `Master ${skill} - essential foundation skill`,
        category: 'foundation',
        difficulty: 'Beginner',
        timeEstimate: '1-2 weeks',
        progress: 0,
        color: 'from-blue-500 to-cyan-500',
        resources: [
          { name: 'Fundamentals Course', type: 'Course' },
          { name: 'Practice Exercises', type: 'Practice' }
        ]
      })
    }
  })

  return nodes
}

function getCategoryFromIndex(index: number): 'foundation' | 'core' | 'advanced' | 'specialization' {
  if (index < 2) return 'foundation'
  if (index < 4) return 'core'
  if (index < 6) return 'advanced'
  return 'specialization'
}

function getDifficultyFromIndex(index: number): 'Beginner' | 'Intermediate' | 'Advanced' {
  if (index < 2) return 'Beginner'
  if (index < 4) return 'Intermediate'
  return 'Advanced'
}

function getSkillIcon(skillName: string) {
  const skill = skillName.toLowerCase()
  const iconMap: { [key: string]: any } = {
    'javascript': Code,
    'js': Code,
    'python': Code,
    'react': Monitor,
    'vue': Monitor,
    'database': Database,
    'sql': Database,
    'design': Palette,
    'ui': Palette,
    'security': Shield,
    'cloud': Globe,
    'aws': Globe,
    'machine learning': Brain,
    'ai': Brain,
    'data': BarChart3,
    'mobile': Monitor,
    'testing': CheckCircle2,
    'git': GitBranch,
  }

  for (const [key, icon] of Object.entries(iconMap)) {
    if (skill.includes(key)) return icon
  }
  
  return BookOpen
}

function getNodeColor(index: number): string {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500', 
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500',
    'from-indigo-500 to-blue-500',
    'from-yellow-500 to-orange-500'
  ]
  return colors[index % colors.length]
}

function getDifficultyColor(difficulty: string): string {
  const colorMap: { [key: string]: string } = {
    "Beginner": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200",
    "Intermediate": "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-200",
    "Advanced": "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-200"
  }
  return colorMap[difficulty] || "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200"
}