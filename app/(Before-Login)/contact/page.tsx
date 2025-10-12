"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ArrowRight, 
  Heart, 
  Lightbulb, 
  Shield,
  Sparkles,
  Star,
  Globe,
  Rocket,
  CheckCircle,
  Users,
  MessageCircle,
  Headphones,
  Calendar,
  Coffee,
  Zap,
  Target,
  Award,
  Building,
  User,
  HelpCircle,
  FileText,
  Briefcase,
  Code,
  PenTool,
  Monitor,
  Smartphone,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Facebook
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function ContactPage() {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitStatus('success')
    setIsSubmitting(false)
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      })
      setSubmitStatus(null)
    }, 3000)
  }

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat langsung dengan customer support kami",
      detail: "Response time: < 5 menit",
      action: "Mulai Chat",
      color: "from-blue-500 to-cyan-500",
      available: "24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Kirim email untuk pertanyaan detail",
      detail: "hello@civila.id",
      action: "Kirim Email",
      color: "from-purple-500 to-pink-500",
      available: "24 jam response"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Hubungi tim support via telepon",
      detail: "+62 21 1234 5678",
      action: "Telepon Sekarang",
      color: "from-green-500 to-emerald-500",
      available: "09:00 - 18:00 WIB"
    },
    {
      icon: Calendar,
      title: "Schedule Meeting",
      description: "Jadwalkan meeting dengan tim kami",
      detail: "30 menit consultation",
      action: "Book Meeting",
      color: "from-orange-500 to-red-500",
      available: "Weekdays"
    }
  ]

  const contactCategories = [
    {
      value: 'general',
      label: 'General Inquiry',
      icon: MessageCircle,
      description: 'Pertanyaan umum tentang Civila'
    },
    {
      value: 'support',
      label: 'Technical Support',
      icon: Headphones,
      description: 'Bantuan teknis dan troubleshooting'
    },
    {
      value: 'sales',
      label: 'Sales & Pricing',
      icon: Briefcase,
      description: 'Pertanyaan tentang paket dan harga'
    },
    {
      value: 'partnership',
      label: 'Partnership',
      icon: Users,
      description: 'Kerjasama dan partnership'
    },
    {
      value: 'careers',
      label: 'Careers',
      icon: Target,
      description: 'Bergabung dengan tim Civila'
    },
    {
      value: 'feedback',
      label: 'Feedback',
      icon: Star,
      description: 'Saran dan masukan untuk Civila'
    }
  ]

  const officeLocations = [
    {
      city: "Jakarta",
      address: "Menara BCA, Jl. MH Thamrin No. 1, Jakarta Pusat",
      coordinates: "-6.1944°, 106.8229°",
      type: "Headquarters",
      icon: Building,
      color: "from-blue-500 to-cyan-500"
    },
    {
      city: "Bandung",
      address: "Gedung Sate, Jl. Diponegoro No. 22, Bandung",
      coordinates: "-6.9024°, 107.6186°",
      type: "Development Center",
      icon: Code,
      color: "from-purple-500 to-pink-500"
    },
    {
      city: "Surabaya",
      address: "Tunjungan Plaza, Jl. Basuki Rahmat, Surabaya",
      coordinates: "-7.2574°, 112.7520°",
      type: "Regional Office",
      icon: Users,
      color: "from-green-500 to-emerald-500"
    }
  ]

  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/civila_id",
      color: "from-blue-400 to-blue-600",
      followers: "12K"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/civila",
      color: "from-blue-600 to-blue-800",
      followers: "8K"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/civila.id",
      color: "from-pink-500 to-purple-600",
      followers: "15K"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/c/civila",
      color: "from-red-500 to-red-700",
      followers: "5K"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/civila.id",
      color: "from-blue-500 to-blue-700",
      followers: "20K"
    }
  ]

  const supportStats = [
    { number: "< 5 min", label: "Response Time", icon: Clock, color: "from-blue-500 to-cyan-500" },
    { number: "24/7", label: "Availability", icon: Globe, color: "from-green-500 to-emerald-500" },
    { number: "98%", label: "Satisfaction", icon: Heart, color: "from-pink-500 to-red-500" },
    { number: "15+", label: "Languages", icon: MessageSquare, color: "from-purple-500 to-indigo-500" }
  ]

  return (
    <div className="min-h-screen">
      <Navbar currentPage="contact" />

      {/* Enhanced Hero Section */}
      <section className="relative z-10 px-6 py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Floating contact icons */}
          <div className="absolute top-1/4 right-1/4 animate-float">
            <MessageSquare className="w-8 h-8 text-blue-400/30" />
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float delay-1000">
            <Phone className="w-6 h-6 text-green-400/30" />
          </div>
          <div className="absolute top-3/4 right-1/3 animate-float delay-2000">
            <Mail className="w-7 h-7 text-purple-400/30" />
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
                💬 Always Here to Help • 24/7 Support • Fast Response
              </Badge>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-tight text-slate-900 dark:text-white">
              Hubungi <GradientText className="relative inline-block">
                Kami
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin-slow" />
              </GradientText>
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-12 text-pretty max-w-4xl mx-auto leading-relaxed">
              Punya pertanyaan? Tim support kami siap membantu kamu <strong>24/7</strong>. 
              Dapatkan jawaban cepat dan solusi terbaik untuk kebutuhan kariermu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="text-xl px-12 py-6 pulse-glow btn-hover-lift shadow-2xl shadow-primary/30 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 border-0 text-white" asChild>
                <Link href="#contact-form">
                  <Send className="mr-3 w-6 h-6 animate-bounce" />
                  Kirim Pesan
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-12 py-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-slate-300 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-800/80 btn-hover-lift shadow-xl text-slate-700 dark:text-slate-200">
                <MessageCircle className="mr-3 w-6 h-6" />
                Live Chat
              </Button>
            </div>

            {/* Support Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {supportStats.map((stat, index) => (
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

      {/* Enhanced Contact Methods */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="contact-methods-header"
            id="contact-methods-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('contact-methods-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              📞 Get in Touch
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Cara <GradientText>Menghubungi Kami</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Pilih metode komunikasi yang paling nyaman untukmu. Kami siap membantu dengan berbagai cara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                data-animate={`contact-method-${index}`}
                id={`contact-method-${index}`}
                className={`group scroll-animate ${
                  visibleElements.has(`contact-method-${index}`) 
                    ? 'animate-scale-up-fade-in' 
                    : 'animate-scale-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`contact-method-${index}`) ? `${index * 150}ms` : '0ms'
                }}
              >
                <Card className="p-8 h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2 relative overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <method.icon className="w-8 h-8 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        {method.available}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {method.description}
                    </p>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
                      {method.detail}
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${method.color} text-white border-0 hover:opacity-90 btn-hover-lift transition-all duration-300`}
                      size="sm"
                    >
                      {method.action}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form */}
      <section id="contact-form" className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-50/90 via-blue-50/60 to-purple-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-800/40">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="form-header"
            id="form-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('form-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              ✉️ Send Message
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Kirim <GradientText>Pesan</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Sampaikan pertanyaan, saran, atau feedback kamu. Tim kami akan merespons dalam waktu kurang dari 24 jam.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Categories */}
            <div
              data-animate="contact-categories"
              id="contact-categories"
              className={`scroll-animate ${
                visibleElements.has('contact-categories') 
                  ? 'animate-slide-left-fade-in' 
                  : 'animate-slide-right-fade-out'
              }`}
            >
              <Card className="p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 h-fit">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Kategori Pertanyaan</h3>
                <div className="space-y-4">
                  {contactCategories.map((category, index) => (
                    <div
                      key={category.value}
                      onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.category === category.value
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <category.icon className={`w-5 h-5 ${
                          formData.category === category.value 
                            ? 'text-indigo-600 dark:text-indigo-400' 
                            : 'text-slate-500 dark:text-slate-400'
                        }`} />
                        <div>
                          <div className={`font-medium ${
                            formData.category === category.value 
                              ? 'text-indigo-900 dark:text-indigo-100' 
                              : 'text-slate-900 dark:text-white'
                          }`}>
                            {category.label}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {category.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div
              data-animate="contact-form-card"
              id="contact-form-card"
              className={`lg:col-span-2 scroll-animate ${
                visibleElements.has('contact-form-card') 
                  ? 'animate-slide-right-fade-in' 
                  : 'animate-slide-left-fade-out'
              }`}
            >
              <Card className="p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500">
                {submitStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      Pesan Terkirim!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      Terima kasih atas pesan kamu. Tim kami akan merespons dalam waktu kurang dari 24 jam.
                    </p>
                    <Button
                      onClick={() => setSubmitStatus(null)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 hover:opacity-90"
                    >
                      Kirim Pesan Lain
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-900 dark:text-white font-medium">
                          Nama Lengkap *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap"
                          className="bg-white/70 dark:bg-slate-800/70 border-slate-300 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-900 dark:text-white font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="bg-white/70 dark:bg-slate-800/70 border-slate-300 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-slate-900 dark:text-white font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Apa yang ingin kamu tanyakan?"
                        className="bg-white/70 dark:bg-slate-800/70 border-slate-300 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-900 dark:text-white font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Ceritakan lebih detail tentang pertanyaan atau masalah yang kamu hadapi..."
                        rows={6}
                        className="bg-white/70 dark:bg-slate-800/70 border-slate-300 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        * Wajib diisi
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white border-0 hover:opacity-90 px-8 py-3 btn-hover-lift transition-all duration-300"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="mr-3 w-5 h-5" />
                            Kirim Pesan
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Office Locations */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="locations-header"
            id="locations-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('locations-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              📍 Our Locations
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Kantor <GradientText>Kami</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Temui tim kami secara langsung di berbagai kota besar Indonesia untuk konsultasi personal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((location, index) => (
              <div
                key={location.city}
                data-animate={`location-${index}`}
                id={`location-${index}`}
                className={`group scroll-animate ${
                  visibleElements.has(`location-${index}`) 
                    ? 'animate-scale-up-fade-in' 
                    : 'animate-scale-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`location-${index}`) ? `${index * 200}ms` : '0ms'
                }}
              >
                <Card className="p-8 h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${location.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <location.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {location.type}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {location.city}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-1 flex-shrink-0" />
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {location.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                      <p className="text-slate-600 dark:text-slate-300 text-sm font-mono">
                        {location.coordinates}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${location.color} text-white border-0 hover:opacity-90 btn-hover-lift transition-all duration-300`}
                    size="sm"
                  >
                    <MapPin className="mr-2 w-4 h-4" />
                    View on Map
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Social Media */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-50/90 via-blue-50/60 to-purple-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-800/40">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="social-header"
            id="social-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('social-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              🌐 Follow Us
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Ikuti <GradientText>Media Sosial</GradientText> Kami
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Dapatkan tips karier, update produk terbaru, dan inspirasi dari komunitas profesional Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {socialLinks.map((social, index) => (
              <div
                key={social.name}
                data-animate={`social-${index}`}
                id={`social-${index}`}
                className={`group scroll-animate ${
                  visibleElements.has(`social-${index}`) 
                    ? 'animate-scale-up-fade-in' 
                    : 'animate-scale-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`social-${index}`) ? `${index * 100}ms` : '0ms'
                }}
              >
                <Card className="p-6 text-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2 cursor-pointer" asChild>
                  <Link href={social.url} target="_blank" rel="noopener noreferrer">
                    <div className="flex flex-col items-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                        <social.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {social.name}
                      </h3>
                      
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {social.followers} followers
                      </div>
                      
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div 
            data-animate="faq-header"
            id="faq-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('faq-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              ❓ Quick Help
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              <GradientText>Pertanyaan Umum</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Jawaban cepat untuk pertanyaan yang sering diajukan sebelum menghubungi support.
            </p>
          </div>

          <div
            data-animate="faq-content"
            id="faq-content"
            className={`scroll-animate ${
              visibleElements.has('faq-content') 
                ? 'animate-scale-up-fade-in' 
                : 'animate-scale-down-fade-out'
            }`}
          >
            <Card className="p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500">
              <div className="space-y-6">
                {[
                  {
                    q: "Berapa lama waktu response tim support?",
                    a: "Tim support kami merespons dalam waktu kurang dari 5 menit untuk live chat dan maksimal 24 jam untuk email."
                  },
                  {
                    q: "Apakah support tersedia 24/7?",
                    a: "Ya, live chat dan email support tersedia 24/7. Phone support tersedia jam 09:00-18:00 WIB."
                  },
                  {
                    q: "Bahasa apa saja yang didukung?",
                    a: "Kami mendukung Bahasa Indonesia dan English. Tim support kami juga bisa berkomunikasi dalam bahasa daerah tertentu."
                  },
                  {
                    q: "Bisakah saya request demo atau consultation?",
                    a: "Tentu! Kamu bisa schedule meeting untuk demo produk atau consultation gratis dengan tim kami."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-6 py-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-r-lg">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {faq.q}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {faq.a}
                    </p>
                  </div>
                ))}
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