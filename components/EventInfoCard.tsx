"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { ArrowRight } from "lucide-react"

interface EventInfoCardProps {
  rightText: string
  rightButtonText: string
  onRightButtonClick?: () => void
}

export function EventInfoCard({
  rightText,
  rightButtonText,
  onRightButtonClick,
}: EventInfoCardProps) {
  const [dateInfo, setDateInfo] = useState({
    day: "",
    date: "",
    time: "",
    city: "Loading...",
    country: ""
  })
  const [circleColor, setCircleColor] = useState("from-orange-400 to-orange-500")
  const { theme } = useTheme()

  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return "th"
    switch (day % 10) {
      case 1: return "st"
      case 2: return "nd"
      case 3: return "rd"
      default: return "th"
    }
  }

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const day = now.toLocaleDateString("en-US", { weekday: "short" })
      const dayNum = now.getDate()
      const date = `${dayNum}${getDaySuffix(dayNum)}`
      const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })

      const hour = now.getHours()
      let colorClass = "from-orange-400 to-orange-500"
      if (hour >= 12 && hour < 18) {
        colorClass = "from-purple-400 to-pink-500"
      } else if (hour >= 18 || hour < 6) {
        colorClass = "from-sky-400 to-blue-500"
      }

      setDateInfo(prev => ({ ...prev, day, date, time }))
      setCircleColor(colorClass)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 60000)

    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setDateInfo(prev => ({
          ...prev,
          city: data.city,
          country: data.country_name
        }))
      })
      .catch(() => {
        setDateInfo(prev => ({ ...prev, city: "", country: "" }))
      })

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex-1 rounded-3xl overflow-hidden shadow-lg bg-card">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-colors duration-1000`}
      >
        <div className={`w-72 h-72 rounded-full blur-sm bg-gradient-to-tr ${circleColor}`} />
      </div>

      {/* Content */}
      <div className="relative flex h-full p-3">
        {/* Left info panel */}
        <div className="w-1/2 h-full rounded-2xl bg-gradient-to-br backdrop-blur-xl bg-card-foreground border-r border-white/30 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-5xl font-normal text-secondary">
              {dateInfo.day}
            </h2>
            <h2 className="text-5xl font-normal text-secondary-foreground">
              {dateInfo.date}
            </h2>
          </div>
          <div>
            <p className="mt-8 text-sm font-secondary">
              {dateInfo.time} <br />
              <span>{dateInfo.city}</span> <br />
              <span>{dateInfo.country}</span>
            </p>
          </div>

          <div className="mt-6 w-full flex flex-col items-center gap-1">
            <img
              src="/civilalogo.png"
              alt="Join in Logo"
              className="w-[30%] h-auto"
            />
            <img
              src={theme === "dark" ? "/civilafontDM.png" : "/civilafontLM.png"}
              alt="Civilafont Logo"
              className="w-[40%] h-auto transition-all"
            />
          </div>
        </div>

        {/* Right empty panel just to show background circle */}
        <div className="w-1/2 flex flex-col justify-between p-6">
          <p className="text-sm font-normal text-right text-secondary-foreground">{rightText}</p>
          <div className="flex justify-end gap-0 mt-4">
            <Button
              className="rounded-full px-4 py-2"
              onClick={onRightButtonClick}
            >
              {rightButtonText}
            </Button>
            <Button
              className="rounded-full px-3 py-2"
              onClick={onRightButtonClick}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
