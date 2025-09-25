"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FloatingCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FloatingCard({ children, className, delay = 0 }: FloatingCardProps) {
  return (
    <div
      className={cn("floating-card rounded-xl p-6 shadow-2xl", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
