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
  Settings,
  Eye,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface SidebarProps {
  //   currentPage: NavigationPage
  //   onPageChange: (page: NavigationPage) => void
  isExpanded: boolean
  onToggleExpanded: () => void
}

const navigation = [
  { name: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "profile" as const, label: "Profile", icon: User, path: "/profile/results" },
  { name: "career-mapper" as const, label: "Career Mapper", icon: AlertTriangle, path: "/career-mapper" },
  { name: "learning-path" as const, label: "Learning Path", icon: BarChart3, path: "/learning-path" },
  { name: "progress-tracker" as const, label: "Progress Tracker", icon: Settings, path: "/progress" },
  { name: "portfolio" as const, label: "Portfolio", icon: Settings, path: "/portfolio" },
  { name: "gamification-hub" as const, label: "Gamification Hub", icon: Settings, path: "/gamification" },
]

export function Sidebar({
  //   currentPage,
  //   onPageChange,
  isExpanded,
  onToggleExpanded,
}: SidebarProps) {

  const { theme } = useTheme()
  const router = useRouter()

  return (
    <>
      <div className={`
          hidden lg:flex
          ${isExpanded ? "w-72" : "w-16"} 
          h-full bg-gradient-to-br backdrop-blur-xl bg-card-foreground 
          border-r border-white/30
          rounded-3xl
          shadow-[0_8px_10px_0_rgba(31,38,135,0.37)] 
          flex-col transition-all duration-500 ease-in-out 
          relative
        `}>
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute -right-3 top-15 z-10 w-6 h-6 rounded-full border border-white/20 p-0 transition-all duration-300"
          onClick={onToggleExpanded}
        >
          {isExpanded ? (
            <ChevronLeft className="w-3 h-3 text-slate-700" />
          ) : (
            <ChevronRight className="w-3 h-3 text-slate-700" />
          )}
        </Button>

        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <img src="/civilalogo.png" />
          </div>
          {isExpanded && <img src={theme === "dark" ? "/civilafontDM.png" : "/civilafontLM.png"} className="w-[80px]" />}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = router.pathname === item.path
            return (
              <Button
                key={item.name}
                variant="ghost"
                className={`w-full ${isExpanded ? "justify-start" : "justify-center"} gap-3 h-12 rounded-lg transition-all duration-300 ${isActive ? "bg-secondary text-background" : "text-foreground hover:bg-primary hover:text-background"}`}
                onClick={() => router.push(item.path)}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon className="w-5 h-5" />
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
            <div className="font-medium">Real-time space debris monitoring</div>
            <div className="mt-1 opacity-75">Data from NASA • ESA • Celestrak</div>
          </div>
        )}
      </div>


      {/* Sidebar versi bawah (mobile & tablet portrait) */}
      <div
        className="
          mx-5 mb-5 fixed bottom-0 left-0 right-0 
          flex lg:hidden justify-around 

          bg-gradient-to-br from-white/60 via-white/90 to-transparent 
          dark:from-sky-100/50 dark:via-slate-300/30 dark:to-transparent
          backdrop-blur-xl border-r border-white/30
          shadow-[0_8px_10px_0_rgba(31,38,135,0.37)]  
          z-50 rounded-3xl px-5 py-3
        "
      >
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = router.pathname === item.path
          return (
            <Button
              key={item.name}
              variant="ghost"
              className={`flex flex-col items-center justify-center gap-1 py-3 flex-1 rounded-none border-0 ${isActive
                ? "text-blue-600"
                : "text-slate-600 hover:text-blue-500"
                }`}
              onClick={() => onPageChange(item.name)}
            >
              <Icon className="w-7 h-7" />
              {/* <span className="text-xs">{item.name}</span> */}
            </Button>
          )
        })}

      </div>
    </>
  )
}
