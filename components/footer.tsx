import Link from "next/link"
import { Brain, Mail, MapPin, Phone, Twitter, Linkedin, Instagram, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="relative z-10 glass border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Civila</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Platform AI terdepan untuk membantu kamu menemukan dan mengembangkan jalur karier impian dengan
              pembelajaran yang dipersonalisasi dan panduan yang tepat sasaran.
            </p>

            {/* Newsletter Signup */}
            <div className="max-w-md">
              <h4 className="font-semibold mb-3">Dapatkan Tips Karier Terbaru</h4>
              <div className="flex space-x-2">
                <Input placeholder="Email kamu" className="bg-background/50 border-border/50 focus:border-primary" />
                <Button className="pulse-glow">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Fitur</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Career Mapper
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">
                  Learning Path
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">
                  Skill Assessment
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Mentor
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Perusahaan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Karier
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info & Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border/50">
          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Hubungi Kami</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@civila.id</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-background/50 border border-border/50 rounded-lg flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              >
                <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-background/50 border border-border/50 rounded-lg flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-background/50 border border-border/50 rounded-lg flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-background/50 border border-border/50 rounded-lg flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              >
                <Github className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">
            © 2025 Civila. Semua hak dilindungi. Wujudkan karier impianmu dengan AI.
          </div>

          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
