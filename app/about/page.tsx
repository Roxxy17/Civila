import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { Brain, Target, Users, Award, ArrowRight, Heart, Lightbulb, Shield } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar isAuthenticated={false} />

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <FloatingCard className="max-w-4xl mx-auto mb-12" delay={0.2}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Tentang <GradientText>Career Mapper</GradientText>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Kami percaya setiap orang memiliki potensi unik yang layak dikembangkan. Career Mapper hadir untuk
              membantu kamu menemukan dan mewujudkan karier impian dengan teknologi AI terdepan.
            </p>
          </FloatingCard>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <FloatingCard delay={0.2}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Misi Kami</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Memberdayakan setiap individu untuk menemukan passion sejati mereka dan mengembangkan karier yang
                bermakna melalui teknologi AI yang inovatif dan pembelajaran yang dipersonalisasi.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.4}>
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Visi Kami</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Menjadi platform terdepan yang menghubungkan potensi manusia dengan peluang karier terbaik, menciptakan
                dunia di mana setiap orang dapat berkembang sesuai dengan passion dan kemampuan mereka.
              </p>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Nilai-Nilai <GradientText>Kami</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Prinsip-prinsip yang memandu setiap keputusan dan inovasi yang kami lakukan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FloatingCard delay={0.2}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Empati</h3>
              <p className="text-muted-foreground">
                Kami memahami setiap perjalanan karier adalah unik dan penuh tantangan. Kami hadir untuk mendampingi
                dengan penuh empati.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.4}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inovasi</h3>
              <p className="text-muted-foreground">
                Kami terus berinovasi dengan teknologi AI terbaru untuk memberikan solusi terbaik bagi pengembangan
                karier.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.6}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integritas</h3>
              <p className="text-muted-foreground">
                Transparansi dan kejujuran adalah fondasi kepercayaan yang kami bangun dengan setiap pengguna.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.8}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Kolaborasi</h3>
              <p className="text-muted-foreground">
                Kami percaya kekuatan komunitas dan kolaborasi dalam mencapai tujuan karier yang lebih besar.
              </p>
            </FloatingCard>

            <FloatingCard delay={1.0}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Keunggulan</h3>
              <p className="text-muted-foreground">
                Kami berkomitmen untuk selalu memberikan kualitas terbaik dalam setiap fitur dan layanan yang kami
                tawarkan.
              </p>
            </FloatingCard>

            <FloatingCard delay={1.2}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fokus</h3>
              <p className="text-muted-foreground">
                Kami fokus pada satu tujuan: membantu kamu mencapai karier impian dengan cara yang paling efektif.
              </p>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <FloatingCard delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">
                Cerita <GradientText>Kami</GradientText>
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Career Mapper lahir dari pengalaman pribadi para founder yang merasakan kebingungan dalam menentukan
                arah karier. Kami menyadari bahwa banyak orang berbakat yang terjebak dalam pekerjaan yang tidak sesuai
                dengan passion mereka, bukan karena kurangnya kemampuan, tetapi karena kurangnya panduan yang tepat.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Dengan latar belakang di bidang teknologi, psikologi, dan pendidikan, tim kami mulai mengembangkan
                solusi yang menggabungkan kecerdasan buatan dengan pemahaman mendalam tentang pengembangan karier
                manusia. Kami percaya bahwa setiap orang memiliki potensi unik yang dapat dikembangkan dengan panduan
                yang tepat.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Setelah bertahun-tahun riset dan pengembangan, Career Mapper kini telah membantu ribuan profesional
                menemukan jalur karier yang sesuai dengan passion dan kemampuan mereka. Kami terus berinovasi untuk
                memberikan pengalaman yang lebih personal dan efektif bagi setiap pengguna.
              </p>

              <p className="text-lg leading-relaxed">
                Perjalanan kami baru saja dimulai. Dengan dukungan komunitas yang terus berkembang dan teknologi yang
                semakin canggih, kami berkomitmen untuk terus menjadi partner terpercaya dalam perjalanan karier kamu.
              </p>
            </div>
          </FloatingCard>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Pencapaian <GradientText>Kami</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground">Angka-angka yang menunjukkan dampak positif Career Mapper.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FloatingCard delay={0.2}>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">10K+</div>
                <div className="text-muted-foreground">Pengguna Aktif</div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.4}>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">500+</div>
                <div className="text-muted-foreground">Jalur Karier</div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.6}>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">95%</div>
                <div className="text-muted-foreground">Tingkat Kepuasan</div>
              </div>
            </FloatingCard>

            <FloatingCard delay={0.8}>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">2M+</div>
                <div className="text-muted-foreground">Jam Pembelajaran</div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <FloatingCard>
            <h2 className="text-4xl font-bold mb-6">
              Bergabung dengan <GradientText>Komunitas Kami</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Mulai perjalanan karier yang bermakna bersama ribuan profesional lainnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 pulse-glow" asChild>
                <Link href="/register">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent" asChild>
                <Link href="/contact">Hubungi Kami</Link>
              </Button>
            </div>
          </FloatingCard>
        </div>
      </section>

      <Footer />
    </div>
  )
}
