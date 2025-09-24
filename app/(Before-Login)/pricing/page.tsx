import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCard } from "@/components/floating-card"
import { GradientText } from "@/components/gradient-text"
import { Button } from "@/components/ui/button"
import { CheckCircle, X, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar isAuthenticated={false} />

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <FloatingCard className="max-w-4xl mx-auto mb-12" delay={0.2}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Pilih <GradientText>Paket Terbaik</GradientText> untuk Kariermu
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Mulai gratis dan upgrade kapan saja. Semua paket dirancang untuk membantu kamu mencapai tujuan karier
              dengan lebih cepat.
            </p>
          </FloatingCard>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <FloatingCard delay={0.2}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">Gratis</span>
                  <span className="text-muted-foreground">/bulan</span>
                </div>
                <p className="text-muted-foreground">Perfect untuk memulai perjalanan karier</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Basic skill assessment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>3 rekomendasi karier</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Basic learning path</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Community access</span>
                </li>
                <li className="flex items-center space-x-3 opacity-50">
                  <X className="w-5 h-5 text-muted-foreground" />
                  <span>AI mentor chat</span>
                </li>
                <li className="flex items-center space-x-3 opacity-50">
                  <X className="w-5 h-5 text-muted-foreground" />
                  <span>Advanced analytics</span>
                </li>
              </ul>

              <Button className="w-full bg-transparent" variant="outline" asChild>
                <Link href="/register">Mulai Gratis</Link>
              </Button>
            </FloatingCard>

            {/* Pro Plan */}
            <FloatingCard delay={0.4} className="relative border-primary/50 scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">Rp 99K</span>
                  <span className="text-muted-foreground">/bulan</span>
                </div>
                <p className="text-muted-foreground">Untuk profesional yang serius dengan karier</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Advanced skill assessment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Unlimited career recommendations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Personalized learning paths</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>AI mentor chat (100 msg/month)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Advanced progress tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Portfolio builder</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Priority support</span>
                </li>
              </ul>

              <Button className="w-full pulse-glow" asChild>
                <Link href="/register">Mulai Pro</Link>
              </Button>
            </FloatingCard>

            {/* Enterprise Plan */}
            <FloatingCard delay={0.6}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">Rp 199K</span>
                  <span className="text-muted-foreground">/bulan</span>
                </div>
                <p className="text-muted-foreground">Untuk tim dan organisasi</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Unlimited AI mentor chat</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Team collaboration tools</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Custom learning paths</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Advanced analytics & reports</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>API access</span>
                </li>
              </ul>

              <Button className="w-full bg-transparent" variant="outline" asChild>
                <Link href="/contact">Hubungi Sales</Link>
              </Button>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <GradientText>Frequently Asked Questions</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground">
              Pertanyaan yang sering ditanyakan tentang paket dan fitur kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FloatingCard delay={0.2}>
              <h3 className="text-lg font-semibold mb-3">Apakah bisa upgrade/downgrade kapan saja?</h3>
              <p className="text-muted-foreground">
                Ya, kamu bisa upgrade atau downgrade paket kapan saja. Perubahan akan berlaku pada billing cycle
                berikutnya.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.4}>
              <h3 className="text-lg font-semibold mb-3">Apakah ada garansi uang kembali?</h3>
              <p className="text-muted-foreground">
                Kami menawarkan garansi uang kembali 30 hari untuk semua paket berbayar tanpa pertanyaan.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.6}>
              <h3 className="text-lg font-semibold mb-3">Bagaimana cara pembayaran?</h3>
              <p className="text-muted-foreground">
                Kami menerima berbagai metode pembayaran termasuk kartu kredit, transfer bank, dan e-wallet.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.8}>
              <h3 className="text-lg font-semibold mb-3">Apakah data saya aman?</h3>
              <p className="text-muted-foreground">
                Keamanan data adalah prioritas utama kami. Semua data dienkripsi dan disimpan dengan standar keamanan
                tinggi.
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
              Siap Memulai <GradientText>Perjalanan Karier</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Bergabung dengan ribuan profesional yang telah menemukan jalur karier impian mereka.
            </p>
            <Button size="lg" className="text-lg px-8 py-4 pulse-glow" asChild>
              <Link href="/register">Mulai Gratis Sekarang</Link>
            </Button>
          </FloatingCard>
        </div>
      </section>

      <Footer />
    </div>
  )
}
