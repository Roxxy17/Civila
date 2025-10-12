"use client"

import type React from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  AlertTriangle,
  User,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  Gamepad,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRef, useState } from "react"

interface SidebarProps {
  isExpanded: boolean
  onToggleExpanded: () => void
}

const navigation = [
  { name: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "profile" as const, label: "Profile", icon: User, path: "/profile" },
  { name: "career-mapper" as const, label: "Career Mapper", icon: AlertTriangle, path: "/career-mapper" },
  { name: "learning-path" as const, label: "Learning Path", icon: BarChart3, path: "/learning-path" },
  { name: "portfolio" as const, label: "Portfolio", icon: Paperclip, path: "/portfolio" },
  { name: "gamification-hub" as const, label: "Gamification Hub", icon: Gamepad, path: "/gamification" },
]

export function Sidebar({
  isExpanded,
  onToggleExpanded,
}: SidebarProps) {
  const { theme } = useTheme()
  const router = useRouter()
  const navRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Scroll handler
  const scrollNav = (dir: "left" | "right") => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: dir === "left" ? -80 : 80, behavior: "smooth" })
      setTimeout(() => {
        if (navRef.current) {
          setCanScrollLeft(navRef.current.scrollLeft > 0)
          setCanScrollRight(
            navRef.current.scrollLeft + navRef.current.offsetWidth < navRef.current.scrollWidth
          )
        }
      }, 300)
    }
  }

  // Helper untuk cek path aktif
  const getActive = (path: string) => {
    return window.location.pathname === path
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`
                hidden lg:flex
                ${isExpanded ? "w-72" : "w-16"} 
                h-full bg-gradient-to-br from-background via-card-foreground to-background
                border-r border-white/30
                rounded-3xl
                shadow-2xl
                flex-col transition-all duration-500 ease-in-out 
                relative
              `}>
        {/* Logo + Arrow */}
        <div
          className="px-4 py-2 border-b border-white/10 flex items-center h-16 relative group mb-4"
        >
          {/* Logo bulat (collapsed) */}
          {!isExpanded && (
            <div
              onClick={() => router.push("/")} // ganti ke halaman tujuanmu
              className="w-12 h-12 rounded-full flex items-center justify-center group-hover:hidden cursor-pointer"
            >
              <img
                src="/civilalogo.png"
                className="w-10 h-10 object-contain"
                alt="Logo Civila"
              />
            </div>
          )}

          {/* Logo bulat + font (expanded) */}
          {isExpanded && (
            <div
              onClick={() => router.push("/")} // ganti ke halaman tujuanmu
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img
                  src="/civilalogo.png"
                  className="w-10 h-10 object-contain"
                  alt="Logo Civila"
                />
              </div>
              <img
                src={theme === "dark" ? "/civilafontDM.png" : "/civilafontLM.png"}
                className="h-4 object-contain"
                alt="Civila"
              />
            </div>
          )}

          {/* Arrow toggle */}
          <Button
            variant="ghost"
            size="sm"
            className={`
            ml-auto w-6 h-6 rounded-full border border-white/20 p-0 transition-all duration-300 
            bg-background/80 hover:bg-primary/20 
            ${!isExpanded ? "absolute left-1/2 -translate-x-1/2 hidden group-hover:flex" : ""}
    `}
            onClick={onToggleExpanded}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-700" />
            )}
          </Button>
        </div>



        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = typeof window !== "undefined" && window.location.pathname === item.path
            return (
              <Button
                key={item.name}
                variant={isActive ? "foreground" : "ghost"}
                className={`w-full ${isExpanded ? "justify-start" : "justify-center"} gap-3 h-12 rounded-lg transition-all duration-300
                  ${isActive ? "bg-primary text-background shadow-md" : "text-foreground hover:bg-primary/10 hover:text-primary"}
                  `}
                onClick={() => router.push(item.path)}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-background" : ""}`} />
                {isExpanded && <span className="font-medium">{item.label}</span>}
              </Button>
            )
          })}

          {/* Theme Toggle */}
          <div className="mt-4 hidden lg:flex">
            <ThemeToggle />
          </div>
        </nav>

        {/* Footer */}
           {isExpanded && (
          <div className="p-4 border-t border-white/10 text-xs text-slate-400 text-center font-serif">
            <div className="font-medium">AI-powered career guidance platform</div>
            <div className="mt-1 opacity-75">Civila © 2025 • Transform your career</div>
          </div>
        )}
      </div>

        {/* Mobile Sidebar */}
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 flex lg:hidden items-center w-full max-w-[95vw] z-50 no-scrollbar">
          {/* Left Arrow */}
          <button
            className={`bg-white/80 dark:bg-slate-800/80 rounded-full p-1 mr-1 shadow transition ${canScrollLeft ? "opacity-100" : "opacity-30"}`}
            style={{ pointerEvents: canScrollLeft ? "auto" : "none" }}
            onClick={() => scrollNav("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-primary" />
          </button>
          {/* Navigation */}
          <div
            ref={navRef}
            className="
              flex overflow-x-auto no-scrollbar
              bg-gradient-to-br from-white/95 via-white/98 to-white/95
              dark:from-sky-100/60 dark:via-slate-300/40 dark:to-slate-300/60
              backdrop-blur-xl border border-white/30
              shadow-xl rounded-xl px-1 py-1
              w-full
            "
            style={{
              WebkitOverflowScrolling: "touch",
            }}
            onScroll={() => {
              if (navRef.current) {
                setCanScrollLeft(navRef.current.scrollLeft > 0)
                setCanScrollRight(
                  navRef.current.scrollLeft + navRef.current.offsetWidth < navRef.current.scrollWidth
                )
              }
            }}
          >
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = typeof window !== "undefined" && window.location.pathname === item.path
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`
                    flex flex-col items-center justify-center gap-0.5 px-2 py-1 mx-0.5 rounded-lg border-0 min-w-[56px]
                    transition-all duration-200 h-12
                    ${isActive
                      ? "bg-primary/20 text-primary shadow font-semibold"
                      : "text-slate-600 hover:text-primary"}
                  `}
                  onClick={() => router.push(item.path)}
                  style={{ flex: "0 0 auto" }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 truncate">{item.label}</span>
                </Button>
              )
            })}
          </div>
          {/* Right Arrow */}
          <button
            className={`bg-white/80 dark:bg-slate-800/80 rounded-full p-1 ml-1 shadow transition ${canScrollRight ? "opacity-100" : "opacity-30"}`}
            style={{ pointerEvents: canScrollRight ? "auto" : "none" }}
            onClick={() => scrollNav("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-primary" />
          </button>
        </div>
    </>
  )
}
