"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Brain,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Target,
  BarChart3,
  Star,
  Users,
  MessageSquare,
  Award,
  Briefcase,
  BookOpen,
  TrendingUp,
  FileText,
  Video,
  Calendar,
  Heart,
  HelpCircle,
  Mail,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavbarProps {
  isAuthenticated?: boolean
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export function Navbar({ isAuthenticated = false, user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked")
  }

  const features = [
    {
      icon: Brain,
      title: "AI Career Mapper",
      description: "Temukan jalur karier yang tepat dengan AI",
      href: "/features#ai-career-mapper",
      badge: "Core",
    },
    {
      icon: Target,
      title: "Learning Path Personal",
      description: "Roadmap pembelajaran yang dipersonalisasi",
      href: "/features#learning-path",
      badge: "Popular",
    },
    {
      icon: MessageSquare,
      title: "AI Mentor 24/7",
      description: "Chat dengan AI mentor kapan saja",
      href: "/features#ai-mentor",
      badge: "Premium",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Pantau perkembangan skill dengan analytics",
      href: "/features#progress-tracking",
    },
    {
      icon: Star,
      title: "Skill Portfolio",
      description: "Bangun portfolio digital untuk recruiter",
      href: "/features#skill-portfolio",
    },
    {
      icon: Award,
      title: "Gamifikasi & Rewards",
      description: "Sistem badge dan achievement",
      href: "/features#gamification",
    },
  ]

  const solutions = [
    {
      icon: Briefcase,
      title: "Untuk Profesional",
      description: "Kembangkan karier dan tingkatkan skill",
      href: "/solutions/professionals",
    },
    {
      icon: BookOpen,
      title: "Untuk Pelajar",
      description: "Persiapan karier sejak dini",
      href: "/solutions/students",
    },
    {
      icon: TrendingUp,
      title: "Untuk Perusahaan",
      description: "Employee development program",
      href: "/solutions/enterprise",
    },
    {
      icon: Users,
      title: "Untuk Tim HR",
      description: "Talent management solution",
      href: "/solutions/hr",
    },
  ]

  const resources = [
    {
      icon: FileText,
      title: "Blog & Articles",
      description: "Tips karier dan industry insights",
      href: "/blog",
    },
    {
      icon: Video,
      title: "Video Learning",
      description: "Tutorial dan webinar gratis",
      href: "/resources/videos",
    },
    {
      icon: Calendar,
      title: "Events & Webinar",
      description: "Career events dan networking",
      href: "/events",
    },
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "FAQ dan panduan lengkap",
      href: "/help",
    },
  ]

  const company = [
    {
      icon: Heart,
      title: "Tentang Civila",
      description: "Misi dan visi kami",
      href: "/about",
    },
    {
      icon: Users,
      title: "Tim Kami",
      description: "Meet the team behind Civila",
      href: "/team",
    },
    {
      icon: Briefcase,
      title: "Karier",
      description: "Join our growing team",
      href: "/careers",
    },
    {
      icon: Mail,
      title: "Kontak",
      description: "Hubungi kami",
      href: "/contact",
    },
  ]

  return (
    <nav className="relative z-50 glass border-b border-border/50 sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Civila</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {!isAuthenticated ? (
              // Pre-login navigation
              <>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                            pathname === "/" && "bg-accent text-accent-foreground",
                          )}
                        >
                          Home
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Fitur</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[600px] lg:grid-cols-2">
                          {features.map((feature) => (
                            <Link
                              key={feature.title}
                              href={feature.href}
                              className="group grid gap-1 rounded-md p-3 hover:bg-accent transition-colors"
                            >
                              <div className="flex items-center space-x-2">
                                <feature.icon className="w-4 h-4 text-primary" />
                                <h4 className="font-medium leading-none group-hover:text-primary transition-colors">
                                  {feature.title}
                                </h4>
                                {feature.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {feature.badge}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </Link>
                          ))}
                          <div className="col-span-2 mt-4 pt-4 border-t border-border/50">
                            <Link
                              href="/features"
                              className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                              <span>Lihat Semua Fitur</span>
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Solusi</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[500px] lg:grid-cols-2">
                          {solutions.map((solution) => (
                            <Link
                              key={solution.title}
                              href={solution.href}
                              className="group grid gap-1 rounded-md p-3 hover:bg-accent transition-colors"
                            >
                              <div className="flex items-center space-x-2">
                                <solution.icon className="w-4 h-4 text-primary" />
                                <h4 className="font-medium leading-none group-hover:text-primary transition-colors">
                                  {solution.title}
                                </h4>
                              </div>
                              <p className="text-sm text-muted-foreground">{solution.description}</p>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[500px] lg:grid-cols-2">
                          {resources.map((resource) => (
                            <Link
                              key={resource.title}
                              href={resource.href}
                              className="group grid gap-1 rounded-md p-3 hover:bg-accent transition-colors"
                            >
                              <div className="flex items-center space-x-2">
                                <resource.icon className="w-4 h-4 text-primary" />
                                <h4 className="font-medium leading-none group-hover:text-primary transition-colors">
                                  {resource.title}
                                </h4>
                              </div>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link href="/pricing" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                            pathname === "/pricing" && "bg-accent text-accent-foreground",
                          )}
                        >
                          Pricing
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px]">
                          {company.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="group grid gap-1 rounded-md p-3 hover:bg-accent transition-colors"
                            >
                              <div className="flex items-center space-x-2">
                                <item.icon className="w-4 h-4 text-primary" />
                                <h4 className="font-medium leading-none group-hover:text-primary transition-colors">
                                  {item.title}
                                </h4>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center space-x-4 ml-4">
                  <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                    Masuk
                  </Link>
                  <Button asChild className="pulse-glow btn-hover-lift">
                    <Link href="/register">Mulai Gratis</Link>
                  </Button>
                </div>
              </>
            ) : (
              // Post-login navigation
              <>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link href="/dashboard" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                            pathname === "/dashboard" && "bg-accent text-accent-foreground",
                          )}
                        >
                          Dashboard
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[500px] lg:grid-cols-2">
                          <Link
                            href="/career-mapper"
                            className="group grid gap-1 rounded-md p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <Brain className="w-4 h-4 text-primary" />
                              <h4 className="font-medium leading-none group-hover:text-primary transition-colors">
                                Career Mapper
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground">AI-powered career recommendations</p>
                          </Link>
                          <Link
                            href="/learning-path"
                            className="group grid gap-1 rounded-md p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <Target className="w-4 h-4 text-primary" />
                              <h4 className="font-medium leading-none group-hover:text-primary transition-colors">
                                Learning Path
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground">Personalized learning roadmap</p>
                          </Link>
                          <Link
                            href="/skill-assessment"
                            className="group grid gap-1 rounded-md p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <BarChart3 className="w-4 h-4 text-primary" />
                              <h4 className="font-medium leading-none group-hover:text-primary transition-colors">
                                Skill Assessment
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground">Evaluate your current skills</p>
                          </Link>
                          <Link
                            href="/ai-mentor"
                            className="group grid gap-1 rounded-md p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <MessageSquare className="w-4 h-4 text-primary" />
                              <h4 className="font-medium leading-none group-hover:text-primary transition-colors">
                                AI Mentor
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground">24/7 career guidance</p>
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link href="/progress" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                            pathname === "/progress" && "bg-accent text-accent-foreground",
                          )}
                        >
                          Progress
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link href="/portfolio" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                            pathname === "/portfolio" && "bg-accent text-accent-foreground",
                          )}
                        >
                          Portfolio
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link href="/community" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                            pathname === "/community" && "bg-accent text-accent-foreground",
                          )}
                        >
                          Community
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                {/* User Menu */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          {user?.avatar ? (
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <User className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="hidden xl:block max-w-[100px] truncate">{user?.name || "User"}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-2 p-4 w-[250px]">
                          <div className="px-2 py-1 border-b border-border/50 mb-2">
                            <p className="font-medium">{user?.name || "User"}</p>
                            <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
                          </div>
                          <Link
                            href="/profile"
                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Profile Settings</span>
                          </Link>
                          <Link
                            href="/billing"
                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
                          >
                            <Briefcase className="w-4 h-4" />
                            <span>Billing & Plans</span>
                          </Link>
                          <Link
                            href="/help"
                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
                          >
                            <HelpCircle className="w-4 h-4" />
                            <span>Help & Support</span>
                          </Link>
                          <div className="border-t border-border/50 mt-2 pt-2">
                            <button
                              onClick={handleLogout}
                              className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors text-left w-full"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border/50">
            <div className="flex flex-col space-y-2 pt-4">
              {!isAuthenticated ? (
                // Pre-login mobile menu
                <>
                  <Link href="/" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Home
                  </Link>
                  <Link href="/features" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Fitur
                  </Link>
                  <Link href="/pricing" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Pricing
                  </Link>
                  <Link href="/about" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Tentang Kami
                  </Link>
                  <Link href="/blog" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Blog
                  </Link>
                  <Link href="/contact" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Kontak
                  </Link>
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
                    <Link href="/login" className="p-3 rounded-md hover:bg-accent transition-colors">
                      Masuk
                    </Link>
                    <Button asChild className="mx-3">
                      <Link href="/register">Mulai Gratis</Link>
                    </Button>
                  </div>
                </>
              ) : (
                // Post-login mobile menu
                <>
                  <Link href="/dashboard" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/career-mapper" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Career Mapper
                  </Link>
                  <Link href="/learning-path" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Learning Path
                  </Link>
                  <Link href="/progress" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Progress
                  </Link>
                  <Link href="/portfolio" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Portfolio
                  </Link>
                  <Link href="/community" className="p-3 rounded-md hover:bg-accent transition-colors">
                    Community
                  </Link>
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
