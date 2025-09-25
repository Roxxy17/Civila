import type React from "react"
import "./globals.css"
import { AnimatedBackground } from "@/components/animated-background"
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper"

export const metadata = {
  title: "Civila - AI-Powered Career Guidance Platform",
  description:
    "Temukan jalur karier impianmu dengan AI. Platform terdepan untuk pengembangan karier dan pembelajaran yang dipersonalisasi.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-background text-foreground min-h-screen">
        <AnimatedBackground />
        <SessionProviderWrapper>
          <div className="relative z-10">{children}</div>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}