"use client"

import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, ArrowLeft, Trophy, Star, Target, Crown, Medal, Gift } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function GamificationPage() {
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
      { rank: 1, name: "Alex Chen", level: 5, xp: 4850, avatar: "AC" },
      { rank: 2, name: "Sarah Kim", level: 4, xp: 4200, avatar: "SK" },
      { rank: 3, name: "John Doe", level: 3, xp: 2450, avatar: "JD", isCurrentUser: true },
      { rank: 4, name: "Maria Garcia", level: 3, xp: 2100, avatar: "MG" },
      { rank: 5, name: "David Wilson", level: 2, xp: 1800, avatar: "DW" },
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
      },
    ],
    badges: [
      { name: "First Steps", description: "Completed first lesson", icon: "🎯", earned: true, rarity: "Common" },
      {
        name: "Quick Learner",
        description: "Completed 10 lessons in one day",
        icon: "⚡",
        earned: true,
        rarity: "Uncommon",
      },
      { name: "Consistent", description: "7-day learning streak", icon: "🔥", earned: true, rarity: "Rare" },
      { name: "Project Builder", description: "Completed first project", icon: "🏗️", earned: false, rarity: "Uncommon" },
      { name: "Skill Master", description: "Mastered 5 skills", icon: "⭐", earned: false, rarity: "Epic" },
      { name: "Community Helper", description: "Helped 10 other learners", icon: "🤝", earned: false, rarity: "Rare" },
    ],
    rewards: [
      { name: "Premium Course Access", cost: 1000, description: "Unlock premium courses for 1 month", icon: "📚" },
      { name: "1-on-1 Mentoring", cost: 2500, description: "30-minute session with industry expert", icon: "👨‍🏫" },
      { name: "Certificate Template", cost: 500, description: "Professional certificate template", icon: "🏆" },
      { name: "Custom Profile Badge", cost: 750, description: "Design your own profile badge", icon: "🎨" },
    ],
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-500"
      case "Uncommon":
        return "text-green-500"
      case "Rare":
        return "text-blue-500"
      case "Epic":
        return "text-purple-500"
      case "Legendary":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

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
                <span className="text-xl font-bold text-foreground">Gamification Hub</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative z-10 px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Gamification <GradientText>Hub</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground">
                Raih achievement, naik level, dan bersaing dengan learner lain!
              </p>
            </div>

            {/* User Level Card */}
            <FloatingCard delay={0.1}>
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold">Level {gamificationData.userLevel.current}</h2>
                    <Badge variant="secondary">{gamificationData.userLevel.name}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-sm text-muted-foreground">
                      {gamificationData.userLevel.currentXP} / {gamificationData.userLevel.nextLevelXP} XP
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {gamificationData.userLevel.nextLevelXP - gamificationData.userLevel.currentXP} XP to next level
                    </span>
                  </div>
                  <Progress value={gamificationData.userLevel.progress} className="h-3" />
                </div>
              </div>
            </FloatingCard>

            {/* Content Tabs */}
            <Tabs defaultValue="challenges" className="mt-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
              </TabsList>

              <TabsContent value="challenges" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gamificationData.challenges.map((challenge, index) => (
                    <FloatingCard key={challenge.id} delay={0.1 * (index + 1)}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Target className="w-5 h-5 text-primary" />
                          <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
                            {challenge.difficulty}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{challenge.timeLeft}</span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{challenge.description}</p>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>
                            {challenge.progress}/{challenge.target}
                          </span>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Gift className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{challenge.reward}</span>
                        </div>
                      </div>
                    </FloatingCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="leaderboard" className="mt-8">
                <FloatingCard delay={0.1}>
                  <div className="flex items-center space-x-3 mb-6">
                    <Trophy className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold">Weekly Leaderboard</h3>
                  </div>
                  <div className="space-y-4">
                    {gamificationData.leaderboard.map((user, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                          user.isCurrentUser ? "border-primary bg-primary/10" : "border-border"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              user.rank === 1
                                ? "bg-yellow-500 text-white"
                                : user.rank === 2
                                  ? "bg-gray-400 text-white"
                                  : user.rank === 3
                                    ? "bg-amber-600 text-white"
                                    : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {user.rank}
                          </div>
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-sm font-bold text-white">
                            {user.avatar}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{user.name}</span>
                            {user.isCurrentUser && <Badge variant="secondary">You</Badge>}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Level {user.level}</span>
                            <span>{user.xp.toLocaleString()} XP</span>
                          </div>
                        </div>

                        {user.rank <= 3 && (
                          <div className="text-2xl">{user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </FloatingCard>
              </TabsContent>

              <TabsContent value="badges" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gamificationData.badges.map((badge, index) => (
                    <FloatingCard key={index} delay={0.1 * (index + 1)}>
                      <div
                        className={`p-6 rounded-lg border transition-all duration-300 ${
                          badge.earned ? "border-primary bg-primary/10" : "border-border opacity-60"
                        }`}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="text-3xl">{badge.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">{badge.name}</h3>
                              <Badge className={getRarityColor(badge.rarity)} variant="outline">
                                {badge.rarity}
                              </Badge>
                            </div>
                            {badge.earned && <Medal className="w-4 h-4 text-primary inline" />}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                        {!badge.earned && (
                          <div className="mt-4">
                            <Badge variant="secondary">Locked</Badge>
                          </div>
                        )}
                      </div>
                    </FloatingCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rewards" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gamificationData.rewards.map((reward, index) => (
                    <FloatingCard key={index} delay={0.1 * (index + 1)}>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-2xl">
                          {reward.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{reward.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-primary" />
                              <span className="font-bold">{reward.cost}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                          <Button
                            size="sm"
                            disabled={gamificationData.userLevel.totalXP < reward.cost}
                            className="w-full"
                          >
                            {gamificationData.userLevel.totalXP >= reward.cost ? "Redeem" : "Not Enough XP"}
                          </Button>
                        </div>
                      </div>
                    </FloatingCard>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
