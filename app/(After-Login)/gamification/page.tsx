"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import { 
  Brain, ArrowLeft, Trophy, Star, Target, Crown, Medal, Gift, 
  TrendingUp, Gamepad2, Zap, Calendar, Award, Users, Eye,
  CheckCircle2, Clock, BarChart3, Flame, Diamond, Sparkles,
  ChevronRight, Play, Pause, RotateCcw, Download, Heart,
  Shield, Sword, Gem, Lock, Unlock, Plus, Minus, User
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function GamificationPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const [gamificationData, setGamificationData] = useState({
    userLevel: {
      current: 3,
      name: "Skill Explorer",
      progress: 65,
      currentXP: 2450,
      nextLevelXP: 3000,
      totalXP: 2450,
    },
    leaderboard: [
      { rank: 1, name: "Alex Chen", level: 5, xp: 4850, avatar: "AC", streak: 21 },
      { rank: 2, name: "Sarah Kim", level: 4, xp: 4200, avatar: "SK", streak: 15 },
      { rank: 3, name: "John Doe", level: 3, xp: 2450, avatar: "JD", isCurrentUser: true, streak: 7 },
      { rank: 4, name: "Maria Garcia", level: 3, xp: 2100, avatar: "MG", streak: 5 },
      { rank: 5, name: "David Wilson", level: 2, xp: 1800, avatar: "DW", streak: 3 },
    ],
    challenges: [
      {
        id: 1,
        title: "7-Day Learning Streak",
        description: "Complete at least one lesson for 7 consecutive days",
        progress: 5,
        target: 7,
        reward: "500 XP + Consistency Badge",
        timeLeft: "2 days",
        difficulty: "Easy",
        status: "active",
        category: "Consistency",
        participants: 1250,
      },
      {
        id: 2,
        title: "Project Master",
        description: "Complete 3 projects in Frontend Development path",
        progress: 1,
        target: 3,
        reward: "1000 XP + Project Master Badge",
        timeLeft: "14 days",
        difficulty: "Medium",
        status: "active",
        category: "Skills",
        participants: 890,
      },
      {
        id: 3,
        title: "Skill Collector",
        description: "Master 5 different skills across various categories",
        progress: 3,
        target: 5,
        reward: "1500 XP + Skill Master Badge",
        timeLeft: "30 days",
        difficulty: "Hard",
        status: "active",
        category: "Achievement",
        participants: 456,
      },
      {
        id: 4,
        title: "Community Champion",
        description: "Help 10 fellow learners in discussion forums",
        progress: 0,
        target: 10,
        reward: "800 XP + Helper Badge",
        timeLeft: "7 days",
        difficulty: "Medium",
        status: "new",
        category: "Community",
        participants: 234,
      },
    ],
    badges: [
      { name: "First Steps", description: "Completed first lesson", icon: Target, earned: true, rarity: "Common", earnedDate: "2024-01-15" },
      { name: "Quick Learner", description: "Completed 10 lessons in one day", icon: Zap, earned: true, rarity: "Uncommon", earnedDate: "2024-01-20" },
      { name: "Consistent", description: "7-day learning streak", icon: Flame, earned: true, rarity: "Rare", earnedDate: "2024-01-25" },
      { name: "Project Builder", description: "Completed first project", icon: Gem, earned: false, rarity: "Uncommon", progress: 75 },
      { name: "Skill Master", description: "Mastered 5 skills", icon: Star, earned: false, rarity: "Epic", progress: 60 },
      { name: "Community Helper", description: "Helped 10 other learners", icon: Users, earned: false, rarity: "Rare", progress: 30 },
      { name: "Speed Demon", description: "Complete challenge in record time", icon: TrendingUp, earned: false, rarity: "Legendary", progress: 0 },
      { name: "Perfect Score", description: "Get 100% in 5 assessments", icon: Trophy, earned: false, rarity: "Epic", progress: 40 },
    ],
    rewards: [
      { name: "Premium Course Access", cost: 1000, description: "Unlock premium courses for 1 month", icon: Brain, category: "Learning", available: true },
      { name: "1-on-1 Mentoring", cost: 2500, description: "30-minute session with industry expert", icon: User, category: "Mentoring", available: true },
      { name: "Certificate Template", cost: 500, description: "Professional certificate template", icon: Trophy, category: "Certification", available: true },
      { name: "Custom Profile Badge", cost: 750, description: "Design your own profile badge", icon: Sparkles, category: "Customization", available: true },
      { name: "Priority Support", cost: 1200, description: "24/7 priority customer support", icon: Shield, category: "Support", available: false },
      { name: "Exclusive Webinar", cost: 2000, description: "Access to exclusive industry webinars", icon: Eye, category: "Learning", available: true },
    ],
    weeklyStats: {
      xpEarned: 850,
      lessonsCompleted: 12,
      projectsFinished: 2,
      badgesEarned: 1,
      rankImprovement: 2,
    }
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "text-slate-600 bg-slate-100 border-slate-200"
      case "Uncommon": return "text-emerald-700 bg-emerald-100 border-emerald-200"
      case "Rare": return "text-blue-700 bg-blue-100 border-blue-200"
      case "Epic": return "text-purple-700 bg-purple-100 border-purple-200"
      case "Legendary": return "text-yellow-700 bg-yellow-100 border-yellow-200"
      default: return "text-slate-600 bg-slate-100 border-slate-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-500 text-white border-emerald-600"
      case "Medium": return "bg-yellow-500 text-white border-yellow-600"
      case "Hard": return "bg-red-500 text-white border-red-600"
      default: return "bg-slate-500 text-white border-slate-600"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Consistency": return <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      case "Skills": return <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      case "Achievement": return <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      case "Community": return <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      default: return <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Consistency": return "from-emerald-500 to-green-600"
      case "Skills": return "from-blue-500 to-indigo-600"
      case "Achievement": return "from-purple-500 to-violet-600"
      case "Community": return "from-pink-500 to-rose-600"
      default: return "from-indigo-500 to-purple-600"
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
          <div className="flex-1 overflow-auto">
            <div className="px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">

              {/* Enhanced Hero Header - Responsive */}
              <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                  <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl -translate-y-24 translate-x-24 sm:-translate-y-48 sm:translate-x-48" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-80 sm:h-80 bg-white/5 rounded-full blur-3xl translate-y-20 -translate-x-20 sm:translate-y-40 sm:-translate-x-40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
                </div>

                <div className="relative p-4 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-200 text-xs sm:text-sm"
                      >
                        <Link href="/dashboard">
                          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Kembali
                        </Link>
                      </Button>
                      <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm bg-white/10 px-2 sm:px-4 py-1 sm:py-2 rounded-full backdrop-blur-sm border border-white/20">
                        <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Gamification Hub</span>
                        <span className="sm:hidden">Hub</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
                      <div className="text-right">
                        <div className="text-white/80 text-xs sm:text-sm font-medium">Current Rank</div>
                        <div className="text-white font-bold text-lg sm:text-2xl">#3</div>
                      </div>
                      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                        <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-300" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                        <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
                      Gamification Hub
                    </h1>
                    <p className="text-white/90 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
                      Raih achievement, naik level, dan bersaing dengan learner lain dalam journey pembelajaran Anda!
                    </p>
                  </div>
                </div>
              </Card>

              {/* User Level & Weekly Stats - Responsive Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-8">
                {/* User Level Card - Responsive */}
                <Card className="xl:col-span-2 p-4 sm:p-8 border-0 shadow-xl bg-white dark:bg-slate-900">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="relative self-center sm:self-auto">
                      <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white dark:border-slate-800">
                        <Crown className="w-10 h-10 sm:w-14 sm:h-14 text-yellow-300" />
                      </div>
                      <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg border-2 border-white">
                        {gamificationData.userLevel.current}
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                          Level {gamificationData.userLevel.current}
                        </h2>
                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold self-center sm:self-auto">
                          {gamificationData.userLevel.name}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                        <div className="text-center p-2 sm:p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                          <div className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{gamificationData.userLevel.currentXP}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">Current XP</div>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                          <div className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">{gamificationData.userLevel.nextLevelXP - gamificationData.userLevel.currentXP}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">XP to Next</div>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                          <div className="text-lg sm:text-2xl font-bold text-pink-600 dark:text-pink-400">{gamificationData.userLevel.nextLevelXP}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">Next Level</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress value={gamificationData.userLevel.progress} className="h-4 sm:h-5 rounded-full" />
                        <div className="flex justify-between items-center">
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                            {gamificationData.userLevel.progress}% progress to next level
                          </p>
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Weekly Stats - Responsive */}
                <Card className="p-4 sm:p-6 border-0 shadow-xl bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                      Week Stats
                    </h3>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">XP Earned</span>
                      </div>
                      <span className="font-bold text-yellow-600 dark:text-yellow-400 text-sm sm:text-lg">+{gamificationData.weeklyStats.xpEarned}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Lessons</span>
                      </div>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-lg">{gamificationData.weeklyStats.lessonsCompleted}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <Target className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Projects</span>
                      </div>
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-sm sm:text-lg">{gamificationData.weeklyStats.projectsFinished}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <Medal className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Badges</span>
                      </div>
                      <span className="font-bold text-purple-600 dark:text-purple-400 text-sm sm:text-lg">+{gamificationData.weeklyStats.badgesEarned}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Rank Up</span>
                      </div>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm sm:text-lg">+{gamificationData.weeklyStats.rankImprovement}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Content Tabs - Enhanced Responsive */}
              <Tabs defaultValue="challenges" className="space-y-4 sm:space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-fit bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-lg">
                    <TabsTrigger value="challenges" className="rounded-lg font-medium px-2 sm:px-4 py-2 text-xs sm:text-sm">
                      <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Challenges</span>
                      <span className="sm:hidden">Tasks</span>
                    </TabsTrigger>
                    <TabsTrigger value="leaderboard" className="rounded-lg font-medium px-2 sm:px-4 py-2 text-xs sm:text-sm">
                      <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Leaderboard</span>
                      <span className="sm:hidden">Ranks</span>
                    </TabsTrigger>
                    <TabsTrigger value="badges" className="rounded-lg font-medium px-2 sm:px-4 py-2 text-xs sm:text-sm">
                      <Medal className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Badges
                    </TabsTrigger>
                    <TabsTrigger value="rewards" className="rounded-lg font-medium px-2 sm:px-4 py-2 text-xs sm:text-sm">
                      <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Rewards
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="text-center sm:text-right bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 shadow-lg">
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Available XP</div>
                    <div className="flex items-center justify-center sm:justify-end gap-2">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                      <span className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{gamificationData.userLevel.totalXP}</span>
                    </div>
                  </div>
                </div>

                <TabsContent value="challenges" className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Active Challenges</h2>
                    <Badge variant="outline" className="text-slate-600 border-slate-300 px-3 py-1 self-start sm:self-auto">
                      <Target className="w-3 h-3 mr-1" />
                      {gamificationData.challenges.filter(c => c.status === 'active').length} Active
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {gamificationData.challenges.map((challenge, index) => (
                      <Card key={challenge.id} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-slate-900">
                        <div className="relative p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${getCategoryColor(challenge.category)} rounded-xl flex items-center justify-center shadow-lg`}>
                                {getCategoryIcon(challenge.category)}
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge className={`${getDifficultyColor(challenge.difficulty)} text-xs font-semibold px-2 sm:px-3 py-1`}>
                                  {challenge.difficulty}
                                </Badge>
                                {challenge.status === 'new' && (
                                  <Badge className="bg-emerald-500 text-white text-xs font-semibold px-2 sm:px-3 py-1 animate-pulse">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    NEW
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-left sm:text-right bg-slate-100 dark:bg-slate-800 rounded-lg p-2 self-start sm:self-auto">
                              <div className="text-xs text-slate-500 font-medium">Time Left</div>
                              <div className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {challenge.timeLeft}
                              </div>
                            </div>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-indigo-600 transition-colors">
                            {challenge.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                            {challenge.description}
                          </p>

                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-slate-600 dark:text-slate-400 font-medium">Progress</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {challenge.progress}/{challenge.target}
                              </span>
                            </div>
                            <Progress 
                              value={(challenge.progress / challenge.target) * 100} 
                              className="h-2 sm:h-3 rounded-full"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                            <div className="flex items-center gap-2">
                              <Gift className="w-4 h-4 text-indigo-500" />
                              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">{challenge.reward}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full self-start sm:self-auto">
                              <Users className="w-3 h-3" />
                              {challenge.participants.toLocaleString()}
                            </div>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 hover:from-indigo-600 hover:to-purple-600 rounded-xl font-semibold py-2 sm:py-3 text-sm sm:text-base transition-all duration-200 hover:scale-105">
                            <Play className="w-4 h-4 mr-2" />
                            {challenge.status === 'new' ? 'Join Challenge' : 'Continue'}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="leaderboard" className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Weekly Leaderboard</h2>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-2 sm:p-3 shadow-lg self-start sm:self-auto">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      Resets in 3 days
                    </div>
                  </div>

                  <Card className="p-4 sm:p-6 border-0 shadow-xl bg-white dark:bg-slate-900">
                    <div className="space-y-3 sm:space-y-4">
                      {gamificationData.leaderboard.map((user, index) => (
                        <div
                          key={index}
                          className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                            user.isCurrentUser 
                              ? "border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 shadow-lg ring-2 ring-indigo-200" 
                              : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div
                              className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-sm sm:text-lg font-bold shadow-lg border-2 ${
                                user.rank === 1
                                  ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white border-yellow-300"
                                  : user.rank === 2
                                    ? "bg-gradient-to-br from-slate-300 to-slate-500 text-white border-slate-200"
                                    : user.rank === 3
                                      ? "bg-gradient-to-br from-amber-500 to-amber-700 text-white border-amber-300"
                                      : "bg-gradient-to-br from-slate-200 to-slate-400 text-slate-700 border-slate-300"
                              }`}
                            >
                              {user.rank}
                              {user.rank <= 3 && (
                                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg">
                                  {user.rank === 1 ? <Crown className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-500" /> : user.rank === 2 ? <Medal className="w-3 h-3 sm:w-5 sm:h-5 text-slate-500" /> : <Award className="w-3 h-3 sm:w-5 sm:h-5 text-amber-500" />}
                                </div>
                              )}
                            </div>
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-sm sm:text-lg font-bold text-white shadow-lg border-2 border-white dark:border-slate-800">
                              {user.avatar}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-lg truncate">{user.name}</span>
                              {user.isCurrentUser && (
                                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 text-xs font-semibold px-2 sm:px-3 py-1 self-start sm:self-auto">
                                  <User className="w-3 h-3 mr-1" />
                                  You
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                                <Crown className="w-3 h-3 text-yellow-500" />
                                Level {user.level}
                              </div>
                              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                                <Star className="w-3 h-3 text-blue-500" />
                                {user.xp.toLocaleString()} XP
                              </div>
                              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                                <Flame className="w-3 h-3 text-orange-500" />
                                {user.streak} day streak
                              </div>
                            </div>
                          </div>

                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="badges" className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Badge Collection</h2>
                    <div className="text-xs sm:text-sm text-slate-600 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-2 sm:p-3 shadow-lg self-start sm:self-auto">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                        <span className="font-semibold">
                          {gamificationData.badges.filter(b => b.earned).length} / {gamificationData.badges.length} Earned
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {gamificationData.badges.map((badge, index) => {
                      const IconComponent = badge.icon
                      return (
                        <Card
                          key={index}
                          className={`group relative overflow-hidden border-0 shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                            badge.earned
                              ? "bg-white dark:bg-slate-900 shadow-xl ring-2 ring-yellow-200 dark:ring-yellow-800"
                              : "bg-slate-100 dark:bg-slate-800 opacity-75"
                          }`}
                        >
                          <div className="absolute inset-0">
                            {badge.earned && (
                              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 to-orange-100/30 dark:from-yellow-900/30 dark:to-orange-900/30" />
                            )}
                          </div>

                          <div className="relative p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4">
                              <div className={`w-12 h-12 sm:w-16 sm:h-16 p-3 sm:p-4 rounded-2xl shadow-lg border-2 flex items-center justify-center ${
                                badge.earned 
                                  ? "bg-gradient-to-br from-yellow-200 to-orange-200 border-yellow-300" 
                                  : "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 grayscale"
                              }`}>
                                <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${badge.earned ? "text-yellow-700" : "text-slate-500"}`} />
                              </div>
                              <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                  <h3 className={`font-bold text-sm sm:text-lg ${
                                    badge.earned ? "text-slate-800 dark:text-slate-200" : "text-slate-500"
                                  }`}>
                                    {badge.name}
                                  </h3>
                                  <Badge className={`text-xs font-semibold border ${getRarityColor(badge.rarity)} self-center sm:self-auto`}>
                                    {badge.rarity}
                                  </Badge>
                                </div>
                                {badge.earned && badge.earnedDate && (
                                  <div className="text-xs text-emerald-600 font-medium bg-emerald-100 px-2 py-1 rounded-lg inline-flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Earned {new Date(badge.earnedDate).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                              {badge.earned ? (
                                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                              ) : (
                                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
                              )}
                            </div>

                            <p className={`text-xs sm:text-sm mb-4 text-center sm:text-left ${
                              badge.earned ? "text-slate-600 dark:text-slate-400" : "text-slate-500"
                            }`}>
                              {badge.description}
                            </p>

                            {!badge.earned && badge.progress !== undefined && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-500 font-medium">Progress</span>
                                  <span className="text-slate-700 font-bold">{badge.progress}%</span>
                                </div>
                                <Progress value={badge.progress} className="h-2 sm:h-3 rounded-full" />
                              </div>
                            )}

                            {badge.earned && (
                              <div className="flex items-center justify-center pt-2">
                                <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 font-semibold px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                                  <Medal className="w-3 h-3 mr-1" />
                                  Earned
                                </Badge>
                              </div>
                            )}
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="rewards" className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Reward Store</h2>
                    <div className="flex items-center gap-2 text-sm sm:text-lg font-bold text-indigo-600 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 shadow-lg self-start sm:self-auto">
                      <Star className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500" />
                      {gamificationData.userLevel.totalXP} XP
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {gamificationData.rewards.map((reward, index) => {
                      const IconComponent = reward.icon
                      return (
                        <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-slate-900">
                          <div className="relative p-4 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border-2 border-white dark:border-slate-800">
                                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                                  <h3 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors text-sm sm:text-lg truncate">
                                    {reward.name}
                                  </h3>
                                  <div className="flex items-center gap-1 text-sm sm:text-lg font-bold text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 px-2 sm:px-3 py-1 rounded-lg self-start sm:self-auto">
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                                    {reward.cost}
                                  </div>
                                </div>
                                
                                <Badge variant="outline" className="mb-3 text-xs font-semibold">
                                  {reward.category}
                                </Badge>
                                
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                  {reward.description}
                                </p>
                                
                                <Button
                                  disabled={gamificationData.userLevel.totalXP < reward.cost || !reward.available}
                                  className={`w-full rounded-xl font-semibold py-2 sm:py-3 text-xs sm:text-sm transition-all duration-200 ${
                                    gamificationData.userLevel.totalXP >= reward.cost && reward.available
                                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 hover:from-indigo-600 hover:to-purple-600 hover:scale-105"
                                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                                  }`}
                                >
                                  {!reward.available ? (
                                    <>
                                      <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                      Coming Soon
                                    </>
                                  ) : gamificationData.userLevel.totalXP >= reward.cost ? (
                                    <>
                                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                      Redeem Now
                                    </>
                                  ) : (
                                    <>
                                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                      Need {reward.cost - gamificationData.userLevel.totalXP} more XP
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}