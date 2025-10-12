"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { AIPromptGenerator } from "@/components/ai-prompt-generator"
import { 
  ArrowRight, 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Star, 
  CheckCircle,
  Play,
  Shield,
  Award,
  Sparkles,
  Quote,
  Clock,
  Globe,
  Rocket,
  Heart,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { useSession } from "next-auth/react"

export default function HomePage() {
  const { data: session, status } = useSession()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    console.log("Session:", session)
    console.log("Status:", status)
  }, [session, status])

  // Enhanced Intersection Observer for repeating scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element masuk viewport - tambahkan ke visible set
            setVisibleElements(prev => new Set([...prev, entry.target.id]))
          } else {
            // Element keluar viewport - hapus dari visible set untuk animasi ulang
            setVisibleElements(prev => {
              const newSet = new Set(prev)
              newSet.delete(entry.target.id)
              return newSet
            })
          }
        })
      },
      {
        threshold: 0.15, // Increase threshold untuk trigger yang lebih presisi
        rootMargin: '50px 0px -100px 0px' // Adjust margin untuk better timing
      }
    )

    // Observe all animated elements
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

  // Auto-rotating testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    {
      name: "Sarah Wijaya",
      role: "UI/UX Designer",
      company: "Tech Startup",
      content: "Civila membantu saya menemukan passion di bidang UX Design. Dalam 3 bulan, saya sudah bekerja di startup impian dengan gaji 2x lipat!",
      rating: 5,
      image: "SW"
    },
    {
      name: "Ahmad Rizki",
      role: "Data Scientist",
      company: "Unicorn Company",
      content: "Roadmap pembelajaran yang dipersonalisasi sangat membantu transisi karier saya dari marketing ke data science. AI mentornya luar biasa!",
      rating: 5,
      image: "AR"
    },
    {
      name: "Dina Pratiwi",
      role: "Product Manager",
      company: "Global Tech",
      content: "AI mentor 24/7 selalu siap membantu ketika saya stuck. Sekarang saya menjadi PM di perusahaan global. Game changer banget!",
      rating: 5,
      image: "DP"
    }
  ]

  const features = [
    {
      icon: Brain,
      title: "AI Career Mapper",
      description: "Analisis mendalam tentang skill gap dan rekomendasi karier berdasarkan minat, bakat, dan tren pasar kerja terkini dengan akurasi 95%.",
      color: "from-blue-500 to-cyan-500",
      badge: "🧠 Smart AI"
    },
    {
      icon: Target,
      title: "Learning Path Personal",
      description: "Roadmap pembelajaran step-by-step yang disesuaikan dengan tujuan karier dan gaya belajar kamu. Hemat 60% waktu belajar!",
      color: "from-purple-500 to-pink-500",
      badge: "🎯 Personalized"
    },
    {
      icon: Zap,
      title: "AI Mentor 24/7",
      description: "Chat interaktif dengan AI mentor yang siap membantu kamu kapan saja untuk diskusi karier, motivasi, dan problem solving.",
      color: "from-yellow-500 to-orange-500",
      badge: "⚡ Instant"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Pantau perkembangan skill dan pencapaian dengan visualisasi yang menarik, gamifikasi, dan milestone rewards yang memotivasi.",
      color: "from-green-500 to-emerald-500",
      badge: "📈 Growth"
    },
    {
      icon: Star,
      title: "Skill Portfolio",
      description: "Bangun portfolio digital yang menampilkan skill dan pencapaian kamu untuk menarik perhatian recruiter top company.",
      color: "from-indigo-500 to-blue-500",
      badge: "⭐ Showcase"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Bergabung dengan komunitas 10K+ learner yang saling mendukung, berbagi pengalaman, dan networking karier.",
      color: "from-red-500 to-pink-500",
      badge: "👥 Community"
    }
  ]

  const benefits = [
    "Roadmap karier yang dipersonalisasi dengan AI",
    "Akses ke 500+ jalur karier terpopuler",
    "Mentoring 24/7 dari AI expert",
    "Progress tracking dengan gamifikasi",
    "Portfolio builder untuk showcase skill",
    "Community support dari 10K+ learners"
  ]

  const stats = [
    { number: "15K+", label: "Pengguna Aktif", sublabel: "dan terus bertambah", icon: Users },
    { number: "500+", label: "Jalur Karier", sublabel: "dari berbagai industri", icon: Target },
    { number: "98%", label: "Tingkat Kepuasan", sublabel: "berdasarkan survei", icon: Heart },
    { number: "24/7", label: "AI Support", sublabel: "siap membantu kapan saja", icon: Zap }
  ]

  return (
    <div className="min-h-screen">
      <Navbar currentPage="home" />

      {/* Enhanced Hero Section with Repeating Animations */}
      <section className="relative z-10 px-6 py-32 overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-yellow-400/15 to-orange-400/15 rounded-2xl rotate-45 animate-float"></div>
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400/15 to-emerald-400/15 rounded-full animate-float delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center w-full">
          <div 
            data-animate="hero-content"
            id="hero-content"
            className={`max-w-6xl mx-auto mb-16 scroll-animate ${
              visibleElements.has('hero-content') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            {/* Enhanced Announcement Badge */}
            <div className="mb-8">
              <Badge variant="secondary" className="text-sm px-8 py-3 bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-cyan-900/30 text-purple-700 dark:text-purple-300 border-0 font-semibold shadow-lg animate-bounce-slow">
                🚀 Baru! AI Career Advisor v2.0 dengan 98% akurasi prediksi
              </Badge>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-balance leading-tight text-slate-900 dark:text-white">
              Temukan Jalur Karier{" "}
              <GradientText className="relative inline-block">
                Impianmu
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-2xl -z-10 rounded-xl animate-pulse"></div>
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin-slow" />
              </GradientText>{" "}
              dengan AI
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-12 text-pretty max-w-4xl mx-auto leading-relaxed">
              Platform AI terdepan yang membantu kamu menemukan passion, mengembangkan skill, dan meraih karier impian
              dengan roadmap pembelajaran yang dipersonalisasi dan mentor AI 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="text-xl px-14 py-7 pulse-glow btn-hover-lift shadow-2xl shadow-primary/30 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 border-0 text-white" asChild>
                <Link href="/register">
                  <Rocket className="mr-3 w-6 h-6 animate-bounce" />
                  Mulai Perjalanan Kariermu
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-14 py-7 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-slate-300 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-800/80 btn-hover-lift shadow-xl text-slate-700 dark:text-slate-200" asChild>
                <Link href="#demo-video">
                  <Play className="mr-3 w-6 h-6" />
                  Lihat Demo Video
                </Link>
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-10 text-sm mb-12">
              <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200 dark:border-slate-700">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">100% Aman & Terpercaya</span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200 dark:border-slate-700">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Mulai dalam 2 Menit</span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200 dark:border-slate-700">
                <Globe className="w-5 h-5 text-purple-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Bahasa Indonesia</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-8 h-8 text-slate-500 dark:text-slate-400" />
            </div>
          </div>

          {/* Enhanced Stats with Staggered Repeating Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                data-animate={`stat-${index}`}
                id={`stat-${index}`}
                className={`group scroll-animate ${
                  visibleElements.has(`stat-${index}`) 
                    ? 'animate-scale-up-fade-in' 
                    : 'animate-scale-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`stat-${index}`) ? `${index * 150}ms` : '0ms'
                }}
              >
                <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{stat.sublabel}</div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Demo Video Section */}
      <section id="demo-video" className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div 
            data-animate="demo-section"
            id="demo-section"
            className={`text-center scroll-animate ${
              visibleElements.has('demo-section') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              🎬 Demo Video
            </Badge>
            <h2 className="text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Lihat <GradientText>Civila</GradientText> dalam Aksi
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover bagaimana AI kami bekerja untuk menemukan karier impianmu dalam 3 langkah sederhana.
              Ribuan orang sudah membuktikan keampuhannya!
            </p>
            <div className="relative aspect-video bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-3xl overflow-hidden group cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500 border border-slate-200 dark:border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-cyan-500/20"></div>
              
              {/* Video Thumbnail */}
              <div className="absolute inset-4 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl mb-4 mx-auto">
                    <Play className="w-10 h-10 text-indigo-600 dark:text-indigo-400 ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Demo: Temukan Karier Impianmu</h3>
                  <p className="text-slate-600 dark:text-slate-400">3 menit • Bahasa Indonesia • Full HD</p>
                </div>
              </div>
              
              {/* Video Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 dark:border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">Tutorial Lengkap Civila AI</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Dari registrasi hingga dapat job offer</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Durasi</div>
                      <div className="text-lg font-bold text-slate-800 dark:text-slate-200">3:24</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Generator Section */}
      <div id="ai-generator">
        <AIPromptGenerator isAuthenticated={!!session?.user} />
      </div>

      {/* Enhanced Features Section with Repeating Animations */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="features-header"
            id="features-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('features-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              ✨ Features Unggulan
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white">
              Fitur <GradientText>Revolusioner</GradientText> untuk Kariermu
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Teknologi AI terdepan yang memahami potensi unik kamu dan memberikan panduan karier yang tepat sasaran
              dengan metodologi yang terbukti efektif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                data-animate={`feature-${index}`}
                id={`feature-${index}`}
                className={`group scroll-animate ${
                  visibleElements.has(`feature-${index}`) 
                    ? 'animate-slide-up-fade-in' 
                    : 'animate-slide-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`feature-${index}`) ? `${index * 100}ms` : '0ms'
                }}
              >
                <Card className="p-8 h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 border-0">
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
                    {feature.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      Pelajari lebih lanjut 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-50/90 via-blue-50/60 to-purple-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-800/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              data-animate="benefits-content"
              id="benefits-content"
              className={`scroll-animate ${
                visibleElements.has('benefits-content') 
                  ? 'animate-slide-left-fade-in' 
                  : 'animate-slide-right-fade-out'
              }`}
            >
              <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
                🎯 Mengapa Civila?
              </Badge>
              <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
                Raih <GradientText>Kesuksesan Karier</GradientText> Lebih Cepat
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
                Dengan teknologi AI terdepan dan metodologi yang terbukti, Civila membantu mempercepat perjalanan karier impianmu
                hingga 3x lebih cepat dari metode konvensional.
              </p>
              <div className="space-y-6 mb-10">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white" asChild>
                  <Link href="/features">
                    Jelajahi Semua Fitur
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" asChild>
                  <Link href="/demo">
                    Coba Demo Gratis
                  </Link>
                </Button>
              </div>
            </div>

            <div 
              data-animate="benefits-visual"
              id="benefits-visual"
              className={`lg:order-first scroll-animate ${
                visibleElements.has('benefits-visual') 
                  ? 'animate-slide-right-fade-in' 
                  : 'animate-slide-left-fade-out'
              }`}
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-3xl p-8 text-white overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className="absolute top-6 right-6">
                    <Award className="w-10 h-10 opacity-60" />
                  </div>
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-bold mb-4">AI Success Rate</h3>
                      <div className="text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">98%</div>
                      <p className="text-xl opacity-90 leading-relaxed">
                        Pengguna berhasil menemukan jalur karier yang tepat dan mendapat job offer dalam 60 hari
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Career Match Accuracy</span>
                          <span>98%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                          <div className="bg-gradient-to-r from-white to-cyan-200 h-3 rounded-full w-[98%] animate-pulse"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Skill Development Speed</span>
                          <span>95%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                          <div className="bg-gradient-to-r from-white to-cyan-200 h-3 rounded-full w-[95%] animate-pulse delay-300"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Job Placement Success</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                          <div className="bg-gradient-to-r from-white to-cyan-200 h-3 rounded-full w-[92%] animate-pulse delay-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="testimonials-header"
            id="testimonials-header"
            className={`text-center mb-16 scroll-animate ${
              visibleElements.has('testimonials-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              💬 Success Stories
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Apa Kata <GradientText>Mereka</GradientText>?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Dengar cerita sukses dari ribuan pengguna yang telah mengubah hidup dan meraih karier impian dengan Civila.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div 
              data-animate="testimonial-card"
              id="testimonial-card"
              className={`scroll-animate ${
                visibleElements.has('testimonial-card') 
                  ? 'animate-scale-up-fade-in' 
                  : 'animate-scale-down-fade-out'
              }`}
            >
              <Card className="p-12 text-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 shadow-2xl">
                <Quote className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-8 opacity-60" />
                <blockquote className="text-2xl md:text-3xl font-medium mb-10 leading-relaxed text-balance text-slate-800 dark:text-slate-200">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {testimonials[currentTestimonial].image}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-xl text-slate-900 dark:text-white">{testimonials[currentTestimonial].name}</div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-medium text-lg">{testimonials[currentTestimonial].role}</div>
                    <div className="text-slate-600 dark:text-slate-400">{testimonials[currentTestimonial].company}</div>
                  </div>
                </div>
                <div className="flex justify-center gap-1 mb-8">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </Card>
            </div>

            {/* Enhanced Testimonial Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentTestimonial 
                      ? 'bg-indigo-600 dark:bg-indigo-400 w-12 h-4' 
                      : 'bg-slate-300 dark:bg-slate-600 w-4 h-4 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-blue-50/40 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-slate-800/40">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            data-animate="cta-section"
            id="cta-section"
            className={`overflow-hidden scroll-animate ${
              visibleElements.has('cta-section') 
                ? 'animate-scale-up-fade-in' 
                : 'animate-scale-down-fade-out'
            }`}
          >
            <Card className="p-16 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white animate-pulse" />
                  </div>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 dark:text-white">
                  Siap Memulai <GradientText>Transformasi Karier</GradientText>?
                </h2>
                <p className="text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Bergabung dengan 15K+ profesional yang telah menemukan jalur karier impian mereka. 
                  Mulai perjalananmu hari ini dan rasakan perbedaannya dalam 7 hari!
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                  <Button size="lg" className="text-xl px-16 py-8 pulse-glow btn-hover-lift shadow-2xl shadow-primary/30 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 border-0 text-white" asChild>
                    <Link href="/register">
                      <Rocket className="mr-3 w-6 h-6 animate-bounce" />
                      Daftar Sekarang - Gratis!
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-xl px-16 py-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-slate-300 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300" asChild>
                    <Link href="/pricing">
                      Lihat Harga
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">Tidak perlu kartu kredit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">Akses instan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">Batalkan kapan saja</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />

      {/* Enhanced CSS for Repeating Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Slide Up/Down Animations */
        @keyframes slide-up-fade-in {
          from { 
            opacity: 0; 
            transform: translateY(50px);
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
            transform: translateY(-30px);
          }
        }

        /* Scale Animations */
        @keyframes scale-up-fade-in {
          from { 
            opacity: 0; 
            transform: scale(0.8) translateY(20px);
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
            transform: scale(0.9) translateY(20px);
          }
        }

        /* Slide Left/Right Animations */
        @keyframes slide-left-fade-in {
          from { 
            opacity: 0; 
            transform: translateX(-50px);
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
            transform: translateX(50px);
          }
        }

        @keyframes slide-right-fade-in {
          from { 
            opacity: 0; 
            transform: translateX(50px);
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
            transform: translateX(-50px);
          }
        }
        
        /* Animation Classes */
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        
        .animate-slide-up-fade-in { 
          animation: slide-up-fade-in 0.8s ease-out forwards; 
        }
        .animate-slide-down-fade-out { 
          animation: slide-down-fade-out 0.6s ease-in forwards; 
        }
        
        .animate-scale-up-fade-in { 
          animation: scale-up-fade-in 0.7s ease-out forwards; 
        }
        .animate-scale-down-fade-out { 
          animation: scale-down-fade-out 0.5s ease-in forwards; 
        }
        
        .animate-slide-left-fade-in { 
          animation: slide-left-fade-in 0.8s ease-out forwards; 
        }
        .animate-slide-right-fade-out { 
          animation: slide-right-fade-out 0.6s ease-in forwards; 
        }
        
        .animate-slide-right-fade-in { 
          animation: slide-right-fade-in 0.8s ease-out forwards; 
        }
        .animate-slide-left-fade-out { 
          animation: slide-left-fade-out 0.6s ease-in forwards; 
        }

        /* Scroll Animation Base */
        .scroll-animate {
          transition: all 0.3s ease;
        }
        
        .btn-hover-lift {
          transition: all 0.3s ease;
        }
        .btn-hover-lift:hover {
          transform: translateY(-2px);
        }
        
        .pulse-glow {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
        }
      `}</style>
    </div>
  )
}