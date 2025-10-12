import Link from "next/link"
import { Brain, Mail, MapPin, Phone, Twitter, Linkedin, Instagram, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="relative z-10 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Civila
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md leading-relaxed">
              Platform AI terdepan untuk membantu kamu menemukan dan mengembangkan jalur karier impian dengan
              pembelajaran yang dipersonalisasi dan panduan yang tepat sasaran.
            </p>

            {/* Newsletter Signup */}
            <div className="max-w-md">
              <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Dapatkan Tips Karier Terbaru</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Email kamu" 
                  className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400" 
                />
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Fitur</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  AI Career Mapper
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Learning Path
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Skill Assessment
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  AI Mentor
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Perusahaan</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Karier
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info & Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Hubungi Kami</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>hello@civila.id</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-indigo-500" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-500 hover:border-indigo-500 transition-all duration-300 group shadow-sm hover:shadow-lg"
              >
                <Twitter className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-500 hover:border-indigo-500 transition-all duration-300 group shadow-sm hover:shadow-lg"
              >
                <Linkedin className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-500 hover:border-indigo-500 transition-all duration-300 group shadow-sm hover:shadow-lg"
              >
                <Instagram className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-500 hover:border-indigo-500 transition-all duration-300 group shadow-sm hover:shadow-lg"
              >
                <Github className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-600 dark:text-slate-400 text-sm">
            © 2025 Civila. Semua hak dilindungi. Wujudkan karier impianmu dengan AI.
          </div>

          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}