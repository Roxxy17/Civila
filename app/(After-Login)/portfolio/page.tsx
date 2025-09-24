"use client"

import { AuthGuard } from "@/components/auth-guard"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, ArrowLeft, Plus, ExternalLink, Github, Star, Eye, Share2, Edit } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PortfolioPage() {
  const [portfolioData, setPortfolioData] = useState({
    profile: {
      name: "John Doe",
      title: "Frontend Developer",
      bio: "Passionate developer with expertise in React, TypeScript, and modern web technologies.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Python"],
      experience: "2+ years",
      location: "Jakarta, Indonesia",
    },
    projects: [
      {
        id: 1,
        title: "E-Commerce Dashboard",
        description: "Modern admin dashboard for e-commerce management with real-time analytics",
        image: "/modern-dashboard.png",
        technologies: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
        status: "Completed",
        demoUrl: "#",
        githubUrl: "#",
        views: 245,
        likes: 18,
      },
      {
        id: 2,
        title: "Task Management App",
        description: "Collaborative task management application with team features",
        image: "/task-management-app.png",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "Framer Motion"],
        status: "In Progress",
        demoUrl: "#",
        githubUrl: "#",
        views: 156,
        likes: 12,
      },
      {
        id: 3,
        title: "Weather App",
        description: "Beautiful weather application with location-based forecasts",
        image: "/weather-app-interface.png",
        technologies: ["React Native", "TypeScript", "Weather API"],
        status: "Completed",
        demoUrl: "#",
        githubUrl: "#",
        views: 89,
        likes: 7,
      },
    ],
    achievements: [
      { name: "Project Master", description: "Completed 5 projects", icon: "🏆", date: "2024-01-15" },
      { name: "Code Warrior", description: "1000+ lines of code", icon: "⚔️", date: "2024-01-10" },
      { name: "Team Player", description: "Collaborated on 3 projects", icon: "🤝", date: "2024-01-05" },
    ],
    stats: {
      totalProjects: 8,
      completedProjects: 6,
      totalViews: 1250,
      totalLikes: 89,
      githubContributions: 245,
    },
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
                <span className="text-xl font-bold text-foreground">Portfolio</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Profile Header */}
            <FloatingCard delay={0.1}>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {portfolioData.profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">
                    <GradientText>{portfolioData.profile.name}</GradientText>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-3">{portfolioData.profile.title}</p>
                  <p className="text-muted-foreground mb-4">{portfolioData.profile.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolioData.profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{portfolioData.profile.experience} experience</span>
                    <span>•</span>
                    <span>{portfolioData.profile.location}</span>
                  </div>
                </div>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{portfolioData.stats.totalProjects}</p>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{portfolioData.stats.totalViews}</p>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{portfolioData.stats.totalLikes}</p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{portfolioData.stats.githubContributions}</p>
                  <p className="text-sm text-muted-foreground">Contributions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{portfolioData.achievements.length}</p>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                </div>
              </div>
            </FloatingCard>

            {/* Content Tabs */}
            <Tabs defaultValue="projects" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioData.projects.map((project, index) => (
                    <FloatingCard key={project.id} delay={0.1 * (index + 1)}>
                      <div className="relative group">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center space-x-2">
                          <Button size="sm" variant="secondary" asChild>
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button size="sm" variant="secondary" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {project.views}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {project.likes}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </FloatingCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioData.achievements.map((achievement, index) => (
                    <FloatingCard key={index} delay={0.1 * (index + 1)}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-2xl">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </FloatingCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="skills" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FloatingCard delay={0.1}>
                    <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
                    <div className="space-y-4">
                      {[
                        { name: "React/Next.js", level: 90 },
                        { name: "TypeScript", level: 85 },
                        { name: "Tailwind CSS", level: 95 },
                        { name: "Node.js", level: 75 },
                        { name: "Python", level: 70 },
                      ].map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </FloatingCard>

                  <FloatingCard delay={0.2}>
                    <h3 className="text-xl font-semibold mb-6">Soft Skills</h3>
                    <div className="space-y-4">
                      {[
                        { name: "Problem Solving", level: 88 },
                        { name: "Team Collaboration", level: 92 },
                        { name: "Communication", level: 85 },
                        { name: "Leadership", level: 78 },
                        { name: "Adaptability", level: 90 },
                      ].map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </FloatingCard>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
