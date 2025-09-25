"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface SiteHeaderProps {
  currentPage: string
  onNavigate?: (page: string) => void
}

export function Navbar({ currentPage, onNavigate }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  const handleNavigation = (page: string) => {
    // safe-call onNavigate when provided, otherwise fallback to router
    if (typeof onNavigate === "function") {
      onNavigate(page)
    } else {
      // fallback routing: map page id to a path
      const path = page === "home" ? "/" : `/${page}`
      router.push(path)
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-5 left-5 right-5 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/55 backdrop-blur-md border-r border-white/30 shadow-[0_8px_10px_0_rgba(31,38,135,0.37)] rounded-3xl"
        : "bg-transparent border-none shadow-none rounded-none"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("home")}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="/civilalogo.png" />
            </div>
            <img src="/civilafontLM.png" className="w-[100px]" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.id === "home" ? "/" : `/${item.id}`}
                className={`text-md transition-colors hover:text-primary ${currentPage === item.id
                  ? "text-primary font-bold"
                  : "text-muted-foreground font-medium"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search debris data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-50 bg-muted-foreground/10"
              />
            </div> */}
            <ThemeToggle />
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
              Masuk
            </Link>
            <Button asChild className="pulse-glow btn-hover-lift">
              <Link href="/register">Mulai Gratis</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.id === "home" ? "/" : `/${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary ${currentPage === item.id
                      ? "text-primary bg-muted/50 rounded-md"
                      : "text-muted-foreground"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search debris data..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-muted/50"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
