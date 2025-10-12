"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Brain, 
  Target, 
  Users, 
  Award, 
  ArrowRight, 
  Heart, 
  Lightbulb, 
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Globe,
  Rocket,
  CheckCircle,
  Clock,
  MessageSquare,
  Coffee,
  Zap,
  Code,
  PenTool,
  Database,
  BookOpen,
  Briefcase,
  Trophy,
  Map,
  Compass,
  Eye,
  ChevronRight,
  Play,
  Quote
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function AboutPage() {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [currentFounder, setCurrentFounder] = useState(0)
  const [currentMilestone, setCurrentMilestone] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Enhanced Intersection Observer for repeating scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]))
          } else {
            setVisibleElements(prev => {
              const newSet = new Set(prev)
              newSet.delete(entry.target.id)
              return newSet
            })
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -100px 0px'
      }
    )

    const elementsToObserve = document.querySelectorAll('[data-animate]')
    elementsToObserve.forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Auto-rotating founders
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFounder((prev) => (prev + 1) % founders.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Auto-rotating milestones
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMilestone((prev) => (prev + 1) % milestones.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const founders = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      background: "Ex-Google AI, Stanford CS",
      description: "Passionate tentang democratizing career guidance melalui AI. 10+ tahun experience di tech industry.",
      image: "SC",
      specialty: "AI & Product Strategy"
    },
    {
      name: "Ahmad Rahman",
      role: "CTO & Co-Founder", 
      background: "Ex-Microsoft, MIT CS",
      description: "Tech visionary yang percaya teknologi bisa mengubah cara orang menemukan passion mereka.",
      image: "AR",
      specialty: "Engineering & Architecture"
    },
    {
      name: "Dr. Maya Sari",
      role: "Chief Psychology Officer",
      background: "PhD Psychology, Harvard",
      description: "Expert di career psychology dan human behavior, ensuring our AI understand human complexity.",
      image: "MS",
      specialty: "Psychology & User Research"
    }
  ]

  const milestones = [
    {
      year: "2023",
      title: "Founded Civila",
      description: "Started with a vision to revolutionize career guidance",
      icon: Rocket,
      stats: "3 Co-founders"
    },
    {
      year: "2023",
      title: "First 1K Users",
      description: "Reached our first thousand users within 3 months",
      icon: Users,
      stats: "1,000+ Users"
    },
    {
      year: "2024",
      title: "AI Breakthrough",
      description: "Launched advanced AI career mapping technology",
      icon: Brain,
      stats: "95% Accuracy"
    },
    {
      year: "2024",
      title: "10K Community",
      description: "Built a thriving community of career-focused individuals",
      icon: Award,
      stats: "10,000+ Members"
    }
  ]

  const teamStats = [
    { number: "15+", label: "Team Members", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "5", label: "Countries", icon: Globe, color: "from-green-500 to-emerald-500" },
    { number: "100%", label: "Remote Team", icon: Compass, color: "from-purple-500 to-pink-500" },
    { number: "24/7", label: "Support", icon: Clock, color: "from-orange-500 to-red-500" }
  ]

  const values = [
    {
      icon: Heart,
      title: "Empati",
      description: "Kami memahami setiap perjalanan karier adalah unik dan penuh tantangan. Kami hadir untuk mendampingi dengan penuh empati dan understanding.",
      color: "from-pink-500 to-red-500",
      stats: "100% Human-Centered"
    },
    {
      icon: Brain,
      title: "Inovasi",
      description: "Kami terus berinovasi dengan teknologi AI terbaru untuk memberikan solusi terbaik bagi pengembangan karier masa depan.",
      color: "from-blue-500 to-cyan-500",
      stats: "Latest AI Technology"
    },
    {
      icon: Shield,
      title: "Integritas",
      description: "Transparansi dan kejujuran adalah fondasi kepercayaan yang kami bangun dengan setiap pengguna dan partner kami.",
      color: "from-green-500 to-emerald-500",
      stats: "100% Transparent"
    },
    {
      icon: Users,
      title: "Kolaborasi",
      description: "Kami percaya kekuatan komunitas dan kolaborasi dalam mencapai tujuan karier yang lebih besar dan bermakna.",
      color: "from-purple-500 to-violet-500",
      stats: "15K+ Community"
    },
    {
      icon: Award,
      title: "Keunggulan",
      description: "Kami berkomitmen untuk selalu memberikan kualitas terbaik dalam setiap fitur dan layanan yang kami tawarkan kepada users.",
      color: "from-yellow-500 to-orange-500",
      stats: "98% Satisfaction"
    },
    {
      icon: Target,
      title: "Fokus",
      description: "Kami fokus pada satu tujuan: membantu kamu mencapai karier impian dengan cara yang paling efektif dan sustainable.",
      color: "from-indigo-500 to-blue-500",
      stats: "Career-First Approach"
    }
  ]

  const achievements = [
    { number: "15K+", label: "Active Users", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "500+", label: "Career Paths", icon: Map, color: "from-green-500 to-emerald-500" },
    { number: "98%", label: "Success Rate", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
    { number: "5M+", label: "Learning Hours", icon: BookOpen, color: "from-orange-500 to-red-500" },
    { number: "50+", label: "Partner Companies", icon: Briefcase, color: "from-indigo-500 to-purple-500" },
    { number: "24/7", label: "AI Support", icon: MessageSquare, color: "from-teal-500 to-cyan-500" }
  ]

  return (
    <div className="min-h-screen">
      <Navbar currentPage="about" />

      {/* Enhanced Hero Section */}
      <section className="relative z-10 px-6 py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Floating about icons */}
          <div className="absolute top-1/4 right-1/4 animate-float">
            <Heart className="w-8 h-8 text-pink-400/30" />
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float delay-1000">
            <Brain className="w-6 h-6 text-blue-400/30" />
          </div>
          <div className="absolute top-3/4 right-1/3 animate-float delay-2000">
            <Target className="w-7 h-7 text-purple-400/30" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div
            data-animate="hero-content"
            id="hero-content"
            className={`max-w-5xl mx-auto mb-16 scroll-animate ${
              visibleElements.has('hero-content') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            {/* Enhanced Announcement Badge */}
            <div className="mb-8">
              <Badge variant="secondary" className="text-sm px-8 py-3 bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-cyan-900/30 text-purple-700 dark:text-purple-300 border-0 font-semibold shadow-lg animate-bounce-slow">
                🌟 Est. 2023 • AI-Powered • Made with ❤️ in Indonesia
              </Badge>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-tight text-slate-900 dark:text-white">
              Tentang <GradientText className="relative inline-block">
                Civila
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin-slow" />
              </GradientText>
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-12 text-pretty max-w-4xl mx-auto leading-relaxed">
              Kami percaya <strong>setiap orang</strong> memiliki potensi unik yang layak dikembangkan. Civila hadir untuk
              membantu kamu menemukan dan mewujudkan <strong>karier impian</strong> dengan teknologi AI terdepan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="text-xl px-12 py-6 pulse-glow btn-hover-lift shadow-2xl shadow-primary/30 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 border-0 text-white" asChild>
                <Link href="#our-story">
                  <BookOpen className="mr-3 w-6 h-6 animate-bounce" />
                  Baca Cerita Kami
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-12 py-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-slate-300 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-800/80 btn-hover-lift shadow-xl text-slate-700 dark:text-slate-200" asChild>
                <Link href="#team">
                  <Users className="mr-3 w-6 h-6" />
                  Meet the Team
                </Link>
              </Button>
            </div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {teamStats.map((stat, index) => (
                <div
                  key={index}
                  data-animate={`hero-stat-${index}`}
                  id={`hero-stat-${index}`}
                  className={`group scroll-animate ${
                    visibleElements.has(`hero-stat-${index}`) 
                      ? 'animate-scale-up-fade-in' 
                      : 'animate-scale-down-fade-out'
                  }`}
                  style={{ 
                    animationDelay: visibleElements.has(`hero-stat-${index}`) ? `${index * 150}ms` : '0ms'
                  }}
                >
                  <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 font-medium">{stat.label}</div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission & Vision */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="mission-vision-header"
            id="mission-vision-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('mission-vision-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              🎯 Our Purpose
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Misi & <GradientText>Visi Kami</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Driving forces yang menginspirasi setiap keputusan dan inovasi yang kami lakukan setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              data-animate="mission-card"
              id="mission-card"
              className={`scroll-animate ${
                visibleElements.has('mission-card') 
                  ? 'animate-slide-left-fade-in' 
                  : 'animate-slide-right-fade-out'
              }`}
            >
              <Card className="p-10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:shadow-2xl group">
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Misi Kami</h3>
                    <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300">
                      Our Purpose
                    </Badge>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
                  Memberdayakan setiap individu untuk menemukan passion sejati mereka dan mengembangkan karier yang
                  bermakna melalui teknologi AI yang inovatif dan pembelajaran yang dipersonalisasi untuk masa depan yang lebih baik.
                </p>

                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Empowering individuals through AI
                </div>
              </Card>
            </div>

            <div
              data-animate="vision-card"
              id="vision-card"
              className={`scroll-animate ${
                visibleElements.has('vision-card') 
                  ? 'animate-slide-right-fade-in' 
                  : 'animate-slide-left-fade-out'
              }`}
            >
              <Card className="p-10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:shadow-2xl group">
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Eye className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Visi Kami</h3>
                    <Badge variant="secondary" className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-700 dark:text-cyan-300">
                      Our Vision
                    </Badge>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
                  Menjadi platform terdepan yang menghubungkan potensi manusia dengan peluang karier terbaik, menciptakan
                  dunia di mana setiap orang dapat berkembang sesuai dengan passion dan kemampuan unik mereka.
                </p>

                <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-medium">
                  <Globe className="w-4 h-4 mr-2" />
                  Creating a world of fulfilled careers
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-50/90 via-blue-50/60 to-purple-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-800/40">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="values-header"
            id="values-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('values-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              💎 Core Values
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Nilai-Nilai <GradientText>Kami</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Prinsip-prinsip fundamental yang memandu setiap keputusan dan inovasi yang kami lakukan dalam membangun masa depan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                data-animate={`value-${index}`}
                id={`value-${index}`}
                className={`group scroll-animate ${
                  visibleElements.has(`value-${index}`) 
                    ? 'animate-scale-up-fade-in' 
                    : 'animate-scale-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`value-${index}`) ? `${index * 150}ms` : '0ms'
                }}
              >
                <Card className="p-8 h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Stats badge */}
                    <Badge variant="secondary" className={`absolute -top-2 -right-2 bg-gradient-to-r ${value.color} text-white text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100`}>
                      {value.stats}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    {value.description}
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      Learn more about {value.title.toLowerCase()}
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Our Story Section */}
      <section id="our-story" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="story-header"
            id="story-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('story-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              📖 Our Journey
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Cerita <GradientText>Kami</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Perjalanan dari ide sederhana hingga menjadi platform career guidance terdepan di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Story Content */}
            <div
              data-animate="story-content"
              id="story-content"
              className={`scroll-animate ${
                visibleElements.has('story-content') 
                  ? 'animate-slide-left-fade-in' 
                  : 'animate-slide-right-fade-out'
              }`}
            >
              <Card className="p-10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500">
                <div className="prose prose-lg max-w-none text-slate-600 dark:text-slate-300">
                  <div className="flex items-center mb-6">
                    <Quote className="w-8 h-8 text-indigo-500 mr-3" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white m-0">The Beginning</h3>
                  </div>
                  
                  <p className="text-lg leading-relaxed mb-6">
                    Civila lahir dari pengalaman pribadi para founder yang merasakan kebingungan dalam menentukan
                    arah karier. Kami menyadari bahwa banyak orang berbakat yang terjebak dalam pekerjaan yang tidak sesuai
                    dengan passion mereka, bukan karena kurangnya kemampuan, tetapi karena kurangnya panduan yang tepat.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    Dengan latar belakang di bidang teknologi, psikologi, dan pendidikan, tim kami mulai mengembangkan
                    solusi yang menggabungkan kecerdasan buatan dengan pemahaman mendalam tentang pengembangan karier
                    manusia. Kami percaya bahwa setiap orang memiliki potensi unik yang dapat dikembangkan dengan panduan
                    yang tepat.
                  </p>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-700 mb-6">
                    <p className="text-lg leading-relaxed m-0 text-indigo-800 dark:text-indigo-200 font-medium">
                      "We believe that everyone deserves a career that aligns with their passion and potential. 
                      That's why we built Civila - to democratize access to personalized career guidance."
                    </p>
                    <div className="mt-4 text-sm text-indigo-600 dark:text-indigo-400">— Sarah Chen, CEO & Co-Founder</div>
                  </div>

                  <p className="text-lg leading-relaxed">
                    Setelah bertahun-tahun riset dan pengembangan, Civila kini telah membantu ribuan profesional
                    menemukan jalur karier yang sesuai dengan passion dan kemampuan mereka. Kami terus berinovasi untuk
                    memberikan pengalaman yang lebih personal dan efektif bagi setiap pengguna.
                  </p>
                </div>
              </Card>
            </div>

            {/* Interactive Timeline */}
            <div
              data-animate="story-timeline"
              id="story-timeline"
              className={`scroll-animate ${
                visibleElements.has('story-timeline') 
                  ? 'animate-slide-right-fade-in' 
                  : 'animate-slide-left-fade-out'
              }`}
            >
              <Card className="p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                  Key Milestones
                </h3>
                
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                        index === currentMilestone 
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-700 scale-105' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                      onClick={() => setCurrentMilestone(index)}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${
                        index === currentMilestone 
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-500 scale-110' 
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        <milestone.icon className={`w-6 h-6 ${
                          index === currentMilestone ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-semibold ${
                            index === currentMilestone 
                              ? 'text-indigo-900 dark:text-indigo-100' 
                              : 'text-slate-900 dark:text-white'
                          }`}>
                            {milestone.title}
                          </h4>
                          <Badge variant="secondary" className={`text-xs ${
                            index === currentMilestone 
                              ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' 
                              : ''
                          }`}>
                            {milestone.year}
                          </Badge>
                        </div>
                        <p className={`text-sm ${
                          index === currentMilestone 
                            ? 'text-indigo-700 dark:text-indigo-300' 
                            : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          {milestone.description}
                        </p>
                        <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                          {milestone.stats}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section id="team" className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-50/90 via-blue-50/60 to-purple-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-800/40">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="team-header"
            id="team-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('team-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              👥 Our Team
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Meet Our <GradientText>Founders</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Passionate individuals yang dedikasi untuk mengubah cara orang menemukan dan mengembangkan karier impian mereka.
            </p>
          </div>

          {/* Featured Founder Card */}
          <div 
            data-animate="featured-founder"
            id="featured-founder"
            className={`mb-16 scroll-animate ${
              visibleElements.has('featured-founder') 
                ? 'animate-scale-up-fade-in' 
                : 'animate-scale-down-fade-out'
            }`}
          >
            <Card className="p-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-2xl">
                  {founders[currentFounder].image}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {founders[currentFounder].name}
                  </h3>
                  <div className="text-xl text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                    {founders[currentFounder].role}
                  </div>
                  <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300">
                    {founders[currentFounder].background}
                  </Badge>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {founders[currentFounder].description}
                  </p>
                  <div className="flex items-center justify-center md:justify-start text-sm text-slate-500 dark:text-slate-400">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Specialty: {founders[currentFounder].specialty}
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {founders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFounder(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentFounder 
                      ? 'bg-indigo-600 dark:bg-indigo-400 w-12 h-4' 
                      : 'bg-slate-300 dark:bg-slate-600 w-4 h-4 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="stats-header"
            id="stats-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('stats-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              📊 Our Impact
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Pencapaian <GradientText>Kami</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Angka-angka yang menunjukkan dampak positif Civila dalam membantu career transformation di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.label}
                data-animate={`achievement-${index}`}
                id={`achievement-${index}`}
                className={`group scroll-animate ${
                  visibleElements.has(`achievement-${index}`) 
                    ? 'animate-scale-up-fade-in' 
                    : 'animate-scale-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`achievement-${index}`) ? `${index * 150}ms` : '0ms'
                }}
              >
                <Card className="p-8 text-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="flex items-center justify-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className={`text-4xl font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-3`}>
                    {achievement.number}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 font-semibold text-lg">
                    {achievement.label}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {index < 3 ? 'Growing daily' : index < 5 ? 'Industry leading' : 'Always available'}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-50/90 via-blue-50/60 to-purple-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-800/40">
        <div className="max-w-5xl mx-auto text-center">
          <div
            data-animate="cta-section"
            id="cta-section"
            className={`scroll-animate ${
              visibleElements.has('cta-section') 
                ? 'animate-scale-up-fade-in' 
                : 'animate-scale-down-fade-out'
            }`}
          >
            <Card className="p-16 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5"></div>
              
              {/* Floating elements */}
              <div className="absolute top-8 right-8 w-3 h-3 bg-purple-400/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-12 left-12 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse delay-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-10 h-10 text-white animate-pulse" />
                  </div>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white">
                  Bergabung dengan <GradientText>Komunitas Kami</GradientText>
                </h2>
                
                <p className="text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Mulai perjalanan karier yang bermakna bersama <strong>15K+ profesional</strong> lainnya. 
                  Temukan passion sejati dan wujudkan karier impianmu dengan bantuan AI terdepan.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                  <Button size="lg" className="text-xl px-16 py-8 pulse-glow btn-hover-lift shadow-2xl shadow-primary/30 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 border-0 text-white" asChild>
                    <Link href="/register">
                      <Sparkles className="mr-3 w-6 h-6 animate-spin-slow" />
                      Mulai Sekarang
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-xl px-16 py-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-slate-300 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300" asChild>
                    <Link href="/contact">
                      <MessageSquare className="mr-3 w-6 h-6" />
                      Hubungi Kami
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">Join 15K+ professionals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">Free to start</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">AI-powered guidance</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      {/* Enhanced CSS for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Enhanced slide animations */
        @keyframes slide-up-fade-in {
          from { 
            opacity: 0; 
            transform: translateY(60px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        @keyframes slide-down-fade-out {
          from { 
            opacity: 1; 
            transform: translateY(0);
          }
          to { 
            opacity: 0; 
            transform: translateY(-40px);
          }
        }

        @keyframes scale-up-fade-in {
          from { 
            opacity: 0; 
            transform: scale(0.85) translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
        }

        @keyframes scale-down-fade-out {
          from { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
          to { 
            opacity: 0; 
            transform: scale(0.9) translateY(30px);
          }
        }

        @keyframes slide-left-fade-in {
          from { 
            opacity: 0; 
            transform: translateX(-60px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0);
          }
        }

        @keyframes slide-right-fade-out {
          from { 
            opacity: 1; 
            transform: translateX(0);
          }
          to { 
            opacity: 0; 
            transform: translateX(60px);
          }
        }

        @keyframes slide-right-fade-in {
          from { 
            opacity: 0; 
            transform: translateX(60px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0);
          }
        }

        @keyframes slide-left-fade-out {
          from { 
            opacity: 1; 
            transform: translateX(0);
          }
          to { 
            opacity: 0; 
            transform: translateX(-60px);
          }
        }
        
        /* Animation classes */
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        
        .animate-slide-up-fade-in { 
          animation: slide-up-fade-in 1s ease-out forwards; 
        }
        .animate-slide-down-fade-out { 
          animation: slide-down-fade-out 0.7s ease-in forwards; 
        }
        
        .animate-scale-up-fade-in { 
          animation: scale-up-fade-in 0.8s ease-out forwards; 
        }
        .animate-scale-down-fade-out { 
          animation: scale-down-fade-out 0.6s ease-in forwards; 
        }
        
        .animate-slide-left-fade-in { 
          animation: slide-left-fade-in 1s ease-out forwards; 
        }
        .animate-slide-right-fade-out { 
          animation: slide-right-fade-out 0.7s ease-in forwards; 
        }
        
        .animate-slide-right-fade-in { 
          animation: slide-right-fade-in 1s ease-out forwards; 
        }
        .animate-slide-left-fade-out { 
          animation: slide-left-fade-out 0.7s ease-in forwards; 
        }

        .scroll-animate {
          transition: all 0.3s ease;
        }
        
        .btn-hover-lift {
          transition: all 0.3s ease;
        }
        .btn-hover-lift:hover {
          transform: translateY(-3px);
        }
        
        .pulse-glow {
          animation: pulse 2.5s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 25px rgba(139, 92, 246, 0.4); }
          50% { box-shadow: 0 0 50px rgba(139, 92, 246, 0.6); }
        }
      `}</style>
    </div>
  )
}