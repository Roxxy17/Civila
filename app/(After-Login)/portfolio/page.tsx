"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Sidebar } from "@/components/sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Brain, ArrowLeft, Plus, ExternalLink, Github, Star, Eye, Share2, Edit,
  MapPin, Calendar, Trophy, Code, Briefcase, User, Award, Sparkles,
  TrendingUp, Heart, Download, Copy, ChevronRight, Globe, Mail,
  Phone, Linkedin, Twitter, Instagram, Link as LinkIcon, Zap,
  Target, Users, BookOpen, Rocket, Palette, Database, Cpu, Monitor,
  Smartphone, Server, GitBranch, Coffee, Clock, CheckCircle2,
  ExternalLinkIcon, GithubIcon, PlayCircle, FolderOpen, Camera,
  FileText, PresentationChart, Megaphone, Building2, Stethoscope,
  GraduationCap, Calculator, Scale, Mic, Plane, Utensils, Hammer,
  Paintbrush, Music, Video, Image, PenTool, Layout, ShoppingBag,
  TrendingDown, BarChart, DollarSign, Shield, Gavel, QrCode,
  Settings, Wand2, Palette as PaletteIcon, Chrome, Minimize2,
  Maximize2, RotateCcw, Trash2, Save, RefreshCw
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { toast } from "sonner"

