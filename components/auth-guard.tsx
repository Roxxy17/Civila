"use client"

import type React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Jika halaman butuh auth dan user belum login, redirect ke login
  if (requireAuth && !session?.user) {
    router.push("/login")
    return null
  }

  // Jika halaman tidak butuh auth dan user sudah login, redirect ke dashboard
  if (!requireAuth && session?.user) {
    router.push("/dashboard")
    return null
  }

  return <>{children}</>
}
