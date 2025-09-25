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
} from "lucide-react"
import Link from "next/link"

export function FeaturesPage() {
  
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI Career Mapper",
      description: "Sistem AI canggih yang menganalisis skill, minat, dan potensi untuk rekomendasi karier terbaik.",
      features: [
        "Analisis mendalam skill dan minat personal",
        "Rekomendasi karier berdasarkan tren pasar terkini",
        "Roadmap karier yang dipersonalisasi",
        "Prediksi gaji dan prospek karier",
        "Matching dengan perusahaan yang sesuai",
      ],
      badge: "Core Feature",
    },
    {
      icon: Target,
      title: "Learning Path Personal",
      description: "Roadmap pembelajaran step-by-step yang disesuaikan dengan tujuan dan gaya belajar kamu.",
      features: [
        "Kurikulum yang disesuaikan dengan tujuan karier",
        "Materi dari sumber terpercaya dan terupdate",
        "Project-based learning dengan portfolio",
        "Adaptive learning berdasarkan progress",
        "Sertifikasi dan skill validation",
      ],
      badge: "Popular",
    },
    {
      icon: MessageSquare,
      title: "AI Mentor 24/7",
      description: "Chat interaktif dengan AI mentor yang siap membantu kapan saja untuk diskusi karier.",
      features: [
        "Konsultasi karier real-time",
        "Motivasi dan coaching personal",
        "Solusi untuk career challenges",
        "Interview preparation dan tips",
        "Networking guidance",
      ],
      badge: "Premium",
    },
  ]

  const additionalFeatures = [
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Pantau perkembangan skill dengan visualisasi menarik dan analytics mendalam.",
    },
    {
      icon: Star,
      title: "Skill Portfolio",
      description: "Bangun portfolio digital yang menampilkan skill dan pencapaian untuk recruiter.",
    },
    {
      icon: Award,
      title: "Gamifikasi & Rewards",
      description: "Sistem badge, achievement, dan leaderboard untuk pembelajaran yang menyenangkan.",
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Bergabung dengan komunitas learner yang saling mendukung dan berbagi pengalaman.",
    },
    {
      icon: Briefcase,
      title: "Job Matching",
      description: "Temukan lowongan kerja yang sesuai dengan skill dan preferensi karier kamu.",
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Dapatkan insights tentang tren industri, salary benchmark, dan demand skill.",
    },
    {
      icon: Shield,
      title: "Career Security",
      description: "Analisis risiko karier dan rekomendasi untuk future-proofing skill kamu.",
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Tools untuk mengatur jadwal belajar dan tracking waktu yang efektif.",
    },
    {
      icon: Smartphone,
      title: "Mobile Learning",
      description: "Akses semua fitur dari smartphone dengan experience yang optimal.",
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Eksplorasi peluang karier internasional dan remote work opportunities.",
    },
    {
      icon: Database,
      title: "Skill Assessment",
      description: "Evaluasi komprehensif kemampuan teknis dan soft skills dengan AI.",
    },
    {
      icon: Lightbulb,
      title: "Innovation Lab",
      description: "Akses ke emerging technologies dan future skills yang akan dibutuhkan.",
    },
  ]

  const platformFeatures = [
    {
      icon: FileText,
      title: "Resume Builder",
      description: "AI-powered resume builder dengan template ATS-friendly",
    },
    {
      icon: Video,
      title: "Video Learning",
      description: "Library video pembelajaran dari expert dan industry leaders",
    },
    {
      icon: Calendar,
      title: "Event & Webinar",
      description: "Akses ke career events, webinar, dan networking sessions",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Pencarian cerdas untuk course, mentor, dan career opportunities",
    },
    {
      icon: Settings,
      title: "Customization",
      description: "Personalisasi dashboard dan learning experience sesuai preferensi",
    },
    {
      icon: Heart,
      title: "Wellness Tracking",
      description: "Monitor work-life balance dan career satisfaction",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar isAuthenticated={false} />

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <FloatingCard className="max-w-4xl mx-auto mb-12" delay={0.2}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Fitur <GradientText>Revolusioner</GradientText> untuk Kariermu
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Platform AI terdepan dengan 25+ fitur canggih yang memahami potensi unik kamu dan memberikan panduan
              karier yang tepat sasaran untuk mencapai kesuksesan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 pulse-glow btn-hover-lift" asChild>
                <Link href="/register">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent btn-hover-lift" asChild>
                <Link href="#core-features">Jelajahi Fitur</Link>
              </Button>
            </div>
          </FloatingCard>

          {/* Feature Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <FloatingCard delay={0.4}>
              <div className="text-3xl font-bold gradient-text">25+</div>
              <div className="text-muted-foreground text-sm">Fitur Canggih</div>
            </FloatingCard>
            <FloatingCard delay={0.6}>
              <div className="text-3xl font-bold gradient-text">AI</div>
              <div className="text-muted-foreground text-sm">Powered</div>
            </FloatingCard>
            <FloatingCard delay={0.8}>
              <div className="text-3xl font-bold gradient-text">24/7</div>
              <div className="text-muted-foreground text-sm">Support</div>
            </FloatingCard>
            <FloatingCard delay={1.0}>
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-muted-foreground text-sm">Personalized</div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="core-features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Fitur <GradientText>Utama</GradientText> Civila
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tiga pilar utama yang membuat Civila menjadi platform career development terdepan.
            </p>
          </div>

          <div className="space-y-20">
            {coreFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <FloatingCard delay={0.2} className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h2 className="text-3xl font-bold">{feature.title}</h2>
                        <Badge variant="secondary">{feature.badge}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 text-lg">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </FloatingCard>

                <FloatingCard delay={0.4} className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <feature.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground font-medium">{feature.title} Demo</p>
                      <p className="text-sm text-muted-foreground mt-2">Interactive preview coming soon</p>
                    </div>
                  </div>
                </FloatingCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Fitur <GradientText>Lengkap</GradientText> untuk Kesuksesan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Semua tools yang kamu butuhkan untuk mengembangkan karier dari awal hingga mencapai puncak kesuksesan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <FloatingCard key={feature.title} delay={index * 0.1}>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Platform <GradientText>Features</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fitur tambahan yang membuat pengalaman belajar dan pengembangan karier menjadi lebih komprehensif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, index) => (
              <Card
                key={feature.title}
                className="bg-background/50 border-border/50 hover:bg-background/70 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Mengapa Memilih <GradientText>Civila</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bandingkan fitur Civila dengan platform lain dan lihat perbedaannya.
            </p>
          </div>

          <FloatingCard>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-6 font-semibold">Fitur</th>
                    <th className="text-center py-4 px-6 font-semibold">
                      <GradientText>Civila</GradientText>
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-muted-foreground">Platform Lain</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["AI Career Mapping", true, false],
                    ["Personalized Learning Path", true, true],
                    ["24/7 AI Mentor", true, false],
                    ["Real-time Progress Tracking", true, true],
                    ["Job Matching Algorithm", true, false],
                    ["Community Learning", true, true],
                    ["Market Intelligence", true, false],
                    ["Mobile Optimization", true, true],
                    ["Gamification System", true, false],
                    ["Career Security Analysis", true, false],
                  ].map(([feature, civila, others], index) => (
                    <tr key={index} className="border-b border-border/50 last:border-b-0">
                      <td className="py-4 px-6">{feature}</td>
                      <td className="py-4 px-6 text-center">
                        {civila ? (
                          <CheckCircle className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-muted rounded-full mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {others ? (
                          <CheckCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-muted rounded-full mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FloatingCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <FloatingCard>
            <div className="flex items-center justify-center mb-6">
              <Rocket className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Siap Menggunakan <GradientText>Semua Fitur</GradientText> Ini?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Mulai perjalanan karier kamu hari ini dengan akses ke 25+ fitur canggih yang akan mengubah masa depan
              kariermu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 pulse-glow btn-hover-lift" asChild>
                <Link href="/register">
                  Mulai Gratis Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent btn-hover-lift" asChild>
                <Link href="/pricing">Lihat Pricing</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Gratis untuk memulai • Upgrade kapan saja • Cancel anytime
            </p>
          </FloatingCard>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function Page() {
  return <FeaturesPage />
}