// Sample portfolio data berdasarkan berbagai karir
const getPortfolioDataByCareer = (career: string) => {
  const baseProfile = {
    name: "Sarah Martinez",
    location: "Jakarta, Indonesia", 
    email: "sarah@example.com",
    phone: "+62 812-3456-7890",
    website: "sarahmartinez.com",
    social: {
      linkedin: "sarahmartinez",
      twitter: "sarahmartinez", 
      instagram: "sarahmartinez",
      github: "sarahmartinez"
    },
    availability: "Available for opportunities",
    timezone: "UTC+7 (Jakarta)"
  }

  const careerData = {
    "Software Engineer": {
      profile: {
        ...baseProfile,
        title: "Full-Stack Developer & Software Engineer",
        bio: "Passionate developer dengan 3+ tahun pengalaman membangun aplikasi web modern. Suka eksplorasi teknologi terbaru dan menciptakan solusi yang efisien.",
        skills: ["React", "TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
        experience: "3+ years",
        industry: "Technology"
      },
      projects: [
        {
          id: 1,
          title: "EcoCommerce Platform",
          description: "Platform e-commerce ramah lingkungan dengan fitur tracking dan sustainable recommendations.",
          type: "Web Application",
          technologies: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
          status: "Live",
          featured: true,
          metrics: { views: 1245, likes: 89, downloads: 567 },
          url: "https://ecocommerce.demo"
        },
        {
          id: 2,
          title: "Learning Management System",
          description: "Modern LMS dengan interactive courses, progress tracking, dan real-time collaboration features.",
          type: "Web Application",
          technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
          status: "In Development",
          featured: true,
          metrics: { students: "2K+", courses: "150+", completion: "85%" },
          url: "https://lms.demo"
        }
      ],
      achievements: [
        { name: "Top Contributor", description: "Ranked #1 contributor bulan ini", icon: "🏆", category: "Development", rarity: "rare" },
        { name: "Code Quality Expert", description: "Maintained 98% code quality score", icon: "⚔️", category: "Technical", rarity: "epic" }
      ]
    },
    "Graphic Designer": {
      profile: {
        ...baseProfile,
        name: "Maya Putri",
        title: "Creative Graphic Designer & Brand Specialist",
        bio: "Creative designer dengan passion untuk visual storytelling. Mengkhususkan diri dalam brand identity, packaging design, dan digital marketing materials.",
        skills: ["Adobe Photoshop", "Illustrator", "InDesign", "Figma", "Canva", "Typography", "Color Theory", "Brand Design"],
        experience: "4+ years",
        industry: "Creative & Design"
      },
      projects: [
        {
          id: 1,
          title: "Brand Identity - Green Earth Cafe",
          description: "Complete brand identity design termasuk logo, packaging, dan marketing materials untuk cafe organic.",
          type: "Brand Design",
          technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
          status: "Completed",
          featured: true,
          metrics: { views: 2340, likes: 156, downloads: 89 },
          url: "https://greenearthcafe.demo"
        },
        {
          id: 2,
          title: "Product Packaging - Organic Skincare",
          description: "Eco-friendly packaging design untuk rangkaian produk skincare organic dengan sustainable approach.",
          type: "Packaging Design",
          technologies: ["Illustrator", "3D Mockup", "Typography"],
          status: "Live",
          featured: true,
          metrics: { views: 1890, likes: 134, downloads: 67 },
          url: "https://organicskincare.demo"
        }
      ],
      achievements: [
        { name: "Design Excellence", description: "Won Best Design Award 2024", icon: "🎨", category: "Design", rarity: "epic" },
        { name: "Brand Master", description: "Created 50+ successful brand identities", icon: "💎", category: "Branding", rarity: "rare" }
      ]
    },
    "Marketing Manager": {
      profile: {
        ...baseProfile,
        name: "Rudi Hartono",
        title: "Digital Marketing Manager & Growth Strategist",
        bio: "Experienced marketing professional dengan track record meningkatkan brand awareness dan ROI. Expertise dalam digital marketing, campaign management, dan data analytics.",
        skills: ["Digital Marketing", "Google Ads", "Facebook Ads", "SEO/SEM", "Content Strategy", "Analytics", "CRM", "Email Marketing"],
        experience: "5+ years",
        industry: "Marketing & Communications"
      },
      projects: [
        {
          id: 1,
          title: "E-commerce Growth Campaign",
          description: "Comprehensive digital marketing campaign yang meningkatkan sales 300% dalam 6 bulan untuk fashion e-commerce.",
          type: "Marketing Campaign",
          technologies: ["Google Ads", "Facebook Ads", "Google Analytics", "Mailchimp"],
          status: "Completed",
          featured: true,
          metrics: { reach: "2.5M", conversions: "15K", roas: "450%" },
          url: "https://fashiongrowth.demo"
        },
        {
          id: 2,
          title: "Brand Awareness Campaign - Tech Startup",
          description: "Multi-channel marketing strategy untuk tech startup, meningkatkan brand awareness dari 5% menjadi 35%.",
          type: "Brand Campaign",
          technologies: ["Social Media", "Content Marketing", "Influencer Marketing"],
          status: "Live",
          featured: true,
          metrics: { reach: "1.8M", engagement: "12%", awareness: "35%" },
          url: "https://techstartup.demo"
        }
      ],
      achievements: [
        { name: "Growth Hacker", description: "Achieved 300% growth in 6 months", icon: "📈", category: "Performance", rarity: "epic" },
        { name: "Campaign Master", description: "Managed $500K+ ad spend successfully", icon: "🎯", category: "Campaign", rarity: "rare" }
      ]
    },
    "Financial Analyst": {
      profile: {
        ...baseProfile,
        name: "Andi Wijaya",
        title: "Senior Financial Analyst & Investment Advisor",
        bio: "Detail-oriented financial professional dengan expertise dalam investment analysis, financial modeling, dan risk assessment. Membantu perusahaan membuat keputusan finansial strategis.",
        skills: ["Financial Modeling", "Excel", "Bloomberg Terminal", "Risk Analysis", "Investment Strategy", "SQL", "Python", "Tableau"],
        experience: "6+ years",
        industry: "Finance & Banking"
      },
      projects: [
        {
          id: 1,
          title: "Portfolio Optimization Model",
          description: "Developed advanced portfolio optimization model untuk investment firm, meningkatkan returns 25% dengan risk yang sama.",
          type: "Financial Model",
          technologies: ["Python", "Excel", "Monte Carlo", "VaR Analysis"],
          status: "Live",
          featured: true,
          metrics: { returns: "25%", accuracy: "94%", clients: "150+" },
          url: "https://portfolioopt.demo"
        },
        {
          id: 2,
          title: "Corporate Valuation - M&A Deal",
          description: "Comprehensive valuation analysis untuk merger senilai $50M, termasuk DCF model dan comparable analysis.",
          type: "Valuation Analysis",
          technologies: ["Excel", "DCF Model", "Comparable Analysis"],
          status: "Completed",
          featured: true,
          metrics: { deal_value: "$50M", accuracy: "96%", timeline: "2 weeks" },
          url: "https://madeal.demo"
        }
      ],
      achievements: [
        { name: "Analyst Excellence", description: "Top performing analyst 3 years running", icon: "📊", category: "Performance", rarity: "epic" },
        { name: "Deal Maker", description: "Advised on $200M+ in transactions", icon: "💼", category: "Advisory", rarity: "rare" }
      ]
    },
    "Content Creator": {
      profile: {
        ...baseProfile,
        name: "Luna Sari",
        title: "Content Creator & Social Media Strategist",
        bio: "Creative content creator dengan passion untuk storytelling dan community building. Mengkhususkan diri dalam video content, social media strategy, dan influencer marketing.",
        skills: ["Video Editing", "Photography", "Social Media", "Content Strategy", "Adobe Premiere", "After Effects", "Canva", "Analytics"],
        experience: "3+ years",
        industry: "Media & Entertainment"
      },
      projects: [
        {
          id: 1,
          title: "Viral Recipe Content Series",
          description: "Created viral cooking content series yang mencapai 5M+ views dan 100K+ followers dalam 6 bulan.",
          type: "Video Content",
          technologies: ["Adobe Premiere", "After Effects", "Canva", "TikTok"],
          status: "Live",
          featured: true,
          metrics: { views: "5M+", followers: "100K+", engagement: "8.5%" },
          url: "https://viralrecipes.demo"
        },
        {
          id: 2,
          title: "Brand Collaboration - Fashion Week",
          description: "Social media campaign untuk fashion brand selama Jakarta Fashion Week, generating 2M+ impressions.",
          type: "Brand Campaign",
          technologies: ["Instagram", "TikTok", "Photography", "Video"],
          status: "Completed",
          featured: true,
          metrics: { impressions: "2M+", reach: "800K", engagement: "12%" },
          url: "https://fashionweek.demo"
        }
      ],
      achievements: [
        { name: "Viral Master", description: "Created 10+ viral content pieces", icon: "🔥", category: "Content", rarity: "epic" },
        { name: "Community Builder", description: "Built 100K+ engaged community", icon: "👥", category: "Social", rarity: "rare" }
      ]
    },
    "Teacher": {
      profile: {
        ...baseProfile,
        name: "Ibu Sinta Dewi",
        title: "Senior Mathematics Teacher & Educational Consultant",
        bio: "Passionate educator dengan 8+ tahun pengalaman mengajar matematika. Committed to innovative teaching methods dan student development.",
        skills: ["Mathematics", "Curriculum Development", "Classroom Management", "Educational Technology", "Assessment Design", "Student Counseling"],
        experience: "8+ years",
        industry: "Education"
      },
      projects: [
        {
          id: 1,
          title: "Interactive Math Learning Platform",
          description: "Developed digital learning platform untuk matematika SMA dengan gamification elements, meningkatkan student engagement 80%.",
          type: "Educational Innovation",
          technologies: ["Google Classroom", "Kahoot", "GeoGebra", "Video Production"],
          status: "Live",
          featured: true,
          metrics: { students: "500+", engagement: "80%", improvement: "45%" },
          url: "https://mathlearning.demo"
        },
        {
          id: 2,
          title: "National Olympiad Training Program",
          description: "Designed comprehensive training program untuk Olimpiade Matematika Nasional dengan 90% success rate.",
          type: "Curriculum Development",
          technologies: ["Problem Solving", "Advanced Mathematics", "Training Design"],
          status: "Ongoing",
          featured: true,
          metrics: { participants: "50+", success_rate: "90%", medals: "15" },
          url: "https://matholympiad.demo"
        }
      ],
      achievements: [
        { name: "Teaching Excellence", description: "Outstanding Teacher Award 2023", icon: "🏆", category: "Teaching", rarity: "epic" },
        { name: "Student Champion", description: "Mentored 15 national olympiad medalists", icon: "🥇", category: "Mentoring", rarity: "rare" }
      ]
    }
  }

  return careerData[career as keyof typeof careerData] || careerData["Software Engineer"]
}

// Portfolio Template Components (sama seperti sebelumnya)
const MinimalTemplate = ({ data, customization }: any) => (
  <div className={`min-h-screen p-8 ${customization.bgColor || 'bg-gradient-to-br from-slate-50 to-white'}`}>
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Profile Section */}
      <div className="text-center space-y-4">
        <div className={`w-32 h-32 mx-auto rounded-full ${customization.accentColor || 'bg-indigo-500'} flex items-center justify-center text-white text-4xl font-bold shadow-2xl`}>
          {data.profile.name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">{data.profile.name}</h1>
          <p className="text-xl text-slate-600 mb-4">{data.profile.title}</p>
          <p className="text-slate-500 leading-relaxed max-w-lg mx-auto">{data.profile.bio}</p>
        </div>
      </div>

      {/* Contact Links */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-indigo-500" />
            <div>
              <h3 className="font-semibold text-slate-800">Email</h3>
              <p className="text-slate-600">{data.profile.email}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300">
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-indigo-500" />
            <div>
              <h3 className="font-semibold text-slate-800">Phone</h3>
              <p className="text-slate-600">{data.profile.phone}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300">
          <div className="flex items-center gap-4">
            <Linkedin className="w-6 h-6 text-indigo-500" />
            <div>
              <h3 className="font-semibold text-slate-800">LinkedIn</h3>
              <p className="text-slate-600">@{data.profile.social.linkedin}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Featured Projects */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 text-center">Featured Work</h2>
        {data.projects?.map((project: any) => (
          <Card key={project.id} className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-indigo-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                    <Badge key={index} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              <ExternalLink className="w-6 h-6 text-indigo-500" />
            </div>
          </Card>
        ))}
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 text-center">Skills</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {data.profile.skills.map((skill: string, index: number) => (
            <Badge key={index} className={`${customization.accentColor || 'bg-indigo-500'} text-white px-4 py-2`}>
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const CreativeTemplate = ({ data, customization }: any) => (
  <div className={`min-h-screen ${customization.bgColor || 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500'}`}>
    <div className="container mx-auto px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Artistic Header */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl" />
          <div className="relative p-12 text-center text-white">
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-6xl font-bold border-4 border-white/30 shadow-2xl">
              {data.profile.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              {data.profile.name}
            </h1>
            <p className="text-2xl font-medium mb-6 text-white/90">{data.profile.title}</p>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">{data.profile.bio}</p>
          </div>
        </div>

        {/* Creative Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Email Me</h3>
                <p className="text-slate-600 text-sm">{data.profile.email}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">LinkedIn</h3>
                <p className="text-slate-600 text-sm">@{data.profile.social.linkedin}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Call Me</h3>
                <p className="text-slate-600 text-sm">{data.profile.phone}</p>
              </div>
            </div>
          </Card>

          {/* Projects */}
          {data.projects?.map((project: any) => (
            <Card key={project.id} className="md:col-span-2 lg:col-span-3 p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{project.title}</h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string, index: number) => (
                      <Badge key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ExternalLink className="w-8 h-8 text-purple-500" />
              </div>
            </Card>
          ))}
        </div>

        {/* Skills Section */}
        <div className="mt-16">
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">My Superpowers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.profile.skills.map((skill: string, index: number) => (
                <div key={index} className="text-center p-4">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold text-slate-800">{skill}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
)

const ProfessionalTemplate = ({ data, customization }: any) => (
  <div className={`min-h-screen ${customization.bgColor || 'bg-slate-50'}`}>
    <div className="container mx-auto px-8 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Professional Header */}
        <Card className="p-12 mb-12 bg-white border-0 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48 bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
              {data.profile.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold text-slate-800 mb-4">{data.profile.name}</h1>
              <p className="text-2xl text-slate-600 mb-6">{data.profile.title}</p>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">{data.profile.bio}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Badge className="px-4 py-2 bg-slate-700 text-white">{data.profile.industry}</Badge>
                <Badge className="px-4 py-2 bg-slate-700 text-white">{data.profile.experience}</Badge>
                <Badge className="px-4 py-2 bg-slate-700 text-white">{data.profile.location}</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Email</h3>
                <p className="text-slate-600">{data.profile.email}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Phone</h3>
                <p className="text-slate-600">{data.profile.phone}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">LinkedIn</h3>
                <p className="text-slate-600">@{data.profile.social.linkedin}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Projects */}
        <Card className="p-8 mb-12 bg-white border-0 shadow-xl">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Featured Projects</h2>
          <div className="space-y-8">
            {data.projects?.map((project: any) => (
              <div key={project.id} className="border-b border-slate-200 pb-8 last:border-b-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{project.title}</h3>
                    <Badge className="mb-4 bg-slate-100 text-slate-700">{project.type}</Badge>
                  </div>
                  <ExternalLink className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech: string, index: number) => (
                    <Badge key={index} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-8 bg-white border-0 shadow-xl">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Core Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.profile.skills.map((skill: string, index: number) => (
              <div key={index} className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 mx-auto mb-3 bg-slate-700 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-slate-800">{skill}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
)

export default function PortfolioPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const [selectedCareer, setSelectedCareer] = useState("Software Engineer")
  const [portfolioData, setPortfolioData] = useState(() => getPortfolioDataByCareer("Software Engineer"))
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("minimal")
  const [portfolioUrl, setPortfolioUrl] = useState("")
  const [customization, setCustomization] = useState({
    bgColor: "bg-gradient-to-br from-slate-50 to-white",
    accentColor: "bg-indigo-500",
    textColor: "text-slate-800"
  })

  // ✅ New state for portfolio management
  const [hasExistingPortfolio, setHasExistingPortfolio] = useState(false)
  const [portfolioCreatedAt, setPortfolioCreatedAt] = useState<string | null>(null)
  const [portfolioUpdatedAt, setPortfolioUpdatedAt] = useState<string | null>(null)
  const [userId, setUserId] = useState<string>("")

  // ✅ Enhanced useEffect untuk check existing portfolio
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const user = JSON.parse(userData)
        const userCareer = user.selectedCareer || user.career || "Software Engineer"
        
        // Generate consistent userId
        const generatedUserId = user.id || user.name?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substr(2, 9)
        setUserId(generatedUserId)
        
        setSelectedCareer(userCareer)
        setPortfolioData(getPortfolioDataByCareer(userCareer))
        setPortfolioUrl(`${window.location.origin}/p/${generatedUserId}`)
        
        // ✅ Check for existing portfolio
        const existingPortfolio = localStorage.getItem(`portfolioSettings_${generatedUserId}`)
        if (existingPortfolio) {
          try {
            const settings = JSON.parse(existingPortfolio)
            setHasExistingPortfolio(true)
            setPortfolioCreatedAt(settings.createdAt)
            setPortfolioUpdatedAt(settings.updatedAt)
            setSelectedTemplate(settings.template)
            setCustomization(settings.customization)
            
            // Optionally load saved portfolio data
            if (settings.data) {
              setPortfolioData(settings.data)
            }
          } catch (error) {
            console.error('Error loading existing portfolio:', error)
          }
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  // ✅ Enhanced generate portfolio function
  const handleGeneratePortfolio = async () => {
    try {
      if (!userId) {
        toast.error("User ID tidak ditemukan")
        return
      }

      const portfolioSettings = {
        userId: userId,
        template: selectedTemplate,
        customization,
        data: portfolioData,
        isPublic: true,
        createdAt: hasExistingPortfolio ? portfolioCreatedAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      // ✅ Save dengan key unik per user
      localStorage.setItem(`portfolioSettings_${userId}`, JSON.stringify(portfolioSettings))
      
      // Update state
      if (!hasExistingPortfolio) {
        setHasExistingPortfolio(true)
        setPortfolioCreatedAt(portfolioSettings.createdAt)
      }
      setPortfolioUpdatedAt(portfolioSettings.updatedAt)
      
      toast.success(hasExistingPortfolio ? "Portfolio berhasil diupdate!" : "Portfolio berhasil di-generate!")
      setShowTemplateDialog(false)
      setShowShareDialog(true)
    } catch (error) {
      console.error('Error generating portfolio:', error)
      toast.error("Gagal generate portfolio")
    }
  }

  // ✅ New update portfolio function
  const handleUpdatePortfolio = async () => {
    if (!hasExistingPortfolio) {
      return handleGeneratePortfolio()
    }

    try {
      const existingSettings = localStorage.getItem(`portfolioSettings_${userId}`)
      const existing = existingSettings ? JSON.parse(existingSettings) : {}
      
      const updatedSettings = {
        ...existing,
        template: selectedTemplate,
        customization,
        data: portfolioData,
        updatedAt: new Date().toISOString()
      }
      
      localStorage.setItem(`portfolioSettings_${userId}`, JSON.stringify(updatedSettings))
      setPortfolioUpdatedAt(updatedSettings.updatedAt)
      
      toast.success("Portfolio updated successfully!")
    } catch (error) {
      console.error('Error updating portfolio:', error)
      toast.error("Gagal update portfolio")
    }
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(portfolioUrl)
    toast.success("Link portfolio berhasil disalin!")
  }

  const handleShareToSocial = (platform: string) => {
    const text = `Check out my professional portfolio: ${portfolioData.profile.name}`
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(portfolioUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + portfolioUrl)}`
    }
    
    window.open(urls[platform as keyof typeof urls], '_blank')
  }

  const templates = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple design focusing on content",
      preview: "/template-minimal.jpg",
      component: MinimalTemplate
    },
    {
      id: "creative",
      name: "Creative",
      description: "Colorful and artistic design with visual impact",
      preview: "/template-creative.jpg",
      component: CreativeTemplate
    },
    {
      id: "professional",
      name: "Professional",
      description: "Corporate and business-focused layout",
      preview: "/template-professional.jpg",
      component: ProfessionalTemplate
    }
  ]

  const customizationOptions = {
    bgColors: [
      { name: "Light", value: "bg-gradient-to-br from-slate-50 to-white" },
      { name: "Ocean", value: "bg-gradient-to-br from-blue-400 to-cyan-500" },
      { name: "Sunset", value: "bg-gradient-to-br from-orange-400 to-pink-500" },
      { name: "Forest", value: "bg-gradient-to-br from-emerald-400 to-teal-500" },
      { name: "Purple", value: "bg-gradient-to-br from-purple-400 to-indigo-500" },
      { name: "Dark", value: "bg-gradient-to-br from-slate-800 to-slate-900" }
    ],
    accentColors: [
      { name: "Indigo", value: "bg-indigo-500" },
      { name: "Blue", value: "bg-blue-500" },
      { name: "Purple", value: "bg-purple-500" },
      { name: "Pink", value: "bg-pink-500" },
      { name: "Green", value: "bg-emerald-500" },
      { name: "Orange", value: "bg-orange-500" }
    ]
  }

  const renderTemplatePreview = (template: any) => {
    const TemplateComponent = template.component
    return (
      <div className="w-full h-64 overflow-hidden rounded-lg border-2 border-slate-200">
        <div className="transform scale-25 origin-top-left w-[400%] h-[400%]">
          <TemplateComponent data={portfolioData} customization={customization} />
        </div>
      </div>
    )
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
            <div className="px-6 py-8 space-y-8">

              {/* ✅ Enhanced Hero Header with Portfolio Status */}
              <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-48 translate-x-48" />
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-40 -translate-x-40" />
                </div>

                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl backdrop-blur-sm border border-white/20"
                      >
                        <Link href="/dashboard">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Kembali
                        </Link>
                      </Button>
                      <div className="flex items-center gap-2 text-white/60 text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        <User className="w-3 h-3" />
                        Portfolio Builder
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-xl">
                            <Wand2 className="w-4 h-4 mr-2" />
                            {hasExistingPortfolio ? "Update Portfolio" : "Generate Portfolio"}
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                      
                      {hasExistingPortfolio && (
                        <>
                          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                            <DialogTrigger asChild>
                              <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-xl">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Portfolio
                              </Button>
                            </DialogTrigger>
                          </Dialog>

                          <Button
                            onClick={() => window.open(portfolioUrl, '_blank')}
                            size="sm"
                            className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-xl"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4">
                      Portfolio Builder
                    </h1>
                    <p className="text-white/90 text-xl max-w-2xl mx-auto mb-6">
                      Create beautiful, shareable portfolio pages that showcase your professional work and achievements
                    </p>
                    
                    {/* ✅ Portfolio Status Indicator */}
                    {hasExistingPortfolio ? (
                      <div className="flex flex-col items-center gap-2 text-white/80">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span>Portfolio berhasil dibuat</span>
                        </div>
                        <div className="text-sm text-white/60">
                          Created: {new Date(portfolioCreatedAt!).toLocaleDateString('id-ID')}
                          {portfolioUpdatedAt && portfolioUpdatedAt !== portfolioCreatedAt && (
                            <span className="ml-2">
                              • Updated: {new Date(portfolioUpdatedAt).toLocaleDateString('id-ID')}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-white/60 break-all max-w-md">
                          <span className="font-medium">URL:</span> {portfolioUrl}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-white/60">
                        <Clock className="w-5 h-5" />
                        <span>Belum ada portfolio yang dibuat</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Portfolio Templates & Customization */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Template Selection */}
                <Card className="lg:col-span-2 p-6 border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <PaletteIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      Choose Template
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {templates.map((template) => (
                      <Card 
                        key={template.id}
                        className={`relative cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                          selectedTemplate === template.id 
                            ? 'border-indigo-500 shadow-xl' 
                            : 'border-slate-200 hover:border-indigo-300'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="p-4">
                          <div className="w-full h-40 bg-slate-100 rounded-lg mb-4 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                              <Layout className="w-12 h-12 text-slate-400" />
                            </div>
                          </div>
                          <h3 className="font-bold text-slate-800 mb-2">{template.name}</h3>
                          <p className="text-sm text-slate-600">{template.description}</p>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </Card>

                {/* Customization Panel */}
                <Card className="p-6 border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      Customize
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Background Color */}
                    <div>
                      <Label className="text-sm font-semibold text-slate-700 mb-3 block">Background</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {customizationOptions.bgColors.map((color) => (
                          <Button
                            key={color.value}
                            variant={customization.bgColor === color.value ? "default" : "outline"}
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => setCustomization(prev => ({...prev, bgColor: color.value}))}
                          >
                            {color.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                      <Label className="text-sm font-semibold text-slate-700 mb-3 block">Accent Color</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {customizationOptions.accentColors.map((color) => (
                          <Button
                            key={color.value}
                            variant={customization.accentColor === color.value ? "default" : "outline"}
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => setCustomization(prev => ({...prev, accentColor: color.value}))}
                          >
                            {color.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Preview */}
                    <div>
                      <Label className="text-sm font-semibold text-slate-700 mb-3 block">Preview</Label>
                      <div className="w-full h-32 border-2 border-slate-200 rounded-lg overflow-hidden">
                        <div className={`w-full h-full ${customization.bgColor} flex items-center justify-center`}>
                          <div className={`w-16 h-16 ${customization.accentColor} rounded-xl flex items-center justify-center`}>
                            <Eye className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={handleGeneratePortfolio}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 rounded-xl shadow-lg hover:scale-105 transition-all duration-200"
                      >
                        <Rocket className="w-4 h-4 mr-2" />
                        {hasExistingPortfolio ? "Update Portfolio" : "Generate Portfolio"}
                      </Button>

                      {hasExistingPortfolio && (
                        <Button
                          onClick={handleUpdatePortfolio}
                          variant="outline"
                          className="w-full rounded-xl"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Quick Update
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Template Generation Dialog */}
              <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {hasExistingPortfolio ? "Update Your Portfolio" : "Generate Your Portfolio"}
                    </DialogTitle>
                    <DialogDescription>
                      Choose a template and customize your shareable portfolio page
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Template Selection */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-slate-800">Choose Template</h3>
                      <div className="space-y-4">
                        {templates.map((template) => (
                          <Card 
                            key={template.id}
                            className={`p-4 cursor-pointer border-2 transition-all duration-300 ${
                              selectedTemplate === template.id 
                                ? 'border-indigo-500 shadow-lg' 
                                : 'border-slate-200 hover:border-indigo-300'
                            }`}
                            onClick={() => setSelectedTemplate(template.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                                <Layout className="w-8 h-8 text-slate-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-slate-800">{template.name}</h4>
                                <p className="text-sm text-slate-600">{template.description}</p>
                              </div>
                              {selectedTemplate === template.id && (
                                <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>

                      {/* Customization */}
                      <div className="space-y-4">
                        <h4 className="font-bold text-slate-800">Customize Design</h4>
                        
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Background Style</Label>
                          <Select value={customization.bgColor} onValueChange={(value) => setCustomization(prev => ({...prev, bgColor: value}))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {customizationOptions.bgColors.map((color) => (
                                <SelectItem key={color.value} value={color.value}>{color.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium mb-2 block">Accent Color</Label>
                          <Select value={customization.accentColor} onValueChange={(value) => setCustomization(prev => ({...prev, accentColor: value}))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {customizationOptions.accentColors.map((color) => (
                                <SelectItem key={color.value} value={color.value}>{color.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Live Preview */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-800">Live Preview</h3>
                      <div className="border-2 border-slate-200 rounded-xl overflow-hidden">
                        {renderTemplatePreview(templates.find(t => t.id === selectedTemplate))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t">
                    <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleGeneratePortfolio} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      <Rocket className="w-4 h-4 mr-2" />
                      {hasExistingPortfolio ? "Update Portfolio" : "Generate Portfolio"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Share Dialog */}
              <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Share Your Portfolio</DialogTitle>
                    <DialogDescription>
                      Your portfolio is ready! Share it with the world.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Portfolio URL */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Portfolio URL</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={portfolioUrl} 
                          readOnly 
                          className="flex-1 bg-slate-50"
                        />
                        <Button onClick={handleCopyUrl} size="sm" className="px-3">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="text-center">
                      <div className="w-32 h-32 bg-slate-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-600">Scan to view portfolio</p>
                    </div>

                    {/* Social Share */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Share to Social Media</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <Button 
                          variant="outline" 
                          className="h-12"
                          onClick={() => handleShareToSocial('twitter')}
                        >
                          <Twitter className="w-5 h-5" />
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-12"
                          onClick={() => handleShareToSocial('linkedin')}
                        >
                          <Linkedin className="w-5 h-5" />
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-12"
                          onClick={() => handleShareToSocial('whatsapp')}
                        >
                          <Phone className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    {/* View Portfolio */}
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    >
                      <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View My Portfolio
                      </a>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}