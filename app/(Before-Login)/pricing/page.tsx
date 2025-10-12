"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  CheckCircle, 
  X, 
  Star, 
  Zap, 
  Crown, 
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Users,
  Target,
  Rocket,
  Heart,
  Award,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Brain,
  Globe,
  Lock,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function PricingPage() {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [activeFaq, setActiveFaq] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [billingCycle, setBillingCycle] = useState('monthly')
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

  // Auto-rotating testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    {
      name: "Sarah Wijaya",
      role: "Product Manager",
      company: "Gojek",
      content: "Paket Pro Civila worth it banget! AI mentornya membantu saya transisi dari developer ke PM dalam 6 bulan.",
      rating: 5,
      image: "SW",
      plan: "Professional"
    },
    {
      name: "Ahmad Rizki", 
      role: "Data Scientist",
      company: "Tokopedia",
      content: "Enterprise plan sangat cocok untuk tim kami. Analytics dan reportingnya detailed banget untuk track progress team.",
      rating: 5,
      image: "AR",
      plan: "Enterprise"
    },
    {
      name: "Dina Pratiwi",
      role: "UX Designer",
      company: "Bukalapak",
      content: "Mulai dari free plan, sekarang pakai Pro. ROI-nya jelas terasa, salary naik 80% setelah 8 bulan!",
      rating: 5,
      image: "DP",
      plan: "Professional"
    }
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect untuk memulai perjalanan karier",
      icon: Star,
      color: "from-slate-500 to-slate-600",
      borderColor: "border-slate-200 dark:border-slate-700",
      popular: false,
      badge: "Free",
      features: [
        { name: "Basic skill assessment", included: true },
        { name: "3 rekomendasi karier", included: true },
        { name: "Basic learning path", included: true },
        { name: "Community access", included: true },
        { name: "AI mentor chat", included: false, limit: "0 messages" },
        { name: "Advanced analytics", included: false },
        { name: "Portfolio builder", included: false },
        { name: "Priority support", included: false }
      ],
      cta: "Mulai Gratis",
      ctaVariant: "outline"
    },
    {
      name: "Professional",
      price: { monthly: 99000, yearly: 950000 },
      description: "Untuk profesional yang serius dengan karier",
      icon: Zap,
      color: "from-purple-500 to-blue-500",
      borderColor: "border-purple-200 dark:border-purple-700",
      popular: true,
      badge: "Most Popular",
      features: [
        { name: "Advanced skill assessment", included: true },
        { name: "Unlimited career recommendations", included: true },
        { name: "Personalized learning paths", included: true },
        { name: "Community access", included: true },
        { name: "AI mentor chat", included: true, limit: "500 messages/month" },
        { name: "Advanced analytics", included: true },
        { name: "Portfolio builder", included: true },
        { name: "Priority support", included: true }
      ],
      cta: "Mulai Pro",
      ctaVariant: "default"
    },
    {
      name: "Enterprise", 
      price: { monthly: 199000, yearly: 1990000 },
      description: "Untuk tim dan organisasi",
      icon: Crown,
      color: "from-yellow-500 to-orange-500",
      borderColor: "border-yellow-200 dark:border-yellow-700",
      popular: false,
      badge: "For Teams",
      features: [
        { name: "Everything in Professional", included: true },
        { name: "Unlimited AI mentor chat", included: true },
        { name: "Team collaboration tools", included: true },
        { name: "Custom learning paths", included: true },
        { name: "Advanced analytics & reports", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "API access", included: true },
        { name: "White-label solution", included: true }
      ],
      cta: "Hubungi Sales",
      ctaVariant: "outline"
    }
  ]

  const comparisonFeatures = [
    { 
      category: "Assessment & Analysis",
      features: [
        { name: "Skill Assessment", starter: "Basic", pro: "Advanced", enterprise: "AI-Powered" },
        { name: "Career Recommendations", starter: "3", pro: "Unlimited", enterprise: "Unlimited + Custom" },
        { name: "Market Analysis", starter: "❌", pro: "✅", enterprise: "✅ + Real-time" },
        { name: "Personality Insights", starter: "❌", pro: "✅", enterprise: "✅ + Team Dynamics" }
      ]
    },
    {
      category: "Learning & Development",
      features: [
        { name: "Learning Paths", starter: "Basic", pro: "Personalized", enterprise: "Custom + Team" },
        { name: "Course Library", starter: "Limited", pro: "Full Access", enterprise: "Full + Custom Content" },
        { name: "Certifications", starter: "❌", pro: "✅", enterprise: "✅ + Custom Certs" },
        { name: "Progress Tracking", starter: "Basic", pro: "Advanced", enterprise: "Enterprise Analytics" }
      ]
    },
    {
      category: "AI & Support",
      features: [
        { name: "AI Mentor Chat", starter: "❌", pro: "500/month", enterprise: "Unlimited" },
        { name: "Response Time", starter: "❌", pro: "< 5 minutes", enterprise: "< 1 minute" },
        { name: "Support Priority", starter: "Community", pro: "Priority", enterprise: "Dedicated Manager" },
        { name: "API Access", starter: "❌", pro: "❌", enterprise: "Full API" }
      ]
    }
  ]

  const faqData = [
    {
      question: "Apakah bisa upgrade/downgrade kapan saja?",
      answer: "Ya, kamu bisa upgrade atau downgrade paket kapan saja. Perubahan akan berlaku pada billing cycle berikutnya dan tidak ada penalty fee."
    },
    {
      question: "Apakah ada garansi uang kembali?",
      answer: "Kami menawarkan garansi uang kembali 30 hari untuk semua paket berbayar tanpa pertanyaan. Jika tidak puas, uang akan dikembalikan 100%."
    },
    {
      question: "Bagaimana cara pembayaran?",
      answer: "Kami menerima berbagai metode pembayaran termasuk kartu kredit (Visa, Mastercard), transfer bank, GoPay, OVO, Dana, dan ShopeePay."
    },
    {
      question: "Apakah data saya aman?",
      answer: "Keamanan data adalah prioritas utama kami. Semua data dienkripsi dengan AES-256, disimpan dengan standar ISO 27001, dan tidak pernah dibagikan ke pihak ketiga."
    },
    {
      question: "Berapa lama kontrak minimum?",
      answer: "Tidak ada kontrak minimum. Kamu bisa berlangganan bulanan dan cancel kapan saja. Untuk paket tahunan, kamu mendapat diskon hingga 20%."
    },
    {
      question: "Apakah ada trial untuk paket berbayar?",
      answer: "Ya! Semua paket berbayar mendapat free trial 14 hari dengan akses penuh ke semua fitur. Tidak perlu kartu kredit untuk memulai trial."
    }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen">
      <Navbar currentPage="pricing" />

      {/* Enhanced Hero Section */}
      <section className="relative z-10 px-6 py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Floating pricing icons */}
          <div className="absolute top-1/4 right-1/4 animate-float">
            <Star className="w-8 h-8 text-yellow-400/30" />
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float delay-1000">
            <Crown className="w-6 h-6 text-orange-400/30" />
          </div>
          <div className="absolute top-3/4 right-1/3 animate-float delay-2000">
            <Zap className="w-7 h-7 text-blue-400/30" />
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
                💰 Special Launch Price • Save up to 30% • Limited Time
              </Badge>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-tight text-slate-900 dark:text-white">
              Pilih <GradientText className="relative inline-block">
                Paket Terbaik
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin-slow" />
              </GradientText> untuk Kariermu
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-12 text-pretty max-w-4xl mx-auto leading-relaxed">
              Mulai <strong>gratis</strong> dan upgrade kapan saja. Semua paket dirancang untuk membantu kamu mencapai 
              tujuan karier dengan <strong>3x lebih cepat</strong>.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl p-2 flex items-center space-x-2">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    billingCycle === 'monthly'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                    billingCycle === 'yearly'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Yearly
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1">
                    Save 20%
                  </Badge>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="text-xl px-12 py-6 pulse-glow btn-hover-lift shadow-2xl shadow-primary/30 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 border-0 text-white" asChild>
                <Link href="#pricing-plans">
                  <Rocket className="mr-3 w-6 h-6 animate-bounce" />
                  Lihat Harga
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-12 py-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-slate-300 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-800/80 btn-hover-lift shadow-xl text-slate-700 dark:text-slate-200" asChild>
                <Link href="/register">
                  <Star className="mr-3 w-6 h-6" />
                  Coba Gratis
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-slate-600 dark:text-slate-400">30-day money back</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-slate-600 dark:text-slate-400">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full px-4 py-2">
                <Lock className="w-4 h-4 text-purple-500" />
                <span className="text-slate-600 dark:text-slate-400">Secure payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Cards */}
      <section id="pricing-plans" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div 
            data-animate="pricing-header"
            id="pricing-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('pricing-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Paket yang <GradientText>Fleksibel</GradientText> untuk Semua
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Dari freelancer hingga enterprise, kami punya solusi yang tepat untuk kebutuhan kariermu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                data-animate={`pricing-plan-${index}`}
                id={`pricing-plan-${index}`}
                className={`group scroll-animate ${
                  visibleElements.has(`pricing-plan-${index}`) 
                    ? 'animate-scale-up-fade-in' 
                    : 'animate-scale-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`pricing-plan-${index}`) ? `${index * 200}ms` : '0ms'
                }}
              >
                <Card className={`relative p-8 h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md ${plan.borderColor} hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 group-hover:shadow-2xl ${
                  plan.popular ? 'scale-105 shadow-2xl border-2' : 'hover:scale-105'
                }`}>
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className={`bg-gradient-to-r ${plan.color} text-white px-6 py-2 shadow-lg animate-pulse`}>
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className="flex items-center justify-center mb-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${plan.color} rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <plan.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      {plan.name}
                    </CardTitle>
                    
                    {!plan.popular && (
                      <Badge variant="secondary" className="mb-4">
                        {plan.badge}
                      </Badge>
                    )}
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center">
                        <span className="text-5xl font-bold text-slate-900 dark:text-white">
                          {plan.price[billingCycle] === 0 ? 'Gratis' : formatPrice(plan.price[billingCycle])}
                        </span>
                        {plan.price[billingCycle] > 0 && (
                          <span className="text-slate-600 dark:text-slate-400 ml-2">
                            /{billingCycle === 'monthly' ? 'bulan' : 'tahun'}
                          </span>
                        )}
                      </div>
                      {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                        <div className="text-sm text-green-600 dark:text-green-400 font-medium mt-2">
                          Hemat {formatPrice(plan.price.monthly * 12 - plan.price.yearly)} per tahun!
                        </div>
                      )}
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-lg">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className={`flex items-start space-x-3 group/feature ${!feature.included ? 'opacity-60' : ''}`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover/feature:scale-110 ${
                            feature.included 
                              ? `bg-gradient-to-br ${plan.color}`
                              : 'bg-slate-300 dark:bg-slate-600'
                          }`}>
                            {feature.included ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <X className="w-4 h-4 text-slate-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className={`${feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-500'} group-hover/feature:text-slate-900 dark:group-hover/feature:text-white transition-colors duration-300`}>
                              {feature.name}
                            </span>
                            {feature.limit && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {feature.limit}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full text-lg py-6 ${
                        plan.ctaVariant === 'default' 
                          ? `bg-gradient-to-r ${plan.color} text-white border-0 hover:opacity-90 pulse-glow`
                          : `bg-transparent border-2 ${plan.borderColor} hover:bg-slate-50 dark:hover:bg-slate-800`
                      } btn-hover-lift transition-all duration-300`}
                      variant={plan.ctaVariant}
                      asChild
                    >
                      <Link href={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                        {plan.cta}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>

                    {/* Plan benefits highlight */}
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">
                        <Heart className="w-3 h-3 mr-1" />
                        {plan.name === 'Starter' && 'Perfect untuk eksplorasi'}
                        {plan.name === 'Professional' && 'Best value untuk growth'}
                        {plan.name === 'Enterprise' && 'Complete team solution'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Additional pricing info */}
          <div 
            data-animate="pricing-footer"
            id="pricing-footer"
            className={`mt-16 text-center scroll-animate ${
              visibleElements.has('pricing-footer') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20 border-purple-200 dark:border-purple-700">
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">ISO 27001 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">15K+ Happy Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">98% Success Rate</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Feature Comparison */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-50/90 via-blue-50/60 to-purple-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-800/40">
        <div className="max-w-7xl mx-auto">
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
              📊 Detailed Comparison
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Bandingkan <GradientText>Fitur Lengkap</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Lihat perbandingan detail semua fitur untuk memilih paket yang paling sesuai dengan kebutuhanmu.
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
              {comparisonFeatures.map((category, categoryIndex) => (
                <div key={category.category} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 px-8 py-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      {category.category}
                    </h3>
                  </div>

                  {/* Features */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                          <th className="text-left py-4 px-8 font-semibold text-slate-900 dark:text-white">Feature</th>
                          <th className="text-center py-4 px-6 font-semibold text-slate-600 dark:text-slate-400">Starter</th>
                          <th className="text-center py-4 px-6 font-semibold">
                            <GradientText>Professional</GradientText>
                          </th>
                          <th className="text-center py-4 px-6 font-semibold text-slate-600 dark:text-slate-400">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.features.map((feature, featureIndex) => (
                          <tr 
                            key={featureIndex}
                            className={`border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300 ${
                              featureIndex % 2 === 0 ? 'bg-white/50 dark:bg-slate-900/20' : ''
                            }`}
                          >
                            <td className="py-4 px-8 font-medium text-slate-900 dark:text-white">{feature.name}</td>
                            <td className="py-4 px-6 text-center text-slate-600 dark:text-slate-400">{feature.starter}</td>
                            <td className="py-4 px-6 text-center font-semibold text-slate-900 dark:text-white">{feature.pro}</td>
                            <td className="py-4 px-6 text-center text-slate-600 dark:text-slate-400">{feature.enterprise}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div 
            data-animate="testimonials-header"
            id="testimonials-header"
            className={`text-center mb-20 scroll-animate ${
              visibleElements.has('testimonials-header') 
                ? 'animate-slide-up-fade-in' 
                : 'animate-slide-down-fade-out'
            }`}
          >
            <Badge variant="outline" className="mb-6 px-6 py-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
              💬 Customer Stories
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              Apa Kata <GradientText>Pengguna</GradientText> Kami?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Dengar langsung dari professionals yang sudah merasakan transformation dengan paket Civila.
            </p>
          </div>

          <div 
            data-animate="testimonial-card"
            id="testimonial-card"
            className={`scroll-animate ${
              visibleElements.has('testimonial-card') 
                ? 'animate-scale-up-fade-in' 
                : 'animate-scale-down-fade-out'
            }`}
          >
            <Card className="p-12 text-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 shadow-2xl max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {testimonials[currentTestimonial].image}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xl text-slate-900 dark:text-white">{testimonials[currentTestimonial].name}</div>
                  <div className="text-indigo-600 dark:text-indigo-400 font-medium text-lg">{testimonials[currentTestimonial].role}</div>
                  <div className="text-slate-600 dark:text-slate-400">{testimonials[currentTestimonial].company}</div>
                  <Badge variant="secondary" className="mt-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300">
                    {testimonials[currentTestimonial].plan} User
                  </Badge>
                </div>
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed text-balance text-slate-800 dark:text-slate-200">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </Card>

            {/* Navigation */}
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

      {/* Enhanced FAQ Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-slate-50/90 via-blue-50/60 to-purple-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-800/40">
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
              ❓ FAQ
            </Badge>
            <h2 className="text-5xl font-bold mb-8 text-slate-900 dark:text-white">
              <GradientText>Frequently Asked Questions</GradientText>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Pertanyaan yang sering ditanyakan tentang paket dan fitur kami.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                data-animate={`faq-${index}`}
                id={`faq-${index}`}
                className={`scroll-animate ${
                  visibleElements.has(`faq-${index}`) 
                    ? 'animate-slide-up-fade-in' 
                    : 'animate-slide-down-fade-out'
                }`}
                style={{ 
                  animationDelay: visibleElements.has(`faq-${index}`) ? `${index * 100}ms` : '0ms'
                }}
              >
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 hover:shadow-lg">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {activeFaq === index ? (
                        <Minus className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                      )}
                    </div>
                  </button>
                  {activeFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            ))}
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
                  Siap Memulai <GradientText>Perjalanan Karier</GradientText>?
                </h2>
                
                <p className="text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Bergabung dengan <strong>15K+ profesional</strong> yang telah menemukan jalur karier impian mereka. 
                  Mulai dengan paket gratis dan rasakan perbedaannya dalam <strong>7 hari</strong>!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                  <Button size="lg" className="text-xl px-16 py-8 pulse-glow btn-hover-lift shadow-2xl shadow-primary/30 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 border-0 text-white" asChild>
                    <Link href="/register">
                      <Star className="mr-3 w-6 h-6 animate-bounce" />
                      Mulai Gratis Sekarang
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-xl px-16 py-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-slate-300 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300" asChild>
                    <Link href="/contact">
                      <MessageSquare className="mr-3 w-6 h-6" />
                      Tanya Sales
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">14-day free trial</span>
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