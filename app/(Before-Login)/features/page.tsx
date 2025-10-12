"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Target,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  BarChart3,
  MessageSquare,
  Award,
  Briefcase,
  TrendingUp,
  Shield,
  Clock,
  Smartphone,
  Globe,
  Database,
  Lightbulb,
  FileText,
  Video,
  Calendar,
  Search,
  Settings,
  Heart,
  Rocket,
  Zap,
  Sparkles,
  Play,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export function FeaturesPage() {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [activeFeature, setActiveFeature] = useState(0)
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

  // Auto-rotating core features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % coreFeatures.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])
  
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI Career Mapper",
      description: "Sistem AI canggih yang menganalisis skill, minat, dan potensi untuk rekomendasi karier terbaik dengan akurasi 98%.",
      features: [
        "Analisis mendalam skill dan minat personal dengan NLP",
        "Rekomendasi karier berdasarkan 500+ tren pasar terkini",
        "Roadmap karier yang dipersonalisasi step-by-step",
        "Prediksi gaji dan prospek karier masa depan",
        "AI matching dengan 10K+ perusahaan global",
      ],
      badge: "Core Feature",
      color: "from-blue-500 to-cyan-500",
      stats: { accuracy: "98%", jobs: "10K+", users: "15K+" }
    },
    {
      icon: Target,
      title: "Learning Path Personal",
      description: "Roadmap pembelajaran step-by-step yang disesuaikan dengan tujuan dan gaya belajar kamu, hemat 60% waktu belajar.",
      features: [
        "Kurikulum adaptif berdasarkan learning style",
        "Materi dari 100+ expert dan industry leaders",
        "Project-based learning dengan real portfolio",
        "Adaptive AI yang menyesuaikan kecepatan belajar",
        "Sertifikasi industry-recognized dan skill validation",
      ],
      badge: "Popular",
      color: "from-purple-500 to-pink-500",
      stats: { courses: "500+", completion: "95%", time: "60%" }
    },
    {
      icon: MessageSquare,
      title: "AI Mentor 24/7",
      description: "Chat interaktif dengan AI mentor yang siap membantu kapan saja untuk diskusi karier, coaching personal, dan problem solving.",
      features: [
        "Konsultasi karier real-time dengan response <5 detik",
        "Motivasi dan coaching personal yang contextual",
        "Solusi untuk career challenges dan career blocks",
        "Interview preparation dengan mock interviews",
        "Networking guidance dan personal branding tips",
      ],
      badge: "Premium",
      color: "from-yellow-500 to-orange-500",
      stats: { response: "<5s", availability: "24/7", satisfaction: "97%" }
    },
  ]

  const additionalFeatures = [
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Pantau perkembangan skill dengan visualisasi menarik, analytics mendalam, dan milestone tracking.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Star,
      title: "Skill Portfolio",
      description: "Bangun portfolio digital yang menampilkan skill dan pencapaian untuk menarik recruiter top company.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Award,
      title: "Gamifikasi & Rewards",
      description: "Sistem badge, achievement, dan leaderboard untuk pembelajaran yang menyenangkan dan engaging.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Bergabung dengan komunitas 15K+ learner yang saling mendukung dan berbagi pengalaman.",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Briefcase,
      title: "Job Matching",
      description: "Temukan lowongan kerja yang sesuai dengan skill dan preferensi karier dengan AI matching 95% akurat.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Dapatkan insights tentang tren industri, salary benchmark, dan demand skill dari data real-time.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Career Security",
      description: "Analisis risiko karier dan rekomendasi untuk future-proofing skill kamu di era AI.",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Tools untuk mengatur jadwal belajar optimal dan tracking waktu yang efektif dengan AI scheduler.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Learning",
      description: "Akses semua fitur dari smartphone dengan experience yang optimal dan offline capability.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Eksplorasi peluang karier internasional dan remote work opportunities di 50+ negara.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Database,
      title: "Skill Assessment",
      description: "Evaluasi komprehensif kemampuan teknis dan soft skills dengan AI assessment engine.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation Lab",
      description: "Akses ke emerging technologies dan future skills yang akan dibutuhkan 5-10 tahun ke depan.",
      color: "from-yellow-500 to-orange-500"
    },
  ]

  const platformFeatures = [
    {
      icon: FileText,
      title: "Resume Builder",
      description: "AI-powered resume builder dengan 50+ template ATS-friendly dan optimization tips",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Video,
      title: "Video Learning",
      description: "Library 1000+ video pembelajaran dari expert dan industry leaders dengan interactive transcript",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Event & Webinar",
      description: "Akses ke 100+ career events bulanan, webinar, dan exclusive networking sessions",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Pencarian cerdas dengan AI untuk course, mentor, dan career opportunities yang relevan",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Settings,
      title: "Customization",
      description: "Personalisasi dashboard dan learning experience sesuai preferensi dengan 20+ themes",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: Heart,
      title: "Wellness Tracking",
      description: "Monitor work-life balance dan career satisfaction dengan wellness dashboard",
      color: "from-pink-500 to-rose-500"
    },
  ]

  const comparisonData = [
    { feature: "AI Career Mapping", civila: true, others: false },
    { feature: "Personalized Learning Path", civila: true, others: true },
    { feature: "24/7 AI Mentor", civila: true, others: false },
    { feature: "Real-time Progress Tracking", civila: true, others: true },
    { feature: "Job Matching Algorithm", civila: true, others: false },
    { feature: "Community Learning", civila: true, others: true },
    { feature: "Market Intelligence", civila: true, others: false },
    { feature: "Mobile Optimization", civila: true, others: true },
    { feature: "Gamification System", civila: true, others: false },
    { feature: "Career Security Analysis", civila: true, others: false },
  ]

  return (
    <div className="min-h-screen">
      <Navbar currentPage="features" />

      {/* Enhanced Hero Section */}
      <section className="relative z-10 px-6 py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Floating icons */}
          <div className="absolute top-1/4 right-1/4 animate-float">
            <Brain className="w-8 h-8 text-blue-400/30" />
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float delay-1000">
            <Target className="w-6 h-6 text-purple-400/30" />
          </div>
          <div className="absolute top-3/4 right-1/3 animate-float delay-2000">
            <Zap className="w-7 h-7 text-yellow-400/30" />
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
                ✨ 25+ Fitur Canggih • AI-Powered • Terus Berkembang
              </Badge>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-tight text-slate-900 dark:text-white">
              Fitur <GradientText className="relative inline-block">
                Revolusioner
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin-slow" />
              </GradientText> untuk Kariermu
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-12 text-pretty max-w-4xl mx-auto leading-relaxed">
              Platform AI terdepan dengan <strong>25+ fitur canggih</strong> yang memahami potensi unik kamu dan memberikan panduan
              karier yang tepat sasaran untuk mencapai kesuksesan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="text-xl px-12 py-6 pulse-glow btn-hover-lift shadow-2xl shadow-primary/30 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 border-0 text-white" asChild>
                <Link href="/register">
                  <Rocket className="mr-3 w-6 h-6 animate-bounce" />
                  Mulai Sekarang
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-12 py-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-slate-300 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-800/80 btn-hover-lift shadow-xl text-slate-700 dark:text-slate-200" asChild>
                <Link href="#core-features">
                  <Play className="mr-3 w-6 h-6" />
                  Jelajahi Fitur
                </Link>
              </Button>
            </div>
          </div>

          {/* Enhanced Feature Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "25+", label: "Fitur Canggih", icon: Sparkles, color: "from-purple-500 to-blue-500" },
              { number: "AI", label: "Powered", icon: Brain, color: "from-blue-500 to-cyan-500" },
              { number: "24/7", label: "Support", icon: Clock, color: "from-green-500 to-emerald-500" },
              { number: "100%", label: "Personalized", icon: Target, color: "from-pink-500 to-red-500" }
            ].map((stat, index) => (
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
      </section>

      {/* Enhanced Core Features */}
      <section id="core-features" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="core-features-header"
            id="core-features-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('core-features-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              🚀 Core Features
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white">
              Tiga Pilar <GradientText>Utama</GradientText> Civila
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Teknologi AI terdepan yang menjadi fondasi kuat untuk transformasi karier yang luar biasa.
            </p>
          </div>

          <div className="space-y-32">
            {coreFeatures.map((feature, index) => (
              <div
                key={feature.title}
                data-animate={`core-feature-${index}`}
                id={`core-feature-${index}`}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center scroll-animate ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                } ${
                  visibleElements.has(`core-feature-${index}`) 
                    ? index % 2 === 0 ? 'animate-slide-left-fade-in' : 'animate-slide-right-fade-in'
                    : index % 2 === 0 ? 'animate-slide-right-fade-out' : 'animate-slide-left-fade-out'
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <Card className="p-10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:shadow-2xl">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                          <Badge variant="secondary" className={`bg-gradient-to-r ${feature.color} text-white border-0`}>
                            {feature.badge}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg leading-relaxed">{feature.description}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl">
                      {Object.entries(feature.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-1`}>
                            {value}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <ul className="space-y-4">
                      {feature.features.map((item, itemIndex) => (
                        <li 
                          key={itemIndex} 
                          className="flex items-start space-x-3 group"
                          style={{ animationDelay: `${itemIndex * 100}ms` }}
                        >
                          <div className={`w-6 h-6 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`}>
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <Button variant="outline" className={`bg-gradient-to-r ${feature.color} text-white border-0 hover:opacity-90`}>
                        Pelajari Lebih Lanjut
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Visual */}
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Card className="p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500">
                    <div className={`aspect-video bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      <div className="text-center text-white relative z-10">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="w-10 h-10" />
                        </div>
                        <h4 className="text-2xl font-bold mb-2">{feature.title}</h4>
                        <p className="text-white/90 mb-4">Interactive Demo</p>
                        <div className="flex items-center justify-center gap-2 text-sm opacity-75">
                          <Play className="w-4 h-4" />
                          <span>Click to preview</span>
                        </div>
                      </div>
                      
                      {/* Floating elements */}
                      <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-1000"></div>
                      <div className="absolute top-1/2 left-4 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-500"></div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Additional Features Grid */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-50/90 via-blue-50/60 to-purple-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-800/40">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="additional-features-header"
            id="additional-features-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('additional-features-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              ⚡ Additional Features
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white">
              Fitur <GradientText>Lengkap</GradientText> untuk Kesuksesan
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Semua tools yang kamu butuhkan untuk mengembangkan karier dari awal hingga mencapai puncak kesuksesan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={feature.title}
                data-animate={`additional-feature-${index}`}
                id={`additional-feature-${index}`}
                className={`group scroll-animate ${
                  visibleElements.has(`additional-feature-${index}`) 
                    ? 'animate-slide-up-fade-in' 
                    : 'animate-slide-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`additional-feature-${index}`) ? `${index * 100}ms` : '0ms'
                }}
              >
                <Card className="p-8 h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Floating indicator */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      Explore feature
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Platform Features */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="platform-features-header"
            id="platform-features-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('platform-features-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              🛠 Platform Features
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white">
              Platform <GradientText>Features</GradientText>
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Fitur tambahan yang membuat pengalaman belajar dan pengembangan karier menjadi lebih komprehensif dan enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <div
                key={feature.title}
                data-animate={`platform-feature-${index}`}
                id={`platform-feature-${index}`}
                className={`group scroll-animate ${
                  visibleElements.has(`platform-feature-${index}`) 
                    ? 'animate-scale-up-fade-in' 
                    : 'animate-scale-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`platform-feature-${index}`) ? `${index * 100}ms` : '0ms'
                }}
              >
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                          {feature.title}
                        </CardTitle>
                      </div>
                      
                      {/* Status indicator */}
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Available Now</span>
                        <div className="flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          Learn more
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Feature Comparison */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-50/90 via-blue-50/60 to-purple-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-800/40">
        <div className="max-w-6xl mx-auto">
          <div 
            data-animate="comparison-header"
            id="comparison-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('comparison-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              ⚔️ Comparison
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white">
              Mengapa Memilih <GradientText>Civila</GradientText>?
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Bandingkan fitur Civila dengan platform lain dan lihat perbedaan yang signifikan.
            </p>
          </div>

          <div
            data-animate="comparison-table"
            id="comparison-table"
            className={`scroll-animate ${
              visibleElements.has('comparison-table') 
                ? 'animate-scale-up-fade-in' 
                : 'animate-scale-down-fade-out'
            }`}
          >
            <Card className="overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                      <th className="text-left py-6 px-8 font-bold text-slate-900 dark:text-white text-lg">Fitur</th>
                      <th className="text-center py-6 px-8 font-bold text-lg">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <GradientText className="text-xl">Civila</GradientText>
                        </div>
                      </th>
                      <th className="text-center py-6 px-8 font-semibold text-slate-600 dark:text-slate-400 text-lg">Platform Lain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300 ${
                          index % 2 === 0 ? 'bg-white/50 dark:bg-slate-900/20' : ''
                        }`}
                      >
                        <td className="py-6 px-8 font-medium text-slate-900 dark:text-white">{row.feature}</td>
                        <td className="py-6 px-8 text-center">
                          {row.civila ? (
                            <div className="flex items-center justify-center">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-8 h-8 border-2 border-slate-300 dark:border-slate-600 rounded-full mx-auto" />
                          )}
                        </td>
                        <td className="py-6 px-8 text-center">
                          {row.others ? (
                            <div className="flex items-center justify-center">
                              <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-8 h-8 border-2 border-slate-300 dark:border-slate-600 rounded-full mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Summary */}
              <div className="p-8 bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20 border-t border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    <GradientText>8 out of 10</GradientText> fitur eksklusif Civila
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">Platform terlengkap untuk career development di Indonesia</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative z-10 px-6 py-24">
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
                  Siap Menggunakan <GradientText>Semua Fitur</GradientText> Ini?
                </h2>
                
                <p className="text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Mulai perjalanan karier kamu hari ini dengan akses ke <strong>25+ fitur canggih</strong> yang akan mengubah masa depan
                  kariermu selamanya. Bergabung dengan 15K+ professionals yang sudah merasakan transformasinya.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                  <Button size="lg" className="text-xl px-16 py-8 pulse-glow btn-hover-lift shadow-2xl shadow-primary/30 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 border-0 text-white" asChild>
                    <Link href="/register">
                      <Sparkles className="mr-3 w-6 h-6 animate-spin-slow" />
                      Mulai Gratis Sekarang
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-xl px-16 py-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-slate-300 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300" asChild>
                    <Link href="/pricing">
                      Lihat Pricing
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">Gratis untuk memulai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">Upgrade kapan saja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">Cancel anytime</span>
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

export default function Page() {
  return <FeaturesPage />
}