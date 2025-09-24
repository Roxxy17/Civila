import { Button } from "@/components/ui/button"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { AIPromptGenerator } from "@/components/ai-prompt-generator"
import { ArrowRight, Brain, Target, TrendingUp, Users, Zap, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen page-transition">
      <Navbar isAuthenticated={false} />

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <FloatingCard className="max-w-4xl mx-auto mb-12" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Temukan Jalur Karier <GradientText>Impianmu</GradientText> dengan AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Platform AI terdepan yang membantu kamu menemukan passion, mengembangkan skill, dan meraih karier impian
              dengan roadmap pembelajaran yang dipersonalisasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 pulse-glow btn-hover-lift" asChild>
                <Link href="/register">
                  Mulai Perjalanan Kariermu
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent btn-hover-lift" asChild>
                <Link href="#ai-generator">Coba AI Generator</Link>
              </Button>
            </div>
          </FloatingCard>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <FloatingCard delay={0.4}>
              <div className="text-3xl font-bold gradient-text">10K+</div>
              <div className="text-muted-foreground">Pengguna Aktif</div>
            </FloatingCard>
            <FloatingCard delay={0.6}>
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-muted-foreground">Jalur Karier</div>
            </FloatingCard>
            <FloatingCard delay={0.8}>
              <div className="text-3xl font-bold gradient-text">95%</div>
              <div className="text-muted-foreground">Tingkat Kepuasan</div>
            </FloatingCard>
          </div>
        </div>
      </section>

      <div id="ai-generator">
        <AIPromptGenerator isAuthenticated={false} />
      </div>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Fitur <GradientText>Revolusioner</GradientText> untuk Kariermu
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Teknologi AI terdepan yang memahami potensi unik kamu dan memberikan panduan karier yang tepat sasaran.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FloatingCard delay={0.2}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Career Mapper</h3>
              <p className="text-muted-foreground">
                Analisis mendalam tentang skill gap dan rekomendasi karier berdasarkan minat, bakat, dan tren pasar
                kerja terkini.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.4}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Learning Path Personal</h3>
              <p className="text-muted-foreground">
                Roadmap pembelajaran step-by-step yang disesuaikan dengan tujuan karier dan gaya belajar kamu.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.6}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Mentor 24/7</h3>
              <p className="text-muted-foreground">
                Chat interaktif dengan AI mentor yang siap membantu kamu kapan saja untuk diskusi karier dan motivasi.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.8}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Pantau perkembangan skill dan pencapaian dengan visualisasi yang menarik dan motivasi gamifikasi.
              </p>
            </FloatingCard>

            <FloatingCard delay={1.0}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skill Portfolio</h3>
              <p className="text-muted-foreground">
                Bangun portfolio digital yang menampilkan skill dan pencapaian kamu untuk menarik perhatian recruiter.
              </p>
            </FloatingCard>

            <FloatingCard delay={1.2}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Learning</h3>
              <p className="text-muted-foreground">
                Bergabung dengan komunitas learner yang saling mendukung dan berbagi pengalaman karier.
              </p>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <FloatingCard>
            <h2 className="text-4xl font-bold mb-6">
              Siap Memulai <GradientText>Transformasi Karier</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Bergabung dengan ribuan profesional yang telah menemukan jalur karier impian mereka.
            </p>
            <Button size="lg" className="text-lg px-8 py-4 pulse-glow btn-hover-lift" asChild>
              <Link href="/register">
                Daftar Sekarang - Gratis!
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </FloatingCard>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
